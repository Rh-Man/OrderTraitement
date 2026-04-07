"use client";

import { useState } from "react";
import { createOrder } from "@/services/orderService";
import type { CreateOrderPayload, Order } from "@/types/order";

interface UseCreateOrderReturn {
  submit: (payload: CreateOrderPayload) => Promise<Order | null>;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

/**
 * Hook encapsulant la logique de création de commande.
 * Les composants UI n'ont qu'à appeler `submit` et réagir à `isLoading` / `error`.
 */
export function useCreateOrder(): UseCreateOrderReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => setError(null);

  const submit = async (payload: CreateOrderPayload): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const order = await createOrder(payload);
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error, reset };
}
