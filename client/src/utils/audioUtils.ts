// Audio utility for generating click sounds
class AudioManager {
  private audioContext: AudioContext | null = null;
  private isEnabled = false;

  constructor() {
    // Initialize on first user interaction
    this.init();
  }

  private init() {
    // Create audio context on first interaction
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.isEnabled = true;
      } catch (error) {
        console.warn('Web Audio API not supported');
        this.isEnabled = false;
      }
    }
  }

  private async resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  public async playClickSound() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      await this.resumeContext();

      // Create oscillator for the low tom drum sound
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Configure the sound - deep, resonant tom drum
      oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime); // Start low like a tom
      oscillator.frequency.exponentialRampToValueAtTime(40, this.audioContext.currentTime + 0.15); // Drop even lower

      // Drum-like volume envelope - quick attack, slower decay
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.01); // Quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2); // Longer sustain/decay

      // Play for longer duration to simulate tom resonance
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.2);

    } catch (error) {
      console.warn('Could not play tom sound:', error);
    }
  }

  public enable() {
    this.init();
  }
}

export const audioManager = new AudioManager();