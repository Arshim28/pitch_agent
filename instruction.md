# Ultravox Presentation Demo - Quick Start Guide

## 🚀 Goal: Working Demo ASAP

Build a voice-controlled presentation dashboard using React + Ultravox SDK. Skip all production concerns - just get it working.

---

## ⚡ Quick Setup (15 minutes)

### 1. Create React App
```bash
npx create-react-app ultravox-demo
cd ultravox-demo
npm install ultravox-client lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind (src/index.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

API KEY Stored in .env  (ULTRAVOX_API_KEY)
---

## 📁 Simple File Structure

```
src/
├── App.js                 // Main component
├── ultravoxClient.js      // API calls
├── slides.js              // Sample data
└── index.css              // Styles
```

---

## 🔧 Implementation Files

### **src/slides.js** - Sample Data
```javascript
export const SLIDES = [
  {
    id: 1,
    title: "Welcome to Q4 Review",
    image: "https://via.placeholder.com/800x600/3b82f6/ffffff?text=Q4+Review",
    notes: "Welcome to our quarterly review. We'll cover sales, growth, and targets.",
    points: ["Revenue up 25%", "New customers: 480", "Market expansion successful"]
  },
  {
    id: 2,
    title: "Sales Performance", 
    image: "https://via.placeholder.com/800x600/10b981/ffffff?text=Sales+Performance",
    notes: "Sales exceeded all expectations this quarter with strong growth.",
    points: ["$2.5M total revenue", "15% above target", "All regions growing"]
  },
  {
    id: 3,
    title: "Customer Growth",
    image: "https://via.placeholder.com/800x600/f59e0b/ffffff?text=Customer+Growth", 
    notes: "Customer acquisition accelerated with 95% retention rate.",
    points: ["480 new customers", "95% retention", "$2,100 avg deal"]
  },
  {
    id: 4,
    title: "2025 Goals",
    image: "https://via.placeholder.com/800x600/ef4444/ffffff?text=2025+Goals",
    notes: "Looking ahead with ambitious targets for continued growth.",
    points: ["Target: $4M revenue", "Double customers", "2 new products"]
  }
];

export const SYSTEM_PROMPT = `You are presenting slides. Available commands:
- nextSlide() - go to next slide
- previousSlide() - go back  
- gotoSlide(number) - jump to specific slide
- getSlideInfo() - get current slide details

Present each slide naturally, ask for questions, then move forward. Use tools when user requests navigation.`;
```

### **src/ultravoxClient.js** - API Integration
```javascript
import { UltravoxSession } from 'ultravox-client';

const API_KEY = 'YOUR_ULTRAVOX_API_KEY_HERE'; // Replace with your key

export class UltravoxClient {
  constructor() {
    this.session = UltravoxSession.create();
  }

  async createCall(systemPrompt, tools) {
    // Create call directly (no backend needed for demo)
    const response = await fetch('https://api.ultravox.ai/api/calls', {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemPrompt,
        model: 'fixie-ai/ultravox',
        voice: 'Mark',
        selectedTools: tools
      }),
    });

    const data = await response.json();
    return data;
  }

  async joinCall(joinUrl) {
    await this.session.joinCall(joinUrl);
  }

  async leaveCall() {
    await this.session.leaveCall();
  }

  registerTool(name, func) {
    this.session.registerClientTool(name, func);
  }

  getStatus() {
    return this.session.status || 'idle';
  }
}
```

### **src/App.js** - Main Component
```javascript
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { UltravoxClient } from './ultravoxClient';
import { SLIDES, SYSTEM_PROMPT } from './slides';

