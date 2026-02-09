# Hack the North 2026 - Events App

A modern, responsive web application for discovering and browsing hackathon events. Built for the Hack the North 2026 Frontend Developer Challenge.

## 🚀 Features

- **Event Discovery**: Browse all hackathon events with detailed information
- **Smart Authentication**: Login system to access private hacker events
- **Real-time Filtering**: Search and filter events by type, name, or speaker
- **Related Events**: Navigate between connected events seamlessly  
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Stack**: Built with React 18, Vite, and modern CSS

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Modern CSS with custom properties and animations
- **API**: Hack the North Events API
- **Deployment**: Vercel/Netlify ready
- **Fonts**: Space Grotesk + JetBrains Mono

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hackathon-events-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm run preview
```

## 🔐 Login Credentials

To access private hacker events, use these credentials:
- **Username**: `hacker`
- **Password**: `htn2026`

## 📱 Features Overview

### Public Users
- View all public events
- Search and filter events
- See event details, times, and speakers
- Click related events to navigate

### Logged-in Hackers  
- All public user features
- Access to private events
- Enhanced event links
- Full event visibility

## 🎨 Design Philosophy

The app features a distinctive **tech-noir aesthetic** with:
- Dark theme with vibrant accent colors
- Smooth animations and micro-interactions
- Typography-focused design with Space Grotesk
- Glassmorphism effects and modern shadows
- Accessible, responsive layout

## 🏗 Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Complete styling system
├── main.jsx         # React DOM entry point
└── index.css        # Global base styles

public/
└── vite.svg         # Vite logo

index.html           # HTML template
package.json         # Dependencies and scripts
vite.config.js       # Vite configuration
```

## 🔧 API Integration

The app integrates with the Hack the North Events API:
- **Endpoint**: `https://api.hackthenorth.com/v3/events`
- **Method**: GET
- **Response**: Array of event objects
- **Auto-sorting**: Events sorted by start time

## 📊 Event Data Schema

```typescript
type TEvent = {
  id: number;
  name: string;
  event_type: "workshop" | "activity" | "tech_talk";
  permission?: "public" | "private";
  start_time: number; // unix timestamp (ms)
  end_time: number; // unix timestamp (ms)
  description?: string;
  speakers: { name: string }[];
  public_url?: string;
  private_url: string;
  related_events: number[];
}
```

## 🎯 Challenge Requirements Met

✅ **Display Events**: Shows all events from API  
✅ **Sort by Time**: Events automatically sorted by start_time  
✅ **Login System**: Authentication with hardcoded credentials  
✅ **Private Events**: Hidden behind login, visible to authenticated users  
✅ **Related Events**: Clickable navigation between related events  
✅ **Search & Filter**: Search by name/speaker/description, filter by type  
✅ **Responsive Design**: Works on mobile, tablet, and desktop  
✅ **Accessible**: Keyboard navigation, ARIA labels, color contrast  

## 🚀 Deployment

The app is ready for deployment on:

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Performance Optimizations
- Vite for fast builds and HMR
- Code splitting ready
- Optimized images and fonts
- Minimal bundle size
- Modern browser features

## 🎉 Additional Features

Beyond the requirements, the app includes:
- **Search functionality** across events, speakers, and descriptions
- **Type-based filtering** for workshops, activities, and tech talks
- **Smooth scrolling** to related events with highlighting
- **Loading states** and error handling
- **Responsive design** for all device sizes
- **Accessibility features** and keyboard navigation

## 📜 License

Built for the Hack the North 2026 Frontend Developer Challenge.

---

**Made with ❤️ for Hack the North 2026**