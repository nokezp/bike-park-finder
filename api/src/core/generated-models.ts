/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL'
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
  createdAt?: Maybe<Scalars['String']['output']>;
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
  updatedAt?: Maybe<Scalars['String']['output']>;
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
  attendeeCount: Scalars['Int']['output'];
  availableTickets: Scalars['Int']['output'];
  capacity: Scalars['Int']['output'];
  category: EventCategory;
  coordinates?: Maybe<Coordinates>;
  createdAt: Scalars['Date']['output'];
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
  BIKEPACKING_EVENT = 'BIKEPACKING_EVENT',
  CHAMPIONSHIP = 'CHAMPIONSHIP',
  CHARITY_RIDE = 'CHARITY_RIDE',
  CROSS_COUNTRY = 'CROSS_COUNTRY',
  DEMO_DAY = 'DEMO_DAY',
  DIRT_JUMP = 'DIRT_JUMP',
  DOWNHILL = 'DOWNHILL',
  ENDURO = 'ENDURO',
  E_BIKE_EVENT = 'E_BIKE_EVENT',
  FAMILY_RIDE = 'FAMILY_RIDE',
  FESTIVAL = 'FESTIVAL',
  FUN_RIDE = 'FUN_RIDE',
  GRAVEL_RACE = 'GRAVEL_RACE',
  GROUP_RIDE = 'GROUP_RIDE',
  MAINTENANCE_CLINIC = 'MAINTENANCE_CLINIC',
  NIGHT_RIDE = 'NIGHT_RIDE',
  RACE = 'RACE',
  STAGE_RACE = 'STAGE_RACE',
  TRAINING_CAMP = 'TRAINING_CAMP',
  WORKSHOP = 'WORKSHOP'
}

