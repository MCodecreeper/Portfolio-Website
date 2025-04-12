// Sound manager class using Web Audio API
class SoundManager {
  private static instance: SoundManager;
  private isMuted: boolean = false;
  private audioContext: AudioContext | null = null;
  private sounds: Record<string, AudioBuffer> = {};
  private hoverTimeout: number | null = null;
  private isMobile: boolean = false;

  private constructor() {
    // Initialize sound preferences from localStorage
    this.isMuted = localStorage.getItem('soundMuted') === 'true';
    console.log('SoundManager initialized, muted:', this.isMuted);
    
    // Check if device is mobile
    this.isMobile = this.checkIfMobile();
    console.log('Device is mobile:', this.isMobile);
    
    // Initialize audio context on user interaction
    this.initAudioContext();
  }

  private checkIfMobile(): boolean {
    // Check if device is mobile using user agent
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Regular expressions for mobile devices
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    
    return mobileRegex.test(userAgent.toLowerCase());
  }

  private initAudioContext() {
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      console.log('Audio context initialized');
    } catch (error) {
      console.error('Error initializing audio context:', error);
    }
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private createOscillator(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.audioContext || this.isMuted) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + duration);
      
      console.log('Playing oscillator sound:', frequency, type);
    } catch (error) {
      console.error('Error playing oscillator sound:', error);
    }
  }

  public playClick(): void {
    if (!this.audioContext || this.isMuted) return;
    
    try {
      const time = this.audioContext.currentTime;
      
      // Create a natural mouse click sound
      const osc1 = this.audioContext.createOscillator();
      const osc2 = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      // First oscillator - high frequency for the "click" part
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(1500, time);
      osc1.frequency.exponentialRampToValueAtTime(1000, time + 0.02);
      
      // Second oscillator - lower frequency for the "body" of the click
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(300, time);
      osc2.frequency.exponentialRampToValueAtTime(200, time + 0.03);
      
      // Gain envelope for a natural mouse click sound
      gainNode.gain.setValueAtTime(0.2, time);
      gainNode.gain.exponentialRampToValueAtTime(0.05, time + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
      
      // Connect everything
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Start and stop
      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + 0.05);
      osc2.stop(time + 0.05);
      
      console.log('Playing natural mouse click sound');
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
  }

  public playCameraClick(): void {
    if (!this.audioContext || this.isMuted) return;
    
    try {
      const time = this.audioContext.currentTime;
      
      // Create a camera shutter/UI click sound (like in videos)
      const osc1 = this.audioContext.createOscillator();
      const osc2 = this.audioContext.createOscillator();
      const osc3 = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      // First oscillator - high frequency for the "click" attack
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(2000, time);
      osc1.frequency.exponentialRampToValueAtTime(1500, time + 0.02);
      
      // Second oscillator - mid frequency for the "body"
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(800, time);
      osc2.frequency.exponentialRampToValueAtTime(600, time + 0.03);
      
      // Third oscillator - low frequency for the "thud"
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(200, time);
      osc3.frequency.exponentialRampToValueAtTime(150, time + 0.04);
      
      // Filter for a more natural sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3000, time);
      filter.Q.setValueAtTime(1, time);
      
      // Gain envelope for a natural camera click sound
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.2, time + 0.01); // Quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.05, time + 0.05); // Quick decay
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1); // Slow release
      
      // Connect everything
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Start and stop
      osc1.start(time);
      osc2.start(time);
      osc3.start(time);
      osc1.stop(time + 0.1);
      osc2.stop(time + 0.1);
      osc3.stop(time + 0.1);
      
      console.log('Playing camera click sound');
    } catch (error) {
      console.error('Error playing camera click sound:', error);
    }
  }

  public playRealMouseClick(): void {
    if (!this.audioContext || this.isMuted) return;
    
    try {
      const time = this.audioContext.currentTime;
      
      // Create a real mouse click sound with multiple components
      const osc1 = this.audioContext.createOscillator();
      const osc2 = this.audioContext.createOscillator();
      const osc3 = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      // First oscillator - very high frequency for the "click" attack
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(3000, time);
      osc1.frequency.exponentialRampToValueAtTime(2000, time + 0.01);
      
      // Second oscillator - mid frequency for the "body"
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(800, time);
      osc2.frequency.exponentialRampToValueAtTime(600, time + 0.02);
      
      // Third oscillator - low frequency for the "thud"
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(200, time);
      osc3.frequency.exponentialRampToValueAtTime(150, time + 0.03);
      
      // Filter for a more natural sound
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000, time);
      filter.Q.setValueAtTime(2, time);
      
      // Gain envelope for a real mouse click sound
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.3, time + 0.005); // Very quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.1, time + 0.02); // Quick decay
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.05); // Slow release
      
      // Connect everything
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Start and stop
      osc1.start(time);
      osc2.start(time);
      osc3.start(time);
      osc1.stop(time + 0.05);
      osc2.stop(time + 0.05);
      osc3.stop(time + 0.05);
      
      console.log('Playing real mouse click sound');
    } catch (error) {
      console.error('Error playing real mouse click sound:', error);
    }
  }

  public playHover(): void {
    // Don't play hover sounds on mobile devices
    if (this.isMobile) {
      return;
    }

    // Debounce hover sounds to prevent rapid firing
    if (this.hoverTimeout) {
      window.clearTimeout(this.hoverTimeout);
    }

    this.hoverTimeout = window.setTimeout(() => {
      if (!this.audioContext || this.isMuted) return;
      
      try {
        const time = this.audioContext.currentTime;
        
        // Create a very soft and polite hover sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        // Use a sine wave for a softer sound
        oscillator.type = 'sine';
        
        // Set a very low volume
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(0.01, time + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, time + 0.03);
        
        // Use a lower frequency for a more polite sound
        oscillator.frequency.setValueAtTime(400, time);
        
        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Start and stop the sound
        oscillator.start(time);
        oscillator.stop(time + 0.03);
        
        console.log('Playing hover sound');
      } catch (error) {
        console.error('Error playing hover sound:', error);
      }
    }, 50); // Debounce time
  }

  public playSuccess(): void {
    this.createOscillator(1000, 0.2, 'sine');
    setTimeout(() => this.createOscillator(1200, 0.2, 'sine'), 200);
  }

  public playError(): void {
    this.createOscillator(200, 0.2, 'sawtooth');
    setTimeout(() => this.createOscillator(150, 0.2, 'sawtooth'), 200);
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    localStorage.setItem('soundMuted', this.isMuted.toString());
    console.log('Sound muted:', this.isMuted);
  }

  public getMuteState(): boolean {
    return this.isMuted;
  }
}

export const soundManager = SoundManager.getInstance(); 