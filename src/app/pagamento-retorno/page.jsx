'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/services/api';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageLoader from '@/components/PageLoader/PageLoader';

export default function PagamentoRetornoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const externalReference = searchParams.get('external_reference');

  const [status, setStatus] = useState('verificando');
  const [pedidoId, setPedidoId] = useState(null);
  const [tentativas, setTentativas] = useState(0);

  useEffect(() => {
    if (!externalReference) return;

    const verificarStatus = async () => {
      try {
        const { data } = await api.get(`/pedidos/${externalReference}`);

        setPedidoId(data.id);

        if (data.status === 'Processando' || data.status === 'Concluído') {
          setStatus('aprovado');
          setTimeout(() => {
            router.push(`/minha-conta/painel`);
          }, 2000);
        }

        if (data.status === 'Cancelado') {
          setStatus('recusado');
        }

        if (data.status === 'Aguardando Pagamento') {
          setStatus('pendente');
        }

      } catch (err) {
        console.error(err);
        setStatus('erro');
      }
    };

    verificarStatus();

    if (tentativas < 12) {
      const interval = setInterval(() => {
        setTentativas(t => t + 1);
        verificarStatus();
      }, 5000);

      return () => clearInterval(interval);
    }

  }, [externalReference, tentativas, router]);

  const renderMensagem = () => {
    switch (status) {
      case 'verificando':
        return '🔄 Verificando seu pagamento...';
      case 'pendente':
        return '⏳ Pagamento pendente. Aguardando confirmação...';
      case 'aprovado':
        return '✅ Pagamento confirmado! Redirecionando...';
      case 'recusado':
        return '❌ Pagamento recusado. Você pode tentar novamente.';
      default:
        return '⚠️ Ocorreu um erro ao verificar o pagamento.';
    }
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {status === 'verificando' ? (
          <PageLoader />
        ) : (
          <div style={{ textAlign: 'center', maxWidth: 500 }}>
            <h2>{renderMensagem()}</h2>

            {(status === 'recusado' || status === 'erro') && pedidoId && (
              <button
                onClick={() => router.push(`/minha-conta/painel`)}
                style={{ marginTop: 20 }}
              >
                Ver Pedido
              </button>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
