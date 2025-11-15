import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePermalink } from '../usePermalink';

// Mock window.location
const mockLocation = {
  origin: 'https://birthday.stanho.dev',
  pathname: '/',
  search: '',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('usePermalink', () => {
  beforeEach(() => {
    mockLocation.search = '';
    mockLocation.origin = 'https://birthday.stanho.dev';
    mockLocation.pathname = '/';
  });

  it('should generate a permalink with correct format', () => {
    const { result } = renderHook(() => usePermalink());
    const link = result.current.generatePermalink('Test User', 'Happy Birthday!');
    
    expect(link).toContain('name=Test+User');
    expect(link).toContain('id=');
    expect(link).toContain('expires=');
    expect(link).toContain('message=Happy+Birthday%21');
    expect(link).toMatch(/^https:\/\/birthday\.stanho\.dev\/\?/);
  });

  it('should generate permalink without custom message', () => {
    const { result } = renderHook(() => usePermalink());
    const link = result.current.generatePermalink('Test User');
    
    expect(link).toContain('name=Test+User');
    expect(link).not.toContain('message=');
  });

  it('should parse valid URL parameters', async () => {
    const expires = Date.now() + 1000 * 60 * 60 * 24; // 24 hours from now
    mockLocation.search = `?name=Test&id=123&expires=${expires}&message=Happy%20Birthday`;
    
    const { result } = renderHook(() => usePermalink());
    
    await waitFor(() => {
      expect(result.current.permalinkData).not.toBeNull();
    });
    
    expect(result.current.permalinkData?.name).toBe('Test');
    expect(result.current.permalinkData?.id).toBe('123');
    expect(result.current.permalinkData?.customMessage).toBe('Happy Birthday');
    expect(result.current.isExpired).toBe(false);
  });

  it('should detect expired links', async () => {
    const expires = Date.now() - 1000; // 1 second ago
    mockLocation.search = `?name=Test&id=123&expires=${expires}`;
    
    const { result } = renderHook(() => usePermalink());
    
    await waitFor(() => {
      expect(result.current.isExpired).toBe(true);
    });
  });

  it('should return null when no URL parameters', () => {
    mockLocation.search = '';
    const { result } = renderHook(() => usePermalink());
    
    expect(result.current.permalinkData).toBeNull();
  });
});

