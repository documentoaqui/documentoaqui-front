'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageLoader from '@/components/PageLoader/PageLoader';
import styles from './MeusPedidos.module.css';

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

export default function MeusPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/minha-conta');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    let interval;

    const fetchPedidos = async () => {
      try {
        const { data } = await api.get('/pedidos/meus-pedidos');
        setPedidos(data);

        const emAndamento = data.some(p =>
          ['Aguardando Pagamento', 'Processando'].includes(p.status)
        );

        if (!emAndamento && interval) clearInterval(interval);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
    interval = setInterval(fetchPedidos, 10000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (authLoading || loading) return <PageLoader />;

  return (
    <>
      <Header />
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Meus Pedidos</h1>

          {pedidos.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Você ainda não realizou nenhum pedido.</p>
              <Link href="/certidoes" className={styles.ctaButton}>
                Solicitar Certidão
              </Link>
            </div>
          ) : (
            <div className={styles.pedidosList}>
              {pedidos.map(pedido => (
                <div key={pedido.id} className={styles.pedidoCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <span className={styles.protocolo}>Pedido #{pedido.protocolo}</span>
                      <span className={styles.data}>
                        Realizado em: {new Date(pedido.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <StatusBadge status={pedido.status} />
                  </div>

                  <div className={styles.cardBody}>
                    <strong>Valor Total:</strong>
                    <span>
                      R$ {parseFloat(pedido.valorTotal).toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className={styles.cardFooter}>
                    <Link
                      href={`/minha-conta/pedidos/${pedido.id}`}
                      className={styles.detailsButton}
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}