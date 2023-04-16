import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-campaign-search',
  templateUrl: './campaign-search.component.html',
  styleUrls: ['./campaign-search.component.scss']
})
export class CampaignSearchComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(searchTerm: string) {
    this.search.emit(searchTerm);
  }
}

