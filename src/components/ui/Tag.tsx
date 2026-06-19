type Props = { children: React.ReactNode };

export function Tag({ children }: Props) {
  return (
    <span className="border border-zinc-800 text-zinc-500 text-xs uppercase tracking-widest px-2.5 py-1 rounded">
      {children}
    </span>
  );
}
