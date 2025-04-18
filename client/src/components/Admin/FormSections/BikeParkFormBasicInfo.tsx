/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import { capitalize } from 'lodash';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { bikeParkStatus, FormValues } from '../../../lib/helpers/common-helper';
import { selectedIcon } from '../../Map/Map';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { searchAddress } from '../../../lib/helpers/mapbox-search';

export interface BikeParkFormProp {
  form: UseFormReturn<FormValues, any, FormValues>
}

const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const BikeParkFormBasicInfo: React.FC<BikeParkFormProp> = ({ form }) => {
  const mapRef = useRef<any>(null);

  const [tempPosition, setTempPosition] = useState<any>(null);
  const [confirmedPosition, setConfirmedPosition] = useState(null);
  const [visibleDays, setVisibleDays] = useState<string[]>([]);
  const [dayStatus, setDayStatus] = useState<Record<string, { isOpen: boolean }>>({});

  const location = useWatch({ control: form.control, name: "location" });
  const coordinates = useWatch({ control: form.control, name: "coordinates" });

  const [searchQuery, setSearchQuery] = useState(location ?? "");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSameAsPrevious = (day: string, checked: boolean) => {
    if (!checked || visibleDays.length <= 1) return;

    const currentIndex = visibleDays.indexOf(day);
    if (currentIndex <= 0) return;

    const previousDay = visibleDays[currentIndex - 1];
    setDayStatus(prev => ({ ...prev, [day]: { ...prev[previousDay] } }));
    const previousDayValue = form.watch(`openingHours.${previousDay}`);

    // if (previousDayValue?.from && previousDayValue?.to) {
    if (dayStatus[previousDay]?.isOpen) {
      updateFormDataOpeningHours(day, previousDayValue?.from ?? "09:00", previousDayValue?.to ?? "17:00");
    } else {
      updateFormDataOpeningHours(day, null, null);
    }
  };

  const handleDayStatusChange = (day: string, isOpen: boolean) => {
    setDayStatus(prev => ({ ...prev, [day]: { isOpen } }));

    const currentIndex = visibleDays.indexOf(day);
    if (currentIndex <= 0) return;
    const currentDay = visibleDays[currentIndex - 1];
    const currentDayValue = form.watch(`openingHours.${currentDay}`);

    if (!isOpen) {
      updateFormDataOpeningHours(day, null, null);
    } else {
      updateFormDataOpeningHours(day, currentDayValue?.from ?? "09:00", currentDayValue?.to ?? "17:00");
    }
  };

  const updateFormDataOpeningHours = (day: string, fromTime: string | null, toTime: string | null) => {
    if (fromTime === null || toTime === null) {
      form.setValue(`openingHours.${day}.from`, undefined);
      form.setValue(`openingHours.${day}.to`, undefined);
    } else {
      form.setValue(`openingHours.${day}.from`, fromTime);
      form.setValue(`openingHours.${day}.to`, toTime);
    }
  };

  function RightClickHandler() {
    useMapEvents({
      contextmenu(e: any) {
        setTempPosition(e.latlng);
      },
    });
    return null;
  }

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", (e: any) => {
        const latlng = e.geocode.center;
        form.setValue("coordinates.latitude", e.latlng.lat);
        form.setValue("coordinates.longitude", e.latlng.lng);
        map.setView(latlng, 13);
      })
      .addTo(map);
  }, [form]);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return
    };

    searchAddress(searchQuery, (results) => {
      console.log(results);
      if (results && results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lng = parseFloat(results[0].lon);
        const newPos = { lat, lng };

        form.setValue("coordinates.latitude", lat)
        form.setValue("coordinates.longitude", lng)
        form.setValue("location", results[0].display_name || results[0].name)

        if (mapRef.current) {
          mapRef.current.setView(newPos, 13);
          mapRef.current.flyTo(
            { lat, lng },
            13,
            { animate: true, duration: 1.5 }
          );
        }
      }
    });
  };

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    searchAddress(query, (results) => {
      if (results && results.length > 0) {
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSuggestions(searchQuery);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);


  const handleSuggestionSelect = (suggestion: any) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    const newPos = { lat, lng };

    setSearchQuery(suggestion.display_name || suggestion.name);
    setSuggestions([]);

    form.setValue("coordinates.latitude", lat);
    form.setValue("coordinates.longitude", lng);
    form.setValue("location", suggestion.display_name || suggestion.name);

    if (mapRef.current) {
      mapRef.current.setView(newPos, 13);
      mapRef.current.flyTo(newPos, 13, { animate: true, duration: 1.5 });
    }
  };

  return (
    <div id="basic-info" className="space-y-6">
      <h2 className="text-xl font-bold">Basic Information</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name*</label>
        <input
          type="text"
          {...form.register('name', { required: 'Name is required' })}
          placeholder="Enter park name"
          required
          className={`w-full px-3 py-2 border rounded-md ${form.formState.errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {form.formState.errors.name && <span style={{ color: 'red' }}>{form.formState.errors.name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          {...form.register('description')}
          className="w-full px-3 py-2 border rounded-md h-32"
          placeholder="Describe your bike park"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <select
          {...form.register('status')}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select status</option>
          {bikeParkStatus.map(s => (
            <option key={s.value} value={s.value}>{s.status}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location*</label>
        <div className='flex flex-col mb-2'>
          <div className='relative flex row gap-[10px]'>
            <input
              type="text"
              {...form.register('location', { required: 'Location is required' })}
              value={searchQuery}
              placeholder="Search for a city"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
              className={`w-full px-3 py-2 border rounded-md ${form.formState.errors.location ? 'border-red-500' : 'border-gray-300'}`}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-[100] bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto top-[45px]">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    {suggestion.display_name || suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {form.formState.errors.location && <span style={{ color: 'red' }}>{form.formState.errors.location.message}</span>}
        </div>
        <div className="border-2 rounded-lg text-center">
          <MapContainer
            ref={mapRef}
            center={[coordinates?.latitude, coordinates?.longitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%", zIndex: 10 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RightClickHandler />

            {confirmedPosition && (
              <Marker position={confirmedPosition} icon={selectedIcon}>
                <Popup>Selected Location</Popup>
              </Marker>
            )}

            {tempPosition && (
              <Popup
                position={tempPosition}
                closeButton={true}
                closeOnEscapeKey={true}
                onClose={() => setTempPosition(null)}
              >
                <div className='p-2'>
                  <p>Select this location?</p>
                  <div className='flex gap-2 justify-end'>
                    <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                      onClick={() => setTempPosition(null)}>Cancel</button>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                      onClick={() => {
                        setConfirmedPosition(tempPosition);
                        setTempPosition(null);
                        form.setValue("coordinates.latitude", tempPosition.lat)
                        form.setValue("coordinates.longitude", tempPosition.lng)
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </Popup>
            )}

            {coordinates?.latitude && (
              <Marker position={{ lat: coordinates?.latitude, lng: coordinates?.longitude }}>
                <Popup>
                  Lat: {coordinates?.latitude.toFixed(7)}, Lng: {coordinates?.latitude.toFixed(7)}
                </Popup>
              </Marker>
            )}
          </MapContainer>

          {location && (<div>Current location: {location}</div>)}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
        {visibleDays.map((day, index) => {
          const dayValue = form.watch(`openingHours.${day}`);
          return (
            <div key={day} id={`${day}-hours`} className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{capitalize(day)}</span>
                <div className="flex items-center gap-4">
                  {index > 0 && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        // checked={true}
                        className="mr-2"
                        onChange={(e) => handleSameAsPrevious(day, e.target.checked)}
                      />
                      <span className="text-sm">Same as previous day</span>
                    </label>
                  )}
                  <div className="flex items-center gap-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${day}-status`}
                        className="mr-2"
                        checked={dayStatus[day] ? !dayStatus[day].isOpen : false}
                        onChange={() => handleDayStatusChange(day, false)}
                      />
                      <span className="text-sm">Closed</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`${day}-status`}
                        className="mr-2"
                        checked={dayStatus[day] ? dayStatus[day].isOpen : true}
                        onChange={() => handleDayStatusChange(day, true)}
                      />
                      <span className="text-sm">Open</span>
                    </label>
                  </div>
                </div>
              </div>
              {dayStatus[day]?.isOpen && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="time"
                        {...form.register(`openingHours.${day}.from`)}
                        className={`w-full px-3 py-2 border rounded-md ${form.formState?.errors?.openingHours?.[day]?.from
                          ? 'border-red-500' : 'border-gray-300'}`}
                      />
                    </div>
                    <span>to</span>
                    <div className="flex-1">
                      <input
                        type="time"
                        {...form.register(`openingHours.${day}.to`, {
                          required: 'To time is required',
                          validate: value => {
                            if (dayValue?.from && value && dayValue?.from >= value) {
                              return 'To time must be after From time';
                            }
                            return true;
                          },
                        })}
                        className={`w-full px-3 py-2 border rounded-md ${form.formState?.errors?.openingHours?.[day]?.to
                          ? 'border-red-500' : 'border-gray-300'}`}
                      />
                    </div>
                  </div>
                  {form.formState?.errors?.openingHours?.[day]?.to && <span style={{ color: 'red' }}>
                    {form.formState?.errors?.openingHours?.[day]?.to?.message}
                  </span>}
                </>
              )}
            </div>
          )
        })}

        {visibleDays.length < allDays.length && (
          <div className="space-y-3">
            <button
              type="button"
              className="text-emerald-600 flex items-center"
              onClick={() => {
                const currentIndex = allDays.indexOf(visibleDays[visibleDays.length - 1]);
                if (currentIndex < allDays.length - 1) {
                  const nextDay = allDays[currentIndex + 1];
                  setVisibleDays([...visibleDays, nextDay]);
                  setDayStatus(prev => ({ ...prev, [nextDay]: { isOpen: true } }));
                  updateFormDataOpeningHours(nextDay, '09:00', '17:00');
                }
              }}
            >
              <i className="fa-solid fa-plus mr-2"></i>Add More Days
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contact</label>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Email</span>
            <div className="flex items-center gap-4">
              <input
                type="email"
                {...form.register('contact.email')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="contact@bikepark.com"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Phone</span>
            <div className="flex items-center gap-4">
              <input
                type="phone"
                {...form.register('contact.phone')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="+1 (123) 456-7890"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Website</span>
            <div className="flex items-center gap-4">
              <input
                type="text"
                {...form.register('contact.website')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="www.bikepark.com"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Social media</label>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Facebook</span>
            <div className="flex items-center gap-4">
              <input
                type="text"
                {...form.register('socialMedia.facebook')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Facebook URL"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Instagram</span>
            <div className="flex items-center gap-4">
              <input
                type="text"
                {...form.register('socialMedia.instagram')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Instagram URL"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Youtube</span>
            <div className="flex items-center gap-4">
              <input
                type="text"
                {...form.register('socialMedia.youtube')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Youtube URL"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Strava</span>
            <div className="flex items-center gap-4">
              <input
                type="text"
                {...form.register('socialMedia.strava')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter Strava URL"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeParkFormBasicInfo;
