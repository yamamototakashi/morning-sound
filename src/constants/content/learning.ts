import type { ContentItem } from '../../types';
import type { LearningGenre } from '../../types';

const languageContent: ContentItem[][] = [
  [
    { type: 'speech', text: 'Good morning' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'It is still early' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'You do not need to hurry' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '今日は急がなくていい' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: 'Take your time' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'ゆっくりでいいですよ' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'There is no rush' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '焦る必要はありません' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: 'How are you feeling?' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '気分はどうですか' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'I feel a little sleepy' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '少し眠いです' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: 'The sun is rising' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '日が昇ってきます' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'A new day begins' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '新しい一日が始まります' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: 'Let me think about it' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'ちょっと考えさせて' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'That sounds good' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'それはいいですね' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
];

const businessContent: ContentItem[][] = [
  [
    { type: 'speech', text: '労働集約の仕事は拡大しにくい' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'だから一部を仕組みに変える' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '繰り返す仕事ほど定型化しやすい' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: '価値は「届けた相手」が決める' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '自分がいいと思うものと、求められるものは違う' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'まず小さく試して、反応を見る' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: '固定費を下げることが、利益の第一歩' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '売上よりも、まずコスト構造を見直す' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '小さく始めて、うまくいったら広げる' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: '一人で抱えると、ボトルネックになる' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '任せられる部分を見つけることが鍵' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '完璧でなくていい。回り始めればいい' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
];

const triviaContent: ContentItem[][] = [
  [
    { type: 'speech', text: 'タコの心臓は3つある' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '2つは鰓に血液を送り、1つは全身に送る' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'しかも血液は青い' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: 'バナナは植物学的にはベリーの一種' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'いちごはベリーではない' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '分類は見た目と一致しないことがある' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: '人間の骨の数は、大人になると減る' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '生まれた時は約300本。大人は206本' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '成長とともに骨が融合していく' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: 'ハチミツは何千年経っても腐らない' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'エジプトの墓から見つかったハチミツも食べられた' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '水分が少なく、酸性度が高いため' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
];

export function getLearningContent(
  genre: LearningGenre,
  memos: string[]
): ContentItem[][] {
  switch (genre) {
    case 'language':
      return languageContent;
    case 'business':
      return businessContent;
    case 'trivia':
      return triviaContent;
    case 'memo': {
      if (memos.length === 0) {
        return [
          [
            {
              type: 'speech',
              text: 'メモが登録されていません。設定画面からメモを追加してください。',
            },
            { type: 'pause', pauseMultiplier: 2 },
          ],
        ];
      }
      return memos.map((memo) => [
        { type: 'speech' as const, text: memo },
        { type: 'pause' as const, pauseMultiplier: 2 },
      ]);
    }
  }
}
