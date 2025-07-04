
import { Header } from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
