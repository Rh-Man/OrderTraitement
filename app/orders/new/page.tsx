import { OrderForm } from "@/components/OrderForm";
import { ShoppingCart } from "lucide-react";

export const metadata = { title: "Nouvelle commande" };

export default function NewOrderPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">

        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-indigo-500 blur-xl opacity-30" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Nouvelle commande</h1>
            <p className="mt-1.5 text-sm text-slate-500">Remplissez les champs pour passer votre commande</p>
          </div>
        </div>

        {/* Card */}
        <div className="card p-7">
          <OrderForm />
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Traitement automatique via pipeline serverless
        </p>
      </div>
    </main>
  );
}
