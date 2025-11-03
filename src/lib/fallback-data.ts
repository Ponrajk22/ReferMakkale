import { Business, Category, Review, Suburb } from '@/types';

// Fallback static data for development
export const businesses: Business[] = [
  {
    id: "saravana-bhavan-glen-waverley",
    name: "Saravana Bhavan",
    localName: "சரவணா பவன்",
    description: "Authentic South Indian vegetarian restaurant chain known for its traditional recipes and excellent service. Family-friendly atmosphere with a wide variety of dosas, idlis, and curries.",
    category: "restaurants",
    subcategory: "south-indian",
    location: {
      address: "123 Springvale Road",
      suburb: "Glen Waverley",
      state: "VIC",
      postcode: "3150",
      city: "Melbourne"
    },
    contact: {
      phone: "+61 3 9560 1234",
      email: "glenwaverley@saravanabhavan.com.au",
      website: "https://saravanabhavan.com.au",
      facebook: "https://facebook.com/saravanabhavan",
      instagram: "https://instagram.com/saravanabhavan"
    },
    rating: 4.5,
    reviewCount: 150,
    priceRange: "$$",
    communityOwned: true,
    verified: true,
    languages: ["English", "Tamil", "Hindi"],
    tags: ["vegetarian", "halal", "family-friendly", "authentic"],
    features: ["parking", "wheelchair-accessible", "takeaway", "delivery"],
    hours: {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 10:00 PM",
      friday: "11:00 AM - 11:00 PM",
      saturday: "11:00 AM - 11:00 PM",
      sunday: "11:00 AM - 10:00 PM"
    },
    reviews: [
      {
        id: "review-1",
        businessId: "saravana-bhavan-glen-waverley",
        author: "Priya S.",
        rating: 5,
        title: "Excellent Service",
        comment: "Excellent food and service! The dosas are crispy and the chutneys are perfect. Staff speaks Tamil which makes ordering easy.",
        localComment: "சிறந்த உணவு மற்றும் சேவை! தோசைகள் மிருதுவாக உள்ளன.",
        date: "2024-01-10",
        helpful: 3,
        verified: true
      },
      {
        id: "review-2",
        businessId: "saravana-bhavan-glen-waverley",
        author: "Rajesh M.",
        rating: 4,
        title: "Great Food",
        comment: "Great ambiance and authentic taste. A bit crowded during weekends but worth the wait.",
        date: "2024-01-05",
        helpful: 2,
        verified: true
      }
    ],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
    createdBy: "admin"
  },
  {
    id: "tamil-medical-centre-clayton",
    name: "Tamil Medical Centre",
    localName: "தமிழ் மருத்துவ மையம்",
    description: "Comprehensive healthcare services with Tamil-speaking doctors. Specializing in general practice, pediatrics, and women's health.",
    category: "healthcare",
    subcategory: "medical-centers",
    location: {
      address: "456 Clayton Road",
      suburb: "Clayton",
      state: "VIC",
      postcode: "3168",
      city: "Melbourne"
    },
    contact: {
      phone: "+61 3 9544 5678",
      email: "info@tamilmedical.com.au",
      website: "https://tamilmedical.com.au"
    },
    rating: 4.8,
    reviewCount: 89,
    priceRange: "$$",
    communityOwned: true,
    verified: true,
    languages: ["English", "Tamil"],
    tags: ["bulk-billing", "family-practice", "pediatrics"],
    features: ["wheelchair-accessible", "parking", "online-booking"],
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed"
    },
    reviews: [
      {
        id: "review-3",
        businessId: "tamil-medical-centre-clayton",
        author: "Kamala R.",
        rating: 5,
        title: "Excellent with children",
        comment: "Dr. Tamil is excellent with children. Very patient and explains everything in Tamil when needed.",
        date: "2024-01-08",
        helpful: 2,
        verified: true
      }
    ],
    createdAt: "2023-12-15",
    updatedAt: "2024-01-12",
    createdBy: "admin"
  },
  {
    id: "bharatha-tutorials-box-hill",
    name: "Bharatha Tutorials",
    localName: "பாரத பயிற்சி மையம்",
    description: "Tamil language and cultural education for children. Offering Tamil reading, writing, classical music, and dance classes.",
    category: "education",
    subcategory: "tutoring",
    location: {
      address: "789 Whitehorse Road",
      suburb: "Box Hill",
      state: "VIC",
      postcode: "3128",
      city: "Melbourne"
    },
    contact: {
      phone: "+61 3 9899 9876",
      email: "info@bharathatutorials.com.au",
      facebook: "https://facebook.com/bharathatutorials"
    },
    rating: 4.7,
    reviewCount: 45,
    priceRange: "$",
    communityOwned: true,
    verified: true,
    languages: ["English", "Tamil"],
    tags: ["tamil-language", "cultural-education", "children"],
    features: ["weekend-classes", "performance-opportunities"],
    hours: {
      monday: "Closed",
      tuesday: "Closed",
      wednesday: "Closed",
      thursday: "Closed",
      friday: "Closed",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "9:00 AM - 3:00 PM"
    },
    reviews: [
      {
        id: "review-4",
        businessId: "bharatha-tutorials-box-hill",
        author: "Meera V.",
        rating: 5,
        title: "Great Tamil classes",
        comment: "My daughter loves the Tamil classes here. Teachers are very dedicated and patient.",
        localComment: "என் மகளுக்கு இங்கு தமிழ் வகுப்புகள் மிகவும் பிடிக்கும்.",
        date: "2024-01-03",
        helpful: 4,
        verified: true
      }
    ],
    createdAt: "2023-11-20",
    updatedAt: "2024-01-10",
    createdBy: "admin"
  },
  {
    id: "krishna-sweets-dandenong",
    name: "Krishna Sweets",
    localName: "கிருஷ்ணா இனிப்புகள்",
    description: "Traditional South Indian sweets and snacks. Fresh laddu, mysore pak, and special occasion catering available.",
    category: "food-retail",
    subcategory: "sweets-snacks",
    location: {
      address: "321 Lonsdale Street",
      suburb: "Dandenong",
      state: "VIC",
      postcode: "3175",
      city: "Melbourne"
    },
    contact: {
      phone: "+61 3 9791 2468",
      email: "orders@krishnasweets.com.au",
      instagram: "https://instagram.com/krishnasweets"
    },
    rating: 4.3,
    reviewCount: 67,
    priceRange: "$",
    communityOwned: true,
    verified: false,
    languages: ["English", "Tamil", "Telugu"],
    tags: ["traditional", "fresh", "catering"],
    features: ["custom-orders", "party-platters"],
    hours: {
      monday: "9:00 AM - 8:00 PM",
      tuesday: "9:00 AM - 8:00 PM",
      wednesday: "9:00 AM - 8:00 PM",
      thursday: "9:00 AM - 8:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "8:00 AM - 9:00 PM",
      sunday: "8:00 AM - 8:00 PM"
    },
    reviews: [
      {
        id: "review-5",
        businessId: "krishna-sweets-dandenong",
        author: "Ravi K.",
        rating: 4,
        title: "Good quality sweets",
        comment: "Good quality sweets, especially during festival seasons. Prices are reasonable.",
        date: "2023-12-28",
        helpful: 1,
        verified: false
      }
    ],
    createdAt: "2023-10-05",
    updatedAt: "2024-01-05",
    createdBy: "admin"
  }
];

