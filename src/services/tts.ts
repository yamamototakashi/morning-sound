import type { TTSProvider } from '../types';

/**
 * Web Speech API implementation.
 * Can be replaced with OpenAI TTS or other providers by implementing TTSProvider.
 */
class WebSpeechTTS implements TTSProvider {
  private paused = false;

  speak(text: string, rate: number, lang?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      window.speechSynthesis.cancel();
      this.paused = false;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Detect language from text content
      if (lang) {
        utterance.lang = lang;
      } else {
        utterance.lang = isJapanese(text) ? 'ja-JP' : 'en-US';
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => {
        if (event.error === 'canceled' || event.error === 'interrupted') {
          resolve();
        } else {
          reject(new Error(`Speech error: ${event.error}`));
        }
      };

      window.speechSynthesis.speak(utterance);

      // iOS Safari workaround: speechSynthesis can pause itself after ~15s
      // Periodically resume to keep it going
      this.keepAlive();
    });
  }

  pause(): void {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.paused = true;
    }
  }

  resume(): void {
    if (window.speechSynthesis && this.paused) {
      window.speechSynthesis.resume();
      this.paused = false;
    }
  }

  cancel(): void {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      this.paused = false;
    }
  }

  isSpeaking(): boolean {
    return window.speechSynthesis?.speaking ?? false;
  }

  isPaused(): boolean {
    return this.paused;
  }

  private keepAlive(): void {
    // iOS Safari workaround
    if (!window.speechSynthesis) return;
    const interval = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(interval);
        return;
      }
      if (this.paused) return;
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, 10000);
  }
}

function isJapanese(text: string): boolean {
  // Check if text contains Japanese characters
  return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/.test(text);
}

// Singleton — swap this factory to change TTS provider
let instance: TTSProvider | null = null;

export function getTTSProvider(): TTSProvider {
  if (!instance) {
    instance = new WebSpeechTTS();
  }
  return instance;
}

/**
 * To switch to OpenAI TTS in the future:
 * 1. Create a class that implements TTSProvider
 * 2. Replace the factory function above
 * 3. The OpenAI implementation would fetch audio from the API
 *    and play it via an Audio element instead of speechSynthesis
 */
