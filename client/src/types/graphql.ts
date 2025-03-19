import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  readonly token: Scalars['String']['output'];
  readonly user: User;
};

export type BikePark = {
  readonly address?: Maybe<Scalars['String']['output']>;
  readonly contact?: Maybe<Contact>;
  readonly coordinates?: Maybe<Coordinates>;
  readonly createdAt: Scalars['String']['output'];
  readonly createdBy: Scalars['ID']['output'];
  readonly description?: Maybe<Scalars['String']['output']>;
  readonly difficulty?: Maybe<Scalars['String']['output']>;
  readonly facilities?: Maybe<ReadonlyArray<Scalars['String']['output']>>;
  readonly features?: Maybe<ReadonlyArray<Scalars['String']['output']>>;
  readonly id: Scalars['ID']['output'];
  readonly imageUrl?: Maybe<Scalars['String']['output']>;
  readonly lastUpdated?: Maybe<Scalars['String']['output']>;
  readonly location?: Maybe<Scalars['String']['output']>;
  readonly name: Scalars['String']['output'];
  readonly openingHours?: Maybe<OpeningHours>;
  readonly photos?: Maybe<ReadonlyArray<Scalars['String']['output']>>;
  readonly price?: Maybe<Price>;
  readonly rating?: Maybe<Scalars['Float']['output']>;
  readonly reviews?: Maybe<ReadonlyArray<Review>>;
  readonly rules?: Maybe<ReadonlyArray<Scalars['String']['output']>>;
  readonly socialMedia?: Maybe<SocialMedia>;
  readonly status?: Maybe<Scalars['String']['output']>;
  readonly updatedAt?: Maybe<Scalars['String']['output']>;
  readonly videos?: Maybe<ReadonlyArray<Scalars['String']['output']>>;
  readonly weather?: Maybe<Weather>;
  readonly website?: Maybe<Scalars['String']['output']>;
};

export type Contact = {
  readonly email?: Maybe<Scalars['String']['output']>;
  readonly phone?: Maybe<Scalars['String']['output']>;
};

export type ContactInput = {
  readonly email?: InputMaybe<Scalars['String']['input']>;
  readonly phone?: InputMaybe<Scalars['String']['input']>;
};

export type Coordinates = {
  readonly latitude: Scalars['Float']['output'];
  readonly longitude: Scalars['Float']['output'];
};

export type CoordinatesInput = {
  readonly latitude: Scalars['Float']['input'];
  readonly longitude: Scalars['Float']['input'];
};

export type Mutation = {
  readonly createBikePark: BikePark;
  readonly createReview: Review;
  readonly deleteBikePark: Scalars['Boolean']['output'];
  readonly deleteReview: Scalars['Boolean']['output'];
  readonly login: AuthPayload;
  readonly register: AuthPayload;
  readonly updateBikePark: BikePark;
  readonly updateProfile: User;
  readonly updateReview: Review;
};


export type MutationCreateBikeParkArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<ContactInput>;
  coordinates?: InputMaybe<CoordinatesInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  facilities?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  features?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  openingHours?: InputMaybe<OpeningHoursInput>;
  photos?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  price?: InputMaybe<PriceInput>;
  rules?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  socialMedia?: InputMaybe<SocialMediaInput>;
  status?: InputMaybe<Scalars['String']['input']>;
  videos?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
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
  readonly friday?: Maybe<Scalars['String']['output']>;
  readonly monday?: Maybe<Scalars['String']['output']>;
  readonly saturday?: Maybe<Scalars['String']['output']>;
  readonly sunday?: Maybe<Scalars['String']['output']>;
  readonly thursday?: Maybe<Scalars['String']['output']>;
  readonly tuesday?: Maybe<Scalars['String']['output']>;
  readonly wednesday?: Maybe<Scalars['String']['output']>;
};

export type OpeningHoursInput = {
  readonly friday?: InputMaybe<Scalars['String']['input']>;
  readonly monday?: InputMaybe<Scalars['String']['input']>;
  readonly saturday?: InputMaybe<Scalars['String']['input']>;
  readonly sunday?: InputMaybe<Scalars['String']['input']>;
  readonly thursday?: InputMaybe<Scalars['String']['input']>;
  readonly tuesday?: InputMaybe<Scalars['String']['input']>;
  readonly wednesday?: InputMaybe<Scalars['String']['input']>;
};

export type Price = {
  readonly amount: Scalars['Float']['output'];
  readonly currency: Scalars['String']['output'];
};

export type PriceInput = {
  readonly amount: Scalars['Float']['input'];
  readonly currency: Scalars['String']['input'];
};

export type Query = {
  readonly bikePark?: Maybe<BikePark>;
  readonly bikeParks: ReadonlyArray<BikePark>;
  readonly me?: Maybe<User>;
  readonly reviews: ReadonlyArray<Review>;
  readonly searchBikeParks: ReadonlyArray<BikePark>;
};


export type QueryBikeParkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReviewsArgs = {
  bikeParkId: Scalars['ID']['input'];
};


