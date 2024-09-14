import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faTwitter,
  faLinkedin,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="">
      <div className="bg-[#112041] text-white mx-auto max-w-full">
        <div className="container mx-auto py-10 px-4 md:px-6 lg:px-12 max-w-screen-xl ">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="md:text-base lg:text-lg font-semibold mb-4">
                Tentang Loket
              </h3>
              <ul className="text-sm md:text-sm lg:text-sm space-y-2">
                <li>
                  <Link href="#">Masuk</Link>
                </li>
                <li>
                  <Link href="">Biaya</Link>
                </li>
                <li>
                  <Link href="">Lihat Event</Link>
                </li>
                <li>
                  <Link href="">FAQ</Link>
                </li>
                <li>
                  <Link href="">Syarat dan Ketentuan</Link>
                </li>
                <li>
                  <Link href="">Laporan Kesalahan</Link>
                </li>
                <li>
                  <Link href="">Sistem</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-4">
                Rayakan Eventmu
              </h3>
              <div className="text-sm">
                <ul className="text-md md:text-sm lg:text-sm space-y-2">
                  <li>
                    <Link href="">Cara Mempersiapkan Event</Link>
                  </li>
                  <li>
                    <Link href="">Cara membuat Event Lomba</Link>
                  </li>
                  <li>
                    <Link href="">Cara Mempublikasikan Event</Link>
                  </li>
                  <li>
                    <Link href="">Cara Membuat Event Musik</Link>
                  </li>
                  <li>
                    <Link href="">Cara Mengelola Event</Link>
                  </li>
                  <li>
                    <Link href="">Cara Membuat Konsep Acara yang Menarik</Link>
                  </li>
                  <li>
                    <Link href="">Cara Membuat Event di Co-Working Space</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-4">
                Lokasi Event
              </h3>
              <ul className="text-xs md:text-sm lg:text-sm space-y-2">
                <li>
                  <Link href="">Jakarta</Link>
                </li>
                <li>
                  <Link href="">Bandung</Link>
                </li>
                <li>
                  <Link href="">Yogyakarta</Link>
                </li>
                <li>
                  <Link href="">Surabaya</Link>
                </li>
                <li>
                  <Link href="">Solo</Link>
                </li>
                <li>
                  <Link href="">Medan</Link>
                </li>
                <li>
                  <Link href="">Bali</Link>
                </li>
                <li>
                  <Link href="">Semua Kota</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-4">
                Inspirasi Event
              </h3>
              <ul className="text-xs md:text-sm lg:text-sm space-y-2">
                <li>
                  <Link href="">Festival</Link>
                </li>
                <li>
                  <Link href="">Konser</Link>
                </li>
                <li>
                  <Link href="">Olahraga</Link>
                </li>
                <li>
                  <Link href="">Workshop & Seminar</Link>
                </li>
                <li>
                  <Link href="">Teater & Drama</Link>
                </li>
                <li>
                  <Link href="">Atraksi</Link>
                </li>
                <li>
                  <Link href="">Semua Kategori</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Icon Sosial Media */}
      <div className="bg-[#112041] text-white py-8 px-4 md:px-6 lg:px-12 mx-auto max-w-full">
        <div className="container mx-auto flex justify-center gap-6 max-w-screen-xl">
          <Link href="">
            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
          </Link>
          <Link href="">
            <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" />
          </Link>
          <Link href="">
            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
          </Link>
          <Link href="">
            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
          </Link>
          <Link href="">
            <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
          </Link>
          <Link href="">
            <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="bg-[#1d3976] text-white text-sm py-10 px-4 md:px-6 lg:px-12 mx-auto max-w-full">
        <div className="container mx-auto flex flex-col items-center text-center max-w-screen-xl">
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
            <Link href="/contact" className="text-xs md:text-sm lg:text-base">
              Tentang Kami
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Blog
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Kebijakan Privasi
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Kebijakan Cookie
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Panduan
            </Link>
            <Link href="" className="text-xs md:text-sm lg:text-base">
              Hubungan Kami
            </Link>
          </div>
          <div className="pt-10">
            <p className="text-xs md:text-sm lg:text-base">
              © 2024 Loket (PT Global Loket Sejahtera)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
