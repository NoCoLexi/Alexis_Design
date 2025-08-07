// Audio utility for generating tom drum sounds
class AudioManager {
  private audioContext: AudioContext | null = null;
  private isEnabled = false;
  private isInitialized = false;

  constructor() {
    // Don't initialize here, wait for user interaction
  }

  private async init() {
    // Create audio context on first interaction
    if (!this.audioContext && !this.isInitialized) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.isEnabled = true;
        this.isInitialized = true;
        console.log('Audio context initialized');
      } catch (error) {
        console.warn('Web Audio API not supported:', error);
        this.isEnabled = false;
        this.isInitialized = true;
      }
    }
  }

  private async resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  public async playClickSound() {
    // Initialize audio context if not already done
    if (!this.isInitialized) {
      await this.init();
    }

    if (!this.isEnabled || !this.audioContext) {
      console.warn('Audio not enabled or context missing');
      return;
    }

    try {
      await this.resumeContext();

      // Create oscillator for the low tom drum sound
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Configure the sound - audible low tom drum
      oscillator.frequency.setValueAtTime(120, this.audioContext.currentTime); // Higher starting frequency for better audibility
      oscillator.frequency.exponentialRampToValueAtTime(60, this.audioContext.currentTime + 0.1); // Drop to low tom range

      // Drum-like volume envelope - quick attack, slower decay
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.6, this.audioContext.currentTime + 0.01); // Much louder attack
      gainNode.gain.exponentialRampToValueAtTime(0.02, this.audioContext.currentTime + 0.15); // Louder decay

      // Play for optimal duration
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.15);

      console.log('Tom sound played');

    } catch (error) {
      console.warn('Could not play tom sound:', error);
    }
  }

  public async enable() {
    await this.init();
  }
}

export const audioManager = new AudioManager();