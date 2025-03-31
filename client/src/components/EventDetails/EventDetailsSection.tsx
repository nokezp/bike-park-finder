import React from "react";
import { Event } from "../../lib/graphql/generated/graphql-operations";
import { formatTime } from "./EventDetailsHeroSection";
import moment from "moment";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { defaultMapIcon } from "../Map/Map";

function InvalidateMapSize() {
  const map = useMap();
  map.invalidateSize();
  return null;
}

const EventDetailsSection: React.FC<{
  event: Event
}> = ({ event }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* About Event */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About Event</h2>
              <p className="text-gray-600 mb-6">{event.description}</p>

              <h3 className="font-bold text-lg mb-3">What to Expect:</h3>
              {/* TODO: Fix this */}
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                  Professional racing across multiple disciplines
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                  Live entertainment and music
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                  Bike expo with latest gear and equipment
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-3"></i>
                  Food and beverage vendors
                </li>
              </ul>

              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">Event Schedule</h3>
                <div className="space-y-4">
                  {event.schedule?.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="w-32 text-gray-500">{formatTime(item.time)}</div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-gray-600">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location */}
            {!!event?.coordinates && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden h-[300px] mb-4 z-10">
                  {/* <img className="w-full h-full object-cover" src={event?.venue?.mapImageUrl} alt={event.venue?.name} /> */}
                  <MapContainer
                    center={[event?.coordinates?.latitude ?? 0, event?.coordinates?.longitude ?? 0]} // Center of Germany
                    zoom={6}
                    className="w-full h-full z-10"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <InvalidateMapSize />
                    <Marker position={[event?.coordinates?.latitude ?? 0, event?.coordinates?.longitude ?? 0]} icon={defaultMapIcon} />
                  </MapContainer>
                </div>
                <div className="flex items-start gap-4">
                  <i className="fa-solid fa-location-dot text-emerald-600 mt-1"></i>
                  <div>
                    <h3 className="font-bold">{event.venue?.name}</h3>
                    <p className="text-gray-600">{event.venue?.address}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Organizer */}
            {!!event?.organizer && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">Event Organizer</h2>
                <div className="flex items-center gap-4">
                <img src={event.organizer.imageUrl} className="w-16 h-16 rounded-full" />
                  <div>
                    <h3 className="font-bold text-lg">{event.organizer.name}</h3>
                    <p className="text-gray-600">{event.organizer.description}</p>
                    <button className="mt-2 text-emerald-600 hover:text-emerald-700">
                      <i className="fa-regular fa-envelope mr-2"></i>Contact Organizer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold">{event.price > 0 ? event.price + "€" : "Free"}</span>
                {/* <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm">Early Bird</span> */}
              </div>
              <button className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 mb-4">Register Now</button>
              {!!event.registrationEndDate && (
                <div className="space-y-4 text-gray-600">
                  <div className="flex justify-between pb-4 border-b">
                    <span>Registration Ends</span>
                    <span className="font-medium">{moment(event.registrationEndDate).format('MMM D, YYYY')}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b">
                    <span>Available Tickets</span>
                    <span className="font-medium">
                      {event.availableTickets}/{event.capacity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refund Policy</span>
                    <span className="text-emerald-600 cursor-pointer">View Details</span>
                  </div>
                </div>
              )}
            </div>

            {/* Attendees */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Who&apos;s Going?</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                  className="w-10 h-10 rounded-full"
                />
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                  className="w-10 h-10 rounded-full"
                />
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                  className="w-10 h-10 rounded-full"
                />
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                  className="w-10 h-10 rounded-full"
                />
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  +{event.attendeeCount - 4}
                </div>
              </div>
              <button className="w-full text-emerald-600 border border-emerald-600 py-2 rounded-md hover:bg-emerald-50">
                View All Attendees
              </button>
            </div>

            {/* Share */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Share Event</h3>
              <div className="flex gap-4">
                <button className="flex-1 py-2 rounded-md border hover:bg-gray-50">
                  <i className="fa-brands fa-facebook text-blue-600"></i>
                </button>
                <button className="flex-1 py-2 rounded-md border hover:bg-gray-50">
                  <i className="fa-brands fa-twitter text-blue-400"></i>
                </button>
                <button className="flex-1 py-2 rounded-md border hover:bg-gray-50">
                  <i className="fa-solid fa-link text-gray-600"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
