import Link from 'next/link';
import { formatPriceRange, formatBusinessHours, isBusinessOpenNow } from '@/lib/data';
import { Business } from '@/types';

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const isOpen = isBusinessOpenNow(business.hours);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              <Link 
                href={`/business/${business.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {business.name}
              </Link>
            </h3>
            {business.localName && (
              <p className="text-gray-600 text-sm mt-1">
                {business.localName}
              </p>
            )}
          </div>
          
          {/* Rating */}
          {business.rating > 0 && (
            <div className="flex items-center ml-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(business.rating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                ({business.reviewCount})
              </span>
            </div>
          )}
        </div>

        {/* Category and Location */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1">
            {business.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
          <p className="text-sm text-gray-500">
            {business.location.suburb}, {business.location.state}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {business.description}
        </p>

        {/* Tags/Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {business.communityOwned && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 font-medium">
              Community Owned
            </span>
          )}
          {business.verified && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium">
              ✓ Verified
            </span>
          )}
          {isOpen !== null && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              isOpen 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          )}
          {business.priceRange && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 font-medium">
              {business.priceRange}
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          {business.contact.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="truncate">{business.contact.phone}</span>
            </div>
          )}
          {business.contact.website && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              <span className="truncate">Website</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center">
          <Link
            href={`/business/${business.id}`}
            className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            View Details
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {business.languages.length > 0 && (
            <div className="text-xs text-gray-500">
              Languages: {business.languages.slice(0, 2).join(', ')}
              {business.languages.length > 2 && ' +more'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}