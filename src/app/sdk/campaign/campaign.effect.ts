import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { CampaignService } from './campaign.service';
import { CampaignAction } from './campaign.action';
import { isActive } from './campaign.util';

@Injectable()
export class CampaignEffects {

  constructor(
    private actions$: Actions,
    private campaignService: CampaignService
  ) { }

  getCampaigns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignAction.getCampaigns),
      delay(1000), //delay to simulate data fetching for spinner
      switchMap(() =>
        this.campaignService.getCampaigns$().pipe(
          map((campaigns) => campaigns.map((campaign) => ({ ...campaign, active: isActive(campaign) }))),
          map((campaignsWithActive) => CampaignAction.getCampaignsSuccess(campaignsWithActive)),
          catchError((error) =>
            of(CampaignAction.getCampaignsFailure({ error }))
          )
        )
      )
    )
  );

  addCampaigns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignAction.addCampaigns),
      map(({ campaigns }) => CampaignAction.addCampaignsSuccess(campaigns)),
      catchError((error) =>
        of(CampaignAction.addCampaignsFailure({ error }))
      )
    )
  )
}
