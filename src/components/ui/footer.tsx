import Image from "next/image";
import Link from "next/link";
import logo from "@assets/logo.svg";

export const Footer = () => {
  return (
    <footer className="flex md:p-[4.16667vw] md:px-[18.75vw] flex-col items-center md:gap-[3.125vw] self-stretch">
      <div className="flex md:w-[62.5vw] md:max-w-[62.5vw] items-center content-center md:gap-y-0 md:gap-x-[2.08333vw] flex-wrap justify-between">
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
        <div className="flex md:gap-x-[1.3vw]">
          <Link href="/">
            <span className="text-white md:text-[0.9375vw] font-normal md:leading-[1.21875vw]">
              Home
            </span>
          </Link>
          <Link href="/map">
            <span className="text-white md:text-[0.9375vw] font-normal md:leading-[1.21875vw]">
              Map
            </span>
          </Link>
          <Link href="/#faq">
            <span className="text-white md:text-[0.9375vw] font-normal md:leading-[1.21875vw]">
              FAQ
            </span>
          </Link>
          <Link href="https://taikai.network/cassinihackathons/hackathons/environment-greentransition/projects/cm10z30c0002t5v2aid9yadoa/idea">
            <span className="text-white md:text-[0.9375vw] font-normal md:leading-[1.21875vw]">
              About
            </span>
          </Link>
        </div>
      </div>
      <div className="flex md:w-[62.5vw] md:max-w-[62.5vw] justify-between items-center">
        <span className="text-[#A3A3A3] md:text-[0.72917vw] font-medium md:leading-[1.09375vw]">
          {" "}
          Made by TerraStreams | Powered by Copernicus
        </span>
        <div className="flex md:gap-x-[1vw] items-center justify-center">
          <Link href={"/"}>
            <span className="text-[#A3A3A3] md:text-[0.72917vw] font-medium md:leading-[1.09375vw]">
              Privacy Policy
            </span>
          </Link>
          <Link href={"/"}>
            <span className="text-[#A3A3A3] md:text-[0.72917vw] font-medium md:leading-[1.09375vw]">
              Terms of Service
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