// Tool definitions for Ultravox
const TOOLS = [
  {
    temporaryTool: {
      modelToolName: "nextSlide",
      description: "Move to the next slide",
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "previousSlide",
      description: "Go to previous slide", 
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "gotoSlide",
      description: "Jump to specific slide number",
      dynamicParameters: [{
        name: "slideNumber",
        location: "PARAMETER_LOCATION_BODY",
        schema: { type: "integer", description: "Slide number", minimum: 1 },
        required: true
      }],
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "getSlideInfo",
      description: "Get current slide information",
      client: {}
    }
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [client] = useState(new UltravoxClient());

  // Handle voice commands
  useEffect(() => {
    const handleNavigation = (event) => {
      const { action, slideNumber } = event.detail;
      
      if (action === 'next') {
        setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
      } else if (action === 'previous') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (action === 'goto' && slideNumber) {
        const index = slideNumber - 1;
        if (index >= 0 && index < SLIDES.length) {
          setCurrentSlide(index);
        }
      }
    };

    window.addEventListener('slideNavigation', handleNavigation);
    return () => window.removeEventListener('slideNavigation', handleNavigation);
  }, []);

  // Register client tools
  useEffect(() => {
    client.registerTool('nextSlide', () => {
      window.dispatchEvent(new CustomEvent('slideNavigation', { 
        detail: { action: 'next' } 
      }));
      return "Moving to next slide";
    });

    client.registerTool('previousSlide', () => {
      window.dispatchEvent(new CustomEvent('slideNavigation', { 
        detail: { action: 'previous' } 
      }));
      return "Going to previous slide";
    });

    client.registerTool('gotoSlide', (params) => {
      window.dispatchEvent(new CustomEvent('slideNavigation', { 
        detail: { action: 'goto', slideNumber: parseInt(params.slideNumber) } 
      }));
      return `Going to slide ${params.slideNumber}`;
    });

    client.registerTool('getSlideInfo', () => {
      const slide = SLIDES[currentSlide];
      return `Current slide: ${slide.title}. Key points: ${slide.points.join(', ')}`;
    });
  }, [client, currentSlide]);

  const startCall = async () => {
    setIsConnecting(true);
    try {
      const { joinUrl } = await client.createCall(SYSTEM_PROMPT, TOOLS);
      await client.joinCall(joinUrl);
      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to start call:', error);
      alert('Failed to start call. Check your API key.');
    } finally {
      setIsConnecting(false);
    }
  };

  const endCall = async () => {
    await client.leaveCall();
    setIsCallActive(false);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Voice Presentation Demo</h1>
          <p className="text-gray-400">Slide {currentSlide + 1} of {SLIDES.length}</p>
        </div>
        
        {/* Call Controls */}
        <div className="flex gap-4">
          {!isCallActive ? (
            <button
              onClick={startCall}
              disabled={isConnecting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
              <Play className="w-5 h-5" />
              {isConnecting ? 'Connecting...' : 'Start Voice Control'}
            </button>
          ) : (
            <button
              onClick={endCall}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
            >
              <Pause className="w-5 h-5" />
              End Call
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Slide */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-gray-100 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">{slide.title}</h2>
            </div>
            
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-96 object-cover"
            />
            
            {/* Progress Bar */}
            <div className="bg-gray-200 h-2">
              <div 
                className="bg-blue-500 h-full transition-all"
                style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Manual Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded disabled:opacity-50"
            >
              <SkipBack className="w-4 h-4" />
              Previous
            </button>
            
            <span className="text-gray-400 self-center">
              Manual controls (or use voice)
            </span>
            
            <button
              onClick={() => setCurrentSlide(Math.min(SLIDES.length - 1, currentSlide + 1))}
              disabled={currentSlide === SLIDES.length - 1}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Speaker Notes */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Speaker Notes</h3>
            <p className="text-gray-300 text-sm">{slide.notes}</p>
          </div>

          {/* Key Points */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Key Points</h3>
            <ul className="space-y-2">
              {slide.points.map((point, index) => (
                <li key={index} className="text-gray-300 text-sm flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Voice Commands */}
          <div className="bg-blue-900/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Voice Commands</h3>
            <div className="space-y-1 text-sm text-blue-200">
              <p>"Next slide"</p>
              <p>"Previous slide"</p>
              <p>"Go to slide 2"</p>
              <p>"What's this slide about?"</p>
            </div>
            
            {isCallActive && (
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">Voice active</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
```

### **tailwind.config.js**
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

---

## 🚀 Quick Start Commands

```bash
# 1. Setup
npx create-react-app ultravox-demo
cd ultravox-demo
npm install ultravox-client lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 2. Replace files (copy code above)
# 3. Add your API key to src/ultravoxClient.js
# 4. Run
npm start
```

---

## ⚡ Critical Steps

### 1. **Replace API Key**
In `src/ultravoxClient.js`, replace:
```javascript
const API_KEY = 'YOUR_ULTRAVOX_API_KEY_HERE';
```

### 2. **Test Voice Commands**
- Click "Start Voice Control"
- Say: "Next slide"
- Say: "Go to slide 3" 
- Say: "Previous slide"

### 3. **If It Doesn't Work**
- Check browser console for errors
- Verify API key is correct
- Make sure you're using Chrome (best WebRTC support)
- Check microphone permissions

---

## 🎯 What You Get

- **4 sample slides** with placeholder images
- **Voice navigation** - "next slide", "go to slide 2"
- **Manual fallback** buttons
- **Real-time updates** when voice commands trigger
- **Professional UI** with speaker notes

**Total setup time: ~15 minutes**

The demo will work immediately with voice commands once you add your Ultravox API key. No backend, no deployment complexity - just a working voice-controlled presentation!

## 🔧 Quick Debugging

**Voice not working?**
- Open browser console
- Look for WebRTC/microphone errors
- Try different voice commands
- Check API key in Network tab

**Commands not triggering slides?**  
- Check console for "Client Tool" logs
- Verify event listeners are working
- Test manual buttons first

That's it! A working demo in 15 minutes.