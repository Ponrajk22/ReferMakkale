import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-2xl">🏪</div>
              <div>
                <h1 className="text-2xl font-bold">ReferMakkale</h1>
                <p className="text-blue-100 text-sm">மேற்கு மெல்போர்ன் தமிழ் Business Directory</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
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
          <div className="flex items-center space-x-4">
            <Link 
              href="https://docs.google.com/spreadsheets/d/1ZVk5ysTDmmGzITMk14NVexYN_sQhd7emS4hXSV43r9s/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Add Business
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-md hover:bg-blue-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <nav className="flex flex-col space-y-2">
            <Link href="/businesses" className="text-white hover:text-blue-200 transition-colors py-2">
              All Businesses
            </Link>
            <Link href="/categories" className="text-white hover:text-blue-200 transition-colors py-2">
              Categories
            </Link>
            <Link href="/suburbs" className="text-white hover:text-blue-200 transition-colors py-2">
              Suburbs
            </Link>
            <Link href="/about" className="text-white hover:text-blue-200 transition-colors py-2">
              About
            </Link>
            <Link href="/contribute" className="text-white hover:text-blue-200 transition-colors py-2">
              Contribute
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
