import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { GetBikeParkDocument, GetBikeParkQuery } from '../lib/graphql/generated/graphql-operations';
import FallbackImage from '../components/FallbackImage';
import moment from 'moment';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { defaultMapIcon } from './Map';

interface OpeningHours {
  days: string;
  hours: string;
}

function InvalidateMapSize() {
  const map = useMap();
  map.invalidateSize();
  return null;
}

function getTrailStatusColorClass(status: string) {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-600';
    case 'close':
      return 'bg-red-100 text-red-600';
    case 'Maintenance':
      return 'bg-yellow-100 text-yellow-600';
    default:
      return 'bg-green-100 text-green-600';
  }
}

function getTrailDifficultyColorClass(difficulty: string) {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-600';
    case 'intermediate':
      return 'bg-blue-100 text-blue-600';
    case 'expert':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-green-100 text-green-600';
  }
}

function getWeatherIcon(icon: string): string {
  return `http://openweathermap.org/img/w/${icon}.png`;
}

function getYouTubeEmbedUrl(url: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

const formatCurrency = (amount: number | undefined, currencyCode: string | undefined) => {
  if (!amount || !currencyCode) {
    return 'Unknown';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

const convertUnixToDayName = (unixTimestamp: number) => {
  const date = moment.unix(unixTimestamp);
  const today = moment().startOf('day');
  const tomorrow = moment().add(1, 'days').startOf('day');

  if (date.isSame(today, 'day')) {
    return 'Today';
  } else if (date.isSame(tomorrow, 'day')) {
    return 'Tomorrow';
  } else {
    return date.format('dddd'); // Returns the name of the weekday
  }
};

type BikeParkOpeningHours = NonNullable<NonNullable<GetBikeParkQuery['bikePark']>['openingHours']>;

const formatOpeningHours = (openingHours: BikeParkOpeningHours | null | undefined): OpeningHours[] => {
  if (!openingHours) {
    return [];
  }

  return [
    { days: 'Monday', hours: openingHours.monday || 'Closed' },
    { days: 'Tuesday', hours: openingHours.tuesday || 'Closed' },
    { days: 'Wednesday', hours: openingHours.wednesday || 'Closed' },
    { days: 'Thursday', hours: openingHours.thursday || 'Closed' },
    { days: 'Friday', hours: openingHours.friday || 'Closed' },
    { days: 'Saturday', hours: openingHours.saturday || 'Closed' },
    { days: 'Sunday', hours: openingHours.sunday || 'Closed' },
  ];
};

const getCurrentWorkingStatus = (openingHours: BikeParkOpeningHours | null | undefined): string | undefined => {
  if (!openingHours) {
    return 'Unknown';
  }

  const day = moment().format('dddd');
  return formatOpeningHours(openingHours).find(({ days }) => days === day)?.hours;
};

const getWorkWeekStatus = (openingHours: BikeParkOpeningHours | null | undefined): string | undefined => {
  if (!openingHours) {
    return 'Unknown';
  }

  const workingHours = formatOpeningHours(openingHours);
  const formatHours = (days: OpeningHours[]) => {
    return days.map((day) => `${day.days}: ${day.hours}`).join('\n');
  };

  const weekdays = workingHours.slice(0, 5);
  return weekdays.every((day) => day.hours === weekdays[0].hours) ? weekdays[0].hours : formatHours(weekdays);
};

const getWeekendStatus = (openingHours: BikeParkOpeningHours | null | undefined): string | undefined => {
  if (!openingHours) {
    return 'Unknown';
  }

  const workingHours = formatOpeningHours(openingHours);
  const formatHours = (days: OpeningHours[]) => {
    return days.map((day) => `${day.days}: ${day.hours}`).join('\n');
  };

  const weekendDays = workingHours.slice(5);
  return weekendDays.every((day) => day.hours === weekendDays[0].hours) ? weekendDays[0].hours : formatHours(weekendDays);
};

const BikeParkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ data, fetching, error }] = useQuery<GetBikeParkQuery>({
    query: GetBikeParkDocument,
    variables: { id },
  });

  if (fetching) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  if (!data?.bikePark) return <div>No bike park found</div>;

  const bikePark = data.bikePark;
  const formattedOpeningHours = formatOpeningHours(bikePark.openingHours);

  return (
    <div className="min-h-screen bg-slate-50">
      <section id="park-hero" className="relative h-[500px]">
        <div className="absolute inset-0">
          <FallbackImage
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png"
            alt={bikePark?.name}
            className="w-full h-full object-cover"
          />
          {/* <FallbackImage src={bikePark?.imageUrl ?? undefined} alt={bikePark?.name} className="w-full h-full object-cover" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative h-full flex items-end pb-8">
          <div className="text-white">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-emerald-500 px-3 py-1 rounded-full text-sm">
                {getCurrentWorkingStatus(bikePark.openingHours) !== 'Closed' ? 'Open Today' : 'Closed'}
              </span>
              <div className="flex items-center">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="ml-1">{bikePark.rating} (324 reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">{bikePark.name}</h1>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-location-dot"></i>
              <span>{bikePark.location}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="quick-info" className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between py-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <img id="wicon" src={getWeatherIcon(bikePark.weather?.current?.icon ?? '')} alt="Weather icon" />
                <div>
                  <p className="text-sm text-gray-600">Weather</p>
                  <p className="font-bold capitalize">
                    {bikePark.weather?.current?.temperature}°C {bikePark.weather?.current?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-clock text-2xl text-gray-600"></i>
                <div>
                  <p className="text-sm text-gray-600">Hours</p>
                  <p className="font-bold">{getCurrentWorkingStatus(bikePark.openingHours)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-ruler-vertical text-2xl text-gray-600"></i>
                <div>
                  <p className="text-sm text-gray-600">Vertical Drop</p>
                  <p className="font-bold">1,507 m</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                <i className="fa-solid fa-ticket mr-2"></i>Book Tickets
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <i className="fa-regular fa-heart mr-2"></i>Save
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <i className="fa-solid fa-share-nodes mr-2"></i>Share
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="park-content" className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div id="park-description" className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">About the Park</h2>
                <p className="text-gray-600 mb-4">{bikePark.description}</p>

                <div className="border-t border-gray-200 pt-4 pb-4 mt-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {bikePark.contact?.phone && (
                        <div className="flex items-center space-x-2">
                          <i className="fa-solid fa-phone text-emerald-600"></i>
                          <span>{bikePark.contact?.phone}</span>
                        </div>
                      )}
                      {bikePark.contact?.email && (
                        <div className="flex items-center space-x-2">
                          <i className="fa-solid fa-envelope text-emerald-600"></i>
                          <span>{bikePark.contact?.email}</span>
                        </div>
                      )}
                      {bikePark.website && (
                        <div className="flex items-center space-x-2">
                          <i className="fa-solid fa-globe text-emerald-600"></i>
                          <span>{bikePark.website}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {bikePark.socialMedia?.facebook && (
                        <div className="flex items-center space-x-2">
                          <i className="fa-brands fa-facebook text-emerald-600"></i>
                          <span>{bikePark.socialMedia?.facebook}</span>
                        </div>
                      )}
                      {bikePark.socialMedia?.instagram && (
                        <div className="flex items-center space-x-2">
                          <i className="fa-brands fa-instagram text-emerald-600"></i>
                          <span>{bikePark.socialMedia?.instagram}</span>
                        </div>
                      )}
                      {bikePark.socialMedia?.twitter && (
                        <div className="flex items-center space-x-2">
                          <i className="fa-brands fa-x-twitter text-emerald-600"></i>
                          <span>{bikePark.socialMedia?.twitter}</span>
                        </div>
                      )}
                      {bikePark.socialMedia?.youtube && (
                        <div className="flex items-center space-x-2">
                          <i className="fa-brands fa-youtube text-emerald-600"></i>
                          <span>{bikePark.socialMedia?.youtube}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div id="features" className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Features & Facilities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {bikePark.facilities?.map((facility) => (
                      <div key={facility} className="flex items-center space-x-2">
                        <i className="fa-solid fa-mountain text-emerald-600"></i>
                        {/* <span>70+ Trails</span> */}
                        <span>{facility}</span>
                      </div>
                    ))}
                    {/* <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-elevator text-emerald-600"></i>
                      <span>5 Lifts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-bicycle text-emerald-600"></i>
                      <span>Bike Rentals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-shop text-emerald-600"></i>
                      <span>Pro Shop</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-shower text-emerald-600"></i>
                      <span>Shower Facilities</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fa-solid fa-utensils text-emerald-600"></i>
                      <span>Restaurant</span>
                    </div> */}
                  </div>
                </div>

                <div id="hours-prices" className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>{getWorkWeekStatus(bikePark.openingHours)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday - Sunday</span>
                          <span>{getWeekendStatus(bikePark.openingHours)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-600">
                          <span>Night Riding (Thu-Sat)</span>
                          <span>6:00 PM - 8:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">Prices</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Day Pass</span>
                          <span>{formatCurrency(bikePark.price?.amount, bikePark?.price?.currency)}</span>
                        </div>
                        {/* <div className="flex justify-between">
                          <span>Half Day (after 1pm)</span>
                          <span>$69</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Season Pass</span>
                          <span>$699</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div id="rules" className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Park Rules</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {bikePark.rules?.map((rule) => (
                      <div key={rule} className="flex items-start space-x-2">
                        <i className="fa-solid fa-helmet-safety text-emerald-600 mt-1"></i>
                        <span>{rule}</span>
                      </div>
                    ))}
                    {/* <div className="flex items-start space-x-2">
                      <i className="fa-solid fa-hand text-emerald-600 mt-1"></i>
                      <span>Follow trail signage</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <i className="fa-solid fa-person-walking text-emerald-600 mt-1"></i>
                      <span>No hiking on bike trails</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <i className="fa-solid fa-clock text-emerald-600 mt-1"></i>
                      <span>Respect operating hours</span>
                    </div> */}
                  </div>
                </div>
              </div>

              <div id="trail-map" className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Trail Map</h2>
                  <button className="text-emerald-600 hover:text-emerald-700">
                    <i className="fa-solid fa-expand mr-1"></i>View Full Map
                  </button>
                </div>
                <div className="relative h-[400px] bg-gray-100 rounded-lg">
                  <MapContainer
                    center={[bikePark.coordinates?.latitude ?? 0, bikePark.coordinates?.longitude ?? 0]} // Center of Germany
                    zoom={6}
                    className="w-full h-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <InvalidateMapSize />
                    <Marker position={[bikePark.coordinates?.latitude ?? 0, bikePark.coordinates?.longitude ?? 0]} icon={defaultMapIcon} />
                  </MapContainer>
                </div>
              </div>

              <div id="reviews" className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Reviews</h2>
                  <button className="text-emerald-600 hover:text-emerald-700">Write a Review</button>
                </div>

                <div className="border-b border-gray-200 pb-6 mb-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-bold">Mike Thompson</h4>
                        <span className="text-gray-500">2 days ago</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                      <p className="text-gray-600">
                        Amazing park with world-className trails. The lift system is efficient and the staff is super friendly. A must-visit
                        for any mountain biker!
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-2 text-center text-emerald-600 hover:text-emerald-700">Show More Reviews</button>
              </div>
            </div>

            <div>
              <div id="weather-widget" className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Weather Forecast</h3>
                <div className="space-y-4">
                  {bikePark.weather?.forecast?.map((forecast) => (
                    <div key={forecast?.date} className="flex items-center justify-between">
                      <span>{convertUnixToDayName(Number(forecast?.date ?? 0))}</span>
                      <div className="flex items-center">
                        {/* <i className="fa-solid fa-sun text-yellow-400 mr-2"></i> */}
                        <img
                          id="wicon"
                          src={getWeatherIcon(forecast?.icon ?? '')}
                          alt="Weather icon"
                          className="mr-2 w-[30px]"
                          // width="40px"
                        />
                        <span>{forecast?.temperature}°C</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div id="trail-status" className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Trail Status</h3>
                <div className="space-y-4">
                  {bikePark.trails?.map((trail) => (
                    <div key={trail.id} className="flex items-center justify-between">
                      <span>{trail.name}</span>
                      <span className={`px-2 py-1 rounded-full text-sm capitalize ${getTrailStatusColorClass(trail.status)}`}>
                        {trail.status}
                      </span>
                    </div>
                  ))}
                  {/* <div className="flex items-center justify-between">
                    <span>Dirt Merchant</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">Maintenance</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Crank It Up</span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm">Open</span>
                  </div> */}
                </div>
                <button className="w-full mt-4 text-center text-emerald-600 hover:text-emerald-700">View All Trails</button>
              </div>

              {bikePark.videos?.length !== undefined && bikePark.videos.length > 0 && (
                <div id="park-video" className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4">Featured Video</h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(bikePark.videos[0])}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-play text-2xl text-emerald-600"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div id="accommodation" className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Nearby Accommodation</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <img
                      className="w-20 h-20 rounded-lg object-cover"
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/05bbaf55a7-77d064c5657a8a976d07.png"
                      alt="Hotel exterior"
                    />
                    <div>
                      <h4 className="font-bold">Whistler Village Inn</h4>
                      <div className="flex items-center text-yellow-400">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                      </div>
                      <span className="text-emerald-600">From $199/night</span>
                    </div>
                  </div>
                  <button className="w-full py-2 text-center text-emerald-600 hover:text-emerald-700">View More Options</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="image-gallery" className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Park Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bikePark.photos?.map((photo, index) => {
              return (
                <div key={'photo_' + index} className="relative h-48 group cursor-pointer">
                  <FallbackImage src={photo} alt={bikePark?.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-expand text-white text-2xl"></i>
                  </div>
                </div>
              );
            })}
            {/* <div className="relative h-48 group cursor-pointer">
              <FallbackImage
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9c3aa7e988-440d7ef9c1fdf0470128.png"
                alt={bikePark?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-expand text-white text-2xl"></i>
              </div>
            </div>
            <div className="relative h-48 group cursor-pointer">
              <FallbackImage
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7d3aa7e988-440d7ef9c1fdf0470128.png"
                alt={bikePark?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-expand text-white text-2xl"></i>
              </div>
            </div>
            <div className="relative h-48 group cursor-pointer">
              <FallbackImage
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6d3aa7e988-440d7ef9c1fdf0470128.png"
                alt={bikePark?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-expand text-white text-2xl"></i>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section id="trail-details" className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Trail Details</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikePark.trails?.map((trail) => (
              <div key={`trail_details_${trail.id}`} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{trail.name}</h3>
                  {/* <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">{trail.difficulty}</span> */}
                  <span className={`px-3 py-1 rounded-full text-sm capitalize ${getTrailDifficultyColorClass(trail.difficulty)}`}>
                    {trail.difficulty}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Length</span>
                    <span className="font-semibold">{trail.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Vertical Drop</span>
                    <span className="font-semibold">{trail.verticalDrop}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Features</span>
                    <div className="flex space-x-2">
                      {trail.features?.map((feature) => (
                        <i key={`trail_details_feature_${feature}`} className="fa-solid fa-person-biking text-emerald-600"></i>
                      ))}
                      {/* <i className="fa-solid fa-mountain text-emerald-600"></i>
                      <i className="fa-solid fa-bridge text-emerald-600"></i> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Dirt Merchant</h3>
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Expert</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Length</span>
                  <span className="font-semibold">1.8 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vertical Drop</span>
                  <span className="font-semibold">280m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Features</span>
                  <div className="flex space-x-2">
                    <i className="fa-solid fa-person-falling text-emerald-600"></i>
                    <i className="fa-solid fa-mountain text-emerald-600"></i>
                    <i className="fa-solid fa-bridge text-emerald-600"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Easy Does It</h3>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Beginner</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Length</span>
                  <span className="font-semibold">3.2 km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vertical Drop</span>
                  <span className="font-semibold">200m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Features</span>
                  <div className="flex space-x-2">
                    <i className="fa-solid fa-person-biking text-emerald-600"></i>
                    <i className="fa-solid fa-mountain text-emerald-600"></i>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section id="additional-features" className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Park Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bikePark.features?.slice(0, 4)?.map((feature) => (
              <div key={`feature_${feature.replace(' ', '_')}`} className="p-6 border rounded-lg">
                <i className="fa-solid fa-bicycle text-3xl text-emerald-600 mb-4"></i>
                <h3 className="text-lg font-bold mb-2">{feature}</h3>
                <p className="text-gray-600">Full suspension bikes, protective gear, and equipment available for rent.</p>
              </div>
            ))}
            {/* <div className="p-6 border rounded-lg">
              <i className="fa-solid fa-person-chalkboard text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-lg font-bold mb-2">Lessons & Clinics</h3>
              <p className="text-gray-600">Professional instruction for all skill levels, from beginners to advanced riders.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <i className="fa-solid fa-utensils text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-lg font-bold mb-2">Dining Options</h3>
              <p className="text-gray-600">Multiple restaurants and cafes located throughout the park.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <i className="fa-solid fa-kit-medical text-3xl text-emerald-600 mb-4"></i>
              <h3 className="text-lg font-bold mb-2">First Aid Station</h3>
              <p className="text-gray-600">On-site medical support and first aid facilities for rider safety.</p>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BikeParkDetailPage;
