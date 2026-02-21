"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main style={{ overflow: 'hidden', padding: '0 15px' }}> {/* Padding lateral para ecrãs pequenos */}
      
      {/* SEÇÃO HERO - Otimizada para Mobile */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '40px' }}>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '15px', lineHeight: '1.2' }}
        >
          Eternizamos Memórias com a Natureza
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ fontSize: '1.1rem', color: '#555', maxWidth: '100%', lineHeight: '1.5', padding: '0 10px' }}
        >
          Preservamos o seu bouquet de noiva através da arte da prensagem botânica. 
          Uma alternativa 100% sustentável e sem químicos.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ marginTop: '25px', padding: '15px 30px', backgroundColor: '#c5a880', color: '#fff', border: 'none', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', width: '90%', maxWidth: '300px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(197, 168, 128, 0.4)' }}
        >
          Ver Opções e Preços
        </motion.button>

      </section>

      {/* SEÇÃO SUSTENTABILIDADE - O teu Diferencial */}
      <section style={{ padding: '60px 10px', backgroundColor: '#fcfbf9', textAlign: 'center', borderRadius: '15px', marginBottom: '40px' }}>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <span style={{ color: '#27ae60', fontSize: '2rem', display: 'block', marginBottom: '10px' }}>🌿</span>
          <h2 style={{ color: '#2c3e50', fontSize: '1.8rem', marginBottom: '15px' }}>
            Porquê a Prensagem e não a Resina?
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6', textAlign: 'left', padding: '0 10px' }}>
            Muitas noivas procuram-nos inicialmente para trabalhos em resina. No entanto, o nosso compromisso é com o ambiente. 
            A resina epóxi é um plástico não reciclável e tóxico. Na Flores à Beira Rio, orgulhamo-nos de usar a técnica tradicional e delicada da <strong>prensagem botânica</strong>. 
            <br/><br/>
            O resultado? Quadros elegantes, minimalistas e amigos do ambiente, onde a verdadeira textura da flor é a protagonista.
          </p>
        </motion.div>
      </section>

    </main>
  );
}
