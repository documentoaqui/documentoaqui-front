'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './MultiStepForm.module.css';

import { getPrice, getTaxa } from '@/utils/pricingData';
import { protestoCartorios } from '@/utils/protestoCartorios';
import { isValidCPF, isValidCNPJ } from '@/utils/validators';
import { stateNameToAbbreviation } from '@/utils/stateMapping';

// Componentes de Etapa
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
  const [finalPrice, setFinalPrice] = useState(productData.price);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    let newFlow = [];
    const { slug, category, pesquisaType, skipValidationAndTerms } = productData;
    const { formato } = formData;

    const formatoStep = { id: 'formato', title: 'Formato', Component: StepFormato };
    const servicosAdicionaisStep = { id: 'servicosAdicionais', title: 'Serviços Adicionais', Component: StepServicosAdicionais };
    const enderecoStep = { id: 'endereco', title: 'Endereço', Component: StepEndereco };
    const requerenteStep = { id: 'requerente', title: 'Identificação', Component: StepRequerente };
    const confirmacaoLgpdStep = { id: 'confirmacaoLgpd', title: 'Termos de Uso', Component: StepConfirmacaoLGPD };

    // ✅ CORREÇÃO PRINCIPAL
    const isGovCertificate = !!productData.govFormFields;

    const isPapel = formato === 'Certidão em papel';

    if (slug === toSlug('Consulta Jurídica')) {
      newFlow = [
        { id: 'dadosConsultaJuridica', title: 'Dados para Contato', Component: StepConsultaJuridica }
      ];
    }

    else if (isGovCertificate) {
      const baseFlow = [
        { id: 'dadosCertidaoGov', title: 'Dados da Certidão', Component: StepGovDados },
        formatoStep
      ];

      if (isPapel) {
        newFlow = [...baseFlow, servicosAdicionaisStep, enderecoStep, requerenteStep];
      } else {
        newFlow = [...baseFlow, servicosAdicionaisStep, requerenteStep];
      }
    }

    else if (slug === toSlug('Certidão de Protesto')) {
      let middleFlow = [formatoStep, servicosAdicionaisStep];
      if (isPapel) middleFlow.push(enderecoStep);

      newFlow = [
        { id: 'protestoCartorio', title: 'Localização', Component: StepProtestoCartorio },
        { id: 'protestoDados', title: 'Dados da Certidão', Component: StepProtestoDados },
        ...middleFlow,
        requerenteStep
      ];
    }

    else if (category === 'Pesquisa' || (category === 'Imóveis' && pesquisaType)) {
      newFlow = [
        { id: 'dadosPesquisa', title: 'Dados da Pesquisa', Component: StepPesquisaAvancada },
        requerenteStep,
        ...(skipValidationAndTerms ? [] : [confirmacaoLgpdStep])
      ];
    }

    else if (category === 'Notas') {
      let middleFlow = [formatoStep, servicosAdicionaisStep];
      if (isPapel) middleFlow.push(enderecoStep);
      middleFlow.push(requerenteStep);

      newFlow = [
        { id: 'cartorio', title: 'Localização', Component: StepCartorio },
        { id: 'dadosEscritura', title: 'Dados da Certidão', Component: StepEscritura },
        ...middleFlow
      ];
    }

    else if (slug === toSlug('Visualização de Matrícula')) {
      newFlow = [
        { id: 'localizacaoMatricula', title: 'Localização', Component: StepLocalizacaoMatricula },
        requerenteStep
      ];
    }

    else {
      const baseFlow = [
        { id: 'cartorio', title: 'Localização', Component: StepCartorio },
        { id: 'tipoCertidao', title: 'Dados da Certidão', Component: StepTipoCertidao }
      ];

      let middleFlow = [formatoStep, servicosAdicionaisStep];
      if (isPapel) middleFlow.push(enderecoStep);
      middleFlow.push(requerenteStep);

      newFlow = [...baseFlow, ...middleFlow];
    }

    setFormFlow(newFlow);
    if (currentStep >= newFlow.length) {
      setCurrentStep(newFlow.length - 1);
    }
  }, [productData, formData.formato, currentStep]);

  const renderCurrentStep = () => {
    if (!formFlow[currentStep]) return null;
    const { Component } = formFlow[currentStep];
    return (
      <Component
        formData={formData}
        handleChange={(e) => {
          const { name, value, type, checked } = e.target;
          setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        }}
        productData={productData}
        error={validationError}
        attachedFiles={attachedFiles}
        onFileAdd={(file) => setAttachedFiles(prev => [...prev, file])}
        onFileRemove={(name) => setAttachedFiles(prev => prev.filter(f => f.name !== name))}
      />
    );
  };

  return (
    <div className={styles.formLayout}>
      <div className={styles.mainContent}>
        <StepProgressBar steps={formFlow} currentStep={currentStep} />
        <form>{renderCurrentStep()}</form>
      </div>

      <SummarySidebar
        productData={productData}
        formData={formData}
        finalPrice={finalPrice}
        currentStep={currentStep}
        formSteps={formFlow.map(f => f.title)}
        attachedFiles={attachedFiles}
      />
    </div>
  );
}
