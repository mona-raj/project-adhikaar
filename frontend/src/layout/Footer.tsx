import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-(--color-border)
        py-16
        bg-(--color-accent)
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-(--max-width)
          flex-col
          items-center
          justify-between
          gap-6
          px-8
          text-(--color-text-inverse)
          text-center
          lg:flex-row
          lg:px-16
          lg:text-left
        "
      >
        <div>
          <p
            className="
              text-2xl
              uppercase
            "
          >
            Project Adhikaar
          </p>

          <p
            className="
              mt-2
              text-sm
            "
          >
            Open Source • MIT License
          </p>

          <p
            className="
              mt-6
              text-sm
            "
          >
            © 2026 Project Adhikaar
          </p>
        </div>

        <a
          href="https://github.com/mona-raj/project-adhikaar"
          target="_blank"
          rel="noopener noreferrer"
          className="
              inline-flex
              items-center
              gap-3
              underline
              px-8
              py-4
              font-(--font-ui)
              text-sm
              uppercase
              tracking-[0.18em]
              transition
              hover:bg-(--color-text)
              hover:text-(--color-text-inverse)
            "
        >
          View on GitHub
          <ArrowUpRight size={18} />
        </a>
      </div>
    </footer>
  );
}
