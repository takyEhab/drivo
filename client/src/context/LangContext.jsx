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
    document.documentElement.classList.toggle("font-ar", lang === "ar");
    localStorage.setItem("drivo_lang", lang);
  }, [lang]);

  const t = (path) =>
    path.split(".").reduce((o, k) => o?.[k], dicts[lang]) ?? path;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
