import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://laxmar-web.vercel.app",
  ),
  title: {
    default: "Laxmar | Traslados de pasajeros provinciales y nacionales",
    template: "%s | Laxmar",
  },
  description:
    "Empresa de traslados de pasajeros en Argentina. Servicio turístico, corporativo y para eventos con cobertura provincial y nacional. Flota habilitada, conductores profesionales, monitoreo satelital y soporte 24/7. Pedí tu cotización por WhatsApp.",
  keywords: [
    "Laxmar",
    "traslados de pasajeros",
    "transporte de pasajeros Argentina",
    "viajes corporativos",
    "viajes turísticos",
    "traslados para eventos",
    "alquiler de combi",
    "alquiler de minibús",
    "traslado aeropuerto Buenos Aires",
    "transporte de personal",
  ],
  authors: [{ name: "Laxmar" }],
  creator: "Laxmar",
  publisher: "Laxmar",
  category: "Transporte",
  applicationName: "Laxmar",
  icons: {
    icon: [
      { url: "/images/logo-laxmar.jpg", type: "image/jpeg" },
    ],
    shortcut: "/images/logo-laxmar.jpg",
    apple: "/images/logo-laxmar.jpg",
  },
  openGraph: {
    title: "Laxmar | Traslados de pasajeros provinciales y nacionales",
    description:
      "Traslados turísticos, corporativos y para eventos con cobertura provincial y nacional. Conductores profesionales, flota habilitada y soporte 24/7.",
    url: "https://laxmar-web.vercel.app",
    siteName: "Laxmar",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "/images/flota-laxmar.jpg",
        width: 1200,
        height: 630,
        alt: "Flota de Laxmar - Traslados de pasajeros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laxmar | Traslados de pasajeros",
    description:
      "Traslados turísticos, corporativos y para eventos. Cobertura provincial y nacional en Argentina.",
    images: ["/images/flota-laxmar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <Analytics />
      </body>
    </html>
  );
}
