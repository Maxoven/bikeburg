import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">BikeBurg</h3>
          <p className="mt-2 text-sm text-white/70">Российский бренд и магазин современных велосипедов.</p>
          <p className="mt-2 text-xs text-white/60 max-w-sm">
            Мы создаём универсальные городские, шоссейные и грэвел велосипеды с акцентом на надёжность, лаконичный стиль
            и простоту обслуживания.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Навигация</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Главная</Link></li>
            <li><Link href="/katalog" className="hover:underline">Каталог велосипедов</Link></li>
            <li><Link href="/o-nas" className="hover:underline">О нас</Link></li>
            <li><Link href="/kontakty" className="hover:underline">Контакты</Link></li>
            <li><Link href="/korzina" className="hover:underline">Корзина</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider">Контакты</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>Телефон: +7 (495) 123-45-67</li>
            <li>Email: info@bikeburg.ru</li>
            <li>Адрес: Санкт-Петербург, Невский пр., 1</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 text-xs text-white/60 flex items-center justify-between">
          <span>© {new Date().getFullYear()} BikeBurg. Все права защищены.</span>
          <div className="space-x-4">
            <a href="#" className="hover:underline">Условия</a>
            <a href="#" className="hover:underline">Политика</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


