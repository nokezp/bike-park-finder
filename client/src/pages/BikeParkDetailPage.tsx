import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { GetBikeParkDocument, GetBikeParkQuery } from '../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';

interface Review {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  content: string;
  date: string;
}

interface Trail {
  id: string;
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  length: string;
  elevation: string;
  type: string;
}

interface BikePark {
  id: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  reviewCount: number;
  mainImage: string;
  galleryImages: string[];
  features: string[];
  openingHours: {
    [key: string]: string;
  };
  pricing: {
    dayPass: string;
    seasonPass: string;
    rentals: string;
  };
  trails: Trail[];
  reviews: Review[];
}

const BikeParkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ data, fetching, error }] = useQuery({
    // const [{ data, fetching, error }] = useQuery<GetBikeParkQuery>({
    query: GetBikeParkDocument,
    variables: { id },
  });

  // const coordinates: [number, number] = useMemo(() => {
  //   return [bikePark?.coordinates?.longitude, bikePark?.coordinates?.latitude];
  // }, [bikePark?.coordinates?.longitude, bikePark?.coordinates?.latitude]);

  const bikePark = data?.bikePark;
  console.log('bikePark: ', bikePark);

  if (!id) return <div>Invalid bike park ID</div>;
  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!bikePark) return <div>Bike park not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[500px]">
        <img className="absolute inset-0 w-full h-full object-cover" src={bikePark.imageUrl} alt={bikePark.name} />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{bikePark.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <i className="fa-solid fa-star text-yellow-400 mr-1" />
                <span className="font-semibold">{bikePark.rating}</span>
                <span className="text-gray-300 ml-1">({bikePark.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-location-dot mr-2" />
                <span>{bikePark.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="md:col-span-2">
            {/* Description */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-600">{bikePark.description}</p>
            </section>

            {/* Trails */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Trails</h2>
                <button className="text-emerald-600 hover:text-emerald-700">View All Trails</button>
              </div>
              <div className="space-y-4">
                {bikePark.trails?.map((trail: Trail) => (
                  <div key={trail.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{trail.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          trail.difficulty === 'beginner'
                            ? 'bg-green-100 text-green-800'
                            : trail.difficulty === 'intermediate'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <span className="flex items-center">
                        <i className="fa-solid fa-ruler-horizontal mr-2" />
                        {trail.length}
                      </span>
                      <span className="flex items-center">
                        <i className="fa-solid fa-arrow-down mr-2" />
                        {trail.elevation}
                      </span>
                      <span className="flex items-center">
                        <i className="fa-solid fa-mountain mr-2" />
                        {trail.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <button className="text-emerald-600 hover:text-emerald-700">Write a Review</button>
              </div>
              <div className="space-y-6">
                {bikePark.reviews?.map((review: Review) => (
                  <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-start">
                      <img src={review.author.avatar} alt={review.author.name} className="w-10 h-10 rounded-full mr-4" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{review.author.name}</h3>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa-solid fa-star ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Info Cards */}
          <div className="space-y-6">
            {/* Features */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <div className="grid grid-cols-2 gap-4">
                {bikePark.features?.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <i className="fa-solid fa-check text-emerald-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Opening Hours */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Opening Hours</h2>
              <div className="space-y-2">
                {(Object.entries(bikePark.openingHours) as [string, string][]).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-gray-600">
                    <span>{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Pricing</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Day Pass</span>
                  <span className="font-semibold">{bikePark.pricing?.dayPass}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Season Pass</span>
                  <span className="font-semibold">{bikePark.pricing?.seasonPass}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bike Rentals</span>
                  <span className="font-semibold">{bikePark.pricing?.rentals}</span>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700">Book Now</button>
              <button className="w-full border border-emerald-600 text-emerald-600 py-3 rounded-lg hover:bg-emerald-50">
                Save to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeParkDetailPage;
