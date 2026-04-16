import type { ContentItem } from '../../types';

export const reentryContent: ContentItem[][] = [
  [
    { type: 'speech', text: 'まだ何かを決めなくて大丈夫です' },
    { type: 'pause', pauseMultiplier: 2.5 },
    { type: 'speech', text: 'ここでは、考えを進めなくても大丈夫です' },
    { type: 'pause', pauseMultiplier: 3 },
    { type: 'speech', text: '音が少し遠くにあるように、そのままでいてください' },
    { type: 'pause', pauseMultiplier: 3 },
    { type: 'speech', text: '次の言葉を待たなくても大丈夫です' },
    { type: 'pause', pauseMultiplier: 4 },
  ],
  [
    { type: 'speech', text: '何も考えなくて大丈夫です' },
    { type: 'pause', pauseMultiplier: 3 },
    { type: 'speech', text: 'ただ、ここにいるだけで大丈夫です' },
    { type: 'pause', pauseMultiplier: 3 },
    { type: 'speech', text: '体の力を抜いてください' },
    { type: 'pause', pauseMultiplier: 3.5 },
    { type: 'speech', text: 'そのまま、ゆっくりと' },
    { type: 'pause', pauseMultiplier: 4 },
  ],
  [
    { type: 'speech', text: '目を閉じたままで大丈夫です' },
    { type: 'pause', pauseMultiplier: 3 },
    { type: 'speech', text: '呼吸だけが、ゆっくり続いています' },
    { type: 'pause', pauseMultiplier: 3.5 },
    { type: 'speech', text: 'この声も、だんだん遠くなっていきます' },
    { type: 'pause', pauseMultiplier: 4 },
    { type: 'speech', text: 'そのままで大丈夫です' },
    { type: 'pause', pauseMultiplier: 5 },
  ],
];
