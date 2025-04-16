
import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

export function PageLayout({ children, onSearch }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={onSearch} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
