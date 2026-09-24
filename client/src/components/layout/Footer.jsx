import { useLang } from '../../context/LangContext';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-white/60 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="text-white font-black text-lg">DRIVO</div>
          <div>{t('home.heroTitle')}</div>
        </div>
        <div className="text-xs">© {new Date().getFullYear()} Drivo. All rights reserved.</div>
      </div>
    </footer>
  );
}