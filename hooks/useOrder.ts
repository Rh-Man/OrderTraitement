"use client";

import { useState, useEffect, useCallback } from "react";
import { getOrderById } from "@/services/orderService";
import type { Order } from "@/types/order";

interface UseOrderReturn {
  order: Order | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useOrder(id: string, pollingInterval?: number): UseOrderReturn {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    if (!pollingInterval || order?.status === "COMPLETED") return;

    const interval = setInterval(fetchOrder, pollingInterval);
    return () => clearInterval(interval);
  }, [pollingInterval, fetchOrder, order?.status]);

  return { order, isLoading, error, refresh: fetchOrder };
}