export type EventFilter = {
  category?: InputMaybe<EventCategory>;
  location?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<EventPeriod>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum EventPeriod {
  ALL = 'ALL',
  NEXT_MONTH = 'NEXT_MONTH',
  THIS_MONTH = 'THIS_MONTH',
  THIS_WEEK = 'THIS_WEEK'
}

export enum EventStatus {
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  UPCOMING = 'UPCOMING'
}

export type ImageUploadResponse = {
  __typename?: 'ImageUploadResponse';
  key: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveBikePark: BikePark;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ApprovalStatus: ApprovalStatus;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  BikePark: ResolverTypeWrapper<BikePark>;
  BikeParkFilter: BikeParkFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CategoryInfo: ResolverTypeWrapper<CategoryInfo>;
  Contact: ResolverTypeWrapper<Contact>;
  ContactInput: ContactInput;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CoordinatesInput: CoordinatesInput;
  CoordinatesSearchInput: CoordinatesSearchInput;
  CreateBikeParkInput: CreateBikeParkInput;
  CreateEventInput: CreateEventInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Event: ResolverTypeWrapper<Event>;
  EventCategory: EventCategory;
  EventFilter: EventFilter;
  EventPeriod: EventPeriod;
  EventStatus: EventStatus;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ImageUploadResponse: ResolverTypeWrapper<ImageUploadResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Notifications: ResolverTypeWrapper<Notifications>;
  OpeningHours: ResolverTypeWrapper<OpeningHours>;
  OpeningHoursDay: ResolverTypeWrapper<OpeningHoursDay>;
  OpeningHoursDayInput: OpeningHoursDayInput;
  OpeningHoursInput: OpeningHoursInput;
  Organizer: ResolverTypeWrapper<Organizer>;
  OrganizerInput: OrganizerInput;
  PaginatedBikeParks: ResolverTypeWrapper<PaginatedBikeParks>;
  PaginatedReviews: ResolverTypeWrapper<PaginatedReviews>;
  PaginationInput: PaginationInput;
  Preferences: ResolverTypeWrapper<Preferences>;
  Price: ResolverTypeWrapper<Price>;
  PriceInput: PriceInput;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  ScheduleItem: ResolverTypeWrapper<ScheduleItem>;
  ScheduleItemInput: ScheduleItemInput;
  SocialMedia: ResolverTypeWrapper<SocialMedia>;
  SocialMediaInput: SocialMediaInput;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Trail: ResolverTypeWrapper<Trail>;
  UpdateBikeParkInput: UpdateBikeParkInput;
  UpdateEventInput: UpdateEventInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<User>;
  Venue: ResolverTypeWrapper<Venue>;
  VenueInput: VenueInput;
  ViewportInput: ViewportInput;
  Weather: ResolverTypeWrapper<Weather>;
  WeatherData: ResolverTypeWrapper<WeatherData>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  BikePark: BikePark;
  BikeParkFilter: BikeParkFilter;
  Boolean: Scalars['Boolean']['output'];
  CategoryInfo: CategoryInfo;
  Contact: Contact;
  ContactInput: ContactInput;
  Coordinates: Coordinates;
  CoordinatesInput: CoordinatesInput;
  CoordinatesSearchInput: CoordinatesSearchInput;
  CreateBikeParkInput: CreateBikeParkInput;
  CreateEventInput: CreateEventInput;
  Date: Scalars['Date']['output'];
  Event: Event;
  EventFilter: EventFilter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  ImageUploadResponse: ImageUploadResponse;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Notifications: Notifications;
  OpeningHours: OpeningHours;
  OpeningHoursDay: OpeningHoursDay;
  OpeningHoursDayInput: OpeningHoursDayInput;
  OpeningHoursInput: OpeningHoursInput;
  Organizer: Organizer;
  OrganizerInput: OrganizerInput;
  PaginatedBikeParks: PaginatedBikeParks;
  PaginatedReviews: PaginatedReviews;
  PaginationInput: PaginationInput;
  Preferences: Preferences;
  Price: Price;
  PriceInput: PriceInput;
  Profile: Profile;
  Query: {};
  Review: Review;
  ScheduleItem: ScheduleItem;
  ScheduleItemInput: ScheduleItemInput;
  SocialMedia: SocialMedia;
  SocialMediaInput: SocialMediaInput;
  Stats: Stats;
  String: Scalars['String']['output'];
  Trail: Trail;
  UpdateBikeParkInput: UpdateBikeParkInput;
  UpdateEventInput: UpdateEventInput;
  Upload: Scalars['Upload']['output'];
  User: User;
  Venue: Venue;
  VenueInput: VenueInput;
  ViewportInput: ViewportInput;
  Weather: Weather;
  WeatherData: WeatherData;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BikeParkResolvers<ContextType = any, ParentType extends ResolversParentTypes['BikePark'] = ResolversParentTypes['BikePark']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  approvalStatus?: Resolver<Maybe<ResolversTypes['ApprovalStatus']>, ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType>;
  coordinates?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficulty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facilities?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  features?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openingHours?: Resolver<Maybe<ResolversTypes['OpeningHours']>, ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  prices?: Resolver<Maybe<Array<Maybe<ResolversTypes['Price']>>>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  rules?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  socialMedia?: Resolver<Maybe<ResolversTypes['SocialMedia']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trails?: Resolver<Maybe<Array<ResolversTypes['Trail']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  weather?: Resolver<Maybe<ResolversTypes['Weather']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryInfo'] = ResolversParentTypes['CategoryInfo']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['EventCategory'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  attendeeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  availableTickets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['EventCategory'], ParentType, ContextType>;
  coordinates?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organizer?: Resolver<ResolversTypes['Organizer'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  registrationEndDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  schedule?: Resolver<Array<ResolversTypes['ScheduleItem']>, ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  venue?: Resolver<ResolversTypes['Venue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageUploadResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImageUploadResponse'] = ResolversParentTypes['ImageUploadResponse']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  approveBikePark?: Resolver<ResolversTypes['BikePark'], ParentType, ContextType, RequireFields<MutationApproveBikeParkArgs, 'id'>>;
  createBikePark?: Resolver<ResolversTypes['BikePark'], ParentType, ContextType, RequireFields<MutationCreateBikeParkArgs, 'input'>>;
  createEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  createReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'bikeParkId' | 'comment' | 'rating'>>;
  deleteBikePark?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteBikeParkArgs, 'id'>>;
  deleteEvent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'id'>>;
  deleteReview?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  forgotPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  googleLogin?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationGoogleLoginArgs, 'idToken'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'confirmPassword' | 'email' | 'firstName' | 'lastName' | 'password' | 'username'>>;
  registerForEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationRegisterForEventArgs, 'id'>>;
  rejectBikePark?: Resolver<ResolversTypes['BikePark'], ParentType, ContextType, RequireFields<MutationRejectBikeParkArgs, 'id'>>;
  resetPassword?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'confirmPassword' | 'password' | 'token'>>;
  toggleFavoriteBikePark?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationToggleFavoriteBikeParkArgs, 'bikeParkId'>>;
  updateBikePark?: Resolver<ResolversTypes['BikePark'], ParentType, ContextType, RequireFields<MutationUpdateBikeParkArgs, 'id' | 'input'>>;
  updateEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationUpdateEventArgs, 'id' | 'input'>>;
  updateProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateProfileArgs>>;
  updateReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'id'>>;
  uploadImage?: Resolver<ResolversTypes['ImageUploadResponse'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'file'>>;
};

export type NotificationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notifications'] = ResolversParentTypes['Notifications']> = {
  email?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  push?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpeningHoursResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpeningHours'] = ResolversParentTypes['OpeningHours']> = {
  friday?: Resolver<Maybe<ResolversTypes['OpeningHoursDay']>, ParentType, ContextType>;
  monday?: Resolver<Maybe<ResolversTypes['OpeningHoursDay']>, ParentType, ContextType>;
  saturday?: Resolver<Maybe<ResolversTypes['OpeningHoursDay']>, ParentType, ContextType>;
  sunday?: Resolver<Maybe<ResolversTypes['OpeningHoursDay']>, ParentType, ContextType>;
  thursday?: Resolver<Maybe<ResolversTypes['OpeningHoursDay']>, ParentType, ContextType>;
  tuesday?: Resolver<Maybe<ResolversTypes['OpeningHoursDay']>, ParentType, ContextType>;
  wednesday?: Resolver<Maybe<ResolversTypes['OpeningHoursDay']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OpeningHoursDayResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpeningHoursDay'] = ResolversParentTypes['OpeningHoursDay']> = {
  from?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrganizerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organizer'] = ResolversParentTypes['Organizer']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedBikeParksResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedBikeParks'] = ResolversParentTypes['PaginatedBikeParks']> = {
  bikeParks?: Resolver<Array<ResolversTypes['BikePark']>, ParentType, ContextType>;
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedReviewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedReviews'] = ResolversParentTypes['PaginatedReviews']> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preferences'] = ResolversParentTypes['Preferences']> = {
  preferredBikeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferredBikes?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  ridingStyles?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  skillLevel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = {
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notifications?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  preferences?: Resolver<Maybe<ResolversTypes['Preferences']>, ParentType, ContextType>;
  socialMedia?: Resolver<Maybe<ResolversTypes['SocialMedia']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  bikePark?: Resolver<Maybe<ResolversTypes['BikePark']>, ParentType, ContextType, RequireFields<QueryBikeParkArgs, 'id'>>;
  bikeParks?: Resolver<ResolversTypes['PaginatedBikeParks'], ParentType, ContextType, Partial<QueryBikeParksArgs>>;
  bikeParksByViewport?: Resolver<Array<ResolversTypes['BikePark']>, ParentType, ContextType, RequireFields<QueryBikeParksByViewportArgs, 'viewport'>>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventArgs, 'id'>>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, Partial<QueryEventsArgs>>;
  favoriteBikeParks?: Resolver<Maybe<Array<Maybe<ResolversTypes['BikePark']>>>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  mostCommonFacilities?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, Partial<QueryMostCommonFacilitiesArgs>>;
  mostCommonFeatures?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, Partial<QueryMostCommonFeaturesArgs>>;
  mostCommonRules?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, Partial<QueryMostCommonRulesArgs>>;
  pendingBikeParks?: Resolver<Array<ResolversTypes['BikePark']>, ParentType, ContextType, Partial<QueryPendingBikeParksArgs>>;
  popularEventCategories?: Resolver<Array<ResolversTypes['CategoryInfo']>, ParentType, ContextType>;
  reviews?: Resolver<ResolversTypes['PaginatedReviews'], ParentType, ContextType, RequireFields<QueryReviewsArgs, 'bikeParkId'>>;
  reviewsByUser?: Resolver<ResolversTypes['PaginatedReviews'], ParentType, ContextType, RequireFields<QueryReviewsByUserArgs, 'userId'>>;
  searchBikeParks?: Resolver<Array<ResolversTypes['BikePark']>, ParentType, ContextType, RequireFields<QuerySearchBikeParksArgs, 'query'>>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  bikePark?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trailDifficulty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visitDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ScheduleItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScheduleItem'] = ResolversParentTypes['ScheduleItem']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialMedia'] = ResolversParentTypes['SocialMedia']> = {
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  strava?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = {
  favoriteParks?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  favoriteTrails?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  totalReviews?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRides?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrailResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trail'] = ResolversParentTypes['Trail']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  features?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  length?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verticalDrop?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  googleId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notifications?: Resolver<Maybe<ResolversTypes['Notifications']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['Stats']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VenueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Venue'] = ResolversParentTypes['Venue']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mapImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeatherResolvers<ContextType = any, ParentType extends ResolversParentTypes['Weather'] = ResolversParentTypes['Weather']> = {
  current?: Resolver<Maybe<ResolversTypes['WeatherData']>, ParentType, ContextType>;
  forecast?: Resolver<Maybe<Array<Maybe<ResolversTypes['WeatherData']>>>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeatherDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WeatherData'] = ResolversParentTypes['WeatherData']> = {
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  feelsLike?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  humidity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  precipitation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  temperature?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  uvIndex?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  windSpeed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  BikePark?: BikeParkResolvers<ContextType>;
  CategoryInfo?: CategoryInfoResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  ImageUploadResponse?: ImageUploadResponseResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Notifications?: NotificationsResolvers<ContextType>;
  OpeningHours?: OpeningHoursResolvers<ContextType>;
  OpeningHoursDay?: OpeningHoursDayResolvers<ContextType>;
  Organizer?: OrganizerResolvers<ContextType>;
  PaginatedBikeParks?: PaginatedBikeParksResolvers<ContextType>;
  PaginatedReviews?: PaginatedReviewsResolvers<ContextType>;
  Preferences?: PreferencesResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  ScheduleItem?: ScheduleItemResolvers<ContextType>;
  SocialMedia?: SocialMediaResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  Trail?: TrailResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  Venue?: VenueResolvers<ContextType>;
  Weather?: WeatherResolvers<ContextType>;
  WeatherData?: WeatherDataResolvers<ContextType>;
};

