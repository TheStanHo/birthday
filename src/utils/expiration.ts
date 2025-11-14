/**
 * Generate expiration timestamp (24 hours from now)
 */
export function generateExpirationTimestamp(): number {
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  return now + twentyFourHours;
}

/**
 * Check if a timestamp has expired
 */
export function isExpired(expiresTimestamp: number): boolean {
  return Date.now() > expiresTimestamp;
}

/**
 * Get time remaining until expiration in milliseconds
 */
export function getTimeRemaining(expiresTimestamp: number): number {
  const remaining = expiresTimestamp - Date.now();
  return Math.max(0, remaining);
}

/**
 * Format time remaining as human-readable string
 */
export function formatTimeRemaining(expiresTimestamp: number): string {
  const remaining = getTimeRemaining(expiresTimestamp);
  if (remaining === 0) return 'Expired';
  
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }
  return `${minutes}m remaining`;
}

