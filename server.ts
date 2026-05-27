import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper for dynamic API key lookup (lazy initialization)
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI content endpoints will operate in sandbox mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Endpoint: AI Character Specification Generator (Characters tab)
app.post("/api/generate/character", async (req, res) => {
  try {
    const { archetype, style, gender, voiceTone, traits } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Sandbox fallback data for a highly professional experience without API connectivity
      return res.json({
        success: true,
        sandbox: true,
        name: `Aura - ${archetype || "Explorer"}`,
        voiceId: "en-US-Neural-A",
        prompt: `Portrait shot, face centered, 9:16 vertical cinema style, stunning dynamic lighting on a ${gender || "androgynous"} digital human. Style: ${style || "Cyberpunk Cyber-Noir"}. Aesthetic: ${traits?.join(", ") || "mysterious, hyper-detailed"}. Red accent light, photorealistic Unreal Engine 5 render, cinematic atmosphere.`,
        backstory: `Formed in the neon corridors of modern digital branding, this ${archetype || "AI Influencer"} was engineered to captivate audiences who crave an authentic blend of ${style || "Futuristic"} aesthetics and deep resonance. Specializes in short-form content with a custom ${voiceTone || "smooth, modern"} narrative cadence.`
      });
    }

    const systemInstruction = "You are AuraMedia-AI, a world-class prompt engineer and character digital twin designer. " +
      "Help the user craft a stellar, photorealistic AI Character specification for Seedance 2.0 vertically-scaled digital rendering.";

    const promptText = `Generate a cinematic visual character render prompt and digital influencer profile for an character with these attributes:
    - Archetype: ${archetype}
    - Visual Art Style: ${style}
    - Gender/Expression: ${gender}
    - Voice Tone: ${voiceTone}
    - Spark Traits: ${traits ? traits.join(", ") : "dynamic, sharp, enigmatic"}.
    
    Provide the output strictly in valid JSON format with the following keys:
    - name: A cool futuristic or modern human name.
    - voiceId: A recommended standard screen voice indicator code (e.g. en-US-Studio-O).
    - prompt: A highly optimized, descriptive visual character generation prompt for generating 9:16 cinematic digital twin frames.
    - backstory: An intriguing 2-sentence background story for this digital avatar.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            voiceId: { type: Type.STRING },
            prompt: { type: Type.STRING },
            backstory: { type: Type.STRING }
          },
          required: ["name", "prompt", "backstory"]
        },
        temperature: 0.8
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      sandbox: false,
      ...parsedData
    });
  } catch (error: any) {
    console.error("AI Character Generation error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate character." });
  }
});

// Endpoint: AI Cinematic Studio Scenes Sequence Generator (Scenes tab)
app.post("/api/generate/scene", async (req, res) => {
  try {
    const { rawPrompt, durationSeconds, stylePreset } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        sandbox: true,
        scenes: [
          {
            sceneId: 1,
            timeRange: "0s - 3s",
            visualDescription: `9:16 vertical render, macro lens focus. Opening scene showing the detailed facial armor reflecting a crimson high-contrast sky. Style preset: ${stylePreset || "Cinematic Epic"}. Prompt aspect: ${rawPrompt || "A digital being awakening"}`,
            cameraMotion: "Inward slow dollying with extreme depth-of-field",
            sfxPrompt: "Humming modular synthesizer drone with high-frequency electricity arcs."
          },
          {
            sceneId: 2,
            timeRange: "3s - 7s",
            visualDescription: "Medium close-up shot as the character turns slightly, eyes pulsing with orange digital data nodes.",
            cameraMotion: "Whip pan to the left, lock into 3/4 side profile",
            sfxPrompt: "Whooshing sub-bass swell with digital chime layer"
          },
          {
            sceneId: 3,
            timeRange: `7s - ${durationSeconds || 10}s`,
            visualDescription: "Full vertical scale hero pose, embers blowing across the slate-colored metallic ground, fading into cinematic black.",
            cameraMotion: "Slow crane-up, tilting down to emphasize towering presence",
            sfxPrompt: "Reverberated orchestral impact transitioning into absolute silence"
          }
        ]
      });
    }

    const systemInstruction = "You are a master cinematic script director and storyboard artist for high-end cinematic vertical video generation. Give visual scenes with meticulous framing details.";

    const promptText = `Based on the prompt: "${rawPrompt}", duration: ${durationSeconds || 10}s, and style preset: "${stylePreset || "Cinematic Ultra"}", generate a modular vertical video scene sequence breakdown.
    
    Provide the response strictly in JSON according to this structure:
    - scenes: An array of scene items, each containing:
      * sceneId (integer)
      * timeRange (string, e.g. "0s - 3s")
      * visualDescription (detailed visual description tailored to portrait 9:16 layout)
      * cameraMotion (precise description of cinematic camera path)
      * sfxPrompt (synthesized sound prompt descriptions)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneId: { type: Type.INTEGER },
                  timeRange: { type: Type.STRING },
                  visualDescription: { type: Type.STRING },
                  cameraMotion: { type: Type.STRING },
                  sfxPrompt: { type: Type.STRING }
                },
                required: ["sceneId", "timeRange", "visualDescription", "cameraMotion", "sfxPrompt"]
              }
            }
          },
          required: ["scenes"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      sandbox: false,
      ...parsedData
    });
  } catch (error: any) {
    console.error("AI Scene Generation error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate scenes." });
  }
});

