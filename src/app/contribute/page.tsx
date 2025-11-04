import Link from 'next/link';
import Header from '@/components/Header';

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">Contribute</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Help Build Our Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ReferMakkale grows stronger with your contributions. Join us in creating the most comprehensive business directory for our community in Western Melbourne.
          </p>
        </div>

        {/* Ways to Contribute */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Add Business */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Add a Business</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Know a local business that's not listed? Help us expand our directory by adding new businesses.
            </p>
            <Link 
              href="/add-business"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Add Business →
            </Link>
          </div>

          {/* Report Issues */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Report Issues</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Found incorrect information or a business that's closed? Help us keep our directory accurate.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              Report Issue →
            </Link>
          </div>

          {/* Share Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Share Your Experience</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Help others discover great local businesses by sharing your reviews and experiences.
            </p>
            <Link 
              href="/businesses"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              Browse Businesses →
            </Link>
          </div>

          {/* Spread the Word */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Spread the Word</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Share ReferMakkale with friends, family, and social media to help more people discover local businesses.
            </p>
            <div className="flex space-x-3">
              <button className="text-blue-600 hover:text-blue-700 font-medium">Share on Facebook</button>
              <button className="text-blue-400 hover:text-blue-500 font-medium">Share on Twitter</button>
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Community Guidelines</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">✅ Please Do:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Provide accurate and up-to-date information</li>
                <li>• Be respectful in reviews and comments</li>
                <li>• Add businesses that serve our community</li>
                <li>• Include proper contact details and addresses</li>
                <li>• Use clear, appropriate business photos</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">❌ Please Don't:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Submit false or misleading information</li>
                <li>• Add duplicate business listings</li>
                <li>• Post spam or promotional content</li>
                <li>• Use offensive language or content</li>
                <li>• Add businesses outside Western Melbourne</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-semibold mb-4">Have Questions?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We're here to help! If you have questions about contributing or need assistance with the platform, don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/about"
              className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">நன்றி (Thank You)!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your contributions help strengthen our community in Western Melbourne. 
            Together, we're building something meaningful that connects businesses with families who need them.
          </p>
        </div>
      </main>
    </div>
  );
}

export const metadata = {
  title: 'Contribute - ReferMakkale | Help Build Our Business Community',
  description: 'Join the ReferMakkale community and help build the most comprehensive business directory in Western Melbourne. Add businesses, share reviews, and connect with your community.',
  keywords: 'contribute, local businesses, Western Melbourne, community, business directory, help',
};
