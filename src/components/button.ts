/** Pill-shaped link buttons used in the hero. */
const base =
  'inline-flex items-center rounded-full border px-5 py-2.5 font-semibold text-[0.95rem] transition-colors'

export const button = {
  primary: `${base} border-ink bg-ink text-page`,
  secondary: `${base} border-line bg-surface hover:border-ink`,
  placeholder: `${base} border-line border-dashed text-muted`,
}
