// server/prisma/seed.js
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
  // ...add ~25 more of your choice
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
  console.log("✅ Seeded");
}

main().finally(() => prisma.$disconnect());
