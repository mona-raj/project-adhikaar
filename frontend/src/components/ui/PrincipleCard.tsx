type Props = {
  title: string;
  description: string;
};

export default function PrincipleCard({ title, description }: Props) {
  return (
    <article
      className="
        border
        border-(--color-border)
        bg-(--color-surface)
        p-8
        transition
        duration-200
        hover:border-(--color-accent)
      "
    >
      <h3
        className="
          mb-4
          font-(--font-heading)
          text-2xl
          uppercase
          tracking-tight
        "
      >
        {title}
      </h3>

      <p
        className="
          leading-8
          text-(--color-text-muted)
        "
      >
        {description}
      </p>
    </article>
  );
}
