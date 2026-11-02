export function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-10 max-w-2xl"><p className="eyebrow">{eyebrow}</p><h1 className="font-display mt-3 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1><p className="mt-4 text-[15px] leading-7 text-[#68776d]">{description}</p></div>;
}
