interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border transition ${
        selected
          ? "bg-ink text-paper border-ink"
          : "bg-white text-ink/60 border-ink/15 hover:border-ink/30"
      }`}
    >
      {label}
    </button>
  );
}