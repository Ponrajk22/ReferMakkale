import Header from '@/components/Header';
import BusinessCard from '@/components/BusinessCard';
import { getPopularCategories, getFeaturedBusinesses, getBusinessStats } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const popularCategories = getPopularCategories(8);
  const featuredBusinesses = getFeaturedBusinesses(6);
  const stats = getBusinessStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                ReferMakkale
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-2">Melbourne Community Business Directory</p>
              <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-blue-100">
                A community-driven business directory where families in Melbourne 
                share trusted business recommendations. Every listing comes from real 
                community members who have used these services.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href="/businesses"
                  className="bg-white text-blue-600 px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
                >
                  Browse Businesses
                </Link>
                <Link
                  href="https://docs.google.com/spreadsheets/d/1ZVk5ysTDmmGzITMk14NVexYN_sQhd7emS4hXSV43r9s/edit?gid=0#gid=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm md:text-base"
                >
                  Add Your Business
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Hidden to save space */}
        {/* 
        <section className="py-8 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{stats.totalBusinesses}</div>
                <div className="text-gray-600 text-sm md:text-base">Businesses Listed</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{stats.communityOwnedBusinesses}</div>
                <div className="text-gray-600 text-sm md:text-base">Community Owned</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{stats.verifiedBusinesses}</div>
                <div className="text-gray-600 text-sm md:text-base">Verified</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{stats.totalSuburbs}</div>
                <div className="text-gray-600 text-sm md:text-base">Suburbs Covered</div>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Categories Section */}
        <section className="py-10 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by Category</h2>
              <p className="mt-2 md:mt-4 text-sm md:text-lg text-gray-600">
                Find exactly what you're looking for in your local community
              </p>
            </div>
            
            {/* Mobile-First Responsive Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {popularCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md active:shadow-lg transition-all duration-200 
                             p-4 sm:p-5 md:p-6 text-center group 
                             min-h-[120px] sm:min-h-[130px] md:min-h-[140px]
                             hover:scale-[1.02] active:scale-[0.98]
                             border border-gray-100 hover:border-blue-200
                             touch-manipulation"
                >
                  {/* Icon */}
                  <div className="text-3xl sm:text-4xl md:text-4xl mb-2 md:mb-3 
                                  group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  
                  {/* Category Name */}
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 
                                 mb-1 md:mb-2 group-hover:text-blue-600 transition-colors
                                 leading-tight">
                    {category.name}
                  </h3>
                  
                  {/* Local Name */}
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 
                                leading-tight">
                    {category.localName}
                  </p>
                  
                  {/* Description - Hidden on mobile, visible on larger screens */}
                  <p className="text-xs text-gray-500 hidden md:block leading-tight">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
            
            {/* View All Categories Link */}
            <div className="text-center mt-6 md:mt-8">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center
                           bg-blue-600 text-white px-6 py-3 rounded-lg 
                           font-medium text-sm md:text-base
                           hover:bg-blue-700 active:bg-blue-800
                           transition-colors duration-200
                           min-h-[44px] touch-manipulation
                           shadow-sm hover:shadow-md"
              >
                View All Categories →
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Businesses */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Community Businesses</h2>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600">
                Highly rated and trusted by our community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-12">
              <Link
                href="/businesses"
                className="bg-blue-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                View All Businesses
              </Link>
            </div>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Community-Powered Platform</h2>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600">
                Built by community members, for community members
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-5xl mb-3 md:mb-4">🤝</div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Community Driven
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Anyone can contribute business listings, reviews, and updates through our web interface or directly via GitHub.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-5xl mb-3 md:mb-4">🔓</div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Open Source & Free
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Completely free to use and contribute. All data is stored in Git and the platform is hosted on GitHub Pages.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl md:text-5xl mb-3 md:mb-4">📍</div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Community Focus
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Focused specifically on community businesses and services in Melbourne, with multilingual support and cultural understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 md:py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Help Build Our Community Directory</h2>
            <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8">
              Know a great business that's not listed? Help other community members discover it!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                href="https://docs.google.com/spreadsheets/d/1ZVk5ysTDmmGzITMk14NVexYN_sQhd7emS4hXSV43r9s/edit?gid=0#gid=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm md:text-base"
              >
                Add a Business
              </Link>
              <Link
                href="/contribute"
                className="bg-white text-blue-600 px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
              >
                Learn How to Contribute
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-3 md:mb-4">ReferMakkale</h3>
              <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                                A community-driven business directory for families in Melbourne. 
                Find trusted local businesses recommended by your community.
              </p>
              <p className="text-gray-400 text-xs md:text-sm">
                மேற்கு மெல்போர்ன் தமிழ் Business Directory
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-3 md:mb-4">Quick Links</h4>
              <div className="space-y-1 md:space-y-2">
                <Link href="/businesses" className="text-gray-300 hover:text-white block text-sm">All Businesses</Link>
                <Link href="/categories" className="text-gray-300 hover:text-white block text-sm">Categories</Link>
                <Link href="/suburbs" className="text-gray-300 hover:text-white block text-sm">Suburbs</Link>
                <Link href="https://docs.google.com/spreadsheets/d/1ZVk5ysTDmmGzITMk14NVexYN_sQhd7emS4hXSV43r9s/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white block text-sm">Add Business</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-3 md:mb-4">Community</h4>
              <div className="space-y-1 md:space-y-2">
                <Link href="/contribute" className="text-gray-300 hover:text-white block text-sm">Contribute</Link>
                <Link href="/about" className="text-gray-300 hover:text-white block text-sm">About</Link>
                <a href="https://github.com/Ponrajk22/ReferMakkale" className="text-gray-300 hover:text-white block text-sm">GitHub</a>
                <Link href="/contact" className="text-gray-300 hover:text-white block text-sm">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-300">
            <p className="text-xs md:text-sm">&copy; 2025 ReferMakkale. Open source community project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