// Endpoint: AI Brand Studio Identity Generator (Brand Studio tab)
app.post("/api/generate/brand", async (req, res) => {
  try {
    const { brandName, coreOffering, primaryAesthetic } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        sandbox: true,
        tagline: `${brandName || "Nebula"} : Command the Creative Stream`,
        styleGuide: {
          primaryColor: "#FF5722",
          secondaryColor: "#0B0F19",
          typographyAccent: "Space Grotesk",
          moodboardPrompt: `9:16 vertical ultra-premium brand mockup showcasing high-contrast minimalist elements and slate-gray glass textures. Accent: ${primaryAesthetic || "Luxury Cinematic"}`
        },
        marketingHooks: [
          "The old ways of video editing are dead. Meet AuraMedia-engineered Seedance loops that convert 4x faster.",
          "High-end visual rhythm engineered for modern sensory feeds.",
          "Your digital avatar never sleeps, never misses a trend, never looks average."
        ]
      });
    }

    const systemInstruction = "You are a master digital media brand strategist and creative director for modern, hyper-visual Gen-Z marketing campaigns.";

    const promptText = `Formulate a comprehensive Brand Identity Kit for a brand called "${brandName || "Unnamed Studio"}" whose core offering is "${coreOffering || "AI influencer marketing"}" themed around "${primaryAesthetic || "Luxury Cyberpunk"}".
    
    Provide the response strictly in JSON format with these exact keys:
    - tagline: A brief, punchy marketing tagline.
    - styleGuide: { primaryColor, secondaryColor, typographyAccent, moodboardPrompt }
    - marketingHooks: A list of exactly 3 highly magnetic social media campaign caption hooks optimized for short-form vertical feeds.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tagline: { type: Type.STRING },
            styleGuide: {
              type: Type.OBJECT,
              properties: {
                primaryColor: { type: Type.STRING },
                secondaryColor: { type: Type.STRING },
                typographyAccent: { type: Type.STRING },
                moodboardPrompt: { type: Type.STRING }
              },
              required: ["primaryColor", "secondaryColor", "typographyAccent", "moodboardPrompt"]
            },
            marketingHooks: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["tagline", "styleGuide", "marketingHooks"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      sandbox: false,
      ...parsedData
    });
  } catch (error: any) {
    console.error("AI Brand Kit error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to generate brand features." });
  }
});

// Endpoint: Video Agent Co-Pilot (Video Agent tab)
app.post("/api/generate/video-agent", async (req, res) => {
  try {
    const { chatHistory } = req.body; // Array of { role: 'user' | 'model', text: string }
    const ai = getGeminiClient();

    const lastMessage = chatHistory?.[chatHistory.length - 1]?.text || "Let's refine a vertical loop.";

    if (!ai) {
      // Mock clever response from "Aura Co-Pilot"
      const replies = [
        "That concept is electric! Let's optimize it for Seedance 2.0. I suggest wrapping the color space to deep charcoal with vivid orange backlighting. Do you want to add cinematic grain or a camera shaking effect?",
        "Beautiful idea. For vertical (9:16) formats, we should focus on the eye level of the virtual influencer. Let's write a camera dolly-in script to capture the facial details during the opening 3 seconds. Shall we lock that frame in?",
        "Outstanding layout choice. I've engineered a camera panning motion that pairs with a heavy synth SFX score. You can select this specs package or keep building it."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return res.json({
        success: true,
        sandbox: true,
        reply: randomReply,
        specsSuggestion: {
          resolution: "1080p (HQ Portrait)",
          suggestedStyling: "High-contrast cinematic lighting with volumetric smoke",
          cameraDirections: "0s-4s: Steady macro tracking, 4s-10s: Slow low-angle tilt-up"
        }
      });
    }

    const systemInstruction = "You are Aura Agent Co-Pilot, an expert AI vertical film strategist. Converse with the user to co-create and optimize their high-end video prompt. Provide constructive suggestions for camera movement, lighting, character posture, and audio integration matching Seedance 2.0 vertical cinema standard.";

    // Convert chat history format
    const formattedHistory = (chatHistory || []).map((h: any) => ({
      role: h.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: h.text }]
    }));

    // Generate output with both conversational reply and structured specs suggestions
    const chatPrompt = `Discuss and optimize this creative film concept in detail. Propose specific vertical camera layouts. 
    
    Provide the response strictly in JSON format with these exact keys:
    - reply: Your natural, creative conversational reply. Keep it inspiring and under 3 sentences.
    - specsSuggestion: { resolution: "suggested e.g. 1080p", suggestedStyling: "lighting/environment specs", cameraDirections: "step-by-step frame movements" }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [...formattedHistory, { role: "user", parts: [{ text: chatPrompt }] }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            specsSuggestion: {
              type: Type.OBJECT,
              properties: {
                resolution: { type: Type.STRING },
                suggestedStyling: { type: Type.STRING },
                cameraDirections: { type: Type.STRING }
              },
              required: ["resolution", "suggestedStyling", "cameraDirections"]
            }
          },
          required: ["reply", "specsSuggestion"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json({
      success: true,
      sandbox: false,
      ...parsedData
    });
  } catch (error: any) {
    console.error("Video Agent error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to interact with Video Agent." });
  }
});

// Endpoint: Mock Stripe Checkout & Webhook simulator
app.post("/api/checkout-session", (req, res) => {
  const { plan, billingCycle, price } = req.body;
  
  if (!plan || !price) {
    return res.status(400).json({ success: false, error: "Plan and price parameters are required." });
  }

  console.log(`[Stripe Checkout Webhook Simulated] Initiating payment cycle for plan: ${plan} (${billingCycle}), Price: ${price}`);

  // Instantly return validated checkout session and mock token
  res.json({
    success: true,
    stripeSessionId: `cs_test_${Math.random().toString(36).substring(2, 15)}`,
    message: "Stripe checkout session initialized and successfully validated.",
    updatedRole: plan.toLowerCase(), // 'plus' or 'pro'
    updatedCredits: plan.toLowerCase() === "pro" ? 9999 : 500,
  });
});

// Serve frontend assets
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    // Vite middleware in dev mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production client asset serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AuraMedia Studio Server booted successfully on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
