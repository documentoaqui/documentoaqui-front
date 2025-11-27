import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
// Reutilizando o mesmo CSS para manter a consistência visual
import styles from '../politica-de-privacidade/PrivacyPolicy.module.css';

export const metadata = {
  title: "Termos de Uso - Documento Aqui",
  description: "Termos e condições de uso da plataforma Documento Aqui.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Termos de Uso</h1>
          
          {/* Data de atualização dinâmica ou fixa conforme necessidade */}
          <p className={styles.updateDate}>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <div className={styles.content}>
            
            <h2 className={styles.sectionTitle}>1. Aceitação dos Termos</h2>
            <p><strong>Bem-vindo à Documento Aqui!</strong></p>
            <p>
              Ao acessar e utilizar o site <strong>documentoaqui.com.br</strong>, você concorda automaticamente com estes Termos de Uso e com nossa Política de Privacidade.
            </p>
            <p>
              A Plataforma é administrada pela <strong>PALAZZI SOCIEDADE INDIVIDUAL DE ADVOCACIA</strong>, inscrita no CNPJ nº 58.995.590/0001-10 e na OAB/SP nº 58.133.
            </p>
            <p>
              Caso não concorde com estes Termos, você deve suspender imediatamente o uso dos nossos serviços.
            </p>

            <h2 className={styles.sectionTitle}>2. Natureza do Serviço</h2>
            <p>
              A <strong>Documento Aqui</strong> atua como <strong>facilitadora e intermediadora</strong> na solicitação de documentos junto a cartórios, tabelionatos, tribunais e demais órgãos públicos administrativos.
            </p>
            <p>
              Nosso trabalho é <strong>intermediação profissional</strong>, realizado por especialistas na obtenção de documentos públicos.
            </p>

            <h3 style={{marginTop: '1.5rem', color: '#294B29'}}>2.1. Disclaimer de Vínculo Oficial</h3>
            <p style={{fontWeight: 'bold', textTransform: 'uppercase'}}>
              NÃO SOMOS UM CARTÓRIO, TABELIONATO, JUNTA COMERCIAL, PREFEITURA, TRIBUNAL OU QUALQUER ÓRGÃO PÚBLICO.
            </p>
            <p>
              Não possuímos qualquer relação de parceria, vínculo institucional ou convênio com essas entidades.
            </p>
            <p>
              Somos uma <strong>empresa que desburocratiza e simplifica</strong> o acesso do usuário aos documentos emitidos por órgãos públicos.
            </p>

            <h2 className={styles.sectionTitle}>3. Cadastro e Conta</h2>
            <p>
              Para utilizar nossos serviços, você deve fornecer <strong>informações verdadeiras, completas e atualizadas</strong>.
            </p>
            <p>Você é responsável:</p>
            <ul>
              <li>por manter a confidencialidade da sua senha;</li>
              <li>por todas as atividades feitas em sua conta;</li>
              <li>pela veracidade dos dados enviados para solicitação de documentos.</li>
            </ul>

            <h2 className={styles.sectionTitle}>4. Pagamentos</h2>
            <p>Os valores cobrados incluem:</p>
            <ul>
              <li>a) emolumentos e taxas oficiais cobradas pelos órgãos emissores;</li>
              <li>b) taxa de intermediação, assessoria e suporte da Documento Aqui;</li>
              <li>c) custos de envio;</li>
              <li>d) impostos aplicáveis.</li>
            </ul>
            <p>
              Os pagamentos são processados por <strong>plataformas externas seguras</strong>, e não armazenamos dados financeiros em nossos servidores.
            </p>
            <p>
              É possível que determinados documentos exijam <strong>complemento de valores</strong>, por exemplo:
            </p>
            <ul>
              <li>buscas em acervos físicos;</li>
              <li>pesquisas acima de 10 anos;</li>
              <li>documentos que exigem buscas complementares;</li>
              <li>taxas extras do órgão emissor;</li>
              <li>custos adicionais de envio.</li>
            </ul>
            <p>
              Quando necessário, o cliente será avisado antes do prosseguimento.
            </p>

            <h2 className={styles.sectionTitle}>5. Prazos e Entrega</h2>
            <p>
              Os prazos exibidos na plataforma são <strong>estimativas</strong> baseadas em experiência prática. Eles variam conforme:
            </p>
            <ul>
              <li>os trâmites do órgão emissor,</li>
              <li>complexidade do caso,</li>
              <li>tipo de acervo (digital ou físico),</li>
              <li>volume de solicitações internas do órgão.</li>
            </ul>
            <p>
              Documentos físicos são enviados via <strong>Correios ou transportadora</strong>. Não nos responsabilizamos por atrasos, extravios ou falhas dessas empresas.
            </p>
            <p>
              Certidões digitais são entregues no <strong>painel do usuário</strong> e/ou por <strong>e-mail</strong>.
            </p>
            <p><strong>Prazos estimados:</strong></p>
            <ul>
                <li>Certidões Digitais: <strong>1 a 5 dias úteis</strong></li>
                <li>Certidões Físicas (papel): <strong>5 a 20 dias úteis + prazo dos Correios</strong></li>
                <li>Certidões Estaduais e Federais: <strong>1 a 15 dias úteis</strong></li>
                <li>Pesquisa por CPF/CNPJ: <strong>até 24 horas</strong></li>
                <li>Pesquisa Qualificada de Imóveis: <strong>5 a 20 dias úteis</strong></li>
            </ul>

            <h2 className={styles.sectionTitle}>6. Política de Reembolso</h2>
            <p>
              Regida por documento específico, disponível na plataforma.
            </p>

            <h2 className={styles.sectionTitle}>7. Limitação de Responsabilidade</h2>
            <p>
              Nosso papel é <strong>somente de intermediação</strong>.
            </p>
            <p>Não nos responsabilizamos por:</p>
            <ul>
                <li>atrasos;</li>
                <li>erros;</li>
                <li>inconsistências;</li>
                <li>negativa de emissão;</li>
                <li>impossibilidade de localizar documentos;</li>
            </ul>
            <p>
              — todos de responsabilidade <strong>exclusiva</strong> dos cartórios e órgãos públicos.
            </p>
            <p>
              Em caso de <strong>retificação de certidão</strong>, o usuário deve tratar diretamente com o órgão emissor. Nosso departamento jurídico pode auxiliar mediante solicitação.
            </p>
            <p>
                Contato Jurídico: WhatsApp <strong>(19) 99915-8230</strong>
            </p>

            <h2 className={styles.sectionTitle}>8. Propriedade Intelectual</h2>
            <p>
              Todo conteúdo do site (textos, layout, base de dados, imagens, marcas, políticas) é protegido por legislação de propriedade intelectual. É proibida sua reprodução sem autorização.
            </p>

            <h2 className={styles.sectionTitle}>9. Contatos</h2>
            <p><strong>Questões gerais, suporte e pedidos:</strong></p>
            <ul>
                <li>Email: <strong>contato@documentoaqui.com.br</strong></li>
                <li>WhatsApp: <strong>(19) 99653-7342</strong></li>
                <li>Horário: Segunda a Sexta, das 9h às 18h</li>
            </ul>

            <p><strong>Suporte Jurídico:</strong></p>
            <ul>
                <li>WhatsApp: <strong>(19) 99915-8230</strong></li>
                <li>Horário: Segunda a Sexta das 9h às 17h / Sábado das 9h às 12h</li>
            </ul>

            <h2 className={styles.sectionTitle}>10. Alterações dos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entrarão em vigor após sua publicação no site, e o uso continuado dos serviços significará a aceitação das novas condições.
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}