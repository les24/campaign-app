import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CampaignListComponent } from './ui/campaign-list/campaign-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CampaignSearchComponent } from './ui/campaign-search/campaign-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRangeComponent } from './ui/date-range/date-range.component';
import { CampaignListDataSource } from './ui/campaign-list/campaign-list-datasource';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { campaignReducer } from './sdk/campaign/campaign.reducer';
import { CampaignService } from './sdk/campaign/campaign.service';
import { CampaignEffects } from './sdk/campaign/campaign.effect';
import { EffectsModule } from '@ngrx/effects';
import { CampaignListContainer } from './ui/campaign-list/campaing-list.container';
import { LoadingComponent } from './ui/loading/loading.component';
import { MatChipsModule } from "@angular/material/chips"
@NgModule({
  declarations: [
    AppComponent,
    CampaignListComponent,
    CampaignSearchComponent,
    DateRangeComponent,
    CampaignListContainer,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    EffectsModule.forRoot([CampaignEffects]),
    StoreModule.forRoot({ campaigns: campaignReducer })
  ],
  providers: [CampaignListDataSource, CampaignService, CampaignEffects, { provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
