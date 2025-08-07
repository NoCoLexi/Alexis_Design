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

      // Create oscillator for the click sound
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Configure the sound - short, high-pitched click
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.05);

      // Quick volume envelope for click effect
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

      // Play for a very short duration
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.05);

    } catch (error) {
      console.warn('Could not play click sound:', error);
    }
  }

  public enable() {
    this.init();
  }
}

export const audioManager = new AudioManager();