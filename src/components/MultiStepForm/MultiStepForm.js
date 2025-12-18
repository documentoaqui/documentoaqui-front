'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './MultiStepForm.module.css';

import { getPrice, getTaxa } from '@/utils/pricingData';
import { protestoCartorios } from '@/utils/protestoCartorios';
import { isValidCPF, isValidCNPJ } from '@/utils/validators';
import { stateNameToAbbreviation } from '@/utils/stateMapping';

// Steps
import StepCartorio from './steps/StepCartorio';
import StepTipoCertidao from './steps/StepTipoCertidao';
import StepFormato from './steps/StepFormato';
import StepServicosAdicionais from './steps/StepServicosAdicionais';
import StepRequerente from './steps/StepRequerente';
import StepEndereco from './steps/StepEndereco';
import StepDadosPenhorSafra from './steps/StepDadosPenhorSafra';
import StepLocalizacaoMatricula from './steps/StepLocalizacaoMatricula';
import StepEscritura from './steps/StepEscritura';
import StepPesquisaVeiculo from './steps/StepPesquisaVeiculo';
import StepPesquisaRouboFurto from './steps/StepPesquisaRouboFurto';
import StepPesquisaProcessos from './steps/StepPesquisaProcessos';
import StepPesquisaSintegra from './steps/StepPesquisaSintegra';
import StepPesquisaEscrituras from './steps/StepPesquisaEscrituras';
import StepPesquisaAvancada from './steps/StepPesquisaAvancada';
import StepConfirmacaoLGPD from './steps/StepConfirmacaoLGPD';
import StepProtestoCartorio from './steps/StepProtestoCartorio';
import StepProtestoDados from './steps/StepProtestoDados';
import StepGovDados from './steps/StepGovDados';
import StepConsultaJuridica from './steps/StepConsultaJuridica';

// Auxiliares
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import StepProgressBar from './StepProgressBar';
import SummarySidebar from './SummarySidebar';

const toSlug = (str) => {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export default function MultiStepForm({ productData }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [attachedFiles, setAttachedFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [formFlow, setFormFlow] = useState([]);
  const [finalPrice, setFinalPrice] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  /* ===============================
     CÁLCULO DE PREÇO (CORRIGIDO)
     =============================== */
  useEffect(() => {
    let basePrice = null;
    let multiplicador = 1;

    const {
      slug,
      category,
      pesquisaType
    } = productData;

    const {
      estado_cartorio,
      estado_matricula,
      estado_pesquisa,
      formato,
      tipo_certidao,
      todos_cartorios_protesto,
      cidade_cartorio
    } = formData;

    const estadoAbbr = stateNameToAbbreviation[estado_cartorio] || estado_cartorio;

    if (slug === toSlug('Visualização de Matrícula')) {
      basePrice = getPrice('registro_imoveis_pesquisas', 'estado', estado_matricula, 'visualizacao_matricula');
    }

    if (pesquisaType === 'previa') {
      basePrice = getPrice('registro_imoveis_pesquisas', 'estado', estado_pesquisa, 'pesquisa_previa');
    }

    if (pesquisaType === 'qualificada') {
      basePrice = getPrice('registro_imoveis_pesquisas', 'estado', estado_pesquisa, 'pesquisa_qualificada');
    }

    if (category === 'Registro Civil' && estadoAbbr) {
      basePrice = getPrice('tabelionato_registro_civil', 'estado', estadoAbbr, 'valor');
    }

    if (category === 'Notas' && estadoAbbr) {
      basePrice = getPrice('tabelionato_registro_civil', 'estado', estadoAbbr, 'valor_notas');
    }

    if (category === 'Imóveis' && estadoAbbr) {
      basePrice = getPrice('registro_imoveis_pesquisas', 'estado', estadoAbbr, 'certidao_imovel');
    }

    if (slug === toSlug('Certidão de Protesto')) {
      basePrice = getPrice('protesto_por_estado', 'estado', estadoAbbr, 'valor');

      if (todos_cartorios_protesto && protestoCartorios[estado_cartorio]?.[cidade_cartorio]) {
        multiplicador = protestoCartorios[estado_cartorio][cidade_cartorio].length;
      }
    }

    if (typeof basePrice !== 'number') {
      setFinalPrice(null);
      return;
    }

    let total = basePrice * multiplicador;

    const isPapel = formato === 'Certidão em papel';

    if (isPapel) total += getTaxa('custo_papel');
    if (formData.apostilamento) total += getTaxa('apostilamento');
    if (formData.aviso_recebimento) total += getTaxa('aviso_recebimento');
    if (formData.sedex) total += getTaxa('sedex');
    if (formData.localizar_pra_mim) total += 99.90;
    if (tipo_certidao === 'Condomínio') total += getTaxa('acrescimo_condominio');

    setFinalPrice(total);
  }, [formData, productData]);

  /* ===============================
     FINALIZAÇÃO
     =============================== */
  const handleFinalConfirmAndSubmit = () => {
    addToCart({ ...productData, price: finalPrice, formData, attachedFiles });
    router.push('/finalizar-compra');
  };

  return (
    <>
      <div className={styles.formLayout}>
        <div className={styles.mainContent}>
          <StepProgressBar steps={formFlow} currentStep={currentStep} />
          <div className={styles.formContainer}>
            <form>
              {/* steps */}
            </form>
          </div>
        </div>

        <div className={styles.sidebarContent}>
          <SummarySidebar
            productData={productData}
            formData={formData}
            finalPrice={finalPrice}
            currentStep={currentStep}
            formSteps={formFlow.map(f => f.title)}
            attachedFiles={attachedFiles}
          />
        </div>
      </div>

      {isConfirmModalOpen && (
        <ConfirmationModal
          orderDetails={{ item: productData, total: finalPrice }}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleFinalConfirmAndSubmit}
        />
      )}
    </>
  );
      }
      
