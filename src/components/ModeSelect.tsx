import type { ModeId, AppSettings } from '../types';
import { MODE_DEFINITIONS, APP_NAME, LEARNING_GENRE_LABELS } from '../constants/appConfig';

interface Props {
  settings: AppSettings;
  onSelect: (mode: ModeId) => void;
  onOpenSettings: () => void;
}

export function ModeSelect({ settings, onSelect, onOpenSettings }: Props) {
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
