export interface Campaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  active?: boolean;
};

export interface CampaignState {
  campaigns: Campaign[];
  isBusy: boolean;
}
