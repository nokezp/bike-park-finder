// /* eslint-disable no-console */
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
// import { circle, Icon, latLngBounds, LatLngExpression } from 'leaflet';
// import { BikePark, BikeParksByViewportDocument } from '../../lib/graphql/generated/graphql-operations';
// import { useQuery } from 'urql';
// import MarkerClusterGroup from 'react-leaflet-cluster';
// import './Map.scss';
// import FallbackImage from '../common/FallbackImage';

// // Simple marker icon without image imports
// export const defaultMapIcon = new Icon({
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const selectedIcon = new Icon({
//   iconUrl: 'https://www.wanderfinder.com/wp-content/uploads/leaflet-maps-marker-icons/bicycle_shop.png',
//   iconSize: [32, 37],
//   iconAnchor: [16, 37],
//   popupAnchor: [1, -34],
//   shadowSize: [37, 37],
// });

// interface Viewport {
//   northEast: { latitude: number; longitude: number };
//   southWest: { latitude: number; longitude: number };
// }

// const useBikeParks = (viewport: Viewport, pause: boolean) => {
//   const [bikeParks, setBikeParks] = useState<BikePark[]>([]);
//   const [error] = useState<Error | null>(null);

//   const [{ data, fetching }] = useQuery({
//     query: BikeParksByViewportDocument,
//     variables: { viewport },
//     pause: pause || Object.keys(viewport).length === 0,
//   });

//   useEffect(() => {
//     if (data?.bikeParksByViewport) {
//       setBikeParks(data?.bikeParksByViewport);
//     }
//   }, [data?.bikeParksByViewport]);

//   return { bikeParks, fetching, error };
// };

// const Map: React.FC<{
//   selectedLocation?: BikePark;
//   filteredLocations: BikePark[];
//   setSelectedLocationId: (id: string) => void;
//   setFilteredLocations: (bikeParks: BikePark[]) => void;
//   pause?: boolean;
//   setPause: (pause: boolean) => void;
// }> = ({ selectedLocation, filteredLocations, setSelectedLocationId, setFilteredLocations, pause, setPause }) => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const mapRef = useRef<any>(null);
//   const [viewport, setViewport] = useState({} as Viewport);
//   const [center, setCenter] = useState<LatLngExpression>([49.5, 10]);
//   const [userHasMoved, setUserHasMoved] = useState(false);
//   const [selectedOnMap, setSelectedOnMap] = useState<BikePark>();

//   const { bikeParks, fetching } = useBikeParks(viewport, pause ?? false);

//   const handleMarkerClick = (location: BikePark) => {
//     setUserHasMoved(false);
//     setSelectedLocationId(location.id);
//     setSelectedOnMap(location);
//   };

//   const setView = (pos: [number, number], zoom: number) => {
//     const map = mapRef.current;
//     if (map && !userHasMoved) {
//       const centerTuple = center as [number, number];
//       map.flyTo(
//         {
//           lat: pos?.[0] ?? centerTuple[0],
//           lng: pos?.[1] ?? centerTuple[1],
//         },
//         zoom,
//         pos && { animate: true, duration: 1.5 }
//       );
//     }
//   };

//   useEffect(() => setFilteredLocations(bikeParks), [bikeParks, setFilteredLocations]);

//   useEffect(() => {
//     if (selectedLocation) {
//       setUserHasMoved(false);
//       setSelectedOnMap(selectedLocation);
//     }
//   }, [selectedLocation])

//   useEffect(() => {
//     if (!selectedLocation) {
//       setSelectedOnMap(bikeParks[0]);
//     }
//   }, [bikeParks]);

//   useEffect(() => {
//     if (!selectedOnMap && center) {
//       setView(center as [number, number], 9);
//     }
//   }, [center]);

//   useEffect(() => {
//     if (selectedOnMap) {
//       setView([selectedOnMap.coordinates?.latitude ?? 0, selectedOnMap.coordinates?.longitude ?? 0], 9);
//     }
//   }, [selectedOnMap]); // Empty dependency array means this only runs once on mount

//   const fitBounds = (markers: LatLngExpression[]) => {
//     const map = mapRef.current;
//     if (map) {
//       map.flyToBounds(latLngBounds(markers), {
//         padding: [50, 50],
//         animate: true,
//         duration: 1.5,
//       });
//     }
//   };

//   useEffect(() => {
//     // Only fit bounds if user hasn't manually moved the map
//     if (filteredLocations.length > 0 && filteredLocations.length < 10 && pause && !userHasMoved) {
//       fitBounds(filteredLocations.map(({ coordinates }) => [coordinates?.latitude, coordinates?.longitude]) as LatLngExpression[]);
//       // Reset userHasMoved after fitting bounds
//       setUserHasMoved(false);
//     }
//   }, [filteredLocations, pause, userHasMoved]);


//   useEffect(() => {
//     const map = mapRef?.current;
//     if (map) {
//       map.invalidateSize();
//     }
//   }, [mapRef?.current]);

//   const MapEvents = () => {
//     useMapEvents({
//       moveend: (event) => {
//         const map = event.target;
//         const bounds = map.getBounds();
//         const northEast = bounds.getNorthEast();
//         const southWest = bounds.getSouthWest();
//         setViewport({
//           northEast: { latitude: northEast.lat, longitude: northEast.lng },
//           southWest: { latitude: southWest.lat, longitude: southWest.lng },
//         });
//         setPause(false);
//         setUserHasMoved(true);
//       },
//       zoomend: () => {
//         setPause(false);
//         setUserHasMoved(true);
//       },
//     });
//     return null;
//   };

//   return (
//     <div className="relative w-full h-full z-10">
//       {fetching && <div className="absolute top-4 right-4 z-[1000] bg-white px-4 py-2 rounded-md shadow">Loading...</div>}
//       <MapContainer
//         ref={mapRef}
//         center={center}
//         zoom={6}
//         className="w-full h-full z-10"
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <MarkerClusterGroup
//           chunkedLoading
//           maxClusterRadius={60}
//           spiderfyOnMaxZoom={true}
//           polygonOptions={{
//             fillColor: '#3388ff',
//             color: '#3388ff',
//             weight: 2,
//             opacity: 0.5,
//             fillOpacity: 0.2,
//           }}
//         >
//           {filteredLocations.map((location: BikePark) => (
//             <Marker
//               key={location.id}
//               position={[location?.coordinates?.latitude ?? 0, location?.coordinates?.longitude ?? 0]}
//               icon={selectedOnMap?.id === location.id ? selectedIcon : defaultMapIcon}
//               eventHandlers={{ click: () => handleMarkerClick(location) }}
//             >
//               <Popup closeButton={false} closeOnEscapeKey={true} autoClose={true} autoPan={false}>
//                 <div key={location.id} className="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer">
//                   <div className="flex">
//                     <div className='flex-[30%]'>
//                       <FallbackImage
//                         src={location.imageUrl || "https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-440d7ef9c1fdf0470128.png"}
//                         alt={location.name || "Bike Park"}
//                         className="rounded-lg object-cover"
//                       />
//                     </div>
//                     <div className="flex-[70%] m-4">
//                       <div className="flex justify-between">
//                         <h3 className="font-bold text-ellipsis whitespace-nowrap overflow-hidden max-w-[170px]">{location.name}</h3>
//                         <span className="text-sm">
//                           <i className="fa-solid fa-star text-yellow-400 text-ellipsis whitespace-nowrap overflow-hidden max-w-[170px]"></i>{' '}
//                           {location.rating}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-2">{location.location}</p>
//                       <div className="flex gap-2">
//                         {location.features?.slice(0, 1)?.map((feature, index) => (
//                           <span
//                             key={index}
//                             className={`px-2 py-1 rounded-full text-xs ${feature === 'Flow'
//                               ? 'bg-emerald-100 text-emerald-600'
//                               : feature === 'Skills'
//                                 ? 'bg-purple-100 text-purple-600'
//                                 : 'bg-orange-100 text-orange-600'
//                               }`}
//                           >
//                             {feature}
//                           </span>
//                         ))}
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs ${location.difficulty === 'beginner'
//                             ? 'bg-yellow-100 text-yellow-600'
//                             : location.difficulty === 'intermediate'
//                               ? 'bg-blue-100 text-blue-600'
//                               : 'bg-red-100 text-red-600'
//                             }`}
//                         >
//                           {location.difficulty?.[0]?.toUpperCase()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}

//           <MapEvents />
//         </MarkerClusterGroup>

//       </MapContainer>
//     </div>
//   );
// };

// export default Map;
