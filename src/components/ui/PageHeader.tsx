import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 ${className}`}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-corporate-slate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-metallic-silver mt-1 text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {children && <div className="flex items-center gap-3">{children}</div>}
    </header>
  );
}
