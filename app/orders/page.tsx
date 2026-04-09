import Link from "next/link";
import { Plus, History } from "lucide-react";
import { OrdersList } from "@/components/OrdersList";

export const metadata = { title: "Historique des commandes" };

export default function OrdersPage() {
  return (
    <main className="flex min-h-screen items-start justify-center px-4 py-16">
      <div className="w-full max-w-[600px]">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-3xl bg-slate-600 blur-2xl opacity-15" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-xl shadow-slate-500/30">
                <History className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Historique</h1>
              <p className="mt-1 text-sm text-slate-500">Toutes vos commandes</p>
            </div>
          </div>

          <Link
            href="/orders/new"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300" />
            Nouvelle
          </Link>
        </div>

        <div className="card p-7">
          <OrdersList />
        </div>
      </div>
    </main>
  );
}
