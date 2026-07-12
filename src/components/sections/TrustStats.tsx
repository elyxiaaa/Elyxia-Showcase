const STATS = [
  { value: '3+', label: 'Years of Experience' },
  { value: '9', label: 'Projects Shipped' },
  { value: '8', label: 'Sites Live in Production' },
  { value: '5', label: 'Gaming Communities Served' },
] as const;

export default function TrustStats() {
  return (
    <div className="border-b border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 divide-x divide-zinc-800 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-6 py-10 first:pl-0 md:px-10">
              <p className="text-4xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
