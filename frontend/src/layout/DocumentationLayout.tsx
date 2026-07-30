import type { ReactNode } from "react";

import Sidebar from "./Sidebar";

interface DocumentationLayoutProps {
  children: ReactNode;
}

export default function DocumentationLayout({ children }: DocumentationLayoutProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl gap-16 px-6 py-20 lg:px-8">
        <Sidebar />

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </section>
  );
}
