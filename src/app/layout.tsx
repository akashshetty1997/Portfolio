// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SoundProvider } from "@/components/providers/sound-provider";
import { LoadingBar } from "@/components/effects/loading-bar";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
                // Prevent FOUC (Flash of Unstyled Content)
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          forcedTheme="dark"
        >
          <SoundProvider>
            <LoadingBar />
            <CustomCursor />
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "oklch(var(--card))",
                  color: "oklch(var(--card-foreground))",
                  border: "1px solid oklch(var(--border))"
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