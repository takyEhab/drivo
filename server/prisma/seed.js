import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  { slug: "interior", nameEn: "Interior", nameAr: "الداخلية" },
  { slug: "exterior", nameEn: "Exterior", nameAr: "الخارجية" },
  { slug: "lighting", nameEn: "Lighting", nameAr: "الإضاءة" },
  { slug: "audio", nameEn: "Audio", nameAr: "الصوتيات" },
  { slug: "care", nameEn: "Car Care", nameAr: "العناية بالسيارة" },
  { slug: "storage", nameEn: "Storage", nameAr: "التنظيم" },
];

const products = [
  {
    slug: "led-ambient-strip",
    nameEn: "LED Ambient Interior Strip",
    nameAr: "شريط إضاءة داخلي LED",
    price: 349,
    category: "lighting",
    availability: "AVAILABLE",
    leadTimeDays: 3,
    isFeatured: true,
  },
  {
    slug: "magnetic-phone-mount",
    nameEn: "Magnetic Phone Mount",
    nameAr: "حامل هاتف مغناطيسي",
    price: 199,
    category: "interior",
    availability: "AVAILABLE",
    leadTimeDays: 2,
    isFeatured: true,
  },
  {
    slug: "premium-car-vacuum",
    nameEn: "Premium Car Vacuum",
    nameAr: "مكنسة سيارة بريميوم",
    price: 899,
    category: "care",
    availability: "MADE_TO_ORDER",
    leadTimeDays: 7,
  },
  {
    slug: "seat-gap-organizer",
    nameEn: "Seat Gap Organizer",
    nameAr: "منظم بين المقاعد",
    price: 249,
    category: "storage",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "car-perfume-diffuser",
    nameEn: "Car Perfume Diffuser",
    nameAr: "معطر سيارة",
    price: 179,
    category: "interior",
    availability: "AVAILABLE",
    leadTimeDays: 2,
    isFeatured: true,
  },
  {
    slug: "phone-charger-pad",
    nameEn: "Wireless Charging Pad",
    nameAr: "شاحن لاسلكي",
    price: 459,
    category: "interior",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "trunk-organizer",
    nameEn: "Trunk Organizer",
    nameAr: "منظم صندوق السيارة",
    price: 389,
    category: "storage",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "tire-pressure-gauge",
    nameEn: "Digital Tire Pressure Gauge",
    nameAr: "مقياس ضغط الإطارات",
    price: 179,
    category: "care",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "headlight-led-kit",
    nameEn: "LED Headlight Kit",
    nameAr: "طقم كشافات LED",
    price: 749,
    category: "lighting",
    availability: "MADE_TO_ORDER",
    leadTimeDays: 5,
  },
  {
    slug: "dash-cam-hd",
    nameEn: "HD Dash Camera",
    nameAr: "كاميرا سيارة HD",
    price: 1299,
    category: "audio",
    availability: "MADE_TO_ORDER",
    leadTimeDays: 7,
  },
  {
    slug: "sun-shade-windshield",
    nameEn: "Windshield Sun Shade",
    nameAr: "مظلة زجاج أمامي",
    price: 149,
    category: "interior",
    availability: "AVAILABLE",
    leadTimeDays: 2,
  },
  {
    slug: "steering-cover",
    nameEn: "Leather Steering Cover",
    nameAr: "غطاء ستيرنج جلد",
    price: 229,
    category: "interior",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "floor-mats-set",
    nameEn: "All-Weather Floor Mats Set",
    nameAr: "طقم دواسات",
    price: 549,
    category: "interior",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "car-wash-kit",
    nameEn: "Complete Car Wash Kit",
    nameAr: "طقم غسيل شامل",
    price: 649,
    category: "care",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "bluetooth-fm",
    nameEn: "Bluetooth FM Transmitter",
    nameAr: "بث بلوتوث FM",
    price: 249,
    category: "audio",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "usb-hub-multi",
    nameEn: "Multi-Port USB Hub",
    nameAr: "موزع USB متعدد",
    price: 299,
    category: "interior",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "emergency-tool-kit",
    nameEn: "Emergency Tool Kit",
    nameAr: "حقيبة طوارئ",
    price: 799,
    category: "care",
    availability: "MADE_TO_ORDER",
    leadTimeDays: 7,
  },
  {
    slug: "car-cover-waterproof",
    nameEn: "Waterproof Car Cover",
    nameAr: "غطاء سيارة مقاوم للماء",
    price: 999,
    category: "exterior",
    availability: "MADE_TO_ORDER",
    leadTimeDays: 7,
  },

  {
    slug: "led-strip-exterior",
    nameEn: "Exterior LED Strip",
    nameAr: "شريط إضاءة خارجي",
    price: 279,
    category: "lighting",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "seat-cushion-memory",
    nameEn: "Memory Foam Seat Cushion",
    nameAr: "وسادة مقعد طبية",
    price: 329,
    category: "interior",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "wheel-cleaner-spray",
    nameEn: "Wheel Cleaner Spray",
    nameAr: "سبراي تنظيف الجنوط",
    price: 149,
    category: "care",
    availability: "AVAILABLE",
    leadTimeDays: 2,
  },
  {
    slug: "dashboard-mat",
    nameEn: "Non-Slip Dashboard Mat",
    nameAr: "لاصق تابلوه",
    price: 99,
    category: "interior",
    availability: "AVAILABLE",
    leadTimeDays: 2,
  },
  {
    slug: "car-fridge-mini",
    nameEn: "Mini Car Fridge 6L",
    nameAr: "ثلاجة سيارة 6 لتر",
    price: 1899,
    category: "interior",
    availability: "MADE_TO_ORDER",
    leadTimeDays: 10,
  },
  {
    slug: "jump-starter-portable",
    nameEn: "Portable Jump Starter",
    nameAr: "جهاز تشغيل بطارية",
    price: 1599,
    category: "care",
    availability: "MADE_TO_ORDER",
    leadTimeDays: 7,
  },
  {
    slug: "bike-rack-rear",
    nameEn: "Rear Bike Rack",
    nameAr: "حامل دراجات خلفي",
    price: 1449,
    category: "exterior",
    availability: "MADE_TO_ORDER",
    leadTimeDays: 10,
  },
  {
    slug: "ambient-foot-light",
    nameEn: "Ambient Footwell Lights",
    nameAr: "إضاءة أرضية",
    price: 229,
    category: "lighting",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
  {
    slug: "subwoofer-under-seat",
    nameEn: "Under-Seat Subwoofer",
    nameAr: "صب ووفر تحت المقعد",
    price: 2199,
    category: "audio",
    availability: "MADE_TO_ORDER",
    leadTimeDays: 10,
  },
  {
    slug: "windshield-wiper-set",
    nameEn: "Premium Wiper Blade Set",
    nameAr: "طقم مساحات",
    price: 349,
    category: "exterior",
    availability: "AVAILABLE",
    leadTimeDays: 3,
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@drivo.eg";
  const adminPass = process.env.ADMIN_PASSWORD || "ChangeMeStrong!123";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: await bcrypt.hash(adminPass, 10),
      name: "Drivo Admin",
      role: "ADMIN",
    },
  });

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }

  for (const p of products) {
    const cat = await prisma.category.findUnique({
      where: { slug: p.category },
    });
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
        categoryId: cat.id,
        isPublished: true,
        images: [
          `https://placehold.co/800x800/0B0B0F/FFFFFF?text=${encodeURIComponent(p.nameEn)}`,
        ],
        descriptionEn: `${p.nameEn} — premium quality, sourced to order.`,
        descriptionAr: `${p.nameAr} — جودة ممتازة، يُوفر حسب الطلب.`,
      },
    });
  }
  console.log("✅ Seed complete");
}

main().finally(() => prisma.$disconnect());
