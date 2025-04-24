import {
  ApprovalStatus,
  Event,
  GetPendingEventsDocument,
  GetPendingEventsQuery,
  MutationRejectEventArgs,
  RejectEventMutation,
  WithTypename
} from "../../lib/graphql/generated/graphql-operations";
import { Cache } from '@urql/exchange-graphcache';

export const rejectEventCacheUpdate = (
  parent: { rejectEvent: WithTypename<Event> },
  args: MutationRejectEventArgs,
  cache: Cache
) => {
  const result: RejectEventMutation = {
    rejectEvent: {
      ...parent.rejectEvent,
      id: args.id,
      approvalStatus: ApprovalStatus.Rejected,
      __typename: 'Event'
    } as Event
  };

  if (result.rejectEvent) {
    cache.updateQuery({
      query: GetPendingEventsDocument,
      variables: { status: ApprovalStatus.WaitingForApproval }
    }, (data: GetPendingEventsQuery | null) => {
      if (!data?.pendingEvents) {
        return null;
      }

      const event = data.pendingEvents.find((event) => event.id === args.id);
      if (event) {
        event.approvalStatus = ApprovalStatus.Rejected;
      }

      data.pendingEvents = data.pendingEvents.filter((event) => event.id !== args.id);
      data.pendingEvents.push(event as Event);

      return data;
    });
  }

  return null;
};

export default rejectEventCacheUpdate;
