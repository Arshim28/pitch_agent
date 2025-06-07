import { UltravoxSession } from 'ultravox-client';

console.log('Inspecting UltravoxSession import:', UltravoxSession);

// const API_KEY = process.env.REACT_APP_ULTRAVOX_API_KEY || 'YOUR_ULTRAVOX_API_KEY_HERE'; // Old way
const API_KEY = 'c7arUlsY.WBBhDoeqJPv7ne29aGGU08aWe0ppeYCs'; // New way: Hardcode for now - REPLACE THIS!

export class UltravoxClient {
  constructor() {
    this.session = new UltravoxSession();
  }

  async createCall(systemPrompt, tools, callOptions = {}) {
    console.log('🚀 Creating call with system prompt, tools, and options:', callOptions);
    
    const requestBody = {
      systemPrompt,
      model: 'fixie-ai/ultravox', // Default model, can be overridden by callOptions
      voice: 'Monika-English-Indian', // Default voice, will be overridden by callOptions.voice if provided
      selectedTools: tools,
      ...callOptions, // Spread callOptions here to override defaults or add new ones like VAD
    };

    console.log('🔑 Final request body for /api/calls:', requestBody);

    // Create call directly (no backend needed for demo)
    const response = await fetch('/api/calls', {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`API call failed: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log('🚀 Call created successfully:', data);
    return data;
  }

  async joinCall(joinUrl) {
    console.log('🚀 Joining call:', joinUrl);
    await this.session.joinCall(joinUrl);
  }

  async leaveCall() {
    console.log('🚀 Leaving call');
    await this.session.leaveCall();
  }

  registerTool(name, func) {
    console.log('🎯 Registering client tool:', name);
    // Correct method according to Ultravox SDK documentation
    if (typeof this.session.registerToolImplementation === 'function') {
      this.session.registerToolImplementation(name, func);
    } else {
      console.error('❌ UltravoxSession does not have a registerToolImplementation method.');
      // This case should ideally not be reached if the SDK version is compatible
      throw new Error('Tool registration method registerToolImplementation not found on UltravoxSession.');
    }
  }

  getStatus() {
    return this.session.status || 'idle';
  }
} 