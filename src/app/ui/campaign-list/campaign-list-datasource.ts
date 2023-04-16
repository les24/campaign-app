import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { Campaign } from 'src/app/sdk/campaign/campaign.model';
import { Injectable } from '@angular/core';
import { CampaignListService } from './campaign-list-service';

@Injectable()
export class CampaignListDataSource extends DataSource<Campaign> {

  private campaigns: Campaign[] = [];
  private campaigns$ = new BehaviorSubject<Campaign[]>([]);
  paginator: MatPaginator | undefined;

  private startDate: Date | undefined;
  private endDate: Date | undefined;

  constructor(private campaignListService: CampaignListService) {
    super();
  }

  connect(): Observable<Campaign[]> {
    if (!this.paginator) {
      throw new Error("Please set the paginator and sort on the data source before connecting.");
    }
    return merge(this.campaigns$, this.paginator.page)
      .pipe(map(() => {
        this.campaigns = this.campaigns$.getValue();
        return this.getPagedData([...this.campaigns]);
      }));
  }

  disconnect(): void {
    this.campaigns$.complete();
  }

  loadCampaigns(startDate?: Date, endDate?: Date): void {
    this.campaignListService.getCampaigns$().subscribe(campaigns => {
      if (startDate && endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
        campaigns = campaigns.filter(campaign =>
          new Date(campaign.startDate) >= startDate && new Date(campaign.endDate) <= endDate
        );
      }
      this.campaigns$.next(campaigns);
      if (this.paginator) {
        this.paginator.length = campaigns.length;
        this.paginator.pageIndex = 0;
        this.paginator!.page.next({ pageIndex: 0, pageSize: this.paginator!.pageSize, length: campaigns.length });
      }
    });
  }

  search(searchTerm: string): void {
    this.loadCampaigns(this.startDate, this.endDate);
    if (searchTerm) {
      const filteredCampaigns = this.campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (this.paginator) {
        this.paginator.length = filteredCampaigns.length;
        this.paginator.pageIndex = 0;
        this.paginator!.page.next({ pageIndex: 0, pageSize: this.paginator!.pageSize, length: filteredCampaigns.length });
      }
      this.campaigns$.next(filteredCampaigns);
    }
  }

  private getPagedData(data: Campaign[]): Campaign[] {
    if (!this.paginator) {
      return data;
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
}
