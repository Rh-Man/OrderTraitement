"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";

export function OrderForm() {
  const router = useRouter();
  const { submit, isLoading, error, reset } = useCreateOrder();

  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!productName.trim()) errors.productName = "Le nom du produit est requis";
    if (quantity === "" || quantity <= 0) errors.quantity = "La quantité doit être supérieure à 0";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    reset();
    if (!validate()) return;
    const order = await submit({ productName: productName.trim(), quantity: Number(quantity) });
    if (order) router.push(`/orders/${order.id}`);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      <Field label="Nom du produit" error={validationErrors.productName}>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="ex: MacBook Pro 14"
          disabled={isLoading}
          className={cn("field-input", validationErrors.productName && "field-input-error")}
        />
      </Field>

      <Field label="Quantité" error={validationErrors.quantity}>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="1"
          disabled={isLoading}
          className={cn("field-input", validationErrors.quantity && "field-input-error")}
        />
      </Field>

      {error && <ErrorMessage message={error} />}

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "group mt-1 flex w-full items-center justify-center gap-2 rounded-xl",
          "bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-semibold text-white",
          "shadow-md shadow-indigo-200 transition-all duration-200",
          "hover:from-indigo-700 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-200",
          "active:scale-[0.99]",
          "focus:outline-none focus:ring-4 focus:ring-indigo-500/20",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        )}
      >
        {isLoading ? (
          <Loader label="Création en cours..." className="text-white/80" />
        ) : (
          <>
            Créer la commande
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </>
        )}
      </button>

    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      {children}
      {error && <p className="flex items-center gap-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
