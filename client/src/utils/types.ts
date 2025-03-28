export interface ParkCard {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  features: Array<{
    text: string;
    color: string;
  }>;
  weather: {
    icon: string;
    temp: number;
  };
}

export interface Event {
  id: string;
  type: string;
  typeColor: string;
  date: string;
  title: string;
  location: string;
  registeredCount: number;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  features: Array<{
    text: string;
    color: string;
  }>;
  price: number;
}

export interface OpeningHours {
  days: string;
  hours: string;
}