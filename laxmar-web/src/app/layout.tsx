import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001",
  ),
  title: "Laxmar | Traslados de pasajeros provinciales y nacionales",
  description:
    "Servicio de traslados turísticos, corporativos y para eventos en toda Argentina. Flota habilitada, conductores profesionales, monitoreo satelital y soporte 24/7.",
  openGraph: {
    title: "Laxmar | Traslados de pasajeros",
    description:
      "Traslados turísticos, corporativos y para eventos. Cobertura provincial y nacional.",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "/images/laxmar.jpg",
        width: 1200,
        height: 630,
        alt: "Unidad de Laxmar en ruta",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <Footer />
          <WhatsAppFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
