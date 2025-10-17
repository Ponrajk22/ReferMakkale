# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets as the data source for your Tamil community business directory.

## Step 1: Google Cloud Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Sign in with your Google account

2. **Create or Select a Project**
   - Click "Select a project" → "New Project"
   - Enter project name: "Tamil Community Wiki"
   - Click "Create"

3. **Enable Google Sheets API**
   - In the search bar, type "Google Sheets API"
   - Click on it and press "Enable"

4. **Create Service Account**
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Name: "tamil-wiki-service"
   - Description: "Service account for Tamil community wiki"
   - Click "Create and Continue"
   - Skip roles for now, click "Done"

5. **Generate Key File**
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create New Key"
   - Select "JSON" format
   - Download the file (keep it secure!)

## Step 2: Create Google Sheets

### 2.1 Businesses Sheet
Create a new Google Sheet with these columns:

| Column | Description | Example |
|--------|-------------|---------|
| id | Unique identifier | saravana-bhavan-glen-waverley |
| name | Business name | Saravana Bhavan |
| nameInTamil | Tamil name | சரவணா பவன் |
| description | Business description | Authentic South Indian vegetarian restaurant |
| category | Category slug | restaurants |
| subcategory | Subcategory slug | south-indian |
| address | Street address | 123 Main St |
| suburb | Suburb name | Glen Waverley |
| state | State | VIC |
| postcode | Postal code | 3150 |
| country | Country | Australia |
| phone | Phone number | +61 3 1234 5678 |
| email | Email address | contact@saravana.com.au |
| website | Website URL | https://saravana.com.au |
| facebook | Facebook URL | https://facebook.com/saravana |
| instagram | Instagram URL | https://instagram.com/saravana |
| twitter | Twitter URL | |
| linkedin | LinkedIn URL | |
| rating | Average rating (1-5) | 4.5 |
| reviewCount | Number of reviews | 150 |
| priceRange | Price range | $$ |
| tamilOwned | Tamil owned (TRUE/FALSE) | TRUE |
| verified | Verified business (TRUE/FALSE) | TRUE |
| languages | Supported languages | English,Tamil |
| tags | Tags (comma separated) | vegetarian,halal,family-friendly |
| features | Features (comma separated) | parking,wheelchair-accessible,takeaway |
| monday | Monday hours | 11:00 AM - 10:00 PM |
| tuesday | Tuesday hours | 11:00 AM - 10:00 PM |
| wednesday | Wednesday hours | 11:00 AM - 10:00 PM |
| thursday | Thursday hours | 11:00 AM - 10:00 PM |
| friday | Friday hours | 11:00 AM - 11:00 PM |
| saturday | Saturday hours | 11:00 AM - 11:00 PM |
| sunday | Sunday hours | 11:00 AM - 10:00 PM |
| createdAt | Creation date | 2024-01-15 |
| updatedAt | Last update | 2024-01-15 |

### 2.2 Categories Sheet
| Column | Description | Example |
|--------|-------------|---------|
| id | Category ID | restaurants |
| name | Category name | Restaurants |
| nameInTamil | Tamil name | உணவகங்கள் |
| description | Description | Food and dining establishments |
| slug | URL slug | restaurants |
| icon | Icon name | utensils |
| color | Color code | #ff6b6b |
| subcategoryId | Subcategory ID | south-indian |
| subcategoryName | Subcategory name | South Indian |
| subcategoryNameInTamil | Tamil subcategory | தென்னிந்திய |
| subcategorySlug | Subcategory slug | south-indian |

### 2.3 Suburbs Sheet
| Column | Description | Example |
|--------|-------------|---------|
| name | Suburb name | Glen Waverley |
| state | State | VIC |
| postcode | Postal code | 3150 |
| businessCount | Number of businesses | 15 |

### 2.4 Reviews Sheet
| Column | Description | Example |
|--------|-------------|---------|
| id | Review ID | review-001 |
| businessId | Business ID | saravana-bhavan-glen-waverley |
| authorName | Reviewer name | Priya S. |
| rating | Rating (1-5) | 5 |
| comment | Review text | Excellent food and service! |
| commentInTamil | Tamil comment | சிறந்த உணவு மற்றும் சேவை! |
| date | Review date | 2024-01-10 |
| verified | Verified review (TRUE/FALSE) | TRUE |

## Step 3: Share Sheets with Service Account

1. **Get Service Account Email**
   - From the downloaded JSON file, find the "client_email" field
   - Copy this email address

2. **Share Each Sheet**
   - Open each Google Sheet
   - Click "Share" button
   - Paste the service account email
   - Set permission to "Editor"
   - Uncheck "Notify people"
   - Click "Share"

## Step 4: Configure Environment Variables

1. **Copy Template**
   ```bash
   cp .env.local.template .env.local
   ```

2. **Fill in Values**
   - Open `.env.local` in your editor
   - Extract values from the downloaded JSON file:
     - `client_email` → `GOOGLE_SHEETS_CLIENT_EMAIL`
     - `private_key` → `GOOGLE_SHEETS_PRIVATE_KEY`
     - `project_id` → `GOOGLE_SHEETS_PROJECT_ID`
   - Get Sheet IDs from the URLs of your Google Sheets
   - Update sheet names if different

3. **Example .env.local**
   ```bash
   GOOGLE_SHEETS_CLIENT_EMAIL=tamil-wiki-service@tamil-community-wiki.iam.gserviceaccount.com
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_PROJECT_ID=tamil-community-wiki
   
   BUSINESSES_SHEET_ID=1ABC123def456GHI789jkl
   CATEGORIES_SHEET_ID=1XYZ789abc123DEF456ghi
   SUBURBS_SHEET_ID=1PQR456rst789UVW123xyz
   REVIEWS_SHEET_ID=1MNO123opq456RST789uvw
   
   BUSINESSES_SHEET_NAME=Businesses
   CATEGORIES_SHEET_NAME=Categories
   SUBURBS_SHEET_NAME=Suburbs
   REVIEWS_SHEET_NAME=Reviews
   ```

## Step 5: Test the Integration

1. **Install Dependencies**
   ```bash
   npm install googleapis
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Check Console**
   - Look for any error messages
   - The app should load data from Google Sheets

## Step 6: Populate Sample Data

Use the provided sample data from `data/businesses.json` to populate your Google Sheets with initial data.

## Security Notes

- Keep your service account key file secure
- Never commit `.env.local` to version control
- The `.env.local.template` is safe to commit as it contains no real credentials
- Consider using Google Cloud Secret Manager for production deployments

## Troubleshooting

**"Error: No such file or directory"**
- Make sure you've created the `.env.local` file

**"Error: Invalid credentials"**
- Check that your service account email and private key are correct
- Ensure the sheets are shared with the service account

**"Error: The caller does not have permission"**
- Make sure you've shared the Google Sheets with the service account email
- Set the permission to "Editor"

**"Error: Requested entity was not found"**
- Check that your sheet IDs are correct
- Verify the sheet names match what's in your environment variables
