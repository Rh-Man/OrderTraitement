export type OrderStatus = "PENDING" | "PROCESSING" | "COMPLETED";

export interface CreateOrderPayload {
  productName: string;
  quantity: number;
}

export interface Order {
  id: string;
  productName: string;
  quantity: number;
  status: OrderStatus;
  createdAt?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
