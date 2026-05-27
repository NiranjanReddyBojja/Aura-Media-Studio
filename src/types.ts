export type SubscriptionTier = 'free' | 'plus' | 'pro';

export type CreationChannel = 
  | 'characters' 
  | 'scenes' 
  | 'videos' 
  | 'motion' 
  | 'video-agent' 
  | 'brand-studio' 
  | 'showcase' 
  | 'my-content' 
  | 'billing';

export interface CharacterProfile {
  name: string;
  voiceId: string;
  prompt: string;
  backstory: string;
  archetype?: string;
  style?: string;
  gender?: string;
  voiceTone?: string;
  traits?: string[];
}

export interface SceneItem {
  sceneId: number;
  timeRange: string;
  visualDescription: string;
  cameraMotion: string;
  sfxPrompt: string;
}

export interface BrandKit {
  tagline: string;
  styleGuide: {
    primaryColor: string;
    secondaryColor: string;
    typographyAccent: string;
    moodboardPrompt: string;
  };
  marketingHooks: string[];
}

export interface VideoCard {
  id: string;
  title: string;
  creatorName: string;
  avatarUrl: string;
  likes: string;
  views: string;
  thumbnailUrl: string;
  videoUrl: string;
  prompt: string;
  ratio: "9:16";
  duration: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  specsSuggestion?: {
    resolution: string;
    suggestedStyling: string;
    cameraDirections: string;
  };
}

export interface GenerationTask {
  id: string;
  type: string;
  status: 'queued' | 'rendering' | 'completed' | 'failed';
  progress: number;
  prompt: string;
  resultUrl?: string;
  timestamp: string;
}
