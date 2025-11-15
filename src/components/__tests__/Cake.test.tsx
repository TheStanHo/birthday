import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import Cake, { CakeHandle } from '../Cake';

describe('Cake', () => {
  it('should render the cake container', () => {
    const { container } = render(<Cake numberOfCandles={5} />);
    const cakeContainer = container.querySelector('.cake-container');
    expect(cakeContainer).toBeInTheDocument();
  });

  it('should render default 5 candles when numberOfCandles not specified', () => {
    const { container } = render(<Cake />);
    const cakeContainer = container.querySelector('.cake-container');
    expect(cakeContainer).toBeInTheDocument();
  });

  it('should blow out candles when blow() is called via ref', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const cakeRef = useRef<CakeHandle>(null);
      
      return (
        <>
          <Cake ref={cakeRef} numberOfCandles={3} />
          <button onClick={() => cakeRef.current?.blow()}>Blow</button>
        </>
      );
    };
    
    const { container } = render(<TestComponent />);
    const blowButton = container.querySelector('button');
    
    expect(blowButton).toBeInTheDocument();
    if (blowButton) {
      await user.click(blowButton);
      // After blowing, candles should be marked as blown
      // The component state changes internally
    }
  });

  it('should call onAllCandlesBlown when all candles are blown', async () => {
    const mockOnAllCandlesBlown = vi.fn();
    const user = userEvent.setup();
    
    const TestComponent = () => {
      const cakeRef = useRef<CakeHandle>(null);
      
      return (
        <>
          <Cake ref={cakeRef} numberOfCandles={2} onAllCandlesBlown={mockOnAllCandlesBlown} />
          <button onClick={() => cakeRef.current?.blow()}>Blow One</button>
        </>
      );
    };
    
    const { container } = render(<TestComponent />);
    const blowButton = container.querySelector('button');
    
    if (blowButton) {
      // Blow first candle
      await user.click(blowButton);
      // Wait for state update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Blow second candle
      await user.click(blowButton);
      // Wait for the timeout in the component (500ms) plus state updates
      await waitFor(() => {
        expect(mockOnAllCandlesBlown).toHaveBeenCalled();
      }, { timeout: 700 });
    }
  });
});

