import { ArrowDown, ArrowUpRight } from "lucide-react";

const manifesto = ["Everyone has", "the right to live", "freely, safely,", "and with", "dignity."];

export default function Hero() {
  return (
    <section
      className="
        min-h-screen
        bg-(--color-paper)
        text-(--color-text)
      "
    >
      <div className="mx-auto flex min-h-screen max-w-(--max-width) flex-col justify-center px-8 py-20 lg:px-16">
        {/* Top Rule */}

        {/* Project Name */}

        <p
          className="
            mb-10
            font-(--font-ui)
            text-lg
            uppercase
            tracking-[0.45em]
          "
        >
          Project Adhikaar
        </p>

        <div className="mb-10 h-1 w-32 bg-(--color-accent)" />
        {/* Hero Statement */}

        <h1
          className="
            font-(--font-heading)
            text-[clamp(4rem,8vw,4.5rem)]
            leading-[0.88]
            uppercase
            tracking-tight
          "
        >
          {manifesto.map((line, index) => (
            <span
              key={line}
              className={`block ${index == 2 || index == 4 ? " text-(--color-accent) text-[6rem]/[1.05em] uppercase" : ""}`}
            >
              {line}
            </span>
          ))}
        </h1>

        {/* Description */}

        <p
          className="
            mt-12
            max-w-3xl
            font-(--font-body)
            text-xl
            leading-9
            text-(--color-text-muted)
          "
        >
          Project Adhikaar is an open-source platform that helps vulnerable individuals safely
          connect with trusted organizations that can provide support such as housing, legal aid,
          mental health services, employment assistance, and other essential resources.
        </p>

        {/* Buttons */}

        <div className="mt-14 flex flex-wrap gap-5">
          <a
            href="#overview"
            className="
              inline-flex
              items-center
              gap-3
              border-2
              border-(--color-border)
              bg-(--color-text)
              px-8
              py-4
              font-(--font-ui)
              text-sm
              uppercase
              tracking-[0.18em]
              text-(--color-text-inverse)
              transition
              hover:bg-(--color-accent)
            "
          >
            Why Project Adhikaar
            <ArrowDown size={18} />
          </a>

          <a
            href="https://github.com/mona-raj/project-adhikaar"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-3
              border-2
              border-(--color-border)
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

        {/* Bottom Rule */}

        <div className="mt-20 h-1 w-full bg-(--color-border)" />
      </div>
    </section>
  );
}
