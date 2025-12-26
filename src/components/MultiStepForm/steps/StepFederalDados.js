'use client';

import { useState, useEffect } from 'react';
import styles from './StepFederalDados.module.css';
import SearchableDropdown from './SearchableDropdown';
import api from '@/services/api';

const maskCPF = (v) =>
  v.replace(/\D/g, '').slice(0, 11)
   .replace(/(\d{3})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const maskCNPJ = (v) =>
  v.replace(/\D/g, '').slice(0, 14)
   .replace(/(\d{2})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d)/, '$1.$2')
   .replace(/(\d{3})(\d)/, '$1/$2')
   .replace(/(\d{4})(\d)/, '$1-$2');

export default function StepFederalDados({ formData, handleChange, productData, error }) {
  const { govFormFields = {}, name } = productData;

  const [activeTab, setActiveTab] = useState(() => {
    if (formData.tipo_pessoa) return formData.tipo_pessoa;
    if (govFormFields.pessoa?.length) return 'Pessoa';
    if (govFormFields.empresa?.length) return 'Empresa';
    return 'Pessoa';
  });

  const [estados, setEstados] = useState([]);
  const [loadingEstados, setLoadingEstados] = useState(false);

  const hasPessoa = govFormFields.pessoa?.length > 0;
  const hasEmpresa = govFormFields.empresa?.length > 0;

  const fieldsToRender =
    activeTab === 'Pessoa'
      ? govFormFields.pessoa || []
      : govFormFields.empresa || [];

  useEffect(() => {
    if (govFormFields.needsState) {
      setLoadingEstados(true);
      api.get('/cartorios/estados')
        .then(res => setEstados(res.data))
        .finally(() => setLoadingEstados(false));
    }
  }, [govFormFields.needsState]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    handleChange({ target: { name: 'tipo_pessoa', value: tab } });
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name.includes('cpf')) value = maskCPF(value);
    if (name.includes('cnpj')) value = maskCNPJ(value);

    handleChange({ target: { name, value } });
  };

  return (
    <div>
      <h3 className={styles.stepTitle}>1. Dados da Certidão</h3>
      <p className={styles.stepDescription}>
        Informe os dados para a emissão da {name}.
      </p>

      {govFormFields.needsState && (
        <div className={styles.formGroup}>
          <label>Estado *</label>
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
            onClick={() => handleTabChange('Pessoa')}
            className={activeTab === 'Pessoa' ? styles.activeTab : styles.tabButton}
          >
            Pessoa
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('Empresa')}
            className={activeTab === 'Empresa' ? styles.activeTab : styles.tabButton}
          >
            Empresa
          </button>
        </div>
      )}

      <div className={styles.formContent}>
        {fieldsToRender.map(field => (
          <div key={field.name} className={styles.formGroup}>
            <label>{field.label}{field.required !== false && '*'}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              required={field.required !== false}
            />
          </div>
        ))}

        {error && <small className={styles.errorMessage}>{error}</small>}
      </div>
    </div>
  );
}
