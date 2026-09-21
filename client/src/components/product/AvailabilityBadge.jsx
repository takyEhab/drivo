import { useLang } from "../../context/LangContext";

export default function AvailabilityBadge({ availability, leadTimeDays = 3 }) {
  const { t } = useLang();
  const map = {
    AVAILABLE: {
      text: t("product.available").replace("{{days}}", leadTimeDays),
      cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    MADE_TO_ORDER: {
      text: t("product.madeToOrder").replace("{{days}}", leadTimeDays),
      cls: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
    UNAVAILABLE: {
      text: t("product.unavailable"),
      cls: "bg-red-500/15 text-red-400 border-red-500/30",
    },
  };
  const cfg = map[availability] || map.AVAILABLE;
  return (
    <span
      className={`inline-block text-xs px-2 py-1 rounded-full border ${cfg.cls}`}
    >
      {cfg.text}
    </span>
  );
}
