// Salve em: src/components/MultiStepForm/steps/StepEscritura.js
'use client';

import { useState, useRef } from 'react';
import styles from './StepEscritura.module.css';
import { isValidCPF, isValidCNPJ } from '@/utils/validators';

const maskCPF = (value) => value.replace(/\D/g, '').slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
const maskCNPJ = (value) => value.replace(/\D/g, '').slice(0, 14).replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d)/, '$1-$2');

// *** PROPS onFileSelect E onFileRemove ADICIONADAS ***
export default function StepEscritura({ formData, handleChange, error, productData, onFileSelect, onFileRemove }) {
    const [tipoPessoa, setTipoPessoa] = useState(formData.tipo_pessoa || 'Pessoa');
    const [selectedFile, setSelectedFile] = useState(null); // Estado para o arquivo
    const fileInputRef = useRef(null);

    const handleDocumentoChange = (e) => {
        const { name, value } = e.target;
        const cleanedValue = value.replace(/\D/g, '');
        
        if (tipoPessoa === 'Pessoa') {
            handleChange({ target: { name, value: maskCPF(value) } });
        } else {
            handleChange({ target: { name, value: maskCNPJ(value) } });
        }
    };

    const handleTabChange = (tab) => {
        setTipoPessoa(tab);
        handleChange({ target: { name: 'tipo_pessoa', value: tab } });
        handleChange({ target: { name: 'nome_outorgante', value: '' } });
        handleChange({ target: { name: 'cpf_cnpj_escritura', value: '' } });
    };

    // *** LÓGICA DE UPLOAD CORRIGIDA ***
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("O arquivo excede o tamanho máximo de 2MB.");
                e.target.value = '';
                return;
            }
            setSelectedFile(file);
            if (onFileSelect) onFileSelect(file); // Envia o arquivo para o componente pai
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (onFileRemove) onFileRemove(); // Avisa o componente pai
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div>
            <h3 className={styles.stepTitle}>2. Dados da {productData.name}</h3>

            <div className={styles.infoBox}>
                *Escolha entre Pessoa e Empresa e preencha os campos abaixo.
            </div>

            <div className={styles.tabContainer}>
                <button type="button" onClick={() => handleTabChange('Pessoa')} className={tipoPessoa === 'Pessoa' ? styles.activeTab : ''}>Pessoa</button>
                <button type="button" onClick={() => handleTabChange('Empresa')} className={tipoPessoa === 'Empresa' ? styles.activeTab : ''}>Empresa</button>
            </div>

            <div className={styles.formContent}>
                <div className={styles.formGroup}>
                    <label htmlFor="nome_outorgante">{tipoPessoa === 'Pessoa' ? 'Nome do outorgante*' : 'Empresa outorgante*'}</label>
                    <input type="text" id="nome_outorgante" name="nome_outorgante" value={formData.nome_outorgante || ''} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="cpf_cnpj_escritura">{tipoPessoa === 'Pessoa' ? 'CPF*' : 'CNPJ*'}</label>
                    <input type="text" id="cpf_cnpj_escritura" name="cpf_cnpj_escritura" value={formData.cpf_cnpj_escritura || ''} onChange={handleDocumentoChange} placeholder={tipoPessoa === 'Pessoa' ? '000.000.000-00' : '00.000.000/0000-00'} required />
                    {error && <small className={styles.errorMessage}>{error}</small>}
                </div>
            </div>

            <h4 className={styles.complementarTitle}>Dados complementares</h4>
            <div className={styles.infoBox}>
                *Os campos a seguir são de preenchimento obrigatório. Se você não souber, clique em (Localizar pra mim). Essa busca terá custo adicional. Se você estiver com dificuldade em interpretar o seu documento, anexe uma imagem, clicando em (Juntar documento).
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="numero_livro">Número do livro*</label>
                <input type="text" id="numero_livro" name="numero_livro" value={formData.numero_livro || ''} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="numero_pagina">Número da página*</label>
                <input type="text" id="numero_pagina" name="numero_pagina" value={formData.numero_pagina || ''} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="data_ato">Data do Ato</label>
                <input type="date" id="data_ato" name="data_ato" value={formData.data_ato || ''} onChange={handleChange} />
            </div>

            <div className={styles.buscaContainer}>
                <label className={styles.checkboxLabel}>
                    <input type="checkbox" name="localizar_pra_mim" checked={!!formData.localizar_pra_mim} onChange={handleChange} />
                    Localizar pra mim (+ R$ 99,90)
                </label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/png, image/jpeg, .pdf" />
                <button type="button" className={styles.juntarButton} onClick={() => fileInputRef.current.click()}>
                    {selectedFile ? `Arquivo: ${selectedFile.name}` : 'Juntar Documento'}
                </button>
                {selectedFile && <button type="button" onClick={handleRemoveFile} className={styles.removeFileButton}>Remover</button>}
            </div>
        </div>
    );
}