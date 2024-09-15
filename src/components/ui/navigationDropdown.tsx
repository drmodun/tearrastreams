"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/common/sheet";
import { ResultDialog } from "./navigationDialog";
import Link from "next/link";
import { Button } from "./common/button";
import dropdown from "@assets/dropdown.svg";
import Image from "next/image";

export const MenuSheet = () => (
  <Sheet>
    <SheetTrigger>
      <figure className="md:w-[2.5vw] md:h-[2.5vw] relative">
        <Image src={dropdown} alt="dropdown" layout="fill" />
      </figure>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Navigation menu</SheetTitle>
        <SheetDescription>
          Here you can find all the links to the different sections of the page
        </SheetDescription>
        <Link href={"/"}>
          <SheetClose>
            <Button variant={"link"}>Home</Button>
          </SheetClose>
        </Link>
        <Link href={"/map"}>
          <SheetClose>
            <Button variant={"link"}>Map</Button>
          </SheetClose>
        </Link>
        <ResultDialog />
        <Link
          href={
            "https://taikai.network/cassinihackathons/hackathons/environment-greentransition/projects/cm10z30c0002t5v2aid9yadoa/idea"
          }
        >
          <SheetClose>
            <Button variant={"link"}>Documentation</Button>
          </SheetClose>
        </Link>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);
