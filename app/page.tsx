import { redirect } from "next/navigation";

// Redirige la racine vers la page de création de commande
export default function Home() {
  redirect("/orders/new");
}
