export type DailyGmvSnapshot = {
  date: string;
  value: number;
  deltaPercent: number;
};

export type ForecastPoint = {
  label: string;
  gmv: number;
};

export type VendorRevenueItem = {
  vendorId: string;
  vendorName: string;
  revenue: number;
  orders: number;
};

export type ListingRevenueItem = {
  listingId: string;
  listingTitle: string;
  vendorName: string;
  revenue: number;
  unitsSold: number;
};

export type PricingInefficiencyItem = {
  listingId: string;
  listingTitle: string;
  currentPrice: number;
  suggestedPrice: number;
  revenueGap: number;
};

export type AbandonedCartSnapshot = {
  carts: number;
  estimatedLostRevenue: number;
  recoveryOpportunityPercent: number;
};

export type PayoutBottleneckItem = {
  vendorId: string;
  vendorName: string;
  pendingAmount: number;
  avgDelayHours: number;
};

export type CategoryRevenueItem = {
  category: string;
  gmv: number;
  sharePercent: number;
};

export type RevenueIntelligenceData = {
  dailyGmv: DailyGmvSnapshot;
  forecastPoints: ForecastPoint[];
  vendorLeaderboard: VendorRevenueItem[];
  listingLeaderboard: ListingRevenueItem[];
  pricingInefficiencies: PricingInefficiencyItem[];
  abandonedCarts: AbandonedCartSnapshot;
  payoutBottlenecks: PayoutBottleneckItem[];
  categoryBreakdown: CategoryRevenueItem[];
};

export type RevenueIntelligenceResponse = {
  data: RevenueIntelligenceData;
  timestamp: number;
};
