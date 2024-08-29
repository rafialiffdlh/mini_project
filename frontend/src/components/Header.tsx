"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import MenuBar from "../menu/menubar";

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 shadow-xl">
      <div className="bg-[#1B1B1B]">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 pt-4 pb-2 md:pt-0 md:pb-0">
          <Link href={"/"}>
            <img
              className="md:w-16 w-10 cursor-pointer"
              src="images/logo xx.png"
              alt=""
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

          <svg
            onClick={toggleDropdown}
            className="fill-current text-[#FCCB08] cursor-pointer"
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

      <MenuBar
        isDropdownOpen={isDropdownOpen}
        closeDropdown={closeDropdown}
        dropdownRef={dropdownRef}
      />
    </div>
  );
};

export default Header;
