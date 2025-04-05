import { useMemo, useState } from 'react';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';
import Map from '../../components/Map/Map';
import LeftMenu from '../../components/Map/LeftMenu';

export interface ViewportView {
  northEast: { latitude: number; longitude: number };
  southWest: { latitude: number; longitude: number };
}

export function MapsPage() {
  const [filteredLocations, setFilteredLocations] = useState<BikePark[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string>();
  const [viewportChangeView, onViewportChangeView] = useState<ViewportView>();

  const selectedLocation = useMemo(() => filteredLocations?.find(({ id }) => id === selectedLocationId),
    [filteredLocations, selectedLocationId]);

  // useEffect(() => {
  //   if (selectedLocation && filteredLocations) {
  //     const abc = filteredLocations.filter(({ coordinates }) => {
  //       if (coordinates && viewportChangeView) {
  //         return coordinates.latitude >= viewportChangeView.southWest.latitude && coordinates.latitude <= viewportChangeView.northEast.latitude &&
  //           coordinates.longitude >= viewportChangeView.southWest.longitude && coordinates.longitude <= viewportChangeView.northEast.longitude;
  //       }
  //       return false;
  //     });
  //     console.log("abc", abc);
  //     if (abc.length > 0) {
  //       setFilteredLocations(abc);
  //     }
  //   }
  // }, [viewportChangeView]);

  return (
    <section id="search-map-section" className="mx-auto px-4 py-8">
      <div className="flex">
        <LeftMenu
          setFilteredLocationId={setFilteredLocations}
          setSelectedLocationId={setSelectedLocationId}
          selectedLocationId={selectedLocationId}
        />

        <div className="w-full z-10" style={{ minHeight: "calc(100vh - 120px)" }}>
          <div className="bg-white rounded-lg shadow-lg h-[100%]">
            <Map
              selectedLocation={selectedLocation}
              filteredLocations={filteredLocations}
              setSelectedLocationId={setSelectedLocationId}
              setFilteredLocations={setFilteredLocations}
              onViewportChangeView={onViewportChangeView}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
