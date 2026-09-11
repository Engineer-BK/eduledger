import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduLedger — School Management Web Application",
  description: "Run your school on one ledger, not ten spreadsheets. Academic record-keeping, attendance, grades, and fee management for modern schools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink-800 antialiased selection:bg-brass-100 selection:text-brass-700 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
