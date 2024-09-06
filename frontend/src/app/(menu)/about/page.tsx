import Header from "@/components/Header";
import React from "react";

function About() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">TENTANG KAMI</h2>
        <p className="text-lg text-gray-600">
          KRAP, perusahaan teknologi asal Indonesia yang membawa misi pemerataan
          teknologi digital bagi penyelenggara event dari berbagai skala.
        </p>
      </div>
      <div className="text-gray-800">
        <p className="mb-4">
          KRAP adalah platform yang memiliki Ticketing Management Service (TMS)
          teknologi unggul dalam mendukung seluruh penyelenggara event mulai
          dari distribusi & manajemen tiket, hingga penyediaan laporan analisa
          event di akhir acara.
        </p>
        <p className="mb-4">
          Beberapa teknologi yang kami sediakan siap untuk memfasilitasi
          penyelenggara event dalam setiap tahap persiapan yang meliputi:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">
            Distributor tiket terlengkap yang telah bekerja sama dengan LOKET
            untuk menjual tiket Anda.
          </li>
          <li className="mb-2">
            Sistem pembayaran yang beragam dan aman memberikan kemudahan kepada
            calon pembeli, untuk mendapatkan konversi yang lebih tinggi.
          </li>
          <li className="mb-2">
            Gate management yang paling aman dan nyaman untuk akses saat event
            berlangsung. Sehingga, event dengan jumlah penonton yang besar dapat
            ditangani dengan mudah.
          </li>
          <li className="mb-2">
            Sistem analisis data yang lengkap dan komprehensif setelah acara
            berlangsung untuk memudahkan penyelenggara event dalam menentukan
            strategi event selanjutnya.
          </li>
        </ul>
        <p>
          Sudah ada ratusan event yang bekerja sama dengan kami dan tersebar di
          seluruh Indonesia. Kini, saatnya perkenalkan event Anda pada dunia
          untuk membawa penonton yang lebih banyak lagi bersama kami!
        </p>
      </div>
    </div>
  );
}

export default About;
