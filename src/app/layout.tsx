// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SoundProvider } from "@/components/providers/sound-provider";
import { LoadingBar } from "@/components/effects/loading-bar";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akash Shetty | Full Stack Developer",
  description: "Full Stack Developer pursuing MS in Computer Science at Northeastern University with 5+ years of experience. Building cool stuff with hot technologies.",
  keywords: [
    "Akash Shetty",
    "Full Stack Developer",
    "Software Engineer",
    "Northeastern University",
    "Boston",
    "Flutter",
    "React",
    "Vue.js",
    "FastAPI",
    "Python",
    "JavaScript",
    "TypeScript",
    "Portfolio"
  ],
  authors: [{ name: "Akash Shetty" }],
  creator: "Akash Shetty",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akashshetty.com",
    title: "Akash Shetty | Full Stack Developer",
    description: "Building cool stuff with hot technologies",
    siteName: "Akash Shetty Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akash Shetty - Full Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Shetty | Full Stack Developer",
    description: "Building cool stuff with hot technologies",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}
      >
        <ThemeProvider>
          <SoundProvider>
            <LoadingBar />
            <CustomCursor />
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  border: "1px solid hsl(var(--border))"
                },
                className: "font-sans",
              }}
              richColors
              expand={false}
              duration={4000}
            />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}