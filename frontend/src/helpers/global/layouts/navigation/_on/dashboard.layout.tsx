"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 
import menuItems from "@/helpers/single/dashboard/data/menuData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Bell, Sun, Moon, LogOutIcon, Menu, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SignOutDialog from "@/helpers/global/layouts/navigation/components/sign-out.component";
import { useTheme } from "next-themes";
import NavProfile from "../components/nav-profile.component";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'; 
import Image from "next/image";
import logo from "@/assets/midea/app/pedromag-transparent.png"

const Dashboard = ({ children }) => {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname(); 
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: session } = useSession(); 

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode, setTheme]);

  return (
    <div className={`flex h-screen bg-[#f7f7f7] dark:bg-zinc-950`}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-white dark:bg-gray-800">
          <div className="px-4 py-3 pl-3 flex justify-start items-center">
          <Image
              alt="User avatar"
              className="w-10 h-10 object-cover"
              src={logo}
              style={{
                aspectRatio: "128/128",
                objectFit: "cover",
              }}
            />
            <h2 className="text-xl font-bold text-blue-800 dark:text-white px-2">Pedromag</h2>
          </div>
          {/* <div className="px-4 py-1 font-semibold dark:text-white text-gray-700">
            <h3>Menu</h3>
          </div> */}
          <ScrollArea className="h-[calc(100vh-180px)]">
            <nav className="mt-4 px-4">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.path}>
                  <Button
                    variant={pathname === item.path ? "secondary" : "ghost"} 
                    className={`w-full justify-start mb-1 ${pathname === item.path ? "bg-indigo-50 dark:bg-indigo-900" : ""} hover:bg-transparent`}
                  >
                    <item.icon className="mr-2 h-4 w-4 text-blue-800 dark:text-indigo-400" />
                    <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
                  </Button>
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="absolute bottom-0 w-64 p-4">
            {/* <Button
              variant="ghost"
              className="w-full justify-start mb-1 hover:bg-indigo-50 dark:hover:bg-indigo-900"
              // onClick={() => setActiveMenu("Configurações")}
            >
              <Settings className="mr-2 h-4 w-4 text-blue-800 dark:text-indigo-400" />
              <span className="text-gray-700 dark:text-gray-200">Configurações</span>
            </Button> */}
            <Dialog>
              <DialogTrigger className="flex gap-1 py-1 items-center cursor-pointer px-4 text-sm w-full rounded-sm hover:bg-indigo-50 dark:hover:bg-indigo-900">
                <LogOutIcon className="mr-2 h-4 w-4 text-blue-800 dark:text-indigo-400" />
                <div className="text-gray-700 dark:text-gray-200">Sair</div>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <SignOutDialog />
              </DialogContent>
            </Dialog>
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center">
              {!sidebarOpen && (
                <Image
                  alt="User avatar"
                  className="w-10 h-10 object-cover"
                  src={logo}
                  style={{
                    aspectRatio: "128/128",
                    objectFit: "cover",
                  }}
                />
              )}
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </Button>
              <Input disabled className="w-64 mr-4 dark:border-gray-600 rounded-full" placeholder="Pesquisar..." />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" disabled>
                <Bell className="h-5 w-5 text-black dark:text-white" />
              </Button>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="h-4 w-4 text-blue-800 dark:text-indigo-400" />
              </div>
              <NavProfile session={session}/>
            </div>
          </div>
        </header>
        
        <div className='p-4 w-full h-[calc(100%-56px)] overflow-y-scroll bg-light-secondary dark:bg-[#18202b]'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
