export type Message = {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  type?: 'loading' | 'error';
};

export type Artifact = {
  id: number;
  title: string;
  content: string;
};

export interface ChatState {
  messages: Message[];
  artifacts: Artifact[];
  currentArtifactId: number | null;
}