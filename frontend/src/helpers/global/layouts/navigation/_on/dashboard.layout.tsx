"use client";

import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Bell, Equal, MoonIcon, SunIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import NavLink from '@/components/custom/NavLink/NavLink';
import { IconsData } from '../data/modules.data';
import navigationLinks from '../data/navigation.data';
import NavProfile from '../components/nav-profile.component';
import { useTheme } from 'next-themes';
import { useSession } from 'next-auth/react'; 

const Dashboard = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { data: session } = useSession(); 

  const renderLinks = () => {
    const links = Object.keys(navigationLinks).find((key) => pathname.startsWith(key));

    if (links) {
      return (
        <ul>
          {navigationLinks[links].map((Link: any) => (
            <li key={Link.href}>
              <NavLink href={Link.href} activeClassName='bg-app text-white drop-shadow-lg' className='flex dark:text-white items-center px-3 w-full rounded-lg py-2 gap-2 mb-1'>
                {Link.icon && <Link.icon />}
                <span className="font-bold text-sm">{Link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  const isWelcomePath = pathname.startsWith('/welcome');

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <main className='flex h-screen w-full'>
      <aside className='h-full flex bg-white dark:bg-dark-primary'>
        <div className='flex bg-gradient-to-b from-[#0d2143] to-[#1b4996] h-full w-14 px-1 py-3 flex-col z-10'>
          <div className='w-full'>
            <button onClick={() => setIsMenuOpened((prev) => !prev)} className='py-1.5 text-white flex items-center justify-center w-full hover:bg-transparent cursor-pointer rounded-md'>
              <Equal className='w-6 h-6' />
            </button>
          </div>

          <div className='mt-8 flex flex-col gap-4 items-center'>
            {IconsData.map(({ Icon, label, href }, index) => {
              const isActive = pathname === href;

              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger
                      className={`w-11 h-11 flex items-center justify-center cursor-pointer rounded-full ${isActive ? 'text-white opacity-100' : 'text-white opacity-35'}`}
                      onClick={() => router.push(href)}
                    >
                      <Icon />
                    </TooltipTrigger>
                    <TooltipContent className='absolute mt-2 ml-5 w-max'>
                      <p className='font-bold'>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>

        <div className={`${isMenuOpened && !isWelcomePath ? 'lg:translate-x-0 lg:w-64' : 'lg:-translate-x-64 lg:w-0'} 
        border-r-0 duration-100 overflow-hidden top-0 bottom-0 bg-white dark:bg-dark-primary
        lg:z-0 lg:relative lg:ml-0 lg:drop-shadow-none
        md:fixed md:z-50 md:ml-[3.5rem] md:translate-x-0 md:drop-shadow-2xl
        sm:fixed sm:z-50 sm:ml-[3.5rem] sm:drop-shadow-2xl sm:-translate-x-64 sm:w-0`}>
          <div className='h-14 w-full gap-1.5 flex items-center px-3 mb-3'>
              <div className='w-8 h-8 bg-slate-300 rounded-full'></div>
              <span className='font-medium text-base dark:text-white'>Pedromag</span>
          </div>

          <div className='px-1.5'>
            {renderLinks()}
          </div>
        </div>
      </aside>

      <section className='w-full dark:bg-dark-primary'>
        <nav className='h-14 w-full bg-white dark:bg-dark-primary border-b-transparent px-4 flex gap-5 justify-end items-center'>
          <div className="cursor-pointer bg-light-secondary dark:bg-[#081023] rounded-full p-2" onClick={handleThemeToggle} title="Alterar modos">
            {theme === "dark" ? (
              <MoonIcon className="w-5 h-5 dark:text-white" />
            ) : (
              <SunIcon className="w-5 h-5 dark:text-white" />
            )}
          </div>

          <div><Bell className="w-6 h-6 dark:text-white" /></div>
          
          <NavProfile session={session} />
        </nav>

        <div className='p-4 w-full h-[calc(100%-56px)] overflow-y-scroll bg-light-secondary dark:bg-dark-secondary rounded-lg'>
          {children}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
