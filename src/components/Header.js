import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { auth, signOut } from "../../auth";

export default async function Header() {
  const session = await auth();
  console.log("session :>>", session);
  return (
    <div className="bg-slate-300 my- container w-[1300px] mx-auto rounded-r-full my-3">
      <div className="justify-between container mx-auto flex items-center  border-4 rounded-r-full border-slate-400">
        <Link href="/">
          <div className="p-2 py-4  bg-slate-400  rounded-r-full">
            <h1 className="font-bold text-2xl">Online Teaching</h1>
          </div>
        </Link>

        {session ? (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <Image src={session?.user?.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </MenubarTrigger>
              <MenubarContent>
                <Link href={"/profile"}>
                  <MenubarItem>Profile</MenubarItem>
                </Link>
                <MenubarSeparator />
                <Link href={"/appointments"}>
                  <MenubarItem>Appointments</MenubarItem>
                </Link>
                <MenubarSeparator />
                <form
                  action={async () => {
                    "use server";
                    await signOut("google")
                  }}
                >
                  <Button variant={'outline'}>Logout</Button>
                </form>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <Link href={"/signin"}>
            <Button className="rounded-r-full p-6 text-lg font-bold px-2">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

