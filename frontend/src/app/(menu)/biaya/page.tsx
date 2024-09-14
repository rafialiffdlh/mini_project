import React, { FC } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Biaya: FC = () => {
  return (
    <div>
      <Header />
      <div className="py-4">
        <div className="px-4 lg:px-16 py-8 max-w-screen-xl mx-auto">
          {/* Biaya Transaksi Tiket Section */}
          <section className="text-center mb-12 ">
            <h1 className="text-3xl font-bold mb-4">
              Sukseskan Event Kamu Bersama LOKET
            </h1>
            <p className="text-lg">
              Beragam paket berlangganan untuk event creator
            </p>
          </section>

          {/* Biaya Transaksi Tiket */}
          <section className="mb-12 mx-auto max-w-screen-xl">
            <h2 className="text-2xl font-bold mb-4">Biaya Transaksi Tiket</h2>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="mb-2">
                GoPay, GoPay Later, ShopeePay, Shopee Paylater, LinkAja, dan
                Kartu Kredit{" "}
                <span className="font-bold">3.5% x Total Penjualan</span>
              </p>
              <p>
                VA BCA, Indomaret, Bank Transfer, dan lainnya{" "}
                <span className="font-bold">3.5% x Total Penjualan</span>
              </p>
            </div>
          </section>

          {/* Layanan Marketing Placement Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Layanan Marketing Placement LOKETMart
            </h2>
            <p className="mb-4">
              Event kamu bisa dipromosikan dengan berbagai platform di LOKET,
              lho. Kamu bisa memilih support atau placement apa saja yang kamu
              butuhkan.
            </p>

            {/* Placement Options */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              <div className="p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">LOKETMart Socmed</h3>
                <p>Untuk Platform Media Sosial LOKET</p>
              </div>
              <div className="p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">LOKETMart Website</h3>
                <p>Untuk Platform Website LOKET</p>
              </div>
              <div className="p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">LOKETMart All In</h3>
                <p>LOKETMart Socmed, Website, atau Keduanya</p>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-blue-900 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">LOKETMart Socmed</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white text-black p-4 rounded-lg">
                  <h4 className="font-bold mb-2">IG FEED</h4>
                  <p>1 Post</p>
                  <p className="font-bold">Rp2.450.000</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg">
                  <h4 className="font-bold mb-2">IG STORY</h4>
                  <p>1 Post</p>
                  <p className="font-bold">Rp400.000</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg">
                  <h4 className="font-bold mb-2">IG STORY HIGHLIGHT</h4>
                  <p>1 Post</p>
                  <p className="font-bold">Rp600.000</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg">
                  <h4 className="font-bold mb-2">TWITTER POST</h4>
                  <p>1 Tweet</p>
                  <p className="font-bold">Rp980.000</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg">
                  <h4 className="font-bold mb-2">YOUTUBE SHORT</h4>
                  <p>1 Post</p>
                  <p className="font-bold">Rp980.000</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg">
                  <h4 className="font-bold mb-2">FACEBOOK POST</h4>
                  <p>1 Post</p>
                  <p className="font-bold">Rp980.000</p>
                </div>
                <div className="bg-white text-black p-4 rounded-lg">
                  <h4 className="font-bold mb-2">TIKTOK POST</h4>
                  <p>1 Post</p>
                  <p className="font-bold">Rp980.000</p>
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg">
                  Pesan LOKETMart Socmed
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Biaya;
