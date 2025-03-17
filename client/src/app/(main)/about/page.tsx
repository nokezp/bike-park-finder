'use client';

export default function AboutPage() {
  return (
    <main className="min-h-screen py-12" data-testid="about-page">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">About BikePark Finder</h1>
        
        <div className="max-w-3xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              BikePark Finder is dedicated to connecting mountain bikers with the perfect bike parks
              for their skill level and preferences. We believe that everyone should have access to
              accurate, up-to-date information about bike parks worldwide.
            </p>
            <p className="text-gray-600">
              Our platform serves as a comprehensive resource for the mountain biking community,
              helping riders discover new destinations and plan their next adventure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Detailed information about bike parks worldwide</li>
              <li>Interactive maps with park locations and features</li>
              <li>User reviews and ratings</li>
              <li>Difficulty ratings and trail descriptions</li>
              <li>Community-driven content and updates</li>
              <li>Event listings and park news</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-600 mb-4">
              We are a passionate team of mountain bikers and developers who love the sport
              and want to make it easier for others to discover great riding spots.
            </p>
            <p className="text-gray-600">
              Our team combines technical expertise with deep knowledge of mountain biking
              to create a platform that serves the needs of the entire biking community.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
            <p className="text-gray-600 mb-4">
              We believe in the power of community. You can contribute to BikePark Finder by:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Adding new bike parks to our database</li>
              <li>Writing reviews and sharing your experiences</li>
              <li>Submitting photos and videos</li>
              <li>Reporting outdated information</li>
              <li>Suggesting new features</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Have questions or suggestions? We'd love to hear from you! Visit our{' '}
              <a href="/contact" className="text-primary hover:underline">
                contact page
              </a>{' '}
              to get in touch with our team.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 