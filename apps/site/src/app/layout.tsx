// apps/site/src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lamman Site",
  description: "Static landing pages powered by Lamman."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
    