import type { ModeDefinition, AppSettings } from '../types';

export const APP_NAME = 'Morning Modes';
export const APP_SUBTITLE = 'Awake Between Sleep';

export const MODE_DEFINITIONS: ModeDefinition[] = [
  {
    id: 'anxiety',
    label: '不安解消',
    sublabel: '思考を整理する',
    icon: '🌊',
    color: 'rgba(100, 140, 200, 0.25)',
  },
  {
    id: 'reentry',
    label: '再入眠',
    sublabel: 'もう一度眠る',
    icon: '🌙',
    color: 'rgba(120, 100, 180, 0.25)',
  },
  {
    id: 'wakeup',
    label: '覚醒',
    sublabel: '起き上がる',
    icon: '☀️',
    color: 'rgba(200, 160, 80, 0.25)',
  },
  {
    id: 'learning',
    label: '半睡眠学習',
    sublabel: 'ぼんやり浸透',
    icon: '💭',
    color: 'rgba(100, 180, 160, 0.25)',
  },
];

export const LEARNING_GENRE_LABELS: Record<string, string> = {
  language: '語学',
  business: '事業アイデア',
  memo: '自分メモ',
  trivia: '雑学',
};

export const SESSION_LENGTH_OPTIONS = [3, 5, 10] as const;

export const DEFAULT_SETTINGS: AppSettings = {
  learningGenre: 'language',
  speechRate: 0.85,
  pauseDuration: 3,
  sessionLength: 5,
  lastMode: null,
  memos: [
    '今日やることを一つだけ決める',
    '完璧でなくていい、始めることが大事',
    '小さな一歩が流れを変える',
  ],
};
