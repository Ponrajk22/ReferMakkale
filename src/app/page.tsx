export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">ReferMakkale</h1>
          <p className="text-blue-100">மேற்கு மெல்போர்ன் தமிழ் Business Directory</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">
            Welcome to ReferMakkale
          </h2>
          <p className="text-gray-700 mb-6">
            A community-driven business directory where Tamil families in Melbourne 
            share trusted business recommendations. Every listing comes from real 
            community members who have used these services.
          </p>
        </section>

        {/* Search Section */}
        <section className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-black mb-4">
            Find Trusted Businesses
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search businesses by name, category, or service..."
              className="flex-1 p-3 border border-gray-300 rounded-lg text-black"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </section>

        {/* Categories Preview */}
        <section>
          <h3 className="text-xl font-semibold text-black mb-4">
            Popular Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-md">
              <h4 className="font-medium text-black">Restaurants</h4>
              <p className="text-gray-600 text-sm">Tamil cuisine & more</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-md">
              <h4 className="font-medium text-black">Healthcare</h4>
              <p className="text-gray-600 text-sm">Doctors & clinics</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-md">
              <h4 className="font-medium text-black">Education</h4>
              <p className="text-gray-600 text-sm">Tuition & classes</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-md">
              <h4 className="font-medium text-black">Services</h4>
              <p className="text-gray-600 text-sm">Auto, beauty & more</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
