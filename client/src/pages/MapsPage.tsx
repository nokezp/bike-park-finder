import { useMemo, useState } from 'react';
import Map from './Map';
import { BikePark } from '../lib/graphql/generated/graphql-operations';
import MapLeftMenu from './MapLeftMenu';

export enum Amenity {
  LIFT = 'Lift Access',
  RENTAL = 'Rental',
  FOOD = 'Food',
}

export enum SortOption {
  RATING = 'Rating',
  DISTANCE = 'Distance',
}

export interface MapMarker {
  coordinates: [number, number];
  title: string;
  description: string;
}

export function MapsPage() {
  const [filteredLocations, setFilteredLocations] = useState<BikePark[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>();
  const [pause, setPause] = useState<boolean>(false);
  const [minimizeLeftMenu, setMinimizeLeftMenu] = useState<boolean>(false);


  const selectedLocation = useMemo(
    () => filteredLocations?.find(({ id }) => id === selectedLocationId),
    [filteredLocations, selectedLocationId],
  );

  return (
    <section id="search-map-section" className="mx-auto px-4 py-8">
      <div className="flex">
        {/* Search Panel */}
        <MapLeftMenu
          selectedLocationId={selectedLocationId}
          filteredLocations={filteredLocations}
          setFilteredLocations={setFilteredLocations}
          setSelectedLocationId={setSelectedLocationId}
          setPause={setPause}
          minimizeLeftMenu={minimizeLeftMenu}
          setMinimizeLeftMenu={setMinimizeLeftMenu}
        />

        {/* Map Area */}
        <div className="w-full z-10" style={{ minHeight: "calc(100vh - 120px)"}}>
          <div className="bg-white rounded-lg shadow-lg h-[100%]">
            <Map
              selectedLocation={selectedLocation}
              filteredLocations={filteredLocations}
              setFilteredLocations={setFilteredLocations}
              setSelectedLocationId={setSelectedLocationId}
              pause={pause}
              setPause={setPause}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
