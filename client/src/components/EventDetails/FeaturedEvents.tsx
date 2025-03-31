import React from "react";
import { Event, EventFilter, EventPeriod } from "../../lib/graphql/generated/graphql-operations";
import EventCard from "./EventCard";

const FeaturedEvents: React.FC<{
  events: Event[] | undefined,
  filter: EventFilter,
  setFilter: (f: EventFilter) => void
}> = ({ events, filter, setFilter }) => {

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Featured Events</h2>
          <div className="flex flex-wrap gap-2">
            <button className={`px-4 py-2 rounded-full hover:bg-gray-200 ${filter.period === EventPeriod.All ? 'bg-emerald-100 text-emerald-600' : ''}`}
              onClick={() => setFilter({ ...filter, period: EventPeriod.All })}>All Events</button>
            <button className={`px-4 py-2 rounded-full hover:bg-gray-200 ${filter.period === EventPeriod.ThisWeek ? 'bg-emerald-100 text-emerald-600' : ''}`}
              onClick={() => setFilter({ ...filter, period: EventPeriod.ThisWeek })}>This Week</button>
            <button className={`px-4 py-2 rounded-full hover:bg-gray-200 ${filter.period === EventPeriod.ThisMonth ? 'bg-emerald-100 text-emerald-600' : ''}`}
              onClick={() => setFilter({ ...filter, period: EventPeriod.ThisMonth })}>This Month</button>
            <button className={`px-4 py-2 rounded-full hover:bg-gray-200 ${filter.period === EventPeriod.NextMonth ? 'bg-emerald-100 text-emerald-600' : ''}`}
              onClick={() => setFilter({ ...filter, period: EventPeriod.NextMonth })}>Next Month</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {events?.map((event) => <EventCard key={event.id} event={event} />)}
        </div>

        {/* TODO: Fix this */}
        {/* <div className="text-center mt-8">
          <button className="bg-white border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-md hover:bg-emerald-50">
            Load More Events
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturedEvents;
