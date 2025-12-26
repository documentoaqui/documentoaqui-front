'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/services/api';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageLoader from '@/components/PageLoader/PageLoader';
import AuthModal from '@/components/AuthModal/AuthModal';
import styles from './Checkout.module.css';
import { CreditCardIcon, PixIcon, BoletoIcon } from './SecurityIcons';

export default function CheckoutPage() {
  const { cartItems, itemCount, removeFromCart, clearCart } = useCart();
  const { user, isAuthenticated, authLoading } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [activePayment, setActivePayment] = useState('pix');
  const [isClient, setIsClient] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 🔥 NOVOS ESTADOS
  const [pedidoId, setPedidoId] = useState(null);
  const [pagamentoEmAndamento, setPagamentoEmAndamento] = useState(false);

  const [clientData, setClientData] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    email: '',
    telefone: '',
  });

  useEffect(() => {
    setIsClient(true);

    if (!authLoading && !isAuthenticated) {
      setShowAuthModal(true);
    }

    if (user) {
      setClientData(prev => ({
        ...prev,
        nome: user.nome || '',
        email: user.email || '',
      }));
    }
  }, [authLoading, isAuthenticated, user]);

  // 🔁 POLLING DO PEDIDO
  useEffect(() => {
    if (!pagamentoEmAndamento || !pedidoId) return;

    const interval = setInterval(async () => {
      try {
        const { data } = await api.get(`/pedidos/${pedidoId}`);

        if (data.status === 'Processando') {
          clearInterval(interval);
          router.push('/minha-conta/painel');
        }

        if (data.status === 'Cancelado') {
          clearInterval(interval);
          alert('Pagamento recusado.');
          setPagamentoEmAndamento(false);
        }
      } catch (err) {
        console.error('Erro ao verificar pedido:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [pagamentoEmAndamento, pedidoId, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ CRIA PEDIDO
      const pedidoRes = await api.post('/pedidos', {
        itens: cartItems,
        dadosCliente: clientData,
      });

      const pedido = pedidoRes.data.pedido;
      setPedidoId(pedido.id);

      clearCart();

      // 2️⃣ CRIA CHECKOUT
      const checkoutRes = await api.post('/pagamentos/criar-checkout', {
        pedidoId: pedido.id,
      });

      // 3️⃣ ABRE MERCADO PAGO EM NOVA ABA
      window.open(checkoutRes.data.checkoutUrl, '_blank');

      // 4️⃣ MUDA ESTADO DA TELA
      setPagamentoEmAndamento(true);
      setLoading(false);

    } catch (err) {
      console.error(err);
      alert('Erro ao iniciar pagamento.');
      setLoading(false);
    }
  };

  if (!isClient || authLoading) {
    return <PageLoader />;
  }

  // 🟡 TELA DE PAGAMENTO EM PROCESSAMENTO
  if (pagamentoEmAndamento) {
    return (
      <>
        <Header />
        <main className={styles.pageWrapper}>
          <div className={styles.container} style={{ textAlign: 'center', padding: '60px' }}>
            <h1>⏳ Pagamento em processamento</h1>
            <p>
              Finalize o pagamento na aba do Mercado Pago.
              <br />
              Assim que confirmado, seu pedido será atualizado automaticamente.
            </p>

            <p style={{ marginTop: '20px' }}>
              Você pode acompanhar seus pedidos aqui:
            </p>

            <Link href="/minha-conta/painel" className={styles.checkoutButton}>
              Ir para Meus Pedidos
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <>
      {showAuthModal && <AuthModal onAuthSuccess={() => setShowAuthModal(false)} />}
      <Header />

      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Finalizar Compra</h1>

          {itemCount === 0 ? (
            <p>Seu carrinho está vazio. <Link href="/certidoes">Voltar para a loja</Link></p>
          ) : (
            <form onSubmit={handleFinalizarCompra} className={styles.checkoutGrid}>
              <div className={styles.mainContent}>
                <div className={styles.detailsBox}>
                  <h2>Dados de Cobrança</h2>

                  <input name="nome" placeholder="Nome" value={clientData.nome} onChange={handleChange} required />
                  <input name="sobrenome" placeholder="Sobrenome" value={clientData.sobrenome} onChange={handleChange} required />
                  <input name="cpf" placeholder="CPF" value={clientData.cpf} onChange={handleChange} required />
                  <input name="email" placeholder="E-mail" value={clientData.email} onChange={handleChange} required />
                  <input name="telefone" placeholder="Telefone" value={clientData.telefone} onChange={handleChange} required />
                </div>

                <div className={styles.detailsBox}>
                  <h2>Pagamento</h2>

                  <div className={styles.paymentTabs}>
                    <button type="button" onClick={() => setActivePayment('card')}>
                      <CreditCardIcon /> Cartão
                    </button>
                    <button type="button" onClick={() => setActivePayment('boleto')}>
                      <BoletoIcon /> Boleto
                    </button>
                    <button type="button" onClick={() => setActivePayment('pix')}>
                      <PixIcon /> PIX
                    </button>
                  </div>
                </div>
              </div>

              <aside className={styles.orderSummary}>
                <div className={styles.summaryTotalBox}>
                  <div className={styles.summaryRow}>
                    <span>Total</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>

                  <button type="submit" disabled={loading}>
                    {loading ? 'Processando...' : 'Ir para Pagamento'}
                  </button>
                </div>
              </aside>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
