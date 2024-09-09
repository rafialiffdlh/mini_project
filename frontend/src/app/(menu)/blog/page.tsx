import React from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const BlogPage = () => {
  return (
    <div>
      <div className="mx-auto max-w-full">
        <div className="bg-[#142954]">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-5">
            <Link href="/">
              <Image
                className="cursor-pointer"
                src="/images/logo kr.png"
                alt="Logo"
                width={64}
                height={64}
              />
            </Link>

            <div className="hidden md:flex gap-6 text-white text-sm">
              <Link href="/blog-home">Blog Home</Link>
              <Link href="/loket-edu">Loket Edu</Link>
              <Link href="/loket-news">Loket News</Link>
              <Link href="/loket-screen">Loket Screen</Link>
              <Link href="/loket-wiki">Loket Wiki</Link>
              <Link href="/loket-event">Loket Event</Link>
              <Link href="/loket-inspire">Loket Inspire</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 mx-auto max-w-screen-xl">
        <h1 className="text-2xl font-bold mb-6 border-b-2">Artikel Populer</h1>

        {/* Main Article */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <div className="flex flex-col lg:flex-row bg-gray-100 p-4 rounded-md shadow-md">
              <img
                src="https://assets.loket.com/2024/09/LOKET_NEYO_260824_BLOGBANNER.jpg"
                alt="Main article image"
                className="rounded-md w-full lg:w-1/3"
              />
              <div className="lg:ml-6 mt-4 lg:mt-0 flex flex-col justify-center">
                <h2 className="text-xl font-semibold">
                  Daftar Harga Tiket Konser Ne-Yo Jakarta 2024
                </h2>
                <p className="text-gray-600 mt-2">
                  Gelar konser di Indonesia, cek lengkap tanggal war & harga
                  tiket di sini!
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  04 Sep 2024 - Nandita
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards in 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          {/* Card 1 */}
          <div className="flex bg-gray-100 p-4 rounded-md shadow-md">
            <img
              src="https://assets.loket.com/2024/09/LOKET_NEYO_260824_BLOGBANNER.jpg"
              alt="Article image"
              className="rounded-md w-1/3" // Ukuran gambar lebih kecil (1/3 dari card)
            />
            <div className="ml-4 flex flex-col justify-center">
              <h2 className="text-xl font-semibold">
                Daftar Harga Tiket Konser Ne-Yo Jakarta 2024
              </h2>
              <p className="text-gray-600 mt-2">
                Gelar konser di Indonesia, cek lengkap tanggal war & harga tiket
                di sini!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                04 Sep 2024 - Nandita
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex bg-gray-100 p-4 rounded-md shadow-md">
            <img
              src="https://assets.loket.com/2024/09/LOKET_NEYO_260824_BLOGBANNER.jpg"
              alt="Article image"
              className="rounded-md w-1/3"
            />
            <div className="ml-4 flex flex-col justify-center">
              <h2 className="text-xl font-semibold">
                Daftar Harga Tiket Konser Ne-Yo Jakarta 2024
              </h2>
              <p className="text-gray-600 mt-2">
                Gelar konser di Indonesia, cek lengkap tanggal war & harga tiket
                di sini!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                04 Sep 2024 - Nandita
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex bg-gray-100 p-4 rounded-md shadow-md">
            <img
              src="https://assets.loket.com/2024/09/LOKET_NEYO_260824_BLOGBANNER.jpg"
              alt="Article image"
              className="rounded-md w-1/3"
            />
            <div className="ml-4 flex flex-col justify-center">
              <h2 className="text-xl font-semibold">
                Daftar Harga Tiket Konser Ne-Yo Jakarta 2024
              </h2>
              <p className="text-gray-600 mt-2">
                Gelar konser di Indonesia, cek lengkap tanggal war & harga tiket
                di sini!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                04 Sep 2024 - Nandita
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex bg-gray-100 p-4 rounded-md shadow-md">
            <img
              src="https://assets.loket.com/2024/09/LOKET_NEYO_260824_BLOGBANNER.jpg"
              alt="Article image"
              className="rounded-md w-1/3"
            />
            <div className="ml-4 flex flex-col justify-center">
              <h2 className="text-xl font-semibold">
                Daftar Harga Tiket Konser Ne-Yo Jakarta 2024
              </h2>
              <p className="text-gray-600 mt-2">
                Gelar konser di Indonesia, cek lengkap tanggal war & harga tiket
                di sini!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                04 Sep 2024 - Nandita
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
