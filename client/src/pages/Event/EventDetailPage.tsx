import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { EventDocument } from '../../lib/graphql/generated/graphql-operations';
import EventDetailsHeroSection from '../../components/EventDetails/EventDetailsHeroSection';
import EventDetailsSection from '../../components/EventDetails/EventDetailsSection';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ data, fetching }] = useQuery({
    query: EventDocument,
    variables: { id },
  });

  if (fetching) return <div>Loading...</div>;
  if (!data?.event) return <div>Event not found</div>;

  const event = data.event;

  return (
    <div className="min-h-screen bg-slate-50">
      <EventDetailsHeroSection event={event} />
      <EventDetailsSection event={event} />
    </div>
  );
};

export default EventDetailPage;