export type QuerySearchBikeParksArgs = {
  query: Scalars['String']['input'];
};

export type Review = {
  readonly bikePark: Scalars['ID']['output'];
  readonly comment: Scalars['String']['output'];
  readonly createdAt: Scalars['String']['output'];
  readonly createdBy: Scalars['ID']['output'];
  readonly id: Scalars['ID']['output'];
  readonly rating: Scalars['Float']['output'];
  readonly updatedAt?: Maybe<Scalars['String']['output']>;
};

export type SocialMedia = {
  readonly facebook?: Maybe<Scalars['String']['output']>;
  readonly instagram?: Maybe<Scalars['String']['output']>;
  readonly twitter?: Maybe<Scalars['String']['output']>;
  readonly youtube?: Maybe<Scalars['String']['output']>;
};

export type SocialMediaInput = {
  readonly facebook?: InputMaybe<Scalars['String']['input']>;
  readonly instagram?: InputMaybe<Scalars['String']['input']>;
  readonly twitter?: InputMaybe<Scalars['String']['input']>;
  readonly youtube?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBikeParkInput = {
  readonly address?: InputMaybe<Scalars['String']['input']>;
  readonly contact?: InputMaybe<ContactInput>;
  readonly coordinates?: InputMaybe<CoordinatesInput>;
  readonly description?: InputMaybe<Scalars['String']['input']>;
  readonly difficulty?: InputMaybe<Scalars['String']['input']>;
  readonly facilities?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly features?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly imageUrl?: InputMaybe<Scalars['String']['input']>;
  readonly location?: InputMaybe<Scalars['String']['input']>;
  readonly name?: InputMaybe<Scalars['String']['input']>;
  readonly openingHours?: InputMaybe<OpeningHoursInput>;
  readonly photos?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly price?: InputMaybe<PriceInput>;
  readonly rules?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly socialMedia?: InputMaybe<SocialMediaInput>;
  readonly status?: InputMaybe<Scalars['String']['input']>;
  readonly videos?: InputMaybe<ReadonlyArray<Scalars['String']['input']>>;
  readonly website?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  readonly createdAt: Scalars['String']['output'];
  readonly email: Scalars['String']['output'];
  readonly id: Scalars['ID']['output'];
  readonly name?: Maybe<Scalars['String']['output']>;
  readonly role: Scalars['String']['output'];
  readonly updatedAt: Scalars['String']['output'];
  readonly username: Scalars['String']['output'];
};

export type Weather = {
  readonly current?: Maybe<Scalars['JSON']['output']>;
  readonly forecast?: Maybe<Scalars['JSON']['output']>;
  readonly lastUpdated?: Maybe<Scalars['String']['output']>;
};

export type WeatherData = {
  readonly description: Scalars['String']['output'];
  readonly feelsLike: Scalars['Float']['output'];
  readonly humidity: Scalars['Int']['output'];
  readonly icon: Scalars['String']['output'];
  readonly precipitation: Scalars['Float']['output'];
  readonly temperature: Scalars['Float']['output'];
  readonly uvIndex: Scalars['Float']['output'];
  readonly windSpeed: Scalars['Float']['output'];
};

export type GetBikeParksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBikeParksQuery = { readonly bikeParks: ReadonlyArray<{ readonly id: string, readonly name: string, readonly description?: string | null, readonly location?: string | null, readonly features?: ReadonlyArray<string> | null, readonly difficulty?: string | null, readonly rating?: number | null, readonly imageUrl?: string | null, readonly address?: string | null, readonly status?: string | null, readonly createdAt: string, readonly updatedAt?: string | null, readonly coordinates?: { readonly latitude: number, readonly longitude: number } | null }> };


export const GetBikeParksDocument = gql`
    query GetBikeParks {
  bikeParks {
    id
    name
    description
    location
    features
    difficulty
    rating
    imageUrl
    address
    coordinates {
      latitude
      longitude
    }
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetBikeParksQuery__
 *
 * To run a query within a React component, call `useGetBikeParksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBikeParksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBikeParksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBikeParksQuery(baseOptions?: Apollo.QueryHookOptions<GetBikeParksQuery, GetBikeParksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBikeParksQuery, GetBikeParksQueryVariables>(GetBikeParksDocument, options);
      }
export function useGetBikeParksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBikeParksQuery, GetBikeParksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBikeParksQuery, GetBikeParksQueryVariables>(GetBikeParksDocument, options);
        }
export function useGetBikeParksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBikeParksQuery, GetBikeParksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBikeParksQuery, GetBikeParksQueryVariables>(GetBikeParksDocument, options);
        }
export type GetBikeParksQueryHookResult = ReturnType<typeof useGetBikeParksQuery>;
export type GetBikeParksLazyQueryHookResult = ReturnType<typeof useGetBikeParksLazyQuery>;
export type GetBikeParksSuspenseQueryHookResult = ReturnType<typeof useGetBikeParksSuspenseQuery>;
export type GetBikeParksQueryResult = Apollo.QueryResult<GetBikeParksQuery, GetBikeParksQueryVariables>;