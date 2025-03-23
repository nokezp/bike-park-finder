import { useCallback, useEffect, useMemo, useState } from 'react';
import { BikePark, BikeParkFilter, GetBikeParksDocument } from '../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';

export enum Difficulty {
  ALL = 'All Levels',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert',
}

export enum Feature {
  ALL = 'All Features',
  FLOW = 'Flow Trails',
  JUMP = 'Jump Lines',
  TECHNICAL = 'Technical',
  SKILLS = 'Skills',
}

const MapLeftMenu: React.FC<{
  selectedLocationId?: string;
  filteredLocations: BikePark[];
  setFilteredLocations: (locations: BikePark[]) => void;
  setSelectedLocationId: (id: string) => void;
  setPause: (pause: boolean) => void;
}> = ({ selectedLocationId, filteredLocations, setFilteredLocations, setSelectedLocationId, setPause }) => {
  const [filter, setFilter] = useState<BikeParkFilter>({
    location: '',
    coordinates: null,
    difficulty: 'All',
  });
  const [tempFilter, setTempFilter] = useState<BikeParkFilter>({
    location: '',
    coordinates: null,
    difficulty: 'All',
  });
  const [{ data, fetching }] = useQuery({
    query: GetBikeParksDocument,
    variables: {
      filter: filter,
      pagination: { page: 1, limit: 100 },
    },
    pause: !filter.location,
  });

  const bikeParks = useMemo(
    () => (filteredLocations?.length ? filteredLocations : data?.bikeParks?.bikeParks || []),
    [filteredLocations, data?.bikeParks?.bikeParks],
  );

  useEffect(() => setFilteredLocations(bikeParks), [bikeParks]);

  // Execute search function
  const executeSearch = async () => {
    setFilteredLocations([]);
    setSelectedLocationId('');
    setFilter(tempFilter);
    setPause(true);
  };

  // Keydown handler for search input to support Enter key
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const setRef = useCallback(
    (node: any) => {
      if (node && selectedLocationId === node.dataset.index) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        node.focus();
      }
    },
    [selectedLocationId],
  );

  return (
    <div className="bg-white shadow-lg" style={{ height: 'calc(100vh - 120px)' }}>
      <div className="p-6 w-[372px]">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="relative">
              <i className={`fa-solid fa-location-dot absolute left-3 top-3 ${fetching ? 'text-primary' : 'text-gray-400'}`}></i>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200"
                value={tempFilter.location || ''}
                onChange={(e: any) =>
                  setTempFilter({
                    ...tempFilter,
                    location: e.target.value,
                  })
                }
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-200"
              value={tempFilter.difficulty || ''}
              onChange={(e) => setTempFilter((prev) => ({ ...prev, difficulty: e.target.value }))}
            >
              {Object.values(Difficulty).map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
						<select
							className="w-full px-4 py-2 rounded-md border border-gray-200"
							value={filter.features?.[0] || Feature.ALL}
							onChange={(e) => setFilter(prev => ({ ...prev, features: e.target.value as Feature }))}>
								{Object.values(Feature).map(feature => (
									<option key={feature} value={feature}>{feature}</option>
							))}
						</select>
					</div> */}
          {/* <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
						<select
							className="w-full px-4 py-2 rounded-md border border-gray-200"
							value={filter.sortBy}
							onChange={(e) => handleTempFilterChange('sortBy', e.target.value as SortOption)}
						>
							{Object.values(SortOption).map(option => (
								<option key={option} value={option}>{option}</option>
							))}
						</select>
					</div> */}

          {/* Search Button */}
          <button
            onClick={executeSearch}
            disabled={fetching}
            type="submit"
            className="w-full bg-emerald-600 text-white px-6 py-2 rounded-md 
										hover:bg-emerald-700 transform hover:scale-105
										transition-all duration-200 focus:outline-none 
										focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {fetching ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <i className="fa-solid fa-search mr-2"></i>
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="p-6 pt-0 space-y-4">
        {bikeParks?.length > 0 && (
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{bikeParks.length} Parks Found</h2>
          </div>
        )}

        {/* Compact Park Cards */}
        <div id="compact-results" className="space-y-3 max-h-[570px] overflow-auto rounded-lg">
          {bikeParks?.map((park: BikePark) => (
            <div
              key={park.id}
              data-index={park.id}
              ref={setRef}
              className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer border-[1px] border-solid ${
                park.id === selectedLocationId ? 'border-green-600' : ''
              }`}
              onClick={() => setSelectedLocationId(park.id)}
            >
              <div className="flex gap-4">
                {park.imageUrl ? (
                  <img src={park.imageUrl} className="w-20 h-20 rounded-lg object-cover" alt={park.name} />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                    <i className="fa-solid fa-mountain text-gray-400 text-2x1"></i>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">{park.name}</h3>
                    <span className="text-sm">
                      <i className="fa-solid fa-star text-yellow-400"></i> {park.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{park.location}</p>
                  <div className="flex gap-2">
                    {park.features?.slice(0, 1)?.map((feature, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs ${
                          feature === 'Flow'
                            ? 'bg-emerald-100 text-emerald-600'
                            : feature === 'Skills'
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        park.difficulty === 'Beginner'
                          ? 'bg-yellow-100 text-yellow-600'
                          : park.difficulty === 'Intermediate'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {park.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load more button
			{hasNextPage && (
				<button 
					onClick={loadMoreParks}
					disabled={isLoadingParks}
					className="w-full mt-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
				>
					{isLoadingParks ? 'Loading...' : 'Load More'}
				</button>
			)} */}
    </div>
  );
};

export default MapLeftMenu;
