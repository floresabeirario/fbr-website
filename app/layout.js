// app/layout.js
// Root layout — minimal passthrough.
// html/body/lang are rendered by app/[locale]/layout.js so the lang attribute
// can be set dynamically per locale.
export default function RootLayout({ children }) {
  return children;
}
