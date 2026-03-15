// app/_lib/utils.js
// Utilitários partilhados entre componentes

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}
