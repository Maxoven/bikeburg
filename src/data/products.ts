export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  name: string;
  price: number; // in RUB
  image: string; // path under /public/images
  brand?: string;
  colors: ProductColor[];
};

export const products: Product[] = [
  {
    id: "city-1",
    name: "Городской BikeBurg C1",
    price: 45990,
    image: "/images/city-1.svg",
    brand: "BikeBurg",
    colors: [
      { name: "Чёрный", hex: "#000000" },
      { name: "Белый", hex: "#FFFFFF" },
      { name: "Серый", hex: "#6B7280" },
    ],
  },
  {
    id: "road-1",
    name: "Шоссейный BikeBurg R1",
    price: 89990,
    image: "/images/road-1.svg",
    brand: "BikeBurg",
    colors: [
      { name: "Чёрный", hex: "#000000" },
      { name: "Красный", hex: "#EF4444" },
      { name: "Белый", hex: "#FFFFFF" },
    ],
  },
  {
    id: "mtb-1",
    name: "Горный BikeBurg M1",
    price: 67990,
    image: "/images/mtb-1.svg",
    brand: "BikeBurg",
    colors: [
      { name: "Чёрный", hex: "#000000" },
      { name: "Синий", hex: "#3B82F6" },
      { name: "Оливковый", hex: "#6B8E23" },
    ],
  },
  {
    id: "gravel-1",
    name: "Грэвел BikeBurg G1",
    price: 75990,
    image: "/images/gravel-1.svg",
    brand: "BikeBurg",
    colors: [
      { name: "Песочный", hex: "#C2B280" },
      { name: "Чёрный", hex: "#000000" },
      { name: "Тёмно-зелёный", hex: "#064E3B" },
    ],
  },
];

export function formatPriceRUB(value: number): string {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);
}


