import "@fontsource/cinzel/600.css";
import "@fontsource/cinzel/700.css";
import { UpsideDownVines } from "@/components/decor/upside-down-vines";
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
          <UpsideDownVines />
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(210,26,54,0.16),_transparent_68%)] blur-3xl" />
            <div className="absolute -left-24 top-36 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(26,42,92,0.2),_transparent_66%)] blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 bg-[radial-gradient(circle,_rgba(255,55,79,0.12),_transparent_60%)] blur-3xl" />
          </div>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
