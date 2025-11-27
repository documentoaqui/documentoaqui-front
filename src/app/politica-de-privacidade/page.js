import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from './PrivacyPolicy.module.css';

export const metadata = {
  title: "Política de Privacidade - Documento Aqui",
  description: "Saiba como a Documento Aqui coleta, usa e protege seus dados pessoais.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Política de Privacidade</h1>
          <p className={styles.updateDate}>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <div className={styles.content}>
            
            <h2 className={styles.sectionTitle}>1. Introdução</h2>
            <p>
              A <strong>Documento Aqui</strong> respeita sua privacidade e realiza o tratamento de dados conforme a Lei 13.709/2018 (LGPD).
            </p>

            <h2 className={styles.sectionTitle}>2. Dados que Coletamos</h2>
            <p><strong>2.1. Dados fornecidos pelo usuário</strong></p>
            <ul>
              <li>Nome completo</li>
              <li>CPF / RG</li>
              <li>Endereço</li>
              <li>Telefone</li>
              <li>E-mail</li>
              <li>Dados necessários à emissão do documento solicitado</li>
            </ul>

            <p><strong>2.2. Dados coletados automaticamente</strong></p>
            <ul>
              <li>Endereço IP</li>
              <li>Navegador e dispositivo</li>
              <li>Cookies e identificadores</li>
              <li>Informações de acesso e navegação</li>
            </ul>

            <h2 className={styles.sectionTitle}>3. Finalidade e Base Legal (LGPD)</h2>
            <p>
                <strong>a) Processar pedidos e intermediar documentos</strong><br/>
                Base legal: Art. 7º, inciso V - execução de contrato
            </p>
            <p>
                <strong>b) Comunicação com o cliente (atualizações e suporte)</strong><br/>
                Base legal: Art. 7º, inciso V - execução de contrato
            </p>
            <p>
                <strong>c) Cumprimento de exigências legais de órgãos públicos</strong><br/>
                Base legal: Art. 7º, inciso II – cumprimento de obrigação legal
            </p>
            <p>
                <strong>d) Segurança, prevenção a fraudes e melhorias da plataforma</strong><br/>
                Base legal: Art. 7º, inciso IX - legítimo interesse
            </p>
            <p>
                <strong>e) Comunicações informativas ou voluntárias</strong><br/>
                Base legal: Art. 7º, inciso I - consentimento, quando cabível
            </p>

            <h2 className={styles.sectionTitle}>4. Compartilhamento de Dados</h2>
            <p>Seus dados serão compartilhados somente com:</p>
            <ul>
                <li>cartórios, tabelionatos e órgãos públicos relacionados ao pedido;</li>
                <li>empresas de processamento de pagamentos;</li>
                <li>empresas de entrega (Correios/transportadoras);</li>
                <li>autoridades públicas, quando exigido por lei.</li>
            </ul>
            <p><strong>Jamais vendemos ou alugamos seus dados.</strong></p>

            <h2 className={styles.sectionTitle}>5. Cookies e Tecnologias Semelhantes</h2>
            <p>Utilizamos cookies para:</p>
            <ul>
                <li>funcionamento essencial do site;</li>
                <li>melhorar sua experiência;</li>
                <li>fins estatísticos e analíticos.</li>
            </ul>
            <p>
              Você pode desativar cookies no navegador, mas partes do site podem não funcionar corretamente.
            </p>

            <h2 className={styles.sectionTitle}>6. Segurança dos Dados</h2>
            <p>Aplicamos medidas de segurança técnicas e administrativas, incluindo:</p>
            <ul>
                <li>criptografia HTTPS/SSL;</li>
                <li>controle restrito de acesso;</li>
                <li>armazenamento seguro;</li>
                <li>logs de acesso;</li>
                <li>equipe treinada e supervisionada.</li>
            </ul>

            <h2 className={styles.sectionTitle}>7. Retenção dos Dados</h2>
            <p>Os dados são mantidos:</p>
            <ul>
                <li>pelo período necessário à conclusão do serviço;</li>
                <li>para cumprimento de obrigações legais;</li>
                <li>para comprovação da prestação do serviço.</li>
            </ul>
            <p>Após isso, são eliminados ou anonimizados.</p>

            <h2 className={styles.sectionTitle}>8. Direitos do Titular</h2>
            <p>Você pode solicitar:</p>
            <ul>
                <li>confirmação de tratamento;</li>
                <li>acesso aos dados;</li>
                <li>correção;</li>
                <li>anonimização;</li>
                <li>eliminação (quando possível);</li>
                <li>portabilidade;</li>
                <li>revogação de consentimento.</li>
            </ul>
            <p>
                Para exercer seus direitos, envie mensagem para: <strong>contato@documentoaqui.com.br</strong>
            </p>

            <h2 className={styles.sectionTitle}>9. Encarregado de Dados (DPO)</h2>
            <p>
                <strong>Jonas Palazzi Ferreira</strong><br/>
                E-mail: <strong>contato@documentoaqui.com.br</strong>
            </p>

            <h2 className={styles.sectionTitle}>10. Atualizações desta Política</h2>
            <p>
              Esta Política poderá ser atualizada. A versão vigente estará sempre publicada em nosso site.
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
