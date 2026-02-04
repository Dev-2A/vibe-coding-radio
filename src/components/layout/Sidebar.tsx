'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Timer,
  ListMusic,
  History,
  BarChart3,
  Settings,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', icon: Timer, label: 'Timer' },
  { href: '/music', icon: ListMusic, label: 'Music' },
  { href: '/sessions', icon: History, label: 'Sessions' },
  { href: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-14 bottom-0 z-40 w-16 border-r border-[#2E2B3F] bg-[#1A1726] flex flex-col items-center py-4 gap-1">
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`
              group relative flex h-11 w-11 items-center justify-center rounded-xl
              trainsition-all duration-200
              ${
                isActive
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'text-[#9B97B0] hover:bg-[#242136] hover:text-white'
              }
            `}
          >
            <Icon className="h-5 w-5" />
            {/* 툴팁 */}
            <span className="absolute left-full ml-3 rounded-md bg-[#242136] px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap">
              {label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
