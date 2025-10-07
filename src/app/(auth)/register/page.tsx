"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Ошибка регистрации");
      }
      // Auto-login after register
      const login = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!login.ok) {
        throw new Error("Не удалось выполнить автоматический вход");
      }
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 max-w-md">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Регистрация</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Имя</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full border border-black px-3 h-11" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border border-black px-3 h-11" />
        </div>
        <div>
          <label className="block text-sm mb-1">Пароль</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full border border-black px-3 h-11" />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button disabled={loading} className="w-full h-12 bg-black text-white border border-black uppercase text-sm tracking-wide hover:opacity-90">
          {loading ? "Регистрируем..." : "Зарегистрироваться"}
        </button>
      </form>
      <div className="mt-4 text-sm">
        Уже есть аккаунт? <a href="/login" className="underline">Войдите</a>
      </div>
    </section>
  );
}


