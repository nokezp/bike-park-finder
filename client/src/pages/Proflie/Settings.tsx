import React, { useState } from 'react';
import ReviewBikeParks from '../../components/Admin/ReviewBikeParks';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bike-parks');

  const tabs = [
    { id: 'bike-parks', label: 'Approve bike parks' },
    { id: 'events', label: 'Approve events' },
  ];

  return (
    <section className="container mx-auto px-4">
      <div>
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 font-medium ${activeTab === tab.id ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'}`}>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'bike-parks' && (
          <ReviewBikeParks />
        )}
        {activeTab === 'events' && (<div>Events</div>)}
      </div>
    </section>
  )
};

export default Settings;
