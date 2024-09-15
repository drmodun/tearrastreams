import Link from "next/link";
import { Card } from "./common/card";
import { Button } from "./common/button";
import placeholder from "@assets/upload.svg";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";

export interface SlimCardProps {
  title: string;
  description: string;
  buttonIcon?: string;
  buttonLink?: string;
}

export function SlimCard({
  title,
  description,
  buttonIcon,
  buttonLink,
}: SlimCardProps) {
  return (
    <Card className="flex md:w-[14.84375vw] md:py-[2.08333vw] md:pl-[1.04167vw] md:pr-[2.08333vw] flex-col items-start space-y-[2.08333vw] self-stretch rounded-[1.04167vw] bg-[#000] border-none outline-none hover:transform hover:-translate-y-10 hover:shadow-white transition-all duration-300">
      <Link href={buttonLink || "#"}>
        <Button variant={"default"} size={"icon"}>
          <div className="md:w-[1.25vw] md:h-[1.25vw] relative">
            <Image
              layout="fill"
              src={buttonIcon || placeholder}
              alt={buttonLink || "Button icon"}
            />
          </div>
        </Button>
        <Label className="flex md:mt-[2vw] text-white md:text-[1.77083vw] font-medium md:leading-[2.125vw]">
          {title}
        </Label>
        <Label className="md: mt-[1vw] flex md:h-[4.27083vw] flex-col justify-center self-stretch text-[#D9D9D9] md:text-[0.83333vw] font-normal md:leading-[1vw]">
          {description}
        </Label>
      </Link>
    </Card>
  );
}
