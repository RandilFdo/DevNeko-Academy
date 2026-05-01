import type { Metadata } from "next";
import { Inter, Abhaya_Libre, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import StartupLoader from "@/components/layout/StartupLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const abhayaLibre = Abhaya_Libre({
  variable: "--font-abhaya-libre",
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const royal = Great_Vibes({
  variable: "--font-royal",
  subsets: ["latin"],
  weight: ["400"],
});


export const metadata: Metadata = {
  title: "DevNeko Academy",
  description: "A high-performance, minimalist LMS for robotics education.",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/Images/DevNeko_Logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${abhayaLibre.variable} ${playfair.variable} ${royal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <StartupLoader />
        <LanguageProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
