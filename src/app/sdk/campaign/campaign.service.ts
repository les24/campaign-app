import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Campaign } from './campaign.model';
import { generateCampaigns } from './campaign.util';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor() { }

  getCampaigns$(): Observable<Campaign[]> {
    const campaigns = generateCampaigns(1000);
    return of(campaigns)
  }
}
