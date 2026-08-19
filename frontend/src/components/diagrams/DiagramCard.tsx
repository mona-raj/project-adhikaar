import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface DiagramCardProps {
  icon: LucideIcon;
  title: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
}

export default function DiagramCard({ icon: Icon, title, badge, children, className }: DiagramCardProps) {
  return (
    <div
      className={`
        flex
        min-h-50
        w-full
        max-w-72
        flex-col
        rounded-xl
        border-2
        border-(--color-border)
        bg-(--color-surface)
        p-4
        shadow-sm
      ` + className}
    >
      <div className="mb-4 flex items-center justify-between">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-(--color-accent)
            text-(--color-text-inverse)
          "
        >
          <Icon size={24} />
        </div>

        {badge && (
          <span
            className="
              rounded-full
              border
              border-(--color-border)
              px-3
              py-1
              font-(--font-ui)
              text-xs
              uppercase
              tracking-wider
            "
          >
            {badge}
          </span>
        )}
      </div>

      <h3
        className="
          font-(--font-heading)
          text-xl
          text-(--color-text)
        "
      >
        {title}
      </h3>

      <div
        className="
          mt-4
          flex-1
          font-(--font-body)
          text-sm
          leading-5
          text-(--color-text-muted)
        "
      >
        {children}
      </div>
    </div>
  );
}
