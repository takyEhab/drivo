import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../lib/axios";
import ProductCard from "../components/product/ProductCard";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [q, setQ] = useState(params.get("search") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/categories").then((r) => setCats(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", {
        params: {
          category: params.get("category") || undefined,
          search: params.get("search") || undefined,
          availability: params.get("availability") || undefined,
        },
      })
      .then((r) => setItems(r.data.items))
      .finally(() => setLoading(false));
  }, [params]);

  const updateParam = (k, v) => {
    const next = new URLSearchParams(params);
    v ? next.set(k, v) : next.delete(k);
    setParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-[220px_1fr] gap-6">
      <aside className="space-y-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && updateParam("search", q)}
          placeholder="Search…"
          className="input"
        />
        <div>
          <div className="text-sm text-white/60 mb-2">Category</div>
          <div className="space-y-1">
            <button
              onClick={() => updateParam("category", "")}
              className={`block w-full text-start px-2 py-1 rounded ${!params.get("category") ? "bg-white/10" : "hover:bg-white/5"}`}
            >
              All
            </button>
            {cats.map((c) => (
              <button
                key={c.id}
                onClick={() => updateParam("category", c.slug)}
                className={`block w-full text-start px-2 py-1 rounded ${params.get("category") === c.slug ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                {c.nameEn}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm text-white/60 mb-2">Availability</div>
          <select
            className="input"
            value={params.get("availability") || ""}
            onChange={(e) => updateParam("availability", e.target.value)}
          >
            <option value="">Any</option>
            <option value="AVAILABLE">Available</option>
            <option value="MADE_TO_ORDER">Made to order</option>
          </select>
        </div>
      </aside>

      <div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-white/60 py-16 text-center">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
