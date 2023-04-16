import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampaignState } from './campaign.model';

export namespace CampaignSelector {
  const campaignsFeatureSelector = createFeatureSelector<CampaignState>('campaigns');

  export const selectCampaigns = createSelector(
    campaignsFeatureSelector,
    state => state.campaigns
  );

  export const isBusy = createSelector(
    campaignsFeatureSelector,
    state => state.isBusy
  );
}
