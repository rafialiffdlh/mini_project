import React from "react";
import ECommerce from "./dashboard/home/E-commerce";
import Header from "./dashboard/Header/index";
import { FiMenu } from "react-icons/fi";

export default function OrgDashboardComponent() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <label
        htmlFor="my-drawer-2"
        className="drawer-button lg:hidden fixed top-2 right-4 z-50"
      >
        <FiMenu className="text-primary" size={24} />
      </label>

      <div className="drawer-content flex flex-col items-center py-10 px-3 justify-center">
        <ECommerce />
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-[#1c2333] text-base text-white min-h-full w-80 p-4">
          <li>
            <a href="/e" className="">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/" className="">
              Home
            </a>
          </li>
          <li>
            <a href="/e/calendar" className="">
              Calendar
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
