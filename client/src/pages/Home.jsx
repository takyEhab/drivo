import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/axios';
import { useLang } from '../context/LangContext';
import ProductCard from '../components/product/ProductCard';

export default function Home() {
  const { t, lang } = useLang();
  const [featured, setFeatured] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    api.get('/products', { params: { featured: 'true', limit: 8 } }).then((r) => setFeatured(r.data.items));
    api.get('/categories').then((r) => setCats(r.data));
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="text-ember">{t('home.heroTitle')}</span>
            </h1>
            <p className="text-white/70 text-lg max-w-md">{t('home.heroSub')}</p>
            <Link to="/shop" className="btn-primary text-base !py-3 !px-6">{t('home.shopNow')} →</Link>
          </div>
          <div className="hidden md:block aspect-square rounded-3xl bg-gradient-to-br from-ember/20 via-ink-800 to-volt/10 border border-white/5" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-5">{t('home.browseCategories')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {cats.map((c) => (
            <Link key={c.id} to={`/shop?category=${c.slug}`} className="card p-4 text-center hover:border-ember transition">
              <div className="font-medium">{lang === 'ar' ? c.nameAr : c.nameEn}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-5">{t('home.featured')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}