import { ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  href: string;
};

export default function ResourcesLink({ title, description, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        flex
        items-start
        justify-between
        gap-6
        border
        border-(--color-border)
        bg-(--color-surface)
        p-6
        transition
        duration-200
        hover:border-(--color-accent)
      "
    >
      <div>
        <h3
          className="
            font-(--font-heading)
            text-xl
            uppercase
            tracking-tight
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            leading-7
            text-(--color-text-muted)
          "
        >
          {description}
        </p>
      </div>

      <ArrowUpRight
        className="
          mt-1
          shrink-0
          transition-transform
          group-hover:translate-x-1
          group-hover:-translate-y-1
        "
        size={20}
      />
    </a>
  );
}
