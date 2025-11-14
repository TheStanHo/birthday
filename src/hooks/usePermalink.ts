import { useState, useEffect } from 'react';
import { isExpired as checkExpired, formatTimeRemaining } from '../utils/expiration';

interface PermalinkData {
  name: string;
  customMessage?: string;
  id: string;
  expires: number;
}

/**
 * Hook to manage permalink generation and validation
 */
export function usePermalink() {
  const [permalinkData, setPermalinkData] = useState<PermalinkData | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    // Check URL parameters on mount
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const id = params.get('id');
    const expiresParam = params.get('expires');
    const customMessage = params.get('message') || undefined;

    if (name && id && expiresParam) {
      const expires = parseInt(expiresParam, 10);
      const expired = checkExpired(expires);
      
      setPermalinkData({ name, id, expires, customMessage });
      setIsExpired(expired);
      
      if (!expired) {
        setTimeRemaining(formatTimeRemaining(expires));
        // Update time remaining every minute
        const interval = setInterval(() => {
          const stillExpired = checkExpired(expires);
          if (stillExpired) {
            setIsExpired(true);
            clearInterval(interval);
          } else {
            setTimeRemaining(formatTimeRemaining(expires));
          }
        }, 60000);
        
        return () => clearInterval(interval);
      }
    }
  }, []);

  /**
   * Generate a new permalink
   */
  const generatePermalink = (name: string, customMessage?: string): string => {
    const id = crypto.randomUUID();
    const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    const params = new URLSearchParams({
      name,
      id,
      expires: expires.toString(),
    });
    
    if (customMessage) {
      params.set('message', customMessage);
    }
    
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?${params.toString()}`;
  };

  return {
    permalinkData,
    isExpired,
    timeRemaining,
    generatePermalink,
  };
}

