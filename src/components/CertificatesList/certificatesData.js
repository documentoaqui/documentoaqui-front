// Salve em: src/components/CertificatesList/certificatesData.js

import { productImagePaths } from '@/utils/imagePaths';

export const icons = {
  JUSTICE: 'justice',
  DOCUMENT: 'document',
  BUILDING: 'building',
  PROTEST: 'protest',
  LAWYER: 'lawyer',
  SEARCH: 'search',
};

// --- CONSTANTES DE PREÇO BASE (APENAS PARA ONDE NÃO HÁ VARIAÇÃO POR ESTADO) ---
const PRICE_FEDERAL_ESTADUAL = 43.70;
const PRICE_MUNICIPAL = 77.30;
// Preços de Protesto, Registro Civil, Imóveis e Notas agora são por estado (null)

export const categories = [
  'Imóveis',
  'Registro Civil',
  'Notas',
  'Protesto',
  'Federais e Estaduais',
  'Municipais',
  // 'Suporte Juridico',
  'Pesquisa'
];

const toSlug = (str) => {
  if (!str) return '';
  const normalizedStr = str.normalize('NFD');
  const withoutAccents = normalizedStr.replace(/[\u0300-\u036f]/g, '');
  return withoutAccents
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};


// --- TEMPLATES DE FORMULÁRIO ---

const formTemplateRequerente = {
  groupTitle: 'Dados do(a) requerente',
  groupDescription: 'Informe seus dados para o andamento e recebimento de atualizações do seu serviço.',
  fields: [
    { id: 'requerente_nome', label: 'Nome completo do(a) solicitante', type: 'text', required: true },
    { id: 'requerente_telefone', label: 'Telefone', type: 'tel', required: true },
    { id: 'requerente_cpf', label: 'CPF', type: 'text', required: true },
    { id: 'requerente_email', label: 'E-mail', type: 'email', required: true, placeholder: 'E-mail para receber informações do pedido' },
  ]
};

const formTemplateCertidaoImovel = [
  {
    groupTitle: 'Dados do Imóvel',
    groupDescription: '1. Localização do Cartório da Certidão',
    fields: [
      { id: 'estado', label: 'Estado do Cartório', type: 'select', required: true },
      { id: 'cidade', label: 'Cidade do Cartório', type: 'select', required: true },
      { id: 'cartorio', label: 'Cartório', type: 'select', required: true },
    ]
  },
  {
    groupTitle: 'Tipo de Certidão',
    groupDescription: '2. Dados da Certidão',
    type: 'radioWithOptions',
    options: [
      {
        value: 'Matrícula Simples (Inteiro Teor)',
        label: 'Matrícula',
        description: 'É o número de registro do imóvel...',
        conditionalFields: [
          { id: 'matricula', label: 'Matrícula*', type: 'text', required: true, placeholder: 'Digite o número da matrícula do imóvel' }
        ]
      }
    ]
  },
  {
    groupTitle: 'Formato da Entrega',
    type: 'radio',
    options: [
      { id: 'formato', value: 'Certidão Impressa', label: 'Certidão em papel', description: 'Enviada no endereço. Acréscimo de R$ 40,00.' },
      { id: 'formato', value: 'Certidão Digital', label: 'Certidão eletrônica', description: 'Enviada por e-mail em PDF' },
    ]
  },
  {
    groupTitle: 'Serviços Adicionais (Opcional)',
    fields: [
      { id: 'apostilamento', label: 'Apostilamento', type: 'checkbox', description: 'Para validade em outros países. R$ 290,00' },
      { id: 'aviso_recebimento', label: 'Aviso de recebimento (A.R)', type: 'checkbox', description: 'Recibo dos correios que comprova a entrega. R$ 35,00' },
    ]
  },
  formTemplateRequerente
];

const formTemplateVisualizacaoMatricula = [
  { groupTitle: 'Dados para Localização', fields: [
    { id: 'estado', label: 'Estado', type: 'select', required: true },
    { id: 'cidade', label: 'Cidade', type: 'select', required: true },
    { id: 'cartorio', label: 'Cartório de Registro de Imóveis', type: 'select', required: true },
    { id: 'numero_matricula', label: 'Número da Matrícula', type: 'text', required: true },
  ]},
  formTemplateRequerente,
];

const createFormTemplateRegistroCivil = (fieldsGroup) => [
  fieldsGroup,
  {
    groupTitle: 'Formato da Entrega',
    type: 'radio',
    options: [
        { id: 'formato', value: 'Certidão Impressa', label: 'Certidão em papel', description: 'Enviada no endereço. Acréscimo de R$ 40,00.' },
        { id: 'formato', value: 'Certidão Digital', label: 'Certidão eletrônica', description: 'Enviada por e-mail em PDF' },
    ]
  },
  {
    groupTitle: 'Serviços Adicionais (Opcional)',
    fields: [
        { id: 'apostilamento', label: 'Apostilamento', type: 'checkbox', description: 'Para validade em outros países. R$ 290,00' },
        { id: 'aviso_recebimento', label: 'Aviso de recebimento (A.R)', type: 'checkbox', description: 'Recibo dos correios que comprova a entrega. R$ 35,00' },
    ]
  },
  formTemplateRequerente
];

