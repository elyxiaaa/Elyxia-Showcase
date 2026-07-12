type Props = {
  url: string;
  image: string;
  alt: string;
  className?: string;
  imageLoading?: 'eager' | 'lazy';
};

export function BrowserMockup({
  url,
  image,
  alt,
  className = '',
  imageLoading = 'lazy',
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 truncate text-xs text-zinc-500">{url}</span>
      </div>
      <img
        src={image}
        alt={alt}
        className="aspect-[16/10] w-full object-cover object-top"
        loading={imageLoading}
      />
    </div>
  );
}
