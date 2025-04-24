import React from "react";
import { Event } from "../../lib/graphql/generated/graphql-operations";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const EventCard: React.FC<{
  event: Event
}> = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div
      key={event.id}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="relative h-48">
        <img className="w-full h-full object-cover" src={event.imageUrl} alt={event.title} />
        {event.featured && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-sm ${event.category === 'CHAMPIONSHIP' ? 'bg-blue-100 text-blue-600' :
              event.category === 'WORKSHOP' ? 'bg-green-100 text-green-600' :
                event.category === 'FESTIVAL' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
            }`}>
            {event.category.charAt(0) + event.category.slice(1).toLowerCase().replace('_', ' ')}
          </span>
          <div className="text-gray-600">
            <i className="fa-regular fa-calendar mr-2"></i>
            {moment(event.date).format('MMM D, YYYY')}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <i className="fa-solid fa-location-dot mr-2"></i>
          {event.location}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-6 h-6 rounded-full" />
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-6 h-6 rounded-full -ml-2" />
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-6 h-6 rounded-full -ml-2" />
            <span className="text-gray-600 ml-2">+{event.attendeeCount} going</span>
          </div>
          <span className="text-emerald-600 font-bold">${event.price}</span>
        </div>
        <button className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
