"use client";

import Link from "next/link";
import { Clock, Zap, CheckCircle2, Package, RefreshCw } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { Loader } from "@/components/Loader";
import { ErrorMessage } from "@/components/ErrorMessage";
import type { OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: React.ElementType; className: string }> = {
  PENDING:    { label: "En attente",    icon: Clock,        className: "bg-amber-50 text-amber-600 border-amber-200" },
  PROCESSING: { label: "En traitement", icon: Zap,          className: "bg-blue-50 text-blue-600 border-blue-200" },
  COMPLETED:  { label: "Complétée",     icon: CheckCircle2, className: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

export function OrdersList() {
  const { orders, isLoading, error, refresh } = useOrders();

  if (isLoading) return <Loader label="Chargement des commandes..." />;
  if (error) return <ErrorMessage message={error} />;
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Package className="h-12 w-12 text-slate-300 mb-3" />
        <p className="text-sm text-slate-400">Aucune commande pour le moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header avec refresh */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-slate-400">{orders.length} commande{orders.length > 1 ? "s" : ""}</p>
        <button
          onClick={refresh}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-500 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw className="h-3 w-3" />
          Actualiser
        </button>
      </div>

      {/* Liste */}
      <div className="space-y-3">
        {orders.map((order) => {
          const config = STATUS_CONFIG[order.status];
          const Icon = config.icon;
          return (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="group block rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{order.productName}</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Quantité: {order.quantity} • {order.createdAt && new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-bold", config.className)}>
                  <Icon className={cn("h-3.5 w-3.5", order.status === "PROCESSING" && "animate-pulse")} />
                  {config.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
