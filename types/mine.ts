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
