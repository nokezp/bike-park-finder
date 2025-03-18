import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ForgotPasswordPage from '../page';

// Mock fetch globally
global.fetch = jest.fn();

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form', () => {
    render(<ForgotPasswordPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });

  it('shows loading state while submitting', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<ForgotPasswordPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/sending/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(screen.queryByText(/sending/i)).not.toBeInTheDocument();
    });
  });

  it('shows success message on successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Reset link sent' }),
    });

    render(<ForgotPasswordPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/check your email/i)).toBeInTheDocument();
    });
  });

  it('shows error message on submission failure', async () => {
    const mockError = new Error('Failed to send reset link');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    render(<ForgotPasswordPage />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByText('Failed to send reset email')).toBeInTheDocument();
    });
  });
}); 