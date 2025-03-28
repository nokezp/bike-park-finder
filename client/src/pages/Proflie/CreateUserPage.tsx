import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';
import { useMutation } from 'urql';
import { GoogleLogin } from '@react-oauth/google';
import { 
  RegisterDocument, 
  RegisterMutation, 
  GoogleLoginDocument, 
  GoogleLoginMutation 
} from '../../lib/graphql/generated/graphql-operations';

interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  ridingLevel: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

const CreateUserPage = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    ridingLevel: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [{ data, error: registerError }, register] = useMutation<RegisterMutation>(RegisterDocument);
  const [{ data: googleData, error: googleError }, googleLogin] = useMutation<GoogleLoginMutation>(GoogleLoginDocument);
  
  useEffect(() => {
    if (data?.register.token) {
      navigator('/login');
    }
  }, [data?.register?.token]);

  useEffect(() => {
    if (googleData?.googleLogin?.token) {
      navigator('/user-account');
    }
  }, [googleData?.googleLogin?.token]);

  useEffect(() => {
    if (registerError) {
      if (registerError.message.includes('email')) {
        setErrors({ email: 'This email is already registered' });
      } else if (registerError.message.includes('username')) {
        setErrors({ username: 'This username is already taken' });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
      setIsSubmitting(false);
    }
  }, [registerError]);

  useEffect(() => {
    if (googleError) {
      setErrors({ general: 'Google sign-in failed. Please try again.' });
      setIsSubmitting(false);
    }
  }, [googleError]);

  // eslint-disable-next-line no-undef
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  // eslint-disable-next-line no-undef
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));

    // Clear errors when user checks the box
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

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

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setIsSubmitting(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (validateForm()) {
      setIsSubmitting(true);
      register(formData).catch(() => {
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
            {/* Registration Form */}
            <div id="register-form" className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Create Your Account</h2>
                <p className="text-gray-600 mt-2">Join the Bike Park Finder community today</p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <FaExclamationCircle className="mr-2" />
                    <span>{errors.general}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-red-500 text-sm flex items-center">
                        <FaExclamationCircle className="mr-1" size={12} />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-red-500 text-sm flex items-center">
                        <FaExclamationCircle className="mr-1" size={12} />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                      placeholder="Username"
                    />
                    {errors.username && (
                      <p className="mt-1 text-red-500 text-sm flex items-center">
                        <FaExclamationCircle className="mr-1" size={12} />
                        {errors.username}
                      </p>
                    )}
                  </div>
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
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-500 text-sm flex items-center">
                      <FaExclamationCircle className="mr-1" size={12} />
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-red-500 text-sm flex items-center">
                      <FaExclamationCircle className="mr-1" size={12} />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Riding Level</label>
                  <select
                    name="ridingLevel"
                    value={formData.ridingLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select your riding level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleCheckboxChange}
                    className={`mt-1 rounded ${errors.agreeToTerms ? 'border-red-500' : 'border-gray-300'
                      } text-emerald-600 focus:ring-emerald-500`}
                  />
                  <div className="ml-2">
                    <span className="text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">
                        Privacy Policy
                      </Link>
                    </span>
                    {errors.agreeToTerms && (
                      <p className="text-red-500 text-sm flex items-center mt-1">
                        <FaExclamationCircle className="mr-1" size={12} />
                        {errors.agreeToTerms}
                      </p>
                    )}
                  </div>
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
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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
                Already have an account?{' '}
                <Link to="/login" className="text-emerald-600 hover:text-emerald-700">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CreateUserPage;
