export type ViewState = 'home' | 'encyclopedia' | 'marketplace' | 'cart' | 'sell' | 'profile' | 'training';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'cue' | 'table' | 'accessory' | 'balls';
  sport: 'snooker' | 'pool' | 'both';
  description: string;
  imageUrl: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
