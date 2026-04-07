import { OrderForm } from "@/components/OrderForm";
import { ShoppingCart } from "lucide-react";

export const metadata = { title: "Nouvelle commande" };

export default function NewOrderPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px]">

        {/* Logo / icône */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Nouvelle commande</h1>
            <p className="mt-0.5 text-sm text-slate-400">Remplissez les champs pour continuer</p>
          </div>
        </div>

        {/* Carte */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-100">
          <OrderForm />
        </div>

      </div>
    </main>
  );
}
