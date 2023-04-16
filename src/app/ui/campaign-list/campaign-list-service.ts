import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CampaignAction } from "src/app/sdk/campaign/campaign.action";
import { Campaign, CampaignState } from "src/app/sdk/campaign/campaign.model";
import { CampaignSelector } from "src/app/sdk/campaign/campaign.selector";

@Injectable({
  providedIn: 'root'
})
export class CampaignListService {

  constructor(
    private store: Store<CampaignState>) {

  }

  getCampaigns$(): Observable<Campaign[]> {
    return this.store.pipe(select(CampaignSelector.selectCampaigns));
  }

  addCampaigns(campaigns: Campaign[]) {
    this.store.dispatch(CampaignAction.addCampaigns(campaigns));
  }
}