export const categories: Category[] = [
  {
    id: "restaurants",
    name: "Restaurants",
    localName: "உணவகங்கள்",
    description: "Food and dining establishments",
    slug: "restaurants",
    icon: "utensils",
    color: "#ff6b6b",
    businessCount: 15,
    subcategories: [
      {
        id: "south-indian",
        name: "South Indian",
        localName: "தென்னிந்திய",
        slug: "south-indian",
        description: "South Indian cuisine"
      },
      {
        id: "north-indian",
        name: "North Indian", 
        localName: "வட இந்திய",
        slug: "north-indian",
        description: "North Indian cuisine"
      },
      {
        id: "sri-lankan",
        name: "Sri Lankan",
        localName: "இலங்கை",
        slug: "sri-lankan",
        description: "Sri Lankan cuisine"
      }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    localName: "மருத்துவம்",
    description: "Medical and health services",
    slug: "healthcare",
    icon: "heart",
    color: "#4ecdc4",
    businessCount: 8,
    subcategories: [
      {
        id: "medical-centers",
        name: "Medical Centers",
        localName: "மருத்துவ மையங்கள்",
        slug: "medical-centers",
        description: "Medical centers and clinics"
      },
      {
        id: "dental",
        name: "Dental",
        localName: "பல் மருத்துவம்",
        slug: "dental",
        description: "Dental services"
      }
    ]
  },
  {
    id: "education",
    name: "Education",
    localName: "கல்வி",
    description: "Educational services and tutoring",
    slug: "education", 
    icon: "book",
    color: "#45b7d1",
    businessCount: 12,
    subcategories: [
      {
        id: "tutoring",
        name: "Tutoring",
        localName: "பயிற்சி",
        slug: "tutoring",
        description: "Tutoring services"
      },
      {
        id: "language-schools",
        name: "Language Schools",
        localName: "மொழி பள்ளிகள்",
        slug: "language-schools",
        description: "Language learning schools"
      }
    ]
  },
  {
    id: "food-retail",
    name: "Food & Retail",
    localName: "உணவு & விற்பனை",
    description: "Grocery stores and food retail",
    slug: "food-retail",
    icon: "shopping-cart",
    color: "#f7b731",
    businessCount: 6,
    subcategories: [
      {
        id: "sweets-snacks",
        name: "Sweets & Snacks",
        localName: "இனிப்புகள் & தின்பண்டங்கள்",
        slug: "sweets-snacks",
        description: "Sweets and snacks"
      },
      {
        id: "grocery",
        name: "Grocery",
        localName: "மளிகை",
        slug: "grocery",
        description: "Grocery stores"
      }
    ]
  }
];

export const suburbs: Suburb[] = [
  { name: "Glen Waverley", postcode: "3150", businessCount: 15, popularCategories: ["restaurants", "healthcare"] },
  { name: "Clayton", postcode: "3168", businessCount: 8, popularCategories: ["healthcare", "education"] },
  { name: "Box Hill", postcode: "3128", businessCount: 12, popularCategories: ["education", "restaurants"] },
  { name: "Dandenong", postcode: "3175", businessCount: 6, popularCategories: ["food-retail", "restaurants"] },
  { name: "Springvale", postcode: "3171", businessCount: 10, popularCategories: ["restaurants", "food-retail"] },
  { name: "Noble Park", postcode: "3174", businessCount: 4, popularCategories: ["restaurants"] },
  { name: "Keysborough", postcode: "3173", businessCount: 7, popularCategories: ["healthcare", "education"] },
  { name: "Casey", postcode: "3199", businessCount: 9, popularCategories: ["restaurants", "healthcare"] }
];
