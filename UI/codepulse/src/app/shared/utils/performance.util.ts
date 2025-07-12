export class PerformanceUtil {
  private static timers: Map<string, number> = new Map();
  private static isDevelopment = false; // Set to true only in development

  static startTimer(key: string): void {
    if (this.isDevelopment) {
      this.timers.set(key, performance.now());
    }
  }

  static endTimer(key: string): number {
    if (!this.isDevelopment) {
      return 0;
    }

    const startTime = this.timers.get(key);
    if (!startTime) {
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(key);
    
    // Only log slow operations in development
    if (duration > 1000) {
      console.warn(`Slow operation: ${key} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  static measureAsync<T>(key: string, promise: Promise<T>): Promise<T> {
    if (!this.isDevelopment) {
      return promise;
    }
    
    this.startTimer(key);
    return promise.finally(() => this.endTimer(key));
  }

  // Method to enable/disable performance logging
  static setDevelopmentMode(enabled: boolean): void {
    this.isDevelopment = enabled;
  }
}
