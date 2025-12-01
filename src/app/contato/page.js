import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
// Atualize o import para o novo nome do componente
import FormSection from "@/components/FormSection/FormSection";
import styles from './ContactPage.module.css';

export const metadata = {
  title: "Fale Conosco - DocumentoAqui",
  description: "Fale com a nossa equipe. Tire suas dúvidas sobre certidões e pedidos.",
};

export default function ContatoPage() {
  const contactDescription = (
    <div>
    <p>
      Estamos aqui para ajudar você em todas as etapas da solicitação de sua certidão ou documento.
    </p>
    <p>
      Caso tenha dúvidas sobre prazos, requisitos, andamento do pedido, informações necessárias ou orientações gerais sobre o funcionamento do serviço, nossa equipe está disponível para atendê-lo.
    </p>
    <p>
      Preencha o formulário abaixo e retornaremos o mais breve possível.
    </p>
    <p>
      <b>Importante:</b> Caso haja necessidade de envio de documentos à Documento Aqui (arquivos de imagens, textos, etc), estes poderão ser enviados em PDF, JPG e Word ao e-mail: contato@documentoaqui.com.br.
    </p>
    <p>
      Neste caso, o remetente deverá informar o assunto, a providência a ser tomada, o número do protocolo do pedido e demais informações que julgue necessárias.
    </p>
    <p><b>Quando usar este canal:</b></p>
    <ul>
      <li>Dúvidas sobre qual certidão escolher</li>
      <li>Informações sobre prazos e procedimentos</li>
      <li>Perguntas sobre documentos necessários</li>
      <li>Ajuda para preencher um pedido já iniciado</li>
      <li>Orientações sobre acompanhamento e entrega</li>
      <li>Esclarecimentos gerais sobre o funcionamento do serviço de intermediação</li>
      <li>Suporte em caso de divergências, erros, exigências ou atualizações do órgão emissor</li>
    </ul>

    <h4><b>Nosso compromisso com você</b></h4>
    <p>A equipe da Documento Aqui é especializada na intermediação de pedidos de certidões e documentos oficiais. Analisamos cada solicitação individualmente para garantir que os dados sejam enviados corretamente aos órgãos emissores, oferecendo atendimento humanizado, transparente e eficiente.</p>
    </div>
  );

  return (
    <div className={styles.fullPageContainer}>
      <Header />
      {/* Passe o conteúdo via props */}
      <FormSection
        imageSrc="/contato.png"
        imageAlt="Pessoa trabalhando em um laptop com documentos"
        title="Fale com a nossa equipe"
        description={contactDescription}
      />
      <Footer />
    </div>
  );
}