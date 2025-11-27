import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* DISCLAIMER OBRIGATÓRIO */}
        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6', textAlign: 'left', fontSize: '0.85rem', color: '#495057' }}>
          <p style={{ fontWeight: 'bold', color: '#294B29', marginBottom: '0.5rem' }}>AVISO LEGAL (DISCLAIMER)</p>
          <p style={{ marginBottom: '0.5rem' }}>
            A <strong>Documento Aqui</strong> oferece um serviço privado de intermediação para solicitação e levantamento de documentos públicos em todo o Brasil.
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>NÃO SOMOS</strong> um cartório, tabelionato, junta comercial, prefeitura ou qualquer órgão público.
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            Atuamos para facilitar o acesso do usuário a esses serviços, com suporte especializado.
          </p>
          <p style={{ margin: 0 }}>
            Os documentos emitidos, prazos e informações são de responsabilidade exclusiva do órgão emissor.
          </p>
        </div>

        <nav className={styles.footerLinks}>
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
          <Link href="/reembolso-e-devolucao">Política de Reembolso</Link>
          <Link href="/termos-e-condicoes">Termos de Uso</Link>
          <Link href="/faq">Tire suas Dúvidas</Link>
        </nav>

        <hr className={styles.separator} />

        <div className={styles.copyrightArea}>
          <p className={styles.copyrightText}>
            Documento Aqui © {new Date().getFullYear()}. Todos os Direitos Reservados.
          </p>
          <p className={styles.developerCredit}>
            Desenvolvido por{' '}
            <a 
              href="https://codebypatrick.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.developerLink}
            >
              Patrick.Developer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;