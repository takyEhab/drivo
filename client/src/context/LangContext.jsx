import { createContext, useContext, useEffect, useState } from "react";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const dicts = { en, ar };
const Ctx = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("drivo_lang") || "en");

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("drivo_lang", lang);
  }, [lang]);

  const t = (path, vars) => {
    const raw = path.split(".").reduce((o, k) => o?.[k], dicts[lang]);
    let str = raw ?? path;
    if (vars)
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(`{{${k}}}`, v);
      });
    return str;
  };

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
