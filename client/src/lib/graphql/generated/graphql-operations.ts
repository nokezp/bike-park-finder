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
  amenities?: InputMaybe<Array<Scalars['String']['input']>>;
  coordinates?: InputMaybe<CoordinatesSearchInput>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createBikePark: BikePark;
  createReview: Review;
  deleteBikePark: Scalars['Boolean']['output'];
  deleteReview: Scalars['Boolean']['output'];
  login: AuthPayload;
  register: AuthPayload;
  updateBikePark: BikePark;
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


export type MutationCreateReviewArgs = {
  bikeParkId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
};


export type MutationDeleteBikeParkArgs = {
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


export type MutationUpdateBikeParkArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBikeParkInput;
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
  me?: Maybe<User>;
  reviews: Array<Review>;
  searchBikeParks: Array<BikePark>;
};


export type QueryBikeParkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBikeParksArgs = {
  filter?: InputMaybe<BikeParkFilter>;
  pagination: PaginationInput;
};


export type QueryBikeParksByViewportArgs = {
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  viewport: ViewportInput;
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

export type GetBikeParksQueryVariables = Exact<{
  filter?: InputMaybe<BikeParkFilter>;
  pagination: PaginationInput;
}>;


export type GetBikeParksQuery = { __typename?: 'Query', bikeParks: { __typename?: 'PaginatedBikeParks', totalCount: number, currentPage: number, totalPages: number, hasNextPage: boolean, bikeParks: Array<{ __typename?: 'BikePark', id: string, name: string, description?: string | null, location?: string | null, difficulty?: string | null, status?: string | null, features?: Array<string> | null, createdAt: string, updatedAt?: string | null, createdBy: string, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null }> } };

export type GetBikeParkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBikeParkQuery = { __typename?: 'Query', bikePark?: { __typename?: 'BikePark', id: string, name: string, description?: string | null, difficulty?: string | null, facilities?: Array<string> | null, features?: Array<string> | null, imageUrl?: string | null, location?: string | null, photos?: Array<string> | null, rating?: number | null, rules?: Array<string> | null, status?: string | null, videos?: Array<string> | null, website?: string | null, contact?: { __typename?: 'Contact', email?: string | null, phone?: string | null } | null, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null, openingHours?: { __typename?: 'OpeningHours', friday?: string | null, monday?: string | null, saturday?: string | null, sunday?: string | null, thursday?: string | null, tuesday?: string | null, wednesday?: string | null } | null, price?: { __typename?: 'Price', amount: number, currency: string } | null, socialMedia?: { __typename?: 'SocialMedia', facebook?: string | null, instagram?: string | null, twitter?: string | null, youtube?: string | null } | null, weather?: { __typename?: 'Weather', current?: any | null, forecast?: any | null } | null } | null };

export type GetBikeParksByViewportQueryVariables = Exact<{
  viewport: ViewportInput;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBikeParksByViewportQuery = { __typename?: 'Query', bikeParksByViewport: Array<{ __typename?: 'BikePark', id: string, name: string, description?: string | null, location?: string | null, difficulty?: string | null, status?: string | null, features?: Array<string> | null, createdAt: string, updatedAt?: string | null, createdBy: string, coordinates?: { __typename?: 'Coordinates', latitude: number, longitude: number } | null }> };

export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  AuthPayload?: (data: WithTypename<AuthPayload>) => null | string,
  BikePark?: (data: WithTypename<BikePark>) => null | string,
  Contact?: (data: WithTypename<Contact>) => null | string,
  Coordinates?: (data: WithTypename<Coordinates>) => null | string,
  OpeningHours?: (data: WithTypename<OpeningHours>) => null | string,
  PaginatedBikeParks?: (data: WithTypename<PaginatedBikeParks>) => null | string,
  Price?: (data: WithTypename<Price>) => null | string,
  Review?: (data: WithTypename<Review>) => null | string,
  SocialMedia?: (data: WithTypename<SocialMedia>) => null | string,
  User?: (data: WithTypename<User>) => null | string,
  Weather?: (data: WithTypename<Weather>) => null | string,
  WeatherData?: (data: WithTypename<WeatherData>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    bikePark?: GraphCacheResolver<WithTypename<Query>, QueryBikeParkArgs, WithTypename<BikePark> | string>,
    bikeParks?: GraphCacheResolver<WithTypename<Query>, QueryBikeParksArgs, WithTypename<PaginatedBikeParks> | string>,
    bikeParksByViewport?: GraphCacheResolver<WithTypename<Query>, QueryBikeParksByViewportArgs, Array<WithTypename<BikePark> | string>>,
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<User> | string>,
    reviews?: GraphCacheResolver<WithTypename<Query>, QueryReviewsArgs, Array<WithTypename<Review> | string>>,
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
    createdBy?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['ID'] | string>,
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
    updatedAt?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>,
    videos?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Array<Scalars['String'] | string>>,
    weather?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, WithTypename<Weather> | string>,
    website?: GraphCacheResolver<WithTypename<BikePark>, Record<string, never>, Scalars['String'] | string>
  },
  Contact?: {
    email?: GraphCacheResolver<WithTypename<Contact>, Record<string, never>, Scalars['String'] | string>,
    phone?: GraphCacheResolver<WithTypename<Contact>, Record<string, never>, Scalars['String'] | string>
  },
  Coordinates?: {
    latitude?: GraphCacheResolver<WithTypename<Coordinates>, Record<string, never>, Scalars['Float'] | string>,
    longitude?: GraphCacheResolver<WithTypename<Coordinates>, Record<string, never>, Scalars['Float'] | string>
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
  PaginatedBikeParks?: {
    bikeParks?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Array<WithTypename<BikePark> | string>>,
    currentPage?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Scalars['Int'] | string>,
    hasNextPage?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Scalars['Boolean'] | string>,
    totalCount?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Scalars['Int'] | string>,
    totalPages?: GraphCacheResolver<WithTypename<PaginatedBikeParks>, Record<string, never>, Scalars['Int'] | string>
  },
  Price?: {
    amount?: GraphCacheResolver<WithTypename<Price>, Record<string, never>, Scalars['Float'] | string>,
    currency?: GraphCacheResolver<WithTypename<Price>, Record<string, never>, Scalars['String'] | string>
  },
  Review?: {
    bikePark?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['ID'] | string>,
    comment?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['String'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['String'] | string>,
    createdBy?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['ID'] | string>,
    id?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['ID'] | string>,
    rating?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['Float'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<Review>, Record<string, never>, Scalars['String'] | string>
  },
  SocialMedia?: {
    facebook?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>,
    instagram?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>,
    twitter?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>,
    youtube?: GraphCacheResolver<WithTypename<SocialMedia>, Record<string, never>, Scalars['String'] | string>
  },
  User?: {
    createdAt?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    email?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    role?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    updatedAt?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    username?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>
  },
  Weather?: {
    current?: GraphCacheResolver<WithTypename<Weather>, Record<string, never>, Scalars['JSON'] | string>,
    forecast?: GraphCacheResolver<WithTypename<Weather>, Record<string, never>, Scalars['JSON'] | string>,
    lastUpdated?: GraphCacheResolver<WithTypename<Weather>, Record<string, never>, Scalars['String'] | string>
  },
  WeatherData?: {
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
  createReview?: GraphCacheOptimisticMutationResolver<MutationCreateReviewArgs, WithTypename<Review>>,
  deleteBikePark?: GraphCacheOptimisticMutationResolver<MutationDeleteBikeParkArgs, Scalars['Boolean']>,
  deleteReview?: GraphCacheOptimisticMutationResolver<MutationDeleteReviewArgs, Scalars['Boolean']>,
  login?: GraphCacheOptimisticMutationResolver<MutationLoginArgs, WithTypename<AuthPayload>>,
  register?: GraphCacheOptimisticMutationResolver<MutationRegisterArgs, WithTypename<AuthPayload>>,
  updateBikePark?: GraphCacheOptimisticMutationResolver<MutationUpdateBikeParkArgs, WithTypename<BikePark>>,
  updateProfile?: GraphCacheOptimisticMutationResolver<MutationUpdateProfileArgs, WithTypename<User>>,
  updateReview?: GraphCacheOptimisticMutationResolver<MutationUpdateReviewArgs, WithTypename<Review>>
};

export type GraphCacheUpdaters = {
  Query?: {
    bikePark?: GraphCacheUpdateResolver<{ bikePark: Maybe<WithTypename<BikePark>> }, QueryBikeParkArgs>,
    bikeParks?: GraphCacheUpdateResolver<{ bikeParks: WithTypename<PaginatedBikeParks> }, QueryBikeParksArgs>,
    bikeParksByViewport?: GraphCacheUpdateResolver<{ bikeParksByViewport: Array<WithTypename<BikePark>> }, QueryBikeParksByViewportArgs>,
    me?: GraphCacheUpdateResolver<{ me: Maybe<WithTypename<User>> }, Record<string, never>>,
    reviews?: GraphCacheUpdateResolver<{ reviews: Array<WithTypename<Review>> }, QueryReviewsArgs>,
    searchBikeParks?: GraphCacheUpdateResolver<{ searchBikeParks: Array<WithTypename<BikePark>> }, QuerySearchBikeParksArgs>
  },
  Mutation?: {
    createBikePark?: GraphCacheUpdateResolver<{ createBikePark: WithTypename<BikePark> }, MutationCreateBikeParkArgs>,
    createReview?: GraphCacheUpdateResolver<{ createReview: WithTypename<Review> }, MutationCreateReviewArgs>,
    deleteBikePark?: GraphCacheUpdateResolver<{ deleteBikePark: Scalars['Boolean'] }, MutationDeleteBikeParkArgs>,
    deleteReview?: GraphCacheUpdateResolver<{ deleteReview: Scalars['Boolean'] }, MutationDeleteReviewArgs>,
    login?: GraphCacheUpdateResolver<{ login: WithTypename<AuthPayload> }, MutationLoginArgs>,
    register?: GraphCacheUpdateResolver<{ register: WithTypename<AuthPayload> }, MutationRegisterArgs>,
    updateBikePark?: GraphCacheUpdateResolver<{ updateBikePark: WithTypename<BikePark> }, MutationUpdateBikeParkArgs>,
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
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    videos?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    weather?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>,
    website?: GraphCacheUpdateResolver<Maybe<WithTypename<BikePark>>, Record<string, never>>
  },
  Contact?: {
    email?: GraphCacheUpdateResolver<Maybe<WithTypename<Contact>>, Record<string, never>>,
    phone?: GraphCacheUpdateResolver<Maybe<WithTypename<Contact>>, Record<string, never>>
  },
  Coordinates?: {
    latitude?: GraphCacheUpdateResolver<Maybe<WithTypename<Coordinates>>, Record<string, never>>,
    longitude?: GraphCacheUpdateResolver<Maybe<WithTypename<Coordinates>>, Record<string, never>>
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
  PaginatedBikeParks?: {
    bikeParks?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>,
    currentPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>,
    hasNextPage?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>,
    totalCount?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>,
    totalPages?: GraphCacheUpdateResolver<Maybe<WithTypename<PaginatedBikeParks>>, Record<string, never>>
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
    rating?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<Review>>, Record<string, never>>
  },
  SocialMedia?: {
    facebook?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>,
    instagram?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>,
    twitter?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>,
    youtube?: GraphCacheUpdateResolver<Maybe<WithTypename<SocialMedia>>, Record<string, never>>
  },
  User?: {
    createdAt?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    email?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    id?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    name?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    role?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    updatedAt?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>,
    username?: GraphCacheUpdateResolver<Maybe<WithTypename<User>>, Record<string, never>>
  },
  Weather?: {
    current?: GraphCacheUpdateResolver<Maybe<WithTypename<Weather>>, Record<string, never>>,
    forecast?: GraphCacheUpdateResolver<Maybe<WithTypename<Weather>>, Record<string, never>>,
    lastUpdated?: GraphCacheUpdateResolver<Maybe<WithTypename<Weather>>, Record<string, never>>
  },
  WeatherData?: {
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

export const GetBikeParksDocument = gql`
    query GetBikeParks($filter: BikeParkFilter, $pagination: PaginationInput!) {
  bikeParks(filter: $filter, pagination: $pagination) {
    bikeParks {
      id
      name
      description
      location
      difficulty
      status
      features
      createdAt
      updatedAt
      createdBy
      coordinates {
        latitude
        longitude
      }
    }
    totalCount
    currentPage
    totalPages
    hasNextPage
  }
}
    `;

export function useGetBikeParksQuery(options: Omit<Urql.UseQueryArgs<GetBikeParksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBikeParksQuery, GetBikeParksQueryVariables>({ query: GetBikeParksDocument, ...options });
};
export const GetBikeParkDocument = gql`
    query GetBikePark($id: ID!) {
  bikePark(id: $id) {
    id
    name
    contact {
      email
      phone
    }
    coordinates {
      latitude
      longitude
    }
    description
    difficulty
    facilities
    features
    imageUrl
    location
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
      current
      forecast
    }
  }
}
    `;

export function useGetBikeParkQuery(options: Omit<Urql.UseQueryArgs<GetBikeParkQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBikeParkQuery, GetBikeParkQueryVariables>({ query: GetBikeParkDocument, ...options });
};
export const GetBikeParksByViewportDocument = gql`
    query GetBikeParksByViewport($viewport: ViewportInput!, $searchQuery: String) {
  bikeParksByViewport(viewport: $viewport, searchQuery: $searchQuery) {
    id
    name
    description
    location
    difficulty
    status
    features
    createdAt
    updatedAt
    createdBy
    coordinates {
      latitude
      longitude
    }
  }
}
    `;

export function useGetBikeParksByViewportQuery(options: Omit<Urql.UseQueryArgs<GetBikeParksByViewportQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBikeParksByViewportQuery, GetBikeParksByViewportQueryVariables>({ query: GetBikeParksByViewportDocument, ...options });
};
export const namedOperations = {
  Query: {
    GetBikeParks: 'GetBikeParks',
    GetBikePark: 'GetBikePark',
    GetBikeParksByViewport: 'GetBikeParksByViewport'
  }
}