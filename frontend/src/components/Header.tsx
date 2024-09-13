"use client";
import React, { useState, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileBarComponent from "./header/ProfileBar.component";
import SignBarComponent from "./header/SignBar.component";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import MobileProfileBarComponent from "./header/Mobile.ProfileBar.component";
import MobileSignBarComponent from "./header/Mobile.SignBar.component";

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
      <div className="hidden bg-[#003899] text-white md:flex py-2 gap-5 text-[12px]">
        <div className="flex items-center justify-end max-w-7xl mx-auto pt-4 pb-2 md:pt-0 md:pb-0 w-full">
          <div className="space-x-4">
            <a href="/about" className="">
              Tentang Loket
            </a>
            <a href="#" className="">
              Mulai Jadi Event Creator
            </a>
            <a href="#" className="">
              Biaya
            </a>
            <a href="/blog" className="">
              Blog
            </a>
            <a href="/contact" className="">
              Hubungi Kami
            </a>
            <a href="#" className="">
              Loket Screen
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#142954] py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 pt-4 pb-2 md:pt-0 md:pb-0">
          <Link href="/">
            <img
              className="md:w-28 w-32 px-2 cursor-pointer"
              src="https://assets.loket.com/images/logo-loket-white.png"
              alt="Loket Logo"
              width={70}
              height={70}
            />
          </Link>

          <div className="hidden md:flex gap-4 items-center">
            <div className="relative flex items-center">
              <input
                className="xl:w-[500px] pl-5 lg:w-[400px] md:w-[200px] px-2 py-2 text-sm text-black outline-none rounded-md shadow-md"
                placeholder="Cari event seru di sini..."
                required
              />
            </div>
          </div>

          {/* Event and Explore links for desktop */}
          <div className="hidden lg:flex gap-5 text-white ml-8 lg:ml-12 lg:mr-24">
            <div className="flex items-center gap-1">
              <img
                src="https://assets.loket.com/web/assets/img/ic_schedule.svg"
                alt="Create Event"
                className="w-[21px]"
                width={64}
                height={64}
              />
              <a href="#">Buat Event</a>
            </div>
            <div className="flex items-center gap-1">
              <img
                src="https://assets.loket.com/web/assets/img/ic_explore_compass.svg"
                alt="Explore"
                className="w-[21px]"
                width={64}
                height={64}
              />
              <a href="#">Jelajah</a>
            </div>
          </div>

          {/* Sign In / Sign Up */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {session.data ? (
                <ProfileBarComponent session={session} />
              ) : (
                <SignBarComponent />
              )}
            </div>

            {/* Search mobile */}
            <div className="md:hidden relative">
              <input
                type="search"
                className="block w-full max-w-[300px] sm:max-w-[250px] pl-10 pr-2 py-2 text-sm text-black outline-none rounded-md shadow-md"
                placeholder="Cari..."
                required
              />
            </div>

            {/* Hamburger mobile */}
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden text-white"
            />
          </div>
        </div>

        <div className="flex gap-3 py-2 px-5 bg-[#152955] mx-auto text-white text-xs overflow-x-auto whitespace-nowrap">
          <div className="px-5 flex w-full items-center justify-between max-w-7xl mx-auto">
            <div className="space-x-4">
              <Link href="#">#LoketMart</Link>
              <Link href="#">#Promo_Indonesia</Link>
              <Link href="#">#LOKETScreen</Link>
              <Link href="#">#LOKET_Promo</Link>
              <Link href="#">#motoGP</Link>
              <Link href="#">#LoketAttraction</Link>
            </div>
          </div>
        </div>

        {/* Sidebar mobile menu */}
        <div
          className={clsx(
            "fixed h-full w-screen lg:hidden backdrop-blur-none top-0 right-0 -translate-x-full transition-all z-[9999]",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex-col absolute left-[-30px] top-0 h-screen p-4 gap-6 z-50 w-72 flex">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-2 mb-2 text-3xl cursor-pointer"
            />
            {session.data ? (
              <MobileProfileBarComponent session={session} />
            ) : (
              <MobileSignBarComponent />
            )}
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
