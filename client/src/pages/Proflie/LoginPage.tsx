import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import { useMutation } from 'urql';
import { GoogleLogin } from '@react-oauth/google';
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  GoogleLoginDocument,
  GoogleLoginMutation
} from '../../lib/graphql/generated/graphql-operations';

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginFormData extends LoginMutationVariables {
  rememberMe: boolean;
}

const LoginPage = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [{ data, error: loginError }, login] = useMutation<LoginMutation>(LoginDocument);
  const [{ data: googleData, error: googleError }, googleLogin] = useMutation<GoogleLoginMutation>(GoogleLoginDocument);

  useEffect(() => {
    if (data?.login?.token) {
      navigator('/user-account');
    }
  }, [data?.login?.token]);

  useEffect(() => {
    if (googleData?.googleLogin?.token) {
      navigator('/user-account');
    }
  }, [googleData?.googleLogin?.token]);

  useEffect(() => {
    if (loginError) {
      setErrors({ general: 'Invalid email or password. Please try again.' });
      setIsSubmitting(false);
    }
  }, [loginError]);

  useEffect(() => {
    if (googleError) {
      setErrors({ general: 'Google sign-in failed. Please try again.' });
      setIsSubmitting(false);
    }
  }, [googleError]);

  // Handle successful Google login
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      setIsSubmitting(true);
      googleLogin({ idToken: credentialResponse.credential }).catch(() => {
        setIsSubmitting(false);
      });
    }
  };

  // Handle Google login error
  const handleGoogleError = () => {
    setErrors({ general: 'Google sign-in failed. Please try again.' });
  };

  // eslint-disable-next-line no-undef
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (validateForm()) {
      setIsSubmitting(true);
      login(formData).catch(() => {
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
            {/* Login Form */}
            <div id="login-form" className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Welcome Back</h2>
                <p className="text-gray-600 mt-2">Sign in to your Bike Park Finder account</p>
              </div>
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
                    value={formData.email}
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
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-500 text-sm flex items-center">
                      <FaExclamationCircle className="mr-1" size={12} />
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-emerald-600 hover:text-emerald-700">
                    Forgot Password?
                  </Link>
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
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign in with</span>
                  </div>
                </div>
                <div className="mt-6 grid px-4 py-2 justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    theme="outline"
                    size="large"
                    text="signin_with"
                    shape="rectangular"
                    logo_alignment="center"
                  />
                </div>
              </div>
              <p className="text-center mt-8 text-gray-600">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-emerald-600 hover:text-emerald-700">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