const formTemplateNascimento = createFormTemplateRegistroCivil({
  groupTitle: 'Dados do Registro',
  fields: [
    { id: 'nome_completo_registrado', label: 'Nome completo do registrado(a)', type: 'text', required: true },
    { id: 'nome_completo_mae', label: 'Nome Completo da Mãe na Certidão', type: 'text', required: true },
    { id: 'nome_completo_pai', label: 'Nome Completo do Pai na Certidão', type: 'text', required: true },
    { id: 'data_nascimento', label: 'Data de nascimento', type: 'date', required: true },
    { id: 'numero_livro', label: 'Número do livro (opcional)', type: 'text', required: false },
    { id: 'numero_folha', label: 'Número da folha (opcional)', type: 'text', required: false },
    { id: 'numero_termo', label: 'Número do termo (opcional)', type: 'text', required: false },
  ]
});

const formTemplateCasamento = createFormTemplateRegistroCivil({
  groupTitle: 'Dados do Registro',
  fields: [
    { id: 'nome_conjuge1', label: 'Nome completo do Cônjuge 1 na Certidão', type: 'text', required: true },
    { id: 'nome_conjuge2', label: 'Nome completo do Cônjuge 2 na Certidão', type: 'text', required: true },
    { id: 'data_casamento', label: 'Data do casamento', type: 'date', required: true },
    { id: 'numero_livro', label: 'Número do livro (opcional)', type: 'text', required: false },
    { id: 'numero_folha', label: 'Número da folha (opcional)', type: 'text', required: false },
    { id: 'numero_termo', label: 'Número do termo (opcional)', type: 'text', required: false },
  ]
});

const formTemplateObito = createFormTemplateRegistroCivil({
  groupTitle: 'Dados do Registro',
  fields: [
    { id: 'nome_completo_falecido', label: 'Nome completo do Falecido(a) na Certidão', type: 'text', required: true },
    { id: 'nome_completo_mae', label: 'Nome Completo da Mãe na Certidão', type: 'text', required: true },
    { id: 'nome_completo_pai', label: 'Nome Completo do Pai na Certidão', type: 'text', required: true },
    { id: 'data_obito', label: 'Data do óbito', type: 'date', required: true },
    { id: 'numero_livro', label: 'Número do livro (opcional)', type: 'text', required: false },
    { id: 'numero_folha', label: 'Número da folha (opcional)', type: 'text', required: false },
    { id: 'numero_termo', label: 'Número do termo (opcional)', type: 'text', required: false },
  ]
});

const formTemplateInterdicao = createFormTemplateRegistroCivil({
  groupTitle: 'Dados do Registro',
  fields: [
    { id: 'nome_completo_interditado', label: 'Nome completo do interditado(a)', type: 'text', required: true },
    { id: 'nome_completo_mae', label: 'Nome Completo da Mãe na Certidão', type: 'text', required: true },
    { id: 'nome_completo_pai', label: 'Nome Completo do Pai na Certidão', type: 'text', required: true },
    { id: 'data_sentenca', label: 'Data da Sentença de Interdição', type: 'date', required: true },
    { id: 'numero_livro', label: 'Número do livro (opcional)', type: 'text', required: false },
    { id: 'numero_folha', label: 'Número da folha (opcional)', type: 'text', required: false },
    { id: 'numero_termo', label: 'Número do termo (opcional)', type: 'text', required: false },
  ]
});

const formTemplateEscritura = [
    { groupTitle: 'Dados da Escritura', fields: [] },
    {
      groupTitle: 'Formato da Entrega',
      type: 'radio',
      options: [
          { id: 'formato', value: 'Certidão Impressa', label: 'Certidão em papel', description: 'Enviada no endereço. Acréscimo de R$ 40,00.' },
          { id: 'formato', value: 'Certidão Digital', label: 'Certidão eletrônica', description: 'Enviada por e-mail em PDF' },
      ]
    },
    {
      groupTitle: 'Serviços Adicionais (Opcional)',
      fields: [
          { id: 'apostilamento', label: 'Apostilamento', type: 'checkbox', description: 'Para validade em outros países. R$ 290,00' },
          { id: 'aviso_recebimento', label: 'Aviso de recebimento (A.R)', type: 'checkbox', description: 'Recibo dos correios que comprova a entrega. R$ 35,00' },
      ]
    },
    formTemplateRequerente
];

const formTemplateProtesto = [
  { groupTitle: 'Dados para Pesquisa de Protesto', fields: [
      { id: 'cpf_cnpj', label: 'CPF ou CNPJ', type: 'text', required: true },
      { id: 'nome_razao_social', label: 'Nome / Razão Social', type: 'text', required: true },
      { id: 'periodo', label: 'Período da Pesquisa', type: 'radio', options: [{ value: '5', label: 'Últimos 5 anos' },{ value: '10', label: 'Últimos 10 anos' }], required: true }
  ] },
  formTemplateRequerente,
];

