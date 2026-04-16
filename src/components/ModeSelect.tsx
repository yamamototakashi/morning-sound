import type { ModeId, AppSettings } from '../types';
import { MODE_DEFINITIONS, APP_NAME, LEARNING_GENRE_LABELS } from '../constants/appConfig';

interface Props {
  settings: AppSettings;
  onSelect: (mode: ModeId) => void;
  onOpenSettings: () => void;
  onToggleBedtime: () => void;
}

function formatDuration(ms: number): string {
  const totalMin = Math.floor(ms / 60000);
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  if (hours === 0) return `${mins}分`;
  return `${hours}時間${mins > 0 ? `${mins}分` : ''}`;
}

export function ModeSelect({ settings, onSelect, onOpenSettings, onToggleBedtime }: Props) {
  const sleepDuration = settings.bedtime
    ? Date.now() - settings.bedtime
    : null;

  return (
    <div className="mode-select">
      <header className="mode-select-header">
        <h1 className="app-title">{APP_NAME}</h1>
        <button
          className="settings-btn"
          onClick={onOpenSettings}
          aria-label="設定"
        >
          ⚙
        </button>
      </header>

      {/* Sleep duration display */}
      <button className="sleep-tracker" onClick={onToggleBedtime}>
        {settings.bedtime ? (
          <>
            <span className="sleep-duration">
              {sleepDuration != null && formatDuration(sleepDuration)}
            </span>
            <span className="sleep-label">睡眠中 — タップでリセット</span>
          </>
        ) : (
          <>
            <span className="sleep-icon">🛏</span>
            <span className="sleep-label">就寝する（タップで記録開始）</span>
          </>
        )}
      </button>

      {settings.lastMode && (
        <button
          className="last-mode-shortcut"
          onClick={() => onSelect(settings.lastMode!)}
        >
          ▶ 前回のモードを再生（
          {MODE_DEFINITIONS.find((m) => m.id === settings.lastMode)?.label}）
        </button>
      )}

      <div className="mode-grid">
        {MODE_DEFINITIONS.map((mode) => (
          <button
            key={mode.id}
            className="mode-btn"
            style={{ backgroundColor: mode.color }}
            onClick={() => onSelect(mode.id)}
          >
            <span className="mode-icon">{mode.icon}</span>
            <span className="mode-label">{mode.label}</span>
            <span className="mode-sublabel">
              {mode.id === 'learning'
                ? LEARNING_GENRE_LABELS[settings.learningGenre]
                : mode.sublabel}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
