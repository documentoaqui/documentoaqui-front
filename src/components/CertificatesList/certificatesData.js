import { productImagePaths } from '@/utils/imagePaths';

export const icons = {
  JUSTICE: 'justice',
  DOCUMENT: 'document',
  BUILDING: 'building',
  PROTEST: 'protest',
  LAWYER: 'lawyer',
  SEARCH: 'search',
};

const PRICE_FEDERAL_ESTADUAL = 43.70;
const PRICE_MUNICIPAL = 77.30;

/**
 * Categorias VISUAIS (exibidas ao usuário)
 */
export const categories = [
  'Imóveis',
  'Registro Civil',
  'Notas',
  'Protesto',
  'Federais e Estaduais',
  'Municipais',
  'Pesquisa'
];

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

/* =========================
   FORMULÁRIOS
========================= */

const formTemplateRequerente = {
  groupTitle: 'Dados do(a) requerente',
  fields: [
    { id: 'requerente_nome', label: 'Nome completo', type: 'text', required: true },
    { id: 'requerente_telefone', label: 'Telefone', type: 'tel', required: true },
    { id: 'requerente_cpf', label: 'CPF', type: 'text', required: true },
    { id: 'requerente_email', label: 'E-mail', type: 'email', required: true },
  ]
};

const formTemplateCertidaoImovel = [
  {
    groupTitle: 'Dados do Imóvel',
    fields: [
      { id: 'estado', label: 'Estado', type: 'select', required: true },
      { id: 'cidade', label: 'Cidade', type: 'select', required: true },
      { id: 'cartorio', label: 'Cartório de Registro de Imóveis', type: 'select', required: true },
      { id: 'numero_matricula', label: 'Número da Matrícula', type: 'text', required: true },
    ]
  },
  formTemplateRequerente
];

const createFormTemplateRegistroCivil = (fields) => ([
  {
    groupTitle: 'Dados do Registro',
    fields
  },
  {
    groupTitle: 'Formato da Entrega',
    type: 'radio',
    options: [
      { id: 'formato', value: 'Digital', label: 'Certidão digital (PDF)' },
      { id: 'formato', value: 'Papel', label: 'Certidão em papel (+ frete)' }
    ]
  },
  formTemplateRequerente
]);

const formTemplateNascimento = createFormTemplateRegistroCivil([
  { id: 'nome_registrado', label: 'Nome do registrado(a)', type: 'text', required: true },
  { id: 'nome_mae', label: 'Nome da mãe', type: 'text', required: true },
  { id: 'nome_pai', label: 'Nome do pai', type: 'text', required: false },
  { id: 'data_nascimento', label: 'Data de nascimento', type: 'date', required: true },
]);

const formTemplateCasamento = createFormTemplateRegistroCivil([
  { id: 'nome_conjuge1', label: 'Nome do cônjuge 1', type: 'text', required: true },
  { id: 'nome_conjuge2', label: 'Nome do cônjuge 2', type: 'text', required: true },
  { id: 'data_casamento', label: 'Data do casamento', type: 'date', required: true },
]);

const formTemplateObito = createFormTemplateRegistroCivil([
  { id: 'nome_falecido', label: 'Nome do falecido(a)', type: 'text', required: true },
  { id: 'data_obito', label: 'Data do óbito', type: 'date', required: true },
]);

const formTemplateInterdicao = createFormTemplateRegistroCivil([
  { id: 'nome_interditado', label: 'Nome do interditado(a)', type: 'text', required: true },
  { id: 'data_sentenca', label: 'Data da sentença', type: 'date', required: true },
]);

/* =========================
   CERTIDÕES
========================= */

