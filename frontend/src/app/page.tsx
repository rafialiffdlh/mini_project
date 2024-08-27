import Image from "next/image";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Card from "@/components/Card";

const Home = () => {
  return (
    <main className="">
      <Header></Header>
      <Banner></Banner>
      <Card></Card>
    </main>
  );
};

export default Home;
