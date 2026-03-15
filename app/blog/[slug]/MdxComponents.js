// app/blog/[slug]/MdxComponents.js
// Componentes MDX personalizados — usados pelo MDXRemote no Server Component

export const mdxComponents = {
  h2: (props) => (
    <h2
      {...props}
      style={{
        fontFamily: "'TAN-MEMORIES', serif",
        fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
        color: "#1E2D2A",
        margin: "clamp(32px,5vw,48px) 0 16px",
        lineHeight: 1.15,
      }}
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      style={{
        fontFamily: "'TAN-MEMORIES', serif",
        fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)",
        color: "#1E2D2A",
        margin: "28px 0 12px",
        lineHeight: 1.2,
      }}
    />
  ),
  p: (props) => (
    <p
      {...props}
      style={{
        color: "#3D4D44",
        lineHeight: 1.9,
        fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
        margin: "0 0 20px",
      }}
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      style={{
        margin: "0 0 20px",
        paddingLeft: "clamp(18px, 3vw, 24px)",
        color: "#3D4D44",
        lineHeight: 1.85,
        fontSize: "clamp(0.93rem, 1.9vw, 1.02rem)",
      }}
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      style={{
        margin: "0 0 20px",
        paddingLeft: "clamp(18px, 3vw, 24px)",
        color: "#3D4D44",
        lineHeight: 1.85,
        fontSize: "clamp(0.93rem, 1.9vw, 1.02rem)",
      }}
    />
  ),
  li: (props) => <li {...props} style={{ marginBottom: "8px" }} />,
  strong: (props) => <strong {...props} style={{ color: "#1E2D2A", fontWeight: 700 }} />,
  blockquote: (props) => (
    <blockquote
      {...props}
      style={{
        borderLeft: "3px solid #3D6B5E",
        paddingLeft: "clamp(16px, 3vw, 24px)",
        margin: "28px 0",
        color: "#5A6B60",
        fontStyle: "italic",
        lineHeight: 1.85,
        fontSize: "clamp(0.95rem, 2vw, 1.06rem)",
      }}
    />
  ),
  hr: () => (
    <div
      aria-hidden="true"
      style={{
        width: "44px",
        height: "1px",
        margin: "36px auto",
        background: "linear-gradient(to right, transparent, #B8954A, transparent)",
      }}
    />
  ),
  table: (props) => (
    <div style={{ overflowX: "auto", margin: "24px 0" }}>
      <table
        {...props}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9rem",
          color: "#3D4D44",
          fontFamily: "Roboto, sans-serif",
        }}
      />
    </div>
  ),
  th: (props) => (
    <th
      {...props}
      style={{
        padding: "10px 16px",
        backgroundColor: "rgba(61,107,94,0.08)",
        color: "#1E2D2A",
        fontWeight: 700,
        textAlign: "left",
        borderBottom: "2px solid rgba(61,107,94,0.15)",
        fontSize: "0.82rem",
        letterSpacing: "0.5px",
      }}
    />
  ),
  td: (props) => (
    <td
      {...props}
      style={{
        padding: "10px 16px",
        borderBottom: "1px solid rgba(61,107,94,0.08)",
        verticalAlign: "top",
        lineHeight: 1.65,
      }}
    />
  ),
};
