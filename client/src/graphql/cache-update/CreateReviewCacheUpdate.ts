import {
  CreateReviewMutation,
  MutationCreateReviewArgs,
  ReviewsDocument,
  ReviewsQuery
} from "../../lib/graphql/generated/graphql-operations";
import { Cache } from '@urql/exchange-graphcache';

const createReviewCacheUpdate = (
  result: CreateReviewMutation, 
  _args: MutationCreateReviewArgs, 
  cache: Cache
) => {
  if (result.createReview) {
    cache.updateQuery({
      query: ReviewsDocument,
      variables: {
        bikeParkId: _args.bikeParkId,
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
}

export default createReviewCacheUpdate;
