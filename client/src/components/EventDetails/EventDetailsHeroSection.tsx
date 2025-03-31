import React from "react";
import { Event } from "../../lib/graphql/generated/graphql-operations";
import moment from "moment";

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'CHAMPIONSHIP':
      return 'bg-blue-500';
    case 'WORKSHOP':
      return 'bg-green-500';
    case 'FESTIVAL':
      return 'bg-purple-500';
    default:
      return 'bg-orange-500';
  }
};

export const formatTime = (time: string) => {
  return moment(time, 'HH:mm').format('HH:mm');
};

const EventDetailsHeroSection: React.FC<{
  event: Event
}> = ({ event }) => {

  return (
    <section className="relative h-[500px]">
      <img className="absolute inset-0 w-full h-full object-cover" src={event.imageUrl} alt={event.title} />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 relative h-full flex items-end pb-12">
        <div className="text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className={`${getCategoryColor(event.category)} px-3 py-1 rounded-full text-sm`}>
              {event.category.charAt(0) + event.category.slice(1).toLowerCase().replace('_', ' ')}
            </span>
            <span className="text-sm">
              <i className="fa-regular fa-calendar mr-2"></i>
              {moment(event.date).format('MMM D, YYYY')}
            </span>
            <span className="text-sm">
              <i className="fa-regular fa-clock mr-2"></i>
              {formatTime(event.startTime)} - {formatTime(event.endTime)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <i className="fa-solid fa-location-dot mr-2"></i>
              {event.venue?.name}, {event.location}
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-users mr-2"></i>
              {event.capacity}+ Participants
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsHeroSection;
