import { useState } from 'react';
import { FaBicycle, FaLocationDot, FaPenToSquare } from 'react-icons/fa6';
import { MeDocument, MeQuery, ReviewsByUserDocument, ReviewsByUserQuery, StravaConnectionDocument, StravaConnectionQuery } from '../../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';
import ProfileActivityCard from '../../components/Profile/ProfileActivityCard';
import ProfileReviewCard from '../../components/Profile/ProfileReviewCard';
import ProfileImageCard from '../../components/Profile/ProfileImageCard';
import ProfileBadgeCard from '../../components/Profile/ProfileBadgeCard';
import StravaConnect from '../../components/Profile/StravaConnect';
import StravaActivitiesList from '../../components/Profile/StravaActivitiesList';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('activity');

  const tabs = [
    { id: 'activity', label: 'Recent Activity' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'photos', label: 'Photos' },
    { id: 'badges', label: 'Badges' },
    { id: 'integrations', label: 'Integrations' },
  ];

  const [{ data: userData }] = useQuery<MeQuery>({
    query: MeDocument,
  });

  const [{ data: ratingData }] = useQuery<ReviewsByUserQuery>({
    query: ReviewsByUserDocument,
    variables: {
      userId: userData?.me?.id,
      page: 1,
      limit: 5
    },
    pause: !userData?.me?.id,
  });

  const [{ data: stravaData }] = useQuery<StravaConnectionQuery>({
    query: StravaConnectionDocument,
  });

  const isStravaConnected = stravaData?.stravaConnection?.connected;

  const user = userData?.me;
  const reviews = ratingData?.reviewsByUser?.reviews;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pt-16">
        <section id="profile-section" className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div id="profile-header" className="relative h-[200px]">
              <div className="absolute inset-0">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cbfb607595-1a0e08f4c2b531f7da07.png"
                  className="w-full h-full object-cover"
                  alt="Profile banner"
                />
              </div>
              <div className="absolute -bottom-16 left-8">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                  className="w-32 h-32 rounded-full border-4 border-white"
                  alt="Profile"
                />
              </div>
              <div className="absolute top-4 right-4">
                <button className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50">
                  <FaPenToSquare className="inline mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>

            <div id="profile-info" className="pt-20 px-8 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{user?.username}</h1>
                  <p className="text-gray-600">{user?.profile?.location}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="flex items-center text-gray-600">
                      <FaBicycle className="mr-2" />
                      {user?.profile?.preferences?.skillLevel}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <FaLocationDot className="mr-2" />
                      25 Parks Visited
                    </span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-gray-600">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">238</div>
                    <div className="text-gray-600">Followers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="profile-tabs" className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 font-medium ${activeTab === tab.id ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {activeTab === 'activity' && (
              <div id="activity-feed" className="py-8">
                <div className="space-y-6">
                  {isStravaConnected ? (
                    <>
                      <h2 className="text-xl font-bold mb-4">Strava Activities</h2>
                      <StravaActivitiesList limit={3} />
                    </>
                  ) : (
                    <ProfileActivityCard
                      type="ride"
                      timestamp="1743119917730"
                      data={{
                        username: user?.username,
                        distance: '15.2km',
                        elevation: '867m',
                        duration: '1:45:22',
                      }}
                    />
                  )}

                  {reviews?.[0] && (
                    <ProfileActivityCard
                      type="review"
                      timestamp={reviews[0].createdAt}
                      data={{
                        username: user?.username,
                        parkName: reviews[0].title || null || undefined,
                        review: reviews[0].comment,
                        likes: 24,
                        comments: 8,
                      }}
                    />
                  )}

                  {!isStravaConnected && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Connect with Strava</h2>
                        <img src="https://cdn.worldvectorlogo.com/logos/strava-2.svg" alt="Strava Logo" className="h-8" />
                      </div>
                      <p className="mb-4">
                        Connect your Strava account to display your rides and activities in your profile.
                      </p>
                      <a href="#integrations" onClick={() => setActiveTab('integrations')} className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700 inline-block">
                        Connect Now
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div id="review-feed" className="py-8">
                <div className="space-y-6">
                  {reviews?.length ? (reviews?.map(review => (
                    <ProfileReviewCard
                      key={review.id}
                      parkName={review.title}
                      review={review.comment}
                      date={review.createdAt}
                      likes={45}
                      comments={12}
                      rating={review.rating}
                    />
                  ))) : (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <p className="text-gray-500">No reviews yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'photos' && (
              <div id="photos-feed" className="py-8">
                {/* <p className="text-gray-500">No photos uploaded yet.</p> */}
                <div id="activity-feed" className="py-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProfileImageCard
                      parkName="Whistler Bike Park"
                      trailName="A-Line Jump Trail"
                      image="https://storage.googleapis.com/uxpilot-auth.appspot.com/4c283db39f-6a44dee4d87bfec7f9b6.png"
                      date="1743119917730"
                      likes={45}
                      comments={12}
                    />
                    <ProfileImageCard
                      parkName="Highland Mountain"
                      trailName="Technical Section"
                      image="https://storage.googleapis.com/uxpilot-auth.appspot.com/b1c8d8edcf-6321fa3c81f467b26ce8.png"
                      date="1743018817730"
                      likes={32}
                      comments={8}
                    />
                    <ProfileImageCard
                      parkName="Northstar Resort"
                      trailName="Livewire Trail"
                      image="https://storage.googleapis.com/uxpilot-auth.appspot.com/b552a1ba48-7e766dbde97b9611b98d.png"
                      date="1742909717730"
                      likes={56}
                      comments={15}
                    />
                    <ProfileImageCard
                      parkName="Angel Fire Resort"
                      trailName="World Cup Track"
                      image="https://storage.googleapis.com/uxpilot-auth.appspot.com/cbfb607595-1a0e08f4c2b531f7da07.png"
                      date="1742019517730"
                      likes={41}
                      comments={9}
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'badges' && (
              <div id="badges-feed" className="py-8">
                {/* <p className="text-gray-500">No badges earned yet.</p> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <ProfileBadgeCard
                    badgeName="Peak Conqueror"
                    description="Completed 25 different trails"
                    icon="fa-mountain"
                    status="Achieved" />
                  <ProfileBadgeCard
                    badgeName="Trail Photographer"
                    description="Shared 50+ trail photos"
                    icon="fa-camera"
                    status="Achieved" />
                  <ProfileBadgeCard
                    badgeName="Explorer Elite"
                    description="Visited 10 different parks"
                    icon="fa-compass"
                    status="Achieved" />
                  <ProfileBadgeCard
                    badgeName="Trail Master"
                    description="Complete 100 different trails"
                    icon="fa-trophy"
                    status="In Progress" />
                  <ProfileBadgeCard
                    badgeName="Review Pro"
                    description="Write 50 detailed reviews"
                    icon="fa-star"
                    status="In Progress" />
                  <ProfileBadgeCard
                    badgeName="Hot Streak"
                    description="30 days active streak"
                    icon="fa-fire"
                    status="Achieved" />
                  <ProfileBadgeCard
                    badgeName="Social Rider"
                    description="Connect with 100 riders"
                    icon="fa-users"
                    status="In Progress" />
                  <ProfileBadgeCard
                    badgeName="Receive 1000+ likes"
                    description="Write 50 detailed reviews"
                    icon="fa-heart"
                    status="Achieved" />
                  <ProfileBadgeCard
                    badgeName="Review Pro"
                    description="Write 50 detailed reviews"
                    icon="fa-star"
                    status="In Progress" />
                </div>
              </div>
            )}
            {activeTab === 'integrations' && (
              <div id="integrations-feed" className="py-8">
                <div className="space-y-6">
                  <StravaConnect />

                  {/* Placeholder for future integrations */}
                  <div className="p-6 bg-white rounded-lg shadow-sm opacity-50">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Garmin Connect</h2>
                      <img src="https://cdn.worldvectorlogo.com/logos/garmin-2.svg" alt="Garmin Logo" className="h-8" />
                    </div>
                    <p className="mb-4">Coming soon! Connect your Garmin account to sync your activities.</p>
                    <button disabled className="px-4 py-2 text-white bg-gray-400 rounded-md cursor-not-allowed">
                      Coming Soon
                    </button>
                  </div>

                  <div className="p-6 bg-white rounded-lg shadow-sm opacity-50">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Komoot Connect</h2>
                      <img src="https://d21buns5ku92am.cloudfront.net/67683/logo/retina-1593443677.png" alt="Garmin Logo" className="h-8" />
                    </div>
                    <p className="mb-4">Coming soon! Connect your Komoot account to sync your activities.</p>
                    <button disabled className="px-4 py-2 text-white bg-gray-400 rounded-md cursor-not-allowed">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
