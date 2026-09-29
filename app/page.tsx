import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_15%,rgba(132,204,22,0.16),transparent_36%),linear-gradient(180deg,#101910_0%,#080d09_100%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-200/20 bg-lime-200/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-lime-200">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-lime-300" />
              A better way to buy and sell fresh
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Good food starts
              <span className="block text-lime-300">with good connections.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-300">
              Meet the growers behind your food. TFarms brings independent farms
              and thoughtful buyers together in one simple marketplace.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/marketplace"
                className="rounded-full bg-lime-300 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
              >
                Explore the marketplace
              </Link>
              <Link
                href="/vendor-onboarding"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-lime-200/60 hover:text-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
              >
                I’m a grower
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6 text-sm text-stone-400">
              <p><span className="font-semibold text-white">Farm fresh</span> sourcing</p>
              <p><span className="font-semibold text-white">Fair</span> for growers</p>
              <p><span className="font-semibold text-white">Simple</span> from field to table</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-lime-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#18231a] p-5 shadow-2xl shadow-black/40 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-400">From the field</p>
                  <p className="mt-1 text-lg font-medium text-white">This week’s harvest</p>
                </div>
                <span className="rounded-full bg-lime-300/10 px-3 py-1 text-xs font-medium text-lime-200">In season</span>
              </div>
              <div aria-hidden="true" className="my-6 grid aspect-[4/3] grid-cols-2 gap-3">
                <div className="grid place-items-center rounded-3xl bg-gradient-to-br from-lime-300/30 via-lime-800/40 to-emerald-950 text-7xl">🥬</div>
                <div className="grid place-items-center rounded-3xl bg-gradient-to-br from-orange-300/30 via-rose-800/30 to-emerald-950 text-7xl">🍅</div>
                <div className="grid place-items-center rounded-3xl bg-gradient-to-br from-amber-200/30 via-amber-800/30 to-emerald-950 text-7xl">🌽</div>
                <div className="grid place-items-center rounded-3xl bg-gradient-to-br from-violet-300/30 via-fuchsia-900/30 to-emerald-950 text-7xl">🍇</div>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div>
                  <p className="font-medium text-white">Harvested with care</p>
                  <p className="mt-1 text-sm text-stone-400">Grown by your neighbors</p>
                </div>
                <Link href="/marketplace" aria-label="Browse this week's harvest" className="grid size-11 shrink-0 place-items-center rounded-full bg-lime-300 text-xl text-emerald-950 transition hover:bg-lime-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-lime-300">Grow together</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">A marketplace built around the people who grow.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-stone-400">Discover what’s growing nearby, or bring your harvest to more customers.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { number: "01", title: "Find your next favorite", text: "Explore fresh, thoughtfully grown products from independent farms.", href: "/marketplace", action: "Browse produce" },
            { number: "02", title: "Grow your business", text: "Get your farm in front of new buyers with a simple onboarding flow.", href: "/vendor-onboarding", action: "Join as a vendor" },
            { number: "03", title: "See the bigger picture", text: "Follow marketplace momentum through a clear GMV overview.", href: "/gmv-dashboard", action: "View the dashboard" },
          ].map((item) => (
            <article key={item.number} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
              <p className="text-sm font-medium text-lime-300">{item.number}</p>
              <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 min-h-12 text-sm leading-6 text-stone-400">{item.text}</p>
              <Link href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lime-200 hover:text-lime-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-200">
                {item.action}<span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
