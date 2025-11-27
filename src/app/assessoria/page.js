// Salve em: src/app/assessoria/page.js

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import FormSection from "@/components/FormSection/FormSection";
import styles from '../contato/ContactPage.module.css'; // Reutiliza o estilo da página de contato

export const metadata = {
  title: "Suporte Juridico - E-Certidões",
  description: "Solicite uma consulta por videoconferência com um advogado especialista.",
};

export default function AssessoriaJuridicaPage() {
  const assessoriaDescription = (
    <>
      <p>
        Através do formulário abaixo você poderá solicitar informações sobre questões jurídicas relacionadas a emissão de qualquer documento.
      </p>
      <p>
        O suporte também é oferecido pelo Whatsapp: <strong>(19) 99915-8230</strong>.
      </p>
    </>
  );



  return (
    <div className={styles.fullPageContainer}>
      <Header />
      <FormSection
        imageSrc="/acessor.png"
        imageAlt="Advogado sorrindo em um escritório"
        title="Suporte Juridico"
        description={assessoriaDescription}
      />
      <Footer />
    </div>
  );
}