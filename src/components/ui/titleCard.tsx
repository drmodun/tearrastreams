import * as React from "react";

import { Button } from "@/components/ui/common/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card";
import Link from "next/link";

export interface TitleCardButtonProps {
  buttonText: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  link: string;
}

export interface TitleCardProps {
  titleFirstPart: string;
  specialWord: string;
  titleSecondPart: string;
  description: string;
  children: React.ReactNode;
  buttons?: TitleCardButtonProps[];
}

export function TitleCard({
  titleFirstPart,
  titleSecondPart,
  specialWord,
  description,
  children,
  buttons,
}: TitleCardProps) {
  return (
    buttons?.length && (
      <Card
        className="flex md:h-[30.20833vw] md:w-[60vw]  items-center flex-grow-0
      flex-shrink-0 flex-auto md:rounded-[2.08333vw] bg-[#000000] outline-none border-none md:px-[1.08333vw] md:py-[2.08333vw] md:gap-x-[2.08333vw] md:gap-y-[2.08333vw] md:justify-between"
      >
        <section className="flex-col md:w-[32.3vw]">
          <CardHeader>
            <CardTitle className="text-white md:text-[4.0625vw] font-semibold leading-[4.875vw]">
              {`${titleFirstPart} `}
              <span className="text-[#914BF1] md:text-[4.0625vw] font-semibold md:leading-[4.875vw]">
                {specialWord}&nbsp;
              </span>
              {titleSecondPart}
            </CardTitle>
            <CardDescription className="text-[#D9D9D9] md:text-[0.9375vw] font-normal md:leading-[1.125vw]">
              {description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-self-start md:gap-x-[0.01vw]">
            {buttons?.map((button, index) => (
              <Link href={button.link} key={index}>
                <Button key={index} variant={button.variant || "default"}>
                  {button.buttonText}
                </Button>
              </Link>
            ))}
          </CardFooter>
        </section>
        <section className="w-[100%] h-[100%] flex relative">
          {children}
        </section>
      </Card>
    )
  );
}
