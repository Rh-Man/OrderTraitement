import type { CreateOrderPayload, Order } from "@/types/order";

// URL de base de l'API Gateway — à configurer via variable d'environnement
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/**
 * Crée une nouvelle commande via POST /orders
 */
export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? `Erreur ${res.status}`);
  }

  return res.json();
}

/**
 * Récupère une commande par son identifiant via GET /orders/:id
 */
export async function getOrderById(id: string): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    // Désactive le cache Next.js pour toujours avoir le statut à jour
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? `Commande introuvable (${res.status})`);
  }

  return res.json();
}