export const allCertificates = [

  /* ===== IMÓVEIS ===== */
  {
    id: 46,
    name: 'Certidão de Imóvel',
    slug: toSlug('Certidão de Imóvel'),
    price: null,
    category: 'Imóveis',
    categoryKey: 'imoveis',
    icon: icons.BUILDING,
    imageSrc: productImagePaths[toSlug('Certidão de Imóvel')],
    formFields: formTemplateCertidaoImovel
  },
  {
    id: 52,
    name: 'Visualização de Matrícula',
    slug: toSlug('Visualização de Matrícula'),
    price: null,
    category: 'Imóveis',
    categoryKey: 'imoveis',
    icon: icons.BUILDING,
    imageSrc: productImagePaths[toSlug('Visualização de Matrícula')],
    formFields: formTemplateCertidaoImovel
  },

  /* ===== REGISTRO CIVIL ===== */
  {
    id: 49,
    name: 'Certidão de Nascimento',
    slug: toSlug('Certidão de Nascimento'),
    price: null,
    category: 'Registro Civil',
    categoryKey: 'registro_civil',
    icon: icons.DOCUMENT,
    imageSrc: productImagePaths[toSlug('Certidão de Nascimento')],
    formFields: formTemplateNascimento
  },
  {
    id: 48,
    name: 'Certidão de Casamento',
    slug: toSlug('Certidão de Casamento'),
    price: null,
    category: 'Registro Civil',
    categoryKey: 'registro_civil',
    icon: icons.DOCUMENT,
    imageSrc: productImagePaths[toSlug('Certidão de Casamento')],
    formFields: formTemplateCasamento
  },
  {
    id: 47,
    name: 'Certidão de Óbito',
    slug: toSlug('Certidão de Óbito'),
    price: null,
    category: 'Registro Civil',
    categoryKey: 'registro_civil',
    icon: icons.DOCUMENT,
    imageSrc: productImagePaths[toSlug('Certidão de Óbito')],
    formFields: formTemplateObito
  },
  {
    id: 43,
    name: 'Certidão de Interdição',
    slug: toSlug('Certidão de Interdição'),
    price: null,
    category: 'Registro Civil',
    categoryKey: 'registro_civil',
    icon: icons.DOCUMENT,
    imageSrc: productImagePaths[toSlug('Certidão de Interdição')],
    formFields: formTemplateInterdicao
  },

  /* ===== PROTESTO ===== */
  {
    id: 57,
    name: 'Certidão de Protesto',
    slug: toSlug('Certidão de Protesto'),
    price: null,
    category: 'Protesto',
    categoryKey: 'protesto',
    icon: icons.PROTEST,
    imageSrc: productImagePaths[toSlug('Certidão de Protesto')],
    formFields: formTemplateRequerente
  },

  /* ===== FEDERAIS / ESTADUAIS ===== */
  {
    id: 1,
    name: 'Certidão de Distribuição da Justiça Federal (TRF)',
    slug: toSlug('Certidão de Distribuição da Justiça Federal TRF'),
    price: PRICE_FEDERAL_ESTADUAL,
    category: 'Federais e Estaduais',
    categoryKey: 'federais_estaduais',
    icon: icons.JUSTICE,
    imageSrc: productImagePaths[toSlug('Certidão de Distribuição da Justiça Federal TRF')],
    formFields: formTemplateRequerente
  },

  /* ===== MUNICIPAIS ===== */
  {
    id: 101,
    name: 'Certidão de Valor Venal',
    slug: toSlug('Certidão de Valor Venal'),
    price: PRICE_MUNICIPAL,
    category: 'Municipais',
    categoryKey: 'municipais',
    icon: icons.JUSTICE,
    imageSrc: productImagePaths[toSlug('Certidão de Valor Venal')],
    formFields: formTemplateRequerente
  },

  /* ===== PESQUISA ===== */
  {
    id: 59,
    name: 'Pesquisa Completa de Veículo',
    slug: toSlug('Pesquisa Completa de Veículo'),
    price: 77.60,
    category: 'Pesquisa',
    categoryKey: 'pesquisa',
    icon: icons.SEARCH,
    imageSrc: productImagePaths[toSlug('Pesquisa Completa de Veículo')],
    formFields: formTemplateRequerente
  },
];
      
