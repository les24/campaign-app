import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CampaignAction } from 'src/app/sdk/campaign/campaign.action';
import { CampaignState } from 'src/app/sdk/campaign/campaign.model';
import { CampaignSelector } from 'src/app/sdk/campaign/campaign.selector';

@Component({
  selector: 'app-campaign-list-container',
  template: `
  <app-spinner *ngIf="isBusy$ | async"></app-spinner>
  <app-campaign-list></app-campaign-list>
  `,
})
export class CampaignListContainer implements OnInit {

  isBusy$: Observable<boolean> | undefined;

  constructor(private store: Store<CampaignState>) { }

  ngOnInit(): void {
    this.store.dispatch(CampaignAction.getCampaigns());
    this.isBusy$ = this.store.select(CampaignSelector.isBusy);
  }
}

