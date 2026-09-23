import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("drivo_cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("drivo_cart", JSON.stringify(items));
  }, [items]);

  const add = (product, quantity = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.productId === product.id);
      if (found)
        return prev.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          nameEn: product.nameEn,
          nameAr: product.nameAr,
          image: product.images?.[0],
          price: Number(product.price),
          availability: product.availability,
          leadTimeDays: product.leadTimeDays,
          quantity,
        },
      ];
    });
  };

  const remove = (productId) =>
    setItems((p) => p.filter((i) => i.productId !== productId));
  const setQty = (productId, quantity) =>
    setItems((p) =>
      p.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    );
  const clear = () => setItems([]);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <Ctx.Provider
      value={{ items, add, remove, setQty, clear, subtotal, count }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
