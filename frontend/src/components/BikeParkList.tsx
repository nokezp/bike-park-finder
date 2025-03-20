import React, { useState } from 'react';
import { useBikeParks } from '../hooks/useBikeParks';

export function BikeParkList() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    location: '',
    name: '',
    difficulty: '',
  });

  const { bikeParks, totalCount, currentPage, totalPages, hasNextPage, loading, error, refetch } = useBikeParks(
    filter,
    { page, limit: 10 }
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
    setPage(1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filter.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Filter by location"
          value={filter.location}
          onChange={handleFilterChange}
        />
        <select name="difficulty" value={filter.difficulty} onChange={handleFilterChange}>
          <option value="">All difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="bike-parks">
        {bikeParks.map(park => (
          <div key={park.id} className="bike-park-card">
            <h3>{park.name}</h3>
            <p>{park.description}</p>
            <p>Location: {park.location}</p>
            <p>Difficulty: {park.difficulty}</p>
            <p>Status: {park.status}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>

      <div className="total-count">
        Total bike parks: {totalCount}
      </div>
    </div>
  );
} 