// Statuts possibles d'une commande (alignés avec les états SQS/Lambda)
export type OrderStatus = "PENDING" | "PROCESSING" | "COMPLETED";

// Payload envoyé lors de la création d'une commande
export interface CreateOrderPayload {
  productName: string;
  quantity: number;
}

// Représentation complète d'une commande retournée par l'API
export interface Order {
  id: string;
  productName: string;
  quantity: number;
  status: OrderStatus;
  createdAt?: string;
}

// Réponse générique de l'API
export interface ApiError {
  message: string;
  statusCode?: number;
}
