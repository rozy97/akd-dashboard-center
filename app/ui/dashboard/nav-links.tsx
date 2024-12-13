'use client';

// import {
//   UserGroupIcon,
//   HomeIcon,
//   DocumentDuplicateIcon,
//   TruckIcon
// } from '@heroicons/react/24/outline';
import { BsFuelPump } from 'react-icons/bs'
import { PiTruck, PiBulldozer } from "react-icons/pi";
import { GiDiamondHard } from "react-icons/gi";
import { RiHome3Line } from "react-icons/ri";
// import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
// import { FiUsers } from "react-icons/fi";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: RiHome3Line },
  { name: 'Production', href: '/dashboard/production', icon: GiDiamondHard },
  { name: 'Hauls', href: '/dashboard/hauls', icon: PiTruck },
  { name: 'Fuel', href: '/dashboard/fuels', icon: BsFuelPump },
  { name: 'Equipment', href: '/dashboard/equipment', icon: PiBulldozer },
  // { name: 'Equipment', href: '/dashboard/equipment', icon: PiBulldozer },
  // {
  //   name: 'Invoices',
  //   href: '/dashboard/invoices',
  //   icon: HiOutlineDocumentDuplicate,
  // },
  // { name: 'Employees', href: '/dashboard/employees', icon: FiUsers },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6 h-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
