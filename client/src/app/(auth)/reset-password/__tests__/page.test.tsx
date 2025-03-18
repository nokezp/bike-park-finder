import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import ResetPasswordPage from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

describe('ResetPasswordPage', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockSearchParams = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows error message for invalid token', () => {
    mockSearchParams.get.mockReturnValue(null);
    render(<ResetPasswordPage />);
    expect(screen.getByText('This password reset link is invalid or has expired.')).toBeInTheDocument();
  });

  it('shows password mismatch error', async () => {
    mockSearchParams.get.mockReturnValue('valid-token');
    render(<ResetPasswordPage />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('reset-button');

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('shows loading state while submitting', async () => {
    mockSearchParams.get.mockReturnValue('valid-token');
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<ResetPasswordPage />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('reset-button');

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
    });

    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Resetting...')).toBeInTheDocument();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(screen.queryByText('Resetting...')).not.toBeInTheDocument();
    });
  });

  it('redirects to login page on successful password reset', async () => {
    mockSearchParams.get.mockReturnValue('valid-token');
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Password reset successful' }),
    });

    render(<ResetPasswordPage />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('reset-button');

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Password reset successful! Redirecting to login...')).toBeInTheDocument();
    });

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('shows error message on submission failure', async () => {
    mockSearchParams.get.mockReturnValue('valid-token');
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to reset password'));

    render(<ResetPasswordPage />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('reset-button');

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to reset password. Please try again.');
    });
  });
}); 