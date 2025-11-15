import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isExpired,
  formatTimeRemaining,
  getTimeRemaining,
} from '../expiration';

describe('expiration utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('isExpired', () => {
    it('should return false for future timestamps', () => {
      const future = Date.now() + 1000 * 60 * 60; // 1 hour from now
      expect(isExpired(future)).toBe(false);
    });

    it('should return true for past timestamps', () => {
      const past = Date.now() - 1000 * 60 * 60; // 1 hour ago
      expect(isExpired(past)).toBe(true);
    });

    it('should return true for current timestamp', () => {
      const now = Date.now();
      vi.advanceTimersByTime(1);
      expect(isExpired(now)).toBe(true);
    });
  });

  describe('getTimeRemaining', () => {
    it('should calculate correct time remaining', () => {
      const now = Date.now();
      const future = now + 1000 * 60 * 60 * 2; // 2 hours
      const remaining = getTimeRemaining(future);
      expect(remaining).toBe(1000 * 60 * 60 * 2);
    });

    it('should return 0 for expired timestamps', () => {
      const past = Date.now() - 1000;
      const remaining = getTimeRemaining(past);
      expect(remaining).toBe(0);
    });
  });

  describe('formatTimeRemaining', () => {
    it('should format hours and minutes correctly', () => {
      const future = Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 30; // 2h 30m
      const formatted = formatTimeRemaining(future);
      expect(formatted).toBe('2h 30m remaining');
    });

    it('should format only minutes when less than an hour', () => {
      const future = Date.now() + 1000 * 60 * 45; // 45 minutes
      const formatted = formatTimeRemaining(future);
      expect(formatted).toBe('45m remaining');
    });

    it('should return "Expired" for past timestamps', () => {
      const past = Date.now() - 1000;
      const formatted = formatTimeRemaining(past);
      expect(formatted).toBe('Expired');
    });
  });
});

