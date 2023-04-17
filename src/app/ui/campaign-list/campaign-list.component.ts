import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { CampaignListDataSource } from './campaign-list-datasource';
import { CurrencyPipe } from '@angular/common';
import { Campaign } from 'src/app/sdk/campaign/campaign.model';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CampaignListService } from './campaign-list-service';
import { WindowRefService } from 'src/app/sdk/campaign/window-ref.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
  providers: [CurrencyPipe],
})
export class CampaignListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Campaign>;
  dataSource: CampaignListDataSource
  displayedColumns = ['name', 'active', 'startDate', 'endDate', 'budget'];

  constructor(
    campaignListDataSource: CampaignListDataSource,
    window: WindowRefService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,

    private service: CampaignListService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.dataSource = campaignListDataSource;
    window.nativeWindow.addCampaigns = (campaigns: Campaign[]) => {
      this.addCampaigns(campaigns);
    };
    this.registerIcons();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.loadCampaigns();
    this.table.dataSource = this.dataSource;
    this.changeDetectorRef.detectChanges();
  }

  filter(data: { startDate: Date; endDate: Date; }): void {
    this.dataSource.loadCampaigns(data.startDate, data.endDate);
  };

  clear(): void {
    this.dataSource.loadCampaigns();
    this.table.dataSource = this.dataSource;
  }

  searchCampaign(campaign: string): void {
    this.dataSource.search(campaign);
  }

  addCampaigns(campaigns: Campaign[]) {
    this.service.addCampaigns(campaigns);
  }

  registerIcons(): void {
    this.matIconRegistry.addSvgIcon('check-circle', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/check-circle.svg'));
    this.matIconRegistry.addSvgIcon('cancel-circle', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/cancel-circle.svg'));
  }

}
