import React from 'react';
import EventCard, { EventCardProps } from './EventCard';

const mockEvents: (EventCardProps & { id: string })[] = [
  {
    id: '1',
    type: 'Competition',
    date: 'Jun 15, 2025',
    title: 'Downhill Championship',
    location: 'Whistler Mountain Bike Park',
    registeredCount: 156
  },
  {
    id: '2',
    type: 'Workshop',
    date: 'Jun 20, 2025',
    title: 'Beginner Skills Clinic',
    location: 'Highland Mountain Bike Park',
    registeredCount: 24
  },
  {
    id: '3',
    type: 'Festival',
    date: 'Jul 1, 2025',
    title: 'Summer Bike Festival',
    location: 'Queenstown Bike Park',
    registeredCount: 312
  }
];

const Events: React.FC = () => {
  const title = 'Upcoming Events';
  const handleEventDetails = () => {
    // console.log('Viewing event details:', eventId);
    // Add event details logic here
  };
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              onViewDetails={() => handleEventDetails?.()}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events; 