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
    <form onSubmit={handleSubmit} noValidate className="space-y-4">

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
          "mt-1 flex w-full items-center justify-center gap-2 rounded-lg",
          "bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white",
          "shadow-sm shadow-indigo-200 transition duration-150",
          "hover:bg-indigo-700 active:scale-[0.99]",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        )}
      >
        {isLoading
          ? <Loader label="Création..." className="text-white/80" />
          : <><span>Créer la commande</span><ArrowRight className="h-4 w-4" /></>
        }
      </button>

    </form>
  );
}

/* Wrapper label + input + erreur */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
