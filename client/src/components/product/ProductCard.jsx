import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { useCart } from '../../context/CartContext';
import { egp } from '../../lib/format';
import AvailabilityBadge from './AvailabilityBadge';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { lang, t } = useLang();
  const { add } = useCart();
  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const disabled = product.availability === 'UNAVAILABLE';

  return (
    <div className="card overflow-hidden group">
      <Link to={`/product/${product.slug}`} className="block aspect-square bg-ink-700 overflow-hidden">
        <img
          src={product.images?.[0] || 'https://placehold.co/600x600/15151B/FFFFFF?text=Drivo'}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </Link>
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.slug}`} className="block font-semibold line-clamp-2 min-h-[3rem]">
          {name}
        </Link>
        <AvailabilityBadge availability={product.availability} leadTimeDays={product.leadTimeDays} />
        <div className="flex items-center justify-between pt-1">
          <div className="text-lg font-bold">{egp(product.price)}</div>
          <button
            disabled={disabled}
            onClick={() => { add(product, 1); toast.success(t('product.addToCart')); }}
            className="btn-primary !py-1.5 !px-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {disabled ? t('product.outOfStock') : t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}