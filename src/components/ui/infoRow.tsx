import Link from "next/link";
import { Button } from "./common/button";
import { link } from "fs";
import Image from "next/image";
import placeholder from "@assets/placeholder.png";
import { cn } from "@/lib/utils";

export interface InfoRowProps {
  title: string;
  description: string;
  subtitle?: string;
  bulletPoints?: string[];
  buttonLink?: string;
  image?: string;
  isReversed?: boolean;
}

export const InfoRow = ({
  description,
  bulletPoints,
  title,
  subtitle,
  isReversed,
  buttonLink,
  image,
}: InfoRowProps) => (
  <section
    className={cn(
      "flex md:w-[62.5vw] justify-between items-center",
      isReversed && "flex-row-reverse"
    )}
  >
    <article className="flex md:max-w-[26.04167vw] flex-col justify-center items-start md:gap-[0.83333vw] flex-grow-0 flex-shrink-0 flex-auto">
      <h2 className="text-white md:text-[2.5vw] font-medium md:leading-[3vw]">
        {title}
      </h2>
      <span className="text-[#D9D9D9] md:text-[0.83333vw] font-normal md:leading-[1vw] md:mt-[1.5vw]">
        {subtitle}
      </span>
      <span className="text-[#D9D9D9] md:text-[0.83333vw] font-normal md:mt-[1.5vw] md:leading-[1vw]">
        {description}
      </span>
      <ul>
        {bulletPoints?.map((point, index) => (
          <li
            className="text-[#D9D9D9] md:text-[0.83333vw] font-normal md:leading-[1vw]"
            key={index}
          >
            {point}
          </li>
        ))}
      </ul>
      <Link href={buttonLink || "# "}>
        <Button>Learn more</Button>
      </Link>
    </article>
    <figure className="relative w-[20vw] h-[25vw]">
      <Image src={placeholder} alt="image" layout="fill" />
    </figure>
  </section>
);
