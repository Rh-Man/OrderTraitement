"use client";

import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { useOrder } from "@/hooks/useOrder";
import { OrderDetails } from "@/components/OrderDetails";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";

const POLLING_INTERVAL = 5000;

export function OrderDetailClient({ id }: { id: string }) {
  const { order, isLoading, error, refresh } = useOrder(id, POLLING_INTERVAL);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px]">

        {/* Retour */}
        <Link
          href="/orders/new"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-slate-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Retour
        </Link>

        {/* En-tête */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-200">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-slate-900">Suivi de commande</h1>
            <p className="truncate font-mono text-xs text-slate-400">{id}</p>
          </div>
        </div>

        {/* Carte */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-100">
          {isLoading && !order && <Loader label="Chargement..." />}
          {error && <ErrorMessage message={error} />}
          {order && <OrderDetails order={order} onRefresh={refresh} isRefreshing={isLoading} />}
        </div>

        {order && order.status !== "COMPLETED" && (
          <p className="mt-4 text-center text-xs text-slate-400">
            Actualisation automatique toutes les 5s
          </p>
        )}

      </div>
    </main>
  );
}
