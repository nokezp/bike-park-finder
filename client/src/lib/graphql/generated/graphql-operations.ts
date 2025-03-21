/* eslint-disable */
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