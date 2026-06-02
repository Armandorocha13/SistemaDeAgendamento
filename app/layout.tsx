import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Josefin_Sans, Prata } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TanstackQueryProvider } from "@/providers/tanstack-query";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

const ananda = localFont({
  src: "../public/fonts/ananda.ttf",
  variable: "--font-ananda",
});

// Metadados da aplicação
export const metadata: Metadata = {
  title: "Aparatus — Agendamentos de Barbearia",
  description: "Reserve serviços de barbearia com facilidade e rapidez.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${prata.variable} ${playfairDisplay.variable} ${josefinSans.variable} ${ananda.variable} antialiased`}
        suppressHydrationWarning
      >
        <TanstackQueryProvider>
          {children}
          <Toaster />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
