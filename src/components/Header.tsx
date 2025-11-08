'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3" onClick={closeMenu}>
              <div className="text-xl md:text-2xl">🏪</div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">ReferMakkale</h1>
                <p className="text-blue-100 text-xs md:text-sm hidden sm:block">மேற்கு மெல்போர்ன் தமிழ் Business Directory</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/businesses" className="text-white hover:text-blue-200 transition-colors">
              All Businesses
            </Link>
            <Link href="/categories" className="text-white hover:text-blue-200 transition-colors">
              Categories
            </Link>
            <Link href="/suburbs" className="text-white hover:text-blue-200 transition-colors">
              Suburbs
            </Link>
            <Link href="/about" className="text-white hover:text-blue-200 transition-colors">
              About
            </Link>
            <Link href="/contribute" className="text-white hover:text-blue-200 transition-colors">
              Contribute
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop Add Business Button */}
            <Link 
              href="https://docs.google.com/spreadsheets/d/1ZVk5ysTDmmGzITMk14NVexYN_sQhd7emS4hXSV43r9s/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Add Business
            </Link>
            
            {/* Mobile Add Business Button (compact) */}
            <Link 
              href="https://docs.google.com/spreadsheets/d/1ZVk5ysTDmmGzITMk14NVexYN_sQhd7emS4hXSV43r9s/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden bg-orange-500 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-orange-600 transition-colors"
              onClick={closeMenu}
            >
              Add
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg 
                className={`w-5 h-5 transform transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Collapsible */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <nav className="pb-4 pt-2 border-t border-blue-500">
            <div className="flex flex-col space-y-1">
              <Link 
                href="/businesses" 
                className="text-white hover:text-blue-200 hover:bg-blue-700 transition-all py-2 px-3 rounded-md"
                onClick={closeMenu}
              >
                All Businesses
              </Link>
              <Link 
                href="/categories" 
                className="text-white hover:text-blue-200 hover:bg-blue-700 transition-all py-2 px-3 rounded-md"
                onClick={closeMenu}
              >
                Categories
              </Link>
              <Link 
                href="/suburbs" 
                className="text-white hover:text-blue-200 hover:bg-blue-700 transition-all py-2 px-3 rounded-md"
                onClick={closeMenu}
              >
                Suburbs
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-blue-200 hover:bg-blue-700 transition-all py-2 px-3 rounded-md"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                href="/contribute" 
                className="text-white hover:text-blue-200 hover:bg-blue-700 transition-all py-2 px-3 rounded-md"
                onClick={closeMenu}
              >
                Contribute
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
