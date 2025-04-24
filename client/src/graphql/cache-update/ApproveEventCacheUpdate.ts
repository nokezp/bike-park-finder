import {
  ApprovalStatus,
  ApproveEventMutation,
  Event,
  GetPendingEventsDocument,
  GetPendingEventsQuery,
  MutationApproveEventArgs,
  WithTypename
} from "../../lib/graphql/generated/graphql-operations";
import { Cache } from '@urql/exchange-graphcache';

export const approveEventCacheUpdate = (
  parent: { approveEvent: WithTypename<Event> },
  args: MutationApproveEventArgs,
  cache: Cache
) => {
  const result: ApproveEventMutation = {
    approveEvent: {
      ...parent.approveEvent,
      id: args.id,
      approvalStatus: ApprovalStatus.Approved,
      __typename: 'Event'
    } as Event
  };

  if (result.approveEvent) {
    cache.updateQuery({
      query: GetPendingEventsDocument,
      variables: { status: ApprovalStatus.WaitingForApproval }
    }, (data: GetPendingEventsQuery | null) => {
      if (!data?.pendingEvents) {
        return null;
      }

      const event = data.pendingEvents.find((event) => event.id === args.id);
      if (event) {
        event.approvalStatus = ApprovalStatus.Approved;
      }

      data.pendingEvents = data.pendingEvents.filter((event) => event.id !== args.id);
      data.pendingEvents.push(event as Event);

      return data;
    });
  }

  return null;
};

export default approveEventCacheUpdate;
