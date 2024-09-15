"use client";

import { Button } from "@/components/ui/common/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/common/dialog";
import { Input } from "@/components/ui/common/input";
import { Label } from "@/components/ui//common/label";
import { useState } from "react";
import Link from "next/link";

export function ResultDialog() {
  const [resultId, setResultId] = useState<number>(1);

  return (
    <Dialog>
      <DialogTrigger className="flex justify-start" asChild>
        <Button variant="link">Get result by Id</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>See result by number ID</DialogTitle>
          <DialogDescription>
            Enter the number ID of the result you want to see, if you have a qr
            code scan it with your phone camera and it will take you to the
            result site also
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Result ID
            </Label>
            <Input
              onChange={(e) => setResultId(parseInt(e.target.value))}
              value={resultId}
              id="name"
              defaultValue="1"
              className="col-span-3"
              type="number"
            />
          </div>
        </div>
        <DialogFooter>
          <Link href={`results/${resultId}`}>
            <Button variant="ghost" type="button">
              Search
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
