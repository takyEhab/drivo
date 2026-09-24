import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';

export default function AdminLayout() {
  const { logout } = useAuth();
  const { t } = useLang();
  const nav = useNavigate();

  const cls = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-ember text-white' : 'text-white/80 hover:bg-white/5'}`;

  return (
    <div className="min-h-screen flex bg-ink">
      <aside className="w-56 border-e border-white/5 p-4 space-y-1">
        <Link to="/admin" className="block text-2xl font-black mb-6">DRIVO<span className="text-ember">.</span></Link>
        <NavLink to="/admin" end className={cls}>{t('admin.dashboard')}</NavLink>
        <NavLink to="/admin/products" className={cls}>{t('admin.products')}</NavLink>
        <NavLink to="/admin/orders" className={cls}>{t('admin.orders')}</NavLink>
        <button
          onClick={() => { logout(); nav('/admin/login'); }}
          className="w-full text-start px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-white/5 mt-6"
        >
          {t('admin.logout')}
        </button>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}