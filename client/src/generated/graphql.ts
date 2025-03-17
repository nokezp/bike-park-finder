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

export type CreateParkInput = {
  amenities: Array<Scalars['String']['input']>;
  coordinates: CoordinatesInput;
  description: Scalars['String']['input'];
  difficulty: Scalars['String']['input'];
  features: Array<Scalars['String']['input']>;
  hasDrops: Scalars['Boolean']['input'];
  hasJumps: Scalars['Boolean']['input'];
  hasLiftAccess: Scalars['Boolean']['input'];
  hasTechnicalSections: Scalars['Boolean']['input'];
  images: Array<Scalars['String']['input']>;
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPark: Park;
  deletePark: Scalars['Boolean']['output'];
  updatePark: Park;
};


export type MutationCreateParkArgs = {
  input: CreateParkInput;
};


export type MutationDeleteParkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateParkArgs = {
  id: Scalars['ID']['input'];
  input: UpdateParkInput;
};

export type Park = {
  __typename?: 'Park';
  _id: Scalars['ID']['output'];
  amenities: Array<Scalars['String']['output']>;
  coordinates: Coordinates;
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['ID']['output'];
  description: Scalars['String']['output'];
  difficulty: Scalars['String']['output'];
  features: Array<Scalars['String']['output']>;
  hasDrops: Scalars['Boolean']['output'];
  hasJumps: Scalars['Boolean']['output'];
  hasLiftAccess: Scalars['Boolean']['output'];
  hasTechnicalSections: Scalars['Boolean']['output'];
  images: Array<Scalars['String']['output']>;
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  park?: Maybe<Park>;
  parks: Array<Park>;
  searchParks: Array<Park>;
};


export type QueryParkArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchParksArgs = {
  query: Scalars['String']['input'];
};

export type UpdateParkInput = {
  amenities?: InputMaybe<Array<Scalars['String']['input']>>;
  coordinates?: InputMaybe<CoordinatesInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  hasDrops?: InputMaybe<Scalars['Boolean']['input']>;
  hasJumps?: InputMaybe<Scalars['Boolean']['input']>;
  hasLiftAccess?: InputMaybe<Scalars['Boolean']['input']>;
  hasTechnicalSections?: InputMaybe<Scalars['Boolean']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GetParksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetParksQuery = { __typename?: 'Query', parks: Array<{ __typename?: 'Park', _id: string, name: string, description: string, location: string, difficulty: string, features: Array<string>, amenities: Array<string>, images: Array<string>, hasLiftAccess: boolean, hasTechnicalSections: boolean, hasJumps: boolean, hasDrops: boolean, createdAt: string, updatedAt: string, coordinates: { __typename?: 'Coordinates', latitude: number, longitude: number } }> };


export const GetParksDocument = gql`
    query GetParks {
  parks {
    _id
    name
    description
    location
    coordinates {
      latitude
      longitude
    }
    difficulty
    features
    amenities
    images
    hasLiftAccess
    hasTechnicalSections
    hasJumps
    hasDrops
    createdAt
    updatedAt
  }
}
    `;

export function useGetParksQuery(options?: Omit<Urql.UseQueryArgs<GetParksQueryVariables>, 'query'>) {
  return Urql.useQuery<GetParksQuery, GetParksQueryVariables>({ query: GetParksDocument, ...options });
};