const formTemplatePesquisaVeiculo = [
  { groupTitle: 'Dados da Pesquisa', fields: [ { id: 'placa', label: 'Placa', type: 'text', required: true } ] },
  formTemplateRequerente,
];
const formTemplatePesquisaLeilao = [
    { groupTitle: 'Dados da Pesquisa', fields: [ { id: 'placa_chassi', label: 'Placa ou Chassi', type: 'text', required: true } ] },
    formTemplateRequerente,
];
const formTemplatePesquisaGravame = [
    { groupTitle: 'Dados da Pesquisa', fields: [ { id: 'placa_chassi', label: 'Placa ou Chassi', type: 'text', required: true } ] },
    formTemplateRequerente,
];
const formTemplatePesquisaRouboFurto = [
    { groupTitle: 'Dados da Pesquisa', fields: [ { id: 'placa', label: 'Placa', type: 'text', required: false }, { id: 'renavam', label: 'Renavam', type: 'text', required: false } ]},
    formTemplateRequerente,
];
const formTemplatePesquisaProcessos = [
    { groupTitle: 'Dados da Pesquisa', fields: [ { id: 'cpf_cnpj', label: 'CPF/CNPJ', type: 'text', required: true } ] },
    formTemplateRequerente,
];
const formTemplatePesquisaSintegra = [
    { groupTitle: 'Dados da Pesquisa', fields: [ { id: 'cnpj', label: 'CNPJ', type: 'text', required: false }, { id: 'inscricao_estadual', label: 'Inscrição Estadual', type: 'text', required: false }, { id: 'nire', label: 'NIRE', type: 'text', required: false } ]},
    formTemplateRequerente,
];
const formTemplatePesquisaEscrituras = [
    { groupTitle: 'Dados da Pesquisa', fields: [ { id: 'cpf_cnpj', label: 'CPF/CNPJ', type: 'text', required: true }, { id: 'nome_razao_social', label: 'Nome / Razão Social', type: 'text', required: true } ]},
    formTemplateRequerente,
];
const formTemplateConsultaJuridica = [
  { groupTitle: 'Dados para Contato', groupDescription: 'Informe seus dados para que um de nossos advogados possa entrar em contato para agendar sua consulta.',
    fields: [
      { id: 'nome_completo_contato', label: 'Nome completo', type: 'text', required: true, placeholder: 'Seu nome completo' },
      { id: 'email_contato', label: 'E-mail', type: 'email', required: true, placeholder: 'Seu melhor e-mail' },
      { id: 'telefone_contato', label: 'Telefone', type: 'tel', required: true, placeholder: '(00) 00000-0000' },
      { id: 'assunto_contato', label: 'Assunto da Consulta', type: 'select', required: true, options: [ { value: '', label: 'Selecione um assunto' }, { value: 'imobiliario', label: 'Direito Imobiliário' }, { value: 'familia', label: 'Direito de Família' }, { value: 'contratos', label: 'Contratos e Obrigações' }, { value: 'outro', label: 'Outro assunto' } ]},
      { id: 'mensagem_contato', label: 'Descreva brevemente sua dúvida', type: 'textarea', required: false, placeholder: 'Ex: Dúvida sobre compra de imóvel, divórcio, etc.' },
    ]
  }
];


