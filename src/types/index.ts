export type ModeId = 'anxiety' | 'reentry' | 'wakeup' | 'learning';

export type LearningGenre = 'language' | 'business' | 'memo' | 'trivia';

export type SessionLength = 3 | 5 | 10;

export type VoiceType = 'default' | 'male';

export interface ModeDefinition {
  id: ModeId;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
}

export interface ContentItem {
  type: 'speech' | 'pause';
  text?: string;
  /** Pause duration multiplier (1.0 = base pause duration from settings) */
  pauseMultiplier?: number;
}

export interface AppSettings {
  learningGenre: LearningGenre;
  speechRate: number;
  pauseDuration: number;
  sessionLength: SessionLength;
  lastMode: ModeId | null;
  memos: string[];
  voiceType: VoiceType;
  bedtime: number | null;
}

export type PlaybackState = 'idle' | 'playing' | 'paused' | 'stopped';

export interface TTSProvider {
  speak(text: string, rate: number, lang?: string, voiceType?: VoiceType): Promise<void>;
  pause(): void;
  resume(): void;
  cancel(): void;
  isSpeaking(): boolean;
  isPaused(): boolean;
  getAvailableVoices(): SpeechSynthesisVoice[];
}
