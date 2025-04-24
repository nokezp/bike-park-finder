import {
  ApprovalStatus,
  BikePark,
  GetPendingBikeParksDocument,
  GetPendingBikeParksQuery,
  MutationRejectBikeParkArgs,
  RejectBikeParkMutation,
  WithTypename
} from "../../lib/graphql/generated/graphql-operations";
import { Cache } from '@urql/exchange-graphcache';

export const rejectBikeParkCacheUpdate = (
  parent: { rejectBikePark: WithTypename<BikePark> },
  args: MutationRejectBikeParkArgs,
  cache: Cache
) => {
  const result: RejectBikeParkMutation = {
    rejectBikePark: {
      ...parent.rejectBikePark,
      id: args.id,
      approvalStatus: ApprovalStatus.Rejected,
      __typename: 'BikePark'
    } as BikePark
  };

  if (result.rejectBikePark) {
    cache.updateQuery({
      query: GetPendingBikeParksDocument,
      variables: { status: ApprovalStatus.WaitingForApproval }
    }, (data: GetPendingBikeParksQuery | null) => {
      if (!data?.pendingBikeParks) {
        return null;
      }

      const bikePark = data.pendingBikeParks.find((bikePark) => bikePark.id === args.id);
      if (bikePark) {
        bikePark.approvalStatus = ApprovalStatus.Rejected;
      }

      data.pendingBikeParks = data.pendingBikeParks.filter((bikePark) => bikePark.id !== args.id);
      data.pendingBikeParks.push(bikePark as BikePark);

      return data;
    });
  }

  return null;
};

export default rejectBikeParkCacheUpdate;
