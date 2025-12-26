// src/components/MultiStepForm/steps/StepGovDados.js
'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import styles from './StepGovDados.module.css';
import SearchableDropdown from './SearchableDropdown';

// Campo genérico
const FormField = ({ field, value, onChange }) => {
  const { name, label, type = 'text', required = true } = field;

  const handleChangeWithMask = (e) => {
    let { value } = e.target;

    if (name.toLowerCase().includes('cpf')) {
      value = value.replace(/\D/g, '').slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    if (name.toLowerCase().includes('cnpj')) {
      value = value.replace(/\D/g, '').slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }

    onChange({ target: { name, value } });
  };

  return (
    <div className={styles.formGroup}>
      <label>{label}{required && '*'}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={handleChangeWithMask}
        required={required}
      />
    </div>
  );
};

export default function StepGovDados({ formData, handleChange, error, productData }) {
  const { govFormFields = {}, name: productName } = productData;

  const hasPessoa = govFormFields.pessoa?.length > 0;
  const hasEmpresa = govFormFields.empresa?.length > 0;

  // ✅ CORREÇÃO PRINCIPAL
  const [activeTab, setActiveTab] = useState(() => {
    if (formData.tipo_pessoa) return formData.tipo_pessoa;
    if (!hasPessoa && hasEmpresa) return 'Empresa';
    return 'Pessoa';
  });

  const [estados, setEstados] = useState([]);
  const [loadingEstados, setLoadingEstados] = useState(false);

  useEffect(() => {
    if (govFormFields.needsState) {
      setLoadingEstados(true);
      api.get('/cartorios/estados')
        .then(res => setEstados(res.data))
        .finally(() => setLoadingEstados(false));
    }
  }, [govFormFields.needsState]);

  const fieldsToRender =
    activeTab === 'Pessoa'
      ? govFormFields.pessoa || []
      : govFormFields.empresa || [];

  return (
    <div>
      <h3 className={styles.stepTitle}>1. Dados da Certidão</h3>
      <p className={styles.stepDescription}>
        Informe os dados para a emissão da {productName}.
      </p>

      {govFormFields.needsState && (
        <div className={styles.formGroup}>
          <label>Estado*</label>
          <SearchableDropdown
            options={estados}
            value={formData.estado || ''}
            onChange={(value) =>
              handleChange({ target: { name: 'estado', value } })
            }
            loading={loadingEstados}
            placeholder="Selecione o Estado"
          />
        </div>
      )}

      {hasPessoa && hasEmpresa && (
        <div className={styles.tabContainer}>
          <button
            type="button"
            className={activeTab === 'Pessoa' ? styles.activeTab : styles.tabButton}
            onClick={() => {
              setActiveTab('Pessoa');
              handleChange({ target: { name: 'tipo_pessoa', value: 'Pessoa' } });
            }}
          >
            Pessoa
          </button>

          <button
            type="button"
            className={activeTab === 'Empresa' ? styles.activeTab : styles.tabButton}
            onClick={() => {
              setActiveTab('Empresa');
              handleChange({ target: { name: 'tipo_pessoa', value: 'Empresa' } });
            }}
          >
            Empresa
          </button>
        </div>
      )}

      <div className={styles.formContent}>
        {fieldsToRender.map(field => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}

        {error && <small className={styles.errorMessage}>{error}</small>}
      </div>
    </div>
  );
}
