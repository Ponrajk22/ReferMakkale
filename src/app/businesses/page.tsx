'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import BusinessCard from '@/components/BusinessCard';
import SearchBar from '@/components/SearchBar';
import { getAllBusinesses, searchBusinesses } from '@/lib/data';
import { Business, SearchFilters } from '@/types';

export default function BusinessesPage() {
  const allBusinesses = getAllBusinesses();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'recent'>('name');

  // Filter and sort businesses
  const filteredAndSortedBusinesses = useMemo(() => {
    let businesses = searchFilters && Object.keys(searchFilters).length > 0
      ? searchBusinesses(searchFilters)
      : allBusinesses;

    // Sort businesses
    switch (sortBy) {
      case 'rating':
        businesses = [...businesses].sort((a, b) => b.rating - a.rating);
        break;
      case 'recent':
        businesses = [...businesses].sort((a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      default:
        businesses = [...businesses].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return businesses;
  }, [searchFilters, sortBy, allBusinesses]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl mb-4">
            Browse Businesses
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover trusted businesses in Melbourne recommended by our community
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar 
            onSearch={setSearchFilters}
            initialFilters={searchFilters}
          />
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredAndSortedBusinesses.length} Business{filteredAndSortedBusinesses.length !== 1 ? 'es' : ''}
              </h2>
              <p className="text-gray-600 mt-1">
                Showing results for your search
              </p>
            </div>
            
            {/* Sort dropdown for mobile */}
            <div className="mt-4 sm:mt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'recent')}
                className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>
          </div>

          {/* Active filters */}
          {(searchFilters.category || searchFilters.suburb || searchFilters.rating || searchFilters.communityOwned || searchFilters.verified) && (
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Active Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {searchFilters.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    Category: {searchFilters.category}
                    <button
                      onClick={() => setSearchFilters({ ...searchFilters, category: undefined })}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {searchFilters.suburb && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Suburb: {searchFilters.suburb}
                    <button
                      onClick={() => setSearchFilters({ ...searchFilters, suburb: undefined })}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {searchFilters.rating && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    Rating: {searchFilters.rating}+ stars
                    <button
                      onClick={() => setSearchFilters({ ...searchFilters, rating: undefined })}
                      className="ml-2 text-yellow-600 hover:text-yellow-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {searchFilters.communityOwned && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                    Community Owned
                    <button
                      onClick={() => setSearchFilters({ ...searchFilters, communityOwned: undefined })}
                      className="ml-2 text-orange-600 hover:text-orange-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {searchFilters.verified && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    Verified
                    <button
                      onClick={() => setSearchFilters({ ...searchFilters, verified: undefined })}
                      className="ml-2 text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                <button
                  onClick={() => setSearchFilters({})}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Business grid */}
          {filteredAndSortedBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedBusinesses.map((business: Business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                No businesses found matching your criteria
              </div>
              <button
                onClick={() => setSearchFilters({})}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Clear filters and show all businesses
              </button>
            </div>
          )}

          {/* Load more button (for future pagination) */}
          {filteredAndSortedBusinesses.length > 0 && filteredAndSortedBusinesses.length >= 20 && (
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Load More Businesses
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
