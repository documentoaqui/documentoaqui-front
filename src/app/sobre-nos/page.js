import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "../politica-de-privacidade/PrivacyPolicy.module.css";
import { headers } from "next/headers";

export const metadata = {
  title: "Sobre Nós - Documento Aqui",
  description:
    "Conheça a Documento Aqui, sua facilitadora na solicitação de documentos e certidões oficiais em todo o Brasil.",
};

export const dynamic = "force-dynamic";

export default function SobreNosPage() {
  const userAgent = headers().get("user-agent") || "";
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  return (
    <>
      <Header />

      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Sobre Nós</h1>

          <div className={styles.content}>
            {isMobile ? (
              <>
                <p>
                  Solicitar documentos públicos costuma ser cansativo. Filas,
                  deslocamentos, exigências inesperadas e informações incompletas
                  tornam o processo lento, principalmente para quem tem pouco
                  tempo ou está longe do órgão emissor.
                </p>

                <p>
                  A <strong>Documento Aqui</strong> nasceu para simplificar tudo
                  isso. Somos uma plataforma privada especializada na
                  intermediação profissional de certidões e documentos oficiais.
                  Cuidamos de todas as etapas por você:
                </p>

                <ul>
                  <li>conferimos os dados enviados</li>
                  <li>orientamos sobre requisitos</li>
                  <li>enviamos corretamente o pedido ao órgão competente</li>
                  <li>acompanhamos o andamento para evitar retrabalhos</li>
                  <li>solucionamos entraves burocráticos</li>
                  <li>entregamos o documento após a emissão</li>
                </ul>

                <p>
                  Você solicita online em poucos minutos. Nós cuidamos do
                  restante até a entrega digital ou física.
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
                  Seguimos integralmente a Lei Geral de Proteção de Dados (LGPD).
                  Todas as informações são usadas exclusivamente para a emissão
                  do documento solicitado.
                </p>

                <p>
                  Seja para certidões de nascimento, casamento, óbito, segunda
                  via de documentos ou outros documentos públicos, oferecemos um
                  serviço confiável, seguro e eficiente.
                </p>

                <p>
                  Nosso compromisso é que você receba seu documento com
                  tranquilidade, sem burocracias.
                </p>
              </>
            ) : (
              <>
                <p>
                  Solicitar documentos públicos pode ser um processo moroso,
                  especialmente quando há informações incompletas, etapas que
                  exigem atenção ou necessidade de deslocamentos.
                </p>

                <p>
                  A <strong>Documento Aqui</strong> surgiu para transformar essa
                  experiência. Somos uma plataforma privada especializada na
                  intermediação profissional de pedidos de certidões e
                  documentos oficiais.
                </p>

                <p>Assumimos por você as etapas necessárias:</p>

                <ul>
                  <li>conferimos os dados</li>
                  <li>orientamos sobre requisitos</li>
                  <li>
                    enviamos corretamente a solicitação ao órgão competente e
                    acompanhamos todo o andamento
                  </li>
                  <li>
                    auxiliamos na resolução de pendências informadas pelo órgão
                    emissor
                  </li>
                  <li>
                    entregamos o documento após a emissão pelo órgão competente
                  </li>
                </ul>

                <p>
                  Nosso serviço foi desenvolvido para oferecer praticidade e
                  segurança. Você faz o pedido online em poucos minutos, e nós
                  acompanhamos todas as etapas até a entrega do documento.
                </p>

                <p>
                  A plataforma é administrada pela{" "}
                  <strong>PALAZZI SOCIEDADE INDIVIDUAL DE ADVOCACIA</strong>{" "}
                  (OAB/SP nº 58.133), garantindo rigor jurídico, conformidade com
                  a legislação aplicável e precisão no tratamento de cada
                  solicitação.
                </p>

                <p>
                  Não somos cartório, tabelionato ou órgão governamental. Nosso
                  papel é intermediar e organizar o acesso do usuário aos
                  documentos emitidos pelos órgãos oficiais.
                </p>

                <p>
                  Seguimos estritamente a Lei Geral de Proteção de Dados (LGPD -
                  Lei nº 13.709/2018). Todas as informações enviadas são tratadas
                  com segurança e confidencialidade.
                </p>

                <p>
                  Nosso compromisso é garantir que você receba o documento com
                  tranquilidade, reduzindo burocracias e dificuldades
                  operacionais.
                </p>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}