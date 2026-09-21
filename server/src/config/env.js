import "dotenv/config";

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || "7d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  adminEmail: process.env.ADMIN_EMAIL,
  adminPass: process.env.ADMIN_PASSWORD,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  instapayHandle: process.env.INSTAPAY_HANDLE || "drivo@instapay",
};
