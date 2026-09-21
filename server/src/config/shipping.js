export const GOVERNORATES = {
  Cairo:        { en: 'Cairo',        ar: 'القاهرة',       fee: 50 },
  Giza:         { en: 'Giza',         ar: 'الجيزة',        fee: 50 },
  Qalyubia:     { en: 'Qalyubia',     ar: 'القليوبية',     fee: 55 },
  Alexandria:   { en: 'Alexandria',   ar: 'الإسكندرية',    fee: 60 },
  Dakahlia:     { en: 'Dakahlia',     ar: 'الدقهلية',      fee: 65 },
  Sharqia:      { en: 'Sharqia',      ar: 'الشرقية',       fee: 65 },
  Gharbia:      { en: 'Gharbia',      ar: 'الغربية',       fee: 65 },
  Monufia:      { en: 'Monufia',      ar: 'المنوفية',      fee: 65 },
  Beheira:      { en: 'Beheira',      ar: 'البحيرة',       fee: 70 },
  KafrElSheikh: { en: 'Kafr El Sheikh', ar: 'كفر الشيخ',   fee: 70 },
  Damietta:     { en: 'Damietta',     ar: 'دمياط',         fee: 70 },
  PortSaid:     { en: 'Port Said',    ar: 'بورسعيد',       fee: 70 },
  Ismailia:     { en: 'Ismailia',     ar: 'الإسماعيلية',   fee: 70 },
  Suez:         { en: 'Suez',         ar: 'السويس',        fee: 70 },
  NorthSinai:   { en: 'North Sinai',  ar: 'شمال سيناء',    fee: 90 },
  SouthSinai:   { en: 'South Sinai',  ar: 'جنوب سيناء',    fee: 90 },
  RedSea:       { en: 'Red Sea',      ar: 'البحر الأحمر',  fee: 90 },
  Fayoum:       { en: 'Fayoum',       ar: 'الفيوم',        fee: 75 },
  BeniSuef:     { en: 'Beni Suef',    ar: 'بني سويف',      fee: 75 },
  Minya:        { en: 'Minya',        ar: 'المنيا',        fee: 80 },
  Asyut:        { en: 'Asyut',        ar: 'أسيوط',         fee: 85 },
  Sohag:        { en: 'Sohag',        ar: 'سوهاج',         fee: 85 },
  Qena:         { en: 'Qena',         ar: 'قنا',           fee: 90 },
  Luxor:        { en: 'Luxor',        ar: 'الأقصر',        fee: 90 },
  Aswan:        { en: 'Aswan',        ar: 'أسوان',         fee: 100 },
  NewValley:    { en: 'New Valley',   ar: 'الوادي الجديد', fee: 110 },
  Matrouh:      { en: 'Matrouh',      ar: 'مطروح',         fee: 95 },
};

export const FREE_SHIPPING_THRESHOLD = 1500; // EGP, 0 = disabled

export function calcShipping(governorate, subtotal) {
  if (FREE_SHIPPING_THRESHOLD && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return GOVERNORATES[governorate]?.fee ?? 80;
}