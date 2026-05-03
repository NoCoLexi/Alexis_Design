// Audio utility for generating tom drum sounds
class AudioManager {
  private audioContext: AudioContext | null = null;
  private isEnabled = false;
  private isInitialized = false;
  private masterVolume = 0.01; // Very low master volume

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

      // Configure the sound - crisp click sound
      oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime); // High frequency click
      oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.03); // Quick frequency drop

      // Sharp click envelope - very quick attack and decay
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.masterVolume, this.audioContext.currentTime + 0.005); // Quick sharp attack
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.03); // Quick decay

      // Play for very short duration for crisp click
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.03);

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