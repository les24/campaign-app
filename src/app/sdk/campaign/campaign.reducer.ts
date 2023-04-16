import { createReducer, on } from "@ngrx/store";
import { CampaignAction } from './campaign.action';
import { CampaignState } from './campaign.model';


const CAMPAIGN_INITIAL_STATE: CampaignState = {
  campaigns: [],
  isBusy: false
};

export const campaignReducer = createReducer(
  CAMPAIGN_INITIAL_STATE,
  on(CampaignAction.getCampaigns, (state: CampaignState): CampaignState => {
    return {
      ...state,
      isBusy: true
    };
  }),
  on(CampaignAction.getCampaignsSuccess, (state: CampaignState, { campaigns }) => {
    return {
      ...state,
      isBusy: false,
      campaigns: campaigns
    };
  }),
  on(CampaignAction.addCampaigns, (state: CampaignState): CampaignState => {
    return {
      ...state,
      isBusy: true
    };
  }),
  on(CampaignAction.addCampaignsSuccess, (state: CampaignState, { campaigns }) => {
    return {
      ...state,
      isBusy: false,
      campaigns: [...state.campaigns, ...campaigns]
    };
  }),
  on(CampaignAction.addCampaignsFailure, CampaignAction.getCampaignsFailure, (state, { error }): CampaignState => ({
    ...state,
    isBusy: false
  }
  ))
);

