type Props = { children: React.ReactNode };

export function SectionLabel({ children }: Props) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
      {children}
    </p>
  );
}
