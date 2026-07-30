import type { ReactNode } from "react";

import Sidebar from "./Sidebar";

interface DocumentationLayoutProps {
  children: ReactNode;
}

export default function DocumentationLayout({ children }: DocumentationLayoutProps) {
  return (
    <section
      className="
        border-t
        border-(--color-border)
        bg-(--color-surface-alt)
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-(--max-width)
          gap-20
          px-8
          py-20
          lg:px-16
        "
      >
        <Sidebar />

        <main
          className="
            min-w-0
            flex-1
          "
        >
          {children}
        </main>
      </div>
    </section>
  );
}
