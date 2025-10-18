import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import BusinessCard from '@/components/BusinessCard';
import { getAllCategories, getBusinessesByCategory, getCategoryBySlug } from '@/lib/data';
import { Business, Category } from '@/types';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category: Category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - ReferMakkale`,
    description: `Find trusted ${category.name.toLowerCase()} businesses in Melbourne. ${category.description}`,
    openGraph: {
      title: `${category.name} - ReferMakkale`,
      description: `Find trusted ${category.name.toLowerCase()} businesses in Melbourne. ${category.description}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const businesses = getBusinessesByCategory(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-blue-600">Categories</Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {getCategoryIcon(category.id)}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
            {category.localName && (
              <p className="text-xl text-gray-600 mb-4">{category.localName}</p>
            )}
            <p className="text-lg text-gray-600 mb-6">{category.description}</p>
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
              <div>
                <span className="font-semibold text-blue-600">{businesses.length}</span>
                <span className="ml-1">
                  {businesses.length === 1 ? 'Business' : 'Businesses'}
                </span>
              </div>
              {category.businessCount > 0 && (
                <div>
                  <span className="font-semibold text-green-600">{category.businessCount}</span>
                  <span className="ml-1">Listings</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Businesses Grid */}
        {businesses.length > 0 ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {category.name} Businesses
              </h2>
              <p className="text-gray-600">
                {businesses.length} {businesses.length === 1 ? 'business' : 'businesses'} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business: Business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              No businesses found in this category yet
            </div>
            <p className="text-gray-400 mb-6">
              Be the first to add a {category.name.toLowerCase()} business to our community directory!
            </p>
            <Link
              href="/businesses"
              className="inline-flex items-center px-6 py-3 border border-blue-300 rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              Browse All Businesses
            </Link>
          </div>
        )}

        {/* Back to Categories */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Categories
          </Link>
        </div>
      </div>
    </div>
  );
}

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
