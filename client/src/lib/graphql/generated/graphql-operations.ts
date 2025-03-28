/* eslint-disable */
import { cacheExchange } from '@urql/exchange-graphcache';
import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver } from '@urql/exchange-graphcache';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type BikePark = {
  __typename?: 'BikePark';
  address?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<Contact>;
  coordinates?: Maybe<Coordinates>;
  createdAt: Scalars['String']['output'];
  createdBy: User;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['String']['output']>;
  facilities?: Maybe<Array<Scalars['String']['output']>>;
  features?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  openingHours?: Maybe<OpeningHours>;
  photos?: Maybe<Array<Scalars['String']['output']>>;
  price?: Maybe<Price>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviews?: Maybe<Array<Review>>;
  rules?: Maybe<Array<Scalars['String']['output']>>;
  socialMedia?: Maybe<SocialMedia>;
  status?: Maybe<Scalars['String']['output']>;
  trails?: Maybe<Array<Trail>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  videos?: Maybe<Array<Scalars['String']['output']>>;
  weather?: Maybe<Weather>;
  website?: Maybe<Scalars['String']['output']>;
};

export type BikeParkFilter = {
  coordinates?: InputMaybe<CoordinatesSearchInput>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  facilities?: InputMaybe<Array<Scalars['String']['input']>>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CategoryInfo = {
  __typename?: 'CategoryInfo';
  count: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type ContactInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type CoordinatesInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type CoordinatesSearchInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  radius?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateEventInput = {
  capacity: Scalars['Int']['input'];
  category: EventCategory;
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl: Scalars['String']['input'];
  location: Scalars['String']['input'];
  organizer: OrganizerInput;
  price: Scalars['Float']['input'];
  registrationEndDate: Scalars['String']['input'];
  schedule: Array<ScheduleItemInput>;
  startTime: Scalars['String']['input'];
  title: Scalars['String']['input'];
  venue: VenueInput;
};

export type Event = {
  __typename?: 'Event';
  attendeeCount: Scalars['Int']['output'];
  availableTickets: Scalars['Int']['output'];
  capacity: Scalars['Int']['output'];
  category: EventCategory;
  createdAt: Scalars['String']['output'];
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  featured: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  location: Scalars['String']['output'];
  organizer: Organizer;
  price: Scalars['Float']['output'];
  registrationEndDate: Scalars['String']['output'];
  schedule: Array<ScheduleItem>;
  startTime: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  venue: Venue;
};

export enum EventCategory {
  BikepackingEvent = 'BIKEPACKING_EVENT',
  Championship = 'CHAMPIONSHIP',
  CharityRide = 'CHARITY_RIDE',
  CrossCountry = 'CROSS_COUNTRY',
  DemoDay = 'DEMO_DAY',
  DirtJump = 'DIRT_JUMP',
  Downhill = 'DOWNHILL',
  Enduro = 'ENDURO',
  EBikeEvent = 'E_BIKE_EVENT',
  FamilyRide = 'FAMILY_RIDE',
  Festival = 'FESTIVAL',
  FunRide = 'FUN_RIDE',
  GravelRace = 'GRAVEL_RACE',
  GroupRide = 'GROUP_RIDE',
  MaintenanceClinic = 'MAINTENANCE_CLINIC',
  NightRide = 'NIGHT_RIDE',
  Race = 'RACE',
  StageRace = 'STAGE_RACE',
  TrainingCamp = 'TRAINING_CAMP',
  Workshop = 'WORKSHOP'
}

export type EventFilter = {
  category?: InputMaybe<EventCategory>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export enum EventStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Ongoing = 'ONGOING',
  Upcoming = 'UPCOMING'
}

export type Mutation = {
  __typename?: 'Mutation';
  createBikePark: BikePark;
  createEvent: Event;
  createReview: Review;
  deleteBikePark: Scalars['Boolean']['output'];
  deleteEvent: Scalars['Boolean']['output'];
  deleteReview: Scalars['Boolean']['output'];
  login: AuthPayload;
  register: AuthPayload;
  registerForEvent: Event;
  updateBikePark: BikePark;
  updateEvent: Event;
  updateProfile: User;
  updateReview: Review;
};


export type MutationCreateBikeParkArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<ContactInput>;
  coordinates?: InputMaybe<CoordinatesInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  facilities?: InputMaybe<Array<Scalars['String']['input']>>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  openingHours?: InputMaybe<OpeningHoursInput>;
  photos?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<PriceInput>;
  rules?: InputMaybe<Array<Scalars['String']['input']>>;
  socialMedia?: InputMaybe<SocialMediaInput>;
  status?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<Array<Scalars['String']['input']>>;
  website?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateReviewArgs = {
  bikeParkId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
  photos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  rating: Scalars['Float']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  trailDifficulty?: InputMaybe<Scalars['String']['input']>;
  visitDate?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteBikeParkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterForEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBikeParkArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBikeParkInput;
};


export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input'];
  input: UpdateEventInput;
};


export type MutationUpdateProfileArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateReviewArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  rating?: InputMaybe<Scalars['Float']['input']>;
};

export type OpeningHours = {
  __typename?: 'OpeningHours';
  friday?: Maybe<Scalars['String']['output']>;
  monday?: Maybe<Scalars['String']['output']>;
  saturday?: Maybe<Scalars['String']['output']>;
  sunday?: Maybe<Scalars['String']['output']>;
  thursday?: Maybe<Scalars['String']['output']>;
  tuesday?: Maybe<Scalars['String']['output']>;
  wednesday?: Maybe<Scalars['String']['output']>;
};

