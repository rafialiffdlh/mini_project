import Image from "next/image";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Banner2 from "@/components/Banner2";
const Home = () => {
  return (
    <main className="">
      <Header></Header>
      <Banner></Banner>
      <Card></Card>
      <Banner2></Banner2>
    </main>
  );
};

export default Home;
