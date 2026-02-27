export type ServiceStatus = "pending" | "confirmed" | "done";

export type ServiceTaskType = "homeVisit" | "activity";

export interface ServiceTaskItem {
  id: string;
  name: string;
  type: ServiceTaskType;
  family: string;
  planTime: string;
  status: ServiceStatus;
}

export interface ServiceStatItem {
  key: string;
  label: string;
  value: string;
}

export interface FamilyProfileItem {
  id: string;
  familyCode: string;
  parentName: string;
  phone: string;
  address: string;
  childName: string;
  birthday: string;
  monthAge: number;
  recentVisitDate: string;
  recentActivityDate: string;
}

export interface HomeVisitAppointmentItem {
  id: string;
  familyCode: string;
  parentName: string;
  childName: string;
  birthday: string;
  phone: string;
  address: string;
  appointmentDate: string;
  appointmentSlot: string;
  status: ServiceStatus;
}

export interface GrowthRecordItem {
  id: string;
  recordDate: string;
  heightCm: number;
  weightKg: number;
  headCircumferenceCm: number;
}

export interface DevelopmentTagGroup {
  key: string;
  label: string;
  options: string[];
}

export interface ActivityPlanItem {
  id: string;
  season: "春" | "夏" | "秋" | "冬";
  monthRange: "7-12月" | "13-18月" | "19-24月" | "25-36月";
  title: string;
  summary: string;
}

export interface ActivityRecordItem {
  id: string;
  date: string;
  title: string;
  observation: string;
  familySuggestion: string;
}
