import React from 'react';
import { useQuery } from 'urql';
import { FavoriteBikeParksDocument, FavoriteBikeParksQuery } from '../../lib/graphql/generated/graphql-operations';
import FallbackImage from '../../components/common/FallbackImage';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../components/common/FavoriteButton';

const SavedParks: React.FC = () => {
  const navigate = useNavigate();

  const [{ data }] = useQuery<FavoriteBikeParksQuery>({ query: FavoriteBikeParksDocument });

  const handleViewDetails = (id: string) => {
    navigate(`/bike-park/${id}`);
  };

  return (
    <section id="saved-parks" className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Saved Parks</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {data?.favoriteBikeParks?.map((bikePark) => (
            <div key={`favorite_${bikePark?.id}`} id="saved-park-1" className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <FallbackImage
                  src={bikePark?.imageUrl || "https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png"}
                  alt={bikePark?.name || "Bike Park"}
                  className="w-full h-full object-cover"
                />
                <FavoriteButton
                  id={bikePark?.id ?? ""}
                  iconOnly={true}
                  classes="absolute top-4 right-4 text-red-500 hover:text-red-600"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{bikePark?.name}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-sm px-2 py-1 rounded capitalize">{bikePark?.difficulty}</span>
                </div>
                <p className="text-gray-600 mb-4">{bikePark?.location}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                    <span className="font-semibold">{bikePark?.rating}</span>
                    <span className="text-gray-500 ml-1">{`${bikePark?.reviews?.length} reviews`}</span>
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700" onClick={() => handleViewDetails(bikePark?.id ?? "")}>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavedParks;