"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import ProfileBarComponent from "./header/ProfileBar.component";

import SignBarComponent from "./header/SignBar.component";

const Header: React.FC = () => {
  const session = useSession();
  console.log(session.data);
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const navBurger = useRef<HTMLButtonElement>(null);
  const navMenu = useRef<HTMLDivElement>(null);
  const navClose = useRef<HTMLButtonElement>(null);
  const navBackdrop = useRef<HTMLDivElement>(null);

  const handleNavBurger = () => {
    if (navMenu.current) {
      navMenu.current.classList.toggle("hidden");
    }
  };

  const handleNavClose = () => {
    if (navMenu.current) {
      navMenu.current.classList.toggle("hidden");
    }
  };

  const handleNavBackdrop = () => {
    if (navMenu.current) {
      navMenu.current.classList.toggle("hidden");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 shadow-xl">
      <div className="bg-[#142954] py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 pt-4 pb-2 md:pt-0 md:pb-0">
          <Link href={"/"}>
            <Image
              className="md:w-16 w-10 cursor-pointer"
              src="/images/logo kr.png"
              alt="Logo"
              width={64}
              height={64}
            />
          </Link>

          {pathname === "/" && (
            <div className="hidden md:flex gap-4 items-center">
              <div className="relative flex items-center">
                <svg
                  className="w-4 absolute mx-3 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <input
                  type="search"
                  className="block md:w-[600px] px-2 py-2 pl-10 text-sm text-black outline-none rounded-md shadow-md"
                  placeholder="Search Film.."
                  required
                />
              </div>
            </div>
          )}

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
              <svg
                className="w-6 h-6 absolute left-2 top-2 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <input
                type="search"
                className="block w-[200px] pl-10 pr-2 py-2 text-sm text-black outline-none rounded-md shadow-md"
                placeholder="Search.."
                required
              />
            </div>

            <div className="md:hidden">
              <button
                title="tgDD"
                type="button"
                onClick={toggleDropdown}
                className="text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {pathname === "/" && (
          <div className="hidden md:block">
            <div className="flex text-white text-lg justify-center pr-32 py-1">
              <ul className="flex items-center gap-8">
                <Link href="/menu/contact">
                  <li className="cursor-pointer hover:text-[#FCCB08] duration-150">
                    Hubungi Kami
                  </li>
                </Link>
                <Link href="/menu/about">
                  <li className="cursor-pointer hover:text-[#FCCB08] duration-150">
                    Tentang KR
                  </li>
                </Link>
                <Link href="/menu/sign-up">
                  <li className="cursor-pointer hover:text-[#FCCB08] duration-150">
                    Blog
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        )}

        {isDropdownOpen && (
          <div className="md:hidden bg-[#142954] text-white">
            <div className="flex flex-col items-center py-4 px-3">
              <div className="flex gap-4 w-full justify-center">
                {session.data ? (
                  <ProfileBarComponent session={session} />
                ) : (
                  <SignBarComponent />
                )}
              </div>
              <Link href="/menu/contact">
                <div className="mb-1 py-5">
                  <a className="mybutton" href="mailto:rap@gmail.com">
                    Contact
                  </a>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div
        ref={navMenu}
        className="hidden navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50"
      >
        <div
          ref={navBackdrop}
          onClick={handleNavBackdrop}
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
        />
        <nav className="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              title="navClose"
              onClick={handleNavClose}
              ref={navClose}
              className="navbar-close"
            >
              <svg
                className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
