import React, { useState, useEffect } from 'react';
import BikeParkCard from './BikeParkCard';
import { useQuery } from 'urql';
import { BikePark, BikeParkFilter, BikeParksDocument, BikeParksQuery } from '../../lib/graphql/generated/graphql-operations';
import { useInView } from 'react-intersection-observer';
import BikeParkListItem from './BikeParkListItem';
import { unionBy } from 'lodash';

enum View {
  Grid,
  List,
}

const ITEMS_PER_PAGE = 15;

const ResultsGrid: React.FC<{ searchQuery: BikeParkFilter | undefined, setSearchQuery: (searchQuery: BikeParkFilter) => void }> = ({
  searchQuery,
  setSearchQuery
}) => {
  const [view, setView] = useState(View.Grid);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [allBikeParks, setAllBikeParks] = useState<BikePark[]>([]);

  const [{ data, fetching }] = useQuery<BikeParksQuery>({
    query: BikeParksDocument,
    variables: {
      filter: {
        ...searchQuery,
        skip,
        take: ITEMS_PER_PAGE,
      },
    },
  });

  useEffect(() => {
    if (data?.bikeParks) {
      if (data.bikeParks.bikeParks.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
      if (skip === 0) {
        setAllBikeParks(data.bikeParks.bikeParks ?? []);
      } else {
        setAllBikeParks((prev) => unionBy([...prev, ...data.bikeParks.bikeParks], ({ id }) => id));
      }
    }
  }, [data, skip]);

  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    setAllBikeParks([]);
  }, [searchQuery]);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && !fetching && hasMore) {
      setSkip((prev) => prev + ITEMS_PER_PAGE);
    }
  }, [inView, fetching, hasMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Found {data?.bikeParks.totalCount || 0} bike parks</h2>
          <div className="flex items-center space-x-4">
            <select
              onChange={e => {
                searchQuery = {
                  ...searchQuery,
                  sortBy: e.target.value
                }
                setSearchQuery(searchQuery);
              }}
              className="px-4 py-2 rounded-md border border-gray-200 text-gray-800">
              <option value="rating">Sort by: Popular</option>
              {/* <option>Rating</option> */}
              <option value="distance">Distance</option>
            </select>
            <div className="flex space-x-2">
              <button
                className={`p-2 rounded-md ${view === View.Grid ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:bg-gray-100'}`}
                onClick={() => setView(View.Grid)}
              >
                <i className="fa-solid fa-table-cells-large"></i>
              </button>
              <button
                className={`p-2 rounded-md ${view === View.List ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:bg-gray-100'}`}
                onClick={() => setView(View.List)}
              >
                <i className="fa-solid fa-list"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {fetching && allBikeParks?.length === 0 && (
        <div className="col-span-full flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
        </div>
      )}

      <div className={`${view === View.Grid ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
        {allBikeParks.map((park) =>
          view === View.List ? <BikeParkListItem key={park.id} bikePark={park} /> : <BikeParkCard key={park.id} bikePark={park} />,
        )}

        {fetching && allBikeParks?.length > 0 && (
          <div className="col-span-full flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
          </div>
        )}
        {!fetching && hasMore && <div ref={ref} className="col-span-full h-8" /> /* Invisible scroll trigger */}
      </div>
    </div>
  );
};

export default ResultsGrid;
