import { OrderForm } from "@/components/OrderForm";
import { ShoppingCart, History } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Nouvelle commande" };

export default function NewOrderPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">
        <Link
          href="/orders"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-700"
        >
          <History className="h-3.5 w-3.5" />
          Voir l'historique
        </Link>

        <div className="mb-12 flex flex-col items-center gap-5 text-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-3xl bg-indigo-500 blur-2xl opacity-20" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700 shadow-xl shadow-indigo-500/40">
              <ShoppingCart className="h-7 w-7 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Nouvelle commande</h1>
            <p className="mt-2 text-sm text-slate-500">Remplissez les champs pour passer votre commande</p>
          </div>
        </div>

        <div className="card p-8">
          <OrderForm />
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Traitement automatique via pipeline serverless
        </p>
      </div>
    </main>
  );
}
