"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOutDialog from "@/helpers/global/layouts/navigation/components/sign-out.component";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LogOutIcon } from "lucide-react";

const Page = () => {
  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger className="flex gap-1 py-1 items-center cursor-pointer px-3 text-sm w-full rounded-sm bg-red-200 dark:bg-red-800">
            <LogOutIcon className="w-5 h-5" />
            <div className="w-max flex">Sair</div>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <SignOutDialog />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Page;
