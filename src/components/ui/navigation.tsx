import Image from "next/image";
import logo from "@assets/logo.svg";
import { MenuSheet } from "./navigationDropdown";
import Link from "next/link";
export const Navigation = () => (
  <nav className="flex justify-center items-center w-full h-[6.25vw] md:h-[3.125vw] md:py-[2vw] md:mb-[2vw]">
    <div className="md:w-[60vw] justify-between flex h-full self-center items-center">
      <div className="flex items-center">
        <div className="flex relative md:w-[2.5vw] md:h-[2.5vw]">
          <Image src={logo} alt="logo" layout="fill" />
        </div>
        <Link href="/">
          <span className="text-white md:text-[1.25vw] font-semibold md:leading-[1.625vw]">
            TerraStreams
          </span>
        </Link>
      </div>
      
      <MenuSheet />
    </div>
  </nav>
);
