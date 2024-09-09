import { FC } from "react";
import {
  FaMapMarkedAlt,
  FaRegClock,
  FaAngleRight,
  FaMapMarkerAlt,
  FaCalendarWeek,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact: FC = () => {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-screen-xl">
        <h1 className="text-center py-7 text-4xl font-bold">Contact</h1>
        <h2 className="text-center text-lg mt-4">
          Jika ada masalah silahkan hubungi contact di bawah ini, kami akan
          segera membantu permasalahan anda
        </h2>
        <div className="py-28 mt-auto max-w-screen-xl m-auto">
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="col-span-1 flex flex-row space-x-3">
              <FaRegAddressCard className="w-12 h-12 p-2" />
              <div className="space-y-2">
                <p className="text-gray-500">ADDRESS</p>
                <a
                  href="https://maps.app.goo.gl/xnHeVK6jdLcb7G5w8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 font-medium"
                >
                  JL. INDONESIA MERDEKA
                </a>
              </div>
            </div>
            <div className="col-span-1 flex flex-row space-x-3">
              <FaPhoneAlt className="w-12 h-12 p-1" />
              <div className="space-y-2">
                <p className="text-gray-500">PHONES</p>
                <p className="text-gray-600 font-medium">08123456789</p>
              </div>
            </div>
            <div className="col-span-1 flex flex-row space-x-3">
              <MdOutlineEmail className="w-12 h-12 p-1" />
              <div className="space-y-2">
                <p className="text-gray-500">EMAIL</p>
                <a
                  href="mailto:rafialif99@gmail.com"
                  className="text-gray-600 font-medium"
                >
                  rafialif99@gmail.com
                </a>
              </div>
            </div>
            <div className="col-span-1 flex flex-row space-x-3">
              <FaFacebook className="w-12 h-12 p-1" />
              <div className="space-y-2">
                <p className="text-gray-500">Facebook</p>
                <a
                  href="https://www.facebook.com/krisraff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 font-medium"
                >
                  krisraff
                </a>
              </div>
            </div>
            <div className="col-span-1 flex flex-row space-x-3">
              <FaInstagram className="w-12 h-12 p-1" />
              <div className="space-y-2">
                <p className="text-gray-500">Instagram</p>
                <a
                  href="https://www.instagram.com/rapiialip__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 font-medium"
                >
                  @rapiialip__
                </a>
              </div>
            </div>
            <div className="col-span-1 flex flex-row space-x-3">
              <FaWhatsapp className="w-12 h-12 p-1" />
              <div className="space-y-2">
                <p className="text-gray-500">WhatsApp</p>
                <a
                  href="https://wa.me/6287880258379"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 font-medium"
                >
                  087880258379
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <a
              href="mailto:r@gmail.com"
              className="bg-[#0070C9] text-white font-semibold py-2 px-4 rounded hover:bg-[#005A9E] transition duration-300"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
