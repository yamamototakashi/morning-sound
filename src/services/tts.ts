import type { TTSProvider, VoiceType } from '../types';

/**
 * Web Speech API implementation.
 * Can be replaced with OpenAI TTS or other providers by implementing TTSProvider.
 */
class WebSpeechTTS implements TTSProvider {
  private paused = false;
  private cachedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    // Preload voices (some browsers load them asynchronously)
    if (window.speechSynthesis) {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      });
    }
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    if (window.speechSynthesis) {
      this.cachedVoices = window.speechSynthesis.getVoices();
    }
    return this.cachedVoices;
  }

  speak(text: string, rate: number, lang?: string, voiceType?: VoiceType): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      window.speechSynthesis.cancel();
      this.paused = false;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.volume = 1.0;

      // Detect language from text content
      const detectedLang = lang ?? (isJapanese(text) ? 'ja-JP' : 'en-US');
      utterance.lang = detectedLang;

      // Apply voice selection
      const voice = this.pickVoice(detectedLang, voiceType ?? 'default');
      if (voice) {
        utterance.voice = voice;
      }

      // Adjust pitch for "ojisan" voice — lower pitch
      utterance.pitch = voiceType === 'male' ? 0.7 : 1.0;

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
      this.keepAlive();
    });
  }

  private pickVoice(lang: string, voiceType: VoiceType): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    if (voices.length === 0) return null;

    const langPrefix = lang.split('-')[0]; // 'ja' or 'en'

    // Filter voices matching the language
    const langVoices = voices.filter(
      (v) => v.lang.startsWith(langPrefix)
    );

    if (langVoices.length === 0) return null;

    if (voiceType === 'male') {
      // Try to find a male voice by common naming patterns
      const maleKeywords = ['male', 'man', 'otoko', '男', 'hiro', 'takumi', 'kenta', 'daniel', 'james', 'david'];
      const maleVoice = langVoices.find((v) => {
        const name = v.name.toLowerCase();
        return maleKeywords.some((kw) => name.includes(kw));
      });
      if (maleVoice) return maleVoice;

      // If no explicit male voice found, try to avoid female-sounding names
      const femaleKeywords = ['female', 'woman', 'onna', '女', 'kyoko', 'o-ren', 'samantha', 'karen', 'victoria', 'fiona', 'moira', 'tessa'];
      const nonFemale = langVoices.find((v) => {
        const name = v.name.toLowerCase();
        return !femaleKeywords.some((kw) => name.includes(kw));
      });
      if (nonFemale) return nonFemale;

      // Fallback: just return any voice in the language, pitch will handle it
      return langVoices[0];
    }

    // Default: prefer local voices for better quality
    const localVoice = langVoices.find((v) => v.localService);
    return localVoice ?? langVoices[0];
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
  return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/.test(text);
}

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
