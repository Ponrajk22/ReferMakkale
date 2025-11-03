#!/usr/bin/env python3
import os
import json
import requests
from datetime import datetime
from pathlib import Path

# Load environment variables from .env file for local development
def load_env_file():
    """Load environment variables from .env file if it exists"""
    env_file = Path(__file__).parent.parent / '.env.local'
    if env_file.exists():
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value

# Load .env file for local development
load_env_file()

# Configuration - use environment variables for security
SPREADSHEET_ID = os.environ.get('GOOGLE_SHEETS_ID')
API_KEY = os.environ.get('GOOGLE_API_KEY')
BUSINESSES_SHEET_NAME = os.environ.get('BUSINESSES_SHEET_NAME', 'Businesses')
CATEGORIES_SHEET_NAME = os.environ.get('CATEGORIES_SHEET_NAME', 'Categories')

if not SPREADSHEET_ID or not API_KEY:
    print("Error: Missing required environment variables!")
    print("Please set GOOGLE_SHEETS_ID and GOOGLE_API_KEY")
    print("For local development, create a .env.local file based on .env.template")
    print("For GitHub Actions, set these as repository secrets")
    exit(1)

def fetch_sheet_data(sheet_name):
    """Fetch data from Google Sheets API"""
    url = f"https://sheets.googleapis.com/v4/spreadsheets/{SPREADSHEET_ID}/values/{sheet_name}?key={API_KEY}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {sheet_name}: {e}")
        return None

def process_businesses(data):
    """Convert sheet data to business objects using only available data"""
    if not data or 'values' not in data:
        return []
    
    rows = data['values']
    if len(rows) < 2:  # Need header + at least one row
        return []
    
    headers = [h.strip() for h in rows[0]]
    businesses = []
    
    for row_idx, row in enumerate(rows[1:], start=2):
        # Skip empty rows
        if not any(cell.strip() for cell in row if cell):
            continue
            
        # Pad row if it's shorter than headers
        while len(row) < len(headers):
            row.append('')
        
        # Extract data from row - only use what's available
        name = row[0].strip() if len(row) > 0 else ''
        category = row[1].strip() if len(row) > 1 else ''
        description = row[2].strip() if len(row) > 2 else ''
        phone = row[3].strip() if len(row) > 3 else ''
        website = row[4].strip() if len(row) > 4 else ''
        address = row[5].strip() if len(row) > 5 else ''
        additional_info = row[6].strip() if len(row) > 6 else ''
        
        # Skip if no name
        if not name:
            continue
        
        # Create business ID/slug
        business_id = name.lower().replace(' ', '-').replace('&', 'and')
        business_id = ''.join(c for c in business_id if c.isalnum() or c == '-')
        business_id = business_id.strip('-')
        
        # Build description from available info
        full_description = description
        if additional_info and additional_info != description:
            if full_description:
                full_description += f". {additional_info}"
            else:
                full_description = additional_info
        
        # Use category as-is from sheet (no mapping)
        category_slug = category.lower().replace('/', '-').replace(' ', '-').replace('&', 'and')
        category_slug = ''.join(c for c in category_slug if c.isalnum() or c == '-')
        category_slug = category_slug.strip('-')
        
        # Extract suburb from address if available
        suburb = 'Melbourne'  # Default if no address
        if address:
            # Simple extraction - take the last part before state/postcode
            address_parts = [part.strip() for part in address.split(',')]
            if len(address_parts) >= 2:
                suburb = address_parts[-2]
            elif len(address_parts) == 1:
                suburb = address_parts[0]
        
        # Build business object with only available data
        business = {
            "id": business_id,
            "name": name,
            "category": category_slug,
            "location": {
                "address": address if address else "",
                "suburb": suburb,
                "postcode": "",  # Not available in sheet
                "state": "VIC",  # Assume VIC since it's Melbourne focused
                "city": "Melbourne"
            },
            "contact": {},
            "rating": 0,  # Not available in sheet
            "reviewCount": 0,  # Not available in sheet
            "communityOwned": False,  # Not available in sheet
            "verified": False,  # Not available in sheet
            "languages": [],  # Not available in sheet
            "tags": [category] if category else [],
            "features": [],  # Not available in sheet
            "hours": {},  # Not available in sheet
            "reviews": [],  # Not available in sheet
            "createdAt": datetime.now().strftime("%Y-%m-%d"),
            "updatedAt": datetime.now().strftime("%Y-%m-%d"),
            "createdBy": "google-sheets-sync"
        }
        
        # Only add description if available
        if full_description:
            business["description"] = full_description
        else:
            business["description"] = f"{name} - {category}" if category else name
        
        # Only add contact info if available
        if phone:
            business["contact"]["phone"] = phone
        if website:
            business["contact"]["website"] = website
        
        businesses.append(business)
    
    return businesses

