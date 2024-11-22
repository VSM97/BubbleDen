import type { observersConfigType } from './components/Bot';

// Core Props Types
export type { BotProps } from './components/Bot';
export type { BubbleProps } from './features/bubble/components/Bubble';

// Theme Types
export type {
  BubbleTheme,
  BubbleParams,
  TextInputTheme,
  UserMessageTheme,
  BotMessageTheme,
  FooterTheme,
  FeedbackTheme,
  ChatWindowTheme,
  DateTimeToggleTheme,
  DisclaimerPopUpTheme,
} from './features/bubble/types';

// Observer Types
export type { observersConfigType };

// Message Types
export type { MessageType, IAction, FileUpload } from './components/Bot';

export type { Chatbot } from './window';
