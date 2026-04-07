import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Order Management", template: "%s | Orders" },
  description: "Gestion de commandes serverless",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
