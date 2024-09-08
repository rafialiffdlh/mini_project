"use client";
import React, { useState, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileBarComponent from "./header/ProfileBar.component";
import SignBarComponent from "./header/SignBar.component";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";

const Header: React.FC = () => {
  const session = useSession();
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [isSideMenuOpen, setMenu] = useState(false);
  const navlinks = [
    {
      label: "Tentang Loket",
      link: "/about",
    },
    {
      label: "Mulai jadi Event Creator",
      link: "#",
    },
    {
      label: "Biaya",
      link: "#",
    },
    {
      label: "Blog",
      link: "#",
    },
    {
      label: "Hubungi Kami",
      link: "/contact",
    },
    {
      label: "Loket Screen",
      link: "#",
    },
  ];

  return (
    <div className="mx-auto max-w-full">
      <div className="hidden bg-[#003899] text-white md:flex justify-end px-[30px] py-2 gap-5 text-[12px]">
        <div className=" mx-auto space-x-4">
          <a href="/about" className="ml-2">
            Tentang Loket
          </a>
          <a href="#" className="ml-2">
            Mulai Jadi Event Creator
          </a>
          <a href="#" className="ml-2">
            Biaya
          </a>
          <a href="#" className="ml-2">
            Blog
          </a>
          <a href="#" className="ml-2">
            Hubungi Kami
          </a>
          <a href="#" className="ml-2">
            Loket Screen
          </a>
        </div>
      </div>

      <div className="bg-[#142954] py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 pt-4 pb-2 md:pt-0 md:pb-0">
          <Link href="/">
            <Image
              className="md:w-16 w-10 cursor-pointer"
              src="/images/logo kr.png"
              alt="Logo"
              width={64}
              height={64}
            />
          </Link>

          <div className="hidden md:flex gap-4 items-center">
            <div className="relative  flex items-center">
              <input
                className="xl:w-[500px] pl-5 lg:w-[400px]  md:w-[200px] px-2 py-2 text-sm text-black outline-none rounded-md shadow-md"
                placeholder="Search Film.."
                required
              />
            </div>
          </div>
          <div className="hidden lg:flex gap-5 text-white ml-8 lg:ml-0 lg:mr-24">
            <div className="content-center flex items-center gap-1">
              <img
                src="https://assets.loket.com/web/assets/img/ic_schedule.svg"
                alt=""
                className="w-[21px]"
              />
              <a href="">Buat Event</a>
            </div>
            <div className="content-center flex items-center gap-1">
              <img
                src="https://assets.loket.com/web/assets/img/ic_explore_compass.svg"
                alt=""
                className="w-[21px]"
              />
              <a href="">Jelajah</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {session.data ? (
                <ProfileBarComponent session={session} />
              ) : (
                <SignBarComponent />
              )}
            </div>
            <div className="flex items-center gap-4">
              {session.data?.user.email},{session.data?.user.id},
              {session.data?.user.name},{session.data?.user.phone_number}
            </div>
            <div className="md:hidden relative">
              <input
                type="search"
                className="block w-full max-w-[300px] sm:max-w-[250px] pl-10 pr-2 py-2 text-sm text-black outline-none rounded-md shadow-md"
                placeholder="Search.."
                required
              />
            </div>

            {/* Hamburger */}
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden text-white"
            />
          </div>
        </div>

        <div className="flex gap-3 py-2 px-5 md:px-36 bg-[#152955] mx-auto text-white text-xs overflow-x-auto whitespace-nowrap">
          <div className="mx-auto space-x-4 ml-10">
            <Link href="">#LoketMart</Link>
            <Link href="">#Promo_Indodana</Link>
            <Link href="">#LOKETScreen</Link>
            <Link href="">#LOKET_Promo</Link>
            <Link href="">#motoGP</Link>
            <Link href="">#LoketAttraction</Link>
          </div>
        </div>

        {/* Sidebar mobile menu */}
        <div
          className={clsx(
            "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all z-[9999]",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-6 gap-6 z-50 w-72 flex">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-2 mb-2 text-3xl cursor-pointer"
            />
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold">Masuk ke Akunmu</h3>
              <p className="text-sm text-gray-600">
                Untuk menggunakan semua fitur di Loket
              </p>
            </div>
            <div className="mb-4 flex justify-between gap-2">
              <Link href="/sign-up" className="w-1/2">
                <button className="w-full bg-blue-600 text-white py-2 rounded-md">
                  Daftar
                </button>
              </Link>
              <Link href="/sign-in" className="w-1/2">
                <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-md">
                  Masuk
                </button>
              </Link>
            </div>
            {navlinks.map((d, i) => (
              <Link key={i} className="font-bold" href={d.link}>
                {d.label}
              </Link>
            ))}
          </section>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="lg:hidden bg-[#142954] text-white">
          <div className="flex flex-col items-center py-4 px-3">
            <div className="flex gap-4 w-full justify-center">
              {session.data ? (
                <ProfileBarComponent session={session} />
              ) : (
                <SignBarComponent />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
