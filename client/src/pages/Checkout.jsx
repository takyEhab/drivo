import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/axios";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LangContext";
import { egp } from "../lib/format";

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const { t, lang } = useLang();
  const nav = useNavigate();

  const [govs, setGovs] = useState([]);
  const [freeThreshold, setFreeThreshold] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    governorate: "",
    paymentMethod: "COD",
    instapayRef: "",
    notes: "",
  });

  const instapayHandle =
    import.meta.env.VITE_INSTAPAY_HANDLE || "drivo@instapay";

  useEffect(() => {
    api.get("/shipping/governorates").then((r) => {
      setGovs(r.data.governorates);
      setFreeThreshold(r.data.freeShippingThreshold);
    });
  }, []);

  useEffect(() => {
    if (!form.governorate) return setShipping(0);
    api
      .post("/shipping/quote", { governorate: form.governorate, subtotal })
      .then((r) => setShipping(r.data.fee));
  }, [form.governorate, subtotal]);

  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        {t("cart.empty")}
      </div>
    );
  }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.paymentMethod === "INSTAPAY" && !form.instapayRef.trim()) {
      return toast.error("Please enter the InstaPay reference number");
    }
    setSubmitting(true);
    try {
      const { data } = await api.post("/orders", {
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
        customer: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          street: form.street,
          city: form.city,
          governorate: form.governorate,
        },
        paymentMethod: form.paymentMethod,
        instapayRef: form.instapayRef,
        notes: form.notes,
      });
      clear();
      nav(`/order/${data.orderNumber}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not place order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-[1fr_340px] gap-6"
    >
      <div className="space-y-5">
        <h1 className="text-2xl font-bold">{t("checkout.title")}</h1>

        <div className="card p-5 grid sm:grid-cols-2 gap-3">
          <input
            className="input"
            placeholder={t("checkout.fullName")}
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          <input
            className="input"
            placeholder={t("checkout.phone")}
            required
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          <input
            className="input sm:col-span-2"
            type="email"
            placeholder={t("checkout.email")}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <input
            className="input sm:col-span-2"
            placeholder={t("checkout.street")}
            required
            value={form.street}
            onChange={(e) => set("street", e.target.value)}
          />
          <input
            className="input"
            placeholder={t("checkout.city")}
            required
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
          />
          <select
            className="input"
            required
            value={form.governorate}
            onChange={(e) => set("governorate", e.target.value)}
          >
            <option value="">{t("checkout.governorate")}</option>
            {govs.map((g) => (
              <option key={g.key} value={g.key}>
                {lang === "ar" ? g.ar : g.en} ({g.fee} EGP)
              </option>
            ))}
          </select>
        </div>

        <div className="card p-5 space-y-3">
          <div className="font-semibold">{t("checkout.payment")}</div>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pm"
              checked={form.paymentMethod === "COD"}
              onChange={() => set("paymentMethod", "COD")}
            />
            {t("checkout.cod")}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pm"
              checked={form.paymentMethod === "INSTAPAY"}
              onChange={() => set("paymentMethod", "INSTAPAY")}
            />
            {t("checkout.instapay")}
          </label>

          {form.paymentMethod === "INSTAPAY" && (
            <div className="mt-2 p-3 rounded-lg bg-volt/10 border border-volt/30 text-sm space-y-2">
              <div>
                {t("checkout.instapayNote", { handle: instapayHandle })}
              </div>
              <input
                className="input"
                placeholder={t("checkout.instapayRef")}
                value={form.instapayRef}
                onChange={(e) => set("instapayRef", e.target.value)}
              />
            </div>
          )}
        </div>

        <textarea
          className="input"
          rows={3}
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </div>

      <aside className="card p-5 h-fit space-y-3">
        {items.map((i) => (
          <div key={i.productId} className="flex justify-between text-sm">
            <span className="truncate">
              {lang === "ar" ? i.nameAr : i.nameEn} × {i.quantity}
            </span>
            <span>{egp(i.price * i.quantity)}</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>{t("cart.subtotal")}</span>
            <span>{egp(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("checkout.shipping")}</span>
            <span>{egp(shipping)}</span>
          </div>
          {freeThreshold > 0 && subtotal < freeThreshold && (
            <div className="text-xs text-white/50">
              Free shipping over {egp(freeThreshold)}
            </div>
          )}
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-white/10 pt-3">
          <span>Total</span>
          <span>{egp(total)}</span>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full"
        >
          {submitting ? "…" : t("checkout.placeOrder")}
        </button>
      </aside>
    </form>
  );
}
