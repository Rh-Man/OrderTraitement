"use client";

import { RefreshCw, Clock, Zap, CheckCircle2 } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<OrderStatus, {
  label: string;
  icon: React.ElementType;
  pill: string;
  track: string;
  step: number;
}> = {
  PENDING:    { label: "En attente",    icon: Clock,        pill: "bg-amber-50   text-amber-600  border-amber-200",   track: "bg-amber-400",   step: 0 },
  PROCESSING: { label: "En traitement", icon: Zap,          pill: "bg-blue-50    text-blue-600   border-blue-200",    track: "bg-blue-500",    step: 1 },
  COMPLETED:  { label: "Complétée",     icon: CheckCircle2, pill: "bg-emerald-50 text-emerald-600 border-emerald-200", track: "bg-emerald-500", step: 2 },
};

const STEPS: OrderStatus[] = ["PENDING", "PROCESSING", "COMPLETED"];
const PROGRESS = ["w-[16%]", "w-[58%]", "w-full"];

interface OrderDetailsProps {
  order: Order;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function OrderDetails({ order, onRefresh, isRefreshing }: OrderDetailsProps) {
  const config = STATUS_CONFIG[order.status];
  const Icon = config.icon;
  const step = config.step;

  return (
    <div className="space-y-6">

      {/* Statut + refresh */}
      <div className="flex items-center justify-between">
        <span className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold",
          config.pill
        )}>
          <Icon className={cn("h-3.5 w-3.5", order.status === "PROCESSING" && "animate-pulse")} />
          {config.label}
        </span>

        {onRefresh && order.status !== "COMPLETED" && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5",
              "text-xs font-medium text-slate-500 shadow-sm transition-all",
              "hover:border-slate-300 hover:text-slate-700",
              "disabled:cursor-not-allowed disabled:opacity-40"
            )}
          >
            <RefreshCw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
            Actualiser
          </button>
        )}
      </div>

      {/* Progression */}
      <div className="space-y-3">
        {/* Étapes avec points */}
        <div className="relative flex items-center justify-between">
          {/* Ligne de fond */}
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-slate-100" />
          {/* Ligne de progression */}
          <div
            className={cn(
              "absolute left-0 top-1/2 h-px -translate-y-1/2 transition-all duration-700",
              config.track,
              PROGRESS[step]
            )}
          />
          {/* Points */}
          {STEPS.map((s, i) => {
            const done = i <= step;
            const current = i === step;
            const sc = STATUS_CONFIG[s];
            return (
              <div key={s} className="relative z-10 flex flex-col items-center gap-1.5">
                <div className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-500",
                  done
                    ? `border-transparent ${sc.track} text-white shadow-sm`
                    : "border-slate-200 bg-white text-slate-300"
                )}>
                  <sc.icon className={cn("h-3.5 w-3.5", current && s === "PROCESSING" && "animate-pulse")} />
                </div>
              </div>
            );
          })}
        </div>
        {/* Labels */}
        <div className="flex justify-between">
          {STEPS.map((s, i) => (
            <span key={s} className={cn(
              "text-[11px] font-medium transition-colors",
              i <= step ? "text-slate-600" : "text-slate-300"
            )}>
              {STATUS_CONFIG[s].label}
            </span>
          ))}
        </div>
      </div>

      {/* Séparateur */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Données */}
      <dl className="space-y-3.5">
        <Row label="ID commande" value={order.id} mono />
        <Row label="Produit"     value={order.productName} />
        <Row label="Quantité"    value={String(order.quantity)} />
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
      <dt className="shrink-0 text-xs font-medium text-slate-400">{label}</dt>
      <dd className={cn(
        "truncate text-right text-sm font-semibold text-slate-800",
        mono && "font-mono text-xs font-normal text-slate-500"
      )}>
        {value}
      </dd>
    </div>
  );
}
