import { useState, useRef, useCallback, useEffect } from 'react';
import type { ContentItem, PlaybackState, AppSettings, ModeId } from '../types';
import { getTTSProvider } from '../services/tts';
import { anxietyReliefContent } from '../constants/content/anxietyRelief';
import { reentryContent } from '../constants/content/reentry';
import { wakeUpContent } from '../constants/content/wakeUp';
import { getLearningContent } from '../constants/content/learning';

function getContentForMode(mode: ModeId, settings: AppSettings): ContentItem[][] {
  switch (mode) {
    case 'anxiety':
      return anxietyReliefContent;
    case 'reentry':
      return reentryContent;
    case 'wakeup':
      return wakeUpContent;
    case 'learning':
      return getLearningContent(settings.learningGenre, settings.memos);
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function usePlayer(settings: AppSettings) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [currentMode, setCurrentMode] = useState<ModeId | null>(null);
  const abortRef = useRef(false);
  const pausedRef = useRef(false);
  const pauseResolveRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const tts = getTTSProvider();

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
  }, []);

  const sleep = useCallback((ms: number): Promise<void> => {
    return new Promise((resolve) => {
      timerRef.current = setTimeout(resolve, ms);
    });
  }, []);

  const waitForResume = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      pauseResolveRef.current = resolve;
    });
  }, []);

  const playContent = useCallback(
    async (mode: ModeId) => {
      const s = settingsRef.current;
      const contentSets = getContentForMode(mode, s);
      if (contentSets.length === 0) return;

      const sessionMs = s.sessionLength * 60 * 1000;
      const startTime = Date.now();

      sessionTimerRef.current = setTimeout(() => {
        abortRef.current = true;
        tts.cancel();
        clearTimers();
        setPlaybackState('idle');
      }, sessionMs);

      let queue = shuffleArray(contentSets);
      let queueIndex = 0;

      while (!abortRef.current && Date.now() - startTime < sessionMs) {
        if (queueIndex >= queue.length) {
          queue = shuffleArray(contentSets);
          queueIndex = 0;
        }

        const items = queue[queueIndex];
        queueIndex++;

        for (const item of items) {
          if (abortRef.current) return;

          // Check if paused — wait for resume
          if (pausedRef.current) {
            await waitForResume();
          }

          if (abortRef.current) return;

          if (item.type === 'speech' && item.text) {
            try {
              await tts.speak(item.text, settingsRef.current.speechRate, undefined, settingsRef.current.voiceType);
            } catch {
              if (abortRef.current) return;
            }
          } else if (item.type === 'pause') {
            const pauseMs =
              settingsRef.current.pauseDuration *
              1000 *
              (item.pauseMultiplier ?? 1);
            const jitter = pauseMs * (0.8 + Math.random() * 0.4);
            await sleep(jitter);
          }
        }
      }

      if (!abortRef.current) {
        setPlaybackState('idle');
      }
    },
    [tts, waitForResume, sleep, clearTimers]
  );

  const play = useCallback(
    (mode: ModeId) => {
      abortRef.current = false;
      pausedRef.current = false;
      setCurrentMode(mode);
      setPlaybackState('playing');
      playContent(mode);
    },
    [playContent]
  );

  const pause = useCallback(() => {
    pausedRef.current = true;
    tts.pause();
    setPlaybackState('paused');
  }, [tts]);

  const resume = useCallback(() => {
    pausedRef.current = false;
    tts.resume();
    setPlaybackState('playing');
    if (pauseResolveRef.current) {
      pauseResolveRef.current();
      pauseResolveRef.current = null;
    }
  }, [tts]);

  const stop = useCallback(() => {
    abortRef.current = true;
    pausedRef.current = false;
    tts.cancel();
    clearTimers();
    setPlaybackState('idle');
  }, [tts, clearTimers]);

  const restart = useCallback(() => {
    if (currentMode) {
      abortRef.current = true;
      pausedRef.current = false;
      tts.cancel();
      clearTimers();
      setTimeout(() => {
        abortRef.current = false;
        setPlaybackState('playing');
        playContent(currentMode);
      }, 100);
    }
  }, [currentMode, tts, clearTimers, playContent]);

  useEffect(() => {
    return () => {
      abortRef.current = true;
      tts.cancel();
      clearTimers();
    };
  }, [tts, clearTimers]);

  return {
    playbackState,
    currentMode,
    play,
    pause,
    resume,
    stop,
    restart,
  };
}
