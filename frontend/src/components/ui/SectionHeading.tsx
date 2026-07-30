type Props = {
  number: string;
  title: string;
};

export default function SectionHeading({ number, title }: Props) {
  return (
    <header className="mb-14">
      <p
        className="
          mb-3
          font-(--font-ui)
          text-xs
          uppercase
          tracking-[0.35em]
          text-(--color-accent)
        "
      >
        {number}
      </p>

      <h2
        className="
          font-(--font-heading)
          text-5xl
          uppercase
          tracking-tight
          text-(--color-text)
        "
      >
        {title}
      </h2>
    </header>
  );
}
