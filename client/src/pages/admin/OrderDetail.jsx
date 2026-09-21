import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { egp } from "../../lib/format";

export default function OrderDetail() {
  const { id } = useParams();
  const [o, setO] = useState(null);

  useEffect(() => {
    api.get(`/admin/orders/${id}`).then((r) => setO(r.data));
  }, [id]);

  if (!o) return <div>Loading…</div>;

  const print = () => window.print();

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order {o.orderNumber}</h1>
        <button onClick={print} className="btn-ghost">
          Print
        </button>
      </div>

      <div className="card p-5 grid sm:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-white/60">Customer</div>
          <div>{o.customerName}</div>
          <div>{o.customerPhone}</div>
          {o.customerEmail && <div>{o.customerEmail}</div>}
        </div>
        <div>
          <div className="text-white/60">Shipping to</div>
          <div>{o.addressStreet}</div>
          <div>
            {o.addressCity}, {o.governorate}
          </div>
        </div>
        <div>
          <div className="text-white/60">Payment</div>
          <div>
            {o.paymentMethod} — {o.paymentStatus}
          </div>
          {o.instapayRef && <div>Ref: {o.instapayRef}</div>}
        </div>
        <div>
          <div className="text-white/60">Status</div>
          <div>{o.status}</div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="text-start p-3">Item</th>
              <th className="text-start p-3">Supplier</th>
              <th className="text-start p-3">Qty</th>
              <th className="text-start p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {o.items.map((i) => (
              <tr key={i.id} className="border-t border-white/5">
                <td className="p-3">{i.nameEn}</td>
                <td className="p-3 text-white/60">
                  {i.product?.supplier?.name || "—"}
                </td>
                <td className="p-3">{i.quantity}</td>
                <td className="p-3">{egp(Number(i.price))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card p-5 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{egp(o.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{egp(o.shippingFee)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-white/10 pt-2">
          <span>Total</span>
          <span>{egp(o.total)}</span>
        </div>
      </div>
    </div>
  );
}
