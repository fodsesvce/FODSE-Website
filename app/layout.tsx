import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/layout/InteractiveBackground";
import PageTransition from "@/components/layout/PageTransition";
import SplashProvider from "@/components/SplashProvider";

export const metadata: Metadata = {
  title: {
    default: "FODSE — Forum of Data Science Engineers | SVCE",
    template: "%s | FODSE",
  },
  description:
    "FODSE is the official Data Science Club of Sri Venkateswara College of Engineering (SVCE). We bring together learners, builders, and thinkers driven by Data Science, Machine Learning, AI, and Analytics.",
  keywords: [
    "FODSE",
    "Data Science",
    "SVCE",
    "Sri Venkateswara College of Engineering",
    "Machine Learning",
    "AI Club",
    "Student Community",
  ],
  openGraph: {
    title: "FODSE — Forum of Data Science Engineers",
    description:
      "SVCE's premier community for students driven by curiosity in Data Science, ML, AI, and Analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="bg-background text-text-primary antialiased">
        <SplashProvider>
          <div className="noise-overlay" />

          <InteractiveBackground />

          <Navbar />

          <PageTransition>
            <main className="min-h-screen">{children}</main>
          </PageTransition>

          <Footer />
        </SplashProvider>
      </body>
    </html>
  );
}