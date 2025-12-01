import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
// Reutilizaremos o CSS das páginas de texto para manter a consistência
import styles from '../politica-de-privacidade/PrivacyPolicy.module.css';

export const metadata = {
  title: "Sobre Nós - Documento Aqui",
  description: "Conheça a Documento Aqui, sua facilitadora na solicitação de documentos e certidões oficiais em todo o Brasil.",
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
              A <strong>Documento Aqui</strong> é uma plataforma digital privada que atua como facilitadora e intermediadora na solicitação de certidões e documentos oficiais em todo o território brasileiro. Administrada pela <strong>PALAZZI SOCIEDADE INDIVIDUAL DE ADVOCACIA</strong>, registrada na OAB/SP sob o nº 58.133, a plataforma tem como missão desburocratizar e simplificar o acesso a documentos emitidos por órgãos públicos.
            </p>
            <p>
              Nosso trabalho é de <strong>intermediação profissional</strong>. Não somos um cartório, tabelionato ou órgão governamental, mas sim uma empresa especializada que elimina barreiras como deslocamentos presenciais, filas e dificuldades técnicas, oferecendo suporte e praticidade ao usuário.
            </p>
            <p>
              Contamos com uma equipe multidisciplinar e suporte jurídico especializado, garantindo que cada solicitação seja analisada individualmente para o correto envio dos dados aos órgãos competentes.
            </p>
            <p>
              Prezamos pela privacidade e proteção dos dados pessoais, seguindo rigorosamente os princípios da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD). As informações fornecidas são utilizadas apenas para fins específicos da emissão dos documentos requeridos.
            </p>
            <p>
              Nosso compromisso é entregar um serviço confiável, transparente e eficiente. Com a <strong>Documento Aqui</strong>, você pode solicitar certidões de nascimento, casamento, óbito, protesto, matrícula de imóvel, entre outras, recebendo o documento com segurança — de forma digital ou pelos Correios, no conforto da sua casa.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
