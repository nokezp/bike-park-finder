import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type BikeParkFilter = {
  readonly difficulty?: InputMaybe<Scalars['String']['input']>;
  readonly location?: InputMaybe<Scalars['String']['input']>;
  readonly name?: InputMaybe<Scalars['String']['input']>;
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

export type PaginatedBikeParks = {
  readonly bikeParks: ReadonlyArray<BikePark>;
  readonly currentPage: Scalars['Int']['output'];
  readonly hasNextPage: Scalars['Boolean']['output'];
  readonly totalCount: Scalars['Int']['output'];
  readonly totalPages: Scalars['Int']['output'];
};

export type PaginationInput = {
  readonly limit: Scalars['Int']['input'];
  readonly page: Scalars['Int']['input'];
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
  readonly bikeParks: PaginatedBikeParks;
  readonly me?: Maybe<User>;
  readonly reviews: ReadonlyArray<Review>;
  readonly searchBikeParks: ReadonlyArray<BikePark>;
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
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  OpeningHours: ResolverTypeWrapper<OpeningHours>;
  OpeningHoursInput: OpeningHoursInput;
  PaginatedBikeParks: ResolverTypeWrapper<PaginatedBikeParks>;
  PaginationInput: PaginationInput;
  Price: ResolverTypeWrapper<Price>;
  PriceInput: PriceInput;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  SocialMedia: ResolverTypeWrapper<SocialMedia>;
  SocialMediaInput: SocialMediaInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateBikeParkInput: UpdateBikeParkInput;
  User: ResolverTypeWrapper<User>;
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
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  OpeningHours: OpeningHours;
  OpeningHoursInput: OpeningHoursInput;
  PaginatedBikeParks: PaginatedBikeParks;
  PaginationInput: PaginationInput;
  Price: Price;
  PriceInput: PriceInput;
  Query: {};
  Review: Review;
  SocialMedia: SocialMedia;
  SocialMediaInput: SocialMediaInput;
  String: Scalars['String']['output'];
  UpdateBikeParkInput: UpdateBikeParkInput;
  User: User;
  Weather: Weather;
  WeatherData: WeatherData;
};

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BikeParkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BikePark'] = ResolversParentTypes['BikePark']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType>;
  coordinates?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  difficulty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facilities?: Resolver<Maybe<ReadonlyArray<ResolversTypes['String']>>, ParentType, ContextType>;
  features?: Resolver<Maybe<ReadonlyArray<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openingHours?: Resolver<Maybe<ResolversTypes['OpeningHours']>, ParentType, ContextType>;
  photos?: Resolver<Maybe<ReadonlyArray<ResolversTypes['String']>>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  reviews?: Resolver<Maybe<ReadonlyArray<ResolversTypes['Review']>>, ParentType, ContextType>;
  rules?: Resolver<Maybe<ReadonlyArray<ResolversTypes['String']>>, ParentType, ContextType>;
  socialMedia?: Resolver<Maybe<ResolversTypes['SocialMedia']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  videos?: Resolver<Maybe<ReadonlyArray<ResolversTypes['String']>>, ParentType, ContextType>;
  weather?: Resolver<Maybe<ResolversTypes['Weather']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContactResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBikePark?: Resolver<ResolversTypes['BikePark'], ParentType, ContextType, RequireFields<MutationCreateBikeParkArgs, 'name'>>;
  createReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'bikeParkId' | 'comment' | 'rating'>>;
  deleteBikePark?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteBikeParkArgs, 'id'>>;
  deleteReview?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password' | 'username'>>;
  updateBikePark?: Resolver<ResolversTypes['BikePark'], ParentType, ContextType, RequireFields<MutationUpdateBikeParkArgs, 'id' | 'input'>>;
  updateProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateProfileArgs>>;
  updateReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'id'>>;
};

export type OpeningHoursResolvers<ContextType = Context, ParentType extends ResolversParentTypes['OpeningHours'] = ResolversParentTypes['OpeningHours']> = {
  friday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  monday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  saturday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sunday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thursday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tuesday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wednesday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedBikeParksResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PaginatedBikeParks'] = ResolversParentTypes['PaginatedBikeParks']> = {
  bikeParks?: Resolver<ReadonlyArray<ResolversTypes['BikePark']>, ParentType, ContextType>;
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  bikePark?: Resolver<Maybe<ResolversTypes['BikePark']>, ParentType, ContextType, RequireFields<QueryBikeParkArgs, 'id'>>;
  bikeParks?: Resolver<ResolversTypes['PaginatedBikeParks'], ParentType, ContextType, RequireFields<QueryBikeParksArgs, 'pagination'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  reviews?: Resolver<ReadonlyArray<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryReviewsArgs, 'bikeParkId'>>;
  searchBikeParks?: Resolver<ReadonlyArray<ResolversTypes['BikePark']>, ParentType, ContextType, RequireFields<QuerySearchBikeParksArgs, 'query'>>;
};

export type ReviewResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  bikePark?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialMediaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SocialMedia'] = ResolversParentTypes['SocialMedia']> = {
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeatherResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Weather'] = ResolversParentTypes['Weather']> = {
  current?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  forecast?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  lastUpdated?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WeatherDataResolvers<ContextType = Context, ParentType extends ResolversParentTypes['WeatherData'] = ResolversParentTypes['WeatherData']> = {
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

export type Resolvers<ContextType = Context> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  BikePark?: BikeParkResolvers<ContextType>;
  Contact?: ContactResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  OpeningHours?: OpeningHoursResolvers<ContextType>;
  PaginatedBikeParks?: PaginatedBikeParksResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  SocialMedia?: SocialMediaResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Weather?: WeatherResolvers<ContextType>;
  WeatherData?: WeatherDataResolvers<ContextType>;
};

