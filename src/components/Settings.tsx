import { useState } from 'react';
import type { AppSettings, LearningGenre, SessionLength } from '../types';
import {
  LEARNING_GENRE_LABELS,
  SESSION_LENGTH_OPTIONS,
} from '../constants/appConfig';

interface Props {
  settings: AppSettings;
  onUpdate: (partial: Partial<AppSettings>) => void;
  onClose: () => void;
}

export function Settings({ settings, onUpdate, onClose }: Props) {
  const [memoInput, setMemoInput] = useState('');

  const addMemo = () => {
    const trimmed = memoInput.trim();
    if (trimmed) {
      onUpdate({ memos: [...settings.memos, trimmed] });
      setMemoInput('');
    }
  };

  const removeMemo = (index: number) => {
    onUpdate({ memos: settings.memos.filter((_, i) => i !== index) });
  };

  return (
    <div className="settings">
      <header className="settings-header">
        <h2>設定</h2>
        <button className="settings-close-btn" onClick={onClose}>
          ✕
        </button>
      </header>

      <div className="settings-body">
        {/* Learning Genre */}
        <section className="settings-section">
          <h3>学習ジャンル</h3>
          <div className="settings-genre-grid">
            {(Object.entries(LEARNING_GENRE_LABELS) as [LearningGenre, string][]).map(
              ([key, label]) => (
                <button
                  key={key}
                  className={`genre-btn ${
                    settings.learningGenre === key ? 'genre-btn-active' : ''
                  }`}
                  onClick={() => onUpdate({ learningGenre: key })}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </section>

        {/* Speech Rate */}
        <section className="settings-section">
          <h3>音声速度</h3>
          <div className="settings-slider-row">
            <span>遅い</span>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={settings.speechRate}
              onChange={(e) =>
                onUpdate({ speechRate: parseFloat(e.target.value) })
              }
            />
            <span>速い</span>
          </div>
          <p className="settings-value">{settings.speechRate.toFixed(2)}x</p>
        </section>

        {/* Pause Duration */}
        <section className="settings-section">
          <h3>無音の間（秒）</h3>
          <div className="settings-slider-row">
            <span>1</span>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={settings.pauseDuration}
              onChange={(e) =>
                onUpdate({ pauseDuration: parseFloat(e.target.value) })
              }
            />
            <span>8</span>
          </div>
          <p className="settings-value">{settings.pauseDuration}秒</p>
        </section>

        {/* Session Length */}
        <section className="settings-section">
          <h3>セッションの長さ</h3>
          <div className="settings-session-grid">
            {SESSION_LENGTH_OPTIONS.map((len) => (
              <button
                key={len}
                className={`session-btn ${
                  settings.sessionLength === len ? 'session-btn-active' : ''
                }`}
                onClick={() => onUpdate({ sessionLength: len as SessionLength })}
              >
                {len}分
              </button>
            ))}
          </div>
        </section>

        {/* Memos */}
        <section className="settings-section">
          <h3>自分メモ</h3>
          <p className="settings-hint">
            半睡眠学習モードの「自分メモ」で読み上げられます
          </p>
          <div className="memo-input-row">
            <input
              type="text"
              className="memo-input"
              placeholder="短い文を入力..."
              value={memoInput}
              onChange={(e) => setMemoInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addMemo();
              }}
            />
            <button className="memo-add-btn" onClick={addMemo}>
              追加
            </button>
          </div>
          <ul className="memo-list">
            {settings.memos.map((memo, i) => (
              <li key={i} className="memo-item">
                <span>{memo}</span>
                <button
                  className="memo-remove-btn"
                  onClick={() => removeMemo(i)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Volume Guide */}
        <section className="settings-section">
          <h3>音量について</h3>
          <p className="settings-hint">
            音量は端末のボリュームボタンで調整してください。
            半覚醒状態では小さめの音量がおすすめです。
            再入眠モードではさらに小さくすると効果的です。
          </p>
        </section>
      </div>
    </div>
  );
}
