import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import "./normalize.css";
import Footer from "@/components/footer";
import UserProvider from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wow Libre",
  description: "Servidor de World Of Warcraft",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <UserProvider>
        <body className={inter.className}>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
