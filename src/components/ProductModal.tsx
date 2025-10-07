"use client";

import React from "react";
import Image from "next/image";
import { Product, ProductColor, formatPriceRUB } from "@/data/products";

type Props = {
  product: Product;
  initialColor?: ProductColor;
  open: boolean;
  onClose: () => void;
  onAdd: (color?: ProductColor) => void;
};

export default function ProductModal({ product, initialColor, open, onClose, onAdd }: Props) {
  const [selectedColor, setSelectedColor] = React.useState<ProductColor | undefined>(initialColor || product.colors?.[0]);

  React.useEffect(() => {
    if (open) setSelectedColor(initialColor || product.colors?.[0]);
  }, [open, initialColor, product.colors]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white border border-black shadow-[8px_8px_0_0_#000] w-[min(92vw,800px)] max-h-[90vh] overflow-auto">
        <button onClick={onClose} aria-label="Закрыть" className="absolute top-2 right-2 w-9 h-9 border border-black bg-white hover:bg-black hover:text-white">×</button>
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/3] bg-black/5">
            <Image src={product.image} alt={product.name} fill className="object-contain p-6" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            {product.brand && <p className="mt-1 text-sm text-black/60">Бренд: {product.brand}</p>}
            <p className="mt-2 text-lg font-medium">{formatPriceRUB(product.price)}</p>

            {product.colors?.length > 0 && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-black/60">Цвет</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((c) => {
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

            <button
              onClick={() => onAdd(selectedColor)}
              className="mt-6 inline-flex h-11 items-center justify-center w-full border border-black text-sm uppercase tracking-wide bg-black text-white hover:opacity-90"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


