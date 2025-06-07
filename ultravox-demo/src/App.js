import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { UltravoxClient } from './ultravoxClient';
import { SLIDES, SYSTEM_PROMPT, PRESENTATION_CONFIG } from './slides'; // Import PRESENTATION_CONFIG

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
        schema: { type: "integer", description: "Slide number", minimum: 1 }, // Max will be set in system prompt
        required: true
      }],
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "getSlideInfo",
      description: "Get current slide takeaway or summary", // Updated description
      client: {}
    }
  },
  { // New tool for setting presentation mode
    temporaryTool: {
      modelToolName: "setPresentationMode",
      description: "Sets the presentation duration mode (15min or 30min) based on user preference.",
      dynamicParameters: [{
        name: "mode",
        location: "PARAMETER_LOCATION_BODY",
        schema: { type: "string", enum: ["15min", "30min"], description: "The presentation mode: '15min' for short notes, '30min' for long notes." },
        required: true
      }],
      client: {}
    }
  },
  { // New tool for hanging up the call
    temporaryTool: {
      modelToolName: "hangUpCall",
      description: "Ends the current voice call and presentation session.",
      client: {}
    }
  },
  { // New tool for getting the short note of a slide
    temporaryTool: {
      modelToolName: "getShortNote",
      description: "Gets the concise speaker note for a specific slide.",
      dynamicParameters: [{
        name: "slideId",
        location: "PARAMETER_LOCATION_BODY",
        schema: { type: "integer", description: "The ID of the slide (1-indexed)." },
        required: true
      }],
      client: {}
    }
  },
  { // New tool for getting the long note of a slide
    temporaryTool: {
      modelToolName: "getLongNote",
      description: "Gets the detailed speaker note for a specific slide.",
      dynamicParameters: [{
        name: "slideId",
        location: "PARAMETER_LOCATION_BODY",
        schema: { type: "integer", description: "The ID of the slide (1-indexed)." },
        required: true
      }],
      client: {}
    }
  }
];

