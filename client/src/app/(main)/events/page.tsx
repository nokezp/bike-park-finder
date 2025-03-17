'use client';

import { useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: 'competition' | 'workshop' | 'meetup';
  parkId?: string;
}

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<Event['type'] | 'all'>('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEvents([
          {
            id: '1',
            title: 'Downhill Championship 2024',
            date: '2024-06-15',
            location: 'Mountain Creek Bike Park',
            description: 'Annual downhill mountain biking championship featuring top riders from around the world.',
            type: 'competition'
          },
          {
            id: '2',
            title: 'Beginner Skills Workshop',
            date: '2024-05-20',
            location: 'Thunder Mountain Bike Park',
            description: 'Learn essential mountain biking skills from professional instructors.',
            type: 'workshop'
          },
          {
            id: '3',
            title: 'Trail Maintenance Day',
            date: '2024-04-10',
            location: 'Highland Mountain Bike Park',
            description: 'Join us for a day of trail maintenance and community building.',
            type: 'meetup'
          }
        ]);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = selectedType === 'all'
    ? events
    : events.filter(event => event.type === selectedType);

  if (loading) return <div data-testid="loading">Loading events...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;

  return (
    <main className="min-h-screen py-12" data-testid="events-page">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Events</h1>

        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg ${
                selectedType === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-testid="filter-all"
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedType('competition')}
              className={`px-4 py-2 rounded-lg ${
                selectedType === 'competition'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-testid="filter-competitions"
            >
              Competitions
            </button>
            <button
              onClick={() => setSelectedType('workshop')}
              className={`px-4 py-2 rounded-lg ${
                selectedType === 'workshop'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-testid="filter-workshops"
            >
              Workshops
            </button>
            <button
              onClick={() => setSelectedType('meetup')}
              className={`px-4 py-2 rounded-lg ${
                selectedType === 'meetup'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              data-testid="filter-meetups"
            >
              Meetups
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              data-testid={`event-card-${event.id}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    event.type === 'competition'
                      ? 'bg-red-100 text-red-800'
                      : event.type === 'workshop'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📅</span>
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    {event.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-600" data-testid="no-events">
            No events found for the selected category.
          </div>
        )}
      </div>
    </main>
  );
} 