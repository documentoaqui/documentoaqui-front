import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
// Reutilizando o mesmo CSS da página de privacidade para manter a consistência
import styles from '../politica-de-privacidade/PrivacyPolicy.module.css';

export const metadata = {
  title: "Política de Reembolso - Documento Aqui",
  description: "Conheça as condições de reembolso e devolução da Documento Aqui.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Política de Reembolso</h1>
          <p className={styles.updateDate}>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <div className={styles.content}>
            
            <h2 className={styles.sectionTitle}>1. Direito ao Reembolso</h2>
            <p>Você poderá solicitar <strong>reembolso integral</strong> quando:</p>
            <ul>
              <li>a) O pedido <strong>não tiver sido encaminhado</strong> ao órgão emissor;</li>
              <li>b) Houver <strong>cobrança em duplicidade</strong>;</li>
              <li>c) O prazo de entrega ultrapassar <strong>30 dias úteis além do previsto</strong> sem justificativa do órgão emissor.</li>
            </ul>

            <h2 className={styles.sectionTitle}>2. Casos sem Direito a Reembolso Integral</h2>
            <p><strong>Não haverá reembolso quando:</strong></p>
            <ul>
              <li>a) O pedido <strong>já tiver sido enviado</strong> ao órgão emissor;</li>
              <li>b) Os dados informados pelo usuário estiverem <strong>incorretos</strong>;</li>
              <li>c) For emitida certidão negativa (<strong>“nada consta”</strong>);</li>
              <li>d) O órgão <strong>negar a emissão</strong> por motivos formais;</li>
              <li>e) Houver necessidade de <strong>retificação</strong>, apresentação de documentos extras ou exigências do órgão;</li>
              <li>f) O documento retornar por <strong>endereço incorreto</strong> ou ausência do destinatário.</li>
            </ul>

            <h2 className={styles.sectionTitle}>3. Reembolso Parcial</h2>
            <p>
              Quando houver custos cartoriais já pagos ou despesas operacionais, poderá ocorrer <strong>reembolso parcial</strong>, com retenção desses valores e de uma <strong>taxa administrativa de R$ 43,00</strong> referente aos custos operacionais e de suporte já incorridos no processamento inicial do pedido.
            </p>
            <p>
              O usuário sempre será informado de qualquer custo adicional antes da cobrança.
            </p>

            <h2 className={styles.sectionTitle}>4. Como Solicitar</h2>
            <p>Envie e-mail para:</p>
            <p>
                <strong>contato@documentoaqui.com.br</strong>
            </p>
            <p>
              Informe o <strong>número do pedido</strong> e o <strong>motivo</strong>.
            </p>
            <p>
              O processamento ocorre em até <strong>30 dias corridos</strong> após aprovação.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}