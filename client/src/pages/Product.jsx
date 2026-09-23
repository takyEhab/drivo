import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../lib/axios';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import { egp } from '../lib/format';
import AvailabilityBadge from '../components/product/AvailabilityBadge';

export default function Product() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const { add } = useCart();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    api.get(`/products/${slug}`).then((r) => setP(r.data)).catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) return <div className="p-16 text-center">Product not found.</div>;
  if (!p) return <div className="p-16 text-center">Loading…</div>;

  const name = lang === 'ar' ? p.nameAr : p.nameEn;
  const desc = lang === 'ar' ? p.descriptionAr : p.descriptionEn;
  const disabled = p.availability === 'UNAVAILABLE';

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <div className="space-y-3">
        <div className="aspect-square rounded-2xl overflow-hidden bg-ink-800 border border-white/5">
          <img src={p.images?.[imgIdx]} alt={name} className="w-full h-full object-cover" />
        </div>
        {p.images?.length > 1 && (
          <div className="flex gap-2">
            {p.images.map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden border ${i === imgIdx ? 'border-ember' : 'border-white/10'}`}>
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <AvailabilityBadge availability={p.availability} leadTimeDays={p.leadTimeDays} />
        <div className="text-2xl font-black text-ember">{egp(p.price)}</div>

        {desc && (
          <div>
            <div className="text-sm text-white/60 mb-1">{t('product.description')}</div>
            <p className="text-white/80 whitespace-pre-line">{desc}</p>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <div className="flex items-center border border-white/15 rounded-lg">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-white/5">−</button>
            <span className="px-4">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-white/5">+</button>
          </div>
          <button
            disabled={disabled}
            onClick={() => { add(p, qty); toast.success(t('product.addToCart')); }}
            className="btn-primary flex-1 disabled:opacity-40"
          >
            {disabled ? t('product.outOfStock') : t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}