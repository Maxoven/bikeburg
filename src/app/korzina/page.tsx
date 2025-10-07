"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { formatPriceRUB } from "@/data/products";

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, clear } = useCart();

  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Корзина</h1>
      {items.length === 0 ? (
        <div className="text-black/70">
          <p>Ваша корзина пуста.</p>
          <Link href="/katalog" className="inline-block mt-6 border border-black px-6 h-11 leading-[44px] text-sm uppercase tracking-wide hover:bg-black hover:text-white">Перейти в каталог</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            {items.map((i) => (
              <div key={i.id} className="flex gap-4 border border-black p-4">
                <div className="relative w-28 h-20 bg-black/5">
                  <Image src={i.image} alt={i.name} fill className="object-contain p-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-medium">{i.name}</h2>
                      {i.color && (
                        <div className="mt-1 flex items-center gap-2 text-xs text-black/60">
                          <span className="inline-flex items-center gap-1">
                            Цвет:
                            <span className="w-3 h-3 inline-block rounded-full border border-black" style={{ backgroundColor: i.color.hex }} />
                          </span>
                          <span>{i.color.name}</span>
                        </div>
                      )}
                      <p className="text-sm text-black/70">{formatPriceRUB(i.price)}</p>
                    </div>
                    <button onClick={() => removeItem(i.id)} className="text-sm uppercase tracking-wide border border-black px-3 h-9 hover:bg-black hover:text-white">Удалить</button>
                  </div>
                  <div className="mt-3 inline-flex items-center border border-black">
                    <button onClick={() => updateQuantity(i.id, i.quantity - 1)} className="w-10 h-10 flex items-center justify-center">−</button>
                    <span className="w-12 text-center text-sm">{i.quantity}</span>
                    <button onClick={() => updateQuantity(i.id, i.quantity + 1)} className="w-10 h-10 flex items-center justify-center">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-black p-6 h-fit">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-wide">Итого</span>
              <span className="text-lg font-medium">{formatPriceRUB(total)}</span>
            </div>
            <button className="mt-6 w-full h-12 bg-black text-white border border-black uppercase text-sm tracking-wide hover:opacity-90">Оформить заказ</button>
            <button onClick={clear} className="mt-3 w-full h-12 bg-white text-black border border-black uppercase text-sm tracking-wide hover:bg-black hover:text-white">Очистить корзину</button>
          </div>
        </div>
      )}
    </section>
  );
}


