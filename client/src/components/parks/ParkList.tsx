interface Park {
  _id: string;
  name: string;
  description: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  difficulty: string;
  features: string[];
  amenities: string[];
  hasLiftAccess: boolean;
  hasTechnicalSections: boolean;
  hasJumps: boolean;
  hasDrops: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface ParkListProps {
  parks: Park[];
  onSelectPark: (park: Park) => void;
  selectedPark: Park | null;
}

export default function ParkList({ parks, onSelectPark, selectedPark }: ParkListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Available Parks</h2>
      <div className="space-y-2">
        {parks.map((park) => (
          <div
            key={"park_list_" + park._id}
            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              selectedPark?._id === park._id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            onClick={() => onSelectPark(park)}
          >
            <h3 className="font-medium">{park.name}</h3>
            <p className="text-sm text-gray-600">{park.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 