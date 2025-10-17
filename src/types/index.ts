export interface Business {
  id: string;
  name: string;
  localName?: string;
  category: string;
  subcategory?: string;
  description: string;
  localDescription?: string;
  location: {
    address: string;
    suburb: string;
    postcode: string;
    state: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
  };
  hours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  languages: string[]; // e.g., ["English", "Mandarin", "Hindi"]
  tags: string[];
  features: string[]; // e.g., ["Halal", "Vegetarian", "Multilingual Staff"]
  rating: number;
  reviewCount: number;
  priceRange?: "$" | "$$" | "$$$" | "$$$$";
  verified: boolean;
  communityOwned: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // GitHub username or community member
  reviews: Review[];
}

export interface Review {
  id: string;
  businessId: string;
  author: string;
  authorEmail?: string;
  rating: number;
  title: string;
  comment: string;
  localComment?: string;
  date: string;
  helpful: number;
  photos?: string[];
  verified: boolean;
  response?: {
    author: string;
    comment: string;
    date: string;
  };
}

export interface Category {
  id: string;
  name: string;
  localName: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  subcategories: Subcategory[];
  businessCount: number;
}

export interface Subcategory {
  id: string;
  name: string;
  localName: string;
  slug: string;
  description: string;
}

export interface Suburb {
  name: string;
  postcode: string;
  businessCount: number;
  popularCategories: string[];
}

export interface SearchFilters {
  query?: string;
  category?: string;
  subcategory?: string;
  suburb?: string;
  rating?: number;
  priceRange?: string;
  communityOwned?: boolean;
  verified?: boolean;
  openNow?: boolean;
  languages?: string[];
}

export interface ContributionForm {
  type: 'business' | 'review' | 'edit';
  data: Partial<Business> | Partial<Review>;
  contributorName: string;
  contributorEmail: string;
  notes?: string;
}
