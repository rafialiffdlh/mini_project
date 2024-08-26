import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-zinc-100 mt-auto max-w-screen-xl m-auto">
      <div className="container lg:grid lg:grid-cols-2 py-14"></div>

      {/* Copy Right */}
      <div className="py-10 bg-zinc-200 mt-auto max-w-screen-xl m-auto">
        <div className="container text-center text-gray-500 lg:justify-between lg:flex ">
          <div className="pb-4 lg:pb-0">
            <p>&copy;2024 Event Management.</p>
          </div>
          <div>
            <Link className="p-4 hover:underline" href="/privacy">
              Privacy
            </Link>
            <Link className="p-4 hover:underline" href="/terms">
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
