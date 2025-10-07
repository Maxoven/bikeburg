"use client";

import React from "react";
import Image from "next/image";
import { products, formatPriceRUB, ProductColor } from "@/data/products";
import ProductModal from "@/components/ProductModal";
import { useCart } from "@/components/cart/CartContext";

export default function CatalogPage() {
  const { addItem } = useCart();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Каталог велосипедов</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image}
            price={p.price}
            brand={p.brand}
            colors={p.colors}
            onAdd={(color) =>
              addItem({ id: p.id + (color ? `-${color.name}` : ""), name: p.name, price: p.price, image: p.image, quantity: 1, color })
            }
            onOpen={() => setActiveId(p.id)}
          />
        ))}
      </div>
      {products.map((p) => (
        <ProductModal
          key={p.id}
          product={p}
          open={activeId === p.id}
          onClose={() => setActiveId(null)}
          onAdd={(color) => {
            addItem({ id: p.id + (color ? `-${color.name}` : ""), name: p.name, price: p.price, image: p.image, quantity: 1, color });
            setActiveId(null);
          }}
        />
      ))}
    </section>
  );
}

function AddToCartButton({ onAdd }: { onAdd: () => void }) {
  const [added, setAdded] = React.useState(false);
  return (
    <button
      onClick={() => {
        onAdd();
        setAdded(true);
        setTimeout(() => setAdded(false), 1000);
      }}
      className={`mt-4 inline-flex h-11 items-center justify-center w-full border border-black text-sm uppercase tracking-wide transition-colors ${
        added ? "bg-white text-black" : "bg-black text-white hover:opacity-90"
      }`}
    >
      {added ? "Добавлено ✓" : "Добавить в корзину"}
    </button>
  );
}

function ProductCard({
  id,
  name,
  image,
  price,
  brand,
  colors,
  onAdd,
  onOpen,
}: {
  id: string;
  name: string;
  image: string;
  price: number;
  brand?: string;
  colors: ProductColor[];
  onAdd: (color?: ProductColor) => void;
  onOpen: () => void;
}) {
  const [selectedColor, setSelectedColor] = React.useState<ProductColor | undefined>(colors?.[0]);
  return (
    <article className="group border border-black bg-white shadow-[4px_4px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] transition-all">
      <div className="p-4">
        <div className="relative aspect-[4/3] bg-black/5">
          <Image src={image} alt={name} fill className="object-contain p-6" />
        </div>
        <h2 className="mt-4 text-lg font-medium">{name}</h2>
        {brand && <p className="mt-1 text-sm text-black/60">Бренд: {brand}</p>}
        <p className="mt-1 text-sm text-black/70">{formatPriceRUB(price)}</p>

        {colors?.length > 0 && (
          <div className="mt-3">
            <div className="text-xs uppercase tracking-wide text-black/60">Цвет</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {colors.map((c) => {
                const active = selectedColor?.name === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`relative w-8 h-8 rounded-full border border-black flex items-center justify-center ${
                      active ? "ring-2 ring-offset-2 ring-black" : ""
                    }`}
                    aria-label={c.name}
                    title={c.name}
                    style={{ backgroundColor: c.hex }}
                  >
                    {c.hex.toLowerCase() === "#ffffff" && (
                      <span className="absolute inset-0 rounded-full border border-black/30" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <AddToCartButton onAdd={() => onAdd(selectedColor)} />
          <button
            onClick={onOpen}
            className="inline-flex h-11 items-center justify-center w-full border border-black text-sm uppercase tracking-wide bg-white text-black hover:bg-black hover:text-white"
          >
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
}


