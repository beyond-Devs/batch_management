// "use client";

// import React, { useState } from 'react';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { Bell, Equal, MoonIcon, SunIcon } from 'lucide-react';
// import { usePathname, useRouter } from 'next/navigation';
// import NavLink from '@/components/custom/NavLink/NavLink';
// import { IconsData } from '../data/modules.data';
// import navigationLinks from '../data/navigation.data';
// import NavProfile from '../components/nav-profile.component';
// import { useTheme } from 'next-themes';
// import { useSession } from 'next-auth/react'; 

// const Dashboard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
//   const [isMenuOpened, setIsMenuOpened] = useState<boolean>(true);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { setTheme, theme } = useTheme();
//   const { data: session } = useSession(); 

//   const renderLinks = () => {
//     const links = Object.keys(navigationLinks).find((key) => pathname.startsWith(key));

//     if (links) {
//       return (
//         <ul>
//           {navigationLinks[links].map((Link: any) => (
//             <li key={Link.href}>
//               <NavLink href={Link.href} activeClassName='bg-app text-white drop-shadow-lg' className='flex dark:text-white items-center px-3 w-full rounded-lg py-2 gap-2 mb-1'>
//                 {Link.icon && <Link.icon />}
//                 <span className="font-bold text-sm">{Link.label}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       );
//     }

//     return null;
//   };

//   const isWelcomePath = pathname.startsWith('/welcome');

//   const handleThemeToggle = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <main className='flex h-screen w-full'>
//       <aside className='h-full flex bg-white dark:bg-dark-primary'>
//         <div className='flex bg-gradient-to-b from-[#0d2143] to-[#1b4996] h-full w-14 px-1 py-3 flex-col z-10'>
//           <div className='w-full'>
//             <button onClick={() => setIsMenuOpened((prev) => !prev)} className='py-1.5 text-white flex items-center justify-center w-full hover:bg-transparent cursor-pointer rounded-md'>
//               <Equal className='w-6 h-6' />
//             </button>
//           </div>

//           <div className='mt-8 flex flex-col gap-4 items-center'>
//             {IconsData.map(({ Icon, label, href }, index) => {
//               const isActive = pathname === href;

//               return (
//                 <TooltipProvider key={index}>
//                   <Tooltip>
//                     <TooltipTrigger
//                       className={`w-11 h-11 flex items-center justify-center cursor-pointer rounded-full ${isActive ? 'text-white opacity-100' : 'text-white opacity-35'}`}
//                       onClick={() => router.push(href)}
//                     >
//                       <Icon />
//                     </TooltipTrigger>
//                     <TooltipContent className='absolute mt-2 ml-5 w-max'>
//                       <p className='font-bold'>{label}</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </TooltipProvider>
//               );
//             })}
//           </div>
//         </div>

//         <div className={`${isMenuOpened && !isWelcomePath ? 'lg:translate-x-0 lg:w-64' : 'lg:-translate-x-64 lg:w-0'} 
//         border-r-0 duration-100 overflow-hidden top-0 bottom-0 bg-white dark:bg-dark-primary
//         lg:z-0 lg:relative lg:ml-0 lg:drop-shadow-none
//         md:fixed md:z-50 md:ml-[3.5rem] md:translate-x-0 md:drop-shadow-2xl
//         sm:fixed sm:z-50 sm:ml-[3.5rem] sm:drop-shadow-2xl sm:-translate-x-64 sm:w-0`}>
//           <div className='h-14 w-full gap-1.5 flex items-center px-3 mb-3'>
//               <div className='w-8 h-8 bg-slate-300 rounded-full'></div>
//               <span className='font-medium text-base dark:text-white'>Pedromag</span>
//           </div>

//           <div className='px-1.5'>
//             {renderLinks()}
//           </div>
//         </div>
//       </aside>

