import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LangContext";
import { egp } from "../lib/format";

export default function Cart() {
  const { items, remove, setQty, subtotal } = useCart();
  const { t, lang } = useLang();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="text-2xl font-bold">{t("cart.empty")}</div>
        <Link to="/shop" className="btn-primary">
          {t("home.shopNow")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.productId} className="card p-3 flex items-center gap-3">
            <img src={i.image} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1">
              <Link
                to={`/product/${i.slug}`}
                className="font-medium hover:text-ember"
              >
                {lang === "ar" ? i.nameAr : i.nameEn}
              </Link>
              <div className="text-sm text-white/60">{egp(i.price)}</div>
            </div>
            <div className="flex items-center border border-white/15 rounded-lg">
              <button
                onClick={() => setQty(i.productId, Math.max(1, i.quantity - 1))}
                className="px-3 py-1.5 hover:bg-white/5"
              >
                −
              </button>
              <span className="px-3">{i.quantity}</span>
              <button
                onClick={() => setQty(i.productId, i.quantity + 1)}
                className="px-3 py-1.5 hover:bg-white/5"
              >
                +
              </button>
            </div>
            <div className="w-24 text-end font-bold">
              {egp(i.price * i.quantity)}
            </div>
            <button
              onClick={() => remove(i.productId)}
              className="text-red-400 text-sm hover:underline"
            >
              {t("cart.remove")}
            </button>
          </div>
        ))}
      </div>

      <aside className="card p-5 h-fit space-y-4">
        <div className="flex justify-between">
          <span>{t("cart.subtotal")}</span>
          <span className="font-bold">{egp(subtotal)}</span>
        </div>
        <Link to="/checkout" className="btn-primary w-full">
          {t("cart.checkout")}
        </Link>
      </aside>
    </div>
  );
}
