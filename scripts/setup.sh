#!/bin/bash

# ReferMakkale - Data Sync and Status Script

echo "🔄 ReferMakkale Data Sync & Status"
echo "=================================="

# Check if environment variables are set
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "   Please copy .env.template to .env.local and add your credentials"
    exit 1
fi

# Check for required Python packages
echo "📋 Checking dependencies..."
if ! python3 -c "import requests" 2>/dev/null; then
    echo "⚠️  requests package not found. Installing..."
    pip3 install requests
fi

# Run the sync script
echo "🔄 Syncing data from Google Sheets..."
python3 scripts/sync_data.py

if [ $? -eq 0 ]; then
    echo "✅ Data sync completed successfully!"
    
    # Check what was generated
    echo ""
    echo "📊 Data Summary:"
    if [ -f data/businesses.json ]; then
        BUSINESS_COUNT=$(grep -o '"id":' data/businesses.json | wc -l)
        echo "   📋 Businesses: $BUSINESS_COUNT"
    fi
    
    if [ -f data/categories.json ]; then
        CATEGORY_COUNT=$(grep -o '"id":' data/categories.json | wc -l)
        echo "   📂 Categories: $CATEGORY_COUNT"
    fi
    
    if [ -f data/suburbs.json ]; then
        SUBURB_COUNT=$(grep -o '"name":' data/suburbs.json | wc -l)
        echo "   🏘️  Suburbs: $SUBURB_COUNT"
    fi
    
    echo ""
    echo "🚀 Ready to run: npm run dev"
    echo "   Local URL: http://localhost:3000"
    
else
    echo "❌ Data sync failed!"
    exit 1
fi
