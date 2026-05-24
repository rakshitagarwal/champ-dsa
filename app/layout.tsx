import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/providers/theme-provider";
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
  title: "ChampDSA — Understand algorithms deeply",
  description:
    "Desktop-first DSA practice with saved and AI-powered solution explanations. Recap JavaScript fundamentals and DSA patterns when you need a quick refresh.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-dvh antialiased`}
    >
      <body className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
        <ThemeProvider>
          <div className="flex min-h-0 flex-1 flex-col">
            <AppShell>{children}</AppShell>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
