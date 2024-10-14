import { NavLinkProps } from './interfaces/NavLinkProps';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = '', activeClassName = '' }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`${className} ${isActive ? activeClassName : ''}`}>
      {children}
    </Link>
  );
};

export default NavLink;