def process_categories(businesses):
    """Generate categories based on actual categories from the sheet"""
    # Icon mapping for better category display
    icon_map = {
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
        'entertainment': '🎪',
        'construction': '🏗️',
        'landscaping': '🌱',
        'photography': '📸',
        'catering': '🍽️',
        'accounting': '📊',
        'insurance': '🛡️',
        'pet-services': '🐕',
        'home-services': '🏡',
        'automotive': '🚙',
        'medical': '⚕️',
        'tutoring': '📖',
        'consulting': '💭'
    }
    
    # Color mapping for variety
    color_map = {
        'real-estate-agents': '#3B82F6',
        'mortgage-broker': '#10B981', 
        'plumbers': '#F59E0B',
        'cabinet-maker---carpenter': '#8B5CF6',
        'cleaners': '#06B6D4',
        'childcare-and-early-learning': '#F97316',
        'electricians': '#EF4444',
        'gutter-and-roofing-services': '#6B7280',
        'aircon-evaporative': '#3B82F6',
        'car-mechanics-and-repairs': '#DC2626',
        'dentists': '#059669',
        'health-and-wellness': '#7C3AED',
        'restaurants': '#DC2626',
        'cafes': '#92400E',
        'beauty-and-personal-care': '#EC4899',
        'education': '#2563EB',
        'fitness': '#059669',
        'legal-services': '#374151',
        'financial-services': '#1F2937',
        'technology': '#6366F1',
        'transport': '#0891B2',
        'retail': '#7C2D12',
        'entertainment': '#BE185D'
    }
    
    # Extract unique categories from businesses
    category_counts = {}
    category_names = {}
    
    for business in businesses:
        cat_slug = business['category']
        cat_name = business['tags'][0] if business['tags'] else cat_slug.replace('-', ' ').title()
        
        category_counts[cat_slug] = category_counts.get(cat_slug, 0) + 1
        category_names[cat_slug] = cat_name
    
    categories = []
    for cat_slug, count in category_counts.items():
        if count > 0:  # Only include categories with businesses
            cat_name = category_names[cat_slug]
            
            # Generate better description
            if 'service' not in cat_name.lower():
                description = f"Find trusted {cat_name.lower()} in Melbourne. Quality services from verified local businesses."
            else:
                description = f"Find trusted {cat_name.lower()} in Melbourne. Quality offerings from verified local businesses."
            
            categories.append({
                'id': cat_slug,
                'name': cat_name,
                'localName': '',  # Not available in sheet
                'slug': cat_slug,
                'description': description,
                'icon': icon_map.get(cat_slug, '💼'),  # Use mapped icon or default
                'color': color_map.get(cat_slug, '#4ecdc4'),  # Use mapped color or default
                'subcategories': [],  # Not available in sheet
                'businessCount': count
            })
    
    return categories

def generate_suburbs(businesses):
    """Generate suburbs from actual business address data"""
    suburb_counts = {}
    for business in businesses:
        suburb = business['location']['suburb']
        if suburb and suburb != 'Melbourne':  # Only include specific suburbs
            suburb_counts[suburb] = suburb_counts.get(suburb, 0) + 1
    
    suburbs = []
    for suburb_name, count in suburb_counts.items():
        suburbs.append({
            'name': suburb_name,
            'postcode': '',  # Not available in sheet
            'businessCount': count,
            'popularCategories': []  # Not calculated from sheet
        })
    
    return suburbs

def generate_data_files(businesses, categories, suburbs):
    """Generate JSON data files for the application"""
    # Get the project root directory (parent of scripts directory)
    project_root = Path(__file__).parent.parent
    data_dir = project_root / 'data'
    src_data_dir = project_root / 'src' / 'data'
    
    # Create data directories if they don't exist
    data_dir.mkdir(exist_ok=True)
    src_data_dir.mkdir(exist_ok=True)
    
    # Generate businesses.json
    businesses_data = {
        'last_updated': datetime.now().isoformat(),
        'businesses': businesses
    }
    
    businesses_file = data_dir / 'businesses.json'
    with open(businesses_file, 'w') as f:
        json.dump(businesses_data, f, indent=2)
    
    # Copy to src/data for Next.js imports
    with open(src_data_dir / 'businesses.json', 'w') as f:
        json.dump(businesses_data, f, indent=2)
    
    # Generate categories.json  
    categories_data = {
        'last_updated': datetime.now().isoformat(),
        'categories': categories
    }
    
    categories_file = data_dir / 'categories.json'
    with open(categories_file, 'w') as f:
        json.dump(categories_data, f, indent=2)
    
    # Copy to src/data
    with open(src_data_dir / 'categories.json', 'w') as f:
        json.dump(categories_data, f, indent=2)
    
    # Generate suburbs.json
    suburbs_data = {
        'last_updated': datetime.now().isoformat(),
        'suburbs': suburbs
    }
    
    suburbs_file = data_dir / 'suburbs.json'
    with open(suburbs_file, 'w') as f:
        json.dump(suburbs_data, f, indent=2)
    
    # Copy to src/data
    with open(src_data_dir / 'suburbs.json', 'w') as f:
        json.dump(suburbs_data, f, indent=2)
    
    print(f"Generated data files:")
    print(f"  - {len(businesses)} businesses in {businesses_file} and {src_data_dir / 'businesses.json'}")
    print(f"  - {len(categories)} categories in {categories_file} and {src_data_dir / 'categories.json'}")
    print(f"  - {len(suburbs)} suburbs in {suburbs_file} and {src_data_dir / 'suburbs.json'}")

def main():
    print("Fetching data from Google Sheets...")
    print(f"Sheet ID: {SPREADSHEET_ID}")
    
    # Fetch businesses data
    businesses_data = fetch_sheet_data(BUSINESSES_SHEET_NAME)
    if not businesses_data:
        print("Failed to fetch businesses data")
        return
    
    businesses = process_businesses(businesses_data)
    print(f"Processed {len(businesses)} businesses")
    
    # Generate categories and suburbs based on business data
    categories = process_categories(businesses)
    suburbs = generate_suburbs(businesses)
    
    # Generate data files
    generate_data_files(businesses, categories, suburbs)
    
    print("Data sync complete!")
    print(f"Data last updated: {datetime.now().isoformat()}")

if __name__ == "__main__":
    main()
