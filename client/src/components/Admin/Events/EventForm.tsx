/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Event, EventDocument, EventQuery, MeDocument, MeQuery, DeleteEventMutation, UpdateEventMutation, CreateEventMutation, CreateEventDocument, UpdateEventDocument, DeleteEventDocument, UpdateEventInput, SearchBikeParkDocument } from '../../../lib/graphql/generated/graphql-operations';
import { useMutation, useQuery } from 'urql';
import { useForm } from 'react-hook-form';
import { CreateEventFormValues, eventCategories } from '../../../lib/helpers/common-helper';
import { searchAddress } from '../../../lib/helpers/mapbox-search';
import { useMapEvents } from 'react-leaflet';

const EventForm: React.FC = () => {
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
    <>
      <section id="section-page-title" className="container mx-auto px-4 mb-10">
        <div className="flex items-center gap-4">
          <i className="fa-solid fa-calendar-plus text-3xl text-emerald-600"></i>
          <div>
            <h1 className="text-3xl font-bold">Create Event</h1>
            <p className="text-gray-500">Create a new event and share it with the community</p>
          </div>
        </div>
      </section>

      <section id="section-event-form" className="container mx-auto px-4">
        <form className="bg-white rounded-xl shadow-lg p-8 space-y-12">
          <div id="section-basic-info">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 text-gray-800">
              <i className="fa-solid fa-info-circle text-emerald-600 mr-2"></i>Basic Information
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-2 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex flex-row gap-2 items-center">
                      <label className="text-sm font-medium text-gray-700" htmlFor="title">Event Title</label>
                      <input
                        type="text"
                        className={`px-3 py-2 border rounded-md ${form.formState.errors.title ? 'border-red-500' : 'border-gray-300'}`}
                        id="title"
                        {...form.register('title', { required: 'Title is required' })}
                        placeholder="Give your event a name" />
                    </div>
                    {form.formState.errors.title && <span style={{ color: 'red' }}>{form.formState.errors.title.message}</span>}
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <label className="text-sm font-medium text-gray-700" htmlFor="category">Category</label>
                    <select
                      {...form.register('category')}
                      className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      id="category">
                      <option value="">Select a category</option>
                      {eventCategories.map(s => (
                        <option key={s.value} value={s.value}>{s.status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <label className="block text-gray-700" htmlFor="description">Description</label>
                    <textarea
                      className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      id="description"
                      {...form.register('description', { required: 'Description is required' })}
                      rows={4} placeholder="Describe your event..."></textarea>
                  </div>
                  {form.formState.errors.description && <span style={{ color: 'red' }}>{form.formState.errors.description.message}</span>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="input-label">Event Image</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                      <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                    </div>
                  </div>
                  <div>
                    <label className="input-label" htmlFor="featured">Featured Event</label>
                    <div className="flex items-center gap-3 mt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="featured" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                      <span className="text-sm text-gray-600">Make this event featured</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Quick Tips</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <i className="fa-solid fa-circle-info text-emerald-600 mt-1"></i>
                      <span>Make sure to provide clear and accurate event details</span>
                    </li>
                    <li className="flex gap-2">
                      <i className="fa-solid fa-circle-info text-emerald-600 mt-1"></i>
                      <span>Add high-quality images to attract participants</span>
                    </li>
                    <li className="flex gap-2">
                      <i className="fa-solid fa-circle-info text-emerald-600 mt-1"></i>
                      <span>Include important event rules and requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div id="section-event-details">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 text-gray-800">
              <i className="fa-solid fa-calendar-alt text-emerald-600 mr-2"></i>Event Details
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <label className="block text-gray-700" htmlFor="date">Date</label>
                  <input className="px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    id="date"
                    {...form.register('date', { required: 'Date is required' })}
                    type="date" />
                </div>
                {form.formState.errors.date && <span style={{ color: 'red' }}>{form.formState.errors.date.message}</span>}
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <label className="block text-gray-700" htmlFor="startTime">Start Time</label>
                  <input className="px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    id="startTime"
                    {...form.register('startTime', { required: 'Start time is required' })}
                    type="time" />
                </div>
                {form.formState.errors.startTime && <span style={{ color: 'red' }}>{form.formState.errors.startTime.message}</span>}
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <label className="block text-gray-700" htmlFor="endTime">End Time</label>
                  <input className="px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    id="endTime"
                    {...form.register('endTime', { required: 'End time is required' })}
                    type="time" />
                </div>
                {form.formState.errors.endTime && <span style={{ color: 'red' }}>{form.formState.errors.endTime.message}</span>}
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <label className="block text-gray-700" htmlFor="price">Regular Price</label>
                  <input className="px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    id="price" {...form.register('price', { required: 'Price is required' })}
                    type="number"
                    placeholder="0.00" />
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <label className="block text-gray-700" htmlFor="earlyBirdPrice">Early Bird Price</label>
                  <input className="px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    id="earlyBirdPrice"
                    // {...form.register('startTime', { required: 'Start time is required' })}
                    type="number"
                    placeholder="0.00" />
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <label className="block text-gray-700" htmlFor="capacity">Capacity</label>
                  <input className="px-4 py-2 rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    id="capacity"
                    {...form.register('capacity')}
                    type="number"
                    placeholder="Maximum participants" />
                </div>
              </div>
            </div>
          </div>

          <div id="section-schedule">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 text-gray-800">
              <i className="fa-solid fa-clock text-emerald-600 mr-2"></i>Schedule
            </h2>
            <div id="schedule-list" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 items-end schedule-row">
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <label className="text-sm font-medium text-gray-700" htmlFor="scheduleTime-0">Time</label>
                    <input
                      className={`px-3 py-2 border rounded-md ${form.formState.errors.schedule?.time ? 'border-red-500' : 'border-gray-300'}`}
                      id="scheduleTime-0"
                      name="scheduleTime[]"
                      type="time" />
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <label className="text-sm font-medium text-gray-700" htmlFor="scheduleTitle-0">Title</label>
                    <input className={`px-3 py-2 border rounded-md ${form.formState.errors.title ? 'border-red-500' : 'border-gray-300'}`}
                      id="scheduleTitle-0"
                      name="scheduleTitle[]"
                      type="text"
                      placeholder="e.g. Registration" />
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <label className="text-sm font-medium text-gray-700" htmlFor="scheduleDescription-0">Description</label>
                    <input className={`px-3 py-2 border rounded-md ${form.formState.errors.title ? 'border-red-500' : 'border-gray-300'}`}
                      id="scheduleDescription-0"
                      name="scheduleDescription[]"
                      type="text"
                      placeholder="Details about this activity" />
                  </div>
                </div>
              </div>
            </div>
            <button type="button" id="add-schedule-btn" className="mt-4 text-emerald-600 hover:text-emerald-700">
              <i className="fa-solid fa-plus mr-2"></i>Add Schedule Item
            </button>
          </div>

          <div id="section-location">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200 text-gray-800">
              <i className="fa-solid fa-location-dot text-emerald-600 mr-2"></i>Location
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="input-label" htmlFor="venueName">Venue Name</label>
                <input className="input-field" id="venueName" name="venueName" type="text" placeholder="Enter venue name" />
              </div>
              <div>
                <label className="input-label" htmlFor="venueAddress">Address</label>
                <input className="input-field" id="venueAddress" name="venueAddress" type="text" placeholder="Enter full address" />
              </div>
              <div className="md:col-span-2">
                <label className="input-label" htmlFor="venueMapImageUrl">Venue Map URL</label>
                <input className="input-field" id="venueMapImageUrl" name="venueMapImageUrl" type="url" placeholder="Enter map image URL" />
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <div id="venue-map-placeholder" className="bg-gray-100 h-48 flex items-center justify-center">
                    <span className="text-gray-400">Map preview will appear here</span>
                  </div>
                  <img id="venue-map-image-preview" className="hidden w-full h-48 object-cover" alt="Venue Map" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 font-semibold">
              Create Event
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EventForm;