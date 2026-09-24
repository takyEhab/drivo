import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLang } from '../../context/LangContext';

export default function Header() {
  const { count } = useCart();
  const { t, lang, setLang } = useLang();

  const linkCls = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'text-ember' : 'text-white/80 hover:text-white'}`;

  return (
    <header className="sticky top-0 z-40 bg-ink/90 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">DRIVO</span>
          <span className="hidden sm:inline text-xs text-gray-300">{t('home.heroTitle')}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkCls}>{t('nav.home')}</NavLink>
          <NavLink to="/shop"   className={linkCls}>{t('nav.shop')}</NavLink>
          <NavLink to="/track"  className={linkCls}>{t('nav.track')}</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="text-xs px-2 py-1 rounded border border-white/15 hover:bg-white/5"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          <Link to="/cart" className="relative btn-ghost !py-1.5">
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -end-2 bg-ember text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}