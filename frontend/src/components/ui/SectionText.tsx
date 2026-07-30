type Props = {
  children: React.ReactNode;
};

export default function SectionText({ children }: Props) {
  return (
    <p
      className="
        max-w-3xl
        font-(--font-body)
        text-lg
        leading-9
        text-(--color-text-muted)
      "
    >
      {children}
    </p>
  );
}
