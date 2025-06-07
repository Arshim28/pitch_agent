# Voice-Controlled Presentation Dashboard

A React application that lets you control presentation slides using voice commands powered by Ultravox AI.

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- Ultravox API key (get free 30 minutes at https://app.ultravox.ai)

### Setup
1. **Clone and install dependencies:**
   ```bash
   cd ultravox-demo
   npm install
   ```

2. **Set your API key:**
   Create a `.env` file in the project root:
   ```bash
   REACT_APP_ULTRAVOX_API_KEY=your_ultravox_api_key_here
   ```
   
   Or update `src/ultravoxClient.js` directly:
   ```javascript
   const API_KEY = 'your_ultravox_api_key_here';
   ```

3. **Start the app:**
   ```bash
   npm start
   ```

## 🎯 Features

- **Voice Navigation**: Control slides with natural voice commands
- **Real-time Updates**: UI updates instantly when voice commands are detected
- **Manual Fallback**: Click buttons if voice isn't working
- **Speaker Notes**: View presentation notes and key points
- **Progress Tracking**: Visual progress bar and slide thumbnails

## 🗣️ Voice Commands

- **"Next slide"** - Move to the next slide
- **"Previous slide"** - Go back to previous slide  
- **"Go to slide 3"** - Jump to specific slide number
- **"What's this slide about?"** - Get information about current slide

## 🏗️ How It Works

### Ultravox Client Tools
The app uses Ultravox client tools that run directly in the browser:

1. **Tool Registration**: Tools are registered with the Ultravox session
2. **Voice Processing**: Ultravox converts speech to tool calls
3. **Browser Execution**: Tools execute locally and dispatch custom events
4. **React Updates**: Event listeners update the UI in real-time

### Key Files
- `src/App.js` - Main component with voice controls
- `src/ultravoxClient.js` - Ultravox API integration
- `src/slides.js` - Sample presentation data
- `src/index.css` - Tailwind CSS setup

## 🔧 Technical Details

### Tool Pattern
```javascript
// 1. Define tool for Ultravox
{
  temporaryTool: {
    modelToolName: "nextSlide",
    description: "Move to next slide",
    client: {}
  }
}

// 2. Register implementation
client.registerTool('nextSlide', () => {
  window.dispatchEvent(new CustomEvent('slideNavigation', { 
    detail: { action: 'next' } 
  }));
  return "Moving to next slide";
});

// 3. Listen in React
useEffect(() => {
  const handleNav = (event) => {
    if (event.detail.action === 'next') {
      setCurrentSlide(prev => prev + 1);
    }
  };
  window.addEventListener('slideNavigation', handleNav);
  return () => window.removeEventListener('slideNavigation', handleNav);
}, []);
```

## 🐛 Troubleshooting

### Voice Commands Not Working
1. Check browser console for errors
2. Verify API key is correct
3. Ensure microphone permissions are granted
4. Use Chrome browser (best WebRTC support)
5. Check that tools are registered (look for "🎯 Registering client tools" log)

### API Errors
1. Verify API key format: should start with `uv_`
2. Check network tab for failed requests
3. Ensure you have remaining API credits
4. Try with a simpler system prompt first

### UI Not Updating
1. Check CustomEvent dispatching in browser console
2. Verify event listeners are attached
3. Test manual button clicks first
4. Check React state updates

## 📦 Dependencies

- **ultravox-client**: Voice AI SDK
- **lucide-react**: Icons
- **tailwindcss**: Styling
- **react**: UI framework

## 🎨 Customization

### Adding New Slides
Edit `src/slides.js`:
```javascript
export const SLIDES = [
  {
    id: 5,
    title: "Your New Slide",
    image: "https://via.placeholder.com/800x600/color/ffffff?text=Your+Slide",
    notes: "Speaker notes for this slide",
    points: ["Key point 1", "Key point 2", "Key point 3"]
  }
];
```

### Adding New Voice Commands
1. Add tool definition to `TOOLS` array in `App.js`
2. Register tool implementation with `client.registerTool()`
3. Add event listener to handle the command

## 🚀 Deployment

For production deployment:
1. Build the app: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables on your hosting platform
4. Ensure HTTPS (required for microphone access)

## 📝 License

MIT License - feel free to use this code for your own projects!
