import React from 'react';
import CheckIn from './CheckIn';
import Review from './Review';

export interface CommunityProps {
  title?: string;
}

const mockCheckIns = [
  {
    avatar: '/avatars/user1.jpg',
    name: 'Alex Thompson',
    location: 'Whistler Bike Park',
    timeAgo: '2 hours ago'
  },
  {
    avatar: '/avatars/user2.jpg',
    name: 'Sarah Chen',
    location: 'Highland Mountain',
    timeAgo: '5 hours ago'
  },
  {
    avatar: '/avatars/user3.jpg',
    name: 'Mike Rodriguez',
    location: 'Angel Fire Bike Park',
    timeAgo: '1 day ago'
  }
];

const mockReviews = [
  {
    avatar: '/avatars/user4.jpg',
    name: 'Emma Wilson',
    rating: 5,
    comment: 'Amazing trails for all skill levels. The staff is super friendly and helpful!'
  },
  {
    avatar: '/avatars/user5.jpg',
    name: 'David Park',
    rating: 4,
    comment: 'Great variety of trails. Some maintenance needed on the blue runs but overall excellent experience.'
  },
  {
    avatar: '/avatars/user6.jpg',
    name: 'Lisa Martinez',
    rating: 5,
    comment: "Best bike park I've visited this year. The new jump line is incredible!"
  }
];

const Community: React.FC<CommunityProps> = ({ title = 'Community Activity' }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Check-ins Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Check-ins</h3>
            <div className="space-y-4">
              {mockCheckIns.map((checkIn, index) => (
                <CheckIn key={index} {...checkIn} />
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Latest Reviews</h3>
            <div className="space-y-4">
              {mockReviews.map((review, index) => (
                <Review key={index} {...review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community; 