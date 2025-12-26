'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import api from '@/services/api';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import PageLoader from '@/components/PageLoader/PageLoader';
import AuthModal from '@/components/AuthModal/AuthModal';
import styles from './Checkout.module.css';
import { CreditCardIcon, PixIcon, BoletoIcon } from './SecurityIcons';

const formatLabel = (key) => {
  if (['cpf', 'cnpj', 'rg'].includes(key.toLowerCase())) return key.toUpperCase();
  return key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const DetailItem = ({ label, value }) => {
  if (value === null || value === undefined || value === '' || value === false) return null;
  const displayValue = typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : String(value);
  return (
    <div className={styles.summaryDetailItem}>
      <span className={styles.detailLabel}>{label}:</span>
      <span className={styles.detailValue}>{displayValue}</span>
    </div>
  );
};

const OrderSummaryCard = ({ item, onRemove }) => {
  if (!item || !item.formData) return null;
  const { formData, attachedFiles } = item;

  const excludeKeys = new Set([
    'aceite_lgpd', 'ciente', 'tipo_pesquisa', 'tipo_pessoa', 'tipo_certidao',
    'requerente_nome', 'requerente_cpf', 'requerente_email',
    'requerente_telefone', 'requerente_rg',
    'estado_cartorio', 'cidade_cartorio',
    'cartorio_protesto', 'todos_cartorios_protesto'
  ]);

  const allDetails = Object.entries(formData)
    .filter(([key, value]) => {
      if (!value || value === '' || value === false) return false;
      if (key === 'tempo_pesquisa' && item.slug !== 'certidao-de-protesto') return false;
      return !excludeKeys.has(key);
    });

  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryCardHeader}>
        <h4 className={styles.summaryCardTitle}>{item.name}</h4>
        <button
          onClick={() => onRemove(item.cartId)}
          className={styles.deleteButton}
          title="Remover item"
        >
          🗑️
        </button>
      </div>

      <div className={styles.summaryCardBody}>
        <DetailItem label="Estado" value={formData.estado_cartorio} />
        <DetailItem label="Cidade" value={formData.cidade_cartorio} />
        <DetailItem
          label="Cartório"
          value={
            formData.todos_cartorios_protesto
              ? `Todos os cartórios de ${formData.cidade_cartorio}`
              : (formData.cartorio_protesto || formData.cartorio)
          }
        />

        {allDetails.map(([key, value]) => (
          <DetailItem key={key} label={formatLabel(key)} value={value} />
        ))}

        {attachedFiles?.length > 0 && (
          <div className={styles.summaryAttachments}>
            <strong>Anexos:</strong>
            <ul>
              {attachedFiles.map(file => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.summaryActions}>
        <span className={styles.summaryPrice}>
          R$ {item.price.toFixed(2).replace('.', ',')}
        </span>
      </div>
    </div>
  );
};

export default function CheckoutPage() {
  const { cartItems, itemCount, removeFromCart, clearCart } = useCart();
  const { user, isAuthenticated, authLoading } = useAuth();

  const [loading, setLoading] = useState(false);
  const [activePayment, setActivePayment] = useState('card');
  const [isClient, setIsClient] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [clientData, setClientData] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    email: '',
    telefone: ''
  });

  useEffect(() => {
    setIsClient(true);
    if (!authLoading && !isAuthenticated) {
      setShowAuthModal(true);
    } else if (user) {
      setClientData(prev => ({
        ...prev,
        nome: user.nome || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, authLoading, user]);

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
      // ✅ CORREÇÃO CRÍTICA: FormData
      const formData = new FormData();
      formData.append('itens', JSON.stringify(cartItems));
      formData.append('dadosCliente', JSON.stringify(clientData));

      const pedidoResponse = await api.post('/pedidos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const novoPedido = pedidoResponse.data.pedido;

      clearCart();

      const checkoutResponse = await api.post('/pagamentos/criar-checkout', {
        pedidoId: novoPedido.id
      });

      // Por enquanto apenas redireciona (modal vem depois)
      window.location.href = checkoutResponse.data.checkoutUrl;

    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        'Erro ao finalizar o pedido. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isClient || authLoading) {
    return <PageLoader />;
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
            <p>
              Seu carrinho está vazio.{' '}
              <Link href="/certidoes">Voltar para a loja</Link>
            </p>
          ) : (
            <form onSubmit={handleFinalizarCompra} className={styles.checkoutGrid}>
              <div className={styles.mainContent}>
                <div className={styles.detailsBox}>
                  <h2>Dados de Cobrança</h2>

                  <input
                    name="nome"
                    placeholder="Nome"
                    value={clientData.nome}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="sobrenome"
                    placeholder="Sobrenome"
                    value={clientData.sobrenome}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="cpf"
                    placeholder="CPF"
                    value={clientData.cpf}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="email"
                    placeholder="E-mail"
                    value={clientData.email}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="telefone"
                    placeholder="Telefone"
                    value={clientData.telefone}
                    onChange={handleChange}
                    required
                  />
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

                  <p>Você será redirecionado para o pagamento.</p>
                </div>
              </div>

              <aside className={styles.orderSummary}>
                {cartItems.map(item => (
                  <OrderSummaryCard
                    key={item.cartId}
                    item={item}
                    onRemove={removeFromCart}
                  />
                ))}

                <div className={styles.summaryTotalBox}>
                  <strong>Total: R$ {subtotal.toFixed(2).replace('.', ',')}</strong>
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
