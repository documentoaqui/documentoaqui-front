'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PagamentoRetornoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pedidoId = searchParams.get('external_reference');

    if (pedidoId) {
      router.replace(`/minha-conta/pedidos/${pedidoId}`);
    } else {
      router.replace('/minha-conta/painel');
    }
  }, []);

  return null;
}
