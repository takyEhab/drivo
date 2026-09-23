import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/axios";
import { useLang } from "../context/LangContext";
import { egp } from "../lib/format";

export default function OrderSuccess() {
  const { orderNumber } = useParams();
  const { t, lang } = useLang();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/track/${orderNumber}`).then((r) => setOrder(r.data));
  }, [orderNumber]);

  if (!order) return <div className="p-16 text-center">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="text-emerald-400 text-5xl">✓</div>
        <h1 className="text-3xl font-bold">{t("order.success")}</h1>
        <div className="text-white/70">
          {t("order.number")}:{" "}
          <span className="font-mono text-white">{order.orderNumber}</span>
        </div>
      </div>

      <div className="card p-5 space-y-2">
        {order.items.map((i) => (
          <div key={i.id} className="flex justify-between text-sm">
            <span>
              {lang === "ar" ? i.nameAr : i.nameEn} × {i.quantity}
            </span>
            <span>{egp(Number(i.price) * i.quantity)}</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{egp(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{egp(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{egp(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to={`/track?order=${order.orderNumber}`} className="btn-ghost">
          {t("order.track")}
        </Link>
      </div>
    </div>
  );
}
