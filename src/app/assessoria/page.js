// Salve em: src/app/assessoria/page.js

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FormSection from "@/components/FormSection/FormSection";
import styles from '../contato/ContactPage.module.css'; // Reutiliza o estilo da página de contato

export const metadata = {
  title: "Como Funciona - Documento Aqui",
  description: "Informações detalhadas sobre o funcionamento da aplicação.",
};

export default function AssessoriaJuridicaPage() {
  const assessoriaDescription = (
    <>
      <p>
      A Documento Aqui é uma plataforma privada que facilita a solicitação e levantamento de certidões e documentos emitidos por cartórios, tribunais e órgãos públicos em todo o Brasil.
      </p>

             <p><b>Passo a Passo:</b></p>

             <ol>
               <li><b>Escolha do documento</b></li>
               <p>O usuário acessa a lista de certidões disponíveis e seleciona o tipo desejado, como:</p>

               <ul>
                 <li>Certidões de registro civil (nascimento, casamento, óbito)</li>
                 <li>Matrícula de imóvel e visualização</li>
                 <li>Certidões estaduais, federais e municipais</li>
                 <li>Pesquisas por CPF/CNPJ</li>
                 <li>Documentos de tabelionato</li>
               </ul>

               <p>Cada serviço possui informações de prazo, requisitos e valores.</p>

               <li><b>Preenchimento dos dados</b></li>
               <p>Em cada pedido, o usuário informa:</p>

               <ul>
                 <li>Estado e cidade onde o documento está localizado</li>
                 <li>Dados do registro (CPF, RG, dados do imóvel, número de matrícula etc.)</li>
                 <li>Nome completo, CPF, endereço, telefone e e-mail</li>
                 <li>Aceite dos Termos de Uso e Política de Privacidade</li>
               </ul>

               <p>
                 Quando exigido pela LGPD (ex: <b>certidões em inteiro teor</b> do Registro Civil), o usuário também:
               </p>

               <ul>
                 <li>Autoriza o tratamento dos dados pessoais</li>
                 <li>Envia <b>procuração eletrônica</b> para que a equipe jurídica possa requerer o documento em seu nome</li>
               </ul>

               <li><b>Envio seguro do pedido</b></li>
              <p>Após preencher os dados:</p>

               <ul>
                 <li>O pedido é registrado na plataforma</li>
                 <li>O usuário recebe número de acompanhamento</li>
                 <li>Nossa equipe revisa as informações antes do envio ao órgão emissor</li>
               </ul>

               <p>Se faltar algum dado, o usuário é contatado.</p>

               <li><b>Pagamento</b></li>
               <p>O pagamento incluirá:</p>

               <ul>
                 <li>Taxas oficiais do órgão emissor</li>
                 <li>Taxa de intermediação e suporte da Documento Aqui</li>
                 <li>Custos operacionais (pesquisas físicas, acervos antigos etc.)</li>
                <li>Custo de envio</li>
                 <li>Impostos</li>
               </ul>

               <p>Pagamentos são processados por empresas parceiras seguras.</p>

               <li><b>Análise e envio ao órgão público</b></li>
               <p>Nossa equipe:</p>

               <ol>
                 <li>Confirma e processa os dados</li>
                 <li>Verifica requisitos do órgão</li>
                 <li>Pede complemento de informações ou documentos ao usuário (se necessário)</li>
                 <li>Protocola o pedido oficial</li>
                 <li>Acompanha eventuais exigências solucionando possíveis entraves</li>
               </ol>

               <p>Para documentos que exigem assinatura, procuração ou comprovantes, entramos em contato com o usuário.</p>

               <li><b>Acompanhamento em tempo real</b></li>
               <p>O usuário pode acompanhar o pedido pelo painel e também será informado por e-mail:</p>

              <ul>
                 <li><b>Em processamento</b></li>
                 <li><b>Certidão emitida</b></li>
                <li><b>Documento digital disponível</b></li>
                 <li><b>Documento físico postado nos Correios</b></li>
                 <li><b>Enviado ao e-mail</b> (quando digital)</li>
                 <li><b>Rastreamento dos Correios</b></li>
                 <li><b>Concluído</b></li>
               </ul>

               <li><b>Entrega</b></li>
               <p>A entrega pode ocorrer:</p>

               <ul>
                 <li><b>Digitalmente</b>, por e-mail e no painel</li>
                 <li><b>Fisicamente</b>, pelos Correios ou transportadora</li>
              </ul>

               <p>Você será notificado em todas as etapas.</p>

               <li><b>Suporte especializado</b></li>
               <p>Se houver:</p>

              <ul>
                 <li>Dúvida sobre prazos</li>
                 <li>Exigências de órgão</li>
                 <li>Necessidade de retificação</li>
                 <li>Pedido de documentos especiais</li>
              </ul>

               <p>O usuário pode contatar o suporte no campo (CONTATO) da tela inicial do site.</p>
             </ol>
    </>
  );



  return (
    <div className={styles.fullPageContainer}>
      <Header />
      {/* <FormSection
        imageSrc="/acessor.png"
        imageAlt="Advogado sorrindo em um escritório"
        title="Como Funciona"
        description={assessoriaDescription}
      /> */}
        description={assessoriaDescription}

      <Footer />
    </div>
  );
}
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
// import styles from '../politica-de-privacidade/PrivacyPolicy.module.css';

