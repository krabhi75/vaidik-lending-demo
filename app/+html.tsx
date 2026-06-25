import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: mobileOnlyCss }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const mobileOnlyCss = `
html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #1E1E1E;
  overflow: hidden;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
}
`;
