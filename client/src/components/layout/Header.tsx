'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-display text-primary">
            Bike Park Finder
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/parks" 
              className={`nav-link ${pathname === '/parks' ? 'nav-link-active' : ''}`}
            >
              Parks
            </Link>
            <Link 
              href="/about" 
              className={`nav-link ${pathname === '/about' ? 'nav-link-active' : ''}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`nav-link ${pathname === '/contact' ? 'nav-link-active' : ''}`}
            >
              Contact
            </Link>
            <Link 
              href="/login" 
              className={`nav-link ${pathname === '/login' ? 'nav-link-active' : ''}`}
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="btn-primary"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 