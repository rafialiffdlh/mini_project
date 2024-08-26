"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 right-0 max-w-7xl mx-auto -top-2 md:-top-0 z-50 shadow-xl">
      <div className="flex items-center bg-[#A6E3E9] justify-between px-8 pt-4 md:pt-0 md:pb-0">
        <Link href={"/"}>
          <img
            className="md:w-0 w-5 cursor-pointer"
            src="https://i.ibb.co/tBtY92n/Colorful-Modern-Stream-C-Free-Logo.png"
            alt=""
          />
        </Link>
        {pathname === "/" && (
          <div className="flex flex-1 items-center">
            <div className="relative flex items-center mr-4">
              <svg
                className="w-4 absolute mx-3 h-4 text-gray-500"
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
                className="block md:w-[400px] px-2 py-2 pl-10 text-black rounded-md"
                placeholder="Search Film.."
                required
              />
            </div>
            <select className="bg-[#3B3B3B] w-[108px] md:block hidden text-xs text-white outline-none px-2 py-[10px] rounded-md">
              <option className="">Romantis</option>
              <option>Komedi</option>
              <option>Horor</option>
              <option>Drama</option>
            </select>
          </div>
        )}
        <label className="cursor-pointer hover-light-effect">
          <svg
            className="fill-current text-[#E3FDFD]"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>
      </div>
      <div className="hidden md:block">
        <div className="flex text-white text-xs justify-between items-center py-3 px-3 bg-[#A6E3E9]"></div>
      </div>
    </div>
  );
};

export default Header;
