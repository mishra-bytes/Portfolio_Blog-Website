import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="blog-shell min-h-screen bg-slate-50 text-slate-900">
      <Navbar variant="light" />
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}
