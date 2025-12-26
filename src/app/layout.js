import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Documento Aqui",
  description:
    "Sua facilitadora na solicitação de documentos e certidões em todo o Brasil.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-bootstrap"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KDZZB5KZ');
            `,
          }}
        />

        {/* 🔥 MERCADO PAGO SDK (OBRIGATÓRIO PARA O MODAL) */}
        <Script
          id="mercadopago-sdk"
          src="https://sdk.mercadopago.com/js/v2"
          strategy="afterInteractive"
        />
      </head>

      <body className={montserrat.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KDZZB5KZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>

        <WhatsAppButton />
      </body>
    </html>
  );
}
