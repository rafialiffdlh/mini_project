import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#025c55] text-white mt-auto">
      <div className="container mx-auto py-4 flex flex-col lg:flex-row justify-between items-center">
        <div className="flex space-x-6">
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Use
          </Link>
          <Link href="/advertising" className="hover:underline">
            Advertising
          </Link>
        </div>
        <div className="mt-4 lg:mt-0 text-center text-sm">
          &copy; 1999-2024 ExampleSite.com. All rights reserved.
          <br />
          Any commercial usage of the materials and contents is forbidden
          without prior permission.
        </div>
        <div className="flex space-x-4 mt-4 lg:mt-0">
          <Link href="https://www.instagram.com" target="_blank">
            <img
              src="/icons/instagram-icon.svg"
              alt="Instagram"
              className="w-6 h-6"
            />
          </Link>
          <Link href="https://www.facebook.com" target="_blank">
            <img
              src="/icons/facebook-icon.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </Link>
          <Link href="https://www.twitter.com" target="_blank">
            <img
              src="/icons/twitter-icon.svg"
              alt="Twitter"
              className="w-6 h-6"
            />
          </Link>
          <Link href="https://www.youtube.com" target="_blank">
            <img
              src="/icons/youtube-icon.svg"
              alt="YouTube"
              className="w-6 h-6"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
