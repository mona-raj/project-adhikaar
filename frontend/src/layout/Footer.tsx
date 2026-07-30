export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10">
      <div className="mx-auto max-w-7xl px-6 text-sm text-slate-500 lg:px-8">
        © {new Date().getFullYear()} Project Adhikaar
      </div>
    </footer>
  );
}
