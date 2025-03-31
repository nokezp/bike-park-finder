import React, { useState } from 'react';
import { useQuery } from 'urql';
import { EventFilter, EventsQuery, EventsDocument, EventCategory, EventPeriod } from '../../lib/graphql/generated/graphql-operations';
import EventHeader from '../../components/EventDetails/EventHeader';
import EventCategories from '../../components/EventDetails/EventCategories';
import FeaturedEvents from '../../components/EventDetails/FeaturedEvents';
import NewsSubscribeSection from '../../components/EventDetails/NewsSubscribeSection';


const EventsPage: React.FC = () => {

  const [filter, setFilter] = useState<EventFilter>({
    title: undefined,
    category: undefined,
    location: undefined,
    period: EventPeriod.All
  });

  const [{ data, fetching }] = useQuery<EventsQuery>({
    query: EventsDocument,
    variables: { filter }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events: any[] = data?.events ?? [];

  if (fetching) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <EventHeader filter={filter} setFilter={setFilter} />
      <EventCategories onCategorySelect={(name: EventCategory) => setFilter({ ...filter, category: name })} />
      <FeaturedEvents events={events} filter={filter} setFilter={setFilter} />
      {/* TODO: Fix this */}
      <NewsSubscribeSection />
    </div>
  );
};

export default EventsPage;
