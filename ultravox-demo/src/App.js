import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { UltravoxClient } from './ultravoxClient';
import { SLIDES, SYSTEM_PROMPT, PRESENTATION_CONFIG } from './slides';

// Tool definitions for Ultravox, matching the reverted slides.js
const TOOLS = [
  {
    temporaryTool: {
      modelToolName: "nextSlide",
      description: "Advance to the next slide.",
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "previousSlide",
      description: "Return to the previous slide.",
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "gotoSlide",
      description: "Jump to a specific slide number.",
      dynamicParameters: [{
        name: "slideNumber",
        location: "PARAMETER_LOCATION_BODY",
        schema: { type: "integer", description: "The slide number to go to." },
        required: true
      }],
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "getSlideInfo",
      description: "Summarize the current slide using its 'takeaway'.",
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "getContent",
      description: "Get the narration content for a specific slide ID.",
      dynamicParameters: [{
        name: "slideId",
        location: "PARAMETER_LOCATION_BODY",
        schema: { type: "integer", description: "The ID of the slide." },
        required: true
      }],
      client: {}
    }
  },
  {
    temporaryTool: {
      modelToolName: "hangUpCall",
      description: "End the current call and presentation session.",
      client: {}
    }
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [client, setClient] = useState(null);

  const slide = SLIDES[currentSlide];

  useEffect(() => {
    try {
      const newClient = new UltravoxClient();
      setClient(newClient);
    } catch (error) {
      console.error('Failed to initialize UltravoxClient:', error);
    }
  }, []);

  const endCall = useCallback(async () => {
    if (client) {
      await client.leaveCall();
      setIsCallActive(false);
    }
  }, [client]);

  // Event handler for navigation
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

  // Tool registrations
  useEffect(() => {
    if (!client) return;

    client.registerTool('nextSlide', () => {
      window.dispatchEvent(new CustomEvent('slideNavigation', { detail: { action: 'next' } }));
      return "Moving to the next slide.";
    });

    client.registerTool('previousSlide', () => {
      window.dispatchEvent(new CustomEvent('slideNavigation', { detail: { action: 'previous' } }));
      return "Going back to the previous slide.";
    });

    client.registerTool('gotoSlide', (params) => {
      const slideNumber = parseInt(params.slideNumber);
      window.dispatchEvent(new CustomEvent('slideNavigation', { detail: { action: 'goto', slideNumber } }));
      return `Jumping to slide ${slideNumber}.`;
    });

    client.registerTool('getSlideInfo', () => {
      return SLIDES[currentSlide].takeaway;
    });

    client.registerTool('getContent', (params) => {
      const slide = SLIDES.find(s => s.id === parseInt(params.slideId));
      return slide ? slide.content : "Could not find note.";
    });

    client.registerTool('hangUpCall', endCall);

  }, [client, endCall, currentSlide]); // currentSlide dependency needed for getSlideInfo

  const startCall = async () => {
    if (!client) {
      alert('Ultravox client is not initialized.');
      return;
    }
    setIsConnecting(true);
    setCurrentSlide(0);

    const callOptions = {
      voice: PRESENTATION_CONFIG.voiceId,
      ...(PRESENTATION_CONFIG.vad && { vadSettings: PRESENTATION_CONFIG.vad })
    };

    try {
      const { joinUrl } = await client.createCall(SYSTEM_PROMPT, TOOLS, callOptions);
      await client.joinCall(joinUrl);
      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to start call:', error);
      alert('Failed to start call. Check console for errors.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  if (isCallActive) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl w-full h-full flex flex-col">
          <div className="bg-gray-100 px-6 py-4 shrink-0 text-center">
            <h2 className="text-xl font-semibold text-gray-800">{slide?.title || "Loading..."}</h2>
          </div>
          <div className="flex-grow overflow-hidden flex items-center justify-center min-h-0">
            <img 
              src={slide?.image} 
              alt={slide?.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Voice Presentation Demo</h1>
            <p className="text-gray-400">Slide {currentSlide + 1} of {SLIDES.length}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={startCall}
            disabled={isConnecting || !client}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed px-6 py-3 rounded-lg transition-colors"
          >
            <Play className="w-5 h-5" />
            {isConnecting ? 'Connecting...' : (client ? 'Start Voice Control' : 'Initializing...')}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
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
        <div className="bg-blue-900/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Voice Commands Guide</h3>
          <p className="text-sm text-blue-200 mb-2">Click "Start Voice Control" and Monika will begin the presentation.</p>
          <div className="space-y-1 text-sm text-blue-200">
            <p>"Next slide"</p>
            <p>"Previous slide"</p>
            <p>"Go to slide 2"</p>
            <p>"What's this slide about?" (gives takeaway)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
