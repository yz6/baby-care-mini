export interface HomeOverviewItem {
  key: string;
  label: string;
  value: string;
}

export interface HomeQuickAction {
  key: string;
  name: string;
  desc: string;
  icon: string;
  route?: string;
}

export interface HomeTrendPoint {
  week: string;
  familyCount: number;
  visitCount: number;
}
