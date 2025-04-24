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
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export enum ApprovalStatus {
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  WaitingForApproval = 'WAITING_FOR_APPROVAL'
}

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type BikePark = {
  __typename?: 'BikePark';
  address?: Maybe<Scalars['String']['output']>;
  approvalStatus?: Maybe<ApprovalStatus>;
  contact?: Maybe<Contact>;
  coordinates?: Maybe<Coordinates>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['String']['output']>;
  facilities?: Maybe<Array<Scalars['String']['output']>>;
  features?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isFavorite?: Maybe<Scalars['Boolean']['output']>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  openingHours?: Maybe<OpeningHours>;
  photos?: Maybe<Array<Scalars['String']['output']>>;
  prices?: Maybe<Array<Maybe<Price>>>;
  rating?: Maybe<Scalars['Float']['output']>;
  reviews?: Maybe<Array<Review>>;
  rules?: Maybe<Array<Scalars['String']['output']>>;
  socialMedia?: Maybe<SocialMedia>;
  status?: Maybe<Scalars['String']['output']>;
  trails?: Maybe<Array<Trail>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  videos?: Maybe<Array<Scalars['String']['output']>>;
  weather?: Maybe<Weather>;
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
  name: EventCategory;
};

export type Contact = {
  __typename?: 'Contact';
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type ContactInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
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

export type CreateBikeParkInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<ContactInput>;
  coordinates: CoordinatesInput;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  facilities?: InputMaybe<Array<Scalars['String']['input']>>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  openingHours?: InputMaybe<OpeningHoursInput>;
  photos?: InputMaybe<Array<Scalars['String']['input']>>;
  prices?: InputMaybe<Array<InputMaybe<PriceInput>>>;
  rules?: InputMaybe<Array<Scalars['String']['input']>>;
  socialMedia?: InputMaybe<SocialMediaInput>;
  status?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateEventInput = {
  capacity: Scalars['Int']['input'];
  category: EventCategory;
  date: Scalars['Date']['input'];
  description: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl: Scalars['String']['input'];
  location: Scalars['String']['input'];
  organizer: OrganizerInput;
  price: Scalars['Float']['input'];
  registrationEndDate: Scalars['Date']['input'];
  schedule: Array<ScheduleItemInput>;
  startTime: Scalars['String']['input'];
  title: Scalars['String']['input'];
  venue: VenueInput;
};

export type Event = {
  __typename?: 'Event';
  approvalStatus?: Maybe<ApprovalStatus>;
  attendeeCount: Scalars['Int']['output'];
  availableTickets: Scalars['Int']['output'];
  capacity: Scalars['Int']['output'];
  category: EventCategory;
  coordinates?: Maybe<Coordinates>;
  createdAt: Scalars['Date']['output'];
  createdBy?: Maybe<User>;
  date: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  featured: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  location: Scalars['String']['output'];
  organizer: Organizer;
  price: Scalars['Float']['output'];
  registrationEndDate: Scalars['Date']['output'];
  schedule: Array<ScheduleItem>;
  startTime: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
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
  location?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<EventPeriod>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum EventPeriod {
  All = 'ALL',
  NextMonth = 'NEXT_MONTH',
  ThisMonth = 'THIS_MONTH',
  ThisWeek = 'THIS_WEEK'
}

export enum EventStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Ongoing = 'ONGOING',
  Upcoming = 'UPCOMING'
}

export type ImageUploadResponse = {
  __typename?: 'ImageUploadResponse';
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveBikePark: BikePark;
  approveEvent: Event;
  createBikePark: BikePark;
  createEvent: Event;
  createReview: Review;
  deleteBikePark: Scalars['Boolean']['output'];
  deleteEvent: Scalars['Boolean']['output'];
  deleteReview: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  googleLogin: AuthPayload;
  login: AuthPayload;
  register: AuthPayload;
  registerForEvent: Event;
  rejectBikePark: BikePark;
  rejectEvent: Event;
  resetPassword: AuthPayload;
  toggleFavoriteBikePark: User;
  updateBikePark: BikePark;
  updateEvent: Event;
  updateProfile: User;
  updateReview: Review;
  uploadImage: ImageUploadResponse;
};


export type MutationApproveBikeParkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationApproveEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateBikeParkArgs = {
  input: CreateBikeParkInput;
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


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationGoogleLoginArgs = {
  idToken: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
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


export type MutationRejectBikeParkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRejectEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationToggleFavoriteBikeParkArgs = {
  bikeParkId: Scalars['ID']['input'];
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


export type MutationUploadImageArgs = {
  file: Scalars['Upload']['input'];
};

export type Notifications = {
  __typename?: 'Notifications';
  email?: Maybe<Scalars['Boolean']['output']>;
  push?: Maybe<Scalars['Boolean']['output']>;
};

export type OpeningHours = {
  __typename?: 'OpeningHours';
  friday?: Maybe<OpeningHoursDay>;
  monday?: Maybe<OpeningHoursDay>;
  saturday?: Maybe<OpeningHoursDay>;
  sunday?: Maybe<OpeningHoursDay>;
  thursday?: Maybe<OpeningHoursDay>;
  tuesday?: Maybe<OpeningHoursDay>;
  wednesday?: Maybe<OpeningHoursDay>;
};

export type OpeningHoursDay = {
  __typename?: 'OpeningHoursDay';
  from?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};

export type OpeningHoursDayInput = {
  from?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
};

export type OpeningHoursInput = {
  friday?: InputMaybe<OpeningHoursDayInput>;
  monday?: InputMaybe<OpeningHoursDayInput>;
  saturday?: InputMaybe<OpeningHoursDayInput>;
  sunday?: InputMaybe<OpeningHoursDayInput>;
  thursday?: InputMaybe<OpeningHoursDayInput>;
  tuesday?: InputMaybe<OpeningHoursDayInput>;
  wednesday?: InputMaybe<OpeningHoursDayInput>;
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

export type Preferences = {
  __typename?: 'Preferences';
  preferredBikeType?: Maybe<Scalars['String']['output']>;
  preferredBikes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  ridingStyles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  skillLevel?: Maybe<Scalars['String']['output']>;
};

export type Price = {
  __typename?: 'Price';
  currency: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type PriceInput = {
  currency: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Scalars['Boolean']['output']>;
  preferences?: Maybe<Preferences>;
  socialMedia?: Maybe<SocialMedia>;
};

export type Query = {
  __typename?: 'Query';
  bikePark?: Maybe<BikePark>;
  bikeParks: PaginatedBikeParks;
  bikeParksByViewport: Array<BikePark>;
  event?: Maybe<Event>;
  events: Array<Event>;
  favoriteBikeParks?: Maybe<Array<Maybe<BikePark>>>;
  me?: Maybe<User>;
  mostCommonFacilities?: Maybe<Array<Scalars['String']['output']>>;
  mostCommonFeatures?: Maybe<Array<Scalars['String']['output']>>;
  mostCommonRules?: Maybe<Array<Scalars['String']['output']>>;
  pendingBikeParks: Array<BikePark>;
  pendingEvents: Array<Event>;
  popularEventCategories: Array<CategoryInfo>;
  reviews: PaginatedReviews;
  reviewsByUser: PaginatedReviews;
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


export type QueryMostCommonFacilitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMostCommonFeaturesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMostCommonRulesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPendingBikeParksArgs = {
  status?: InputMaybe<ApprovalStatus>;
};


export type QueryPendingEventsArgs = {
  status?: InputMaybe<ApprovalStatus>;
};


export type QueryReviewsArgs = {
  bikeParkId: Scalars['ID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReviewsByUserArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
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
  strava?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type SocialMediaInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  strava?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
};

export type Stats = {
  __typename?: 'Stats';
  favoriteParks?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  favoriteTrails?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  totalReviews?: Maybe<Scalars['Int']['output']>;
  totalRides?: Maybe<Scalars['Int']['output']>;
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
  prices?: InputMaybe<Array<InputMaybe<PriceInput>>>;
  rules?: InputMaybe<Array<Scalars['String']['input']>>;
  socialMedia?: InputMaybe<SocialMediaInput>;
  status?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateEventInput = {
  capacity?: InputMaybe<Scalars['Int']['input']>;
  category?: InputMaybe<EventCategory>;
  date?: InputMaybe<Scalars['Date']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  organizer?: InputMaybe<OrganizerInput>;
  price?: InputMaybe<Scalars['Float']['input']>;
  registrationEndDate?: InputMaybe<Scalars['Date']['input']>;
  schedule?: InputMaybe<Array<ScheduleItemInput>>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  venue?: InputMaybe<VenueInput>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  googleId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastLogin?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Notifications>;
  profile?: Maybe<Profile>;
  role: Scalars['String']['output'];
  stats?: Maybe<Stats>;
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

export type EventFragment = { __typename?: 'Event', id: string, attendeeCount: number, capacity: number, category: EventCategory, date: any, description: string, featured: boolean, imageUrl: string, location: string, price: number, title: string, organizer: { __typename?: 'Organizer', name: string, description: string, imageUrl: string } };

export type ApproveBikeParkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ApproveBikeParkMutation = { __typename?: 'Mutation', approveBikePark: { __typename?: 'BikePark', id: string, name: string, approvalStatus?: ApprovalStatus | null } };

export type ApproveEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ApproveEventMutation = { __typename?: 'Mutation', approveEvent: { __typename?: 'Event', id: string, title: string, approvalStatus?: ApprovalStatus | null } };

export type CreateBikeParkMutationVariables = Exact<{
  input: CreateBikeParkInput;
}>;


export type CreateBikeParkMutation = { __typename?: 'Mutation', createBikePark: { __typename?: 'BikePark', id: string, name: string, location?: string | null } };

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

export type DeleteBikeParkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBikeParkMutation = { __typename?: 'Mutation', deleteBikePark: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type GoogleLoginMutationVariables = Exact<{
  idToken: Scalars['String']['input'];
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, username: string, email: string } } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
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

export type RejectBikeParkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RejectBikeParkMutation = { __typename?: 'Mutation', rejectBikePark: { __typename?: 'BikePark', id: string, name: string, approvalStatus?: ApprovalStatus | null } };

export type RejectEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RejectEventMutation = { __typename?: 'Mutation', rejectEvent: { __typename?: 'Event', id: string, title: string, approvalStatus?: ApprovalStatus | null } };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, username: string, email: string } } };

export type ToggleFavoriteBikeParkMutationVariables = Exact<{
  bikeParkId: Scalars['ID']['input'];
}>;


export type ToggleFavoriteBikeParkMutation = { __typename?: 'Mutation', toggleFavoriteBikePark: { __typename?: 'User', id: string, stats?: { __typename?: 'Stats', favoriteParks?: Array<string | null> | null } | null } };

export type UpdateBikeParkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateBikeParkInput;
}>;


export type UpdateBikeParkMutation = { __typename?: 'Mutation', updateBikePark: { __typename?: 'BikePark', id: string, name: string, location?: string | null } };

export type UploadImageMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: { __typename?: 'ImageUploadResponse', url: string, key: string } };

export type BikeParkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type BikeParkQuery = { __typename?: 'Query', bikePark?: { __typename?: 'BikePark', id: string, name: string, description?: string | null, location?: string | null, imageUrl?: string | null, difficulty?: string | null, status?: string | null, features?: Array<string> | null, facilities?: Array<string> | null, photos?: Array<string> | null, rating?: number | null, rules?: Array<string> | null, videos?: Array<string> | null, isFavorite?: boolean | null, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null, contact?: { __typename?: 'Contact', email?: string | null, phone?: string | null, website?: string | null } | null, openingHours?: { __typename?: 'OpeningHours', monday?: { __typename?: 'OpeningHoursDay', from?: string | null, to?: string | null } | null, tuesday?: { __typename?: 'OpeningHoursDay', from?: string | null, to?: string | null } | null, wednesday?: { __typename?: 'OpeningHoursDay', from?: string | null, to?: string | null } | null, thursday?: { __typename?: 'OpeningHoursDay', from?: string | null, to?: string | null } | null, friday?: { __typename?: 'OpeningHoursDay', from?: string | null, to?: string | null } | null, saturday?: { __typename?: 'OpeningHoursDay', from?: string | null, to?: string | null } | null, sunday?: { __typename?: 'OpeningHoursDay', from?: string | null, to?: string | null } | null } | null, prices?: Array<{ __typename?: 'Price', name: string, price: number, currency: string } | null> | null, socialMedia?: { __typename?: 'SocialMedia', facebook?: string | null, instagram?: string | null, youtube?: string | null, strava?: string | null } | null, weather?: { __typename?: 'Weather', current?: { __typename?: 'WeatherData', description?: string | null, feelsLike?: number | null, humidity?: number | null, icon?: string | null, precipitation?: number | null, temperature?: number | null, uvIndex?: number | null, windSpeed?: number | null } | null, forecast?: Array<{ __typename?: 'WeatherData', date?: string | null, description?: string | null, feelsLike?: number | null, humidity?: number | null, icon?: string | null, precipitation?: number | null, temperature?: number | null, uvIndex?: number | null, windSpeed?: number | null } | null> | null } | null, trails?: Array<{ __typename?: 'Trail', id: string, imageUrl?: string | null, length: number, name: string, status: string, verticalDrop: number, features?: Array<string> | null, difficulty: string, description?: string | null }> | null, reviews?: Array<{ __typename?: 'Review', id: string, title?: string | null, comment: string, rating: number, createdAt: string, updatedAt?: string | null, createdBy: { __typename?: 'User', id: string, username: string, email: string } }> | null, createdBy?: { __typename?: 'User', id: string, role: string, username: string, email: string, isVerified?: boolean | null } | null } | null };

export type BikeParksQueryVariables = Exact<{
  filter?: InputMaybe<BikeParkFilter>;
}>;


export type BikeParksQuery = { __typename?: 'Query', bikeParks: { __typename?: 'PaginatedBikeParks', totalCount: number, currentPage: number, totalPages: number, hasNextPage: boolean, bikeParks: Array<{ __typename?: 'BikePark', id: string, name: string, description?: string | null, location?: string | null, imageUrl?: string | null, difficulty?: string | null, status?: string | null, features?: Array<string> | null, rating?: number | null, isFavorite?: boolean | null, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null }> } };

export type BikeParksByViewportQueryVariables = Exact<{
  viewport: ViewportInput;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
}>;


export type BikeParksByViewportQuery = { __typename?: 'Query', bikeParksByViewport: Array<{ __typename?: 'BikePark', id: string, name: string, imageUrl?: string | null, location?: string | null, rating?: number | null, features?: Array<string> | null, difficulty?: string | null, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null }> };

export type EventQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, title: string, date: any, startTime: string, endTime: string, location: string, category: EventCategory, price: number, imageUrl: string, description: string, capacity: number, registrationEndDate: any, availableTickets: number, attendeeCount: number, featured: boolean, createdAt: any, updatedAt: any, organizer: { __typename?: 'Organizer', name: string, description: string, imageUrl: string }, schedule: Array<{ __typename?: 'ScheduleItem', title: string, time: string, description: string }>, venue: { __typename?: 'Venue', name: string, address: string, mapImageUrl: string }, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null } | null };

export type EventsQueryVariables = Exact<{
  filter?: InputMaybe<EventFilter>;
}>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: string, attendeeCount: number, capacity: number, category: EventCategory, date: any, description: string, featured: boolean, imageUrl: string, location: string, price: number, title: string, organizer: { __typename?: 'Organizer', name: string, description: string, imageUrl: string } }> };

export type FavoriteBikeParksQueryVariables = Exact<{ [key: string]: never; }>;


export type FavoriteBikeParksQuery = { __typename?: 'Query', favoriteBikeParks?: Array<{ __typename?: 'BikePark', id: string, name: string, location?: string | null, imageUrl?: string | null, difficulty?: string | null, rating?: number | null, isFavorite?: boolean | null, reviews?: Array<{ __typename?: 'Review', id: string }> | null } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, username: string, role: string, profile?: { __typename?: 'Profile', firstName: string, lastName: string, location?: string | null, preferences?: { __typename?: 'Preferences', ridingStyles?: Array<string | null> | null, skillLevel?: string | null, preferredBikes?: Array<string | null> | null } | null, socialMedia?: { __typename?: 'SocialMedia', facebook?: string | null, instagram?: string | null, youtube?: string | null, strava?: string | null } | null } | null, stats?: { __typename?: 'Stats', favoriteParks?: Array<string | null> | null, favoriteTrails?: Array<string | null> | null, totalReviews?: number | null, totalRides?: number | null } | null } | null };

