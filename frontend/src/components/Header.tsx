import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/iconbwm-removebg.png";

const Header: React.FC = () => {
  return (
    <div className="bg-zinc-50 mt-auto max-w-screen-xl m-auto">
      <div className="bg-zinc-100 backdrop-blur-lg">
        <div className="container flex items-center justify-between py-2"></div>
        <Image src={Logo} alt="logo" className="w-20 h-15" />
      </div>
      <a
        href="#main-content"
        className="whitespace-nowrap absolute z-50 left-4 opacity-90 rounded-md bg-white px-4 py-3 transform -translate-y-40 focus:translate-y-0 transition-all duration-300"
      ></a>
      <nav>
        <div className="app-max-width w-full">
          <div className="flex justify-between align-baseline app-x-padding">
            <div className="flex-4 lg:flex-0 lg:hidden"></div>

            <ul className="flex-0 lg:flex-1 flex space-x-6">
              <li>
                <Link href="">Home</Link>
              </li>
              <li>
                <Link href="">Login</Link>
              </li>
              <li>
                <Link href="">Login</Link>
              </li>
              <li>
                <Link href="">Singin</Link>
              </li>
            </ul>

            <div className="flex-1 flex justify-center items-center cursor-pointer">
              <div className="w-32 h-auto">
                <Link href="/">
                  <Image
                    className="justify-center"
                    src="/logo.svg"
                    alt="Picture of the author"
                    width={220}
                    height={50}
                    layout="responsive"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
