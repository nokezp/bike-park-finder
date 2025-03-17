'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-primary text-white shadow-md" data-testid="header">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            BikePark Finder
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link 
              href="/parks" 
              className={`hover:text-gray-200 transition-colors ${isActive('/parks') ? 'font-bold' : ''}`}
            >
              Parks
            </Link>
            <Link 
              href="/events" 
              className={`hover:text-gray-200 transition-colors ${isActive('/events') ? 'font-bold' : ''}`}
            >
              Events
            </Link>
            <Link 
              href="/about" 
              className={`hover:text-gray-200 transition-colors ${isActive('/about') ? 'font-bold' : ''}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`hover:text-gray-200 transition-colors ${isActive('/contact') ? 'font-bold' : ''}`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/profile" 
              className="hover:text-gray-200 transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 