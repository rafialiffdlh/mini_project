import Footer from "@/components/Footer";
import React from "react";

type Props = { children: React.ReactNode };

export default function template({ children }: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