export type GetPendingBikeParksQueryVariables = Exact<{
  status?: InputMaybe<ApprovalStatus>;
}>;


export type GetPendingBikeParksQuery = { __typename?: 'Query', pendingBikeParks: Array<{ __typename?: 'BikePark', id: string, name: string, location?: string | null, imageUrl?: string | null, createdAt?: any | null, approvalStatus?: ApprovalStatus | null, createdBy?: { __typename?: 'User', id: string, username: string, email: string } | null }> };

export type GetPendingEventsQueryVariables = Exact<{
  status?: InputMaybe<ApprovalStatus>;
}>;


export type GetPendingEventsQuery = { __typename?: 'Query', pendingEvents: Array<{ __typename?: 'Event', id: string, title: string, location: string, imageUrl: string, date: any, createdAt: any, startTime: string, endTime: string, approvalStatus?: ApprovalStatus | null, createdBy?: { __typename?: 'User', id: string, username: string, email: string } | null, organizer: { __typename?: 'Organizer', description: string, imageUrl: string, name: string }, venue: { __typename?: 'Venue', address: string, mapImageUrl: string, name: string } }> };

export type PopularEventCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularEventCategoriesQuery = { __typename?: 'Query', popularEventCategories: Array<{ __typename?: 'CategoryInfo', count: number, imageUrl: string, name: EventCategory }> };

