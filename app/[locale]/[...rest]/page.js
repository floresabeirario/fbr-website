// app/[locale]/[...rest]/page.js
// Catch-all: qualquer URL que não corresponda a nenhuma página conhecida
// dispara o not-found.js do locale (404 com marca, dentro do layout).
// Sem isto, URLs desconhecidos mostravam o 404 default do Next sem navegação.
import { notFound } from "next/navigation";

export default function CatchAllPage() {
  notFound();
}
