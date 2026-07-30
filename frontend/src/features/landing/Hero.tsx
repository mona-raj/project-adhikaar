import HeroWorkflow from "./HeroWorkflow";

export default function Hero() {
  return (
    <section className="bg-(--color-primary)">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-20 px-6 py-20 lg:flex-row lg:px-8">
        {/* Left */}

        <div className="max-w-2xl flex-1">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-(--color-accent)">
            Project Adhikaar
          </p>

          <h1 className="text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Everyone has the right
            <br />
            to live <span className="text-(--color-accent)">freely</span>
            , safely,
            <br />
            and with dignity.
          </h1>

          <p className="mt-8 text-lg leading-8 text-green-50">
            Project Adhikaar is an open-source platform that helps vulnerable individuals safely
            connect with trusted organizations that can provide support such as housing, legal aid,
            mental health services, employment assistance, and other essential resources.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#workflow"
              className="rounded-xl bg-(--color-accent) px-7 py-4 font-semibold text-black transition hover:brightness-95"
            >
              Learn How It Works
            </a>

            <a
              href="https://github.com/mona-raj/project-adhikaar"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-(--color-primary)"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-1 justify-center">
          <HeroWorkflow />
        </div>
      </div>
    </section>
  );
}
