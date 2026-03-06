import { redirect } from "next/navigation";

// Enquanto o site inglês não está pronto, redireciona para a homepage PT.
// Quando tiveres o site EN pronto, substitui este ficheiro pelo conteúdo real.
export default function EnPage() {
  redirect("/");
}