// --- LISTA COMPLETA DE CERTIDÕES (SEM DUPLICATAS) ---
export const allCertificates = [
  {
    // teste de pagamento
    id: 999,
    name: 'Certidão Teste',
    esfera: 'Teste',
    imageSrc: '/img/certidao-teste.png',
    price: 1,
    slug: toSlug('Certidão Teste'),
  },
  // --- Cartório de Registro de Imóveis ---
  { id: 46, name: 'Certidão de Imóvel', slug: toSlug('Certidão de Imóvel'), price: null, atribuicaoId: 4, category: 'Imóveis', icon: icons.BUILDING, imageSrc: productImagePaths[toSlug('Certidão de Imóvel')],
    description: 'Solicite a certidão de matrícula do seu imóvel, essencial para transações de compra e venda.',
    longDescription: 'A Certidão de Imóvel é o documento oficial que comprova a situação jurídica de uma propriedade...',
    faq: '[{"q": "Para que serve esta certidão?", "a": "É essencial para processos de compra e venda, financiamentos, inventários, partilhas e para comprovar a propriedade e a inexistência de dívidas atreladas ao imóvel."},{"q": "Qual a validade da certidão de imóvel?", "a": "Geralmente, para atos oficiais como escrituras, a validade é de 30 dias. Para simples conferência, não há prazo de validade."}]',
    formFields: formTemplateCertidaoImovel, allowCpfSearch: true, allowManualCartorio: true 
  },
  { id: 52, name: 'Visualização de Matrícula', slug: toSlug('Visualização de Matrícula'), price: null, atribuicaoId: 4, category: 'Imóveis', icon: icons.BUILDING, imageSrc: productImagePaths[toSlug('Visualização de Matrícula')],
    description: 'Visualize a matrícula de um imóvel antes de requerer a sua certidão. Obs.: Não possui valor jurídico.',
    longDescription: 'A visualização de matrícula é uma cópia digital não certificada do documento oficial do imóvel...',
    faq: '[{"q": "Este documento tem valor legal?", "a": "Não, a visualização de matrícula é um documento meramente informativo e não possui validade jurídica para atos oficiais."},{"q": "Quando devo usar a visualização em vez da certidão?", "a": "Use a visualização para conferir dados rapidamente, como o nome do proprietário ou o número da matrícula, sem a necessidade de um documento oficial."}]',
    formFields: formTemplateVisualizacaoMatricula 
  },
  { id: 56, name: 'Certidão de Matrícula com Ônus e Ações', slug: toSlug('Certidão de Matrícula com Ônus e Ações'), price: null, atribuicaoId: 4, category: 'Imóveis', icon: icons.BUILDING, imageSrc: productImagePaths[toSlug('Certidão de Matrícula com Ônus e Ações')],
    description: 'Certidão completa que informa a situação do imóvel, incluindo dívidas, hipotecas e processos judiciais.',
    longDescription: 'A Certidão de Matrícula com Negativa de Ônus e Ações Reipersecutórias é o documento mais completo para verificar a segurança jurídica de um imóvel...',
    faq: '[{"q": "O que são ônus e ações reipersecutórias?", "a": "Ônus são dívidas ou obrigações que recaem sobre o imóvel (ex: hipoteca). Ações reipersecutórias são processos judiciais que podem resultar na perda da propriedade pelo atual dono."},{"q": "Por que esta certidão é mais segura?", "a": "Porque ela garante que o imóvel está livre de pendências financeiras e judiciais, protegendo o comprador de futuras complicações."}]',
    formFields: formTemplateCertidaoImovel, allowCpfSearch: true, allowManualCartorio: true 
  },
  { id: 54, name: 'Certidão de Penhor e Safra', slug: toSlug('Certidão de Penhor e Safra'), price: null, atribuicaoId: 4, category: 'Imóveis', icon: icons.BUILDING, imageSrc: productImagePaths[toSlug('Certidão de Penhor e Safra')],
    description: 'Documento essencial para o agronegócio, utilizado para registrar garantias em financiamentos agrícolas.',
    longDescription: 'A Certidão de Penhor e Safra comprova o registro de garantias sobre colheitas futuras ou equipamentos agrícolas...',
    faq: '[{"q": "Quem precisa desta certidão?", "a": "Produtores rurais, cooperativas, tradings e instituições financeiras que atuam com crédito agrícola."},{"q": "O que pode ser dado em penhor?", "a": "Colheitas futuras, máquinas, veículos agrícolas e outros bens móveis relacionados à atividade rural."}]',
    formFields: formTemplateCertidaoImovel, allowCpfSearch: true, allowManualCartorio: true 
  },
  { id: 64, name: 'Pesquisa Prévia de Imóveis por CPF/CNPJ', slug: toSlug('Pesquisa Previa de imoveis por CPF CNPJ'), price: null, category: 'Imóveis', icon: icons.SEARCH, 
    // *** LINHA MODIFICADA ***
    imageSrc: productImagePaths[toSlug('Pesquisa Previa de imoveis por CPF CNPJ')], 
    description: 'Busca por imóveis registrados em um CPF ou CNPJ em todos os cartórios de um estado.', 
    pesquisaType: 'previa'
  },
  { id: 65, name: 'Pesquisa Qualificada de Imóveis por CPF/CNPJ', slug: toSlug('Pesquisa Qualificada de imoveis por CPF CNPJ'), price: null, category: 'Imóveis', icon: icons.SEARCH, 
    // *** LINHA MODIFICADA ***
    imageSrc: productImagePaths[toSlug('Pesquisa Qualificada de imoveis por CPF CNPJ')],
    description: 'Investigação jurídica pelo CPF ou CNPJ em cartórios específicos de uma cidade.', 
    pesquisaType: 'qualificada'
  },

  // --- Cartório de Registro Civil ---
  { id: 49, name: 'Certidão de Nascimento', slug: toSlug('Certidão de Nascimento'), price: null, atribuicaoId: 3, category: 'Registro Civil', icon: icons.DOCUMENT, imageSrc: productImagePaths[toSlug('Certidão de Nascimento')],
    description: 'Solicite a 2ª via atualizada da Certidão de Nascimento, o primeiro e mais importante documento civil de um cidadão.',
    longDescription: 'A Certidão de Nascimento é o documento que comprova oficialmente o nascimento de uma pessoa...',
    faq: '[{"q": "Por que preciso de uma 2ª via atualizada?", "a": "Muitos órgãos públicos e processos legais, como casamento, solicitação de cidadania ou inventário, exigem uma certidão emitida nos últimos 6 meses para garantir que não houve alterações (averbações) no registro."},{"q": "O que é uma certidão em inteiro teor?", "a": "É uma cópia fiel de tudo que está escrito no livro de registro, incluindo todas as averbações. A certidão em breve relato (comum) resume as informações principais."}]',
    formFields: formTemplateNascimento 
  },
  { id: 48, name: 'Certidão de Casamento', slug: toSlug('Certidão de Casamento'), price: null, atribuicaoId: 3, category: 'Registro Civil', icon: icons.DOCUMENT, imageSrc: productImagePaths[toSlug('Certidão de Casamento')],
    description: 'Obtenha a 2ª via da sua Certidão de Casamento, com todas as averbações (divórcio, óbito, etc.).',
    longDescription: 'Este documento oficializa a união entre duas pessoas, estabelecendo a comunhão de vida e deveres...',
    faq: '[{"q": "Para que serve a 2ª via da Certidão de Casamento?", "a": "É necessária para processos de divórcio, compra e venda de imóveis, inclusão do cônjuge em planos de saúde, processos de cidadania e inventários."},{"q": "Minha certidão virá com a averbação de divórcio?", "a": "Sim, se o divórcio já foi devidamente registrado no cartório de registro civil, a averbação constará na 2ª via atualizada."}]',
    formFields: formTemplateCasamento 
  },
  { id: 47, name: 'Certidão de Óbito', slug: toSlug('Certidão de Óbito'), price: null, atribuicaoId: 3, category: 'Registro Civil', icon: icons.DOCUMENT, imageSrc: productImagePaths[toSlug('Certidão de Óbito')],
    description: 'Documento oficial que atesta o falecimento de um cidadão, indispensável para processos de inventário.',
    longDescription: 'A Certidão de Óbito é o documento legal que comprova o falecimento de uma pessoa...',
    faq: '[{"q": "Quem pode solicitar a Certidão de Óbito?", "a": "Qualquer pessoa pode solicitar, desde que tenha em mãos os dados do falecido (nome completo, data do óbito, etc.)."},{"q": "Preciso desta certidão para dar entrada na pensão por morte?", "a": "Sim, a Certidão de Óbito é um dos principais documentos exigidos pelo INSS para a concessão de pensão por morte."}]',
    formFields: formTemplateObito 
  },
  { id: 43, name: 'Certidão de Interdição', price: null, slug: toSlug('Certidão de Interdição'), atribuicaoId: 3, category: 'Registro Civil', icon: icons.DOCUMENT, imageSrc: productImagePaths[toSlug('Certidão de Interdição')],
    description: 'Comprova que uma pessoa foi declarada civilmente incapaz de exercer atos da vida civil.',
    longDescription: 'A Certidão de Interdição, Tutela e Curatela informa se uma pessoa foi legalmente declarada incapaz de administrar seus próprios bens...',
    faq: '[{"q": "Onde essa certidão é registrada?", "a": "Ela é registrada no 1º Ofício de Registro Civil da cidade onde tramitou o processo judicial de interdição."},{"q": "Por que solicitam esta certidão na compra de um imóvel?", "a": "Para garantir que o vendedor tem capacidade civil para assinar o contrato e a escritura, evitando que a venda seja anulada no futuro."}]',
    formFields: formTemplateInterdicao 
  },
  
  // --- Tabelionato de Notas (Escrituras) ---
  ...[
    { id: 32, name: 'Certidão de Escritura de Compra e Venda' }, { id: 44, name: 'Certidão de Procuração' }, { id: 37, name: 'Certidão de Escritura de Ata Notarial' }, { id: 41, name: 'Certidão de Escritura de Pacto Antenupcial' }, { id: 34, name: 'Certidão de Escritura de Doação' }, { id: 39, name: 'Certidão de Escritura de Hipoteca' }, { id: 35, name: 'Certidão de Escritura de Testamento' }, { id: 42, name: 'Certidão de Escritura de União Estável' }, { id: 40, name: 'Certidão de Escritura de Permuta' }, { id: 33, name: 'Certidão de Escritura de Inventário' }, { id: 36, name: 'Certidão de Escritura de Divórcio' }, { id: 38, name: 'Certidão de Escritura de Emancipação' }
  ].map(cert => ({ 
      ...cert, 
      price: null,
      slug: toSlug(cert.name), 
      atribuicaoId: 1,
      category: 'Notas', 
      icon: icons.DOCUMENT, 
      imageSrc: productImagePaths[toSlug(cert.name)], 
      description: `Solicite a cópia fiel (certidão) de uma ${cert.name.toLowerCase()} registrada em um Tabelionato de Notas.`,
      longDescription: `A ${cert.name} é um ato público lavrado em Tabelionato de Notas que formaliza um negócio ou declaração de vontade...`,
      faq: `[{"q": "O que é uma escritura pública?", "a": "É um documento elaborado por um tabelião que formaliza juridicamente a vontade das partes, como uma compra e venda, doação ou testamento, dando segurança e fé pública ao ato."},{"q": "Perdi minha escritura, o que fazer?", "a": "Você pode solicitar uma 2ª via (certidão da escritura) a qualquer momento no Tabelionato de Notas onde ela foi originalmente lavrada. Esta certidão tem o mesmo valor do documento original."}]`,
      formFields: formTemplateEscritura
  })),
  { id: 67, name: 'Pesquisa Escrituras e Procurações por CPF/CNPJ', slug: toSlug('Pesquisa Escrituras e Procurações por CPF CNPJ'), price: 68.30, category: 'Notas', icon: icons.SEARCH, imageSrc: productImagePaths[toSlug('Pesquisa Escrituras e Procurações por CPF CNPJ')],
    description: 'Busca por registros de procurações e/ou escrituras públicas nos Tabelionatos de Notas.',
    longDescription: 'Este serviço realiza uma busca nos índices de Tabelionatos de Notas para localizar escrituras (como compra e venda, doação, inventário) ou procurações públicas...',
    faq: `[{"q": "Qual a diferença entre esta pesquisa e pedir a certidão de uma escritura?", "a": "A pesquisa serve para localizar se existem e onde estão registradas as escrituras. A certidão é a cópia de uma escritura que você já sabe onde foi feita."}]`,
    formFields: formTemplatePesquisaEscrituras
  },

  // --- Cartório de Protesto ---
  { id: 57, name: 'Certidão de Protesto', slug: toSlug('Certidão de Protesto'), price: null, atribuicaoId: 2, category: 'Protesto', icon: icons.PROTEST, imageSrc: productImagePaths[toSlug('Certidão de Protesto')],
    description: 'Verifique a existência de dívidas protestadas em cartório para um CPF ou CNPJ.',
    longDescription: 'A Certidão de Protesto informa se uma pessoa física ou jurídica possui títulos não pagos que foram levados a protesto...',
    faq: '[{"q": "O que significa ter um nome protestado?", "a": "Significa que uma dívida não paga foi registrada oficialmente em um Cartório de Protesto, tornando a inadimplência pública e podendo levar a restrições de crédito."},{"q": "Esta certidão abrange todo o Brasil?", "a": "Não, a pesquisa é realizada por cidade. Para uma pesquisa nacional, é necessário consultar os cartórios de cada localidade de interesse ou utilizar serviços de abrangência nacional."}]',
    formFields: formTemplateProtesto 
  },
  
  // --- Certidões Federais e Estaduais ---
  ...[
    // Federais
    { id: 1, name: 'Certidão de Distribuição da Justiça Federal (TRF)', esfera: 'Federal', 
      govFormFields: {
        needsTribunal: true,
        pessoa: [
            { name: 'nome_completo', label: 'Nome completo' }, 
            { name: 'cpf', label: 'CPF' },
            { name: 'tipo_certidao', label: 'Tipo de Certidão', type: 'select', options: ['Cível', 'Criminal', 'Eleitoral'] }
        ], 
        empresa: [
            { name: 'razao_social', label: 'Razão Social' }, 
            { name: 'cnpj', label: 'CNPJ' },
            { name: 'tipo_certidao', label: 'Tipo de Certidão', type: 'select', options: ['Cível', 'Criminal', 'Eleitoral'] }
        ] 
      } 
    },
    { id: 2, name: 'Certidão do Distribuidor (STF)', esfera: 'Federal', 
      govFormFields: { 
        pessoa: [{ name: 'nome_completo', label: 'Nome Completo'}, { name: 'cpf', label: 'CPF' }, { name: 'data_nascimento', label: 'Data de Nascimento', type: 'date' }, { name: 'nome_mae', label: 'Nome da Mãe' }, { name: 'nacionalidade', label: 'Nacionalidade' }, { name: 'rg', label: 'RG' }, { name: 'orgao_emissor', label: 'Órgão Emissor' }, { name: 'estado_civil', label: 'Estado Civil', type: 'select', options: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'] }], 
        empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] 
      } 
    },
    { id: 3, name: 'Certidão do STJ', esfera: 'Federal', 
      govFormFields: { 
        pessoa: [{ name: 'cpf', label: 'CPF' }, { name: 'nome', label: 'Nome' }, { name: 'data_nascimento', label: 'Data de Nascimento', type: 'date' }, { name: 'rg', label: 'RG' }, { name: 'orgao_expedidor', label: 'Órgão Expedidor' }, { name: 'estado_civil', label: 'Estado Civil', type: 'select', options: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'] }, { name: 'nome_completo_da_mae', label: 'Nome Completo da Mãe' }, { name: 'nacionalidade', label: 'Nacionalidade' }], 
        empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] 
      } 
    },
    { id: 4, name: 'Certidão Negativa de Ações Criminais (STM)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'nome_completo', label: 'Nome Completo'}, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
    { id: 5, name: 'Certidão de Antecedentes Criminais', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'nome_completo', label: 'Nome Completo'}, { name: 'cpf', label: 'CPF' }, { name: 'data_nascimento', label: 'Data de Nascimento', type: 'date' }, { name: 'nome_mae', label: 'Nome da Mãe' }], empresa: [] } },
    { id: 6, name: 'Certidão Negativa do Ministério Público Federal (MPF)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'cpf', label: 'CPF' }], empresa: [{ name: 'cnpj', label: 'CNPJ' }] } },
    { id: 7, name: 'Certidão Negativa de Débitos Trabalhistas (CNDT-TST)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'cpf', label: 'CPF' }], empresa: [{ name: 'cnpj', label: 'CNPJ' }] } },
    { 
      id: 8,
      name: 'Certidão de Cumprimento da Cota de PCDs (MT)',
      esfera: 'Federal',
      formFields: [
      {
        groupTitle: 'Dados da Empresa',
        fields: [
          { id: 'cnpj', label: 'CNPJ', type: 'text', required: true }
        ]
      }
    ]
    },

    // { id: 8, name: 'Certidão de Cumprimento da Cota de PCDs (MT)', esfera: 'Federal', 
    //   govFormFields: { 
    //     pessoa: [], 
    //     empresa: [{ name: 'cnpj', label: 'CNPJ' }] 
    //   } 
    // },
    { id: 9, name: 'Certidão de Débitos Trabalhistas (MT)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'cpf', label: 'CPF' }], empresa: [{ name: 'cnpj', label: 'CNPJ' }] } },
    {
      id: 11,
      name: 'Certidão Negativa do FGTS',
      slug: toSlug('Certidão Negativa do FGTS'),
      esfera: 'Federal',
      category: 'Federais e Estaduais',
      price: PRICE_FEDERAL_ESTADUAL,
      icon: icons.JUSTICE,
      imageSrc: productImagePaths[toSlug('Certidão Negativa do FGTS')],

      // 🚨 MUITO IMPORTANTE
      formFields: null,

      govFormFields: {
        needsState: true,
        pessoa: [], // FGTS não é para pessoa física
        empresa: [
          { name: 'cnpj', label: 'CNPJ', required: true },
          { name: 'cei', label: 'CEI (opcional)', required: false }
        ]
      },

      description: 'Certidão que comprova a regularidade do empregador junto ao FGTS.',
    },


    // { id: 11, name: 'Certidão Negativa do FGTS', esfera: 'Federal', govFormFields: { pessoa: [], empresa: [{ name: 'cnpj', label: 'CNPJ' }, { name: 'cei_opcional', label: 'CEI (Opcional)' }] } },
    { id: 12, name: 'Cadastro de Imóveis Rurais (CAFIR)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'nirf_cib', label: 'NIRF / CIB' }], empresa: [] } },
    { id: 13, name: 'Certidão de Tributos Federais de Imóvel Rural (ITR)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'nirf', label: 'NIRF' }], empresa: [] } },
    { id: 14, name: 'Certidão de Embargos (IBAMA)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'cpf', label: 'CPF' }], empresa: [{ name: 'cnpj', label: 'CNPJ' }] } },
    { id: 15, name: 'Certidão Negativa de Débitos (CND) do Ibama', esfera: 'Federal', govFormFields: { needsState: true, needsCity: true, pessoa: [{ name: 'nome_completo', label: 'Nome Completo' }, { name: 'cpf', label: 'CPF' }, { name: 'cep', label: 'CEP' }, { name: 'bairro', label: 'Bairro' }, { name: 'endereco', label: 'Endereço' }], empresa: [] } },
    { id: 16, name: 'Certidão Negativa de Débitos da União (CNTNIDA)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'cpf', label: 'CPF' }, { name: 'data_nascimento', label: 'Data de Nascimento', type: 'date' }], empresa: [{ name: 'cnpj', label: 'CNPJ' }] } },
    { id: 17, name: 'Certidão de Quitação Eleitoral (TSE)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'nome_eleitor', label: 'Nome do Eleitor' }, { name: 'titulo_ou_cpf', label: 'Nº do Título ou CPF' }, { name: 'data_nascimento', label: 'Data de Nascimento', type: 'date' }, { name: 'nome_mae', label: 'Nome da Mãe' }, { name: 'nome_pai', label: 'Nome do Pai' }], empresa: [] } },
    { id: 18, name: 'Certidão de Improbidade Administrativa (CNJ)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'nome_completo', label: 'Nome Completo'}, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
    { id: 19, name: 'Certidão do Tribunal de Contas (TCU)', esfera: 'Federal', govFormFields: { pessoa: [{ name: 'nome_completo', label: 'Nome Completo'}, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
    
    // Estaduais
    { id: 21, name: 'Certidão de Distribuição Estadual (TJ)', esfera: 'Estadual', govFormFields: { needsState: true, pessoa: [{ name: 'nome_completo', label: 'Nome Completo' }, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
    { id: 22, name: 'Certidão de Inquérito Criminal (MPE)', esfera: 'Estadual', govFormFields: { needsState: true, pessoa: [{ name: 'nome_completo', label: 'Nome Completo' }, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
    { id: 23, name: 'Certidão de Inquérito Civil (MPE)', esfera: 'Estadual', govFormFields: { needsState: true, pessoa: [{ name: 'nome_completo', label: 'Nome Completo' }, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
    { id: 24, name: 'Certidão de Ações Trabalhistas (CEAT-TRT)', esfera: 'Estadual', govFormFields: { needsState: true, pessoa: [{ name: 'nome_completo', label: 'Nome Completo' }, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
    { id: 25, name: 'Certidão Negativa de Débitos Ambientais', esfera: 'Estadual', govFormFields: { needsState: true, pessoa: [{ name: 'nome_completo', label: 'Nome Completo' }, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
    { id: 26, name: 'Certidão Negativa de Débitos Tributários Estaduais (CND)', esfera: 'Estadual', govFormFields: { needsState: true, pessoa: [{ name: 'nome_completo', label: 'Nome Completo' }, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
    { id: 27, name: 'Certidão de Tributos da Procuradoria Geral (PGE)', esfera: 'Estadual', govFormFields: { needsState: true, pessoa: [{ name: 'nome_completo', label: 'Nome Completo' }, { name: 'cpf', label: 'CPF' }], empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }] } },
  ].filter(cert => cert.id !== 10)
  .map(cert => ({ 
    ...cert, 
    price: PRICE_FEDERAL_ESTADUAL, 
    slug: toSlug(cert.name), 
    category: 'Federais e Estaduais', 
    icon: icons.JUSTICE,
    imageSrc: productImagePaths[toSlug(cert.name)] || '/certidoes/default-federal.png',
    description: `Emita a ${cert.name} para comprovar a regularidade.`,
    longDescription: `A ${cert.name} é um documento emitido por órgãos públicos...`,
    faq: `[{"q": "Qual a diferença entre a certidão da Justiça Federal e da Estadual?", "a": "A Justiça Federal trata de causas de interesse da União (ex: crimes federais, INSS), enquanto a Justiça Estadual cuida das demais causas cíveis e criminais."},{"q": "O que significa uma certidão 'negativa'?", "a": "Significa que, na data da emissão, não foi encontrada nenhuma pendência em nome da pessoa ou empresa consultada naquele órgão específico."}]`,
    formFields: []
  })),

  // --- Certidões Municipais ---
  ...[
    { id: 101, name: 'Certidão de Valor Venal' }, { id: 102, name: 'CND Municipal - Certidão Negativa de Débitos Tributários Municipais' }, { id: 103, name: 'Certidão Negativa de Débitos de Tributos Imobiliários' }, { id: 104, name: 'Certidão Ambiental Municipal' }, { id: 105, name: 'Certidão de Extrato de Débitos Municipais' }, { id: 106, name: 'Certidão de Dados Cadastrais do Imóvel' }
  ].map(cert => ({
    ...cert,
    price: PRICE_MUNICIPAL,
    slug: toSlug(cert.name),
    category: 'Municipais',
    icon: icons.JUSTICE,
    imageSrc: productImagePaths[toSlug('certidao-de-distribuicao-estadual-tj')] || '/certidoes/default-municipal.png',
    description: `Verifique a situação fiscal e cadastral perante o município.`,
    longDescription: `A ${cert.name} é um documento emitido pela prefeitura para atestar informações sobre pessoas, empresas ou imóveis no âmbito municipal...`,
    faq: `[{"q": "Para que serve esta certidão?", "a": "Geralmente é usada para comprovar que não há débitos de impostos como IPTU (no caso de imóveis) ou ISS (no caso de empresas), ou para obter informações cadastrais para processos legais."},{"q": "Onde obtenho a Inscrição do Imóvel?", "a": "A Inscrição do Imóvel, também conhecida como Inscrição Cadastral ou Inscrição Imobiliária, geralmente consta no carnê do IPTU."}]`,
    govFormFields: { 
        needsState: true,
        needsCity: true,
        pessoa: [{ name: 'nome_completo', label: 'Nome Completo' }, { name: 'cpf', label: 'CPF' }, { name: 'inscricao_imovel', label: 'Inscrição do Imóvel' }], 
        empresa: [{ name: 'razao_social', label: 'Razão Social' }, { name: 'cnpj', label: 'CNPJ' }, { name: 'inscricao_imovel', label: 'Inscrição do Imóvel' }] 
    },
    formFields: []
  })),
  

  // --- Pesquisa ---
  { id: 59, name: 'Pesquisa Completa de Veículo', slug: toSlug('Pesquisa Completa de Veículo'), price: 77.60, category: 'Pesquisa', icon: icons.SEARCH, imageSrc: productImagePaths[toSlug('Pesquisa Completa de Veículo')], description: 'Informações detalhadas sobre o veículo e seu proprietário.', faq: 'FAQ do serviço.', formFields: formTemplatePesquisaVeiculo },
  { id: 60, name: 'Pesquisa Leilão de Veículo', slug: toSlug('Pesquisa Leilão de Veículo'), price: 65.40, category: 'Pesquisa', icon: icons.SEARCH, imageSrc: productImagePaths[toSlug('Pesquisa Leilão de Veículo')], description: 'Verifique o histórico de leilões para um veículo específico.', faq: 'FAQ do serviço.', formFields: formTemplatePesquisaLeilao },
  { id: 61, name: 'Pesquisa Gravame de Veículo', slug: toSlug('Pesquisa Gravame de Veículo'), price: 52.40, category: 'Pesquisa', icon: icons.SEARCH, imageSrc: productImagePaths[toSlug('Pesquisa Gravame de Veículo')], description: 'Consulte se o veículo possui restrições financeiras (alienação fiduciária).', faq: 'FAQ do serviço.', formFields: formTemplatePesquisaGravame },
  { id: 62, name: 'Histórico de Roubo ou Furto de Veículo', slug: toSlug('Histórico de Roubo ou Furto de Veículo'), price: 34.60, category: 'Pesquisa', icon: icons.SEARCH, imageSrc: productImagePaths[toSlug('Histórico de Roubo ou Furto de Veículo')], description: 'Verifique se um veículo possui registro de roubo ou furto.', faq: 'FAQ do serviço.', formFields: formTemplatePesquisaRouboFurto },
  { id: 63, name: 'Pesquisa Processos Judiciais e Administrativos', slug: toSlug('Pesquisa Processos Judiciais e Administrativos'), price: 77.30, category: 'Pesquisa', icon: icons.SEARCH, imageSrc: productImagePaths[toSlug('Pesquisa Processos Judiciais e Administrativos')], description: 'Dados atuais e históricos de ações judiciais e processos administrativos.', faq: 'FAQ do serviço.', formFields: formTemplatePesquisaProcessos },
  { id: 68, name: 'Pesquisa Telefone e Endereço pelo CPF/CNPJ', slug: toSlug('Pesquisa Telefone e Endereço pelo CPF CNPJ'), price: 28.35, category: 'Pesquisa', icon: icons.SEARCH, imageSrc: productImagePaths[toSlug('Pesquisa Telefone e Endereço pelo CPF CNPJ')], description: 'Localize telefones e endereços através do CPF ou CNPJ.', faq: 'FAQ do serviço.', formFields: formTemplatePesquisaProcessos },
  { id: 69, name: 'Pesquisa Sintegra Estadual', slug: toSlug('Pesquisa Sintegra Estadual'), price: 28.35, category: 'Pesquisa', icon: icons.SEARCH, imageSrc: productImagePaths[toSlug('Pesquisa Sintegra Estadual')], description: 'Consulta ao Cadastro de Contribuintes de ICMS (SINTEGRA).', faq: 'FAQ do serviço.', formFields: formTemplatePesquisaSintegra },
];
