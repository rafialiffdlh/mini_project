"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useCallback, useEffect, useRef } from "react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeDropdown]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 shadow-xl">
      <div className="bg-[#1B1B1B]">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 pt-4 pb-2 md:pt-0 md:pb-0">
          <Link href={"/"}>
            <img
              className="md:w-16 w-10 cursor-pointer"
              src="images/logo xx.png"
              alt="Logo"
            />
          </Link>

          {pathname === "/" && (
            <div className="flex gap-4 items-center">
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

          <svg
            onClick={toggleDropdown}
            className="fill-current text-[#FCCB08] cursor-pointer md:hidden"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
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
                <li className="cursor-pointer hover:text-[#FCCB08] duration-150">
                  Komedi
                </li>
                <li className="cursor-pointer hover:text-[#FCCB08] duration-150">
                  Fantasi
                </li>
                <li className="cursor-pointer hover:text-[#FCCB08] duration-150">
                  Sejarah
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div
        ref={dropdownRef}
        className={`fixed top-0 right-0 h-full bg-[#1B1B1B] shadow-xl transform ${
          isDropdownOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 w-[300px] md:hidden`}
      >
        <div className="flex flex-col p-4 space-y-6 text-white">
          <h2 className="text-xl font-semibold">Menu</h2>

          <Link href="/menu/sign-up">
            <button
              onClick={closeDropdown}
              className="border border-white text-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-black"
            >
              Sign Up
            </button>
          </Link>
          <Link href="/menu/sign-in">
            <button
              onClick={closeDropdown}
              className="bg-[#0070C9] text-white font-semibold py-2 px-4 rounded hover:bg-[#005A9E]"
            >
              Sign In
            </button>
          </Link>

          <ul className="text-lg space-y-4">
            <li
              onClick={closeDropdown}
              className="cursor-pointer hover:text-[#FCCB08] duration-150"
            >
              Home
            </li>
            <li
              onClick={closeDropdown}
              className="cursor-pointer hover:text-[#FCCB08] duration-150"
            >
              Cinemas
            </li>
            <li
              onClick={closeDropdown}
              className="cursor-pointer hover:text-[#FCCB08] duration-150"
            >
              Privilege
            </li>
            <li
              onClick={closeDropdown}
              className="cursor-pointer hover:text-[#FCCB08] duration-150"
            >
              Movie Library
            </li>
            <li
              onClick={closeDropdown}
              className="cursor-pointer hover:text-[#FCCB08] duration-150"
            >
              About Us
            </li>
            <li
              onClick={closeDropdown}
              className="cursor-pointer hover:text-[#FCCB08] duration-150"
            >
              Contact
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
