import { Campaign } from "./campaign.model";

export function generateCampaigns(numofCampaigns: number): Campaign[] {
  const campaigns: Campaign[] = [];
  const startDateRange = new Date('2016-01-01').getTime();
  const endDateRange = new Date('2023-12-31').getTime();
  const budgetRange = 100000;

  for (let i = 0; i < numofCampaigns; i++) {
    const name = `Campaign ${i}`
    const startDate = new Date(startDateRange + Math.random() * (endDateRange - startDateRange));
    const endDate = new Date(startDate.getTime() + Math.random() * (endDateRange - startDate.getTime()));
    const budget = Math.floor(Math.random() * budgetRange);
    campaigns.push({
      id: i,
      name,
      startDate: startDate.toLocaleDateString(),
      endDate: endDate.toLocaleDateString(),
      budget
    });
  }
  return campaigns;
}

export function isActive(campaign: Campaign): boolean {
  const today = new Date();
  return today >= new Date(campaign.startDate) && today <= new Date(campaign.endDate);
}


