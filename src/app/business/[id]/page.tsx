import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { getAllBusinesses, getBusinessById } from '@/lib/data';

interface BusinessPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const businesses = getAllBusinesses();
  return businesses.map((business) => ({
    id: business.id,
  }));
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { id } = await params;
  const business = getBusinessById(id);

  if (!business) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/businesses"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Businesses
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{business.name}</h1>
          
          {business.localName && (
            <p className="text-xl text-gray-600 mb-4">{business.localName}</p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {business.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            
            {business.communityOwned && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                Community Owned
              </span>
            )}
            
            {business.verified && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                ✓ Verified
              </span>
            )}
          </div>

          <p className="text-gray-600 text-lg mb-6">{business.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
              <div className="space-y-2">
                {business.contact.phone && (
                  <p className="text-gray-600">📞 {business.contact.phone}</p>
                )}
                {business.contact.website && (
                  <p className="text-gray-600">
                    🌐 <a href={business.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Visit Website
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <div className="text-gray-600">
                {business.location.address && <p>{business.location.address}</p>}
                <p>{business.location.suburb}, {business.location.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
