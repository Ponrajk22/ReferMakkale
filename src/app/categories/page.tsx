import Link from 'next/link';
import Header from '@/components/Header';
import { getAllCategories } from '@/lib/data';
import { Category } from '@/types';

// Helper function to get appropriate emoji for category
function getCategoryIcon(categoryId: string): string {
  const iconMap: Record<string, string> = {
    'real-estate-agents': '🏠',
    'mortgage-broker': '💰', 
    'plumbers': '🔧',
    'cabinet-maker---carpenter': '🔨',
    'cleaners': '🧽',
    'childcare-and-early-learning': '👶',
    'electricians': '⚡',
    'gutter-and-roofing-services': '🏠',
    'aircon-evaporative': '❄️',
    'car-mechanics-and-repairs': '🚗',
    'dentists': '🦷',
    'health-and-wellness': '🏥',
    'restaurants': '🍽️',
    'cafes': '☕',
    'beauty-and-personal-care': '💄',
    'education': '📚',
    'fitness': '💪',
    'legal-services': '⚖️',
    'financial-services': '💼',
    'technology': '💻',
    'transport': '🚌',
    'retail': '🛍️',
    'entertainment': '🎪'
  };
  
  return iconMap[categoryId] || '💼';
}

export const metadata = {
  title: 'All Categories - ReferMakkale',
  description: 'Browse all business categories in Melbourne. Find exactly what you\'re looking for in your local community.',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900">Categories</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Business Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover trusted local businesses across Melbourne. Browse by category to find exactly what you need in your community.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            <span className="font-semibold text-blue-600">{categories.length}</span>
            <span className="ml-1">
              {categories.length === 1 ? 'Category' : 'Categories'} Available
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
            >
              <div className="text-4xl mb-4">
                {getCategoryIcon(category.id)}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                {category.name}
              </h3>
              {category.localName && (
                <p className="text-sm text-gray-600 mb-2">{category.localName}</p>
              )}
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                {category.description}
              </p>
              <div className="text-xs text-blue-600 font-medium">
                {category.businessCount || 0} 
                {' '}
                {(category.businessCount || 0) === 1 ? 'Business' : 'Businesses'}
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Additional Actions */}
        <div className="bg-blue-50 rounded-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-6">
            Help us grow our community directory by suggesting new categories or adding your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/businesses"
              className="inline-flex items-center px-6 py-3 border border-blue-300 rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Browse All Businesses
            </Link>
            <Link
              href="/contribute"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Your Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
