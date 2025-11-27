// Salve em: src/utils/imagePaths.js
// Este arquivo centraliza todos os caminhos das imagens dos produtos.
// A chave é o "slug" da certidão para fácil associação.
export const productImagePaths = {
// --- Cartório de Registro de Imóveis ---
// Caminho: /documentos/imoveis/
'certidao-de-imovel': '/documentos/imoveis/certidao-de-imovel.jpg',
'visualizacao-de-matricula': '/documentos/pesquisa/pesquisa.png',
'certidao-de-matricula-com-onus-e-acoes': '/documentos/imoveis/certidao-de-imovel.jpg',
'certidao-de-penhor-e-safra': '/documentos/imoveis/certidao-de-penhor-e-safra.png',
// Pesquisas de Imóveis (Usam a imagem genérica de imóvel por enquanto)
'pesquisa-previa-de-imoveis-por-cpf-cnpj': '/certidoes/pesquisa.png',
'pesquisa-qualificada-de-imoveis-por-cpf-cnpj': '/certidoes/pesquisa.png',
// --- Certidões Municipais ---
// Caminho: /documentos/municipal/
'certidao-de-valor-venal': '/documentos/municipal/certidao-de-valor-venal-f.png',
'cnd-municipal-certidao-negativa-de-debitos-tributarios-municipais': '/documentos/municipal/CERT-cnd-DEBITOS-TRIBUTOS-MUNICIPAIS.png',
'certidao-negativa-de-debitos-de-tributos-imobiliarios': '/documentos/municipal/CERT-DEB-TRIBUT-IMOBILIARIOS.png',
'certidao-ambiental-municipal': '/documentos/municipal/certidao-ambiental-municipal.png',
'certidao-de-extrato-de-debitos-municipais': '/documentos/municipal/certidao-de-extrato-de-debitos-municipais.png',
'certidao-de-dados-cadastrais-do-imovel': '/documentos/municipal/certidao-de-dados-cadastrais-do-imovel.png',
// --- Certidões Federais ---
// Caminho: /documentos/federais/
'certidao-de-debitos-trabalhistas-mt': '/documentos/federais/certidao-de-debitos-trabalhistas-mt.png',
'certidao-negativa-do-fgts': '/documentos/federais/certidao-negativa-do-fgts.png',
'certidao-de-improbidade-administrativa-cnj': '/documentos/federais/certidao-de-improbidade-administrativa-cnj.png',
'certidao-do-tribunal-de-contas-tcu': '/documentos/federais/certidao-do-tribunal-de-contas-tcu.png',
// Outras federais usam placeholder ou uma das existentes se não tiverem imagem própria
'certidao-de-distribuicao-da-justica-federal-trf': '/documentos/federais/cert-distribuicao-just-federal-trf.png',
'certidao-do-distribuidor-stf': '/documentos/federais/certidao-do-distribuidor-stf.png',
'certidao-do-stj': '/documentos/federais/certidao-do-stj.png',
'certidao-negativa-de-acoes-criminais-stm': '/documentos/federais/certidao-negativa-de-acoes-criminais-stm.png',
'certidao-de-antecedentes-criminais': '/documentos/federais/certidao-de-antecedentes-criminais.png',
'certidao-negativa-do-ministerio-publico-federal-mpf': '/documentos/federais/certidao-negativa-do-ministerio-publico-federal-mpf.png',
'certidao-negativa-de-debitos-trabalhistas-cndt-tst': '/documentos/federais/certidao-negativa-de-debitos-trabalhistas-cndt-tst.png',
'certidao-de-cumprimento-da-cota-de-pcds-mt': '/documentos/federais/certidao-de-cumprimento-da-cota-de-pcds-mt.png',
'certidao-de-infracoes-trabalhistas-mt': '/documentos/federais/certidao-de-debitos-trabalhistas-mt.png',
'cadastro-de-imoveis-rurais-cafir': '/documentos/federais/CADASTRO-DE-IMOVEIS-RURAIS-CAFIR.png',
'certidao-de-tributos-federais-de-imovel-rural-itr': '/documentos/federais/CERT-TRIBUTOS-FEDERAIS-E-DIVIDA-IMOV-RURAL-ITR.png',
'certidao-de-embargos-ibama': '/documentos/federais/IBAMA-CERT-DE-EMBARGO.png',
'certidao-negativa-de-debitos-cnd-do-ibama': '/documentos/federais/IBAMA-CERT-NEGATIVA-DE-DEBITO.png',
'certidao-negativa-de-debitos-da-uniao-cntnida': '/documentos/federais/CERT-DEBITOS-FEDERAIS-CNTNIDA.png',
'certidao-de-quitacao-eleitoral-tse': '/documentos/federais/CERT-QUITACAO-ELEITORAL-TSE.png',
'certidao-de-propriedade-de-aeronave': '/documentos/federais/certidao-de-improbidade-administrativa-cnj.png',
// --- Certidões Estaduais ---
// Caminho: /documentos/estaduais/
'certidao-de-distribuicao-estadual-tj': '/documentos/estaduais/certidao-de-distribuicao-estadual-tj.png',
'certidao-de-inquerito-criminal-mpe': '/documentos/estaduais/certidao-de-inquerito-criminal-mpe.png',
'certidao-de-inquerito-civil-mpe': '/documentos/estaduais/certidao-de-inquerito-civil-mpe.png',
'certidao-de-acoes-trabalhistas-ceat-trt': '/documentos/estaduais/certidao-de-acoes-trabalhistas-ceat-trt.png',
'certidao-negativa-de-debitos-ambientais': '/documentos/estaduais/certidao-negativa-de-debitos-ambientais.png',
'certidao-negativa-de-debitos-tributarios-estaduais-cnd': '/documentos/estaduais/certidao-negativa-de-debitos-tributarios-estaduais-cnd.png',
'certidao-de-tributos-da-procuradoria-geral-pge': '/documentos/estaduais/certidao-de-tributos-da-procuradoria-geral-pge.png',
'certidao-da-empresa-junta-comercial': '/documentos/estaduais/certidao-de-tributos-da-procuradoria-geral-pge.png', // Placeholder
// --- Tabelionato de Notas (Escrituras) ---
// Caminho: /documentos/escrituras/
// Mapeando "modelo escritura 2.png" para Divórcio
'certidao-de-escritura-de-divorcio': '/documentos/escrituras/CERTIDAO-DE-ESCRITURA-DE-DIVORCIO.jpg',
// Mapeando "modelo escritura.png" para as demais
'certidao-de-escritura-de-compra-e-venda': '/documentos/escrituras/tabelionatocompraevenda.jpg',
'certidao-de-procuracao': '/documentos/escrituras/certidao-de-procuracao.png',
'certidao-de-escritura-de-ata-notarial': '/documentos/escrituras/certidao-de-escritura-de-ata-notarial.png',
'certidao-de-escritura-de-pacto-antenupcial': '/documentos/escrituras/certidao-de-escritura-de-pacto-antenupcial.png',
'certidao-de-escritura-de-doacao': '/documentos/escrituras/certidao-de-escritura-de-doacao.png',
'certidao-de-escritura-de-hipoteca': '/documentos/escrituras/certidao-de-escritura-de-hipoteca.png',
'certidao-de-escritura-de-testamento': '/documentos/escrituras/certidao-de-escritura-de-testamento.png',
'certidao-de-escritura-de-uniao-estavel': '/documentos/escrituras/certidao-de-escritura-de-uniao-estavel.png',
'certidao-de-escritura-de-permuta': '/documentos/escrituras/certidao-de-escritura-de-permuta.png',
'certidao-de-escritura-de-inventario': '/documentos/escrituras/certidao-de-escritura-de-inventario.png',
'certidao-de-escritura-de-emancipacao': '/documentos/escrituras/certidao-de-escritura-de-emancipacao.png',
'pesquisa-escrituras-e-procuracoes-por-cpf-cnpj': '/documentos/pesquisa/pesquisa.png',
// --- Cartório de Registro Civil (Placeholders - se tiver imagens, adicione na pasta e atualize aqui) ---
'certidao-de-nascimento': '/certidoes/certidao-de-nascimento.png', // Mantenha o antigo se ainda não moveu
'certidao-de-casamento': '/certidoes/certidao-de-casamento.png',
'certidao-de-obito': '/certidoes/certidao-de-obito.png',
'certidao-de-interdicao': '/certidoes/certidao-de-interdicao.png',
// --- Cartório de Protesto (Placeholder) ---
'certidao-de-protesto': '/certidoes/certidao-de-protesto.png',
// --- Pesquisas Diversas (Placeholders) ---
'pesquisa-completa-de-veiculo': '/certidoes/pesquisa.png',
'pesquisa-leilao-de-veiculo': '/certidoes/pesquisa.png',
'pesquisa-gravame-de-veiculo': '/certidoes/pesquisa.png',
'historico-de-roubo-ou-furto-de-veiculo': '/certidoes/pesquisa.png',
'pesquisa-processos-judiciais-e-administrativos': '/certidoes/pesquisa.png',
'pesquisa-telefone-e-endereco-pelo-cpf-cnpj': '/certidoes/pesquisa.png',
'pesquisa-sintegra-estadual': '/certidoes/pesquisa.png',
// --- Assessoria Jurídica ---
'consulta-juridica': '/certidoes/consulta-juridica.png',
};