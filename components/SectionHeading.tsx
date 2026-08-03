import { brand } from './theme';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  id?: string;
}

export default function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div id={id} className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-4" style={{ color: brand.gold }}>
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-white mb-4">
        {title}
      </h2>
      <p className="text-sm sm:text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}
