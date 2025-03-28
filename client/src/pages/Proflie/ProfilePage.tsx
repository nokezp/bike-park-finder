import React, { useState } from 'react';
import { FaBicycle, FaLocationDot, FaPenToSquare } from 'react-icons/fa6';
import { FaRegHeart, FaRegComment, FaStar } from 'react-icons/fa';
import { MeDocument, MeQuery } from '../../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';

interface ActivityCardProps {
  type: 'ride' | 'review';
  timestamp: string;
  data: {
    distance?: string;
    elevation?: string;
    duration?: string;
    parkName?: string;
    review?: string;
    likes?: number;
    comments?: number;
  };
}

const ActivityCard: React.FC<ActivityCardProps> = ({ type, timestamp, data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Mike Thompson</p>
            <p className="text-sm text-gray-600">{type === 'ride' ? 'Completed a ride at Whistler Bike Park' : 'Posted a review'}</p>
          </div>
        </div>
        <span className="text-gray-500 text-sm">{timestamp}</span>
      </div>
      {type === 'ride' ? (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{data.distance}</div>
              <div className="text-gray-600 text-sm">Distance</div>
            </div>
            <div>
              <div className="text-lg font-bold">{data.elevation}</div>
              <div className="text-gray-600 text-sm">Elevation</div>
            </div>
            <div>
              <div className="text-lg font-bold">{data.duration}</div>
              <div className="text-gray-600 text-sm">Duration</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="font-semibold">{data.parkName}</span>
            </div>
            <p className="text-gray-600">{data.review}</p>
          </div>
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <FaRegHeart className="inline mr-1" />
              {data.likes} Likes
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FaRegComment className="inline mr-1" />
              {data.comments} Comments
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('activity');

  const tabs = [
    { id: 'activity', label: 'Recent Activity' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'photos', label: 'Photos' },
    { id: 'badges', label: 'Badges' },
  ];

  const [{ data }] = useQuery<MeQuery>({
    query: MeDocument,
  });

  const user = data?.me;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pt-16">
        <section id="profile-section" className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
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

            {/* Profile Info */}
            <div id="profile-info" className="pt-20 px-8 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{user?.username}</h1>
                  <p className="text-gray-600">Vancouver, Canada</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="flex items-center text-gray-600">
                      <FaBicycle className="mr-2" />
                      Advanced Rider
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

          {/* Activity Tabs */}
          <div id="profile-tabs" className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 font-medium ${
                      activeTab === tab.id ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Activity Feed */}
            {activeTab === 'activity' && (
              <div id="activity-feed" className="py-8">
                <div className="space-y-6">
                  <ActivityCard
                    type="ride"
                    timestamp="2h ago"
                    data={{
                      distance: '15.2km',
                      elevation: '867m',
                      duration: '1:45:22',
                    }}
                  />
                  <ActivityCard
                    type="review"
                    timestamp="1d ago"
                    data={{
                      parkName: 'Highland Mountain Bike Park',
                      review:
                        "Amazing day at Highland! The trails were in perfect condition and the staff was super friendly. Can't wait to come back!",
                      likes: 24,
                      comments: 8,
                    }}
                  />
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
