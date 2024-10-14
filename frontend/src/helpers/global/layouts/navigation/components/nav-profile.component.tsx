import React from "react";
import { BookDashed, ChevronDown, LogOutIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SignOutDialog from "./sign-out.component";
import { Session } from 'next-auth';

interface NavProfileProps {
  session: Session | null; 
}

const NavProfile: React.FC<NavProfileProps> = ({ session }) => {
    
    const userName = session?.user.full_name || '';
    const firstName = userName.split(' ')[0] || '';
    const lastName = userName.split(' ')[1] || '';
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                    <div className="flex gap-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm px-2 py-1">
                        {userName && (
                            <>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full text-black bg-slate-300 border-white dark:border-dark-primary dark:bg-dark-primary ring-1 ring-offset-2 ring-blue-600 flex items-center justify-center text-sm font-bold dark:text-white">
                                        {initials}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="text-left">
                                        <div className="font-bold text-sm text-black dark:text-white">{userName}</div>
                                        <div className="text-xs text-slate-600 mt-0.5 dark:text-slate-200">Olá, {firstName}</div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="flex items-center dark:text-white">
                            <ChevronDown className="w-5 h-5" />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="relative right-6 min-w-[300px]">
                    <DropdownMenuItem className="flex gap-1 items-center cursor-pointer px-3">
                        <BookDashed className="w-5 h-5" />
                        <div className="w-max flex">Account informations</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-1 items-center cursor-pointer px-3">
                        <BookDashed className="w-5 h-5" />
                        <div className="w-max flex">Undone tasks</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-1 items-center cursor-pointer px-3">
                        <BookDashed className="w-5 h-5" />
                        <div className="w-max flex">Overviews of</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-1 items-center cursor-pointer px-3">
                        <BookDashed className="w-5 h-5" />
                        <div className="w-max flex">Account settings</div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <Dialog>
                        <DialogTrigger className="flex gap-1 py-1 items-center cursor-pointer px-3 text-sm w-full rounded-sm bg-red-200 dark:bg-red-800">
                            <LogOutIcon className="w-5 h-5" />
                            <div className="w-max flex">Sair</div>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                            <SignOutDialog />
                        </DialogContent>
                    </Dialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default NavProfile;