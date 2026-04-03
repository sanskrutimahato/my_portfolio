/* ======================================
   SOUND MANAGER
   Handles ambient and interaction audio
   ====================================== */

class SoundManager {
  constructor() {
    this.audioContext = null;
    this.isEnabled = false;
    this.masterGain = null;
    this.ambientOscillators = [];
  }

  /** Initialize the Web Audio API context */
  init() {
    if (this.audioContext) return;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.audioContext.destination);
  }

  /** Toggle sound on/off */
  toggle() {
    if (!this.audioContext) this.init();
    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.audioContext.resume();
      this.startAmbient();
    } else {
      this.stopAmbient();
    }

    return this.isEnabled;
  }

  /** Start gentle ambient drone */
  startAmbient() {
    if (this.ambientOscillators.length > 0) return;

    const frequencies = [70, 82.5, 110]; // Low ambient drone (A1, E2, A2)
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.value = freq;

      filter.type = 'lowpass';
      filter.frequency.value = 200;
      filter.Q.value = 1;

      gain.gain.value = 0;
      // Fade in
      gain.gain.linearRampToValueAtTime(0.03 / (i + 1), this.audioContext.currentTime + 2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start();

      this.ambientOscillators.push({ osc, gain, filter });
    });
  }

  /** Stop ambient drone */
  stopAmbient() {
    this.ambientOscillators.forEach(({ osc, gain }) => {
      gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);
      setTimeout(() => {
        try { osc.stop(); } catch (e) { /* already stopped */ }
      }, 600);
    });
    this.ambientOscillators = [];
  }

  /** Play a short interaction beep (hover, click) */
  playInteraction(type = 'hover') {
    if (!this.isEnabled || !this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    if (type === 'hover') {
      osc.type = 'sine';
      osc.frequency.value = 800 + Math.random() * 400;
      gain.gain.value = 0.04;
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.value = 600;
      osc.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.08);
      gain.gain.value = 0.06;
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
    } else if (type === 'whoosh') {
      // White noise burst for section transitions
      const bufferSize = this.audioContext.sampleRate * 0.3;
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = this.audioContext.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = this.audioContext.createGain();
      const noiseFilter = this.audioContext.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1000;
      noiseFilter.Q.value = 0.5;
      noiseGain.gain.value = 0.03;
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      noise.start();
      return;
    }

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.25);
  }

  /** Cleanup */
  destroy() {
    this.stopAmbient();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Singleton instance
const soundManager = new SoundManager();
export default soundManager;
