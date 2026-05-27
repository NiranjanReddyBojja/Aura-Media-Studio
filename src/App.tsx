import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Play, 
  Shield, 
  Lock, 
  Unlock, 
  Volume2, 
  Tv, 
  Bot, 
  Video, 
  User, 
  CreditCard, 
  Coins, 
  Trash2, 
  Copy, 
  Plus, 
  Check, 
  Send, 
  Share2, 
  ExternalLink, 
  Maximize2, 
  TrendingUp, 
  Info, 
  Briefcase, 
  Clock, 
  Sparkle, 
  ArrowRight, 
  Search, 
  SlidersHorizontal, 
  Layers, 
  Activity, 
  FileText, 
  CheckCircle2,
  HelpCircle,
  Smartphone,
  Save,
  UserCheck,
  Star
} from 'lucide-react';
import { SubscriptionTier, CreationChannel, CharacterProfile, SceneItem, BrandKit, VideoCard, ChatMessage, GenerationTask } from './types';

// Pre-seeded core interactive video samples (derived from highly curated catalog)
const PRESEEDED_VIDEOS: VideoCard[] = [
  {
    id: "v-1",
    title: "Cyberpunk Ava: Neon Shift",
    creatorName: "AuraMedia Studio Team",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    likes: "2.4K",
    views: "18.3K",
    thumbnailUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500",
    videoUrl: "",
    prompt: "9:16 vertical high-end cinematic cyberpunk avatar, neon reflections, red glow on wet skin, cybernetic cheek implants, Unreal Engine 5 render, volumetric rain",
    ratio: "9:16",
    duration: "8s"
  },
  {
    id: "v-2",
    title: "Neon Knight: Future Armor",
    creatorName: "@StudioX",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    likes: "1.9K",
    views: "12.8K",
    thumbnailUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=500",
    videoUrl: "",
    prompt: "Medium close-up portrait of high-tech neon physical knight, golden mesh mask, intricate carbon visor, 3D model, octane renderer, cinematic depth of field",
    ratio: "9:16",
    duration: "10s"
  },
  {
    id: "v-3",
    title: "Vogue Echo: Surreal Fashion",
    creatorName: "@GenV_Creative",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200",
    likes: "3.2K",
    views: "24.1K",
    thumbnailUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=500",
    videoUrl: "",
    prompt: "Avant-garde visual fashion twin, high-contrast monochrome studio lighting with dynamic yellow projections, floating geometric earrings, photorealistic skin textures",
    ratio: "9:16",
    duration: "6s"
  },
  {
    id: "v-4",
    title: "Digital Nomad: Tokyo Sunset",
    creatorName: "@RenderExpress",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    likes: "890",
    views: "6.7K",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500",
    videoUrl: "",
    prompt: "Aesthetic male influencer with translucent retro glasses, standing before a realistic Tokyo twilight sunset skyline, soft bokeh, nostalgic warm cinematic grading",
    ratio: "9:16",
    duration: "12s"
  },
  {
    id: "v-5",
    title: "Streetwear AI: Berlin Beats",
    creatorName: "@Seedance",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    likes: "4.5K",
    views: "32.0K",
    thumbnailUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=500",
    videoUrl: "",
    prompt: "Full dynamic portrait of digital girl wearing oversized neon-coral puffer jacket, cyber glasses reflecting digital signage in Berlin subway station, anamorphic flares",
    ratio: "9:16",
    duration: "8s"
  },
  {
    id: "v-6",
    title: "London Pulse: Midnight Glow",
    creatorName: "@StudioX",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    likes: "1.2K",
    views: "9.5K",
    thumbnailUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=500",
    videoUrl: "",
    prompt: "Digital menswear influencer, futuristic leather coat, high-neck collar, standing near high-contrast street shadows of dark cinematic London wet alleyways",
    ratio: "9:16",
    duration: "5s"
  }
];

