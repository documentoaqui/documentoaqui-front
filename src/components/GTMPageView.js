'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function GTMPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.dataLayer) return;

    window.dataLayer.push({
      event: 'page_view',
      page_path: pathname + (searchParams?.toString() ? `?${searchParams}` : ''),
    });
  }, [pathname, searchParams]);

  return null;
}
