import Link from "next/link";

const navigation = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/vendor-onboarding", label: "Sell with us" },
  { href: "/gmv-dashboard", label: "GMV dashboard" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-[#080d09]/95">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4 sm:px-8"
      >
        <Link href="/" className="inline-flex items-center gap-2.5 font-semibold tracking-tight text-white">
          <span aria-hidden="true" className="grid size-8 place-items-center rounded-xl bg-lime-300 text-sm text-emerald-950">
            T
          </span>
          TFarms
        </Link>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-300">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-lime-300 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
