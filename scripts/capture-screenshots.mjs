/**
 * Capture Android mobile screenshots (390×844) for interview reference.
 * Run: npm run screenshots  (starts web server if needed)
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'docs', 'screenshots');
const PORT = 8081;
const BASE = `http://localhost:${PORT}`;

const SHOTS = [
  { file: '01-welcome.png', url: '/demo/welcome', wait: 1500 },
  { file: '02-login.png', url: '/demo/login', wait: 1500 },
  { file: '03-kyc-aadhaar.png', url: '/demo/kyc-aadhaar', wait: 2000 },
  { file: '04-kyc-pan.png', url: '/demo/kyc-progress', wait: 2000 },
  { file: '05-home-preapproved.png', url: '/demo/home-preapproved', wait: 2000 },
  { file: '06-apply-loan.png', url: '/demo/apply', wait: 2000 },
  { file: '07-loan-approved.png', url: '/demo/approval', wait: 3000 },
  { file: '08-home-active-loan.png', url: '/demo/home-active', wait: 2000 },
  { file: '09-repay-upi.png', url: '/demo/repay', wait: 2000 },
  { file: '10-bnpl.png', url: '/demo/bnpl', wait: 2000 },
];

async function waitForServer(ms = 60000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server not ready at ${BASE}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const server = spawn('npx', ['expo', 'start', '--web', '--port', String(PORT)], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
    detached: true,
  });

  try {
    await waitForServer();
    console.log('Server ready, capturing screenshots...');

    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent:
        'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36',
    });

    for (const shot of SHOTS) {
      const page = await context.newPage();
      await page.goto(`${BASE}${shot.url}`, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(shot.wait);
      await page.screenshot({
        path: path.join(OUT, shot.file),
        fullPage: false,
      });
      console.log(`✓ ${shot.file}`);
      await page.close();
    }

    await browser.close();
    console.log(`\nScreenshots saved to ${OUT}`);
  } finally {
    process.kill(-server.pid!, 'SIGTERM');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
