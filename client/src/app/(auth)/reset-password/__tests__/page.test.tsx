import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import ResetPasswordPage from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('ResetPasswordPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    // Reset mocks before each test
    (global.fetch as jest.Mock).mockReset();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('shows invalid link message when no token is provided', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    
    render(<ResetPasswordPage />);
    
    expect(screen.getByTestId('reset-password-page')).toBeInTheDocument();
    expect(screen.getByTestId('forgot-password-link')).toBeInTheDocument();
  });

  it('renders the reset password form with valid token', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('token=valid-token'));
    
    render(<ResetPasswordPage />);
    
    expect(screen.getByTestId('reset-password-page')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    expect(screen.getByTestId('login-link')).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('token=valid-token'));
    
    render(<ResetPasswordPage />);
    
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('reset-button');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.click(submitButton);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toHaveTextContent('Passwords do not match');
  });

  it('shows loading state while submitting', async () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('token=valid-token'));
    
    render(<ResetPasswordPage />);
    
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('reset-button');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Resetting...');
  });

  it('redirects to login page on successful password reset', async () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('token=valid-token'));
    
    render(<ResetPasswordPage />);
    
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('reset-button');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/login?reset=success');
    });
  });

  it('shows error message on submission failure', async () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('token=valid-token'));
    // Mock fetch to reject
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to reset password'));
    
    render(<ResetPasswordPage />);
    
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('reset-button');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to reset password');
    });
  });
}); 