'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import api from '@/services/api';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageLoader from '@/components/PageLoader/PageLoader';
import styles from './DetalhesPedido.module.css';
import { DownloadIcon, PackageIcon } from './Icons';

const StatusBadge = ({ status }) => {
  const statusClass = {
    'Aguardando Pagamento': styles.statusPendente,
    'Processando': styles.statusProcessando,
    'Busca em Andamento': styles.statusProcessando,
    'Concluído': styles.statusConcluido,
    'Cancelado': styles.statusCancelado,
  }[status] || styles.statusDefault;

  return <span className={`${styles.statusBadge} ${statusClass}`}>{status}</span>;
};

const formatLabel = (key) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const DetalhesDoFormulario = ({ item }) => {
  const { dadosFormulario: formData, nomeProduto, slugProduto } = item;
  if (!formData) return null;

  const sectionKeys = {
    localizacao: ['estado_cartorio', 'cidade_cartorio', 'cartorio', 'cartorio_manual', 'estado_matricula', 'cidade_matricula'],
    servicos: ['sedex', 'apostilamento', 'apostilamento_digital', 'apostilamento_fisico', 'aviso_recebimento', 'inteiro_teor', 'tipo_inteiro_teor', 'localizar_pra_mim'],
    entrega: ['formato', 'cep', 'endereco', 'numero', 'complemento', 'bairro', 'cidade_entrega', 'estado_entrega'],
  };

  const allKnownKeys = new Set([].concat(...Object.values(sectionKeys)));

  const detalhesCertidao = Object.entries(formData).filter(([key, value]) => {
    const internalKeys = new Set(['tipo_pesquisa', 'tipo_pessoa', 'aceite_lgpd', 'ciente', 'tipo_certidao']);
    if (!value || allKnownKeys.has(key) || internalKeys.has(key)) return false;
    if (key === 'tempo_pesquisa' && !slugProduto.includes('protesto')) return false;
    return true;
  });

  const renderSection = (title, keys) => {
    const content = keys.map(key => {
      const value = formData[key];
      if (!value && typeof value !== 'boolean') return null;
      return (
        <div key={key} className={styles.formDataItem}>
          <dt>{formatLabel(key)}</dt>
          <dd>{typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : String(value)}</dd>
        </div>
      );
    }).filter(Boolean);

    if (!content.length) return null;

    return (
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <dl className={styles.formDataList}>{content}</dl>
      </section>
    );
  };

  return (
    <>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Detalhes da Certidão</h3>
        <dl className={styles.formDataList}>
          <div className={styles.formDataItem}>
            <dt>Tipo de Certidão</dt>
            <dd>{nomeProduto}</dd>
          </div>
          {detalhesCertidao.map(([key, value]) => (
            <div key={key} className={styles.formDataItem}>
              <dt>{formatLabel(key)}</dt>
              <dd>{String(value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {renderSection('Localização do Cartório', sectionKeys.localizacao)}
      {renderSection('Opções e Entrega', sectionKeys.entrega)}
      {renderSection('Serviços Adicionais', sectionKeys.servicos)}
    </>
  );
};

export default function DetalhesPedidoPage() {
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/minha-conta');
      return;
    }

    if (isAuthenticated && params.id) {
      api.get(`/pedidos/${params.id}`)
        .then(({ data }) => setPedido(data))
        .catch(() => setError('Pedido não encontrado ou você não tem permissão.'))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, authLoading, params.id, router]);

  useEffect(() => {
    if (!pedido) return;

    const monitorar = ['Aguardando Pagamento', 'Processando'];
    if (!monitorar.includes(pedido.status)) return;

    const interval = setInterval(async () => {
      try {
        const { data } = await api.get(`/pedidos/${params.id}`);
        setPedido(data);
        if (!monitorar.includes(data.status)) clearInterval(interval);
      } catch {}
    }, 5000);

    return () => clearInterval(interval);
  }, [pedido, params.id]);

  const baixarArquivo = async (arquivo) => {
    try {
      const response = await api.get(
        `/pedidos/${pedido.id}/arquivos/${arquivo.id}/download`,
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], {
        type: arquivo.mimeType || 'application/octet-stream'
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = arquivo.nomeOriginal;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Erro ao baixar arquivo:', err);
      alert('Erro ao baixar o arquivo.');
    }
  };

  if (authLoading || loading) return <PageLoader />;

  if (error || !pedido) {
    return (
      <>
        <Header />
        <main className={styles.pageWrapper}>
          <div className={styles.container}><p>{error}</p></div>
        </main>
        <Footer />
      </>
    );
  }

  const arquivosAdmin = pedido.arquivos?.filter(a => a.tipo === 'certidao') || [];
  const arquivosCliente = pedido.arquivos?.filter(a => a.tipo === 'comprovante') || [];

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/minha-conta/painel">Meus Pedidos</Link> / <span>Detalhes do Pedido</span>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h1 className={styles.protocolo}>Pedido #{pedido.protocolo}</h1>
                <p className={styles.data}>
                  Realizado em: {new Date(pedido.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <StatusBadge status={pedido.status} />
            </div>

            <div className={styles.cardBody}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Documentos Recebidos</h2>
                <div className={styles.downloadList}>
                  {arquivosAdmin.map(a => (
                    <button
                      key={a.id}
                      type="button"
                      className={styles.downloadButton}
                      onClick={() => baixarArquivo(a)}
                    >
                      <DownloadIcon />
                      Baixar: {a.nomeOriginal}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
