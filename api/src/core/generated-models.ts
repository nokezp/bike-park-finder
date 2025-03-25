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
  createdBy: Scalars['ID']['output'];
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
  CHAMPIONSHIP = 'CHAMPIONSHIP',
  FESTIVAL = 'FESTIVAL',
  GROUP_RIDE = 'GROUP_RIDE',
  WORKSHOP = 'WORKSHOP'
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
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  UPCOMING = 'UPCOMING'
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
  rating: Scalars['Float']['input'];
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
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
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
  reviews: Array<Review>;
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
};


export type QuerySearchBikeParksArgs = {
  query: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  bikePark: Scalars['ID']['output'];
  comment: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
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
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
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
  current?: Maybe<Scalars['JSON']['output']>;
  forecast?: Maybe<Scalars['JSON']['output']>;
  lastUpdated?: Maybe<Scalars['String']['output']>;
};

export type WeatherData = {
  __typename?: 'WeatherData';
  description: Scalars['String']['output'];
  feelsLike: Scalars['Float']['output'];
  humidity: Scalars['Int']['output'];
  icon: Scalars['String']['output'];
  precipitation: Scalars['Float']['output'];
  temperature: Scalars['Float']['output'];
  uvIndex: Scalars['Float']['output'];
  windSpeed: Scalars['Float']['output'];
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
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  BikePark: ResolverTypeWrapper<BikePark>;
  BikeParkFilter: BikeParkFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Contact: ResolverTypeWrapper<Contact>;
  ContactInput: ContactInput;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CoordinatesInput: CoordinatesInput;
  CoordinatesSearchInput: CoordinatesSearchInput;
  CreateEventInput: CreateEventInput;
  Event: ResolverTypeWrapper<Event>;
  EventCategory: EventCategory;
  EventFilter: EventFilter;
  EventStatus: EventStatus;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  OpeningHours: ResolverTypeWrapper<OpeningHours>;
  OpeningHoursInput: OpeningHoursInput;
  Organizer: ResolverTypeWrapper<Organizer>;
  OrganizerInput: OrganizerInput;
  PaginatedBikeParks: ResolverTypeWrapper<PaginatedBikeParks>;
  PaginationInput: PaginationInput;
  Price: ResolverTypeWrapper<Price>;
  PriceInput: PriceInput;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  ScheduleItem: ResolverTypeWrapper<ScheduleItem>;
  ScheduleItemInput: ScheduleItemInput;
  SocialMedia: ResolverTypeWrapper<SocialMedia>;
  SocialMediaInput: SocialMediaInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateBikeParkInput: UpdateBikeParkInput;
  UpdateEventInput: UpdateEventInput;
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
  Contact: Contact;
  ContactInput: ContactInput;
  Coordinates: Coordinates;
  CoordinatesInput: CoordinatesInput;
  CoordinatesSearchInput: CoordinatesSearchInput;
  CreateEventInput: CreateEventInput;
  Event: Event;
  EventFilter: EventFilter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  OpeningHours: OpeningHours;
  OpeningHoursInput: OpeningHoursInput;
  Organizer: Organizer;
  OrganizerInput: OrganizerInput;
  PaginatedBikeParks: PaginatedBikeParks;
  PaginationInput: PaginationInput;
  Price: Price;
  PriceInput: PriceInput;
  Query: {};
  Review: Review;
  ScheduleItem: ScheduleItem;
  ScheduleItemInput: ScheduleItemInput;
  SocialMedia: SocialMedia;
  SocialMediaInput: SocialMediaInput;
  String: Scalars['String']['output'];
  UpdateBikeParkInput: UpdateBikeParkInput;
  UpdateEventInput: UpdateEventInput;
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
  contact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType>;
  coordinates?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficulty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facilities?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  features?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openingHours?: Resolver<Maybe<ResolversTypes['OpeningHours']>, ParentType, ContextType>;
  photos?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
  rules?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  socialMedia?: Resolver<Maybe<ResolversTypes['SocialMedia']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  weather?: Resolver<Maybe<ResolversTypes['Weather']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  attendeeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  availableTickets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['EventCategory'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  featured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organizer?: Resolver<ResolversTypes['Organizer'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  registrationEndDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schedule?: Resolver<Array<ResolversTypes['ScheduleItem']>, ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  venue?: Resolver<ResolversTypes['Venue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBikePark?: Resolver<ResolversTypes['BikePark'], ParentType, ContextType, RequireFields<MutationCreateBikeParkArgs, 'name'>>;
  createEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  createReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'bikeParkId' | 'comment' | 'rating'>>;
  deleteBikePark?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteBikeParkArgs, 'id'>>;
  deleteEvent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'id'>>;
  deleteReview?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password' | 'username'>>;
  registerForEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationRegisterForEventArgs, 'id'>>;
  updateBikePark?: Resolver<ResolversTypes['BikePark'], ParentType, ContextType, RequireFields<MutationUpdateBikeParkArgs, 'id' | 'input'>>;
  updateEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationUpdateEventArgs, 'id' | 'input'>>;
  updateProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateProfileArgs>>;
  updateReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'id'>>;
};

export type OpeningHoursResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpeningHours'] = ResolversParentTypes['OpeningHours']> = {
  friday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  monday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  saturday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sunday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thursday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tuesday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wednesday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

export type PriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  bikePark?: Resolver<Maybe<ResolversTypes['BikePark']>, ParentType, ContextType, RequireFields<QueryBikeParkArgs, 'id'>>;
  bikeParks?: Resolver<ResolversTypes['PaginatedBikeParks'], ParentType, ContextType, Partial<QueryBikeParksArgs>>;
  bikeParksByViewport?: Resolver<Array<ResolversTypes['BikePark']>, ParentType, ContextType, RequireFields<QueryBikeParksByViewportArgs, 'viewport'>>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventArgs, 'id'>>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, Partial<QueryEventsArgs>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryReviewsArgs, 'bikeParkId'>>;
  searchBikeParks?: Resolver<Array<ResolversTypes['BikePark']>, ParentType, ContextType, RequireFields<QuerySearchBikeParksArgs, 'query'>>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  bikePark?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  current?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  forecast?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeatherDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WeatherData'] = ResolversParentTypes['WeatherData']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  feelsLike?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  humidity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  precipitation?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  temperature?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  uvIndex?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  windSpeed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  BikePark?: BikeParkResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  OpeningHours?: OpeningHoursResolvers<ContextType>;
  Organizer?: OrganizerResolvers<ContextType>;
  PaginatedBikeParks?: PaginatedBikeParksResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  ScheduleItem?: ScheduleItemResolvers<ContextType>;
  SocialMedia?: SocialMediaResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Venue?: VenueResolvers<ContextType>;
  Weather?: WeatherResolvers<ContextType>;
  WeatherData?: WeatherDataResolvers<ContextType>;
};

