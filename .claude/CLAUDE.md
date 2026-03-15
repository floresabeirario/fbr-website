# CLAUDE.md — Flores à Beira Rio

## Sobre o Projeto
Site institucional e de vendas da Flores à Beira Rio (floresabeirario.pt).
Stack: Next.js 16 (App Router), React 19, Framer Motion 12, CSS puro.
Deploy: Vercel, automático a partir do branch `main`.
Idioma do código: inglês. Idioma do conteúdo: português europeu.

---

## Regras Absolutas (nunca violar)

1. **Nunca alteres texto de conteúdo** — títulos, descrições, CTAs, copy — sem aprovação explícita da fundadora.
2. **Nunca uses `"latest"` em dependências.** Sempre versões exactas (ex: `"next": "16.1.6"`).
3. **Nunca injectes CSS com `dangerouslySetInnerHTML`.** Usa `globals.css` ou CSS Modules.
4. **Nunca hardcodes** número de telefone, email, URLs de formulário ou links sociais.
   Importa sempre de `app/_lib/constants.js`.
5. **Não quebrares o deploy.** Antes de qualquer refatoração de componente partilhado
   (Nav, Footer, layout.js), confirma o impacto em todas as páginas que o importam.
6. **Nunca faças push directo para `main`** sem confirmar com a fundadora.
7. **Nunca cries ficheiros de documentação** (`.md`, `README`) sem ser pedido explicitamente.

---

## Estilo de Código

### Componentes
- Client Components obrigatoriamente com `"use client"` na **primeira linha** do ficheiro.
- Nomenclatura: PascalCase para componentes (`HeroSection.jsx`), kebab-case para pastas (`como-funciona/`).
- Padrão estabelecido: `page.js` (Server) + `NomeDaPáginaClient.jsx` (Client) — manter consistente.
- Máximo **300 linhas** por componente. Acima disso, propõe divisão antes de continuar.

### Estilos
- Cores: usar **sempre** variáveis CSS de `globals.css` (ex: `var(--green)`, `var(--cream)`).
- **Nunca** usar hex codes inline no JSX (ex: ~~`color: "#3D6B5E"`~~).
- Espaçamentos responsivos via `clamp()` — padrões já definidos em `globals.css`, reutilizar.
- Hover/focus states: implementar **sempre em CSS** (`:hover`, `:focus-visible`), nunca via `onMouseEnter` com `e.currentTarget.style`.

### Server vs. Client Components
- `page.js` = Server Component. Apenas metadata, fetch de dados, estrutura mínima.
- `*Client.jsx` = Client Component. Interactividade, animações, estado local (`useState`, `useEffect`).
- Nunca colocar lógica de negócio num Client Component. Passa como props a partir do Server Component.

### Imports
- Ordem: React → Next.js → bibliotecas externas → componentes internos → estilos.
- Path aliases configurados: `@/` aponta para a raiz do projeto.

---

## SEO (não negociável)

- Cada `page.js` tem `export const metadata = { ... }` com `title`, `description`, `openGraph`.
- JSON-LD schema em todas as páginas de serviço (`@type: LocalBusiness`, `Service`, `HowTo`) e no blog (`Article`, `FAQPage`).
- Imagens OG: 1200×630px, guardadas em `/public/`.
- URLs em português europeu, kebab-case (ex: `/preservar-bouquet-noiva`).

---

## Acessibilidade

- Todos os elementos interactivos têm `:focus-visible` styles definidos em CSS.
- `onMouseEnter`/`onMouseLeave` que manipulam `style` directamente são **proibidos** — usar CSS.
- Imagens decorativas: `alt=""`. Imagens com conteúdo: alt descritivo em português europeu.
- Testar navegação com Tab antes de marcar qualquer tarefa de UI como concluída.

---

## Comunicação e Processo

- Antes de qualquer refatoração: **apresenta o plano e aguarda aprovação**.
- Quando encontrares um problema não pedido: **reporta, não corriges** sem aprovação.
- Commits atómicos: uma alteração lógica por commit, mensagem em inglês.
- Quando apresentares código novo, indica sempre o ficheiro e linha de destino.
- Quando terminares uma fase de trabalho, corre `npm run build` localmente para confirmar que não há erros.

---

## Tonalidade da Marca

- Formal mas calorosa. Nunca infantil ou excessivamente comercial.
- **Português europeu sempre.** Exemplos: "preservação" ✓, "fotografias" ✓, "contacto" ✓.
- A marca vende emoção, memória e permanência. O copy deve reflectir isso.
- Paleta emocional: verde-salva, creme quente, terracota, dourado envelhecido.

---

## Estrutura de Ficheiros-Chave

| Ficheiro | Propósito |
|---|---|
| `app/_lib/constants.js` | Única fonte de verdade: URLs, contactos, redes sociais |
| `app/_lib/blog.js` | Utilitários para leitura de ficheiros MDX |
| `app/_lib/data/navigation.js` | Estrutura dos menus de navegação |
| `app/_components/Nav.jsx` | Navegação global (partilhada) |
| `app/_components/Footer.jsx` | Rodapé global (partilhado) |
| `app/globals.css` | Variáveis CSS, utilitários globais, tipografia |
| `next.config.mjs` | Configuração Next.js (imagens, headers, redirects) |
| `.eslintrc.json` | Regras de qualidade de código |

---

## Plano de Refatoração (referência)

- **Fase 0** ✅ Fundações: versões fixas, configs, CLAUDE.md, error handling
- **Fase 1** Centralização: todos os valores hardcoded → constants.js, hover → CSS
- **Fase 2** CSS: eliminar dangerouslySetInnerHTML, estilos inline → classes
- **Fase 3** Componentes atómicos: Button, Card, SectionHeader reutilizáveis; dividir HomeClient
- **Fase 4** Reorganização de pastas: components/ fora de app/, public/ organizado
- **Fase 5** FAQ e Blog: dados → ficheiros externos, componentes divididos
- **Fase 6** Optimizações: next/image, prefers-reduced-motion, metadata helpers
