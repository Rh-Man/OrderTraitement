import type { CreateOrderPayload, Order } from "@/types/order";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product: payload.productName,
      quantity: payload.quantity,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? `Erreur ${res.status}`);
  }

  const data = await res.json();
  
  return {
    id: data.orderId,
    productName: payload.productName,
    quantity: payload.quantity,
    status: data.status,
  };
}

export async function getAllOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? `Erreur ${res.status}`);
  }

  const data = await res.json();
  
  return data.map((item: any) => ({
    id: item.id,
    productName: item.product,
    quantity: item.quantity,
    status: item.status,
    createdAt: item.created_at,
  }));
}

export async function getOrderById(id: string): Promise<Order> {
  const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? `Commande introuvable (${res.status})`);
  }

  const data = await res.json();
  
  return {
    id: data.id,
    productName: data.product,
    quantity: data.quantity,
    status: data.status,
    createdAt: data.created_at,
  };
}
