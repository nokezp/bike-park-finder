/* eslint-disable no-undef */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { useMutation } from 'urql';
import {
  ResetPasswordDocument,
  ResetPasswordMutation
} from '../../lib/graphql/generated/graphql-operations';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigator = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [{ data, error: resetPasswordError }, resetPassword] = useMutation<ResetPasswordMutation>(ResetPasswordDocument);

  useEffect(() => {
    if (data?.resetPassword?.token) {
      setIsSuccess(true);
      setIsSubmitting(false);
      
      // Redirect to login after 3 seconds
      const redirectTimer = setTimeout(() => {
        navigator('/login');
      }, 3000);
      
      // Clean up the timer
      return () => {
        clearTimeout(redirectTimer);
      };
    }
  }, [data?.resetPassword?.token, navigator]);

  useEffect(() => {
    if (resetPasswordError) {
      if (resetPasswordError.message.includes('match')) {
        setErrors({ confirmPassword: 'Passwords do not match' });
      } else if (resetPasswordError.message.includes('token')) {
        setErrors({ general: 'Invalid or expired reset token. Please request a new password reset.' });
      } else {
        setErrors({ general: 'Failed to reset password. Please try again.' });
      }
      setIsSubmitting(false);
    }
  }, [resetPasswordError]);

  // eslint-disable-next-line no-undef
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!token) {
      setErrors({ general: 'Reset token is missing. Please request a new password reset.' });
      return;
    }

    if (validateForm()) {
      setIsSubmitting(true);
      resetPassword({
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      }).catch(() => {
        setIsSubmitting(false);
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pt-16">
        {/* Auth Section */}
        <section id="auth-section" className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto">
            {/* Reset Password Form */}
            <div id="reset-password-form" className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Reset Your Password</h2>
                <p className="text-gray-600 mt-2">Enter your new password below</p>
              </div>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-5 rounded-lg flex flex-col items-center text-center">
                  <FaCheckCircle className="text-green-500 text-3xl mb-3" />
                  <h3 className="font-bold text-lg mb-2">Password Reset Successful</h3>
                  <p className="mb-4">
                    Your password has been successfully reset. You&apos;ll be redirected to the login page in a few seconds.
                  </p>
                  <div className="mt-6">
                    <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Go to Login
                    </Link>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                      <FaExclamationCircle className="mr-2" />
                      <span>{errors.general}</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                      placeholder="Enter your new password"
                    />
                    {errors.password && (
                      <p className="mt-1 text-red-500 text-sm flex items-center">
                        <FaExclamationCircle className="mr-1" size={12} />
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                      placeholder="Confirm your new password"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-red-500 text-sm flex items-center">
                        <FaExclamationCircle className="mr-1" size={12} />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isSubmitting ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
                      } text-white py-3 px-4 rounded-lg transition duration-200 flex justify-center items-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Resetting Password...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>
              )}
              
              {!isSuccess && (
                <p className="text-center mt-8 text-gray-600">
                  Remember your password?{' '}
                  <Link to="/login" className="text-emerald-600 hover:text-emerald-700">
                    Sign in
                  </Link>
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
