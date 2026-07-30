export default function HeroWorkflow() {
  const steps = ["Help Request", "Case", "Recommendations", "Organizations", "Support"];

  return (
    <div className="flex flex-col items-center">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div className="w-72 rounded-2xl bg-white px-6 py-4 text-center shadow-lg">
            <p className="font-semibold text-slate-900">{step}</p>
          </div>

          {index < steps.length - 1 && <div className="my-2 h-10 w-1 rounded-full bg-(--color-accent)" />}
        </div>
      ))}
    </div>
  );
}
