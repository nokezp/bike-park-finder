import React, { useState } from "react";
import { EventCategory, PopularEventCategoriesDocument, PopularEventCategoriesQuery } from "../../lib/graphql/generated/graphql-operations";
import { useQuery } from "urql";


const EventCategories: React.FC<{
  onCategorySelect: (categoryName: EventCategory) => void
}> = ({ onCategorySelect }) => {
  const [total, setTotal] = useState(4);
  
  const [{ data }] = useQuery<PopularEventCategoriesQuery>({
    query: PopularEventCategoriesDocument
  });

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Popular Categories</h2>
          {total > 4 && (
            <span
              className="text-emerald-600 hover:text-emerald-700 cursor-pointer"
              onClick={() => setTotal(data?.popularEventCategories?.length ?? total)}>View All</span>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data?.popularEventCategories?.slice(0, total).map(category => (
            <div key={category.name} className="relative group cursor-pointer" onClick={() => onCategorySelect(category.name)}>
              <img
                className="w-full h-48 object-cover rounded-lg"
                src={category.imageUrl}
                alt={category.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p>{category.count} Events</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;
