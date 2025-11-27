import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Documento Aqui",
  description: "Sua facilitadora na solicitação de documentos e certidões em todo o Brasil.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>

        <WhatsAppButton />
      </body>
    </html>
  );
}