import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

type Props = { children: React.ReactNode };

export default function template({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
