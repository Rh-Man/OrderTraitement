"use client";

import Link from "next/link";
import { ArrowLeft, Package, History } from "lucide-react";
import { useOrder } from "@/hooks/useOrder";
import { OrderDetails } from "@/components/OrderDetails";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";

const POLLING_INTERVAL = 5000;

export function OrderDetailClient({ id }: { id: string }) {
  const { order, isLoading, error, refresh } = useOrder(id, POLLING_INTERVAL);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">

        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/orders/new"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Nouvelle commande
          </Link>
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-slate-700"
          >
            <History className="h-3.5 w-3.5" />
            Historique
          </Link>
        </div>

        {/* Header */}
        <div className="mb-7 flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-violet-500 blur-xl opacity-25" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Suivi commande</h1>
            <p className="mt-0.5 truncate font-mono text-xs text-slate-400">{id}</p>
          </div>
        </div>

        {/* Card */}
        <div className="card p-7">
          {isLoading && !order && <Loader label="Chargement de la commande..." />}
          {error && <ErrorMessage message={error} />}
          {order && <OrderDetails order={order} onRefresh={refresh} isRefreshing={isLoading} />}
        </div>

        {order && order.status !== "COMPLETED" && (
          <p className="mt-5 text-center text-xs text-slate-400">
            Actualisation automatique toutes les 5s
          </p>
        )}

      </div>
    </main>
  );
}
