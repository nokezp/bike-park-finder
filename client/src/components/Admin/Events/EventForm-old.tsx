/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Event, EventDocument, EventQuery, MeDocument, MeQuery, DeleteEventMutation, UpdateEventMutation, CreateEventMutation, CreateEventDocument, UpdateEventDocument, DeleteEventDocument, UpdateEventInput, SearchBikeParkDocument } from '../../../lib/graphql/generated/graphql-operations';
import { useMutation, useQuery } from 'urql';
import { useForm, useWatch } from 'react-hook-form';
import { CreateBikeParkFormValues, CreateEventFormValues, eventCategories } from '../../../lib/helpers/common-helper';
import { query } from '@urql/exchange-graphcache';
import { searchAddress } from '../../../lib/helpers/mapbox-search';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { selectedIcon } from '../../Map/Map';

const EventFormOld: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const mapRef = useRef<any>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);


  const [tempPosition, setTempPosition] = useState<any>(null);
  const [confirmedPosition, setConfirmedPosition] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0
  });

  const [showCreatedModal, setShowCreatedModal] = useState<Event>();
  const [showUpdatedModal, setShowUpdateddModal] = useState<Event>();
  const [showDeletedModal, setShowDeletedModal] = useState<Event>();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const [{ data, fetching, stale }] = useQuery<EventQuery>({
    query: EventDocument,
    variables: { id },
    pause: !id
  });

  // const [{ data: searchLocations, fetching: searchLocationsFetching }] = useQuery({
  //   query: SearchBikeParkDocument,
  //   variables: {
  //     query: searchQuery,
  //   },
  //   pause: !searchQuery,
  // });

  // console.log('searchLocations: ', searchLocations);

  const [userData] = useQuery<MeQuery>({ query: MeDocument });

  const event = useMemo(() => data?.event, [data?.event])

  const [createEventRes, createEvent] = useMutation<CreateEventMutation>(CreateEventDocument);
  const [updateEventRes, updateEvent] = useMutation<UpdateEventMutation>(UpdateEventDocument);
  const [deleteEventRes, deleteEvent] = useMutation<DeleteEventMutation>(DeleteEventDocument)

  const onSubmit = (formData: any) => {
    console.log("formData: ", formData);

    const input = {
      title: formData.name,
      description: formData.description,
      status: formData.status,
      difficulty: formData.difficulty,
      location: formData.location,
      coordinates: {
        latitude: formData.coordinates.latitude,
        longitude: formData.coordinates.longitude
      },
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      createdBy: userData.data?.me?.id
    } as UpdateEventInput;
    if (id) {
      updateEvent({ id, input })
        .then((res) => {
          if (res.error) {
            console.error('Error updating bike park:', res.error);
          } else {
            console.log('Bike park updated successfully:', res.data);
            setShowCreatedModal(res.data?.updateEvent);
          }
        }).catch((error) => {
          console.error('Error updating bike park:', error);
        });
    } else {
      createEvent({ input }).then((res) => {
        console.log(res)
        if (res.error) {
          console.error('Error creating bike park:', res.error);
          alert(`Error creating bike park: ${res.error.message}`);
        } else {
          console.log('Bike park created successfully:', res.data);
          setShowCreatedModal(res.data?.createEvent);
        }
      }).catch((error) => {
        console.error('Error creating bike park:', error);
        alert(`Error creating bike park: ${error.message}`);
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleCloseSuccessModal = () => {
    setShowCreatedModal(undefined);
    setShowUpdateddModal(undefined);
    setShowDeletedModal(undefined);
    navigate('/events');
  };

  const handleDelete = () => {
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirmModal(false);
    deleteEvent({ id }).then((res) => {
      if (res.error) {
        console.error('Error deleting event:', res.error);
      } else {
        setShowDeletedModal({
          id: event?.id ?? "",
          title: event?.title ?? ""
        } as any);
      }
    }).catch((error) => {
      console.error('Error deleting event:', error);
    });
  };

  const form = useForm<CreateEventFormValues>({
    defaultValues: {
      location: "",
      venue: {
        address: "",
        name: "",
      },
    }
  });


  useEffect(() => {
    if (event) {
      form.reset({
        title: event?.title,
      } as CreateEventFormValues)
    }
  }, [event, form])

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

        // form.setValue("coordinates.latitude", lat)
        // form.setValue("coordinates.longitude", lng)
        console.log('results: ', results);
        form.setValue("location", results[0].display_name || results[0].name)
        form.setValue("venue.address", results[0].display_name || results[0].name)

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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSuggestions(searchQuery);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

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

  const handleSuggestionSelect = (suggestion: any) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    const newPos = { lat, lng };

    setSearchQuery(suggestion.display_name || suggestion.name);
    setSuggestions([]);

    form.setValue("location", suggestion.display_name || suggestion.name);

    if (mapRef.current) {
      mapRef.current.setView(newPos, 13);
      mapRef.current.flyTo(newPos, 13, { animate: true, duration: 1.5 });
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


  const isLoading = fetching || stale || createEventRes.fetching || updateEventRes.fetching || deleteEventRes.fetching;

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && (
        <div className="flex items-center justify-center h-40 w-40 shadow-2xl absolute top-[50%] left-[50%] bg-white">
          <i className="fas fa-spinner fa-spin text-emerald-500 text-4xl"></i>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{id ? "Edit Event" : "Create Event"}</h1>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
            {(userData.data?.me?.role === "admin" || event?.createdBy?.id === userData.data?.me?.id) && (
              <>
                {location.pathname !== "/event/new" && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  {id ? "Save" : "Create Event"}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="grid xl:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Name*</label>
                <input
                  type="text"
                  {...form.register('title', { required: 'Title is required' })}
                  placeholder="Enter event title"
                  required
                  className={`w-full px-3 py-2 border rounded-md ${form.formState.errors.title ? 'border-red-500' : 'border-gray-300'}`}
                />
                {form.formState.errors.title && <span style={{ color: 'red' }}>{form.formState.errors.title.message}</span>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Event Category *</label>
                <select
                  {...form.register('category')}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option value="">Select status</option>
                  {eventCategories.map(s => (
                    <option key={s.value} value={s.value}>{s.status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Date & Time</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Start Date & Time *</label>
                <input
                  type="datetime-local"
                  {...form.register('startTime', { required: 'Start date is required' })}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
                {form.formState.errors.startTime && <span style={{ color: 'red' }}>{form.formState.errors.startTime.message}</span>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">End Date & Time *</label>
                <input
                  type="datetime-local"
                  {...form.register('endTime', { required: 'End date is required' })}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
                {form.formState.errors.endTime && <span style={{ color: 'red' }}>{form.formState.errors.endTime.message}</span>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Location</h3>
            <div className="grid md:grid-cols-2 gap-4 relative">
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Venue Name *</label>
                <input
                  type="text"
                  {...form.register('venue.name', { required: 'Venue name is required' })}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter venue name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(e);
                    }
                  }} />
                {form.formState.errors.venue?.name && <span style={{ color: 'red' }}>{form.formState.errors.venue.name.message}</span>}
              </div>
              {suggestions.length > 0 && (
                <ul className="absolute z-[100] bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto top-[70px]">
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
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Address *</label>
                <input
                  type="text"
                  {...form.register('venue.address', { required: 'Venue address is required' })}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter full address" />
                {form.formState.errors.venue?.address && <span style={{ color: 'red' }}>{form.formState.errors.venue.address.message}</span>}
              </div>
              {/* <div>
                <label className="block text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  {...form.register('venue', { required: 'Venue address is required' })}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
                {form.formState.errors.venue?. && <span style={{ color: 'red' }}>{form.formState.errors.startTime.message}</span>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Country *</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
                {form.formState.errors.startTime && <span style={{ color: 'red' }}>{form.formState.errors.startTime.message}</span>}
              </div> */}
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
                            // form.setValue("coordinates.latitude", tempPosition.lat)
                            // form.setValue("coordinates.longitude", tempPosition.lng)
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

              {/* {location && (<div>Current location: {location}</div>)} */}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Event Details</h3>
            <div>
              <label className="block text-gray-700 mb-2">Description *</label>
              <textarea rows={4}
                {...form.register('description', { required: 'Description is required' })}
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="Enter event description"></textarea>
              {form.formState.errors.description && <span style={{ color: 'red' }}>{form.formState.errors.description.message}</span>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* <div>
                <label className="block text-gray-700 mb-2">Difficulty Level</label>
                <select className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>Select difficulty</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div> */}
              <div>
                <label className="block text-gray-700 mb-2">Maximum Participants</label>
                <input
                  type="number"
                  {...form.register('availableTickets')}
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Pricing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Regular Price ($) *</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Early Bird Price ($)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Media</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-600">Drag and drop images here, or click to select files</p>
              <input type="file" className="hidden" multiple accept="image/*" />
            </div>
          </div>
        </div>
      </form >
    </div >
  );
};

export default EventFormOld;
