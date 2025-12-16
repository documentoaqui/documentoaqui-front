import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../politica-de-privacidade/PrivacyPolicy.module.css";

export const metadata = {
  title: "Sobre Nós - Documento Aqui",
  description:
    "Conheça a Documento Aqui, sua facilitadora na solicitação de documentos e certidões oficiais em todo o Brasil.",
};

export default function SobreNosPage() {
  return (
    <>
      <Header />

      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sobre Nós</h1>

          <div className={styles.content}>
            <p>
              Solicitar documentos públicos pode ser um processo moroso,
              especialmente quando há informações incompletas, exigências
              inesperadas ou necessidade de deslocamentos.
            </p>

            <p>
              A <strong>Documento Aqui</strong> surgiu para transformar essa
              experiência. Somos uma plataforma privada especializada na
              intermediação profissional de pedidos de certidões e documentos
              oficiais.
            </p>

            <p>Assumimos por você todas as etapas necessárias:</p>

            <ul>
              <li>conferimos os dados enviados</li>
              <li>orientamos sobre requisitos</li>
              <li>enviamos corretamente a solicitação ao órgão competente</li>
              <li>acompanhamos o andamento do pedido</li>
              <li>auxiliamos na resolução de pendências</li>
              <li>entregamos o documento após a emissão</li>
            </ul>

            <p>
              Você solicita online em poucos minutos. Nós cuidamos do restante
              até a entrega digital ou física.
            </p>

            <p>
              A plataforma é administrada pela{" "}
              <strong>PALAZZI SOCIEDADE INDIVIDUAL DE ADVOCACIA</strong>{" "}
              (OAB/SP nº 58.133), garantindo rigor jurídico, precisão e
              conformidade com a legislação.
            </p>

            <p>
              Não somos cartório, tabelionato ou órgão governamental. Nossa
              função é facilitar o acesso aos documentos oficiais, reduzindo
              erros, deslocamentos e perda de tempo.
            </p>

            <p>
              Seguimos estritamente a Lei Geral de Proteção de Dados (LGPD).
              Todas as informações são tratadas com segurança e
              confidencialidade.
            </p>

            <p>
              Nosso compromisso é garantir que você receba seu documento com
              tranquilidade, sem burocracias.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}