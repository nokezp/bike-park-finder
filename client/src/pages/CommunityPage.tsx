import React from 'react';

interface GroupMember {
  id: string;
  avatar: string;
}

interface Group {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  members: GroupMember[];
}

interface ActivityItem {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
}

const groups: Group[] = [
  {
    id: '1',
    name: 'Trail Blazers',
    category: 'Advanced Riders',
    description: 'Group for experienced riders looking for challenging trails and adventures.',
    icon: 'fa-mountain-sun',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    members: [
      { id: '1', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg' },
      { id: '2', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg' },
      { id: '3', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg' },
    ],
  },
  {
    id: '2',
    name: "Beginner's Hub",
    category: 'New Riders Welcome',
    description: 'Supportive community for beginners to learn and grow their riding skills.',
    icon: 'fa-graduation-cap',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    members: [
      { id: '4', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg' },
      { id: '5', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg' },
    ],
  },
  {
    id: '3',
    name: 'Trail Photographers',
    category: 'Capture The Moment',
    description: 'For riders who love to capture and share their mountain biking adventures.',
    icon: 'fa-camera',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    members: [
      { id: '6', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg' },
      { id: '7', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg' },
      { id: '8', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg' },
    ],
  },
];

const recentActivity: ActivityItem[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
    },
    content: 'Just completed the new black diamond trail at Whistler! Amazing flow and technical sections.',
    timeAgo: '2 hours ago',
    likes: 24,
    comments: 8,
  },
  {
    id: '2',
    author: {
      name: 'Mike Thompson',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
    },
    content: 'Looking for riding buddies this weekend at Highland Mountain Bike Park!',
    timeAgo: '5 hours ago',
    likes: 15,
    comments: 12,
  },
  {
    id: '3',
    author: {
      name: 'Alex Rodriguez',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
    },
    content: "New bike day! Can't wait to test it out on the trails this weekend.",
    timeAgo: '8 hours ago',
    likes: 42,
    comments: 16,
  },
];

const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ea8eacf4f0-621c4cee23e8dc24b71a.png"
          alt="mountain biking community gathering"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Bike Community</h1>
            <p className="text-xl">Connect with fellow riders and share your passion</p>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">15,420</div>
              <div className="text-gray-600">Active Riders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">2,845</div>
              <div className="text-gray-600">Trail Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">456</div>
              <div className="text-gray-600">Active Groups</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">1,290</div>
              <div className="text-gray-600">Monthly Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Groups */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Groups</h2>
            <button className="text-emerald-600 hover:text-emerald-700">View All Groups</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-16 h-16 ${group.iconBg} rounded-lg flex items-center justify-center mr-4`}>
                    <i className={`fa-solid ${group.icon} text-2xl ${group.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{group.name}</h3>
                    <p className="text-gray-600">{group.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {group.members.map((member) => (
                      <img
                        key={member.id}
                        src={member.avatar}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        alt="member avatar"
                      />
                    ))}
                    <span className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-sm text-gray-600">
                      +{24 - group.members.length}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-md">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className={`p-6 ${index !== recentActivity.length - 1 ? 'border-b' : ''}`}
              >
                <div className="flex items-start">
                  <img
                    src={activity.author.avatar}
                    className="w-10 h-10 rounded-full mr-4"
                    alt={`${activity.author.name}'s avatar`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold">{activity.author.name}</h3>
                      <span className="text-gray-500 text-sm">{activity.timeAgo}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{activity.content}</p>
                    <div className="flex items-center space-x-4 text-gray-500">
                      <button className="flex items-center space-x-2">
                        <i className="fa-regular fa-heart" />
                        <span>{activity.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2">
                        <i className="fa-regular fa-comment" />
                        <span>{activity.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2">
                        <i className="fa-regular fa-share-from-square" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage; 