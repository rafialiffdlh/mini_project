"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 shadow-xl">
      <div className="bg-[#1B1B1B] py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 pt-4 pb-2 md:pt-0 md:pb-0">
          <Link href={"/"}>
            <img
              className="md:w-16 w-10 cursor-pointer"
              src="images/logo kr.png"
              alt="Logo"
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
              <Link href="/menu/sign-up">
                <button className="border border-white text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-black">
                  Sign Up
                </button>
              </Link>
              <Link href="/menu/sign-in">
                <button className="bg-[#0070C9] text-white font-semibold py-2 px-4 rounded hover:bg-[#005A9E]">
                  Sign In
                </button>
              </Link>
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
              <button onClick={toggleDropdown} className="text-white">
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
            <div className="flex text-white text-lg justify-center items-center py-3 px-3">
              <ul className="flex items-center gap-8">
                <li className="cursor-pointer hover:text-[#FCCB08] duration-150">
                  Romantis
                </li>
                <li className="cursor-pointer hover:text-[#FCCB08] duration-150">
                  Drama
                </li>
                <li className="cursor-pointer hover:text-[#FCCB08] duration-150">
                  Horor
                </li>
              </ul>
            </div>
          </div>
        )}

        {isDropdownOpen && (
          <div className="md:hidden bg-[#1B1B1B] text-white">
            <div className="flex flex-col items-center py-3 px-3">
              <div className="flex gap-4 w-full justify-center">
                <Link href="/menu/sign-up">
                  <button className="border border-white text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-black">
                    Sign Up
                  </button>
                </Link>
                <Link href="/menu/sign-in">
                  <button className="bg-[#0070C9] text-white font-semibold py-2 px-4 rounded hover:bg-[#005A9E]">
                    Sign In
                  </button>
                </Link>
              </div>
              <Link href="/menu/contact">
                <div className="py-3" />
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
