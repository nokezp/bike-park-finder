import React from "react";
import { BikePark } from "../../lib/graphql/generated/graphql-operations";
import { formatCurrency, getWeekendStatus, getWorkWeekStatus } from "../../lib/helpers/common-helper";

const BikeParkDescription: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  const workweekStatus = getWorkWeekStatus(bikePark.openingHours);
  const weekendStatus = getWeekendStatus(bikePark.openingHours);

  return (
    <div id="park-description" className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">About the Park</h2>
      <p className="text-gray-600 mb-4">{bikePark.description}</p>

      <div className="border-t border-gray-200 pt-4 pb-4 mt-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {bikePark.contact?.phone && (
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-phone text-emerald-600"></i>
                <span className="wrap-break-word overflow-auto">{bikePark.contact?.phone}</span>
              </div>
            )}
            {bikePark.contact?.email && (
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-envelope text-emerald-600"></i>
                <span className="wrap-break-word overflow-auto">{bikePark.contact?.email}</span>
              </div>
            )}
            {bikePark.contact?.website && (
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-globe text-emerald-600"></i>
                <span className="wrap-break-word overflow-auto">{bikePark.contact?.website}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            {bikePark.socialMedia?.facebook && (
              <div className="flex items-center space-x-2">
                <i className="fa-brands fa-facebook text-emerald-600"></i>
                <span className="wrap-break-word overflow-auto">{bikePark.socialMedia?.facebook}</span>
              </div>
            )}
            {bikePark.socialMedia?.instagram && (
              <div className="flex items-center space-x-2">
                <i className="fa-brands fa-instagram text-emerald-600"></i>
                <span className="wrap-break-word overflow-auto">{bikePark.socialMedia?.instagram}</span>
              </div>
            )}
            {bikePark.socialMedia?.youtube && (
              <div className="flex items-center space-x-2">
                <i className="fa-brands fa-youtube text-emerald-600"></i>
                <span className="wrap-break-word overflow-auto">{bikePark.socialMedia?.youtube}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {!!bikePark.facilities?.length && (
        <div id="features" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Features & Facilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {bikePark.facilities?.map((facility) => (
              <div key={facility} className="flex items-center space-x-2">
                <i className="fa-solid fa-mountain text-emerald-600"></i>
                {/* <span>70+ Trails</span> */}
                <span>{facility}</span>
              </div>
            ))}
            {/* <div className="flex items-center space-x-2">
              <i className="fa-solid fa-elevator text-emerald-600"></i>
              <span>5 Lifts</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-bicycle text-emerald-600"></i>
              <span>Bike Rentals</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-shop text-emerald-600"></i>
              <span>Pro Shop</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-shower text-emerald-600"></i>
              <span>Shower Facilities</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-utensils text-emerald-600"></i>
              <span>Restaurant</span>
            </div> */}
          </div>
        </div>
      )}

      <div id="hours-prices" className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <div className="space-y-2">
              {workweekStatus && (
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>{workweekStatus}</span>
                </div>
              )}
              {weekendStatus && (
                <div className="flex justify-between">
                  <span>Saturday - Sunday</span>
                  <span>{weekendStatus}</span>
                </div>
              )}
            </div>
          </div>
          {!!bikePark?.prices?.length && (
            <div>
              <h3 className="text-xl font-bold mb-4">Prices</h3>
              <div className="space-y-2">
                {bikePark?.prices?.map(p => (
                  <div key={"bikepark_price_" + bikePark.id + "_" + p?.name?.replace(" ", "")} className="flex justify-between" >
                    <span>{p?.name}</span>
                    <span>{formatCurrency(p?.price, p?.currency)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {!!bikePark.rules?.length && (
        <div id="rules" className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Park Rules</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {bikePark.rules.map((rule) => (
              <div key={rule} className="flex items-start space-x-2">
                <i className="fa-solid fa-helmet-safety text-emerald-600 mt-1"></i>
                <span>{rule}</span>
              </div>
            ))}
            {/* <div className="flex items-start space-x-2">
              <i className="fa-solid fa-hand text-emerald-600 mt-1"></i>
              <span>Follow trail signage</span>
            </div>
            <div className="flex items-start space-x-2">
              <i className="fa-solid fa-person-walking text-emerald-600 mt-1"></i>
              <span>No hiking on bike trails</span>
            </div>
            <div className="flex items-start space-x-2">
              <i className="fa-solid fa-clock text-emerald-600 mt-1"></i>
              <span>Respect operating hours</span>
            </div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default BikeParkDescription;
