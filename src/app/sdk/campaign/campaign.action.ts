import { createAction } from "@ngrx/store";
import { Campaign } from "./campaign.model";

const ACTION_PREFIX = "[Campaign]";

export namespace CampaignAction {
  export const getCampaigns = createAction(
    `${ACTION_PREFIX} Get Campaigns`,
  );
  export const getCampaignsSuccess = createAction(
    `${ACTION_PREFIX} Get Campaigns Success`,
    (campaigns: Campaign[]) => ({ campaigns })
  );

  export const getCampaignsFailure = createAction(
    `${ACTION_PREFIX} Get Campaigns Failure`,
    (error: any) => ({ error })
  );

  export const addCampaigns = createAction(
    `${ACTION_PREFIX} Add Campaigns`,
    (campaigns: Campaign[]) => ({ campaigns })
  );

  export const addCampaignsSuccess = createAction(
    `${ACTION_PREFIX} Add Campaigns Success`,
    (campaigns: Campaign[]) => ({ campaigns })
  );

  export const addCampaignsFailure = createAction(
    `${ACTION_PREFIX} Add Campaigns Failure`,
    (error: any) => ({ error })
  );
}
