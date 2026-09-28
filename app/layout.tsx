import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Café Aroma | Café de Especialidad",
  description: "Cafetería de especialidad que celebra los orígenes premium del café y la repostería artesanal, conectando consumidores con pequeños productores alrededor del mundo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
