import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NameForm from '../NameForm';

// Mock usePermalink hook
vi.mock('../../hooks/usePermalink', () => ({
  usePermalink: () => ({
    generatePermalink: (name: string, message?: string) => {
      const params = new URLSearchParams({
        name,
        id: 'test-id',
        expires: (Date.now() + 86400000).toString(),
      });
      if (message) params.set('message', message);
      return `https://birthday.stanho.dev/?${params.toString()}`;
    },
  }),
}));

describe('NameForm', () => {
  it('should render the form', () => {
    const mockOnPermalinkGenerated = vi.fn();
    render(<NameForm onPermalinkGenerated={mockOnPermalinkGenerated} />);
    
    expect(screen.getByText('Create Birthday Celebration')).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday Person's Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Custom Birthday Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Celebration Link/i })).toBeInTheDocument();
  });

  it('should show error when submitting without name', async () => {
    const user = userEvent.setup();
    const mockOnPermalinkGenerated = vi.fn();
    window.alert = vi.fn();
    
    render(<NameForm onPermalinkGenerated={mockOnPermalinkGenerated} />);
    
    const nameInput = screen.getByLabelText(/Birthday Person's Name/i);
    const submitButton = screen.getByRole('button', { name: /Generate Celebration Link/i });
    
    // Remove required attribute to test our validation
    nameInput.removeAttribute('required');
    
    await user.click(submitButton);
    
    expect(window.alert).toHaveBeenCalledWith('Please enter a name');
    expect(mockOnPermalinkGenerated).not.toHaveBeenCalled();
  });

  it('should generate link when form is submitted with name', async () => {
    const user = userEvent.setup();
    const mockOnPermalinkGenerated = vi.fn();
    
    render(<NameForm onPermalinkGenerated={mockOnPermalinkGenerated} />);
    
    const nameInput = screen.getByLabelText(/Birthday Person's Name/i);
    const submitButton = screen.getByRole('button', { name: /Generate Celebration Link/i });
    
    await user.type(nameInput, 'Test User');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Your celebration link/i)).toBeInTheDocument();
    });
    
    const linkInput = screen.getByDisplayValue(/birthday\.stanho\.dev/);
    expect(linkInput).toBeInTheDocument();
    const linkValue = (linkInput as HTMLInputElement).value;
    expect(linkValue).toContain('name=Test+User');
  });

  it('should include custom message in generated link', async () => {
    const user = userEvent.setup();
    const mockOnPermalinkGenerated = vi.fn();
    
    render(<NameForm onPermalinkGenerated={mockOnPermalinkGenerated} />);
    
    const nameInput = screen.getByLabelText(/Birthday Person's Name/i);
    const messageInput = screen.getByLabelText(/Custom Birthday Message/i);
    const submitButton = screen.getByRole('button', { name: /Generate Celebration Link/i });
    
    await user.type(nameInput, 'Test User');
    await user.type(messageInput, 'Happy Birthday!');
    await user.click(submitButton);
    
    await waitFor(() => {
      const linkInput = screen.getByDisplayValue(/birthday\.stanho\.dev/);
      expect(linkInput).toBeInTheDocument();
      const linkValue = (linkInput as HTMLInputElement).value;
      expect(linkValue).toContain('message=');
    });
  });

  it('should show Continue to Celebration button after link generation', async () => {
    const user = userEvent.setup();
    const mockOnPermalinkGenerated = vi.fn();
    
    render(<NameForm onPermalinkGenerated={mockOnPermalinkGenerated} />);
    
    const nameInput = screen.getByLabelText(/Birthday Person's Name/i);
    const submitButton = screen.getByRole('button', { name: /Generate Celebration Link/i });
    
    await user.type(nameInput, 'Test User');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Continue to Celebration/i })).toBeInTheDocument();
    });
  });
});

