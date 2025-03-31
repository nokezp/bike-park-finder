import React, { useState } from "react";

const NewsSubscribeSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <section className="py-16 bg-emerald-600">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Latest Events</h2>
          <p className="mb-8">Get notified about new events and early bird tickets</p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-800">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsSubscribeSection;
