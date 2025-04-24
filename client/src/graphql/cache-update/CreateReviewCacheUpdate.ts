import {
  CreateReviewMutation,
  MutationCreateReviewArgs,
  Review,
  ReviewsDocument,
  ReviewsQuery,
  WithTypename
} from "../../lib/graphql/generated/graphql-operations";
import { Cache } from '@urql/exchange-graphcache';

const createReviewCacheUpdate = (
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

  if (result.createReview) {
    cache.updateQuery({
      query: ReviewsDocument,
      variables: {
        bikeParkId: args.bikeParkId,
        page: 1,
        limit: 5
      }
    }, (data: ReviewsQuery | null) => {
      if (!data?.reviews?.reviews) {
        return null;
      }

      const newReview = result.createReview;
      data.reviews.reviews.unshift(newReview);
      return data;
    });
  }
  return null;
};

export default createReviewCacheUpdate;