export type OpeningHoursInput = {
  friday?: InputMaybe<Scalars['String']['input']>;
  monday?: InputMaybe<Scalars['String']['input']>;
  saturday?: InputMaybe<Scalars['String']['input']>;
  sunday?: InputMaybe<Scalars['String']['input']>;
  thursday?: InputMaybe<Scalars['String']['input']>;
  tuesday?: InputMaybe<Scalars['String']['input']>;
  wednesday?: InputMaybe<Scalars['String']['input']>;
};

export type Organizer = {
  __typename?: 'Organizer';
  description: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type OrganizerInput = {
  description: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type PaginatedBikeParks = {
  __typename?: 'PaginatedBikeParks';
  bikeParks: Array<BikePark>;
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedReviews = {
  __typename?: 'PaginatedReviews';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  reviews: Array<Review>;
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginationInput = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type Price = {
  __typename?: 'Price';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
};

export type PriceInput = {
  amount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  bikePark?: Maybe<BikePark>;
  bikeParks: PaginatedBikeParks;
  bikeParksByViewport: Array<BikePark>;
  event?: Maybe<Event>;
  events: Array<Event>;
  me?: Maybe<User>;
  popularEventCategories: Array<CategoryInfo>;
  reviews: PaginatedReviews;
  searchBikeParks: Array<BikePark>;
};


export type QueryBikeParkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBikeParksArgs = {
  filter?: InputMaybe<BikeParkFilter>;
};


export type QueryBikeParksByViewportArgs = {
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  viewport: ViewportInput;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<EventFilter>;
};


export type QueryReviewsArgs = {
  bikeParkId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchBikeParksArgs = {
  query: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  bikePark: Scalars['ID']['output'];
  comment: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  photos?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  rating: Scalars['Float']['output'];
  title?: Maybe<Scalars['String']['output']>;
  trailDifficulty?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  visitDate?: Maybe<Scalars['String']['output']>;
};

export type ScheduleItem = {
  __typename?: 'ScheduleItem';
  description: Scalars['String']['output'];
  time: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScheduleItemInput = {
  description: Scalars['String']['input'];
  time: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type SocialMedia = {
  __typename?: 'SocialMedia';
  facebook?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type SocialMediaInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
};

export type Trail = {
  __typename?: 'Trail';
  description?: Maybe<Scalars['String']['output']>;
  difficulty: Scalars['String']['output'];
  features?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  length: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  verticalDrop: Scalars['Float']['output'];
};

export type UpdateBikeParkInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<ContactInput>;
  coordinates?: InputMaybe<CoordinatesInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  facilities?: InputMaybe<Array<Scalars['String']['input']>>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  openingHours?: InputMaybe<OpeningHoursInput>;
  photos?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<PriceInput>;
  rules?: InputMaybe<Array<Scalars['String']['input']>>;
  socialMedia?: InputMaybe<SocialMediaInput>;
  status?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<Array<Scalars['String']['input']>>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEventInput = {
  capacity?: InputMaybe<Scalars['Int']['input']>;
  category?: InputMaybe<EventCategory>;
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  organizer?: InputMaybe<OrganizerInput>;
  price?: InputMaybe<Scalars['Float']['input']>;
  registrationEndDate?: InputMaybe<Scalars['String']['input']>;
  schedule?: InputMaybe<Array<ScheduleItemInput>>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  venue?: InputMaybe<VenueInput>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Venue = {
  __typename?: 'Venue';
  address: Scalars['String']['output'];
  mapImageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type VenueInput = {
  address: Scalars['String']['input'];
  mapImageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ViewportInput = {
  northEast: CoordinatesInput;
  southWest: CoordinatesInput;
};

export type Weather = {
  __typename?: 'Weather';
  current?: Maybe<WeatherData>;
  forecast?: Maybe<Array<Maybe<WeatherData>>>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
};

export type WeatherData = {
  __typename?: 'WeatherData';
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  feelsLike?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Int']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  precipitation?: Maybe<Scalars['Float']['output']>;
  temperature?: Maybe<Scalars['Float']['output']>;
  uvIndex?: Maybe<Scalars['Float']['output']>;
  windSpeed?: Maybe<Scalars['Float']['output']>;
};

export type BikeParkFragment = { __typename?: 'BikePark', id: string, name: string, description?: string | null, location?: string | null, imageUrl?: string | null, difficulty?: string | null, status?: string | null, features?: Array<string> | null, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null };

export type EventFragment = { __typename?: 'Event', id: string, attendeeCount: number, capacity: number, category: EventCategory, date: string, description: string, featured: boolean, imageUrl: string, location: string, price: number, title: string, organizer: { __typename?: 'Organizer', name: string, description: string, imageUrl: string } };

export type CreateReviewMutationVariables = Exact<{
  bikeParkId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Float']['input'];
  comment: Scalars['String']['input'];
  visitDate?: InputMaybe<Scalars['String']['input']>;
  trailDifficulty?: InputMaybe<Scalars['String']['input']>;
  photos?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id: string, title?: string | null, comment: string, rating: number, bikePark: string, createdAt: string, updatedAt?: string | null, createdBy: { __typename?: 'User', id: string, username: string, email: string } } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', token: string } };

export type GetBikeParkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBikeParkQuery = { __typename?: 'Query', bikePark?: { __typename?: 'BikePark', id: string, name: string, description?: string | null, location?: string | null, imageUrl?: string | null, difficulty?: string | null, status?: string | null, features?: Array<string> | null, facilities?: Array<string> | null, photos?: Array<string> | null, rating?: number | null, rules?: Array<string> | null, videos?: Array<string> | null, website?: string | null, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null, contact?: { __typename?: 'Contact', email?: string | null, phone?: string | null } | null, openingHours?: { __typename?: 'OpeningHours', friday?: string | null, monday?: string | null, saturday?: string | null, sunday?: string | null, thursday?: string | null, tuesday?: string | null, wednesday?: string | null } | null, price?: { __typename?: 'Price', amount: number, currency: string } | null, socialMedia?: { __typename?: 'SocialMedia', facebook?: string | null, instagram?: string | null, twitter?: string | null, youtube?: string | null } | null, weather?: { __typename?: 'Weather', current?: { __typename?: 'WeatherData', description?: string | null, feelsLike?: number | null, humidity?: number | null, icon?: string | null, precipitation?: number | null, temperature?: number | null, uvIndex?: number | null, windSpeed?: number | null } | null, forecast?: Array<{ __typename?: 'WeatherData', date?: string | null, description?: string | null, feelsLike?: number | null, humidity?: number | null, icon?: string | null, precipitation?: number | null, temperature?: number | null, uvIndex?: number | null, windSpeed?: number | null } | null> | null } | null, trails?: Array<{ __typename?: 'Trail', id: string, imageUrl?: string | null, length: number, name: string, status: string, verticalDrop: number, features?: Array<string> | null, difficulty: string, description?: string | null }> | null, reviews?: Array<{ __typename?: 'Review', id: string, title?: string | null, comment: string, rating: number, createdAt: string, updatedAt?: string | null, createdBy: { __typename?: 'User', id: string, username: string, email: string } }> | null } | null };

export type GetBikeParksQueryVariables = Exact<{
  filter?: InputMaybe<BikeParkFilter>;
}>;


export type GetBikeParksQuery = { __typename?: 'Query', bikeParks: { __typename?: 'PaginatedBikeParks', totalCount: number, currentPage: number, totalPages: number, hasNextPage: boolean, bikeParks: Array<{ __typename?: 'BikePark', id: string, name: string, description?: string | null, location?: string | null, imageUrl?: string | null, difficulty?: string | null, status?: string | null, features?: Array<string> | null, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null, weather?: { __typename?: 'Weather', current?: { __typename?: 'WeatherData', description?: string | null, feelsLike?: number | null, humidity?: number | null, icon?: string | null, precipitation?: number | null, temperature?: number | null, uvIndex?: number | null, windSpeed?: number | null } | null } | null }> } };

export type GetBikeParksByViewportQueryVariables = Exact<{
  viewport: ViewportInput;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBikeParksByViewportQuery = { __typename?: 'Query', bikeParksByViewport: Array<{ __typename?: 'BikePark', id: string, name: string, description?: string | null, location?: string | null, imageUrl?: string | null, difficulty?: string | null, status?: string | null, features?: Array<string> | null, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null }> };

export type GetEventQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, attendeeCount: number, capacity: number, category: EventCategory, date: string, description: string, featured: boolean, imageUrl: string, location: string, price: number, title: string, organizer: { __typename?: 'Organizer', name: string, description: string, imageUrl: string } } | null };

export type GetEventsQueryVariables = Exact<{
  filter?: InputMaybe<EventFilter>;
}>;


export type GetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: string, attendeeCount: number, capacity: number, category: EventCategory, date: string, description: string, featured: boolean, imageUrl: string, location: string, price: number, title: string, organizer: { __typename?: 'Organizer', name: string, description: string, imageUrl: string } }> };

export type GetPopularEventCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPopularEventCategoriesQuery = { __typename?: 'Query', popularEventCategories: Array<{ __typename?: 'CategoryInfo', name: string, count: number, imageUrl: string }> };

export type GetReviewsQueryVariables = Exact<{
  bikeParkId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetReviewsQuery = { __typename?: 'Query', reviews: { __typename?: 'PaginatedReviews', totalCount: number, currentPage: number, totalPages: number, hasNextPage: boolean, reviews: Array<{ __typename?: 'Review', id: string, comment: string, createdAt: string, rating: number, title?: string | null, trailDifficulty?: string | null, visitDate?: string | null, createdBy: { __typename?: 'User', id: string, username: string } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, username: string, firstName: string, lastName: string, email: string, role: string, createdAt: string, updatedAt: string } | null };

export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  AuthPayload?: (data: WithTypename<AuthPayload>) => null | string,
  BikePark?: (data: WithTypename<BikePark>) => null | string,
  CategoryInfo?: (data: WithTypename<CategoryInfo>) => null | string,
  Contact?: (data: WithTypename<Contact>) => null | string,
  Coordinates?: (data: WithTypename<Coordinates>) => null | string,
  Event?: (data: WithTypename<Event>) => null | string,
  OpeningHours?: (data: WithTypename<OpeningHours>) => null | string,
  Organizer?: (data: WithTypename<Organizer>) => null | string,
  PaginatedBikeParks?: (data: WithTypename<PaginatedBikeParks>) => null | string,
  PaginatedReviews?: (data: WithTypename<PaginatedReviews>) => null | string,
  Price?: (data: WithTypename<Price>) => null | string,
  Review?: (data: WithTypename<Review>) => null | string,
  ScheduleItem?: (data: WithTypename<ScheduleItem>) => null | string,
  SocialMedia?: (data: WithTypename<SocialMedia>) => null | string,
  Trail?: (data: WithTypename<Trail>) => null | string,
  User?: (data: WithTypename<User>) => null | string,
  Venue?: (data: WithTypename<Venue>) => null | string,
  Weather?: (data: WithTypename<Weather>) => null | string,
  WeatherData?: (data: WithTypename<WeatherData>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    bikePark?: GraphCacheResolver<WithTypename<Query>, QueryBikeParkArgs, WithTypename<BikePark> | string>,
    bikeParks?: GraphCacheResolver<WithTypename<Query>, QueryBikeParksArgs, WithTypename<PaginatedBikeParks> | string>,
    bikeParksByViewport?: GraphCacheResolver<WithTypename<Query>, QueryBikeParksByViewportArgs, Array<WithTypename<BikePark> | string>>,
    event?: GraphCacheResolver<WithTypename<Query>, QueryEventArgs, WithTypename<Event> | string>,
    events?: GraphCacheResolver<WithTypename<Query>, QueryEventsArgs, Array<WithTypename<Event> | string>>,
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<User> | string>,
    popularEventCategories?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<CategoryInfo> | string>>,
    reviews?: GraphCacheResolver<WithTypename<Query>, QueryReviewsArgs, WithTypename<PaginatedReviews> | string>,
    searchBikeParks?: GraphCacheResolver<WithTypename<Query>, QuerySearchBikeParksArgs, Array<WithTypename<BikePark> | string>>
  },
  AuthPayload?: {
    token?: GraphCacheResolver<WithTypename<AuthPayload>, Record<string, never>, Scalars['String'] | string>,
    user?: GraphCacheResolver<WithTypename<AuthPayload>, Record<string, never>, WithTypename<User> | string>
  },
  BikePark?: {
    address?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    contact?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<Contact> | string>,
    coordinates?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<Coordinates> | string>,
    createdAt?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    createdBy?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<User> | string>,
    description?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    difficulty?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    facilities?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    features?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    id?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['ID'] | string>,
    imageUrl?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    lastUpdated?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    openingHours?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<OpeningHours> | string>,
    photos?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    price?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<Price> | string>,
    rating?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['Float'] | string>,
    reviews?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<WithTypename<Review> | string>>,
    rules?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    socialMedia?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<SocialMedia> | string>,
    status?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    trails?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<WithTypename<Trail> | string>>,
    updatedAt?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    videos?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    weather?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<Weather> | string>,
    website?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>
  },
  CategoryInfo?: {
    count?: GraphCacheResolver<WithTypename<CategoryInfo>, Record<string, never>, Scalars['Int'] | string>,
    imageUrl?: GraphCacheResolver<WithTypename<CategoryInfo>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<CategoryInfo>, Record<string, never>, Scalars['String'] | string>
  },
  Contact?: {
    email?: GraphCacheResolver<WithTypename<Contact>, Record<string, never>, Scalars['String'] | string>,
    phone?: GraphCacheResolver<WithTypename<Contact>, Record<string, never>, Scalars['String'] | string>
  },
  Coordinates?: {
    latitude?: GraphCacheResolver<WithTypename<Coordinates>, Record<string, never>, Scalars['Float'] | string>,
    longitude?: GraphCacheResolver<WithTypename<Coordinates>, Record<string, never>, Scalars['Float'] | string>
  },
  Event?: {
    attendeeCount?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Int'] | string>,
    availableTickets?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Int'] | string>,
    capacity?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Int'] | string>,
    category?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, EventCategory | string>,
    createdAt?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    date?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    description?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    endTime?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    featured?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Boolean'] | string>,
    id?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['ID'] | string>,
    imageUrl?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    organizer?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, WithTypename<Organizer> | string>,
    price?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Float'] | string>,
    registrationEndDate?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    schedule?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Array<WithTypename<ScheduleItem> | string>>,
    startTime?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    title?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    venue?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, WithTypename<Venue> | string>
  },
  OpeningHours?: {
    friday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, Scalars['String'] | string>,
    monday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, Scalars['String'] | string>,
    saturday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, Scalars['String'] | string>,
    sunday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, Scalars['String'] | string>,
    thursday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, Scalars['String'] | string>,
    tuesday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, Scalars['String'] | string>,
    wednesday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, Scalars['String'] | string>
  },
  Organizer?: {
    description?: GraphCacheResolver<WithTypename<Organizer>, Record<string, never>, Scalars['String'] | string>,
    imageUrl?: GraphCacheResolver<WithTypename<Organizer>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<Organizer>, Record<string, never>, Scalars['String'] | string>
  },
  PaginatedBikeParks?: {
    bikeParks?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Array<WithTypename<BikePark> | string>>,
    currentPage?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Scalars['Int'] | string>,
    hasNextPage?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Scalars['Boolean'] | string>,
    totalCount?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Scalars['Int'] | string>,
    totalPages?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Scalars['Int'] | string>
  },
  PaginatedReviews?: {
    currentPage?: GraphCacheResolver<WithTypename<PaginatedReviews>, Record<string, never>, Scalars['Int'] | string>,
    hasNextPage?: GraphCacheResolver<WithTypename<PaginatedReviews>, Record<string, never>, Scalars['Boolean'] | string>,
    reviews?: GraphCacheResolver<WithTypename<PaginatedReviews>, Record<string, never>, Array<WithTypename<Review> | string>>,
    totalCount?: GraphCacheResolver<WithTypename<PaginatedReviews>, Record<string, never>, Scalars['Int'] | string>,
    totalPages?: GraphCacheResolver<WithTypename<PaginatedReviews>, Record<string, never>, Scalars['Int'] | string>
  },
  Price?: {
    amount?: GraphCacheResolver<WithTypename<Price>, Record<string, never>, Scalars['Float'] | string>,
    currency?: GraphCacheResolver<WithTypename<Price>, Record<string, never>, Scalars['String'] | string>
  },
  Review?: {
    bikePark?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['ID'] | string>,
    comment?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['String'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['String'] | string>,
    createdBy?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, WithTypename<User> | string>,
    id?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['ID'] | string>,
    photos?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Array<Scalars['String'] | string>>,
    rating?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['Float'] | string>,
    title?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['String'] | string>,
    trailDifficulty?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['String'] | string>,
    visitDate?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['String'] | string>
  },
  ScheduleItem?: {
    description?: GraphCacheResolver<WithTypename<ScheduleItem>, Record<string, never>, Scalars['String'] | string>,
    time?: GraphCacheResolver<WithTypename<ScheduleItem>, Record<string, never>, Scalars['String'] | string>,
    title?: GraphCacheResolver<WithTypename<ScheduleItem>, Record<string, never>, Scalars['String'] | string>
  },
  SocialMedia?: {
    facebook?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>,
    instagram?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>,
    twitter?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>,
    youtube?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>
  },
  Trail?: {
    description?: GraphCacheResolver<WithTypename<Trail>, Record<string, never>, Scalars['String'] | string>,
    difficulty?: GraphCacheResolver<WithTypename<Trail>, Record<string, never>, Scalars['String'] | string>,
    features?: GraphCacheResolver<WithTypename<Trail>, Record<string, never>, Array<Scalars['String'] | string>>,
    id?: GraphCacheResolver<WithTypename<Trail>, Record<string, never>, Scalars['ID'] | string>,
    imageUrl?: GraphCacheResolver<WithTypename<Trail>, Record<string, never>, Scalars['String'] | string>,
    length?: GraphCacheResolver<WithTypename<Trail>, Record<string, never>, Scalars['Float'] | string>,
    name?: GraphCacheResolver<WithTypename<Trail>, Record<string, never>, Scalars['String'] | string>,
    status?: GraphCacheResolver<WithTypename<Trail>, Record<string, never>, Scalars['String'] | string>,
    verticalDrop?: GraphCacheResolver<WithTypename<Trail>, Record<string, never>, Scalars['Float'] | string>
  },
  User?: {
    createdAt?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    email?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    firstName?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['ID'] | string>,
    lastName?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    role?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    username?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>
  },
  Venue?: {
    address?: GraphCacheResolver<WithTypename<Venue>, Record<string, never>, Scalars['String'] | string>,
    mapImageUrl?: GraphCacheResolver<WithTypename<Venue>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<Venue>, Record<string, never>, Scalars['String'] | string>
  },
  Weather?: {
    current?: GraphCacheResolver<WithTypename<Weather>, Record<string, never>, WithTypename<WeatherData> | string>,
    forecast?: GraphCacheResolver<WithTypename<Weather>, Record<string, never>, Array<WithTypename<WeatherData> | string>>,
    lastUpdated?: GraphCacheResolver<WithTypename<Weather>, Record<string, never>, Scalars['String'] | string>
  },
  WeatherData?: {
    date?: GraphCacheResolver<WithTypename<WeatherData>, Record<string, never>, Scalars['String'] | string>,
    description?: GraphCacheResolver<WithTypename<WeatherData>, Record<string, never>, Scalars['String'] | string>,
    feelsLike?: GraphCacheResolver<WithTypename<WeatherData>, Record<string, never>, Scalars['Float'] | string>,
    humidity?: GraphCacheResolver<WithTypename<WeatherData>, Record<string, never>, Scalars['Int'] | string>,
    icon?: GraphCacheResolver<WithTypename<WeatherData>, Record<string, never>, Scalars['String'] | string>,
    precipitation?: GraphCacheResolver<WithTypename<WeatherData>, Record<string, never>, Scalars['Float'] | string>,
    temperature?: GraphCacheResolver<WithTypename<WeatherData>, Record<string, never>, Scalars['Float'] | string>,
    uvIndex?: GraphCacheResolver<WithTypename<WeatherData>, Record<string, never>, Scalars['Float'] | string>,
    windSpeed?: GraphCacheResolver<WithTypename<WeatherData>, Record<string, never>, Scalars['Float'] | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  createBikePark?: GraphCacheOptimisticMutationResolver<MutationCreateBikeParkArgs, WithTypename<BikePark>>,
  createEvent?: GraphCacheOptimisticMutationResolver<MutationCreateEventArgs, WithTypename<Event>>,
  createReview?: GraphCacheOptimisticMutationResolver<MutationCreateReviewArgs, WithTypename<Review>>,
  deleteBikePark?: GraphCacheOptimisticMutationResolver<MutationDeleteBikeParkArgs, Scalars['Boolean']>,
  deleteEvent?: GraphCacheOptimisticMutationResolver<MutationDeleteEventArgs, Scalars['Boolean']>,
  deleteReview?: GraphCacheOptimisticMutationResolver<MutationDeleteReviewArgs, Scalars['Boolean']>,
  login?: GraphCacheOptimisticMutationResolver<MutationLoginArgs, WithTypename<AuthPayload>>,
  register?: GraphCacheOptimisticMutationResolver<MutationRegisterArgs, WithTypename<AuthPayload>>,
  registerForEvent?: GraphCacheOptimisticMutationResolver<MutationRegisterForEventArgs, WithTypename<Event>>,
  updateBikePark?: GraphCacheOptimisticMutationResolver<MutationUpdateBikeParkArgs, WithTypename<BikePark>>,
  updateEvent?: GraphCacheOptimisticMutationResolver<MutationUpdateEventArgs, WithTypename<Event>>,
  updateProfile?: GraphCacheOptimisticMutationResolver<MutationUpdateProfileArgs, WithTypename<User>>,
  updateReview?: GraphCacheOptimisticMutationResolver<MutationUpdateReviewArgs, WithTypename<Review>>
};

export type GraphCacheUpdaters = {
  Query?: {
    bikePark?: GraphCacheUpdateResolver<{ bikePark: Maybe<WithTypename<BikePark>> }, QueryBikeParkArgs>,
    bikeParks?: GraphCacheUpdateResolver<{ bikeParks: WithTypename<PaginatedBikeParks> }, QueryBikeParksArgs>,
    bikeParksByViewport?: GraphCacheUpdateResolver<{ bikeParksByViewport: Array<WithTypename<BikePark>> }, QueryBikeParksByViewportArgs>,
    event?: GraphCacheUpdateResolver<{ event: Maybe<WithTypename<Event>> }, QueryEventArgs>,
    events?: GraphCacheUpdateResolver<{ events: Array<WithTypename<Event>> }, QueryEventsArgs>,
    me?: GraphCacheUpdateResolver<{ me: Maybe<WithTypename<User>> }, Record<string, never>>,
    popularEventCategories?: GraphCacheUpdateResolver<{ popularEventCategories: Array<WithTypename<CategoryInfo>> }, Record<string, never>>,
    reviews?: GraphCacheUpdateResolver<{ reviews: WithTypename<PaginatedReviews> }, QueryReviewsArgs>,
    searchBikeParks?: GraphCacheUpdateResolver<{ searchBikeParks: Array<WithTypename<BikePark>> }, QuerySearchBikeParksArgs>
  },
  Mutation?: {
    createBikePark?: GraphCacheUpdateResolver<{ createBikePark: WithTypename<BikePark> }, MutationCreateBikeParkArgs>,
    createEvent?: GraphCacheUpdateResolver<{ createEvent: WithTypename<Event> }, MutationCreateEventArgs>,
    createReview?: GraphCacheUpdateResolver<{ createReview: WithTypename<Review> }, MutationCreateReviewArgs>,
    deleteBikePark?: GraphCacheUpdateResolver<{ deleteBikePark: Scalars['Boolean'] }, MutationDeleteBikeParkArgs>,
    deleteEvent?: GraphCacheUpdateResolver<{ deleteEvent: Scalars['Boolean'] }, MutationDeleteEventArgs>,
    deleteReview?: GraphCacheUpdateResolver<{ deleteReview: Scalars['Boolean'] }, MutationDeleteReviewArgs>,
    login?: GraphCacheUpdateResolver<{ login: WithTypename<AuthPayload> }, MutationLoginArgs>,
    register?: GraphCacheUpdateResolver<{ register: WithTypename<AuthPayload> }, MutationRegisterArgs>,
    registerForEvent?: GraphCacheUpdateResolver<{ registerForEvent: WithTypename<Event> }, MutationRegisterForEventArgs>,
    updateBikePark?: GraphCacheUpdateResolver<{ updateBikePark: WithTypename<BikePark> }, MutationUpdateBikeParkArgs>,
    updateEvent?: GraphCacheUpdateResolver<{ updateEvent: WithTypename<Event> }, MutationUpdateEventArgs>,
    updateProfile?: GraphCacheUpdateResolver<{ updateProfile: WithTypename<User> }, MutationUpdateProfileArgs>,
    updateReview?: GraphCacheUpdateResolver<{ updateReview: WithTypename<Review> }, MutationUpdateReviewArgs>
  },
  Subscription?: {},
  AuthPayload?: {
    token?: GraphCacheUpdateResolver<Maybe<WithTypename<AuthPayload>>, Record<string, never>>,
    user?: GraphCacheUpdateResolver<Maybe<WithTypename<AuthPayload>>, Record<string, never>>
  },
  BikePark?: {
    address?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    contact?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    coordinates?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    createdBy?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    description?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    difficulty?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    facilities?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    features?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    imageUrl?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    lastUpdated?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    location?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    openingHours?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    photos?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    price?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    rating?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    reviews?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    rules?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    socialMedia?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    status?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    trails?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    videos?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    weather?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    website?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>
  },
  CategoryInfo?: {
    count?: GraphCacheUpdateResolver<Maybe<WithTypename<CategoryInfo>>, Record<string, never>>,
    imageUrl?: GraphCacheUpdateResolver<Maybe<WithTypename<CategoryInfo>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<CategoryInfo>>, Record<string, never>>
  },
  Contact?: {
    email?: GraphCacheUpdateResolver<Maybe<WithTypename<Contact>>, Record<string, never>>,
    phone?: GraphCacheUpdateResolver<Maybe<WithTypename<Contact>>, Record<string, never>>
  },
  Coordinates?: {
    latitude?: GraphCacheUpdateResolver<Maybe<WithTypename<Coordinates>>, Record<string, never>>,
    longitude?: GraphCacheUpdateResolver<Maybe<WithTypename<Coordinates>>, Record<string, never>>
  },
  Event?: {
    attendeeCount?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    availableTickets?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    capacity?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    category?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    date?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    description?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    endTime?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    featured?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    imageUrl?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    location?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    organizer?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    price?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    registrationEndDate?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    schedule?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    startTime?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    title?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    venue?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>
  },
  OpeningHours?: {
    friday?: GraphCacheUpdateResolver<Maybe<WithTypename<OpeningHours>>, Record<string, never>>,
    monday?: GraphCacheUpdateResolver<Maybe<WithTypename<OpeningHours>>, Record<string, never>>,
    saturday?: GraphCacheUpdateResolver<Maybe<WithTypename<OpeningHours>>, Record<string, never>>,
    sunday?: GraphCacheUpdateResolver<Maybe<WithTypename<OpeningHours>>, Record<string, never>>,
    thursday?: GraphCacheUpdateResolver<Maybe<WithTypename<OpeningHours>>, Record<string, never>>,
    tuesday?: GraphCacheUpdateResolver<Maybe<WithTypename<OpeningHours>>, Record<string, never>>,
    wednesday?: GraphCacheUpdateResolver<Maybe<WithTypename<OpeningHours>>, Record<string, never>>
  },
  Organizer?: {
    description?: GraphCacheUpdateResolver<Maybe<WithTypename<Organizer>>, Record<string, never>>,
    imageUrl?: GraphCacheUpdateResolver<Maybe<WithTypename<Organizer>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Organizer>>, Record<string, never>>
  },
  PaginatedBikeParks?: {
    bikeParks?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>,
    currentPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>,
    hasNextPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>,
    totalCount?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>,
    totalPages?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>
  },
  PaginatedReviews?: {
    currentPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedReviews>>, Record<string, never>>,
    hasNextPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedReviews>>, Record<string, never>>,
    reviews?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedReviews>>, Record<string, never>>,
    totalCount?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedReviews>>, Record<string, never>>,
    totalPages?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedReviews>>, Record<string, never>>
  },
  Price?: {
    amount?: GraphCacheUpdateResolver<Maybe<WithTypename<Price>>, Record<string, never>>,
    currency?: GraphCacheUpdateResolver<Maybe<WithTypename<Price>>, Record<string, never>>
  },
  Review?: {
    bikePark?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    comment?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    createdBy?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    photos?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    rating?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    title?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    trailDifficulty?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    visitDate?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>
  },
  ScheduleItem?: {
    description?: GraphCacheUpdateResolver<Maybe<WithTypename<ScheduleItem>>, Record<string, never>>,
    time?: GraphCacheUpdateResolver<Maybe<WithTypename<ScheduleItem>>, Record<string, never>>,
    title?: GraphCacheUpdateResolver<Maybe<WithTypename<ScheduleItem>>, Record<string, never>>
  },
  SocialMedia?: {
    facebook?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>,
    instagram?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>,
    twitter?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>,
    youtube?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>
  },
  Trail?: {
    description?: GraphCacheUpdateResolver<Maybe<WithTypename<Trail>>, Record<string, never>>,
    difficulty?: GraphCacheUpdateResolver<Maybe<WithTypename<Trail>>, Record<string, never>>,
    features?: GraphCacheUpdateResolver<Maybe<WithTypename<Trail>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<Trail>>, Record<string, never>>,
    imageUrl?: GraphCacheUpdateResolver<Maybe<WithTypename<Trail>>, Record<string, never>>,
    length?: GraphCacheUpdateResolver<Maybe<WithTypename<Trail>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Trail>>, Record<string, never>>,
    status?: GraphCacheUpdateResolver<Maybe<WithTypename<Trail>>, Record<string, never>>,
    verticalDrop?: GraphCacheUpdateResolver<Maybe<WithTypename<Trail>>, Record<string, never>>
  },
  User?: {
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    email?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    firstName?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    lastName?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    role?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    username?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>
  },
  Venue?: {
    address?: GraphCacheUpdateResolver<Maybe<WithTypename<Venue>>, Record<string, never>>,
    mapImageUrl?: GraphCacheUpdateResolver<Maybe<WithTypename<Venue>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Venue>>, Record<string, never>>
  },
  Weather?: {
    current?: GraphCacheUpdateResolver<Maybe<WithTypename<Weather>>, Record<string, never>>,
    forecast?: GraphCacheUpdateResolver<Maybe<WithTypename<Weather>>, Record<string, never>>,
    lastUpdated?: GraphCacheUpdateResolver<Maybe<WithTypename<Weather>>, Record<string, never>>
  },
  WeatherData?: {
    date?: GraphCacheUpdateResolver<Maybe<WithTypename<WeatherData>>, Record<string, never>>,
    description?: GraphCacheUpdateResolver<Maybe<WithTypename<WeatherData>>, Record<string, never>>,
    feelsLike?: GraphCacheUpdateResolver<Maybe<WithTypename<WeatherData>>, Record<string, never>>,
    humidity?: GraphCacheUpdateResolver<Maybe<WithTypename<WeatherData>>, Record<string, never>>,
    icon?: GraphCacheUpdateResolver<Maybe<WithTypename<WeatherData>>, Record<string, never>>,
    precipitation?: GraphCacheUpdateResolver<Maybe<WithTypename<WeatherData>>, Record<string, never>>,
    temperature?: GraphCacheUpdateResolver<Maybe<WithTypename<WeatherData>>, Record<string, never>>,
    uvIndex?: GraphCacheUpdateResolver<Maybe<WithTypename<WeatherData>>, Record<string, never>>,
    windSpeed?: GraphCacheUpdateResolver<Maybe<WithTypename<WeatherData>>, Record<string, never>>
  },
};

export type GraphCacheConfig = Parameters<typeof cacheExchange>[0] & {
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
};
export const BikeParkFragmentDoc = gql`
    fragment BikePark on BikePark {
  id
  name
  description
  location
  imageUrl
  difficulty
  status
  features
  coordinates {
    latitude
    longitude
  }
}
    `;
export const EventFragmentDoc = gql`
    fragment Event on Event {
  id
  attendeeCount
  capacity
  category
  date
  description
  featured
  imageUrl
  location
  organizer {
    name
    description
    imageUrl
  }
  price
  title
}
    `;
export const CreateReviewDocument = gql`
    mutation CreateReview($bikeParkId: ID!, $title: String, $rating: Float!, $comment: String!, $visitDate: String, $trailDifficulty: String, $photos: [String]) {
  createReview(
    bikeParkId: $bikeParkId
    title: $title
    rating: $rating
    comment: $comment
    visitDate: $visitDate
    trailDifficulty: $trailDifficulty
    photos: $photos
  ) {
    id
    title
    comment
    rating
    bikePark
    createdAt
    createdBy {
      id
      username
      email
    }
    updatedAt
  }
}
    `;

export function useCreateReviewMutation() {
  return Urql.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
  register(
    username: $username
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
    confirmPassword: $confirmPassword
  ) {
    token
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetBikeParkDocument = gql`
    query GetBikePark($id: ID!) {
  bikePark(id: $id) {
    id
    name
    description
    location
    imageUrl
    difficulty
    status
    features
    coordinates {
      latitude
      longitude
    }
    contact {
      email
      phone
    }
    facilities
    openingHours {
      friday
      monday
      saturday
      sunday
      thursday
      tuesday
      wednesday
    }
    photos
    price {
      amount
      currency
    }
    rating
    rules
    status
    videos
    website
    socialMedia {
      facebook
      instagram
      twitter
      youtube
    }
    weather {
      current {
        description
        feelsLike
        humidity
        icon
        precipitation
        temperature
        uvIndex
        windSpeed
      }
      forecast {
        date
        description
        feelsLike
        humidity
        icon
        precipitation
        temperature
        uvIndex
        windSpeed
      }
    }
    trails {
      id
      imageUrl
      length
      name
      status
      verticalDrop
      features
      difficulty
      description
    }
    reviews {
      id
      title
      comment
      rating
      createdAt
      createdBy {
        id
        username
        email
      }
      updatedAt
    }
  }
}
    `;

export function useGetBikeParkQuery(options: Omit<Urql.UseQueryArgs<GetBikeParkQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBikeParkQuery, GetBikeParkQueryVariables>({ query: GetBikeParkDocument, ...options });
};
export const GetBikeParksDocument = gql`
    query GetBikeParks($filter: BikeParkFilter) {
  bikeParks(filter: $filter) {
    bikeParks {
      id
      name
      description
      location
      imageUrl
      difficulty
      status
      features
      coordinates {
        latitude
        longitude
      }
      weather {
        current {
          description
          feelsLike
          humidity
          icon
          precipitation
          temperature
          uvIndex
          windSpeed
        }
      }
    }
    totalCount
    currentPage
    totalPages
    hasNextPage
  }
}
    `;

export function useGetBikeParksQuery(options?: Omit<Urql.UseQueryArgs<GetBikeParksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBikeParksQuery, GetBikeParksQueryVariables>({ query: GetBikeParksDocument, ...options });
};
export const GetBikeParksByViewportDocument = gql`
    query GetBikeParksByViewport($viewport: ViewportInput!, $searchQuery: String) {
  bikeParksByViewport(viewport: $viewport, searchQuery: $searchQuery) {
    ...BikePark
  }
}
    ${BikeParkFragmentDoc}`;

export function useGetBikeParksByViewportQuery(options: Omit<Urql.UseQueryArgs<GetBikeParksByViewportQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBikeParksByViewportQuery, GetBikeParksByViewportQueryVariables>({ query: GetBikeParksByViewportDocument, ...options });
};
export const GetEventDocument = gql`
    query GetEvent($id: ID!) {
  event(id: $id) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

export function useGetEventQuery(options: Omit<Urql.UseQueryArgs<GetEventQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEventQuery, GetEventQueryVariables>({ query: GetEventDocument, ...options });
};
export const GetEventsDocument = gql`
    query GetEvents($filter: EventFilter) {
  events(filter: $filter) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

export function useGetEventsQuery(options?: Omit<Urql.UseQueryArgs<GetEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEventsQuery, GetEventsQueryVariables>({ query: GetEventsDocument, ...options });
};
export const GetPopularEventCategoriesDocument = gql`
    query GetPopularEventCategories {
  popularEventCategories {
    name
    count
    imageUrl
  }
}
    `;

export function useGetPopularEventCategoriesQuery(options?: Omit<Urql.UseQueryArgs<GetPopularEventCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPopularEventCategoriesQuery, GetPopularEventCategoriesQueryVariables>({ query: GetPopularEventCategoriesDocument, ...options });
};
export const GetReviewsDocument = gql`
    query GetReviews($bikeParkId: ID!, $page: Int, $limit: Int) {
  reviews(bikeParkId: $bikeParkId, page: $page, limit: $limit) {
    reviews {
      id
      comment
      createdAt
      createdBy {
        id
        username
      }
      rating
      title
      trailDifficulty
      visitDate
    }
    totalCount
    currentPage
    totalPages
    hasNextPage
  }
}
    `;

export function useGetReviewsQuery(options: Omit<Urql.UseQueryArgs<GetReviewsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetReviewsQuery, GetReviewsQueryVariables>({ query: GetReviewsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    firstName
    lastName
    email
    role
    createdAt
    updatedAt
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const namedOperations = {
  Query: {
    GetBikePark: 'GetBikePark',
    GetBikeParks: 'GetBikeParks',
    GetBikeParksByViewport: 'GetBikeParksByViewport',
    GetEvent: 'GetEvent',
    GetEvents: 'GetEvents',
    GetPopularEventCategories: 'GetPopularEventCategories',
    GetReviews: 'GetReviews',
    Me: 'Me'
  },
  Mutation: {
    CreateReview: 'CreateReview',
    Login: 'Login',
    Register: 'Register'
  },
  Fragment: {
    BikePark: 'BikePark',
    Event: 'Event'
  }
}