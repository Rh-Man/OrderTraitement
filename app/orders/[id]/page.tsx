import { OrderDetailClient } from "./OrderDetailClient";

interface OrderPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: OrderPageProps) {
  return { title: `Commande #${params.id}` };
}

export default function OrderPage({ params }: OrderPageProps) {
  return <OrderDetailClient id={params.id} />;
}
