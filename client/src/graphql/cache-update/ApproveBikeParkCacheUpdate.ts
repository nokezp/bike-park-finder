import {
  ApprovalStatus,
  ApproveBikeParkMutation,
  BikePark,
  GetPendingBikeParksDocument,
  GetPendingBikeParksQuery,
  MutationApproveBikeParkArgs,
  WithTypename
} from "../../lib/graphql/generated/graphql-operations";
import { Cache } from '@urql/exchange-graphcache';

export const approveBikeParkCacheUpdate = (
  parent: { approveBikePark: WithTypename<BikePark> },
  args: MutationApproveBikeParkArgs,
  cache: Cache
) => {
  const result: ApproveBikeParkMutation = {
    approveBikePark: {
      ...parent.approveBikePark,
      id: args.id,
      approvalStatus: ApprovalStatus.Approved,
      __typename: 'BikePark'
    } as BikePark
  };

  if (result.approveBikePark) {
    cache.updateQuery({
      query: GetPendingBikeParksDocument,
      variables: { status: ApprovalStatus.WaitingForApproval }
    }, (data: GetPendingBikeParksQuery | null) => {
      if (!data?.pendingBikeParks) {
        return null;
      }

      const bikePark = data.pendingBikeParks.find((bikePark) => bikePark.id === args.id);
      if (bikePark) {
        bikePark.approvalStatus = ApprovalStatus.Approved;
      }

      data.pendingBikeParks = data.pendingBikeParks.filter((bikePark) => bikePark.id !== args.id);
      data.pendingBikeParks.push(bikePark as BikePark);

      return data;
    });
  }

  return null;
};

export default approveBikeParkCacheUpdate;
