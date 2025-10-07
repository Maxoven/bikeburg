export default function Home() {
  return (
    <section className="py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Современные велосипеды для города и приключений</h1>
          <p className="mt-4 text-black/70">BikeBurg — минимализм, скорость и комфорт. Подберите идеальный велосипед в нашем каталоге.</p>
          <div className="mt-8 flex gap-4">
            <a href="/katalog" className="inline-flex items-center justify-center px-6 h-12 bg-black text-white text-sm uppercase tracking-wide border border-black hover:opacity-90">Перейти в каталог</a>
            <a href="/o-nas" className="inline-flex items-center justify-center px-6 h-12 bg-white text-black text-sm uppercase tracking-wide border border-black hover:bg-black hover:text-white">О нас</a>
          </div>
        </div>
        <div className="aspect-[4/3] bg-black/5 border border-black/10" />
      </div>
    </section>
  );
}
