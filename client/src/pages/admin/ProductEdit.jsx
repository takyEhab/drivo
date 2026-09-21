import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../lib/axios";

const empty = {
  slug: "",
  nameEn: "",
  nameAr: "",
  descriptionEn: "",
  descriptionAr: "",
  price: 0,
  comparePrice: "",
  images: [],
  categoryId: "",
  availability: "AVAILABLE",
  leadTimeDays: 3,
  isFeatured: false,
  isPublished: true,
};

export default function ProductEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState(empty);
  const [cats, setCats] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/categories").then((r) => setCats(r.data));
    if (!isNew)
      api
        .get(`/products/${id}`)
        .then((r) => setForm(r.data))
        .catch(() => toast.error("Load failed"));
  }, [id, isNew]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
      leadTimeDays: Number(form.leadTimeDays),
    };
    try {
      if (isNew) await api.post("/admin/products", payload);
      else await api.put(`/admin/products/${id}`, payload);
      toast.success("Saved");
      nav("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const addImage = () => {
    if (!imgUrl) return;
    set("images", [...(form.images || []), imgUrl]);
    setImgUrl("");
  };

  return (
    <form onSubmit={save} className="space-y-5 max-w-3xl">
      <h1 className="text-2xl font-bold">
        {isNew ? "New product" : "Edit product"}
      </h1>

      <div className="card p-5 grid sm:grid-cols-2 gap-3">
        <input
          className="input"
          placeholder="Slug"
          required
          value={form.slug}
          onChange={(e) => set("slug", e.target.value)}
        />
        <input
          className="input"
          placeholder="Name EN"
          required
          value={form.nameEn}
          onChange={(e) => set("nameEn", e.target.value)}
        />
        <input
          className="input"
          placeholder="Name AR"
          required
          value={form.nameAr}
          onChange={(e) => set("nameAr", e.target.value)}
        />
        <select
          className="input"
          required
          value={form.categoryId}
          onChange={(e) => set("categoryId", e.target.value)}
        >
          <option value="">Select category</option>
          {cats.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameEn}
            </option>
          ))}
        </select>
        <input
          className="input"
          type="number"
          placeholder="Price"
          required
          value={form.price}
          onChange={(e) => set("price", e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Compare price (optional)"
          value={form.comparePrice}
          onChange={(e) => set("comparePrice", e.target.value)}
        />
        <select
          className="input"
          value={form.availability}
          onChange={(e) => set("availability", e.target.value)}
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="MADE_TO_ORDER">MADE_TO_ORDER</option>
          <option value="UNAVAILABLE">UNAVAILABLE</option>
        </select>
        <input
          className="input"
          type="number"
          placeholder="Lead time (days)"
          value={form.leadTimeDays}
          onChange={(e) => set("leadTimeDays", e.target.value)}
        />
        <textarea
          className="input sm:col-span-2"
          placeholder="Description EN"
          rows={3}
          value={form.descriptionEn}
          onChange={(e) => set("descriptionEn", e.target.value)}
        />
        <textarea
          className="input sm:col-span-2"
          placeholder="Description AR"
          rows={3}
          value={form.descriptionAr}
          onChange={(e) => set("descriptionAr", e.target.value)}
        />
      </div>

      <div className="card p-5 space-y-3">
        <div className="font-semibold">Images</div>
        <div className="flex gap-2">
          <input
            className="input"
            placeholder="https://…"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <button type="button" onClick={addImage} className="btn-ghost">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(form.images || []).map((u, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10"
            >
              <img src={u} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() =>
                  set(
                    "images",
                    form.images.filter((_, x) => x !== i),
                  )
                }
                className="absolute top-0 end-0 bg-red-500 text-white text-xs w-5 h-5"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => set("isFeatured", e.target.checked)}
          />{" "}
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => set("isPublished", e.target.checked)}
          />{" "}
          Published
        </label>
      </div>

      <button className="btn-primary" disabled={saving}>
        {saving ? "…" : "Save"}
      </button>
    </form>
  );
}
