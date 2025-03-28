import React from 'react';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';
import { convertUnixToDayName, getWeatherIcon } from '../../lib/helpers/common-helper';

const WeatherWidget: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  return (
    <div id="weather-widget" className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Weather Forecast</h3>
      <div className="space-y-4">
        {bikePark.weather?.forecast?.map((forecast) => (
          <div key={forecast?.date} className="flex items-center justify-between">
            <span>{convertUnixToDayName(Number(forecast?.date ?? 0))}</span>
            <div className="flex items-center">
              {/* <i className="fa-solid fa-sun text-yellow-400 mr-2"></i> */}
              <img
                id="wicon"
                src={getWeatherIcon(forecast?.icon ?? '')}
                alt="Weather icon"
                className="mr-2 w-[30px]"
              // width="40px"
              />
              <span>{forecast?.temperature}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;