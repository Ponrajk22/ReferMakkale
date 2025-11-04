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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                ReferMakkale
              </h1>
              <p className="text-xl text-blue-100 mb-2">Melbourne Community Business Directory</p>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-blue-100">
                A community-driven business directory where families in Melbourne 
                share trusted business recommendations. Every listing comes from real 
                community members who have used these services.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/businesses"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Browse Businesses
                </Link>
                <Link
                  href="https://docs.google.com/spreadsheets/d/1ZVk5ysTDmmGzITMk14NVexYN_sQhd7emS4hXSV43r9s/edit?gid=0#gid=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  Add Your Business
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">{stats.totalBusinesses}</div>
                <div className="text-gray-600">Businesses Listed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{stats.communityOwnedBusinesses}</div>
                <div className="text-gray-600">Community Owned</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{stats.verifiedBusinesses}</div>
                <div className="text-gray-600">Verified</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{stats.totalSuburbs}</div>
                <div className="text-gray-600">Suburbs Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
              <p className="mt-4 text-lg text-gray-600">
                Find exactly what you're looking for in your local community
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {popularCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{category.localName}</p>
                  <p className="text-xs text-gray-500">{category.description}</p>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/categories"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Categories →
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Businesses */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Featured Community Businesses</h2>
              <p className="mt-4 text-lg text-gray-600">
                Highly rated and trusted by our community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/businesses"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Businesses
              </Link>
            </div>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Community-Powered Platform</h2>
              <p className="mt-4 text-lg text-gray-600">
                Built by community members, for community members
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Community Driven
                </h3>
                <p className="text-gray-600">
                  Anyone can contribute business listings, reviews, and updates through our web interface or directly via GitHub.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">🔓</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Open Source & Free
                </h3>
                <p className="text-gray-600">
                  Completely free to use and contribute. All data is stored in Git and the platform is hosted on GitHub Pages.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">📍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Community Focus
                </h3>
                <p className="text-gray-600">
                  Focused specifically on community businesses and services in Melbourne, with multilingual support and cultural understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Help Build Our Community Directory</h2>
            <p className="text-xl text-blue-100 mb-8">
              Know a great business that's not listed? Help other community members discover it!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://docs.google.com/spreadsheets/d/1ZVk5ysTDmmGzITMk14NVexYN_sQhd7emS4hXSV43r9s/edit?gid=0#gid=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Add a Business
              </Link>
              <Link
                href="/contribute"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Learn How to Contribute
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">ReferMakkale</h3>
              <p className="text-gray-300 mb-4">
                                A community-driven business directory for families in Melbourne. 
                Find trusted local businesses recommended by your community.
              </p>
              <p className="text-gray-400 text-sm">
                மேற்கு மெல்போர்ன் தமிழ் Business Directory
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/businesses" className="text-gray-300 hover:text-white block">All Businesses</Link>
                <Link href="/categories" className="text-gray-300 hover:text-white block">Categories</Link>
                <Link href="/suburbs" className="text-gray-300 hover:text-white block">Suburbs</Link>
                <Link href="https://docs.google.com/spreadsheets/d/1ZVk5ysTDmmGzITMk14NVexYN_sQhd7emS4hXSV43r9s/edit?gid=0#gid=0" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white block">Add Business</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Community</h4>
              <div className="space-y-2">
                <Link href="/contribute" className="text-gray-300 hover:text-white block">Contribute</Link>
                <Link href="/about" className="text-gray-300 hover:text-white block">About</Link>
                <a href="https://github.com/Ponrajk22/ReferMakkale" className="text-gray-300 hover:text-white block">GitHub</a>
                <Link href="/contact" className="text-gray-300 hover:text-white block">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 ReferMakkale. Open source community project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
