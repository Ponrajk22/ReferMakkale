# ReferMakkale - Community Business Directory

A community-driven business directory for families in Melbourne, powered by Google Sheets and automatically synced with GitHub Actions.

## 🚀 Features

- **Google Sheets Integration**: Business data is managed through a simple Google Sheet
- **Automatic Sync**: Data is automatically updated every hour via GitHub Actions
- **Community Driven**: Easy for community members to add/update businesses
- **Multilingual Support**: Interface supports multiple languages
- **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS
- **Search & Filter**: Advanced search and filtering capabilities
- **Responsive**: Works on all devices

## 📊 Data Source

The application gets its data from a Google Sheet with the following structure:

| Column | Description | Example |
|--------|-------------|---------|
| Name | Business/Person name | Maddy |
| Category | Service category | Aircon/Evaporative |
| Business Description | Company/Service description | Sai Aircon Systems |
| Phone | Contact phone | 0430283034 |
| Website | Website URL | https://example.com |
| Address | Physical address | 123 Main St, Melbourne |
| Additional Info | Extra details | Very reliable service |
| Review link | Link to reviews | See Reviews |

## 🔧 Setup Instructions

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ReferMakkale.git
   cd ReferMakkale
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.template .env.local
   ```
   
   Edit `.env.local` and add your Google Sheets credentials:
   ```bash
   GOOGLE_SHEETS_ID=your_google_sheets_id_here
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. **Sync data from Google Sheets**
   ```bash
   python3 scripts/sync_data.py
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `python3 scripts/sync_data.py` - Manually sync data from Google Sheets

## 🎯 Contributing

1. **Add/Update businesses** directly in the Google Sheet
2. **Report issues** via GitHub Issues
3. **Submit improvements** via Pull Requests

## 📱 Categories Supported

- **Services**: Plumbers, Electricians, Cleaners, etc.
- **Automotive**: Car mechanics and repairs
- **Financial**: Mortgage brokers, Accountants
- **Real Estate**: Agents and property services
- **Childcare**: Daycare and education services
- **Technology**: IT and tech support
- **Restaurants**: Food and dining (coming soon)

---

**Made with ❤️ for the community in Melbourne**
