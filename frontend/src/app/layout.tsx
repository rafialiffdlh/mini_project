import { ReactNode } from "react";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "minpro",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider refetchInterval={59 * 60}>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
