import { google } from 'googleapis';
import { Business, Category, Review, Suburb } from '@/types';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || '1YourSpreadsheetIdHere';
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY || '';

// Initialize Google Sheets API
const sheets = google.sheets({ version: 'v4', auth: API_KEY });

/**
 * Convert Google Sheets row data to Business object
 */
function rowToBusinessObject(row: string[]): Business {
  return {
    id: row[0] || '',
    name: row[1] || '',
    localName: row[2] || '',
    category: row[3] || '',
    subcategory: row[4] || '',
    description: row[5] || '',
    localDescription: row[6] || '',
    location: {
      address: row[7] || '',
      suburb: row[8] || '',
      postcode: row[9] || '',
      state: row[10] || 'VIC',
      city: row[11] || 'Melbourne',
      coordinates: row[12] && row[13] ? {
        lat: parseFloat(row[12]),
        lng: parseFloat(row[13])
      } : undefined
    },
    contact: {
      phone: row[14] || '',
      email: row[15] || '',
      website: row[16] || '',
      facebook: row[17] || '',
      instagram: row[18] || ''
    },
    hours: {
      monday: row[19] || '',
      tuesday: row[20] || '',
      wednesday: row[21] || '',
      thursday: row[22] || '',
      friday: row[23] || '',
      saturday: row[24] || '',
      sunday: row[25] || ''
    },
    languages: row[26] ? row[26].split(',').map(lang => lang.trim()) : ['English'],
    tags: row[27] ? row[27].split(',').map(tag => tag.trim()) : [],
    features: row[28] ? row[28].split(',').map(feature => feature.trim()) : [],
    rating: parseFloat(row[29]) || 0,
    reviewCount: parseInt(row[30]) || 0,
    priceRange: (row[31] as '$' | '$$' | '$$$' | '$$$$') || undefined,
    verified: row[32]?.toLowerCase() === 'true' || false,
    communityOwned: row[33]?.toLowerCase() === 'true' || false,
    createdAt: row[34] || new Date().toISOString(),
    updatedAt: row[35] || new Date().toISOString(),
    createdBy: row[36] || 'community',
    reviews: [] // Reviews will be loaded separately
  };
}

/**
 * Convert Google Sheets row data to Category object
 */
function rowToCategoryObject(row: string[]): Category {
  return {
    id: row[0] || '',
    name: row[1] || '',
    localName: row[2] || '',
    slug: row[3] || '',
    description: row[4] || '',
    icon: row[5] || '📋',
    color: row[6] || '#6B7280',
    businessCount: parseInt(row[7]) || 0,
    subcategories: row[8] ? JSON.parse(row[8]) : []
  };
}

/**
 * Convert Google Sheets row data to Review object
 */
function rowToReviewObject(row: string[]): Review {
  return {
    id: row[0] || '',
    businessId: row[1] || '',
    author: row[2] || '',
    authorEmail: row[3] || '',
    rating: parseInt(row[4]) || 5,
    title: row[5] || '',
    comment: row[6] || '',
    localComment: row[7] || '',
    date: row[8] || new Date().toISOString(),
    helpful: parseInt(row[9]) || 0,
    photos: row[10] ? row[10].split(',').map(photo => photo.trim()) : [],
    verified: row[11]?.toLowerCase() === 'true' || false,
    response: row[12] && row[13] && row[14] ? {
      author: row[12],
      comment: row[13],
      date: row[14]
    } : undefined
  };
}

/**
 * Fetch businesses from Google Sheets
 */
export async function fetchBusinessesFromSheets(): Promise<Business[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Businesses!A2:AK', // Skip header row
    });

    const rows = response.data.values || [];
    const businesses = rows
      .filter(row => row[0] && row[1]) // Must have ID and name
      .map(rowToBusinessObject);

    // Fetch reviews for each business
    const reviews = await fetchReviewsFromSheets();
    businesses.forEach(business => {
      business.reviews = reviews.filter(review => review.businessId === business.id);
    });

    return businesses;
  } catch (error) {
    console.error('Error fetching businesses from Google Sheets:', error);
    // Fallback to local data if Sheets unavailable
    const businessesData = await import('../../data/businesses.json');
    return (businessesData.default as any).businesses as Business[];
  }
}

