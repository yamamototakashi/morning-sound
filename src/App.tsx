import { useState, useCallback } from 'react';
import type { ModeId } from './types';
import { useSettings } from './hooks/useSettings';
import { usePlayer } from './hooks/usePlayer';
import { ModeSelect } from './components/ModeSelect';
import { Player } from './components/Player';
import { Settings } from './components/Settings';

type Screen = 'select' | 'player' | 'settings';

export default function App() {
  const { settings, updateSettings } = useSettings();
  const { playbackState, currentMode, play, pause, resume, stop, restart } =
    usePlayer(settings);
  const [screen, setScreen] = useState<Screen>('select');

  const handleSelectMode = useCallback(
    (mode: ModeId) => {
      updateSettings({ lastMode: mode });
      play(mode);
      setScreen('player');
    },
    [play, updateSettings]
  );

  const handleBack = useCallback(() => {
    stop();
    setScreen('select');
  }, [stop]);

  const handleStop = useCallback(() => {
    stop();
    setScreen('select');
  }, [stop]);

  return (
    <div className="app">
      {screen === 'select' && (
        <ModeSelect
          settings={settings}
          onSelect={handleSelectMode}
          onOpenSettings={() => setScreen('settings')}
        />
      )}

      {screen === 'player' && currentMode && (
        <Player
          mode={currentMode}
          playbackState={playbackState}
          onPause={pause}
          onResume={resume}
          onStop={handleStop}
          onRestart={restart}
          onBack={handleBack}
        />
      )}

      {screen === 'settings' && (
        <Settings
          settings={settings}
          onUpdate={updateSettings}
          onClose={() => setScreen('select')}
        />
      )}
    </div>
  );
}
