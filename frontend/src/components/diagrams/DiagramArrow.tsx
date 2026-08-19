import { ArrowDown, ArrowRight } from "lucide-react";

interface DiagramArrowProps {
  direction?: "responsive" | "horizontal" | "vertical";
}

export default function DiagramArrow({ direction = "responsive" }: DiagramArrowProps) {
  if (direction === "horizontal") {
    return (
      <ArrowRight
        size={36}
        strokeWidth={2}
        className="
          shrink-0
          text-(--color-accent)
        "
      />
    );
  }

  if (direction === "vertical") {
    return (
      <ArrowDown
        size={36}
        strokeWidth={2}
        className="
          shrink-0
          text-(--color-accent)
        "
      />
    );
  }

  return (
    <>
      <ArrowRight
        size={36}
        strokeWidth={2}
        className="
          hidden
          shrink-0
          text-(--color-accent)
          lg:block
        "
      />

      <ArrowDown
        size={36}
        strokeWidth={2}
        className="
          shrink-0
          text-(--color-accent)
          lg:hidden
        "
      />
    </>
  );
}
