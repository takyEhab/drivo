import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/axios";
import { useLang } from "../context/LangContext";
import { egp } from "../lib/format";

export default function TrackOrder() {
  const [params] = useSearchParams();
  const { t, lang } = useLang();
  const [num, setNum] = useState(params.get("order") || "");
  const [order, setOrder] = useState(null);

  const lookup = async (n = num) => {
    if (!n.trim()) return;
    try {
      const { data } = await api.get(`/orders/track/${n.trim()}`);
      setOrder(data);
    } catch {
      toast.error("Order not found");
      setOrder(null);
    }
  };

  useEffect(() => {
    if (params.get("order"))
      lookup(params.get("order")); /* eslint-disable-next-line */
  }, []);

  const statusColor = {
    PENDING: "text-amber-400",
    SOURCING: "text-amber-400",
    CONFIRMED: "text-volt",
    SHIPPED: "text-volt",
    DELIVERED: "text-emerald-400",
    CANCELLED: "text-red-400",
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold text-center">{t("order.track")}</h1>
      <div className="flex gap-2">
        <input
          className="input"
          placeholder="DRV-XX-XXXXX"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
        <button onClick={() => lookup()} className="btn-primary">
          {t("order.track")}
        </button>
      </div>

      {order && (
        <div className="card p-5 space-y-3">
          <div className="flex justify-between">
            <span className="font-mono">{order.orderNumber}</span>
            <span className={`font-bold ${statusColor[order.status] || ""}`}>
              {order.status}
            </span>
          </div>
          {order.items.map((i) => (
            <div
              key={i.id}
              className="flex justify-between text-sm text-white/80"
            >
              <span>
                {lang === "ar" ? i.nameAr : i.nameEn} × {i.quantity}
              </span>
              <span>{egp(Number(i.price) * i.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
            <span>Total</span>
            <span>{egp(order.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
