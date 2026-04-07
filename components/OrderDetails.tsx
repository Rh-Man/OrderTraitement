"use client";

import { RefreshCw, Clock, Zap, CheckCircle2 } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<OrderStatus, {
  label: string;
  icon: React.ElementType;
  pill: string;
  bar: string;
  dot: string;
}> = {
  PENDING:    { label: "En attente",    icon: Clock,         pill: "bg-amber-50 text-amber-600 border-amber-200",  bar: "bg-amber-400",  dot: "bg-amber-400" },
  PROCESSING: { label: "En traitement", icon: Zap,           pill: "bg-blue-50 text-blue-600 border-blue-200",     bar: "bg-blue-500",   dot: "bg-blue-500"  },
  COMPLETED:  { label: "Complétée",     icon: CheckCircle2,  pill: "bg-emerald-50 text-emerald-600 border-emerald-200", bar: "bg-emerald-500", dot: "bg-emerald-500" },
};

const STEPS: OrderStatus[] = ["PENDING", "PROCESSING", "COMPLETED"];

interface OrderDetailsProps {
  order: Order;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function OrderDetails({ order, onRefresh, isRefreshing }: OrderDetailsProps) {
  const config = STATUS_CONFIG[order.status];
  const Icon = config.icon;
  const currentStep = STEPS.indexOf(order.status);
  // Largeur de la barre : 0%, 50%, 100%
  const progressWidth = ["w-0", "w-1/2", "w-full"][currentStep];

  return (
    <div className="space-y-5">

      {/* Statut pill + refresh */}
      <div className="flex items-center justify-between">
        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium", config.pill)}>
          <Icon className={cn("h-3.5 w-3.5", order.status === "PROCESSING" && "animate-pulse")} />
          {config.label}
        </span>

        {onRefresh && order.status !== "COMPLETED" && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-500 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
          >
            <RefreshCw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
            Actualiser
          </button>
        )}
      </div>

      {/* Barre de progression */}
      <div className="space-y-2.5">
        {/* Track */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className={cn("absolute inset-y-0 left-0 rounded-full transition-all duration-700", config.bar, progressWidth)} />
        </div>
        {/* Labels des étapes */}
        <div className="flex justify-between">
          {STEPS.map((step, i) => (
            <span key={step} className={cn(
              "text-[11px] font-medium transition-colors",
              i <= currentStep ? "text-slate-600" : "text-slate-300"
            )}>
              {STATUS_CONFIG[step].label}
            </span>
          ))}
        </div>
      </div>

      {/* Séparateur */}
      <div className="border-t border-slate-100" />

      {/* Données */}
      <dl className="space-y-3">
        <Row label="ID commande" value={order.id} mono />
        <Row label="Produit" value={order.productName} />
        <Row label="Quantité" value={String(order.quantity)} />
        {order.createdAt && (
          <Row label="Créée le" value={new Date(order.createdAt).toLocaleString("fr-FR")} />
        )}
      </dl>

    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-xs text-slate-400">{label}</dt>
      <dd className={cn(
        "truncate text-right text-sm font-medium text-slate-800",
        mono && "font-mono text-xs text-slate-500"
      )}>
        {value}
      </dd>
    </div>
  );
}
