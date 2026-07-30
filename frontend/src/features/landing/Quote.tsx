export default function Quote() {
  return (
    <section className="bg-(--color-surface)">
      <div
        className="
          mx-auto
          max-w-5xl
          px-8
          py-28
          text-center
        "
      >
        <blockquote
          className="
            font-(--font-body)
            text-[clamp(2rem,4vw,3.25rem)]
            leading-[1.35]
            text-(--color-text)
          "
        >
          “Where, after all, do universal human rights begin?
          <br />
          In small places, close to home...”
        </blockquote>

        <p
          className="
            mt-10
            font-(--font-ui)
            text-sm
            uppercase
            tracking-[0.35em]
            text-(--color-text-muted)
          "
        >
          — Eleanor Roosevelt
        </p>
      </div>
    </section>
  );
}
