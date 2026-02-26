export interface ChildProfile {
  id: string;
  name: string;
  ageInMonths: number;
}

export interface FamilyProfile {
  id: string;
  guardianName: string;
  phone: string;
  address: string;
}

export interface HomeVisitRecord {
  id: string;
  childId: string;
  familyId: string;
  visitDate: string;
  summary: string;
}

export interface ParentActivity {
  id: string;
  title: string;
  activityDate: string;
  participantCount: number;
}

export interface TeachingResource {
  id: string;
  title: string;
  category: string;
  url: string;
}
