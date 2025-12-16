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
              Solicitar documentos públicos pode ser um processo moroso, especialmente quando 
              há informações incompletas, etapas que exigem atenção, ou ainda necessidade de 
              deslocamentos.
            </p>

            <p>
              A <strong>Documento Aqui</strong> surgiu para transformar essa
              experiência. Somos uma plataforma privada especializada na
              intermediação profissional de pedidos de certidões e documentos
              oficiais.
            </p>

            <p>Assumimos por você as etapas necessárias:</p>

            <ul>
              <li>conferimos os dados enviados</li>
              <li>orientamos sobre requisitos</li>
              <li>enviamos corretamente a solicitação ao órgão competente e acompanhamos todo o andamento e orientamos quando o órgão emissor 
              solicita complementação de informações. </li>
              <li>acompanhamos o andamento do pedido</li>
              <li>auxiliamos na resolução de pendências informadas pelo órgão emissor</li>
              <li>lhe entregamos o documento após a emissão pelo órgão competente</li>
            </ul>

            <p>
              Nosso serviço foi desenvolvido para oferecer praticidade e segurança. Você faz o pedido online em poucos minutos,nós acompanhamos 
              todas as etapas desde o envio até a entrega do documento emitido pelo órgão 
              competente, seja em formato digital ou físico.
            </p>

            <p>
              A plataforma é administrada pela{" "}
              <strong>PALAZZI SOCIEDADE INDIVIDUAL DE ADVOCACIA</strong>{" "}
              (OAB/SP nº 58.133), garantindo rigor jurídico, conformidade com a 
              legislação aplicável e precisão no tratamento de cada solicitação. 
            </p>

            <p>
              Contamos com equipe multidisciplinar especializada em interpretar pedidos, validar 
              informações e assegurar que seu pedido siga corretamente para o órgão emissor.
            </p>

            <p>
              Não somos cartório, tabelionato, junta comercial ou órgão governamental. nosso papel é intermediar e organizar o acesso do usuário aos documentos emitidos pelos órgãos oficiais, minimizando dificuldades operacionais comuns, como deslocamentos e dificuldades técnicas.
            </p>

            <p>
              Seguimos estritamente os princípios da Lei Geral de Proteção de Dados (LGPD - Lei nº 
              13.709/2018). Todas as informações enviadas são tratadas com segurança, 
              confidencialidade e apenas para a finalidade específica da emissão do documento 
              solicitado. 
            </p>

            <p>
              Seja para solicitar certidões de nascimento, casamento, óbito, segunda via de 
              documentos ou diversos outros documentos públicos, você conta com um serviço 
              confiável, transparente e eficiente.
            </p>

            <p>
              Nosso compromisso é garantir que você receba o documento com tranquilidade, 
              reduzindo dificuldades operacionais e tornando o processo muito mais simples. 
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}