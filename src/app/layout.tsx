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
  title: "DevNeko Academy | Robotics, AI & Coding for the Next Generation",
  description: "DevNeko Academy is the premier robotics and AI learning platform for kids. Master future skills with hands-on coding, hardware projects, and mentor-led courses. Join the future of STEM education today.",
  keywords: ["robotics for kids", "coding academy", "AI education", "STEM learning", "hardware projects", "DevNeko Academy", "robotics education", "programming for kids", "Arduino projects"],
  authors: [{ name: "DevNeko Team" }],
  metadataBase: new URL('https://devnekoacademy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "DevNeko Academy | Robotics, AI & Coding for the Next Generation",
    description: "Master robotics and AI with DevNeko Academy. Hands-on projects for future innovators.",
    url: 'https://devnekoacademy.com',
    siteName: 'DevNeko Academy',
    images: [
      {
        url: '/favicon.png',
        width: 800,
        height: 600,
        alt: 'DevNeko Academy Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "DevNeko Academy | Robotics, AI & Coding for the Next Generation",
    description: "Master robotics and AI with DevNeko Academy. Hands-on projects for future innovators.",
    images: ['/favicon.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/Images/DevNeko_Logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
