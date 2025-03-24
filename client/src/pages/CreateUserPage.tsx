import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  ridingLevel: string;
  agreeToTerms: boolean;
}

const CreateUserPage = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    ridingLevel: 'Beginner',
    agreeToTerms: false
  });

  // eslint-disable-next-line no-undef
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // eslint-disable-next-line no-undef
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Add form validation and API call
    console.log('Form submitted:', formData);
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
                <p className="text-gray-600 mt-2">Join the BikePark community today</p>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Riding Level</label>
                  <select
                    name="ridingLevel"
                    value={formData.ridingLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleCheckboxChange}
                    className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    required
                  />
                  <span className="ml-2 text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">
                      Privacy Policy
                    </Link>
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-200"
                >
                  Create Account
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
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                    <FaGoogle className="text-xl mr-2" />
                    Google
                  </button>
                  <button className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                    <FaFacebook className="text-xl mr-2" />
                    Facebook
                  </button>
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