export type ReviewsQueryVariables = Exact<{
  bikeParkId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews: { __typename?: 'PaginatedReviews', totalCount: number, currentPage: number, totalPages: number, hasNextPage: boolean, reviews: Array<{ __typename?: 'Review', id: string, comment: string, createdAt: string, rating: number, title?: string | null, trailDifficulty?: string | null, visitDate?: string | null, createdBy: { __typename?: 'User', id: string, username: string } }> } };

export type ReviewsByUserQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ReviewsByUserQuery = { __typename?: 'Query', reviewsByUser: { __typename?: 'PaginatedReviews', reviews: Array<{ __typename?: 'Review', id: string, createdAt: string, comment: string, rating: number, title?: string | null, createdBy: { __typename?: 'User', id: string, username: string } }> } };

export type MostCommonFacilitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MostCommonFacilitiesQuery = { __typename?: 'Query', mostCommonFacilities?: Array<string> | null };

export type MostCommonFeaturesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MostCommonFeaturesQuery = { __typename?: 'Query', mostCommonFeatures?: Array<string> | null };

export type MostCommonRulesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MostCommonRulesQuery = { __typename?: 'Query', mostCommonRules?: Array<string> | null };

export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  AuthPayload?: (data: WithTypename<AuthPayload>) => null | string,
  BikePark?: (data: WithTypename<BikePark>) => null | string,
  CategoryInfo?: (data: WithTypename<CategoryInfo>) => null | string,
  Contact?: (data: WithTypename<Contact>) => null | string,
  Coordinates?: (data: WithTypename<Coordinates>) => null | string,
  Event?: (data: WithTypename<Event>) => null | string,
  ImageUploadResponse?: (data: WithTypename<ImageUploadResponse>) => null | string,
  Notifications?: (data: WithTypename<Notifications>) => null | string,
  OpeningHours?: (data: WithTypename<OpeningHours>) => null | string,
  OpeningHoursDay?: (data: WithTypename<OpeningHoursDay>) => null | string,
  Organizer?: (data: WithTypename<Organizer>) => null | string,
  PaginatedBikeParks?: (data: WithTypename<PaginatedBikeParks>) => null | string,
  PaginatedReviews?: (data: WithTypename<PaginatedReviews>) => null | string,
  Preferences?: (data: WithTypename<Preferences>) => null | string,
  Price?: (data: WithTypename<Price>) => null | string,
  Profile?: (data: WithTypename<Profile>) => null | string,
  Review?: (data: WithTypename<Review>) => null | string,
  ScheduleItem?: (data: WithTypename<ScheduleItem>) => null | string,
  SocialMedia?: (data: WithTypename<SocialMedia>) => null | string,
  Stats?: (data: WithTypename<Stats>) => null | string,
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
    favoriteBikeParks?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<BikePark> | string>>,
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<User> | string>,
    mostCommonFacilities?: GraphCacheResolver<WithTypename<Query>, QueryMostCommonFacilitiesArgs, Array<Scalars['String'] | string>>,
    mostCommonFeatures?: GraphCacheResolver<WithTypename<Query>, QueryMostCommonFeaturesArgs, Array<Scalars['String'] | string>>,
    mostCommonRules?: GraphCacheResolver<WithTypename<Query>, QueryMostCommonRulesArgs, Array<Scalars['String'] | string>>,
    pendingBikeParks?: GraphCacheResolver<WithTypename<Query>, QueryPendingBikeParksArgs, Array<WithTypename<BikePark> | string>>,
    pendingEvents?: GraphCacheResolver<WithTypename<Query>, QueryPendingEventsArgs, Array<WithTypename<Event> | string>>,
    popularEventCategories?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<CategoryInfo> | string>>,
    reviews?: GraphCacheResolver<WithTypename<Query>, QueryReviewsArgs, WithTypename<PaginatedReviews> | string>,
    reviewsByUser?: GraphCacheResolver<WithTypename<Query>, QueryReviewsByUserArgs, WithTypename<PaginatedReviews> | string>,
    searchBikeParks?: GraphCacheResolver<WithTypename<Query>, QuerySearchBikeParksArgs, Array<WithTypename<BikePark> | string>>
  },
  AuthPayload?: {
    token?: GraphCacheResolver<WithTypename<AuthPayload>, Record<string, never>, Scalars['String'] | string>,
    user?: GraphCacheResolver<WithTypename<AuthPayload>, Record<string, never>, WithTypename<User> | string>
  },
  BikePark?: {
    address?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    approvalStatus?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, ApprovalStatus | string>,
    contact?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<Contact> | string>,
    coordinates?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<Coordinates> | string>,
    createdAt?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['Date'] | string>,
    createdBy?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<User> | string>,
    description?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    difficulty?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    facilities?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    features?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    id?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['ID'] | string>,
    imageUrl?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    isFavorite?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['Boolean'] | string>,
    lastUpdated?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    openingHours?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<OpeningHours> | string>,
    photos?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    prices?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<WithTypename<Price> | string>>,
    rating?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['Float'] | string>,
    reviews?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<WithTypename<Review> | string>>,
    rules?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    socialMedia?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<SocialMedia> | string>,
    status?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    trails?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<WithTypename<Trail> | string>>,
    updatedAt?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['Date'] | string>,
    videos?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    weather?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<Weather> | string>
  },
  CategoryInfo?: {
    count?: GraphCacheResolver<WithTypename<CategoryInfo>, Record<string, never>, Scalars['Int'] | string>,
    imageUrl?: GraphCacheResolver<WithTypename<CategoryInfo>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<CategoryInfo>, Record<string, never>, EventCategory | string>
  },
  Contact?: {
    email?: GraphCacheResolver<WithTypename<Contact>, Record<string, never>, Scalars['String'] | string>,
    phone?: GraphCacheResolver<WithTypename<Contact>, Record<string, never>, Scalars['String'] | string>,
    website?: GraphCacheResolver<WithTypename<Contact>, Record<string, never>, Scalars['String'] | string>
  },
  Coordinates?: {
    latitude?: GraphCacheResolver<WithTypename<Coordinates>, Record<string, never>, Scalars['Float'] | string>,
    longitude?: GraphCacheResolver<WithTypename<Coordinates>, Record<string, never>, Scalars['Float'] | string>
  },
  Event?: {
    approvalStatus?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, ApprovalStatus | string>,
    attendeeCount?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Int'] | string>,
    availableTickets?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Int'] | string>,
    capacity?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Int'] | string>,
    category?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, EventCategory | string>,
    coordinates?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, WithTypename<Coordinates> | string>,
    createdAt?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Date'] | string>,
    createdBy?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, WithTypename<User> | string>,
    date?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Date'] | string>,
    description?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    endTime?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    featured?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Boolean'] | string>,
    id?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['ID'] | string>,
    imageUrl?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    organizer?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, WithTypename<Organizer> | string>,
    price?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Float'] | string>,
    registrationEndDate?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Date'] | string>,
    schedule?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Array<WithTypename<ScheduleItem> | string>>,
    startTime?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    title?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, Scalars['Date'] | string>,
    venue?: GraphCacheResolver<WithTypename<Event>, Record<string, never>, WithTypename<Venue> | string>
  },
  ImageUploadResponse?: {
    key?: GraphCacheResolver<WithTypename<ImageUploadResponse>, Record<string, never>, Scalars['String'] | string>,
    url?: GraphCacheResolver<WithTypename<ImageUploadResponse>, Record<string, never>, Scalars['String'] | string>
  },
  Notifications?: {
    email?: GraphCacheResolver<WithTypename<Notifications>, Record<string, never>, Scalars['Boolean'] | string>,
    push?: GraphCacheResolver<WithTypename<Notifications>, Record<string, never>, Scalars['Boolean'] | string>
  },
  OpeningHours?: {
    friday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, WithTypename<OpeningHoursDay> | string>,
    monday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, WithTypename<OpeningHoursDay> | string>,
    saturday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, WithTypename<OpeningHoursDay> | string>,
    sunday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, WithTypename<OpeningHoursDay> | string>,
    thursday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, WithTypename<OpeningHoursDay> | string>,
    tuesday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, WithTypename<OpeningHoursDay> | string>,
    wednesday?: GraphCacheResolver<WithTypename<OpeningHours>, Record<string, never>, WithTypename<OpeningHoursDay> | string>
  },
  OpeningHoursDay?: {
    from?: GraphCacheResolver<WithTypename<OpeningHoursDay>, Record<string, never>, Scalars['String'] | string>,
    to?: GraphCacheResolver<WithTypename<OpeningHoursDay>, Record<string, never>, Scalars['String'] | string>
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
  Preferences?: {
    preferredBikeType?: GraphCacheResolver<WithTypename<Preferences>, Record<string, never>, Scalars['String'] | string>,
    preferredBikes?: GraphCacheResolver<WithTypename<Preferences>, Record<string, never>, Array<Scalars['String'] | string>>,
    ridingStyles?: GraphCacheResolver<WithTypename<Preferences>, Record<string, never>, Array<Scalars['String'] | string>>,
    skillLevel?: GraphCacheResolver<WithTypename<Preferences>, Record<string, never>, Scalars['String'] | string>
  },
  Price?: {
    currency?: GraphCacheResolver<WithTypename<Price>, Record<string, never>, Scalars['String'] | string>,
    name?: GraphCacheResolver<WithTypename<Price>, Record<string, never>, Scalars['String'] | string>,
    price?: GraphCacheResolver<WithTypename<Price>, Record<string, never>, Scalars['Float'] | string>
  },
  Profile?: {
    avatar?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    firstName?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    lastName?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    location?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['String'] | string>,
    notifications?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, Scalars['Boolean'] | string>,
    preferences?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, WithTypename<Preferences> | string>,
    socialMedia?: GraphCacheResolver<WithTypename<Profile>, Record<string, never>, WithTypename<SocialMedia> | string>
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
    strava?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>,
    youtube?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>
  },
  Stats?: {
    favoriteParks?: GraphCacheResolver<WithTypename<Stats>, Record<string, never>, Array<Scalars['ID'] | string>>,
    favoriteTrails?: GraphCacheResolver<WithTypename<Stats>, Record<string, never>, Array<Scalars['ID'] | string>>,
    totalReviews?: GraphCacheResolver<WithTypename<Stats>, Record<string, never>, Scalars['Int'] | string>,
    totalRides?: GraphCacheResolver<WithTypename<Stats>, Record<string, never>, Scalars['Int'] | string>
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
    googleId?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['ID'] | string>,
    isVerified?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['Boolean'] | string>,
    lastLogin?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    notifications?: GraphCacheResolver<WithTypename<User>, Record<string, never>, WithTypename<Notifications> | string>,
    profile?: GraphCacheResolver<WithTypename<User>, Record<string, never>, WithTypename<Profile> | string>,
    role?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    stats?: GraphCacheResolver<WithTypename<User>, Record<string, never>, WithTypename<Stats> | string>,
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
  approveBikePark?: GraphCacheOptimisticMutationResolver<MutationApproveBikeParkArgs, WithTypename<BikePark>>,
  approveEvent?: GraphCacheOptimisticMutationResolver<MutationApproveEventArgs, WithTypename<Event>>,
  createBikePark?: GraphCacheOptimisticMutationResolver<MutationCreateBikeParkArgs, WithTypename<BikePark>>,
  createEvent?: GraphCacheOptimisticMutationResolver<MutationCreateEventArgs, WithTypename<Event>>,
  createReview?: GraphCacheOptimisticMutationResolver<MutationCreateReviewArgs, WithTypename<Review>>,
  deleteBikePark?: GraphCacheOptimisticMutationResolver<MutationDeleteBikeParkArgs, Scalars['Boolean']>,
  deleteEvent?: GraphCacheOptimisticMutationResolver<MutationDeleteEventArgs, Scalars['Boolean']>,
  deleteReview?: GraphCacheOptimisticMutationResolver<MutationDeleteReviewArgs, Scalars['Boolean']>,
  forgotPassword?: GraphCacheOptimisticMutationResolver<MutationForgotPasswordArgs, Scalars['Boolean']>,
  googleLogin?: GraphCacheOptimisticMutationResolver<MutationGoogleLoginArgs, WithTypename<AuthPayload>>,
  login?: GraphCacheOptimisticMutationResolver<MutationLoginArgs, WithTypename<AuthPayload>>,
  register?: GraphCacheOptimisticMutationResolver<MutationRegisterArgs, WithTypename<AuthPayload>>,
  registerForEvent?: GraphCacheOptimisticMutationResolver<MutationRegisterForEventArgs, WithTypename<Event>>,
  rejectBikePark?: GraphCacheOptimisticMutationResolver<MutationRejectBikeParkArgs, WithTypename<BikePark>>,
  rejectEvent?: GraphCacheOptimisticMutationResolver<MutationRejectEventArgs, WithTypename<Event>>,
  resetPassword?: GraphCacheOptimisticMutationResolver<MutationResetPasswordArgs, WithTypename<AuthPayload>>,
  toggleFavoriteBikePark?: GraphCacheOptimisticMutationResolver<MutationToggleFavoriteBikeParkArgs, WithTypename<User>>,
  updateBikePark?: GraphCacheOptimisticMutationResolver<MutationUpdateBikeParkArgs, WithTypename<BikePark>>,
  updateEvent?: GraphCacheOptimisticMutationResolver<MutationUpdateEventArgs, WithTypename<Event>>,
  updateProfile?: GraphCacheOptimisticMutationResolver<MutationUpdateProfileArgs, WithTypename<User>>,
  updateReview?: GraphCacheOptimisticMutationResolver<MutationUpdateReviewArgs, WithTypename<Review>>,
  uploadImage?: GraphCacheOptimisticMutationResolver<MutationUploadImageArgs, WithTypename<ImageUploadResponse>>
};

export type GraphCacheUpdaters = {
  Query?: {
    bikePark?: GraphCacheUpdateResolver<{ bikePark: Maybe<WithTypename<BikePark>> }, QueryBikeParkArgs>,
    bikeParks?: GraphCacheUpdateResolver<{ bikeParks: WithTypename<PaginatedBikeParks> }, QueryBikeParksArgs>,
    bikeParksByViewport?: GraphCacheUpdateResolver<{ bikeParksByViewport: Array<WithTypename<BikePark>> }, QueryBikeParksByViewportArgs>,
    event?: GraphCacheUpdateResolver<{ event: Maybe<WithTypename<Event>> }, QueryEventArgs>,
    events?: GraphCacheUpdateResolver<{ events: Array<WithTypename<Event>> }, QueryEventsArgs>,
    favoriteBikeParks?: GraphCacheUpdateResolver<{ favoriteBikeParks: Maybe<Array<WithTypename<BikePark>>> }, Record<string, never>>,
    me?: GraphCacheUpdateResolver<{ me: Maybe<WithTypename<User>> }, Record<string, never>>,
    mostCommonFacilities?: GraphCacheUpdateResolver<{ mostCommonFacilities: Maybe<Array<Scalars['String']>> }, QueryMostCommonFacilitiesArgs>,
    mostCommonFeatures?: GraphCacheUpdateResolver<{ mostCommonFeatures: Maybe<Array<Scalars['String']>> }, QueryMostCommonFeaturesArgs>,
    mostCommonRules?: GraphCacheUpdateResolver<{ mostCommonRules: Maybe<Array<Scalars['String']>> }, QueryMostCommonRulesArgs>,
    pendingBikeParks?: GraphCacheUpdateResolver<{ pendingBikeParks: Array<WithTypename<BikePark>> }, QueryPendingBikeParksArgs>,
    pendingEvents?: GraphCacheUpdateResolver<{ pendingEvents: Array<WithTypename<Event>> }, QueryPendingEventsArgs>,
    popularEventCategories?: GraphCacheUpdateResolver<{ popularEventCategories: Array<WithTypename<CategoryInfo>> }, Record<string, never>>,
    reviews?: GraphCacheUpdateResolver<{ reviews: WithTypename<PaginatedReviews> }, QueryReviewsArgs>,
    reviewsByUser?: GraphCacheUpdateResolver<{ reviewsByUser: WithTypename<PaginatedReviews> }, QueryReviewsByUserArgs>,
    searchBikeParks?: GraphCacheUpdateResolver<{ searchBikeParks: Array<WithTypename<BikePark>> }, QuerySearchBikeParksArgs>
  },
  Mutation?: {
    approveBikePark?: GraphCacheUpdateResolver<{ approveBikePark: WithTypename<BikePark> }, MutationApproveBikeParkArgs>,
    approveEvent?: GraphCacheUpdateResolver<{ approveEvent: WithTypename<Event> }, MutationApproveEventArgs>,
    createBikePark?: GraphCacheUpdateResolver<{ createBikePark: WithTypename<BikePark> }, MutationCreateBikeParkArgs>,
    createEvent?: GraphCacheUpdateResolver<{ createEvent: WithTypename<Event> }, MutationCreateEventArgs>,
    createReview?: GraphCacheUpdateResolver<{ createReview: WithTypename<Review> }, MutationCreateReviewArgs>,
    deleteBikePark?: GraphCacheUpdateResolver<{ deleteBikePark: Scalars['Boolean'] }, MutationDeleteBikeParkArgs>,
    deleteEvent?: GraphCacheUpdateResolver<{ deleteEvent: Scalars['Boolean'] }, MutationDeleteEventArgs>,
    deleteReview?: GraphCacheUpdateResolver<{ deleteReview: Scalars['Boolean'] }, MutationDeleteReviewArgs>,
    forgotPassword?: GraphCacheUpdateResolver<{ forgotPassword: Scalars['Boolean'] }, MutationForgotPasswordArgs>,
    googleLogin?: GraphCacheUpdateResolver<{ googleLogin: WithTypename<AuthPayload> }, MutationGoogleLoginArgs>,
    login?: GraphCacheUpdateResolver<{ login: WithTypename<AuthPayload> }, MutationLoginArgs>,
    register?: GraphCacheUpdateResolver<{ register: WithTypename<AuthPayload> }, MutationRegisterArgs>,
    registerForEvent?: GraphCacheUpdateResolver<{ registerForEvent: WithTypename<Event> }, MutationRegisterForEventArgs>,
    rejectBikePark?: GraphCacheUpdateResolver<{ rejectBikePark: WithTypename<BikePark> }, MutationRejectBikeParkArgs>,
    rejectEvent?: GraphCacheUpdateResolver<{ rejectEvent: WithTypename<Event> }, MutationRejectEventArgs>,
    resetPassword?: GraphCacheUpdateResolver<{ resetPassword: WithTypename<AuthPayload> }, MutationResetPasswordArgs>,
    toggleFavoriteBikePark?: GraphCacheUpdateResolver<{ toggleFavoriteBikePark: WithTypename<User> }, MutationToggleFavoriteBikeParkArgs>,
    updateBikePark?: GraphCacheUpdateResolver<{ updateBikePark: WithTypename<BikePark> }, MutationUpdateBikeParkArgs>,
    updateEvent?: GraphCacheUpdateResolver<{ updateEvent: WithTypename<Event> }, MutationUpdateEventArgs>,
    updateProfile?: GraphCacheUpdateResolver<{ updateProfile: WithTypename<User> }, MutationUpdateProfileArgs>,
    updateReview?: GraphCacheUpdateResolver<{ updateReview: WithTypename<Review> }, MutationUpdateReviewArgs>,
    uploadImage?: GraphCacheUpdateResolver<{ uploadImage: WithTypename<ImageUploadResponse> }, MutationUploadImageArgs>
  },
  Subscription?: {},
  AuthPayload?: {
    token?: GraphCacheUpdateResolver<Maybe<WithTypename<AuthPayload>>, Record<string, never>>,
    user?: GraphCacheUpdateResolver<Maybe<WithTypename<AuthPayload>>, Record<string, never>>
  },
  BikePark?: {
    address?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    approvalStatus?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
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
    isFavorite?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    lastUpdated?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    location?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    openingHours?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    photos?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    prices?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    rating?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    reviews?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    rules?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    socialMedia?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    status?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    trails?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    videos?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    weather?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>
  },
  CategoryInfo?: {
    count?: GraphCacheUpdateResolver<Maybe<WithTypename<CategoryInfo>>, Record<string, never>>,
    imageUrl?: GraphCacheUpdateResolver<Maybe<WithTypename<CategoryInfo>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<CategoryInfo>>, Record<string, never>>
  },
  Contact?: {
    email?: GraphCacheUpdateResolver<Maybe<WithTypename<Contact>>, Record<string, never>>,
    phone?: GraphCacheUpdateResolver<Maybe<WithTypename<Contact>>, Record<string, never>>,
    website?: GraphCacheUpdateResolver<Maybe<WithTypename<Contact>>, Record<string, never>>
  },
  Coordinates?: {
    latitude?: GraphCacheUpdateResolver<Maybe<WithTypename<Coordinates>>, Record<string, never>>,
    longitude?: GraphCacheUpdateResolver<Maybe<WithTypename<Coordinates>>, Record<string, never>>
  },
  Event?: {
    approvalStatus?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    attendeeCount?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    availableTickets?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    capacity?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    category?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    coordinates?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
    createdBy?: GraphCacheUpdateResolver<Maybe<WithTypename<Event>>, Record<string, never>>,
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
  ImageUploadResponse?: {
    key?: GraphCacheUpdateResolver<Maybe<WithTypename<ImageUploadResponse>>, Record<string, never>>,
    url?: GraphCacheUpdateResolver<Maybe<WithTypename<ImageUploadResponse>>, Record<string, never>>
  },
  Notifications?: {
    email?: GraphCacheUpdateResolver<Maybe<WithTypename<Notifications>>, Record<string, never>>,
    push?: GraphCacheUpdateResolver<Maybe<WithTypename<Notifications>>, Record<string, never>>
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
  OpeningHoursDay?: {
    from?: GraphCacheUpdateResolver<Maybe<WithTypename<OpeningHoursDay>>, Record<string, never>>,
    to?: GraphCacheUpdateResolver<Maybe<WithTypename<OpeningHoursDay>>, Record<string, never>>
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
  Preferences?: {
    preferredBikeType?: GraphCacheUpdateResolver<Maybe<WithTypename<Preferences>>, Record<string, never>>,
    preferredBikes?: GraphCacheUpdateResolver<Maybe<WithTypename<Preferences>>, Record<string, never>>,
    ridingStyles?: GraphCacheUpdateResolver<Maybe<WithTypename<Preferences>>, Record<string, never>>,
    skillLevel?: GraphCacheUpdateResolver<Maybe<WithTypename<Preferences>>, Record<string, never>>
  },
  Price?: {
    currency?: GraphCacheUpdateResolver<Maybe<WithTypename<Price>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<Price>>, Record<string, never>>,
    price?: GraphCacheUpdateResolver<Maybe<WithTypename<Price>>, Record<string, never>>
  },
  Profile?: {
    avatar?: GraphCacheUpdateResolver<Maybe<WithTypename<Profile>>, Record<string, never>>,
    firstName?: GraphCacheUpdateResolver<Maybe<WithTypename<Profile>>, Record<string, never>>,
    lastName?: GraphCacheUpdateResolver<Maybe<WithTypename<Profile>>, Record<string, never>>,
    location?: GraphCacheUpdateResolver<Maybe<WithTypename<Profile>>, Record<string, never>>,
    notifications?: GraphCacheUpdateResolver<Maybe<WithTypename<Profile>>, Record<string, never>>,
    preferences?: GraphCacheUpdateResolver<Maybe<WithTypename<Profile>>, Record<string, never>>,
    socialMedia?: GraphCacheUpdateResolver<Maybe<WithTypename<Profile>>, Record<string, never>>
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
    strava?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>,
    youtube?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>
  },
  Stats?: {
    favoriteParks?: GraphCacheUpdateResolver<Maybe<WithTypename<Stats>>, Record<string, never>>,
    favoriteTrails?: GraphCacheUpdateResolver<Maybe<WithTypename<Stats>>, Record<string, never>>,
    totalReviews?: GraphCacheUpdateResolver<Maybe<WithTypename<Stats>>, Record<string, never>>,
    totalRides?: GraphCacheUpdateResolver<Maybe<WithTypename<Stats>>, Record<string, never>>
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
    googleId?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    isVerified?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    lastLogin?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    notifications?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    profile?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    role?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    stats?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
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
export const ApproveBikeParkDocument = gql`
    mutation ApproveBikePark($id: ID!) {
  approveBikePark(id: $id) {
    id
    name
    approvalStatus
  }
}
    `;

export function useApproveBikeParkMutation() {
  return Urql.useMutation<ApproveBikeParkMutation, ApproveBikeParkMutationVariables>(ApproveBikeParkDocument);
};
export const ApproveEventDocument = gql`
    mutation ApproveEvent($id: ID!) {
  approveEvent(id: $id) {
    id
    title
    approvalStatus
  }
}
    `;

export function useApproveEventMutation() {
  return Urql.useMutation<ApproveEventMutation, ApproveEventMutationVariables>(ApproveEventDocument);
};
export const CreateBikeParkDocument = gql`
    mutation CreateBikePark($input: CreateBikeParkInput!) {
  createBikePark(input: $input) {
    id
    name
    location
  }
}
    `;

export function useCreateBikeParkMutation() {
  return Urql.useMutation<CreateBikeParkMutation, CreateBikeParkMutationVariables>(CreateBikeParkDocument);
};
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
export const DeleteBikeParkDocument = gql`
    mutation DeleteBikePark($id: ID!) {
  deleteBikePark(id: $id)
}
    `;

export function useDeleteBikeParkMutation() {
  return Urql.useMutation<DeleteBikeParkMutation, DeleteBikeParkMutationVariables>(DeleteBikeParkDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const GoogleLoginDocument = gql`
    mutation GoogleLogin($idToken: String!) {
  googleLogin(idToken: $idToken) {
    token
    user {
      id
      username
      email
    }
  }
}
    `;

export function useGoogleLoginMutation() {
  return Urql.useMutation<GoogleLoginMutation, GoogleLoginMutationVariables>(GoogleLoginDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!, $rememberMe: Boolean) {
  login(email: $email, password: $password, rememberMe: $rememberMe) {
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
export const RejectBikeParkDocument = gql`
    mutation RejectBikePark($id: ID!) {
  rejectBikePark(id: $id) {
    id
    name
    approvalStatus
  }
}
    `;

export function useRejectBikeParkMutation() {
  return Urql.useMutation<RejectBikeParkMutation, RejectBikeParkMutationVariables>(RejectBikeParkDocument);
};
export const RejectEventDocument = gql`
    mutation RejectEvent($id: ID!) {
  rejectEvent(id: $id) {
    id
    title
    approvalStatus
  }
}
    `;

export function useRejectEventMutation() {
  return Urql.useMutation<RejectEventMutation, RejectEventMutationVariables>(RejectEventDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!, $confirmPassword: String!) {
  resetPassword(
    token: $token
    password: $password
    confirmPassword: $confirmPassword
  ) {
    token
    user {
      id
      username
      email
    }
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const ToggleFavoriteBikeParkDocument = gql`
    mutation ToggleFavoriteBikePark($bikeParkId: ID!) {
  toggleFavoriteBikePark(bikeParkId: $bikeParkId) {
    id
    stats {
      favoriteParks
    }
  }
}
    `;

export function useToggleFavoriteBikeParkMutation() {
  return Urql.useMutation<ToggleFavoriteBikeParkMutation, ToggleFavoriteBikeParkMutationVariables>(ToggleFavoriteBikeParkDocument);
};
export const UpdateBikeParkDocument = gql`
    mutation UpdateBikePark($id: ID!, $input: UpdateBikeParkInput!) {
  updateBikePark(id: $id, input: $input) {
    id
    name
    location
  }
}
    `;

export function useUpdateBikeParkMutation() {
  return Urql.useMutation<UpdateBikeParkMutation, UpdateBikeParkMutationVariables>(UpdateBikeParkDocument);
};
export const UploadImageDocument = gql`
    mutation UploadImage($file: Upload!) {
  uploadImage(file: $file) {
    url
    key
  }
}
    `;

export function useUploadImageMutation() {
  return Urql.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument);
};
export const BikeParkDocument = gql`
    query BikePark($id: ID!) {
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
      website
    }
    facilities
    openingHours {
      monday {
        from
        to
      }
      tuesday {
        from
        to
      }
      wednesday {
        from
        to
      }
      thursday {
        from
        to
      }
      friday {
        from
        to
      }
      saturday {
        from
        to
      }
      sunday {
        from
        to
      }
    }
    photos
    prices {
      name
      price
      currency
    }
    rating
    rules
    status
    videos
    socialMedia {
      facebook
      instagram
      youtube
      strava
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
    createdBy {
      id
      role
      username
      email
      isVerified
    }
    isFavorite
  }
}
    `;

export function useBikeParkQuery(options: Omit<Urql.UseQueryArgs<BikeParkQueryVariables>, 'query'>) {
  return Urql.useQuery<BikeParkQuery, BikeParkQueryVariables>({ query: BikeParkDocument, ...options });
};
export const BikeParksDocument = gql`
    query BikeParks($filter: BikeParkFilter) {
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
      rating
      coordinates {
        latitude
        longitude
      }
      isFavorite
    }
    totalCount
    currentPage
    totalPages
    hasNextPage
  }
}
    `;

export function useBikeParksQuery(options?: Omit<Urql.UseQueryArgs<BikeParksQueryVariables>, 'query'>) {
  return Urql.useQuery<BikeParksQuery, BikeParksQueryVariables>({ query: BikeParksDocument, ...options });
};
export const BikeParksByViewportDocument = gql`
    query BikeParksByViewport($viewport: ViewportInput!, $searchQuery: String) {
  bikeParksByViewport(viewport: $viewport, searchQuery: $searchQuery) {
    id
    name
    imageUrl
    location
    coordinates {
      latitude
      longitude
    }
    rating
    features
    difficulty
  }
}
    `;

export function useBikeParksByViewportQuery(options: Omit<Urql.UseQueryArgs<BikeParksByViewportQueryVariables>, 'query'>) {
  return Urql.useQuery<BikeParksByViewportQuery, BikeParksByViewportQueryVariables>({ query: BikeParksByViewportDocument, ...options });
};
export const EventDocument = gql`
    query Event($id: ID!) {
  event(id: $id) {
    id
    title
    date
    startTime
    endTime
    location
    category
    price
    imageUrl
    description
    capacity
    registrationEndDate
    availableTickets
    attendeeCount
    featured
    organizer {
      name
      description
      imageUrl
    }
    schedule {
      title
      time
      description
    }
    venue {
      name
      address
      mapImageUrl
    }
    coordinates {
      latitude
      longitude
    }
    createdAt
    updatedAt
  }
}
    `;

export function useEventQuery(options: Omit<Urql.UseQueryArgs<EventQueryVariables>, 'query'>) {
  return Urql.useQuery<EventQuery, EventQueryVariables>({ query: EventDocument, ...options });
};
export const EventsDocument = gql`
    query Events($filter: EventFilter) {
  events(filter: $filter) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

export function useEventsQuery(options?: Omit<Urql.UseQueryArgs<EventsQueryVariables>, 'query'>) {
  return Urql.useQuery<EventsQuery, EventsQueryVariables>({ query: EventsDocument, ...options });
};
export const FavoriteBikeParksDocument = gql`
    query FavoriteBikeParks {
  favoriteBikeParks {
    id
    name
    location
    imageUrl
    difficulty
    rating
    reviews {
      id
    }
    isFavorite
  }
}
    `;

export function useFavoriteBikeParksQuery(options?: Omit<Urql.UseQueryArgs<FavoriteBikeParksQueryVariables>, 'query'>) {
  return Urql.useQuery<FavoriteBikeParksQuery, FavoriteBikeParksQueryVariables>({ query: FavoriteBikeParksDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    role
    profile {
      firstName
      lastName
      location
      preferences {
        ridingStyles
        skillLevel
        preferredBikes
      }
      socialMedia {
        facebook
        instagram
        youtube
        strava
      }
    }
    stats {
      favoriteParks
      favoriteTrails
      totalReviews
      totalRides
    }
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const GetPendingBikeParksDocument = gql`
    query GetPendingBikeParks($status: ApprovalStatus) {
  pendingBikeParks(status: $status) {
    id
    name
    location
    imageUrl
    createdAt
    approvalStatus
    createdBy {
      id
      username
      email
    }
  }
}
    `;

export function useGetPendingBikeParksQuery(options?: Omit<Urql.UseQueryArgs<GetPendingBikeParksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPendingBikeParksQuery, GetPendingBikeParksQueryVariables>({ query: GetPendingBikeParksDocument, ...options });
};
export const GetPendingEventsDocument = gql`
    query GetPendingEvents($status: ApprovalStatus) {
  pendingEvents(status: $status) {
    id
    title
    location
    imageUrl
    date
    createdAt
    startTime
    endTime
    approvalStatus
    createdBy {
      id
      username
      email
    }
    organizer {
      description
      imageUrl
      name
    }
    venue {
      address
      mapImageUrl
      name
    }
  }
}
    `;

export function useGetPendingEventsQuery(options?: Omit<Urql.UseQueryArgs<GetPendingEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPendingEventsQuery, GetPendingEventsQueryVariables>({ query: GetPendingEventsDocument, ...options });
};
export const PopularEventCategoriesDocument = gql`
    query PopularEventCategories {
  popularEventCategories {
    count
    imageUrl
    name
  }
}
    `;

export function usePopularEventCategoriesQuery(options?: Omit<Urql.UseQueryArgs<PopularEventCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<PopularEventCategoriesQuery, PopularEventCategoriesQueryVariables>({ query: PopularEventCategoriesDocument, ...options });
};
export const ReviewsDocument = gql`
    query Reviews($bikeParkId: ID!, $page: Int, $limit: Int) {
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

export function useReviewsQuery(options: Omit<Urql.UseQueryArgs<ReviewsQueryVariables>, 'query'>) {
  return Urql.useQuery<ReviewsQuery, ReviewsQueryVariables>({ query: ReviewsDocument, ...options });
};
export const ReviewsByUserDocument = gql`
    query ReviewsByUser($userId: ID!, $page: Int, $limit: Int) {
  reviewsByUser(userId: $userId, page: $page, limit: $limit) {
    reviews {
      id
      createdBy {
        id
        username
      }
      createdAt
      comment
      rating
      title
    }
  }
}
    `;

export function useReviewsByUserQuery(options: Omit<Urql.UseQueryArgs<ReviewsByUserQueryVariables>, 'query'>) {
  return Urql.useQuery<ReviewsByUserQuery, ReviewsByUserQueryVariables>({ query: ReviewsByUserDocument, ...options });
};
export const MostCommonFacilitiesDocument = gql`
    query MostCommonFacilities($limit: Int) {
  mostCommonFacilities(limit: $limit)
}
    `;

export function useMostCommonFacilitiesQuery(options?: Omit<Urql.UseQueryArgs<MostCommonFacilitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<MostCommonFacilitiesQuery, MostCommonFacilitiesQueryVariables>({ query: MostCommonFacilitiesDocument, ...options });
};
export const MostCommonFeaturesDocument = gql`
    query MostCommonFeatures($limit: Int) {
  mostCommonFeatures(limit: $limit)
}
    `;

export function useMostCommonFeaturesQuery(options?: Omit<Urql.UseQueryArgs<MostCommonFeaturesQueryVariables>, 'query'>) {
  return Urql.useQuery<MostCommonFeaturesQuery, MostCommonFeaturesQueryVariables>({ query: MostCommonFeaturesDocument, ...options });
};
export const MostCommonRulesDocument = gql`
    query MostCommonRules($limit: Int) {
  mostCommonRules(limit: $limit)
}
    `;

export function useMostCommonRulesQuery(options?: Omit<Urql.UseQueryArgs<MostCommonRulesQueryVariables>, 'query'>) {
  return Urql.useQuery<MostCommonRulesQuery, MostCommonRulesQueryVariables>({ query: MostCommonRulesDocument, ...options });
};
export const namedOperations = {
  Query: {
    BikePark: 'BikePark',
    BikeParks: 'BikeParks',
    BikeParksByViewport: 'BikeParksByViewport',
    Event: 'Event',
    Events: 'Events',
    FavoriteBikeParks: 'FavoriteBikeParks',
    Me: 'Me',
    GetPendingBikeParks: 'GetPendingBikeParks',
    GetPendingEvents: 'GetPendingEvents',
    PopularEventCategories: 'PopularEventCategories',
    Reviews: 'Reviews',
    ReviewsByUser: 'ReviewsByUser',
    MostCommonFacilities: 'MostCommonFacilities',
    MostCommonFeatures: 'MostCommonFeatures',
    MostCommonRules: 'MostCommonRules'
  },
  Mutation: {
    ApproveBikePark: 'ApproveBikePark',
    ApproveEvent: 'ApproveEvent',
    CreateBikePark: 'CreateBikePark',
    CreateReview: 'CreateReview',
    DeleteBikePark: 'DeleteBikePark',
    ForgotPassword: 'ForgotPassword',
    GoogleLogin: 'GoogleLogin',
    Login: 'Login',
    Register: 'Register',
    RejectBikePark: 'RejectBikePark',
    RejectEvent: 'RejectEvent',
    ResetPassword: 'ResetPassword',
    ToggleFavoriteBikePark: 'ToggleFavoriteBikePark',
    UpdateBikePark: 'UpdateBikePark',
    UploadImage: 'UploadImage'
  },
  Fragment: {
    BikePark: 'BikePark',
    Event: 'Event'
  }
}