# Testing Guide

This document describes the test suite for the Birthday Celebration application.

## Test Setup

The project uses:
- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

### Unit Tests

- `src/utils/__tests__/expiration.test.ts` - Tests for expiration utilities
  - Tests `isExpired()`, `formatTimeRemaining()`, `getTimeRemaining()`
  - Verifies 24-hour expiration logic

### Hook Tests

- `src/hooks/__tests__/usePermalink.test.ts` - Tests for permalink generation
  - Tests link generation with/without custom messages
  - Tests URL parameter parsing
  - Tests expiration detection

### Component Tests

- `src/components/__tests__/NameForm.test.tsx` - Form component tests
  - Tests form rendering
  - Tests validation (empty name)
  - Tests link generation
  - Tests custom message inclusion

- `src/components/__tests__/Cake.test.tsx` - Cake component tests
  - Tests candle rendering
  - Tests blow functionality via ref
  - Tests `onAllCandlesBlown` callback

## Manual Testing Checklist

### Form Functionality
- [ ] Form renders correctly
- [ ] Name input accepts text
- [ ] Custom message input accepts text
- [ ] Submit button generates link
- [ ] Link is visible and copyable
- [ ] "Continue to Celebration" button works

### Link Generation
- [ ] Generated link contains name parameter
- [ ] Generated link contains id parameter
- [ ] Generated link contains expires parameter
- [ ] Generated link contains message parameter (if provided)
- [ ] Link format is correct

### Celebration Page
- [ ] Birthday greeting displays correctly
- [ ] Instructions text appears
- [ ] Cake renders with candles
- [ ] Candles flicker properly
- [ ] Time remaining displays correctly
- [ ] Music toggle works

### Blow Detection
- [ ] Microphone permission requested
- [ ] Blow intensity bar appears
- [ ] Intensity increases when blowing
- [ ] Intensity decreases when not blowing
- [ ] Candles blow out one by one
- [ ] All candles blown triggers celebration

### Expiration
- [ ] Valid links work
- [ ] Expired links show expiration message
- [ ] Time remaining updates correctly

## Browser Testing

Tested on: https://birthday.stanho.dev

### Verified Functionality
✅ Form submission works
✅ Link generation works
✅ Link is visible (text color fixed)
✅ Link format is correct
✅ Navigation to celebration page works

### Known Issues
- Sound files return 404 (expected - they're optional)
- Blow sound file not found (expected - optional feature)

## Adding New Tests

When adding new features, add corresponding tests:

1. **Unit tests** for utility functions
2. **Hook tests** for custom hooks
3. **Component tests** for React components
4. **Integration tests** for user flows

Example test structure:
```typescript
import { describe, it, expect } from 'vitest';

describe('FeatureName', () => {
  it('should do something', () => {
    // Test implementation
  });
});
```

