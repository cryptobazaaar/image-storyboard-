
export interface Scene {
  id: string;
  title: string;
  timeRange: string;
  prompt: string;
  scriptUrdu: string;
  imageUrl?: string;
}

export interface GenerationState {
  loading: boolean;
  error: string | null;
}
