export default function Chip({ status }) {
  const map = {
    pending: {
      text: "Belum Bayar",
      bg: "bg-warning-background",
      color: "text-main-secondary",
    },
    paid: {
      text: "Berhasil",
      bg: "bg-success-background",
      color: "text-success-default",
    },
    failed: {
      text: "Gagal",
      bg: "bg-error-background",
      color: "text-error-default",
    },
  };

  const config = map[status];

  if (!config) return null;

  return (
    <div className={`rounded-[10px] py-1 px-2.5 ${config.bg}`}>
      <span className={`font-dm text-sm ${config.color}`}>{config.text}</span>
    </div>
  );
}
