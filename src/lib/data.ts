import { Business, Category, Review, Suburb, SearchFilters } from '@/types';

// Import the JSON data directly
import businessesFile from '@/data/businesses.json';
import categoriesFile from '@/data/categories.json';
import suburbsFile from '@/data/suburbs.json';

// Extract the data arrays
const businessesData: Business[] = (businessesFile as any).businesses || [];
const categoriesData: Category[] = (categoriesFile as any).categories || [];
const suburbsData: Suburb[] = (suburbsFile as any).suburbs || [];

// Get all businesses
export function getAllBusinesses(): Business[] {
  return businessesData;
}

// Get business by ID
export function getBusinessById(id: string): Business | undefined {
  return businessesData.find((business: Business) => business.id === id);
}

// Get businesses by category
export function getBusinessesByCategory(categorySlug: string): Business[] {
  return businessesData.filter((business: Business) => business.category === categorySlug);
}

// Get businesses by subcategory
export function getBusinessesBySubcategory(subcategorySlug: string): Business[] {
  return businessesData.filter((business: Business) => business.subcategory === subcategorySlug);
}

// Get businesses by suburb
export function getBusinessesBySuburb(suburbName: string): Business[] {
  return businessesData.filter((business: Business) => 
    business.location.suburb.toLowerCase() === suburbName.toLowerCase()
  );
}

// Search businesses
export function searchBusinesses(filters: SearchFilters): Business[] {
  let results = businessesData;

  // Text search
  if (filters.query) {
    const query = filters.query.toLowerCase();
    results = results.filter(business =>
      business.name.toLowerCase().includes(query) ||
      business.localName?.toLowerCase().includes(query) ||
      business.description.toLowerCase().includes(query) ||
      business.tags.some(tag => tag.toLowerCase().includes(query)) ||
      business.location.suburb.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (filters.category) {
    results = results.filter(business => business.category === filters.category);
  }

  // Subcategory filter
  if (filters.subcategory) {
    results = results.filter(business => business.subcategory === filters.subcategory);
  }

  // Suburb filter
  if (filters.suburb) {
    results = results.filter(business => 
      business.location.suburb.toLowerCase() === filters.suburb!.toLowerCase()
    );
  }

  // Rating filter
  if (filters.rating) {
    results = results.filter(business => business.rating >= filters.rating!);
  }

  // Price range filter
  if (filters.priceRange) {
    results = results.filter(business => business.priceRange === filters.priceRange);
  }

  // Community owned filter
  if (filters.communityOwned) {
    results = results.filter(business => business.communityOwned === true);
  }

  // Verified filter
  if (filters.verified) {
    results = results.filter(business => business.verified === true);
  }

  // Languages filter
  if (filters.languages && filters.languages.length > 0) {
    results = results.filter(business =>
      filters.languages!.some(lang => business.languages.includes(lang))
    );
  }

  return results;
}

// Get all categories (generated from businesses data)
export function getAllCategories(): Category[] {
  return categoriesData;
}

// Get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categoriesData.find((category: Category) => category.slug === slug);
}

// Get subcategory by slug within a category
export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string) {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find(sub => sub.slug === subcategorySlug);
}

// Get all suburbs (generated from businesses data)
export function getAllSuburbs(): Suburb[] {
  return suburbsData;
}

// Get featured businesses (highest rated)
export function getFeaturedBusinesses(limit: number = 6): Business[] {
  return businessesData
    .sort((a: Business, b: Business) => b.rating - a.rating)
    .slice(0, limit);
}

// Get recent businesses
export function getRecentBusinesses(limit: number = 6): Business[] {
  return businessesData
    .sort((a: Business, b: Business) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

// Get popular categories (with most businesses)
export function getPopularCategories(limit: number = 8): Category[] {
  const categoriesWithCount = categoriesData.map((category: Category) => ({
    ...category,
    businessCount: businessesData.filter((b: Business) => b.category === category.id).length
  }));

  return categoriesWithCount
    .sort((a: any, b: any) => b.businessCount - a.businessCount)
    .slice(0, limit);
}

// Calculate average rating for a business
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// Format business hours for display
export function formatBusinessHours(hours: Business['hours']): string {
  const today = new Date().toLocaleDateString('en', { weekday: 'long' }).toLowerCase();
  const todayHours = hours[today as keyof typeof hours];
  
  if (!todayHours || todayHours === 'Closed') {
    return 'Closed today';
  }
  
  return `Open today: ${todayHours}`;
}

// Check if business is open now
export function isBusinessOpenNow(hours: Business['hours']): boolean {
  const now = new Date();
  const today = now.toLocaleDateString('en', { weekday: 'long' }).toLowerCase();
  const todayHours = hours[today as keyof typeof hours];
  
  if (!todayHours || todayHours === 'Closed') return false;
  
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  // Parse hours like "9:00 AM - 5:00 PM" or "11:30 AM - 3:00 PM, 6:00 PM - 10:00 PM"
  const timeRanges = todayHours.split(',').map(range => range.trim());
  
  for (const range of timeRanges) {
    const [start, end] = range.split(' - ').map(time => {
      const [timeStr, period] = time.trim().split(' ');
      const [hours, minutes] = timeStr.split(':').map(Number);
      let totalMinutes = hours * 60 + minutes;
      
      if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
      if (period === 'AM' && hours === 12) totalMinutes = minutes;
      
      return totalMinutes;
    });
    
    if (currentTime >= start && currentTime <= end) {
      return true;
    }
  }
  
  return false;
}

// Generate business URL slug
export function generateBusinessSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Format price range
export function formatPriceRange(priceRange?: string): string {
  switch (priceRange) {
    case '$': return 'Budget friendly';
    case '$$': return 'Moderate';
    case '$$$': return 'Expensive';
    case '$$$$': return 'Very expensive';
    default: return 'Price not specified';
  }
}

// Get business stats
export function getBusinessStats() {
  return {
    totalBusinesses: businessesData.length,
    totalCategories: categoriesData.length,
    totalSuburbs: suburbsData.length,
    verifiedBusinesses: businessesData.filter((b: Business) => b.verified).length,
    communityOwnedBusinesses: businessesData.filter((b: Business) => b.communityOwned).length,
    averageRating: businessesData.length > 0 
      ? businessesData.reduce((acc: number, b: Business) => acc + b.rating, 0) / businessesData.length 
      : 0
  };
}
