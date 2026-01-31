export default function StatCard({
  label,
  value,
  valueColor = "text-[var(--color-corporate-slate)]",
}: {
  label: string;
  value: number;
  valueColor?: string;
}) {
  return (
    <article className="bg-[var(--color-surface-white)] rounded-xl p-6 shadow-sm">
      <p className="text-sm text-[var(--color-metallic-silver)]">{label}</p>
      <strong className={`mt-2 block text-3xl font-bold ${valueColor}`}>
        {value}
      </strong>
    </article>
  );
}
