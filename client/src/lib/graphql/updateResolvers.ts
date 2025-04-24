import approveBikeParkCacheUpdate from "../../graphql/cache-update/ApproveBikeParkCacheUpdate";
import approveEventCacheUpdate from "../../graphql/cache-update/ApproveEventCacheUpdate";
import createReviewCacheUpdate from "../../graphql/cache-update/CreateReviewCacheUpdate";
import loginUserCacheUpdate from "../../graphql/cache-update/LoginUserCacheUpdate";
import rejectBikeParkCacheUpdate from "../../graphql/cache-update/RejectBikeParkCacheUpdate";
import rejectEventCacheUpdate from "../../graphql/cache-update/RejectEventCacheUpdate";
import toggleFavoriteBikeParkCacheUpdate from "../../graphql/cache-update/ToggleFavoriteBikeParkCacheUpdate";
import { GraphCacheUpdaters } from "./generated/graphql-operations";

const updateResolvers: GraphCacheUpdaters = {
  Mutation: {
    login: loginUserCacheUpdate,
    createReview: createReviewCacheUpdate,
    toggleFavoriteBikePark: toggleFavoriteBikeParkCacheUpdate,
    approveBikePark: approveBikeParkCacheUpdate,
    rejectBikePark: rejectBikeParkCacheUpdate,
    approveEvent: approveEventCacheUpdate,
    rejectEvent: rejectEventCacheUpdate
  }
};

export default updateResolvers;