export default function App() {
  // Global & Core Monetization States
  const [tier, setTier] = useState<SubscriptionTier>('free');
  const [credits, setCredits] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<CreationChannel>('characters');
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  // Active Interactive/Form States
  const [selectedCharacter, setSelectedCharacter] = useState<VideoCard | null>(null);
  const [maximizedVideo, setMaximizedVideo] = useState<VideoCard | null>(null);

  // Sub-Module State: CHARACTER CREATOR
  const [charArchetype, setCharArchetype] = useState<string>('Virtual Influencer');
  const [charStyle, setCharStyle] = useState<string>('Cyberpunk Cyber-Noir');
  const [charGender, setCharGender] = useState<string>('Female Digital Twin');
  const [charVoiceTone, setCharVoiceTone] = useState<string>('Smooth, low-pitch narrative');
  const [selectedTraits, setSelectedTraits] = useState<string[]>(['Mysterious', 'Hyper-detailed']);
  const [generatedCharacter, setGeneratedCharacter] = useState<CharacterProfile | null>(null);
  const [isGeneratingChar, setIsGeneratingChar] = useState<boolean>(false);

  // Sub-Module State: SCENE STORYBOARD BUILDER
  const [scenePrompt, setScenePrompt] = useState<string>('An AI model waking up inside a highly secure mainframe core filled with glowing orange coolant rods.');
  const [sceneDuration, setSceneDuration] = useState<number>(10);
  const [sceneStylePreset, setSceneStylePreset] = useState<string>('Epic Cinematic Sci-Fi');
  const [generatedScenes, setGeneratedScenes] = useState<SceneItem[] | null>(null);
  const [isGeneratingScenes, setIsGeneratingScenes] = useState<boolean>(false);

  // Sub-Module State: VIDEO RENDERER & ACTIVE QUEUE
  const [videoPrompt, setVideoPrompt] = useState<string>('Cinematic render of seedance digital dancer wearing burnt-coral reflective neon threads, dynamic posing, 120fps.');
  const [videoResolution, setVideoResolution] = useState<string>('1080p (HQ Portrait)');
  const [videoAspect, setVideoAspect] = useState<string>('9:16');
  const [videoDurationSecs, setVideoDurationSecs] = useState<number>(8);
  const [videoCameraPreset, setVideoCameraPreset] = useState<string>('Inward Slow Dolly');
  const [isRenderingVideo, setIsRenderingVideo] = useState<boolean>(false);

  // Saved Characters and Consistency Engine
  const [savedCharacters, setSavedCharacters] = useState<CharacterProfile[]>(() => {
    try {
      const stored = localStorage.getItem('seedance_saved_characters_v2');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return [
      {
        name: "Cyberpunk Ava",
        voiceId: "en-US-Studio-F",
        prompt: "9:16 vertical high-end cinematic cyberpunk avatar, neon reflections, red glow on wet skin, cybernetic cheek implants, Unreal Engine 5 render, volumetric rain",
        backstory: "Ava is a high-tech virtual influencer native to Tokyo's neon alleys. She speaks with a digitized smooth tone.",
        archetype: "Virtual Short-Form Influencer",
        style: "Cyberpunk Cyber-Noir",
        gender: "Female Digital Twin",
        voiceTone: "Smooth, low-pitch narrative",
        traits: ["Mysterious", "Hyper-detailed", "Ethereal Glow"]
      },
      {
        name: "Neon Knight",
        voiceId: "en-US-Studio-O",
        prompt: "Medium close-up portrait of high-tech neon physical knight, golden mesh mask, intricate carbon visor, 3D model, octane renderer, cinematic depth of field",
        backstory: "A cybernetically enhanced knight operating in the deep decentralized sub-grids.",
        archetype: "Avant-Garde Cyberpunk Icon",
        style: "Epic Cinematic Sci-Fi",
        gender: "Futuristic Androgynous Entity",
        voiceTone: "Monstrous deep deep ambient synth",
        traits: ["Cybernetic", "High Contrast", "Anamorphic Flare"]
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('seedance_saved_characters_v2', JSON.stringify(savedCharacters));
    } catch (e) {
      console.error(e);
    }
  }, [savedCharacters]);

  const [activeCharacterId, setActiveCharacterId] = useState<string>('none');
  const [customVideoAction, setCustomVideoAction] = useState<string>('walking through a bustling futuristic cityscape under dynamic neon billboards');
  
  // Tasks list (dynamic storage)
  const [generationTasks, setGenerationTasks] = useState<GenerationTask[]>([
    {
      id: "proc-1",
      type: "Seedance Video Render",
      status: "completed",
      progress: 100,
      prompt: "Ultra realistic render of neon avatar under golden sunset backdrop, custom styling, immersive camera orbits",
      resultUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      timestamp: "Just now"
    }
  ]);

  // Sub-Module State: MOTION SUITE DECK
  const [motionPanSpeed, setMotionPanSpeed] = useState<number>(1.5);
  const [motionZoomDepth, setMotionZoomDepth] = useState<number>(2.2);
  const [motionOpticalFlow, setMotionOpticalFlow] = useState<boolean>(true);
  const [motionLoopDuration, setLoopDuration] = useState<number>(4);
  const [motionNoiseRatio, setMotionNoiseRatio] = useState<number>(0.35);

  // Sub-Module State: VIDEO AGENT CHAT CO-PILOT
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      role: 'model',
      text: "Aura Creative Co-Pilot online. Let's engineer your premium vertical cinema specs. Ask me to refine a prompt, design a narrative flow, or recommend camera motions.",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isChatSending, setIsChatSending] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Sub-Module State: BRAND STUDIO
  const [brandName, setBrandName] = useState<string>('Nebula Wear');
  const [brandCoreOffering, setBrandCoreOffering] = useState<string>('Eco-futuristic streetwear with neon fiber optics.');
  const [brandAesthetic, setBrandAesthetic] = useState<string>('Cinematic Luxury Minimalism');
  const [generatedBrandKit, setGeneratedBrandKit] = useState<BrandKit | null>(null);
  const [isGeneratingBrand, setIsGeneratingBrand] = useState<boolean>(false);

  // Auto Scroll Chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Helper: Trigger custom state notifications
  const showNotification = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  // Trait toggle helper
  const handleTraitToggle = (trait: string) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter(t => t !== trait));
    } else {
      if (selectedTraits.length >= 4) {
        showNotification("Maximum 4 traits allowed for profile optimization", "error");
        return;
      }
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  // AI API Hook: Generate Character Profile
  const generateAICharacter = async () => {
    // Check local credits state
    if (credits <= 0) {
      showNotification("Insufficient token credits! Please upgrade or top up in the Billing channel.", "error");
      setActiveTab('billing');
      return;
    }

    setIsGeneratingChar(true);
    setGeneratedCharacter(null);

    try {
      const response = await fetch('/api/generate/character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: charArchetype,
          style: charStyle,
          gender: charGender,
          voiceTone: charVoiceTone,
          traits: selectedTraits
        })
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedCharacter({
          name: data.name,
          voiceId: data.voiceId || 'en-US-Studio-F',
          prompt: data.prompt,
          backstory: data.backstory,
          archetype: charArchetype,
          style: charStyle,
          gender: charGender,
          voiceTone: charVoiceTone,
          traits: selectedTraits
        });
        setCredits(prev => Math.max(0, prev - 1));
        showNotification(`Optimized Avatar Profile Created: ${data.name}! 1 Token consumed.`, 'success');
      } else {
        throw new Error(data.error || "Internal model rejection");
      }
    } catch (err: any) {
      console.error(err);
      showNotification("Failed to generate AI character. Sandbox fallback generated.", "info");
      // Fallback
      setGeneratedCharacter({
        name: `Sovereign ${charArchetype.split(' ')[0]}`,
        voiceId: "en-US-Studio-X",
        prompt: `Hyper-detailed portrait of ${charGender}, styled in ${charStyle}. Electric atmosphere, premium volumetric light rays, perfect 9:16 layout designed for cinematic influencer streams. Spec traits: ${selectedTraits.join(', ')}.`,
        backstory: `Formed under experimental rendering clusters, this digital entity is programmed to embody ${selectedTraits.join(' and ')} characteristics.`,
        archetype: charArchetype,
        style: charStyle,
        gender: charGender
      });
      setCredits(prev => Math.max(0, prev - 1));
    } finally {
      setIsGeneratingChar(false);
    }
  };

  // AI API Hook: Generate Storyboard Sequence
  const generateAIScenes = async () => {
    if (credits <= 0) {
      showNotification("Insufficient token credits! Please upgrade or top up in the Billing channel.", "error");
      setActiveTab('billing');
      return;
    }

    setIsGeneratingScenes(true);
    setGeneratedScenes(null);

    try {
      const response = await fetch('/api/generate/scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawPrompt: scenePrompt,
          durationSeconds: sceneDuration,
          stylePreset: sceneStylePreset
        })
      });

      const data = await response.json();
      if (data.success && data.scenes) {
        setGeneratedScenes(data.scenes);
        setCredits(prev => Math.max(0, prev - 1));
        showNotification("Meticulous 9:16 vertical motion storyboard engineered! 1 Token consumed.", "success");
      } else {
        throw new Error(data.error || "Storyboard compilation failed");
      }
    } catch (err: any) {
      console.error(err);
      showNotification("Reverted to sandbox storyboard compiler due to API availability.", "info");
      setGeneratedScenes([
        {
          sceneId: 1,
          timeRange: "0s - 3s",
          visualDescription: `Macro close-up shot focused on vertical alignment. Reflects custom: ${scenePrompt}. Preset theme matches ${sceneStylePreset}.`,
          cameraMotion: "Zoom depth slow push",
          sfxPrompt: "Ethereal synth riser"
        },
        {
          sceneId: 2,
          timeRange: `3s - ${sceneDuration}s`,
          visualDescription: "Subject turns, looking directly into the cinematic camera. High ambient particle rendering in dark space.",
          cameraMotion: "Lateral pan to 3/4 face ratio",
          sfxPrompt: "Vivid digital sweep sound effect"
        }
      ]);
      setCredits(prev => Math.max(0, prev - 1));
    } finally {
      setIsGeneratingScenes(false);
    }
  };

  // AI API Hook: Video Agent Co-Pilot Chat
  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: `chat-${Date.now()}`,
      role: 'user',
      text: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatSending(true);

    try {
      const history = chatMessages.map(m => ({
        role: m.role,
        text: m.text
      }));
      history.push({ role: 'user', text: userMessage.text });

      const response = await fetch('/api/generate/video-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatHistory: history })
      });

      const data = await response.json();
      if (data.success) {
        const copilotMsg: ChatMessage = {
          id: `chat-model-${Date.now()}`,
          role: 'model',
          text: data.reply,
          timestamp: new Date(),
          specsSuggestion: data.specsSuggestion
        };
        setChatMessages(prev => [...prev, copilotMsg]);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      // Simulated Response
      const simulatedReply = `Creative suggestion loaded! Let's lock in aspect ratio 9:16 and styling with high-contrast burnt-coral. Would you like to map out camera presets now?`;
      const copilotMsg: ChatMessage = {
        id: `chat-model-${Date.now()}`,
        role: 'model',
        text: simulatedReply,
        timestamp: new Date(),
        specsSuggestion: {
          resolution: "1080p Portrait Ultra",
          suggestedStyling: `Burnt-coral glow with midnight charcoal shadows`,
          cameraDirections: "Inward slow dolly combined with subtle rotation roll"
        }
      };
      setChatMessages(prev => [...prev, copilotMsg]);
    } finally {
      setIsChatSending(false);
    }
  };

  // AI API Hook: Generate Brand Kit
  const generateBrandKit = async () => {
    if (credits <= 0) {
      showNotification("Insufficient token credits! Please upgrade or top up in the Billing channel.", "error");
      setActiveTab('billing');
      return;
    }

    if (tier === 'free') {
      showNotification("Brand Studio is a Pro premium feature. Please upgrade your tier.", "error");
      setActiveTab('billing');
      return;
    }

    setIsGeneratingBrand(true);
    setGeneratedBrandKit(null);

    try {
      const response = await fetch('/api/generate/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          coreOffering: brandCoreOffering,
          primaryAesthetic: brandAesthetic
        })
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedBrandKit({
          tagline: data.tagline,
          styleGuide: data.styleGuide,
          marketingHooks: data.marketingHooks
        });
        setCredits(prev => Math.max(0, prev - 1));
        showNotification("Brand Identity Assets generated and securely loaded!", "success");
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      showNotification("Failed to fetch custom Brand Asset. Standardized identity loaded.", "info");
      setGeneratedBrandKit({
        tagline: `${brandName.toUpperCase()} : Redesigning Creative Presence`,
        styleGuide: {
          primaryColor: "#FF5722",
          secondaryColor: "#0B0F19",
          typographyAccent: brandAesthetic,
          moodboardPrompt: `Elegant minimal rendering for ${brandName}, styling optimized with carbon fiber texture and neon accent layers.`
        },
        marketingHooks: [
          `No actors. No cameras. Infinite potential. Introducing the futuristic ${brandName} AI look.`,
          "Custom rendered fashion twins made to outsmart algorithms.",
          "Your digital content, visualised beautifully without limits."
        ]
      });
      setCredits(prev => Math.max(0, prev - 1));
    } finally {
      setIsGeneratingBrand(false);
    }
  };

  // Action Hook: Trigger high-fidelity video rendering simulation & queue tasks
  const startVideoGeneration = () => {
    if (credits <= 0) {
      showNotification("Insufficient credits. Please top up or upgrade to Plus / Pro.", "error");
      setActiveTab('billing');
      return;
    }

    setIsRenderingVideo(true);
    const taskId = `task-${Date.now()}`;
    
    // Check Tier processing speeds
    const completionDuration = tier === 'pro' ? 2500 : tier === 'plus' ? 4500 : 7000;
    
    const newTask: GenerationTask = {
      id: taskId,
      type: "Seedance Video Render (9:16)",
      status: 'queued',
      progress: 5,
      prompt: videoPrompt,
      timestamp: "Processing Now"
    };

    setGenerationTasks(prev => [newTask, ...prev]);
    showNotification("Video initialization sequence sent. Check the production monitor.", "info");

    // Interval to simulate progressive pipeline rendering
    let currentProgress = 5;
    const interval = setInterval(() => {
      currentProgress += 20;
      setGenerationTasks(prev => 
        prev.map(t => {
          if (t.id === taskId) {
            const nextStatus = currentProgress >= 100 ? 'completed' : currentProgress > 45 ? 'rendering' : 'queued';
            
            // Resolve character-aware consistent thumbnail
            let characterThumbnail = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400";
            if (activeCharacterId !== 'none') {
              if (activeCharacterId.toLowerCase().includes("ava")) {
                characterThumbnail = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400";
              } else if (activeCharacterId.toLowerCase().includes("knight")) {
                characterThumbnail = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400";
              } else {
                const idx = savedCharacters.findIndex(c => c.name === activeCharacterId);
                characterThumbnail = idx % 2 === 0
                  ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
                  : "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400";
              }
            } else if (videoPrompt.toLowerCase().includes("vogue") || videoPrompt.toLowerCase().includes("fashion")) {
              characterThumbnail = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400";
            } else if (videoPrompt.toLowerCase().includes("nomad") || videoPrompt.toLowerCase().includes("glasses")) {
              characterThumbnail = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400";
            }

            return {
              ...t,
              progress: Math.min(currentProgress, 100),
              status: nextStatus,
              resultUrl: currentProgress >= 100 ? characterThumbnail : undefined
            };
          }
          return t;
        })
      );

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsRenderingVideo(false);
        setCredits(prev => Math.max(0, prev - 1));
        showNotification("Seedance 2.0 Vertical Video Render Synthetic Layer compiled!", "success");
      }
    }, completionDuration / 5);
  };

  // Action: Mimic Stripe Checkout
  const handleStripeCheckout = async (selectedPlan: SubscriptionTier, priceUSD: string) => {
    showNotification(`Contacting Secure Stripe Checkout Gateway for ${selectedPlan.toUpperCase()} tier...`, "info");
    
    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          billingCycle: isYearly ? 'yearly' : 'monthly',
          price: priceUSD
        })
      });

      const data = await response.json();
      if (data.success) {
        // Success Checkout Transition
        setTier(selectedPlan);
        setCredits(data.updatedCredits);
        showNotification(`Stripe Payment Validated successfully! Account Tier upgraded to ${selectedPlan.toUpperCase()}. Added tokens.`, 'success');
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error(err);
      showNotification("Stripe Simulator: Transaction authorized locally! Account upgraded successfully.", "success");
      setTier(selectedPlan);
      setCredits(selectedPlan === 'pro' ? 9999 : 500);
    }
  };

  const handleSelectCharacterForPrompt = (card: VideoCard) => {
    setSelectedCharacter(card);
    setVideoPrompt(`Create a customized 9:16 vertical render based on professional character ${card.title}. Original aesthetic: ${card.prompt}. Accent colors adapted to neon-orange overlay.`);
    setVideoCameraPreset('Dynamic Rotation Shift');
    showNotification(`Selected character "${card.title}" specs compiled into Generator.`, "success");
    setActiveTab('videos');
  };

  const handleSaveAICharacter = (char: CharacterProfile) => {
    if (savedCharacters.some(c => c.name.toLowerCase() === char.name.toLowerCase())) {
      showNotification(`"${char.name}" is already saved in your Cast Library.`, "info");
      return;
    }
    setSavedCharacters(prev => [char, ...prev]);
    showNotification(`Added "${char.name}" to your persistent Cast Library!`, "success");
  };

  const handleSaveTrendingCharacter = (video: VideoCard) => {
    const char: CharacterProfile = {
      name: video.title,
      voiceId: "en-US-Studio-F",
      prompt: video.prompt,
      backstory: `Curated digital twin from Seedance portfolio. Original concept: ${video.title}.`,
      archetype: "Virtual Short-Form Influencer",
      style: "Cyberpunk Cyber-Noir",
      gender: "Female Digital Twin",
      voiceTone: "Smooth, low-pitch narrative",
      traits: ["Hyper-detailed", "Optimized Core"]
    };
    if (savedCharacters.some(c => c.name.toLowerCase() === char.name.toLowerCase())) {
      showNotification(`"${video.title}" is already in your Cast Library.`, "info");
      return;
    }
    setSavedCharacters(prev => [char, ...prev]);
    showNotification(`Added "${video.title}" to your persistent Cast Library!`, "success");
  };

  const handleSelectSavedCharacterForPrompt = (char: CharacterProfile) => {
    setActiveCharacterId(char.name);
    // Find if we have a custom prompt structure or composite prompt setup
    setVideoPrompt(char.prompt);
    showNotification(`Active Cast Selected: Dynamic model syncs with "${char.name}". Ready in Looping Suite!`, "success");
    setActiveTab('videos');
  };

  // Trait seeds
  const TRAIT_SUGGESTIONS = [
    'Mysterious', 'Hyper-detailed', 'Ethereal Glow', 'Cybernetic', 'Neon Hair', 
    'Cinematic Dust', 'Volumetric Fog', 'High Contrast', 'Sunset Backdrop', 'Anamorphic Flare'
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans relative antialiased selection:bg-[#FF5722] selection:text-white">
      
      {/* 1. TOP VIEWPORT REAL-TIME ANNOUNCEMENT ALERTS BAR */}
      <div className="bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FF8A65] text-white py-2 px-4 text-xs font-semibold tracking-wider text-center flex items-center justify-center gap-3 transition-all">
        <Sparkle className="w-4 h-4 animate-spin text-white flex-shrink-0" />
        <span>
          {tier === 'free' ? (
            <span>⚠️ Running low on credits. {credits} remaining. Sponsored Mode Active.</span>
          ) : tier === 'plus' ? (
            <span>✦ Premium PLUS tier active. Fast render speeds enabled. {credits} credits left.</span>
          ) : (
            <span>⚡ ULTRA PRO workspace fully unlocked. Infinite credits loaded. Render speeds optimized.</span>
          )}
        </span>
        {tier !== 'pro' && (
          <button 
            onClick={() => setActiveTab('billing')} 
            className="underline hover:text-[#0B0F19] ml-2 font-bold cursor-pointer transition"
          >
            Top up now / Upgrade Workspaces ➔
          </button>
        )}
      </div>

      {/* 2. FIXED GLASSMORPH NAV HEADER */}
      <header className="sticky top-0 z-50 bg-[#1A1F2C]/80 backdrop-blur-md border-b border-[#2D3748] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo with burning gradient theme color */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('characters')}>
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5722] to-[#FF8A65] flex items-center justify-center text-black font-black text-lg glow-coral-subtle shadow-sm">
              ▲
            </span>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FF8A65]">
                AuraMedia
              </span>
              <span className="text-[9px] text-[#FF8A65] font-mono tracking-widest uppercase -mt-1">
                STUDIO • SEEDANCE 2.0
              </span>
            </div>
          </div>

          {/* Creation Channels Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'characters', label: 'Characters' },
              { id: 'scenes', label: 'Scenes' },
              { id: 'videos', label: 'Videos' },
              { id: 'motion', label: 'Motion' },
              { id: 'video-agent', label: 'Video Agent', isNew: true },
              { id: 'brand-studio', label: 'Brand Studio', isNew: true },
              { id: 'showcase', label: 'Showcase' },
              { id: 'my-content', label: 'My Content' },
              { id: 'billing', label: 'Billing' }
            ].map(tab => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as CreationChannel)}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition duration-150 cursor-pointer relative ${
                  activeTab === tab.id 
                    ? 'text-white bg-[#1A1F2C] border-b-2 border-[#FF5722] shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
                {tab.isNew && (
                  <span className="absolute -top-1 -right-1 text-[8px] px-1 bg-[#FF5722] text-black font-black rounded-full scale-90">
                    NEW
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Tab Fallback Trigger */}
          <div className="lg:hidden flex items-center">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value as CreationChannel)}
              className="bg-[#1A1F2C] text-xs font-semibold text-white px-2 py-1 rounded border border-[#2D3748]"
            >
              <option value="characters">Characters</option>
              <option value="scenes">Scenes</option>
              <option value="videos">Videos</option>
              <option value="motion">Motion</option>
              <option value="video-agent">Video Agent (New)</option>
              <option value="brand-studio">Brand Studio (New)</option>
              <option value="showcase">Showcase</option>
              <option value="my-content">My Content</option>
              <option value="billing">Billing</option>
            </select>
          </div>

          {/* Right Actions Block */}
          <div className="flex items-center gap-4">
            {/* Tokens wallet counter container */}
            <div className="bg-[#1A1F2C] border border-[#2D3748] px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold font-mono transition-transform hover:scale-105">
              <Coins className="w-3.5 h-3.5 text-[#FF8A65]" />
              <span className="text-gray-300">Wallet:</span>
              <span className="text-white hover:text-gradient-coral">
                {tier === 'pro' ? 'Infinite' : `${credits} Tokens`}
              </span>
            </div>

            {/* User workspace circle profile */}
            <div 
              onClick={() => setActiveTab('billing')}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF5722] to-[#FF8A65] border-2 border-[#2D3748] flex items-center justify-center cursor-pointer text-black font-black text-xs hover:ring-2 hover:ring-[#FF5722] transition-all"
              title="Workspace Control panel"
            >
              {tier === 'free' ? 'F' : tier === 'plus' ? 'P' : 'PRO'}
            </div>
          </div>

        </div>
      </header>

      {/* 3. DYNAMIC TOAST STATEMENTS */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#1A1F2C] border-l-4 border-[#FF5722] rounded-r p-4 shadow-2xl text-xs flex items-center gap-3 transition-all duration-300 transform translate-y-0 text-white animate-fade-in-up">
          <div className="p-1 rounded-full bg-[#FF5722]/20">
            <Sparkles className="w-4 h-4 text-[#FF5722]" />
          </div>
          <div>
            <p className="font-bold text-gray-200">System Notification</p>
            <p className="text-gray-400 text-[11px] mt-0.5">{toastMessage.text}</p>
          </div>
        </div>
      )}

      {/* CORE CANVAS WORKSPACE CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* VIEW: MAIN WORKSPACE OR DASHBOARD RENDER SHARING SPLIT LAYOUT */}
        {activeTab === 'characters' && (
          <div className="flex flex-col gap-10">
            
            {/* Split-Hero UI Setup (40/60 Split Architecture Canvas) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Panel (40% Column Layout) */}
              <div className="lg:col-span-5 bg-[#1F2633] rounded-2xl p-8 border border-[#2D3748] flex flex-col justify-between overflow-hidden relative group glow-coral-subtle">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF5722]/10 to-transparent rounded-full pointer-events-none"></div>
                
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF8A65] text-[10px] font-black tracking-widest uppercase mb-6 animate-pulse">
                    <Sparkle className="w-3 h-3 text-[#FF5722]" />
                    <span>NEW • FLAGSHIP READY</span>
                  </div>
                  
                  <h1 className="font-display font-extrabold text-[#FFFFFF] text-4xl sm:text-5xl tracking-tight leading-none mb-6">
                    MEET<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] to-[#FF8A65]">
                      SEEDANCE 2.0
                    </span>
                  </h1>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    Configure next-generation avatar assets optimized with AI model structures, built for vertical 9:16 mobile feeds.
                  </p>

                  <div className="space-y-4 border-t border-[#2D3748] pt-6 mb-8">
                    <div className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5722] mt-1.5"></div>
                      <p className="text-xs text-gray-400">
                        <strong className="text-white">Seamless Sync:</strong> Generates flawless 9:16 portrait prompt schemas with optimized lighting keywords.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5722] mt-1.5"></div>
                      <p className="text-xs text-gray-400">
                        <strong className="text-white">Dynamic Presets:</strong> Pre-programmed with luxury digital cinema models instantly loadable.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => {
                      showNotification("Opening Generation Workspace...", "info");
                      setActiveTab('videos');
                    }}
                    className="flex-1 min-w-[140px] px-6 py-3.5 bg-gradient-to-r from-[#FF5722] to-[#FF8A65] hover:from-[#FF7043] hover:to-[#FF5722] text-black font-extrabold text-sm rounded-xl tracking-wide flex items-center justify-center gap-2 transition glow-coral cursor-pointer"
                  >
                    Try Seedance ✦
                  </button>
                  <button 
                    onClick={() => {
                      showNotification("Scrolling down to interactive Showcase...", "info");
                      setActiveTab('showcase');
                    }}
                    className="flex-1 min-w-[140px] px-6 py-3.5 bg-[#1A1F2C] hover:bg-[#2D3748]/70 text-white font-bold text-sm rounded-xl border border-[#2D3748] transition cursor-pointer"
                  >
                    See Examples
                  </button>
                </div>
              </div>

              {/* Right Panel (60% Column holding Masonry Gallery Renders) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-sm tracking-widest text-[#FF8A65] uppercase flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#FF5722]" />
                    Trending Digital Twins Core Catalogue
                  </h3>
                  <span className="text-xs text-gray-400 font-mono">9:16 Vertical Render Frames</span>
                </div>

                <div id="character-showcase-grid" className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {PRESEEDED_VIDEOS.map((item) => (
                    <div 
                      key={item.id} 
                      className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-[#1A1F2C] border border-[#2D3748] transition-all hover:border-[#FF5722] hover:-translate-y-1 shadow-lg"
                    >
                      {/* Image Preview */}
                      <img 
                        src={item.thumbnailUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
                        loading="lazy"
                      />
                      
                      {/* Premium Top Label Header */}
                      <div className="absolute top-2 left-2 bg-[#0B0F19]/80 backdrop-blur-sm border border-[#2D3748] px-2 py-0.5 rounded text-[9px] font-mono text-gray-300">
                        {item.creatorName}
                      </div>

                      {/* Interactive Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3 transform transition-all duration-300">
                        <p className="text-[10px] font-semibold text-[#FF8A65] uppercase tracking-wider">{item.duration} Portrait</p>
                        <h4 className="font-semibold text-xs text-white truncate mb-2">{item.title}</h4>
                        
                        {/* Dynamic Quick Actions on hover */}
                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <button 
                            onClick={() => handleSelectCharacterForPrompt(item)}
                            className="bg-gradient-to-r from-[#FF5722] to-[#FF8A65] text-black text-[10px] font-extrabold py-1 rounded cursor-pointer hover:opacity-90 flex items-center justify-center gap-1"
                          >
                            <Sparkle className="w-2.5 h-2.5" /> Prompt Setup
                          </button>
                          <button 
                            onClick={() => handleSaveTrendingCharacter(item)}
                            className="bg-[#0B0F19]/90 text-white hover:text-[#FF8A65] border border-[#2D3748] hover:border-[#FF5722]/50 text-[10px] py-1 rounded cursor-pointer flex items-center justify-center gap-1 transition"
                          >
                            <Save className="w-2.5 h-2.5" /> Save Character
                          </button>
                          <button 
                            onClick={() => setMaximizedVideo(item)}
                            className="bg-[#1F2633] text-white text-[10px] py-1 border border-[#2D3748] rounded cursor-pointer hover:bg-slate-800 flex items-center justify-center gap-1"
                          >
                            <Maximize2 className="w-2.5 h-2.5 text-[#FF8A65]" /> Maximize Video
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* YOUR SAVED CHARACTER CAST & PORTABILITY HUB */}
            <div className="bg-[#1A1F2C] border-2 border-dashed border-[#2D3748] hover:border-[#FF5722]/40 rounded-2xl p-6 sm:p-8 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2D3748] pb-6 mb-6 gap-4">
                <div>
                  <h2 className="font-display font-black text-xl tracking-tight text-white flex items-center gap-2">
                    <Star className="text-[#FF5722] w-5 h-5 fill-[#FF5722]" />
                    MY SAVED CHARACTER CAST ({savedCharacters.length})
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">
                    Your collection of persistent facial schemas and voice structures. Keep rendering consistent high-fidelity loops using these characters.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-[#0B0F19] px-3.5 py-1.5 rounded-full border border-[#2D3748]">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-mono text-[10px]">CAST SYNCHRONIZED WITH LOCALSTORAGE</span>
                </div>
              </div>

              {savedCharacters.length === 0 ? (
                <div className="text-center py-10 bg-[#0B0F19]/40 rounded-xl max-w-md mx-auto p-6 border border-[#2D3748]">
                  <User className="w-10 h-10 text-gray-600 mx-auto mb-3 animate-pulse" />
                  <p className="font-semibold text-xs text-gray-300">No Characters Saved Yet</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Generate a portrait twin in the spec engine below or hover over trending digital twins above and click "Save Character".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedCharacters.map((char, index) => {
                    let visualUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250";
                    if (char.name.toLowerCase().includes("knight") || (char.style && char.style.toLowerCase().includes("knight"))) {
                      visualUrl = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250";
                    } else if (index % 3 === 1) {
                      visualUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250";
                    } else if (index % 3 === 2) {
                      visualUrl = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=250";
                    }

                    const isActive = activeCharacterId === char.name;

                    return (
                      <div 
                        key={`${char.name}-${index}`} 
                        className={`bg-[#0B0F19] rounded-2xl overflow-hidden border p-4.5 flex items-start gap-4 transition-all duration-300 relative group ${
                          isActive 
                            ? 'border-[#FF5722] shadow-[0_0_15px_rgba(255,87,34,0.15)] ring-1 ring-[#FF5722]/30' 
                            : 'border-[#2D3748] hover:border-gray-600'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute top-2.5 right-2.5 bg-[#FF5722] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            ACTIVE CAST
                          </span>
                        )}

                        <div className="w-16 h-20 rounded-lg overflow-hidden bg-slate-900 border border-[#2D3748] flex-shrink-0 relative group">
                          <img 
                            src={visualUrl} 
                            alt={char.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300" 
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                          <div>
                            <h4 className="font-bold text-xs text-white truncate">{char.name}</h4>
                            <p className="text-[10px] text-gray-400 font-mono capitalize overflow-hidden text-ellipsis whitespace-nowrap">{char.archetype || 'Custom Character'}</p>
                            <p className="text-[10px] text-[#FF8A65] font-mono truncate">{char.style || 'Custom style'}</p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSelectSavedCharacterForPrompt(char)}
                              className="text-[9px] bg-gradient-to-r from-[#FF5722] to-[#FF8A65] text-black hover:opacity-90 px-2 py-1 rounded font-black cursor-pointer flex items-center gap-1 transition-all"
                              title="Generate Loops using this character"
                            >
                              <Video className="w-2.5 h-2.5" /> Make Video
                            </button>
                            <button
                              onClick={() => {
                                showNotification(`🗣️ Synthesizing voice line for ${char.name}... [Profile: ${char.voiceId || "en-US-Studio-F"}]`, "info");
                              }}
                              className="text-[9px] bg-[#1A1F2C] hover:bg-[#2D3748] text-white p-1 rounded cursor-pointer border border-[#2D3748]"
                              title="Audition Voice"
                            >
                              <Volume2 className="w-2.5 h-2.5" />
                            </button>
                            <button
                              onClick={() => {
                                setSavedCharacters(prev => prev.filter(c => c.name !== char.name));
                                if (activeCharacterId === char.name) setActiveCharacterId('none');
                                showNotification(`Character "${char.name}" removed from Cast Library.`, "info");
                              }}
                              className="text-[9.5px] bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 p-1 rounded cursor-pointer"
                              title="Discard"
                            >
                              <Trash2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* AI Generator Interface Canvas (Interactive characters Builder) */}
            <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2D3748] pb-6 mb-8 gap-4">
                <div>
                  <h2 className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-2">
                    <User className="text-[#FF5722] w-6 h-6" />
                    AI SPECIFICATIONS ENGINE (9:16 CLUSTERING)
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">
                    Harness Gemini AI server-side models to generate meticulous character prompt matrices and voice traits.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400 font-mono">Processing:</span>
                  <span className="bg-[#0B0F19] text-xs px-2.5 py-1 text-[#FF8A65] rounded border border-[#2D3748] font-bold">
                    {tier === 'free' ? 'Standard Queue (Ad Sponsor)' : 'Turbo HD Cluster'}
                  </span>
                </div>
              </div>

              {/* Form and Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left controls panel */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Digital Twin Archetype
                    </label>
                    <select 
                      value={charArchetype}
                      onChange={(e) => setCharArchetype(e.target.value)}
                      className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-3 text-sm text-gray-200 outline-none transition"
                    >
                      <option value="Virtual Short-Form Influencer">Virtual Short-Form Influencer</option>
                      <option value="Tech Guru Evangelist">Tech Guru Evangelist</option>
                      <option value="Avant-Garde Cyberpunk Icon">Avant-Garde Cyberpunk Icon</option>
                      <option value="Retro Gaming Streamer Twin">Retro Gaming Streamer Twin</option>
                      <option value="High Fashion Vogue Hologram">High Fashion Vogue Hologram</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Visual Rendering Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Cyberpunk Cyber-Noir',
                        'Epic Cinematic Sci-Fi',
                        'Surreal Holographic Render',
                        'Photorealistic Octane-3D'
                      ].map((style) => (
                        <button
                          key={style}
                          onClick={() => setCharStyle(style)}
                          className={`px-3 py-2 text-xs rounded-lg border text-left font-medium transition ${
                            charStyle === style 
                              ? 'bg-[#FF5722]/10 border-[#FF5722] text-[#FF8A65]' 
                              : 'bg-[#0B0F19] border-[#2D3748] text-gray-400 hover:text-white'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Posturing Expression
                      </label>
                      <select 
                        value={charGender}
                        onChange={(e) => setCharGender(e.target.value)}
                        className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2 text-xs text-gray-200 outline-none transition"
                      >
                        <option value="Female Digital Twin">Female Core</option>
                        <option value="Male Digital Twin">Male Core</option>
                        <option value="Futuristic Androgynous Entity">Androgynous Mesh</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Synthetic Voice Profile
                      </label>
                      <select 
                        value={charVoiceTone}
                        onChange={(e) => setCharVoiceTone(e.target.value)}
                        className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2 text-xs text-gray-200 outline-none transition"
                      >
                        <option value="Smooth, low-pitch narrative">Smooth Narrative</option>
                        <option value="Energetic high-fidelity synthetic">Energetic Synthetic</option>
                        <option value="Echoing holographic whisper">Holographic Whisper</option>
                        <option value="Monstrous deep deep ambient synth">Deep Sub-bass</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Spark Traits Tags (Select up to 4)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TRAIT_SUGGESTIONS.map((tag) => {
                        const active = selectedTraits.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => handleTraitToggle(tag)}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded transition ${
                              active 
                                ? 'bg-[#FF5722] text-black font-extrabold' 
                                : 'bg-[#0B0F19] text-gray-400 hover:text-white border border-[#2D3748]'
                            }`}
                          >
                            {active ? '✓ ' : ''}{tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={generateAICharacter}
                    disabled={isGeneratingChar}
                    className="w-full py-4 bg-gradient-to-r from-[#FF5722] to-[#FF8A65] hover:from-[#FF7043] hover:to-[#FF5722] text-black font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer text-sm"
                  >
                    {isGeneratingChar ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Engineering Prompt Matrix...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Portrait Twin Layout ✦</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Right generated output spec screen */}
                <div className="lg:col-span-7 bg-[#0B0F19] border border-[#2D3748] rounded-2xl p-6 flex flex-col justify-between min-h-[300px]">
                  
                  {isGeneratingChar ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-4 border-[#2D3748] border-t-[#FF5722] animate-spin"></div>
                        <Sparkles className="w-5 h-5 text-[#FF8A65] absolute inset-0 m-auto animate-pulse" />
                      </div>
                      <p className="font-display font-medium text-xs text-[#FF8A65] tracking-widest text-center uppercase animate-pulse">
                        Querying Gemini-3.5-Flash Server-Side Cluster...
                      </p>
                      <div className="text-[10px] text-gray-500 font-mono text-center max-w-sm">
                        Optimizing cinematic parameters, mapping coordinates, and synthesizing speech voice profile settings.
                      </div>
                    </div>
                  ) : generatedCharacter ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#2D3748] pb-4">
                        <div>
                          <span className="text-[10px] text-[#FF8A65] font-mono tracking-widest uppercase">GENERATED PROFILE SUCCESS</span>
                          <h3 className="font-display font-black text-xl text-white">{generatedCharacter.name}</h3>
                        </div>
                        <div className="text-right">
                          <span className="bg-[#1A1F2C] border border-[#2D3748] px-2.5 py-1 text-[10px] text-[#FF8A65] font-mono rounded">
                            Voice: {generatedCharacter.voiceId}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-[#1A1F2C] p-4 rounded-xl border border-[#2D3748] relative group">
                          <span className="absolute top-2 right-2 text-[9px] font-mono text-gray-500">OPTIMIZED CAMERA PROMPT</span>
                          <span className="text-[10px] text-gray-400 font-bold block mb-1">Generated Seedance Prompt Parameters:</span>
                          <p className="text-gray-200 text-xs font-mono leading-relaxed bg-[#0B0F19] p-3 rounded border border-gray-800">
                            {generatedCharacter.prompt}
                          </p>
                          <div className="flex justify-end gap-2 mt-3">
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(generatedCharacter.prompt);
                                showNotification("Copied prompt metadata to clipboard", "success");
                              }}
                              className="text-[10px] font-bold text-gray-400 hover:text-white flex items-center gap-1 bg-[#0B0F19] px-2 py-1 rounded cursor-pointer"
                            >
                              <Copy className="w-3 h-3" /> Copy Prompt
                            </button>
                            <button
                              onClick={() => {
                                setVideoPrompt(generatedCharacter.prompt);
                                showNotification("Sent specs to Videos tab. Render away!", "success");
                                setActiveTab('videos');
                              }}
                              className="text-[10px] font-bold text-[#FF8A65] hover:text-[#FF5722] flex items-center gap-1 bg-[#FF5722]/10 px-2.5 py-1 rounded cursor-pointer"
                            >
                              <Video className="w-3 h-3" /> Push to Video Generator
                            </button>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-400 font-bold block mb-1">Identified Avatar Narrative Bio:</span>
                          <p className="text-xs text-gray-300 italic leading-relaxed bg-[#1A1F2C] p-3.5 rounded border border-[#2D3748]">
                            &ldquo;{generatedCharacter.backstory}&rdquo;
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-[#2D3748] pt-4 flex flex-wrap gap-2 items-center justify-between">
                        <span className="text-[10px] font-mono text-gray-500">Engine Source: @google/genai Model</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveAICharacter(generatedCharacter)}
                            className="text-xs bg-[#1A1F2C] hover:bg-[#1E2633] text-white hover:text-[#FF8A65] border border-[#2D3748] hover:border-[#FF5722]/50 px-4 py-2 font-bold rounded-lg cursor-pointer flex items-center gap-1.5 transition-all"
                          >
                            <Save className="w-3.5 h-3.5 text-[#FF8A65]" />
                            Save to Cast
                          </button>
                          <button
                            onClick={() => {
                              showNotification("Speeds upgraded on Plus/Pro. Simulating HD Portrait render...", "info");
                              setVideoPrompt(generatedCharacter.prompt);
                              setActiveTab('videos');
                            }}
                            className="text-xs bg-gradient-to-r from-[#FF5722] to-[#FF8A65] text-black px-4 py-2 font-bold rounded-lg cursor-pointer"
                          >
                            Render Digital Twin
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                      <User className="w-12 h-12 text-[#2D3748] mb-4 animate-bounce" />
                      <p className="font-display font-semibold text-sm text-gray-300">Specifications Container Empty</p>
                      <p className="text-xs max-w-xs mt-1">
                        Select an archetype, apply styling tags, and click Generate portrait layout to initiate Gemini-AI generation.
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* VIEW: SCENE STORYBOARD BUILDER CHANNEL */}
        {activeTab === 'scenes' && (
          <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row justify-between mb-8 pb-6 border-b border-[#2D3748] gap-4">
              <div>
                <h2 className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-2">
                  <Tv className="text-[#FF5722] w-6 h-6" />
                  CINEMATIC VERTICAL SCENE SEQUENCES
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  Draft story sketches, timeline beats, and synthetic sound parameters dynamically formatted in vertical space.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 font-mono">Credits per storyboard:</span>
                <span className="bg-red-500/10 text-red-400 border border-red-500/30 text-xs px-2.5 py-1 rounded font-mono font-bold">
                  1 Token
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form container */}
              <div className="lg:col-span-4 space-y-6 bg-[#0B0F19] border border-[#2D3748] p-6 rounded-2xl">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Core Premise / Script Narrative
                  </label>
                  <textarea
                    rows={4}
                    value={scenePrompt}
                    onChange={(e) => setScenePrompt(e.target.value)}
                    placeholder="Describe what occurs across your film..."
                    className="w-full bg-[#1A1F2C] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2.5 text-xs text-gray-200 outline-none transition resize-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Total Duration
                    </label>
                    <select
                      value={sceneDuration}
                      onChange={(e) => setSceneDuration(Number(e.target.value))}
                      className="w-full bg-[#1A1F2C] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2 text-xs text-gray-300"
                    >
                      <option value={5}>5 Seconds</option>
                      <option value={10}>10 Seconds</option>
                      <option value={15}>15 Seconds (Premium)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Studio Stylizer Preset
                    </label>
                    <select
                      value={sceneStylePreset}
                      onChange={(e) => setSceneStylePreset(e.target.value)}
                      className="w-full bg-[#1A1F2C] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2 text-xs text-gray-300"
                    >
                      <option value="Epic Cinematic Sci-Fi">Epic Sci-Fi</option>
                      <option value="Dark Gritty Cyber-Noir">Dark Cyber-Noir</option>
                      <option value="Cyberpunk Volumetric Neon">Cyberpunk Volumetric</option>
                      <option value="Minimal Noir Aesthetic">Minimal Noir</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateAIScenes}
                  disabled={isGeneratingScenes}
                  className="w-full py-4 bg-gradient-to-r from-[#FF5722] to-[#FF8A65] hover:from-[#FF7043] hover:to-[#FF5722] text-black font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer text-xs"
                >
                  {isGeneratingScenes ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Simulating Storyboard Flow...</span>
                    </>
                  ) : (
                    <>
                      <Tv className="w-4 h-4" />
                      <span>Generate Storyboard Output ✦</span>
                    </>
                  )}
                </button>
              </div>

              {/* Generated dynamic sequence outputs */}
              <div className="lg:col-span-8 space-y-4">
                {isGeneratingScenes ? (
                  <div className="h-full min-h-[300px] border border-[#2D3748] bg-[#0B0F19] rounded-2xl flex flex-col items-center justify-center p-8 space-y-4">
                    <Activity className="w-12 h-12 text-[#FF5722] animate-pulse" />
                    <p className="font-display font-medium text-xs text-[#FF5722] tracking-widest uppercase animate-bounce">
                      Engineering sequence frames with smart sound design...
                    </p>
                  </div>
                ) : generatedScenes ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gray-400">Sequence Frame Storyboards</span>
                      <button 
                        onClick={() => {
                          setGeneratedScenes(null);
                          showNotification("Storyboard reset successfully.", "info");
                        }}
                        className="text-[10px] text-red-400 hover:underline bg-red-500/10 px-2.5 py-1 rounded"
                      >
                        Reset Sequence
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedScenes.map((scene) => (
                        <div 
                          key={scene.sceneId} 
                          className="bg-[#0B0F19] border border-[#2D3748] rounded-xl p-5 hover:border-[#FF5722]/50 transition-all space-y-3 relative group"
                        >
                          <div className="flex items-center justify-between border-b border-[#2D3748] pb-2">
                            <span className="text-xs text-[#FF8A65] font-mono font-bold uppercase">Scene #{scene.sceneId}</span>
                            <span className="text-[10px] font-mono text-gray-400 bg-[#1A1F2C] px-2 py-0.5 rounded border border-[#2D3748]">
                              Time: {scene.timeRange}
                            </span>
                          </div>

                          <div>
                            <span className="text-[9px] text-gray-500 font-bold block mb-1">VISUAL DESCRIPTION (9:16 ALIGN):</span>
                            <p className="text-xs text-gray-200 leading-relaxed font-mono">
                              {scene.visualDescription}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1C2333]">
                            <div>
                              <span className="text-[9px] text-gray-500 font-bold block">CAMERA MOTION:</span>
                              <span className="text-[10px] text-[#FF8A65] font-medium block mt-0.5">{scene.cameraMotion}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-gray-500 font-bold block">SYNTH SFX PROMPT:</span>
                              <span className="text-[10px] text-gray-300 font-medium block truncate mt-0.5" title={scene.sfxPrompt}>
                                {scene.sfxPrompt}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[300px] border border-[#2D3748] bg-[#0B0F19] rounded-2xl flex flex-col items-center justify-center p-8 text-center text-gray-500">
                    <Tv className="w-12 h-12 text-[#2D3748] mb-4" />
                    <p className="font-display font-semibold text-sm text-gray-300">Cinematic storyboards not active</p>
                    <p className="text-xs max-w-sm mt-1">
                      Enter screen prompts, set durations, and trigger story sequence compiler to watch your scenes generate with exact audio plans.
                    </p>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* VIEW: VIDEO GENERATOR & PRODUCTION QUEUE */}
        {activeTab === 'videos' && (
          <div className="flex flex-col gap-8">
            
            <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row justify-between mb-8 pb-6 border-b border-[#2D3748] gap-4">
                <div>
                  <h2 className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-2">
                    <Video className="text-[#FF5722] w-6 h-6" />
                    SEEDANCE 2.0 DIGITAL LOOPING SUITE
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">
                    Instantly parameterize vertical animations, deploy prompt nodes, and check live system queues.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400 font-mono">Render Status:</span>
                  <span className="bg-[#FF5722]/10 border border-[#FF5722]/30 text-xs px-2.5 py-1 text-[#FF8A65] rounded font-bold uppercase tracking-wider animate-pulse">
                    READY
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Visual rendering configuration controls */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Stable Consistency Cast Portability Selector */}
                  <div className="bg-[#131924] p-5 rounded-2xl border border-[#2D3748] space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-[#FF5722] fill-[#FF5722]" />
                        Consistent Character Casting
                      </label>
                      <select
                        value={activeCharacterId}
                        onChange={(e) => {
                          const val = e.target.value;
                          setActiveCharacterId(val);
                          if (val === 'none') {
                            setVideoPrompt('Cinematic render of seedance digital dancer wearing burnt-coral reflective neon threads, dynamic posing, 120fps.');
                          } else {
                            const char = savedCharacters.find(c => c.name === val);
                            if (char) {
                              setVideoPrompt(`${char.prompt}, ${customVideoAction}`);
                              showNotification(`Synched character "${char.name}" constraints. Let's write customized scenes!`, "success");
                            }
                          }
                        }}
                        className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] text-xs text-gray-200 outline-none transition py-3 px-3.5 rounded-xl cursor-pointer"
                      >
                        <option value="none">-- Full Manual Mode (No Stable Character) --</option>
                        {savedCharacters.map((char, idx) => (
                          <option key={`${char.name}-${idx}`} value={char.name}>
                            👤 {char.name} ({char.archetype || 'Custom Twin'})
                          </option>
                        ))}
                      </select>
                    </div>

                    {activeCharacterId !== 'none' ? (
                      <div className="space-y-4 pt-1 animate-fade-in">
                        <div>
                          <label className="block text-xs font-bold text-[#FF8A65] uppercase tracking-wider mb-2">
                            Custom Scene Action / Scenario
                          </label>
                          <textarea
                            rows={3}
                            value={customVideoAction}
                            onChange={(e) => {
                              const actionText = e.target.value;
                              setCustomVideoAction(actionText);
                              const char = savedCharacters.find(c => c.name === activeCharacterId);
                              if (char) {
                                setVideoPrompt(`${char.prompt}, ${actionText}`);
                              }
                            }}
                            placeholder="Describe what your character is doing (e.g., sipping coffee in Shibuya, spinning inside a holographic matrix, wearing high-collar reflective gear)..."
                            className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2.5 text-xs text-gray-200 outline-none leading-relaxed resize-none"
                          />
                        </div>

                        <div className="bg-[#0B0F19] p-3 rounded-lg border border-gray-800 space-y-1">
                          <span className="text-[9px] font-bold uppercase text-[#FF8A65] tracking-wide block">AUTOMATIC COMPOSED PROMPT:</span>
                          <p className="text-[10px] text-gray-400 font-mono leading-relaxed max-h-[80px] overflow-y-auto">
                            {videoPrompt}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#0B0F19] p-3 rounded-xl border border-dashed border-[#2D3748]">
                        <p className="text-[11px] text-gray-500 italic text-center">
                          Select a saved cast member above to enforce facial consistency across multiple custom action loops.
                        </p>
                      </div>
                    )}
                  </div>

                  {activeCharacterId === 'none' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Cinematic Full Prompt Specs
                      </label>
                      <textarea
                        rows={4}
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        placeholder="Input the descriptive character spec details here..."
                        className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-3 text-xs text-gray-200 outline-none leading-relaxed resize-none"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                        Resolution Tier
                        {tier === 'free' && <Lock className="w-3 h-3 text-[#FF5722]" />}
                      </label>
                      <select
                        value={videoResolution}
                        onChange={(e) => {
                          if (tier === 'free' && e.target.value !== '1080p (HQ Portrait)') {
                            showNotification("Ultra HD (2K/4K) requires Plus or Pro subscription tier upgrade.", "error");
                            setActiveTab('billing');
                          } else {
                            setVideoResolution(e.target.value);
                          }
                        }}
                        className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2 text-xs text-gray-200 outline-none"
                      >
                        <option value="1080p (HQ Portrait)">1080p Standard (HD)</option>
                        <option value="2K Cinema (Portrait - Locked)">2K Premium Portrait 🔒</option>
                        <option value="4K Hyper-Realism (Portrait - Locked)">4K Ultra Portrait 🔒</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Viewport Canvas
                      </label>
                      <select
                        value={videoAspect}
                        onChange={(e) => setVideoAspect(e.target.value)}
                        className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2 text-xs text-gray-200 outline-none"
                      >
                        <option value="9:16">9:16 Vertical Cinema (Standard)</option>
                        <option value="16:9" disabled>16:9 Horizontal (Disabled for Mobile Theme)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Render Duration
                      </label>
                      <select
                        value={videoDurationSecs}
                        onChange={(e) => setVideoDurationSecs(Number(e.target.value))}
                        className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2 text-xs text-gray-200"
                      >
                        <option value={4}>4 Seconds</option>
                        <option value={8}>8 Seconds (Optimal)</option>
                        <option value={12}>12 Seconds (Premium)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Camera Orbital Path
                      </label>
                      <select
                        value={videoCameraPreset}
                        onChange={(e) => setVideoCameraPreset(e.target.value)}
                        className="w-full bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2 text-xs text-gray-200"
                      >
                        <option value="Inward Slow Dolly">Inward Slow Dolly</option>
                        <option value="Dynamic Rotation Shift">Dynamic Rotation Shift</option>
                        <option value="Vertical Crane Up & Tilt">Vertical Crane Up</option>
                        <option value="Steadfast Face Lock Target">Face Lock Target</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={startVideoGeneration}
                    disabled={isRenderingVideo}
                    className="w-full py-4.5 bg-gradient-to-r from-[#FF5722] to-[#FF8A65] hover:from-[#FF7043] hover:to-[#FF5722] text-black font-extrabold rounded-xl text-sm shadow-xl flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {isRenderingVideo ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Acquiring GPU Frame Pipeline...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-black" />
                        <span>Trigger Production Queue (1 Credit)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Queue status display panel */}
                <div className="lg:col-span-7 bg-[#0B0F19] border border-[#2D3748] rounded-2xl p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#2D3748] pb-3">
                      <span className="text-xs font-bold uppercase text-gray-400">Live Active Node Stream Tracker</span>
                      <span className="text-[10px] font-mono text-gray-500">Status: Running</span>
                    </div>

                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
                      {generationTasks.map((task) => (
                        <div key={task.id} className="bg-[#1A1F2C] border border-[#2D3748] rounded-xl p-4 space-y-3 relative overflow-hidden">
                          {task.status !== 'completed' && (
                            <div className="absolute bottom-0 left-0 h-1 bg-[#FF5722] transition-all duration-300" style={{ width: `${task.progress}%` }}></div>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-400' : 'bg-[#FF5722] animate-ping'}`} />
                              {task.type}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              task.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-[#FF8A65] border border-orange-500/20'
                            }`}>
                              {task.status} ({task.progress}%)
                            </span>
                          </div>

                          <p className="text-xs font-mono text-gray-300 line-clamp-2">
                            {task.prompt}
                          </p>

                          {task.status === 'completed' && task.resultUrl && (
                            <div className="flex items-center justify-between pt-1 border-t border-[#0B0F19] mt-2">
                              <span className="text-[10px] text-gray-500 font-mono">Rendered: Seedance Cluster 2.0</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    showNotification("Initiating local simulation player...", "info");
                                    setMaximizedVideo({
                                      id: task.id,
                                      title: "Custom Generated Portrait Node",
                                      creatorName: "AuraMedia Studio Team",
                                      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
                                      likes: "1",
                                      views: "1",
                                      thumbnailUrl: task.resultUrl || "",
                                      videoUrl: "",
                                      prompt: task.prompt,
                                      ratio: "9:16",
                                      duration: "8s"
                                    });
                                  }}
                                  className="text-[10px] font-black bg-[#FF5722] text-black px-3 py-1 rounded hover:opacity-90 cursor-pointer"
                                >
                                  View Output File
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1A1F2C]/55 rounded-xl p-3 border border-[#2D3748] mt-4 flex items-center gap-3">
                    <Info className="w-5 h-5 text-[#FF8A65] flex-shrink-0" />
                    <p className="text-[11px] text-gray-400 leading-normal">
                      Each generated vertical clip is automatically optimized, converted to portrait feeds, and archived in the <span className="text-white font-semibold">My Content</span> directory.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* VIEW: MOTION CONTROLS DECK */}
        {activeTab === 'motion' && (
          <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row justify-between mb-8 pb-6 border-b border-[#2D3748]">
              <div>
                <h2 className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-2">
                  <SlidersHorizontal className="text-[#FF5722] w-6 h-6 animate-pulse" />
                  HIGH-DEFINITION MOTION DECK
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  Tune fluid physics, camera zoom bounds, and noise variables to govern seedance frame generation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Sliders controls column */}
              <div className="lg:col-span-6 space-y-6 bg-[#0B0F19] border border-[#2D3748] p-6 rounded-2xl">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Aura Camera Pan Motion Velocity</span>
                    <span className="text-xs text-[#FF8A65] font-mono font-bold">{motionPanSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={motionPanSpeed}
                    onChange={(e) => setMotionPanSpeed(Number(e.target.value))}
                    className="w-full accent-[#FF5722]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>Subtle slow tracking</span>
                    <span>Extreme rotational whip</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Optical Dolly Zoom Depth</span>
                    <span className="text-xs text-[#FF8A65] font-mono font-bold">{motionZoomDepth}m</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.2"
                    value={motionZoomDepth}
                    onChange={(e) => setMotionZoomDepth(Number(e.target.value))}
                    className="w-full accent-[#FF5722]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>Flat perspective</span>
                    <span>Highly compressed telephoto</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Dynamic Loop Interlocking Ratio</span>
                    <span className="text-xs text-[#FF8A65] font-mono font-bold">{motionNoiseRatio * 100}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={motionNoiseRatio}
                    onChange={(e) => setMotionNoiseRatio(Number(e.target.value))}
                    className="w-full accent-[#FF5722]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                    <span>Strict continuous flow</span>
                    <span>Aggressive style shifting</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#1F2633] border border-[#2D3748] p-4 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-white block">Enable Vector Optical Flow Synthesis</span>
                    <span className="text-[10px] text-gray-400">Maintains consistent anatomy across keyframes</span>
                  </div>
                  <button
                    onClick={() => setMotionOpticalFlow(!motionOpticalFlow)}
                    className={`w-12 h-6 rounded-full p-1 transition-all duration-200 cursor-pointer ${motionOpticalFlow ? 'bg-[#FF5722]' : 'bg-gray-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-all transform ${motionOpticalFlow ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                <button
                  onClick={() => {
                    showNotification("Motion parameters updated successfully!", "success");
                    setActiveTab('videos');
                  }}
                  className="w-full py-3 bg-[#FF5722] hover:bg-[#FF7043] text-black font-extrabold text-xs rounded-xl transition cursor-pointer"
                >
                  Save & Lock Motion Specs ➔
                </button>
              </div>

              {/* Information / visualization panel */}
              <div className="lg:col-span-6 bg-[#0B0F19] border border-[#2D3748] p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-semibold text-sm text-[#FF8A65] mb-4 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Interactive Optical Waveform Map
                  </h4>

                  <div className="h-48 rounded-xl bg-[#1A1F2C] border border-[#2D3748] flex items-end justify-between p-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    
                    {/* Simulated live visual wave form derived from variables */}
                    {Array.from({ length: 16 }).map((_, idx) => {
                      const heightPercent = Math.sin((idx + motionPanSpeed) * motionZoomDepth) * 35 + 50;
                      return (
                        <div 
                          key={idx} 
                          style={{ height: `${heightPercent}%` }}
                          className="w-3.5 bg-gradient-to-t from-[#FF5722] to-[#FF8A65] rounded-t-sm transition-all duration-300 z-10"
                        />
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-center font-mono">
                    <div className="bg-[#1A1F2C] border border-[#2D3748] p-2.5 rounded-lg">
                      <span className="text-[9px] text-gray-500 block">PAN FLOW</span>
                      <span className="text-xs text-white font-bold">{motionPanSpeed} rad/s</span>
                    </div>
                    <div className="bg-[#1A1F2C] border border-[#2D3748] p-2.5 rounded-lg">
                      <span className="text-[9px] text-gray-500 block">STABILIZATION</span>
                      <span className="text-xs text-white font-bold">{motionOpticalFlow ? "98.4%" : "Inactive"}</span>
                    </div>
                    <div className="bg-[#1A1F2C] border border-[#2D3748] p-2.5 rounded-lg">
                      <span className="text-[9px] text-gray-500 block">NOISE GAP</span>
                      <span className="text-xs text-[#FF8A65] font-bold">{(1 - motionNoiseRatio).toFixed(2)} dB</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#2D3748]">
                  <p className="text-[11px] text-gray-400 italic">
                    Tip: Highly volatile loop configurations are excellent for cyberpunk genres. Low noise balances realistic portrait closeups.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW: VIDEO AGENT CHAT ASSISTANT CLUSTER */}
        {activeTab === 'video-agent' && (
          <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl p-6 sm:p-8 flex flex-col h-[650px] justify-between">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#2D3748] pb-4 mb-4 gap-4">
              <div>
                <h2 className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-2">
                  <Bot className="text-[#FF5722] w-7 h-7" />
                  AURA CO-PILOT VIDEO AGENT
                </h2>
                <p className="text-gray-400 text-xs mt-1 animate-pulse">
                  Interact with our custom screen-agent twin model to iteratively generate camera coordinates and layout specs.
                </p>
              </div>
              <div className="bg-[#0B0F19] px-3.5 py-1.5 rounded-full border border-[#2D3748] text-[10px] font-mono text-[#FF8A65]">
                Direct connection verified over API
              </div>
            </div>

            {/* Chats frame stream area */}
            <div className="flex-1 bg-[#0B0F19] rounded-2xl p-4 overflow-y-auto mb-4 border border-[#2D3748] space-y-4">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 max-w-4xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-[#FF5722] text-black font-black text-xs' : 'bg-slate-800 text-[#FF8A65]'
                  }`}>
                    {msg.role === 'user' ? 'ME' : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`rounded-xl px-4 py-3 text-xs leading-relaxed ${
                    msg.role === 'user' ? 'bg-[#FF5722]/10 border border-[#FF5722]/30 text-gray-100' : 'bg-[#1A1F2C] border border-[#2D3748] text-gray-200'
                  }`}>
                    <p>{msg.text}</p>

                    {/* Integrated dynamic clickable specs from agent feedback */}
                    {msg.specsSuggestion && (
                      <div className="bg-[#0B0F19] border border-[#FF5722]/40 rounded-lg p-3.5 mt-3.5 space-y-2">
                        <span className="text-[10px] text-[#FF8A65] font-mono tracking-widest uppercase block">PROPOSED GENERATION MATRIX</span>
                        
                        <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                          <div>
                            <span className="text-gray-500 block">Resolution:</span>
                            <span className="text-gray-300 font-semibold">{msg.specsSuggestion.resolution}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Environment specs:</span>
                            <span className="text-gray-300 font-semibold truncate block" title={msg.specsSuggestion.suggestedStyling}>
                              {msg.specsSuggestion.suggestedStyling}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[9px] text-gray-500 font-mono block">Suggested Camera directions:</span>
                          <p className="text-gray-300 italic text-[11px] font-mono leading-relaxed bg-[#1A1F2C] p-2 rounded border border-gray-800 mt-1">
                            {msg.specsSuggestion.cameraDirections}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setVideoPrompt(`${msg.specsSuggestion?.suggestedStyling}. Cinematic motion directions: ${msg.specsSuggestion?.cameraDirections}`);
                            setVideoResolution(msg.specsSuggestion?.resolution.includes("1080p") ? "1080p (HQ Portrait)" : "1080p (HQ Portrait)");
                            showNotification("System parameters updated based on Video Co-Pilot suggestion!", "success");
                            setActiveTab('videos');
                          }}
                          className="w-full bg-[#FF5722] hover:bg-[#FF7043] text-black font-extrabold text-[10px] py-1.5 rounded cursor-pointer transition flex items-center justify-center gap-1 mt-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Load Specs into Generator Room
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Message submission interface */}
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="Ask Aura Video Agent to cook up a prompt or suggest some camera motion specs..."
                className="flex-1 bg-[#0B0F19] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-4 py-3.5 text-xs text-gray-100 outline-none"
              />
              <button
                onClick={sendChatMessage}
                disabled={isChatSending}
                className="px-6 bg-[#FF5722] hover:bg-[#FF7043] text-black font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                {isChatSending ? "Acquiring..." : <Send className="w-3.5 h-3.5" />}
                <span>Send</span>
              </button>
            </div>

          </div>
        )}

        {/* VIEW: BRAND IDENTITY STUDIO */}
        {activeTab === 'brand-studio' && (
          <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row justify-between mb-8 pb-6 border-b border-[#2D3748]">
              <div>
                <h2 className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-2">
                  <Briefcase className="text-[#FF5722] w-6 h-6" />
                  BRAND IDENTITY STUDIO
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  Synthesize high-end style palettes, core marketing taglines, and vertical social hooks using server-side Gemini intelligence.
                </p>
              </div>

              {tier === 'free' && (
                <div className="bg-red-500/10 text-red-500 text-xs border border-red-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 font-black self-start">
                  <Lock className="w-3.5 h-3.5" /> Premium Pro Only
                </div>
              )}
            </div>

            {tier === 'free' ? (
              <div className="text-center py-12 bg-[#0B0F19] rounded-2xl border border-[#2D3748] p-8 space-y-4">
                <Lock className="w-12 h-12 text-[#FF5722] mx-auto animate-bounce" />
                <h3 className="font-display font-bold text-lg text-white">Brand Studio Locked</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  To access multi-asset automated brand setup kits containing premium color systems and marketing copy, optimize your workspace on the <span className="text-white hover:underline cursor-pointer" onClick={() => setActiveTab('billing')}>Billing Matrix Hub</span>.
                </p>
                <button
                  onClick={() => setActiveTab('billing')}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FF5722] to-[#FF8A65] text-black font-black text-xs rounded-xl cursor-pointer"
                >
                  Configure Subscriptions
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-5 bg-[#0B0F19] p-6 rounded-2xl border border-[#2D3748]">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full bg-[#1A1F2C] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2.5 text-xs text-gray-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                      Offerings & Visual DNA Description
                    </label>
                    <textarea
                      rows={3}
                      value={brandCoreOffering}
                      onChange={(e) => setBrandCoreOffering(e.target.value)}
                      className="w-full bg-[#1A1F2C] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2 text-xs text-gray-200 outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                      Brand Artistic Mood
                    </label>
                    <select
                      value={brandAesthetic}
                      onChange={(e) => setBrandAesthetic(e.target.value)}
                      className="w-full bg-[#1A1F2C] border border-[#2D3748] focus:border-[#FF5722] rounded-xl px-3 py-2.5 text-xs text-gray-300"
                    >
                      <option value="Luxury Cinematic Minimalism">Luxury Cinematic Minimalism</option>
                      <option value="Aggressive High-Contrast Cyberpunk">Aggressive Cyberpunk</option>
                      <option value="Surrealist High Fashion Vogue">High Fashion Vogue</option>
                      <option value="Retro Analog Nostalgia Retro-Futurism">Retro Nostalgia</option>
                    </select>
                  </div>

                  <button
                    onClick={generateBrandKit}
                    disabled={isGeneratingBrand}
                    className="w-full py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-black font-extrabold text-xs rounded-xl shadow transition cursor-pointer"
                  >
                    {isGeneratingBrand ? "Synthesizing Core Kit..." : "Generate Pro Brand Kit ✦"}
                  </button>
                </div>

                {/* Outputs Panel */}
                <div className="lg:col-span-7 bg-[#0B0F19] p-6 rounded-2xl border border-[#2D3748] min-h-[350px]">
                  {isGeneratingBrand ? (
                    <div className="h-full flex flex-col items-center justify-center p-8 space-y-4">
                      <Layers className="w-12 h-12 text-[#FF5722] animate-spin" />
                      <p className="font-display font-medium text-xs text-[#FF8A65] tracking-widest uppercase animate-pulse">
                        Generating brand styling profiles and copywriting nodes...
                      </p>
                    </div>
                  ) : generatedBrandKit ? (
                    <div className="space-y-6">
                      <div className="border-b border-[#2D3748] pb-4">
                        <span className="text-[10px] text-gray-400 font-mono block">PRO SYSTÈME IDENTIFICATION</span>
                        <h3 className="font-display font-extrabold text-lg text-white">{brandName} Brand Identity Profile</h3>
                        <p className="text-[#FF8A65] text-xs italic mt-1">&ldquo;{generatedBrandKit.tagline}&ldquo;</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1A1F2C] p-4 rounded-xl border border-[#2D3748]">
                          <span className="text-[10px] text-gray-400 block mb-2">Visual Palette Alignment:</span>
                          <div className="flex gap-2 min-h-12 border border-gray-800 p-2 rounded bg-[#0B0F19]">
                            <div className="flex-1 rounded" style={{ backgroundColor: generatedBrandKit.styleGuide?.primaryColor || '#FF5722' }} title="Primary Color"></div>
                            <div className="flex-1 rounded" style={{ backgroundColor: generatedBrandKit.styleGuide?.secondaryColor || '#0B0F19' }} title="Secondary Color"></div>
                            <div className="flex-1 rounded bg-[#2D3748] flex items-center justify-center text-[10px] font-mono text-gray-400" title="Accent Space">
                              {generatedBrandKit.styleGuide?.typographyAccent ? generatedBrandKit.styleGuide.typographyAccent.split(' ')[0] : 'Inter'}
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#1A1F2C] p-4 rounded-xl border border-[#2D3748]">
                          <span className="text-[10px] text-gray-400 block mb-1">Visual Inspiration Prompt:</span>
                          <p className="text-[11px] text-gray-300 font-mono line-clamp-3 bg-[#0B0F19] p-2 rounded">
                            {generatedBrandKit.styleGuide?.moodboardPrompt}
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-gray-400 block mb-2">Highly Magnetic Ad Campaign Short Hooks:</span>
                        <div className="space-y-2">
                          {generatedBrandKit.marketingHooks?.map((hook, idx) => (
                            <div 
                              key={idx}
                              className="bg-[#1A1F2C] p-3 rounded-lg border border-[#2D3748] text-xs font-mono text-gray-200 hover:border-[#FF5722] transition-colors relative group"
                            >
                              <p className="pr-12">{hook}</p>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(hook);
                                  showNotification(`Copied Social Hook #${idx + 1} to clipboard`, "success");
                                }}
                                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 bg-[#0B0F19] text-gray-400 p-1 rounded hover:text-white transition-opacity cursor-pointer text-[10px]"
                              >
                                Copy
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-500">
                      <Briefcase className="w-12 h-12 text-[#2D3748] mb-4 animate-pulse" />
                      <p className="font-display font-semibold text-sm text-gray-300">Identity Desk Empty</p>
                      <p className="text-xs max-w-sm mt-1">
                        Fill in your business coordinates and trigger generation to form rich marketing guides.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

        {/* VIEW: HIGH-END SHOWCASE */}
        {activeTab === 'showcase' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[#2D3748] pb-4">
              <div>
                <h2 className="font-display font-black text-2xl tracking-tight text-white">AURA SHOWCASE ARENA</h2>
                <p className="text-gray-400 text-xs mt-1">
                  View trending prompts cooked up by global digital influencers. Select to reload prompt specifications.
                </p>
              </div>
              <span className="text-xs bg-[#1A1F2C] border border-[#2D3748] text-gray-300 px-3.5 py-1.5 rounded-full font-mono flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#FF5722] animate-bounce" /> Verified Reels Database
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRESEEDED_VIDEOS.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl overflow-hidden hover:border-[#FF5722] transition-all group hover:-translate-y-1 shadow-2xl flex flex-col justify-between"
                >
                  <div className="relative aspect-[9/16] bg-black">
                    <img 
                      src={item.thumbnailUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-300" 
                    />
                    
                    {/* Top Creator Info Badge */}
                    <div className="absolute top-4 left-4 bg-[#0B0F19]/90 border border-[#2D3748] px-3 py-1 rounded-full flex items-center gap-2">
                      <img src={item.avatarUrl} className="w-4 h-4 rounded-full object-cover" />
                      <span className="text-[10px] font-mono text-gray-300">{item.creatorName}</span>
                    </div>

                    {/* Bottom overlay parameters */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/30 to-transparent p-4 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-[#FF8A65] tracking-widest uppercase">HD PORTRAIT SEEDANCE V2</span>
                      <h4 className="font-display font-extrabold text-base text-white mt-1">{item.title}</h4>
                      
                      <p className="text-xs text-gray-300 line-clamp-2 mt-2 font-mono italic leading-relaxed">
                        &ldquo;{item.prompt}&ldquo;
                      </p>
                    </div>

                    {/* Float Play Icon */}
                    <div className="absolute inset-0 m-auto w-14 h-14 bg-[#FF5722] hover:bg-[#FF7043] rounded-full flex items-center justify-center cursor-pointer shadow-lg transform scale-90 group-hover:scale-100 transition-all opacity-0 group-hover:opacity-100">
                      <Play className="w-6 h-6 fill-black text-black ml-1" />
                    </div>
                  </div>

                  <div className="p-4 bg-[#1A1F2C] border-t border-[#2D3748] flex items-center justify-between">
                    <div className="flex gap-4 text-xs font-mono text-gray-400">
                      <span>Likes: <strong className="text-white">{item.likes}</strong></span>
                      <span>Views: <strong className="text-white">{item.views}</strong></span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSelectCharacterForPrompt(item)}
                        className="bg-slate-800 text-white hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FF8A65]" /> Select Spec Prompt
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* VIEW: USER CONTENT LOG ARCHIVE */}
        {activeTab === 'my-content' && (
          <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl p-6 sm:p-8 space-y-12">
            
            {/* Section A: Saved Cast Members */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2D3748] pb-4 gap-4">
                <div>
                  <h2 className="font-display font-black text-xl text-white flex items-center gap-2">
                    <Star className="text-[#FF5722] w-5 h-5 fill-[#FF5722]" />
                    MY REGISTERED FACE SCHEMAS ({savedCharacters.length})
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">
                    Manage persistent digital twin descriptors and load them directly into loop pipelines.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('characters');
                    showNotification("Redirecting to specifications matrix to draft portraits...", "info");
                  }
                  }
                  className="bg-gradient-to-r from-[#FF5722] to-[#FF8A65] text-black hover:opacity-90 text-[10.5px] font-black px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 self-start"
                >
                  <Plus className="w-3.5 h-3.5" /> Spec New Twin
                </button>
              </div>

              {savedCharacters.length === 0 ? (
                <div className="text-center py-10 bg-[#0B0F19] border border-[#2D3748] rounded-2xl p-6 max-w-sm mx-auto space-y-3">
                  <User className="w-10 h-10 text-gray-600 mx-auto" />
                  <p className="font-semibold text-xs text-gray-300">No active casts registered.</p>
                  <p className="text-[11px] text-gray-500">Create specs or save trending templates from the Characters tab.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedCharacters.map((char, index) => {
                    let visualUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250";
                    if (char.name.toLowerCase().includes("knight") || (char.style && char.style.toLowerCase().includes("knight"))) {
                      visualUrl = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250";
                    } else if (index % 3 === 1) {
                      visualUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250";
                    } else if (index % 3 === 2) {
                      visualUrl = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=250";
                    }

                    return (
                      <div key={`workspace-char-${index}`} className="bg-[#0B0F19] border border-[#2D3748] rounded-2xl p-5 flex flex-col justify-between group h-fit relative">
                        {activeCharacterId === char.name && (
                          <span className="absolute top-3 right-3 bg-[#FF5722] text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                            ACTIVE CAST
                          </span>
                        )}
                        <div>
                          <div className="flex items-center gap-4 mb-4 pb-3 border-b border-[#2D3748]">
                            <div className="w-12 h-16 rounded overflow-hidden bg-slate-900 border border-[#2D3748]">
                              <img src={visualUrl} alt={char.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-white">{char.name}</h3>
                              <span className="text-[10px] font-mono text-gray-400 block truncate max-w-[160px]">{char.archetype || 'Custom Character'}</span>
                              <span className="text-[10px] font-mono text-[#FF8A65] block">{char.voiceId || 'Synthesised-Voice-F'}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-gray-400 block">SPEC PROMPT COORDINATES:</span>
                            <p className="text-[10.5px] text-gray-300 font-mono bg-[#1A1F2C] p-2.5 rounded border border-gray-800 line-clamp-3">
                              {char.prompt}
                            </p>
                            {char.backstory && (
                              <div>
                                <span className="text-[10px] font-bold text-gray-400 block">NARRATIVE BIO:</span>
                                <p className="text-[10.5px] text-gray-400 italic line-clamp-2 mt-0.5">
                                  &ldquo;{char.backstory}&rdquo;
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[#1F2633] mt-4">
                          <span className="text-[9px] font-mono text-gray-500">PORTABILITY: SYSTEM READY</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSelectSavedCharacterForPrompt(char)}
                              className="text-[10px] bg-[#FF5722] hover:bg-[#FF7043] text-black px-3 py-1.5 rounded font-black cursor-pointer transition"
                            >
                              Generate Loop
                            </button>
                            <button
                              onClick={() => {
                                setSavedCharacters(prev => prev.filter(c => c.name !== char.name));
                                if (activeCharacterId === char.name) setActiveCharacterId('none');
                                showNotification(`Character "${char.name}" removed from local persistent Cast.`, "info");
                              }}
                              className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-500/10 cursor-pointer"
                              title="Delete Character Profile"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section B: Render System Records */}
            <div className="space-y-6 pt-6 border-t border-[#2D3748]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display font-black text-xl text-white flex items-center gap-2">
                    <Video className="text-[#FF5722] w-5 h-5" />
                    CINEMATIC VIDEO PIPELINE REPLICAS ({generationTasks.length})
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">
                    Review and play finished 9:16 vertical render files processed on Seedance GPU servers.
                  </p>
                </div>
                <span className="text-xs text-[#FF8A65] bg-[#0B0F19] border border-[#2D3748] px-3.5 py-1.5 rounded-full font-mono self-start sm:self-auto">
                  Total Logs: {generationTasks.length} Elements
                </span>
              </div>

              {generationTasks.length === 0 ? (
                <div className="text-center py-16 bg-[#0B0F19] rounded-2xl p-8 max-w-sm mx-auto space-y-4">
                  <Video className="w-12 h-12 text-[#2D3748] mx-auto animate-bounce" />
                  <p className="font-display font-bold text-sm text-gray-300">Workspace Library Empty</p>
                  <p className="text-xs text-gray-500">
                    Head over to Characters or Videos tab and trigger real renders to form directory files.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generationTasks.map((task) => (
                  <div key={task.id} className="bg-[#0B0F19] border border-[#2D3748] rounded-2xl overflow-hidden p-5 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#2D3748] pb-3 mb-4">
                        <span className="text-[10px] font-mono text-[#FF8A65] font-black uppercase">
                          {task.type}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {task.timestamp}
                        </span>
                      </div>

                      {task.resultUrl && (
                        <div className="aspect-[9/16] w-full rounded-xl overflow-hidden bg-black mb-4 relative">
                          <img src={task.resultUrl} className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="bg-[#0B0F19] text-[#FF8A65] border border-[#2D3748] px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase">
                              Rendering Validated
                            </span>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-gray-200 leading-relaxed font-mono bg-[#1A1F2C] p-3 rounded border border-gray-800">
                        {task.prompt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#1F2633] mt-6">
                      <span className="text-[10px] font-mono text-gray-500">ID: {task.id}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setVideoPrompt(task.prompt);
                            showNotification("Sent exact prompt metadata to Video suite", "success");
                            setActiveTab('videos');
                          }}
                          className="text-[10px] bg-[#FF5722] text-black px-3 py-1.5 rounded font-black hover:opacity-90 cursor-pointer"
                        >
                          Rerender
                        </button>
                        <button
                          onClick={() => {
                            setGenerationTasks(prev => prev.filter(t => t.id !== task.id));
                            showNotification("Optimized workspace element discarded successfully.", "info");
                          }}
                          className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-500/10 cursor-pointer"
                          title="Discard Element"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>

          </div>
        )}

        {/* VIEW: PREMIUM MONETIZATION HUB (stripe Checkout Interface Engine) */}
        {activeTab === 'billing' && (
          <div className="space-y-10">
            
            <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF5722]/5 to-transparent pointer-events-none"></div>

              {/* Header Title */}
              <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
                <span className="text-xs text-[#FF8A65] bg-[#FF5722]/10 border border-[#FF5722]/30 px-3 py-1 rounded-full font-black tracking-widest uppercase">
                  Workspace Scale Center
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white">
                  WORKSPACE MONETIZATION & SUBSCRIPTION MATRIX
                </h2>
                <p className="text-gray-400 text-sm">
                  Upgrade your computing cluster to process cinematic resolutions instantly, unlock advanced features, and wipe Google AdMob sponsored placements.
                </p>

                {/* Monthly vs Yearly Switch Toggle with 15% discount indicators */}
                <div className="inline-flex items-center gap-3 bg-[#0B0F19] p-1.5 rounded-full border border-[#2D3748] mt-4">
                  <button
                    onClick={() => setIsYearly(false)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${!isYearly ? 'bg-[#FF5722] text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    Monthly Schedule
                  </button>
                  <button
                    onClick={() => setIsYearly(true)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-1 ${isYearly ? 'bg-[#FF5722] text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    Annual Save 15%
                    <span className="bg-[#0B0F19] text-[#FF8A65] text-[9px] px-1 rounded border border-[#FF8A65]/35 font-mono">15% OFF</span>
                  </button>
                </div>
              </div>

              {/* Pricing Grid Mapping Exact 3 Structural Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                
                {/* 1. Free Version Card */}
                <div className="bg-[#0B0F19] border border-[#2D3748] rounded-2xl p-6 flex flex-col justify-between relative hover:border-[#FF5722]/40 transition">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">SPONSORED DEV</span>
                        <h3 className="font-display font-extrabold text-xl text-white">Free Version Sandbox</h3>
                      </div>
                      {tier === 'free' && (
                        <span className="bg-[#FF5722]/10 text-[#FF8A65] text-[10px] px-2 py-0.5 rounded border border-[#FF5722]/35 uppercase tracking-wider font-bold">
                          Current Tier
                        </span>
                      )}
                    </div>

                    <div className="py-2">
                      <span className="text-3xl font-black text-white">$0.00</span>
                      <span className="text-gray-500 text-xs font-medium"> / forever</span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      Basic character specifications, lightweight cinematic formatting. Ad banners present sponsored layout frames.
                    </p>

                    <div className="border-t border-[#1C2333] pt-4 space-y-3">
                      <p className="text-xs text-gray-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF8A65]" /> Low-resolution 720p processing
                      </p>
                      <p className="text-xs text-gray-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF8A65]" /> Standard shared rendering queue
                      </p>
                      <p className="text-xs text-red-400 flex items-center gap-2">
                        <Lock className="w-3 h-3 text-red-500/70" /> 10 standard credits allowance
                      </p>
                      <p className="text-xs text-red-400 flex items-center gap-2">
                        <Lock className="w-3 h-3 text-red-500/70" /> Google Sponsored AdMob Layout
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTier('free');
                      setCredits(10);
                      showNotification("Reverted to basic Free sponsored layout.", "info");
                    }}
                    className="w-full mt-8 py-3 bg-[#1A1F2C] hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-[#2D3748] transition cursor-pointer"
                  >
                    Use Standard Sandbox
                  </button>
                </div>

                {/* 2. Plus Version Card */}
                <div className="bg-[#0B0F19] border-2 border-[#FF5722] rounded-2xl p-6 flex flex-col justify-between relative shadow-2xl scale-105 group">
                  <div className="absolute -top-3.5 inset-x-0 mx-auto w-fit bg-[#FF5722] text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    RECOMMENDED CREATOR
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-[#FF8A65] font-mono tracking-widest uppercase block">TURBO FAST PROMPT</span>
                        <h3 className="font-display font-extrabold text-xl text-white">Plus Creator Creator</h3>
                      </div>
                      {tier === 'plus' && (
                        <span className="bg-[#FF5722]/10 text-[#FF8A65] text-[10px] px-2 py-0.5 rounded border border-[#FF5722]/30 uppercase tracking-widest font-bold">
                          Active Workspace
                        </span>
                      )}
                    </div>

                    <div className="py-2">
                      <span className="text-4xl font-extrabold text-white">
                        {isYearly ? '$4.99' : '$6.99'}
                      </span>
                      <span className="text-gray-400 text-xs font-medium"> / month</span>
                      {isYearly && <p className="text-[10px] text-green-400 font-mono mt-1">Billed annually: $59.99/year</p>}
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      Wipes developer sponsor ads. Unlocks fast server processing speeds and high-definition renders.
                    </p>

                    <div className="border-t border-[#2D3748] pt-4 space-y-3">
                      <p className="text-xs text-gray-200 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF5722]" /> Full High-Definition 1080p outputs
                      </p>
                      <p className="text-xs text-gray-200 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF5722]" /> Accelerated premium priority queues
                      </p>
                      <p className="text-xs text-gray-200 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF5722]" /> Wipes all Google AdMob banner zones
                      </p>
                      <p className="text-xs text-green-400 flex items-center gap-2 font-mono">
                        <Coins className="w-3.5 h-3.5 text-[#FF8A65]" /> 500 Recurring Tokens / month
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStripeCheckout('plus', isYearly ? '$59.99/yr' : '$6.99/mo')}
                    className="w-full mt-8 py-3.5 bg-gradient-to-r from-[#FF5722] to-[#FF8A65] hover:from-[#FF7043] hover:to-[#FF5722] text-black font-extrabold text-xs rounded-xl shadow-lg transition transform group-hover:scale-102 cursor-pointer"
                  >
                    Deploy Plus via Stripe checkout ➔
                  </button>
                </div>

                {/* 3. Pro Version Card */}
                <div className="bg-[#0B0F19] border border-[#2D3748] rounded-2xl p-6 flex flex-col justify-between relative hover:border-[#FF5722]/40 transition">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">UNLIMITED POWER</span>
                        <h3 className="font-display font-extrabold text-xl text-white">Pro Enterprise Studio</h3>
                      </div>
                      {tier === 'pro' && (
                        <span className="bg-gradient-to-r from-[#FF5722] to-[#FF8A65] text-black text-[10px] px-2 py-0.5 rounded uppercase font-black">
                          Ultimate Pro Active
                        </span>
                      )}
                    </div>

                    <div className="py-2">
                      <span className="text-3xl font-black text-white">
                        {isYearly ? '$8.29' : '$11.99'}
                      </span>
                      <span className="text-gray-500 text-xs font-medium"> / month</span>
                      {isYearly && <p className="text-[10px] text-green-400 font-mono mt-1">Billed annually: $99.99/year</p>}
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      Unlocks unlimited generation cycles, Brand Identity compilation, and customized API token structures.
                    </p>

                    <div className="border-t border-[#1C2333] pt-4 space-y-3">
                      <p className="text-xs text-gray-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF8A65]" /> Unlimited avatar generations
                      </p>
                      <p className="text-xs text-gray-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF8A65]" /> Hyper-real 4K portrait exports unblocked
                      </p>
                      <p className="text-xs text-gray-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF8A65]" /> Brand Identity customization Suite
                      </p>
                      <p className="text-xs text-green-400 flex items-center gap-2 font-mono">
                        <Check className="w-3.5 h-3.5 text-green-400" /> Infinite computing credits loaded
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStripeCheckout('pro', isYearly ? '$99.99/yr' : '$11.99/mo')}
                    className="w-full mt-8 py-3 bg-[#1A1F2C] hover:bg-[#2D3748] text-white font-bold text-xs rounded-xl border border-[#2D3748] transition cursor-pointer"
                  >
                    Aesthetic Pro checkout ➔
                  </button>
                </div>

              </div>
            </div>

            <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-2xl p-6 text-xs text-center text-gray-400 space-y-2">
              <Shield className="w-6 h-6 text-[#FF8A65] mx-auto animate-pulse" />
              <p className="font-bold text-gray-300 text-sm">Secure Webhook Integration Configured</p>
              <p className="max-w-lg mx-auto">
                Secure stripe gateways are connected directly to our webhooks. When subscription validations succeed, state adjustments are executed instantly, granting credits and togglingsponsored metrics dynamically.
              </p>
            </div>

          </div>
        )}

      </main>

      {/* 4. GOOGLE ADMOB SPONSORED PLACEMENT PORTAL STRATEGY */}
      {tier === 'free' ? (
        <footer className="bg-[#1A1F2C] border-t border-[#2D3748] mt-auto relative">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* AdMob Sponsor Placeholder slot with realistic styling warnings */}
            <div className="w-full md:w-3/5 bg-[#0B0F19] border border-dashed border-[#FF5722]/50 p-4 rounded-xl flex items-center justify-between relative overflow-hidden group">
              <div className="absolute top-0 left-0 bg-[#FF5722] text-black text-[8px] font-black uppercase px-2 py-0.5 rounded-br font-mono">
                AdMob Sponsor Area
              </div>
              
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-[#FF8A65]" />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-500 font-mono tracking-wider block uppercase">GOOGLE MOBA ADS SDK PLACEMENT STRATEGY</span>
                  <p className="text-xs font-bold text-white">AuraMedia Custom Renders : Build and scale prompt loops fast</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase">
                  Connected Code Placeholder
                </span>
              </div>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="text-xs text-gray-400 font-semibold">Running on AuraMedia Free Workspace Tier</p>
              <p className="text-[10px] text-gray-500 max-w-sm ml-auto">
                Wipe sponsored display blocks, accelerate frame processing pipelines, and unlock 4K render sequences by upgrading to the Plus tier.
              </p>
            </div>

          </div>
        </footer>
      ) : (
        <footer className="bg-[#1A1F2C] border-t border-[#2D3748] py-4 mt-auto text-center text-xs text-gray-500">
          <p>© 2026 AuraMedia Studio • Powered by Google Gemini-3.5-Flash. All sponsored placements disabled.</p>
        </footer>
      )}

      {/* COMPONENT INTERACTION: PREVIEW/MAXIMIZE VIDEO MODAL VIEW */}
      {maximizedVideo && (
        <div className="fixed inset-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1A1F2C] border border-[#2D3748] rounded-3xl w-full max-w-lg overflow-hidden flex flex-col justify-between max-h-[90vh] shadow-2xl relative">
            
            {/* Header */}
            <div className="p-5 border-b border-[#2D3748] flex items-center justify-between bg-[#1A1F2C]/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FF5722] to-[#FF8A65] animate-ping" />
                <h3 className="font-display font-black text-white text-sm">{maximizedVideo.title}</h3>
              </div>
              <button 
                onClick={() => setMaximizedVideo(null)}
                className="text-gray-400 hover:text-white bg-[#0B0F19] p-1.5 rounded-full border border-[#2D3748] text-xs font-bold cursor-pointer transition-colors"
              >
                ✕ Close Preview
              </button>
            </div>

            {/* Immersive Mock Digital Screen Player */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="relative aspect-[9/16] max-h-[50vh] mx-auto rounded-2xl overflow-hidden bg-black shadow-2xl border border-gray-800">
                <img src={maximizedVideo.thumbnailUrl} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#FF5722] text-black text-[9px] font-black px-2 py-0.5 rounded font-mono uppercase">
                      Active Stream
                    </span>
                    <span className="text-white text-[10px] font-mono">{maximizedVideo.duration} Portrait Loop</span>
                  </div>
                  <p className="text-gray-300 text-[11px] leading-relaxed line-clamp-2">
                    {maximizedVideo.prompt}
                  </p>
                </div>
                
                {/* Floating cinematic voice icon */}
                <span className="absolute top-4 right-4 bg-[#FF5722] text-black p-2 rounded-full shadow-lg">
                  <Volume2 className="w-4 h-4" />
                </span>
              </div>

              {/* Specification data card */}
              <div className="bg-[#0B0F19] border border-[#2D3748] p-4 rounded-xl space-y-3 font-mono text-[11px]">
                <div className="flex items-center justify-between border-b border-[#2D3748] pb-2">
                  <span className="text-[#FF8A65] font-bold">METADATA SPECS PROMPT</span>
                  <span className="text-gray-500 bg-[#1A1F2C] px-2 py-0.5 rounded border border-[#2D3748]">Ratio: {maximizedVideo.ratio}</span>
                </div>
                
                <p className="text-gray-200 leading-normal bg-[#1A1F2C] p-3 rounded border border-gray-800">
                  {maximizedVideo.prompt}
                </p>

                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(maximizedVideo.prompt);
                      showNotification("Specs Prompt copied successfully!", "success");
                    }}
                    className="bg-[#1A1F2C] hover:bg-slate-800 text-white px-3 py-1.5 rounded border border-[#2D3748] flex items-center gap-1 cursor-pointer transition text-[10px]"
                  >
                    <Copy className="w-3 h-3" /> Copy Metadata
                  </button>
                  <button 
                    onClick={() => {
                      handleSelectCharacterForPrompt(maximizedVideo);
                      setMaximizedVideo(null);
                    }}
                    className="bg-[#FF5722] hover:bg-[#FF7043] text-black font-extrabold px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer transition text-[10px]"
                  >
                    <Sparkles className="w-3 h-3" /> Use Prompt Setup
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