//       <section className='w-full dark:bg-dark-primary'>
//         <nav className='h-14 w-full bg-white dark:bg-dark-primary border-b-transparent px-4 flex gap-5 justify-end items-center'>
//           <div className="cursor-pointer bg-light-secondary dark:bg-[#081023] rounded-full p-2" onClick={handleThemeToggle} title="Alterar modos">
//             {theme === "dark" ? (
//               <MoonIcon className="w-5 h-5 dark:text-white" />
//             ) : (
//               <SunIcon className="w-5 h-5 dark:text-white" />
//             )}
//           </div>

//           <div><Bell className="w-6 h-6 dark:text-white" /></div>
          
//           <NavProfile session={session} />
//         </nav>

//         <div className='p-4 w-full h-[calc(100%-56px)] overflow-y-scroll bg-light-secondary dark:bg-dark-secondary rounded-lg'>
//           {children}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;


"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"; 
import menuItems from "@/helpers/single/dashboard/data/menuData";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Bell, Sun, Moon, LogOutIcon, Menu, Settings } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import SignOutDialog from "@/helpers/global/layouts/navigation/components/sign-out.component"
import { useTheme } from "next-themes"
import { useSession } from "next-auth/react"

const lotStatusData = [
  { name: "Ocupado", value: 300, color: "#4CAF50" },
  { name: "Vago", value: 150, color: "#2196F3" },
  { name: "Em Manutenção", value: 50, color: "#FFC107" },
];

const recentOccupations = [
  { id: 1, owner: "João Silva", lot: "A-101", date: "2024-10-12", type: "Residente" },
  { id: 2, owner: "Jane Doe", lot: "B-205", date: "2024-10-13", type: "Investidor" },
  { id: 3, owner: "Miguel Santos", lot: "C-303", date: "2024-10-14", type: "Residente" },
  { id: 4, owner: "Emília Oliveira", lot: "D-404", date: "2024-10-15", type: "Investidor" },
  { id: 5, owner: "Alex Lima", lot: "E-505", date: "2024-10-16", type: "Residente" },
];

const Dashboard = ({ children }) => {
  const { setTheme, theme } = useTheme();
  const { data: session } = useSession();

  const [activeMenu, setActiveMenu] = useState("Início");
  const [ownerFilter, setOwnerFilter] = useState("Todos");
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [chartFilter, setChartFilter] = useState("Todos");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode, setTheme]);

  const filteredOccupations = ownerFilter === "Todos"
    ? recentOccupations
    : recentOccupations.filter(occupation => occupation.type === ownerFilter);

  const filteredLotStatusData = chartFilter === "Todos"
    ? lotStatusData
    : lotStatusData.filter(item => item.name === chartFilter);

  return (
    <div className={`flex h-screen bg-[#f7f7f7] dark:bg-zinc-950`}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-white dark:bg-gray-800">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Pedromag</h2>
          </div>
          <ScrollArea className="h-[calc(100vh-180px)]">
            <nav className="mt-6 px-4">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.path} passHref>
                  <Button
                    variant={activeMenu === item.name ? "secondary" : "ghost"}
                    className={`w-full justify-start mb-1 ${activeMenu === item.name ? "bg-indigo-50 dark:bg-indigo-900" : ""} hover:bg-indigo-50 dark:hover:bg-indigo-900`}
                    onClick={() => setActiveMenu(item.name)}
                  >
                    <item.icon className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
                  </Button>

                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="absolute bottom-0 w-64 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start mb-1 hover:bg-indigo-50 dark:hover:bg-indigo-900"
              onClick={() => setActiveMenu("Configurações")}
            >
              <Settings className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-700 dark:text-gray-200">Configurações</span>
            </Button>
            <Dialog>
              <DialogTrigger className="flex gap-1 py-1 items-center cursor-pointer px-4 text-sm w-full rounded-sm hover:bg-indigo-50 dark:hover:bg-indigo-900">
                <LogOutIcon className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
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
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </Button>
              <Input className="w-64 mr-4 dark:border-gray-600" placeholder="Pesquisar..." />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-black dark:text-white" />
              </Button>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                <Moon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 rounded-full flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-indigo-600 text-white">JS</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">João Silva</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">João Silva</p>
                      <p className="text-xs leading-none text-muted-foreground">joao.silva@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Configurações
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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