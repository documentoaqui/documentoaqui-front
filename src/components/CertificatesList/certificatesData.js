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

export const categories = [
  'imoveis',
  'registro_civil',
  'notas',
  'protesto',
  'federais_estaduais',
  'municipais',
  'pesquisa'
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
      { id: 'cartorio', label: 'Cartório', type: 'select', required: true },
    ]
  },
  formTemplateRequerente
];

export const allCertificates = [
  {
    id: 46,
    name: 'Certidão de Imóvel',
    slug: toSlug('Certidão de Imóvel'),
    price: null,
    category: 'imoveis',
    icon: icons.BUILDING,
    imageSrc: productImagePaths[toSlug('Certidão de Imóvel')],
    formFields: formTemplateCertidaoImovel
  },
  {
    id: 52,
    name: 'Visualização de Matrícula',
    slug: toSlug('Visualização de Matrícula'),
    price: null,
    category: 'imoveis',
    icon: icons.BUILDING,
    imageSrc: productImagePaths[toSlug('Visualização de Matrícula')],
    formFields: formTemplateCertidaoImovel
  },
  {
    id: 49,
    name: 'Certidão de Nascimento',
    slug: toSlug('Certidão de Nascimento'),
    price: null,
    category: 'registro_civil',
    icon: icons.DOCUMENT,
    imageSrc: productImagePaths[toSlug('Certidão de Nascimento')]
  },
  {
    id: 48,
    name: 'Certidão de Casamento',
    slug: toSlug('Certidão de Casamento'),
    price: null,
    category: 'registro_civil',
    icon: icons.DOCUMENT,
    imageSrc: productImagePaths[toSlug('Certidão de Casamento')]
  },
  {
    id: 47,
    name: 'Certidão de Óbito',
    slug: toSlug('Certidão de Óbito'),
    price: null,
    category: 'registro_civil',
    icon: icons.DOCUMENT,
    imageSrc: productImagePaths[toSlug('Certidão de Óbito')]
  },
  {
    id: 57,
    name: 'Certidão de Protesto',
    slug: toSlug('Certidão de Protesto'),
    price: null,
    category: 'protesto',
    icon: icons.PROTEST,
    imageSrc: productImagePaths[toSlug('Certidão de Protesto')]
  },
  {
    id: 67,
    name: 'Pesquisa Escrituras e Procurações por CPF/CNPJ',
    slug: toSlug('Pesquisa Escrituras e Procurações por CPF CNPJ'),
    price: 68.30,
    category: 'notas',
    icon: icons.SEARCH,
    imageSrc: productImagePaths[toSlug('Pesquisa Escrituras e Procurações por CPF CNPJ')]
  },
  {
    id: 59,
    name: 'Pesquisa Completa de Veículo',
    slug: toSlug('Pesquisa Completa de Veículo'),
    price: 77.60,
    category: 'pesquisa',
    icon: icons.SEARCH,
    imageSrc: productImagePaths[toSlug('Pesquisa Completa de Veículo')]
  },
  {
    id: 1,
    name: 'Certidão de Distribuição da Justiça Federal (TRF)',
    slug: toSlug('Certidão de Distribuição da Justiça Federal TRF'),
    price: PRICE_FEDERAL_ESTADUAL,
    category: 'federais_estaduais',
    icon: icons.JUSTICE,
    imageSrc: productImagePaths[toSlug('Certidão de Distribuição da Justiça Federal TRF')]
  },
  {
    id: 101,
    name: 'Certidão de Valor Venal',
    slug: toSlug('Certidão de Valor Venal'),
    price: PRICE_MUNICIPAL,
    category: 'municipais',
    icon: icons.JUSTICE,
    imageSrc: productImagePaths[toSlug('Certidão de Valor Venal')]
  }
];
