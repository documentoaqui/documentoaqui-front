'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageLoader from '@/components/PageLoader/PageLoader';
import AuthModal from '@/components/AuthModal/AuthModal';
import styles from './Checkout.module.css';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { user, isAuthenticated, authLoading } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [authLoading, isAuthenticated]);

  // 🔥 quando preferenceId existir E modal estiver aberto → renderiza MP
  useEffect(() => {
    if (!showPaymentModal || !preferenceId) return;
    if (!window.MercadoPago) return;

    const mp = new window.MercadoPago(
      process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
      { locale: 'pt-BR' }
    );

    mp.checkout({
      preference: { id: preferenceId },
      render: {
        container: '#mp-checkout-container',
        label: 'Pagar agora',
      },
    });
  }, [showPaymentModal, preferenceId]);

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ cria pedido
      const pedidoRes = await api.post('/pedidos', {
        itens: cartItems,
      });

      const pedido = pedidoRes.data.pedido;
      clearCart();

      // 2️⃣ cria preferência
      const pagamentoRes = await api.post('/pagamentos/criar-checkout', {
        pedidoId: pedido.id,
      });

      setPreferenceId(pagamentoRes.data.preferenceId);

      // 3️⃣ abre modal
      setShowPaymentModal(true);

    } catch (err) {
      console.error(err);
      alert('Erro ao iniciar pagamento');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <PageLoader />;

  return (
    <>
      {showAuthModal && (
        <AuthModal onAuthSuccess={() => setShowAuthModal(false)} />
      )}

      <Header />

      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1>Finalizar compra</h1>

          <button onClick={handleFinalizarCompra} disabled={loading}>
            {loading ? 'Processando...' : 'Ir para pagamento'}
          </button>
        </div>
      </main>

      <Footer />

      {/* 🔥 MODAL DE PAGAMENTO */}
      {showPaymentModal && (
        <div className={styles.mpOverlay}>
          <div className={styles.mpModal}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setShowPaymentModal(false);
                router.push('/minha-conta/painel');
              }}
            >
              ✕
            </button>

            {/* 🔥 CONTAINER OBRIGATÓRIO */}
            <div id="mp-checkout-container" />
          </div>
        </div>
      )}
    </>
  );
}
