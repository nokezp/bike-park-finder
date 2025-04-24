import {
  BikeParkDocument,
  BikeParkQuery,
  MutationToggleFavoriteBikeParkArgs,
  ToggleFavoriteBikeParkMutation,
  User,
  WithTypename
} from "../../lib/graphql/generated/graphql-operations";
import { Cache } from '@urql/exchange-graphcache';

export const toggleFavoriteBikeParkCacheUpdate = (
  parent: { toggleFavoriteBikePark: WithTypename<User> },
  args: MutationToggleFavoriteBikeParkArgs,
  cache: Cache
) => {
  const result: ToggleFavoriteBikeParkMutation = {
    toggleFavoriteBikePark: {
      id: parent.toggleFavoriteBikePark?.id ?? "",
      stats: {
        favoriteParks: [args.bikeParkId]
      }
    }
  };

  if (result.toggleFavoriteBikePark) {
    cache.updateQuery({
      query: BikeParkDocument,
      variables: {
        id: args.bikeParkId,
      }
    }, (data: BikeParkQuery | null) => {
      if (!data?.bikePark) {
        return null;
      }

      data.bikePark.isFavorite = !data.bikePark.isFavorite;
      return data;
    });
  }

  return null;
};

export default toggleFavoriteBikeParkCacheUpdate;