// export const metadata = {
//   title: "Como Funciona - Documento Aqui",
//   description: "Informações detalhadas sobre o funcionamento da aplicação.",
// };

// export default function AssessoriaJuridicaPage() {
//   return (
//     <>
//       <Header />

//       <main className={styles.pageWrapper}>
//         <div className={styles.container}>
//           <h1 className={styles.title}>Como Funciona</h1>

//           <div className={styles.content}>
//             <p>
//               A Documento Aqui é uma plataforma privada que facilita a solicitação e levantamento de certidões e documentos emitidos por cartórios, tribunais e órgãos públicos em todo o Brasil.
//             </p>

//             <p><b>Passo a Passo:</b></p>

//             <ol>
//               <li><b>Escolha do documento</b></li>
//               <p>O usuário acessa a lista de certidões disponíveis e seleciona o tipo desejado, como:</p>

//               <ul>
//                 <li>Certidões de registro civil (nascimento, casamento, óbito)</li>
//                 <li>Matrícula de imóvel e visualização</li>
//                 <li>Certidões estaduais, federais e municipais</li>
//                 <li>Pesquisas por CPF/CNPJ</li>
//                 <li>Documentos de tabelionato</li>
//               </ul>

//               <p>Cada serviço possui informações de prazo, requisitos e valores.</p>

//               <li><b>Preenchimento dos dados</b></li>
//               <p>Em cada pedido, o usuário informa:</p>

//               <ul>
//                 <li>Estado e cidade onde o documento está localizado</li>
//                 <li>Dados do registro (CPF, RG, dados do imóvel, número de matrícula etc.)</li>
//                 <li>Nome completo, CPF, endereço, telefone e e-mail</li>
//                 <li>Aceite dos Termos de Uso e Política de Privacidade</li>
//               </ul>

//               <p>
//                 Quando exigido pela LGPD (ex: <b>certidões em inteiro teor</b> do Registro Civil), o usuário também:
//               </p>

//               <ul>
//                 <li>Autoriza o tratamento dos dados pessoais</li>
//                 <li>Envia <b>procuração eletrônica</b> para que a equipe jurídica possa requerer o documento em seu nome</li>
//               </ul>

//               <li><b>Envio seguro do pedido</b></li>
//               <p>Após preencher os dados:</p>

//               <ul>
//                 <li>O pedido é registrado na plataforma</li>
//                 <li>O usuário recebe número de acompanhamento</li>
//                 <li>Nossa equipe revisa as informações antes do envio ao órgão emissor</li>
//               </ul>

//               <p>Se faltar algum dado, o usuário é contatado.</p>

//               <li><b>Pagamento</b></li>
//               <p>O pagamento incluirá:</p>

//               <ul>
//                 <li>Taxas oficiais do órgão emissor</li>
//                 <li>Taxa de intermediação e suporte da Documento Aqui</li>
//                 <li>Custos operacionais (pesquisas físicas, acervos antigos etc.)</li>
//                 <li>Custo de envio</li>
//                 <li>Impostos</li>
//               </ul>

//               <p>Pagamentos são processados por empresas parceiras seguras.</p>

//               <li><b>Análise e envio ao órgão público</b></li>
//               <p>Nossa equipe:</p>

//               <ol>
//                 <li>Confirma e processa os dados</li>
//                 <li>Verifica requisitos do órgão</li>
//                 <li>Pede complemento de informações ou documentos ao usuário (se necessário)</li>
//                 <li>Protocola o pedido oficial</li>
//                 <li>Acompanha eventuais exigências solucionando possíveis entraves</li>
//               </ol>

//               <p>Para documentos que exigem assinatura, procuração ou comprovantes, entramos em contato com o usuário.</p>

//               <li><b>Acompanhamento em tempo real</b></li>
//               <p>O usuário pode acompanhar o pedido pelo painel e também será informado por e-mail:</p>

//               <ul>
//                 <li><b>Em processamento</b></li>
//                 <li><b>Certidão emitida</b></li>
//                 <li><b>Documento digital disponível</b></li>
//                 <li><b>Documento físico postado nos Correios</b></li>
//                 <li><b>Enviado ao e-mail</b> (quando digital)</li>
//                 <li><b>Rastreamento dos Correios</b></li>
//                 <li><b>Concluído</b></li>
//               </ul>

//               <li><b>Entrega</b></li>
//               <p>A entrega pode ocorrer:</p>

//               <ul>
//                 <li><b>Digitalmente</b>, por e-mail e no painel</li>
//                 <li><b>Fisicamente</b>, pelos Correios ou transportadora</li>
//               </ul>

//               <p>Você será notificado em todas as etapas.</p>

//               <li><b>Suporte especializado</b></li>
//               <p>Se houver:</p>

//               <ul>
//                 <li>Dúvida sobre prazos</li>
//                 <li>Exigências de órgão</li>
//                 <li>Necessidade de retificação</li>
//                 <li>Pedido de documentos especiais</li>
//               </ul>

//               <p>O usuário pode contatar o suporte no campo (CONTATO) da tela inicial do site.</p>
//             </ol>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }
