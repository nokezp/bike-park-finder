import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { useMutation } from 'urql';
import {
  ForgotPasswordDocument,
  ForgotPasswordMutation
} from '../../lib/graphql/generated/graphql-operations';

interface FormErrors {
  email?: string;
  general?: string;
}

const ForgotPasswordPage = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [{ data, error: forgotPasswordError }, forgotPassword] = useMutation<ForgotPasswordMutation>(ForgotPasswordDocument);

  useEffect(() => {
    if (data?.forgotPassword) {
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  }, [data?.forgotPassword]);

  useEffect(() => {
    if (forgotPasswordError) {
      setErrors({ general: 'Failed to send password reset email. Please try again.' });
      setIsSubmitting(false);
    }
  }, [forgotPasswordError]);

  // eslint-disable-next-line no-undef
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Clear errors when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (validateForm()) {
      setIsSubmitting(true);
      forgotPassword({ email }).catch(() => {
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
            {/* Forgot Password Form */}
            <div id="forgot-password-form" className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Forgot Password</h2>
                <p className="text-gray-600 mt-2">Enter your email to reset your password</p>
              </div>
              
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-5 rounded-lg flex flex-col items-center text-center">
                  <FaCheckCircle className="text-green-500 text-3xl mb-3" />
                  <h3 className="font-bold text-lg mb-2">Password Reset Email Sent</h3>
                  <p className="mb-4">
                    We&apos;ve sent instructions to reset your password to {email}. 
                    Please check your inbox and follow the instructions in the email.
                  </p>
                  <p className="text-sm text-green-600">
                    If you don&apos;t see the email, please check your spam folder.
                  </p>
                  <div className="mt-6">
                    <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Return to Login
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
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-500 text-sm flex items-center">
                        <FaExclamationCircle className="mr-1" size={12} />
                        {errors.email}
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
                        Sending...
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

export default ForgotPasswordPage;
