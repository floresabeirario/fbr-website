export const metadata = {
  title: 'Flores à Beira Rio | Eternização de Bouquets',
  description: 'Eternizamos o seu bouquet de noiva. Arte em resina e preservação floral em Portugal. Transformamos o seu dia especial numa memória intemporal.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#fcfbf9', color: '#333' }}>
        {/* MENU DE NAVEGAÇÃO */}
        <nav style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eaeaea' }}>
          <strong style={{ fontSize: '1.2rem', color: '#c5a880' }}>Flores à Beira Rio</strong>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem' }}>
            <a href="/" style={{ textDecoration: 'none', color: '#333' }}>Início</a>
            <a href="/opcoes-e-precos" style={{ textDecoration: 'none', color: '#333' }}>Preços</a>
            <a href="/passo-a-passo" style={{ textDecoration: 'none', color: '#333' }}>Passo a Passo</a>
            <a href="/faq" style={{ textDecoration: 'none', color: '#333' }}>FAQ</a>
          </div>
        </nav>
        
        {/* AQUI ENTRAM AS PÁGINAS */}
        {children}
      </body>
    </html>
  )
}
