export type ServiceStatus = "pending" | "confirmed" | "done" | "cancelled";

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

export interface FamilyVisitHistoryItem {
  id: string;
  date: string;
  summary: string;
}

export interface FamilyActivityHistoryItem {
  id: string;
  date: string;
  title: string;
  result: string;
}

export interface FamilyProfileDetail extends FamilyProfileItem {
  growthFeature: string;
  developmentFeature: string;
  homeVisitHistory: FamilyVisitHistoryItem[];
  activityHistory: FamilyActivityHistoryItem[];
}

export interface HomeVisitRecordForm {
  familyCode: string;
  visitDate: string;
  visitTimeSlot: string;
  actionDevelopment: string;
  languageDevelopment: string;
  cognitionDevelopment: string;
  emotionalDevelopment: string;
  teacherConclusion: string;
}

export interface ScaleQuestionItem {
  id: string;
  question: string;
  scoreOptions: number[];
}

export interface ScaleTemplateItem {
  range: "0-6月龄" | "7-12月龄" | "13-18月龄" | "19-24月龄" | "25-36月龄";
  title: string;
  questions: ScaleQuestionItem[];
}

export interface ActivityFeedbackDetail {
  id: string;
  title: string;
  date: string;
  participantFamilies: string[];
  observation: string;
  familySuggestion: string;
  summary: string;
}
