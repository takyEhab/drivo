import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/axios";
import { egp } from "../../lib/format";

const STATUSES = [
  "PENDING",
  "SOURCING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

  const load = () =>
    api
      .get("/admin/orders", { params: filter ? { status: filter } : {} })
      .then((r) => setOrders(r.data));
  useEffect(() => {
    load(); /* eslint-disable-next-line */
  }, [filter]);

  const setStatus = async (o, status) => {
    await api.patch(`/admin/orders/${o.id}/status`, { status });
    load();
  };

  const verify = async (o) => {
    await api.patch(`/admin/orders/${o.id}/verify-instapay`);
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <select
          className="input !w-44"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="text-start p-3">Order #</th>
              <th className="text-start p-3">Customer</th>
              <th className="text-start p-3">Total</th>
              <th className="text-start p-3">Payment</th>
              <th className="text-start p-3">Status</th>
              <th className="text-end p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-white/5">
                <td className="p-3 font-mono">{o.orderNumber}</td>
                <td className="p-3">
                  <div>{o.customerName}</div>
                  <div className="text-xs text-white/50">{o.customerPhone}</div>
                </td>
                <td className="p-3">{egp(o.total)}</td>
                <td className="p-3">
                  <div>{o.paymentMethod}</div>
                  <div
                    className={`text-xs ${o.paymentStatus === "PAID" ? "text-emerald-400" : "text-amber-400"}`}
                  >
                    {o.paymentStatus}
                  </div>
                </td>
                <td className="p-3">
                  <select
                    value={o.status}
                    onChange={(e) => setStatus(o, e.target.value)}
                    className="bg-ink-700 border border-white/10 rounded px-2 py-1 text-xs"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 text-end space-x-2">
                  <Link
                    to={`/admin/orders/${o.id}`}
                    className="text-volt hover:underline"
                  >
                    View
                  </Link>
                  {o.paymentMethod === "INSTAPAY" &&
                    o.paymentStatus === "PENDING_VERIFICATION" && (
                      <button
                        onClick={() => verify(o)}
                        className="text-emerald-400 hover:underline"
                      >
                        Verify
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
