"use client";
import React from "react";
import Link from "next/link";
import Contact from "./contact";
interface MenuBarProps {
  isDropdownOpen: boolean;
  closeDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const MenuBar: React.FC<MenuBarProps> = ({
  isDropdownOpen,
  closeDropdown,
  dropdownRef,
}) => {
  return (
    <div
      ref={dropdownRef}
      className={`fixed top-0 right-0 h-full bg-[#1B1B1B] shadow-xl transform ${
        isDropdownOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 w-[300px]`}
    >
      <div className="flex flex-col p-4 space-y-6 text-white">
        <h2 className="text-xl font-semibold">Menu</h2>

        <div className="flex gap-4">
          <Link href="/menu/sign-in">
            <button
              onClick={closeDropdown}
              className="bg-white text-black font-semibold py-2 px-4 rounded"
            >
              Sign In
            </button>
          </Link>
          <Link href="/menu/sign-up">
            <button
              onClick={closeDropdown}
              className="bg-white text-black font-semibold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </Link>
        </div>

        <ul className="text-lg space-y-4">
          <li
            onClick={closeDropdown}
            className="cursor-pointer hover:text-[#FCCB08] duration-150"
          >
            <Link href="/about-us">About Us</Link>
          </li>
          <li
            onClick={closeDropdown}
            className="cursor-pointer hover:text-[#FCCB08] duration-150"
          >
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
