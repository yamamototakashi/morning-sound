import type { ContentItem } from '../../types';

export const wakeUpContent: ContentItem[][] = [
  [
    { type: 'speech', text: 'ここからは起きる方向に切り替えます' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: 'まず上半身を起こしてください' },
    { type: 'pause', pauseMultiplier: 2 },
    { type: 'speech', text: '次に水をひと口飲むか、カーテンを少し開けてください' },
    { type: 'pause', pauseMultiplier: 2 },
    { type: 'speech', text: '今日の最初の動きは、それだけで十分です' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: 'ゆっくりでいいので、体を動かす準備をしましょう' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '手のひらを開いて、握って、もう一度開いてください' },
    { type: 'pause', pauseMultiplier: 2 },
    { type: 'speech', text: '足首を回してみてください' },
    { type: 'pause', pauseMultiplier: 2 },
    { type: 'speech', text: '体が目覚め始めています。焦らず、このペースで大丈夫です' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
  [
    { type: 'speech', text: '今日も一日が始まります' },
    { type: 'pause', pauseMultiplier: 1.5 },
    { type: 'speech', text: '大きく伸びをしてください' },
    { type: 'pause', pauseMultiplier: 2 },
    { type: 'speech', text: '顔を洗うか、窓を開けてみてください' },
    { type: 'pause', pauseMultiplier: 2 },
    { type: 'speech', text: 'いいスタートです。この調子で大丈夫です' },
    { type: 'pause', pauseMultiplier: 2 },
  ],
];
