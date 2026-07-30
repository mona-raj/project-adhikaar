type SectionProps = {
  id: string;
  children: React.ReactNode;
};

export default function Section({ id, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-28 ${id === "overview" ? "" : " border-t border-(--color-border)"}`}
    >
      <div
        className="
          mx-auto
          max-w-(--max-width)
          px-8
          lg:px-16
        "
      >
        {children}
      </div>
    </section>
  );
}
