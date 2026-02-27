export interface TeacherProfile {
  name: string;
  role: string;
  organization: string;
  serviceArea: string;
}

export interface WorkStatItem {
  key: string;
  value: string;
  label: string;
}

export interface ExportActionItem {
  key: string;
  title: string;
  desc: string;
  icon: string;
}

export interface SettingActionItem {
  key: string;
  title: string;
  desc: string;
  icon: string;
}

export interface ExportHistoryItem {
  id: string;
  type: "入户记录" | "活动记录" | "家庭发展报告";
  range: string;
  createdAt: string;
}
