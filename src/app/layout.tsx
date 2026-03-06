import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aditya Mishra | Machine Learning Portfolio",
    template: "%s | Aditya Mishra",
  },
  description:
    "Machine Learning and Computer Vision portfolio featuring projects, technical writing, and resume details for Aditya Mishra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(213,43,43,0.24),_transparent_68%)] blur-3xl" />
            <div className="absolute -left-24 top-56 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(94,7,12,0.28),_transparent_65%)] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 bg-[radial-gradient(circle,_rgba(255,83,83,0.12),_transparent_60%)] blur-3xl" />
          </div>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
