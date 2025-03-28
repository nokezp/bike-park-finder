import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { BikePark, GetBikeParkDocument, GetBikeParkQuery } from '../lib/graphql/generated/graphql-operations';
import ReviewSection from '../components/Review/ReviewSection';
import Header from '../components/BikeParkDetails/Header';
import BikeParkDescription from '../components/BikeParkDetails/BikeParkDescription';
import TrailMap from '../components/BikeParkDetails/TrailMap';
import WeatherWidget from '../components/BikeParkDetails/WeatherWidget';
import TrailStatus from '../components/BikeParkDetails/TrailStatus';
import VideoWidget from '../components/BikeParkDetails/VideoWidget';
import AccommodationSection from '../components/BikeParkDetails/AccommodationSection';
import ImageGallery from '../components/BikeParkDetails/ImageGallery';
import TrailDetails from '../components/BikeParkDetails/TrailDetails';
import AdditionalFeaturesSection from '../components/BikeParkDetails/AditionalFeaturesSection';

const BikeParkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ data, fetching, error }] = useQuery<GetBikeParkQuery>({
    query: GetBikeParkDocument,
    variables: { id },
  });

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.bikePark) return <div>No bike park found</div>;

  const bikePark = data.bikePark as BikePark;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header bikePark={bikePark} />

      <section id="park-content" className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BikeParkDescription bikePark={bikePark} />

              <TrailMap bikePark={bikePark} />

              <ReviewSection />
            </div>

            <div>
              <WeatherWidget bikePark={bikePark} />

              <TrailStatus bikePark={bikePark} />

              <VideoWidget bikePark={bikePark} />

              <AccommodationSection />
            </div>
          </div>
        </div>
      </section>

      <ImageGallery bikePark={bikePark} />

      <TrailDetails bikePark={bikePark} />

      <AdditionalFeaturesSection bikePark={bikePark} />
    </div>
  );
};

export default BikeParkDetailPage;
