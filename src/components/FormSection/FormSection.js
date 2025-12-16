// Salve em: src/components/FormSection/FormSection.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './FormSection.module.css';

const FormSection = ({ imageSrc, imageAlt, title, description }) => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false); // Novo estado para controlar o botão

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Você precisa concordar com a Política de Privacidade.");
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validação extra: Confirmar se os e-mails batem
    if (data.email !== data.confirmEmail) {
      alert("Os e-mails informados não conferem.");
      return;
    }

    setLoading(true); // Bloqueia o botão

    try {
      // Usa a variável de ambiente. Se não existir, usa a URL direta da API.
      // IMPORTANTE: Aqui deve ser o domínio da API (VPS), não o do site.
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.documentoaqui.com.br";
      
      // const response = await fetch(`${apiUrl}/api/contato`, {
      const response = await fetch(`http://localhost:3000/api/contato`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
        e.target.reset();
        setAgreed(false);
      } else {
        console.error("Erro do servidor:", result);
        alert("Ocorreu um erro ao enviar. Tente novamente mais tarde.");
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
      alert("Erro de conexão. Verifique sua internet.");
    } finally {
      setLoading(false); // Libera o botão
    }
  };

  return (
    <section className={styles.contactWrapper}>
      <div className={styles.imageColumn}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div className={styles.formColumn}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.description}>
            {description}
          </div>

          <form onSubmit={handleSubmit} className={styles.form} style={{marginBottom: '1.5rem'}}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">Seu nome <span className={styles.required}>(obrigatório)</span></label>
                <input type="text" id="firstName" name="firstName" placeholder="Nome" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.hiddenLabel}>Sobrenome</label>
                <input type="text" id="lastName" name="lastName" placeholder="Sobrenome" required />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Seu telefone <span className={styles.required}>(obrigatório)</span></label>
                <input type="tel" id="phone" name="phone" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="bestTime">Melhor hora para te ligar <span className={styles.required}>(obrigatório)</span></label>
                <select id="bestTime" name="bestTime" required defaultValue="">
                  <option value="" disabled>Selecione um horário</option>
                  <option value="manha">Manhã (09h-12h)</option>
                  <option value="tarde">Tarde (13h-17h)</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Seu endereço de email <span className={styles.required}>(obrigatório)</span></label>
                <input type="email" id="email" name="email" placeholder="Digite um e-mail" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="confirmEmail" className={styles.hiddenLabel}>Confirmar e-mail</label>
                <input type="email" id="confirmEmail" name="confirmEmail" placeholder="Confirmar e-mail" required />
              </div>
            </div>

            <div className={styles.formRow}>
               <div className={styles.formGroup}>
                <label htmlFor="contactMethod">Método preferido de contato</label>
                <select id="contactMethod" name="contactMethod" required defaultValue="">
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="ligacao">Ligação Telefônica</option>
                  <option value="email">E-mail</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Assunto <span className={styles.required}>(obrigatório)</span></label>
                <select id="subject" name="subject" required defaultValue="">
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="duvida">Dúvida sobre um serviço</option>
                  <option value="pedido">Ajuda com um pedido</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Descreva o motivo da sua mensagem <span className={styles.required}>(obrigatório)</span></label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="privacy" name="privacy" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required/>
              <label htmlFor="privacy">
                Eu concordo com a <Link href="/politica-de-privacidade">Política de Privacidade</Link>. <span className={styles.required}>(obrigatório)</span>
              </label>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={loading} // Desabilita botão se estiver carregando
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
          
          <p style={{marginBottom: '0.5rem'}}>
            <b>Outros canais de contato</b>
          </p>
          <p>Para maior comodidade, você também pode falar conosco por Whatsapp:</p>
          <p>(19) 99653-7342</p>
          <p>Segunda à sexta das 09h às 18h</p>
        </div>
      </div>
    </section>
  );
};

export default FormSection;