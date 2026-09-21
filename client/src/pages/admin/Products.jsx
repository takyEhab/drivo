import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../lib/axios";
import { egp } from "../../lib/format";

export default function AdminProducts() {
  const [items, setItems] = useState([]);

  const load = () => api.get("/admin/products").then((r) => setItems(r.data));
  useEffect(() => {
    load();
  }, []);

  const toggleAvail = async (p, availability) => {
    await api.patch(`/admin/products/${p.id}/availability`, { availability });
    toast.success("Updated");
    load();
  };

  const remove = async (p) => {
    if (!confirm(`Delete ${p.nameEn}?`)) return;
    await api.delete(`/admin/products/${p.id}`);
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/admin/products/new" className="btn-primary">
          + New product
        </Link>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="text-start p-3">Name</th>
              <th className="text-start p-3">Category</th>
              <th className="text-start p-3">Price</th>
              <th className="text-start p-3">Availability</th>
              <th className="text-end p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t border-white/5">
                <td className="p-3">{p.nameEn}</td>
                <td className="p-3 text-white/70">{p.category?.nameEn}</td>
                <td className="p-3">{egp(p.price)}</td>
                <td className="p-3">
                  <select
                    value={p.availability}
                    onChange={(e) => toggleAvail(p, e.target.value)}
                    className="bg-ink-700 border border-white/10 rounded px-2 py-1 text-xs"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="MADE_TO_ORDER">MADE_TO_ORDER</option>
                    <option value="UNAVAILABLE">UNAVAILABLE</option>
                  </select>
                </td>
                <td className="p-3 text-end space-x-2">
                  <Link
                    to={`/admin/products/${p.id}`}
                    className="text-volt hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(p)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
