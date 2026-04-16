import type { ModeId, PlaybackState } from '../types';
import { MODE_DEFINITIONS } from '../constants/appConfig';

interface Props {
  mode: ModeId;
  playbackState: PlaybackState;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onRestart: () => void;
  onBack: () => void;
}

export function Player({
  mode,
  playbackState,
  onPause,
  onResume,
  onStop,
  onRestart,
  onBack,
}: Props) {
  const modeDef = MODE_DEFINITIONS.find((m) => m.id === mode);

  return (
    <div className="player">
      <div className="player-mode-info">
        <span className="player-icon">{modeDef?.icon}</span>
        <h2 className="player-mode-name">{modeDef?.label}</h2>
        <p className="player-status">
          {playbackState === 'playing'
            ? '再生中'
            : playbackState === 'paused'
              ? '一時停止中'
              : '停止'}
        </p>
      </div>

      <div className="player-controls">
        {playbackState === 'playing' ? (
          <button className="player-btn player-btn-primary" onClick={onPause}>
            ⏸ 一時停止
          </button>
        ) : playbackState === 'paused' ? (
          <button className="player-btn player-btn-primary" onClick={onResume}>
            ▶ 再開
          </button>
        ) : null}

        <button className="player-btn" onClick={onRestart}>
          ↺ 最初から
        </button>

        <button className="player-btn" onClick={onStop}>
          ■ 停止
        </button>

        <button className="player-btn player-btn-back" onClick={onBack}>
          ← モード選択へ
        </button>
      </div>
    </div>
  );
}
