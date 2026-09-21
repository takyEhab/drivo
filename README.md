# Drivo — Style Your Ride

Egyptian e-commerce for affordable, stylish car accessories.
Sourcing model: supplier-based / on-demand.

## Stack

- **Client:** React + Vite (Vercel)
- **Server:** Node + Express + Prisma (Render)
- **DB:** Neon Postgres
- **Images:** Cloudinary
- **Auth:** JWT (single admin + optional customers)

## Quick start

### Server

    cd server
    cp .env.example .env       # fill DATABASE_URL, JWT_SECRET
    npm install
    npx prisma migrate dev --name init
    npm run seed
    npm run dev                # http://localhost:5000

### Client

    cd client
    cp .env.example .env
    npm install
    npm run dev                # http://localhost:5173

Default admin (from seed):

- email: `admin@drivo.eg`
- password: `ChangeMeStrong!123`

## Deploy

- **Client → Vercel:** root = `client`, env `VITE_API_URL=<render-url>/api`
- **Server → Render:** root = `server`, build `npm install && npx prisma generate && npx prisma migrate deploy`, start `npm start`
- **DB → Neon:** copy the pooled connection string into `DATABASE_URL`

---

Setup checklist

# 1. Clone

git clone git@github.com:you/drivo.git && cd drivo

# 2. Server

cd server
cp .env.example .env # paste Neon DATABASE_URL + JWT_SECRET
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed # creates admin + 30 products
npm run dev # → http://localhost:5000

# 3. Client (new terminal)

cd ../client
cp .env.example .env
npm install
npm run dev # → http://localhost:5173