/**
 * Fetch categories from Google Sheets
 */
export async function fetchCategoriesFromSheets(): Promise<Category[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Categories!A2:I', // Skip header row
    });

    const rows = response.data.values || [];
    return rows
      .filter(row => row[0] && row[1]) // Must have ID and name
      .map(rowToCategoryObject);
  } catch (error) {
    console.error('Error fetching categories from Google Sheets:', error);
    // Fallback to local data
    const categoriesData = await import('../../data/categories.json');
    return (categoriesData.default as any).categories as Category[];
  }
}

/**
 * Fetch reviews from Google Sheets
 */
export async function fetchReviewsFromSheets(): Promise<Review[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Reviews!A2:O', // Skip header row
    });

    const rows = response.data.values || [];
    return rows
      .filter(row => row[0] && row[1]) // Must have ID and business ID
      .map(rowToReviewObject);
  } catch (error) {
    console.error('Error fetching reviews from Google Sheets:', error);
    return [];
  }
}

/**
 * Fetch suburbs from Google Sheets
 */
export async function fetchSuburbsFromSheets(): Promise<Suburb[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Suburbs!A2:D', // Skip header row
    });

    const rows = response.data.values || [];
    return rows
      .filter(row => row[0] && row[1]) // Must have name and postcode
      .map(row => ({
        name: row[0],
        postcode: row[1],
        businessCount: parseInt(row[2]) || 0,
        popularCategories: row[3] ? row[3].split(',').map((cat: string) => cat.trim()) : []
      }));
  } catch (error) {
    console.error('Error fetching suburbs from Google Sheets:', error);
    // Fallback to local data
    const suburbsData = await import('../../data/suburbs.json');
    return (suburbsData.default as any).suburbs as Suburb[];
  }
}

/**
 * Add new business to Google Sheets
 */
export async function addBusinessToSheets(business: Partial<Business>): Promise<boolean> {
  try {
    const row = [
      business.id || `business-${Date.now()}`,
      business.name || '',
      business.localName || '',
      business.category || '',
      business.subcategory || '',
      business.description || '',
      business.localDescription || '',
      business.location?.address || '',
      business.location?.suburb || '',
      business.location?.postcode || '',
      business.location?.state || 'VIC',
      business.location?.city || 'Melbourne',
      business.location?.coordinates?.lat || '',
      business.location?.coordinates?.lng || '',
      business.contact?.phone || '',
      business.contact?.email || '',
      business.contact?.website || '',
      business.contact?.facebook || '',
      business.contact?.instagram || '',
      business.hours?.monday || '',
      business.hours?.tuesday || '',
      business.hours?.wednesday || '',
      business.hours?.thursday || '',
      business.hours?.friday || '',
      business.hours?.saturday || '',
      business.hours?.sunday || '',
      business.languages?.join(', ') || 'English',
      business.tags?.join(', ') || '',
      business.features?.join(', ') || '',
      business.rating || 0,
      business.reviewCount || 0,
      business.priceRange || '',
      business.verified || false,
      business.communityOwned || false,
      business.createdAt || new Date().toISOString(),
      business.updatedAt || new Date().toISOString(),
      business.createdBy || 'community'
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Businesses!A:AK',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    });

    return true;
  } catch (error) {
    console.error('Error adding business to Google Sheets:', error);
    return false;
  }
}

/**
 * Add new review to Google Sheets
 */
export async function addReviewToSheets(review: Partial<Review>): Promise<boolean> {
  try {
    const row = [
      review.id || `review-${Date.now()}`,
      review.businessId || '',
      review.author || '',
      review.authorEmail || '',
      review.rating || 5,
      review.title || '',
      review.comment || '',
      review.localComment || '',
      review.date || new Date().toISOString(),
      review.helpful || 0,
      review.photos?.join(', ') || '',
      review.verified || false,
      review.response?.author || '',
      review.response?.comment || '',
      review.response?.date || ''
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Reviews!A:O',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row]
      }
    });

    return true;
  } catch (error) {
    console.error('Error adding review to Google Sheets:', error);
    return false;
  }
}