function App() {
  // State variables
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [client, setClient] = useState(null);
  const [presentationMode, setPresentationMode] = useState(null); // '15min', '30min', or null

  const slide = SLIDES[currentSlide];

  // Effect to safely initialize UltravoxClient
  useEffect(() => {
    try {
      console.log('Attempting to initialize UltravoxClient...');
      const newClient = new UltravoxClient();
      setClient(newClient);
      console.log('UltravoxClient initialized successfully.');
    } catch (error) {
      console.error('❌ Failed to initialize UltravoxClient:', error);
    }
  }, []);

  // useEffect for voice command event handling (slide navigation)
  useEffect(() => {
    if (!client) return;
    const handleNavigation = (event) => {
      console.log('🎯 Navigation event received:', event.detail);
      const { action, slideNumber } = event.detail;
      
      if (action === 'next') {
        setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
      } else if (action === 'previous') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (action === 'goto' && slideNumber) {
        const index = slideNumber - 1;
        if (index >= 0 && index < SLIDES.length) {
          setCurrentSlide(index);
        } else {
          console.warn(`Invalid slide number received: ${slideNumber}`);
        }
      }
    };

    window.addEventListener('slideNavigation', handleNavigation);
    return () => window.removeEventListener('slideNavigation', handleNavigation);
  }, [client]);

  // useEffect for client tool registration
  useEffect(() => {
    if (!client) return;
    console.log('🎯 Registering client tools...');
    
    client.registerTool('nextSlide', () => {
      console.log('🎯 Client Tool: nextSlide called');
      window.dispatchEvent(new CustomEvent('slideNavigation', { detail: { action: 'next' } }));
      return "Moving to next slide";
    });

    client.registerTool('previousSlide', () => {
      console.log('🎯 Client Tool: previousSlide called');
      window.dispatchEvent(new CustomEvent('slideNavigation', { detail: { action: 'previous' } }));
      return "Going to previous slide";
    });

    client.registerTool('gotoSlide', (params) => {
      console.log('🎯 Client Tool: gotoSlide called with params:', params);
      const slideNumber = parseInt(params.slideNumber);
      if (slideNumber > 0 && slideNumber <= SLIDES.length) {
        window.dispatchEvent(new CustomEvent('slideNavigation', { detail: { action: 'goto', slideNumber } }));
        return `Going to slide ${slideNumber}`;
      }
      return `Invalid slide number: ${slideNumber}. Please choose between 1 and ${SLIDES.length}.`;
    });

    client.registerTool('getSlideInfo', () => {
      console.log('🎯 Client Tool: getSlideInfo called');
      const currentS = SLIDES[currentSlide]; // Ensure we get the latest slide
      console.log('Slide takeaway:', currentS.takeaway);
      return currentS.takeaway || "No takeaway available for this slide.";
    });

    client.registerTool('setPresentationMode', (params) => {
      console.log('🎯 Client Tool: setPresentationMode called with params:', params);
      const { mode } = params;
      if (mode === '15min' || mode === '30min') {
        setPresentationMode(mode);
        console.log(`Presentation mode set to: ${mode}`);
        return `Presentation mode confirmed: ${mode}.`;
      }
      console.warn(`Invalid presentation mode received: ${mode}`);
      return `Invalid mode. Please specify '15min' or '30min'.`;
    });

    client.registerTool('hangUpCall', () => {
      console.log('🎯 Client Tool: hangUpCall called');
      endCall(); // Call the existing endCall function
      return "Okay, ending the call.";
    });

    client.registerTool('getShortNote', (params) => {
      console.log('🎯 Client Tool: getShortNote called with params:', params);
      const slideId = parseInt(params.slideId);
      const slide = SLIDES.find(s => s.id === slideId);
      if (slide && slide.shortNote) {
        return slide.shortNote;
      }
      return `Could not find a short note for slide ID ${slideId}.`;
    });

    client.registerTool('getLongNote', (params) => {
      console.log('🎯 Client Tool: getLongNote called with params:', params);
      const slideId = parseInt(params.slideId);
      const slide = SLIDES.find(s => s.id === slideId);
      if (slide && slide.longNote) {
        return slide.longNote;
      }
      return `Could not find a long note for slide ID ${slideId}.`;
    });

  }, [client, currentSlide]); // currentSlide needed for getSlideInfo to have the correct slide context

  const startCall = async () => {
    if (!client) {
      alert('Ultravox client is not initialized. Please check console for errors.');
      return;
    }
    setIsConnecting(true);
    setPresentationMode(null); // Reset presentation mode on new call
    setCurrentSlide(0); // Reset to the first slide

    // Construct callOptions from PRESENTATION_CONFIG
    const callOptions = {
      voice: PRESENTATION_CONFIG.voiceId,
      ...(PRESENTATION_CONFIG.vad && PRESENTATION_CONFIG.vad.enabled && { 
        vadSettings: PRESENTATION_CONFIG.vad
      })
    };
    
    try {
      console.log('🚀 Starting voice call with options:', callOptions);
      const { joinUrl } = await client.createCall(SYSTEM_PROMPT, TOOLS, callOptions);
      await client.joinCall(joinUrl);
      setIsCallActive(true);
      console.log('🚀 Voice call started successfully');
    } catch (error) {
      console.error('❌ Failed to start call:', error);
      alert('Failed to start call. Please check your API key, configuration, and console for errors.');
    } finally {
      setIsConnecting(false);
    }
  };

  const endCall = async () => {
    if (!client) {
      console.warn('Ultravox client is not initialized. Cannot end call.');
      return;
    }
    try {
      console.log('🚀 Leaving call...');
      await client.leaveCall();
    } catch (error) {
      console.error('❌ Error ending call:', error);
    } finally {
      setIsCallActive(false);
      setPresentationMode(null); // Reset presentation mode
      console.log('🚀 Voice call ended');
    }
  };
  
  const handleNextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  if (!client && isConnecting) { // Show loading only if client is null AND we are trying to connect
     return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Initializing Voice Client...</p>
      </div>
    );
  }

  if (isCallActive) {
    return (
      // Full-screen presentation view when call is active
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl w-full h-full flex flex-col">
          {/* Header for title */}
          <div className="bg-gray-100 px-6 py-4 shrink-0 text-center">
            <h2 className="text-xl font-semibold text-gray-800">{slide?.title || "Loading..."}</h2>
          </div>
          {/* Image container that grows and centers its content */}
          <div className="flex-grow overflow-hidden flex items-center justify-center min-h-0">
            <img 
              src={slide?.image} 
              alt={slide?.title}
              className="max-w-full max-h-full object-contain" // Image scales to fit parent, centered by parent's flex properties
            />
          </div>
          {/* Progress bar */}
          <div className="bg-gray-200 h-2 shrink-0">
            <div 
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
            />
          </div>
        </div>
        <button
          onClick={endCall}
          className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors z-10"
        >
          <Pause className="w-5 h-5" />
          End Call
        </button>
      </div>
    );
  }

  // Standard view when call is NOT active
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Voice Presentation Demo</h1>
            <p className="text-gray-400">Slide {currentSlide + 1} of {SLIDES.length}</p>
          </div>
          {presentationMode && (
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${presentationMode === '15min' ? 'bg-green-500 text-white' : 'bg-green-500 text-white'}`}> 
              Mode: {presentationMode === '15min' ? 'Quick' : 'Detailed'}
            </span>
          )}
        </div>
        
        <div className="flex gap-4">
          {!isCallActive ? (
            <button
              onClick={startCall}
              disabled={isConnecting || !client}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition-colors"
            >
              <Play className="w-5 h-5" />
              {isConnecting ? 'Connecting...' : (client ? 'Start Voice Control' : 'Voice Unavailable')}
            </button>
          ) : (
            // This specific End Call button is now part of the full-screen view
            // So it's not rendered here when isCallActive is true
            null 
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Slide Display */}
        <div>
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-gray-100 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">{slide?.title || "Loading..."}</h2>
            </div>
            
            <img 
              src={slide?.image} 
              alt={slide?.title}
              className="w-full h-[40rem] object-cover"
            />
            
            <div className="bg-gray-200 h-2">
              <div 
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Manual Controls - Only shown when call is NOT active */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 px-4 py-2 rounded transition-colors"
            >
              <SkipBack className="w-4 h-4" />
              Previous
            </button>
            
            <span className="text-gray-400 self-center">
              Manual controls (or use voice)
            </span>
            
            <button
              onClick={handleNextSlide}
              disabled={currentSlide === SLIDES.length - 1}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 px-4 py-2 rounded transition-colors"
            >
              Next
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Voice Commands Info Box - Only shown when call is NOT active */}
        <div className="bg-blue-900/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Voice Commands Guide</h3>
          <p className="text-sm text-blue-200 mb-2">Bot will first ask for presentation length (15 or 30 min).</p>
          <div className="space-y-1 text-sm text-blue-200">
            <p>"Next slide"</p>
            <p>"Previous slide"</p>
            <p>"Go to slide 2"</p>
            <p>"What's this slide about?" (gives takeaway)</p>
          </div>
          
          {/* Voice active indicator could be part of full screen too, if desired, or here */} 
          {/* For now, let's keep it simple and only in non-fullscreen for the guide box */} 
          {isCallActive && (
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">Voice active</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
