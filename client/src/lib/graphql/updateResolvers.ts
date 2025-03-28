import CreateReviewCacheUpdate from "../../graphql/cache-update/CreateReviewCacheUpdate";
import loginUserCacheUpdate from "../../graphql/cache-update/LoginUserCacheUpdate";
import {
  GraphCacheUpdaters,
  WithTypename,
  AuthPayload,
  MutationLoginArgs,
  CreateReviewMutation,
  MutationCreateReviewArgs,
  Review
} from "./generated/graphql-operations";
import { Cache } from '@urql/exchange-graphcache';

const loginUserCacheUpdateWrapper = (
  parent: { login: WithTypename<AuthPayload> },
  args: MutationLoginArgs,
  cache: Cache
) => {
  const result = {
    login: {
      ...parent.login,
      token: parent.login.token || ''
    }
  };
  loginUserCacheUpdate(result, args, cache);
};

const createReviewCacheUpdateWrapper = (
  parent: { createReview: WithTypename<Review> },
  args: MutationCreateReviewArgs,
  cache: Cache
) => {
  const result: CreateReviewMutation = {
    createReview: {
      ...parent.createReview,
      id: parent.createReview.id || '',
      comment: parent.createReview.comment || '',
      rating: parent.createReview.rating || 0,
      bikePark: parent.createReview.bikePark || '',
      createdAt: parent.createReview.createdAt || '',
      createdBy: parent.createReview.createdBy ? {
        ...parent.createReview.createdBy,
        id: parent.createReview.createdBy.id || '',
        username: parent.createReview.createdBy.username || '',
        email: parent.createReview.createdBy.email || ''
      } : {
        __typename: 'User',
        id: '',
        username: '',
        email: ''
      }
    }
  };

  CreateReviewCacheUpdate(result, args, cache);
};

const updateResolvers: GraphCacheUpdaters = {
  Mutation: {
    login: loginUserCacheUpdateWrapper,
    createReview: createReviewCacheUpdateWrapper,
  }
};

export default updateResolvers;
