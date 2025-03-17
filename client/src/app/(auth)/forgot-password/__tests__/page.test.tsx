import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordPage from '../page';

describe('ForgotPasswordPage', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    (global.fetch as jest.Mock).mockReset();
  });

  it('renders the forgot password form', () => {
    render(<ForgotPasswordPage />);
    
    expect(screen.getByTestId('forgot-password-page')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    expect(screen.getByTestId('login-link')).toBeInTheDocument();
  });

  it('shows loading state while submitting', async () => {
    render(<ForgotPasswordPage />);
    
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('reset-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Sending...');
  });

  it('shows success message after successful submission', async () => {
    render(<ForgotPasswordPage />);
    
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('reset-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });
  });

  it('shows error message on submission failure', async () => {
    // Mock fetch to reject
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to send reset email'));

    render(<ForgotPasswordPage />);
    
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('reset-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to send reset email');
    });
  });
}); 