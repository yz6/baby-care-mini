import type { ExportActionItem, SettingActionItem, TeacherProfile, WorkStatItem } from "../types/mine";

export const teacherProfile: TeacherProfile = {
  name: "张老师",
  role: "乡村早期教育指导教师",
  organization: "青禾镇儿童发展指导站",
  serviceArea: "青禾镇北片区（6个自然村）",
};

export const workStatItems: WorkStatItem[] = [
  { key: "familyCount", value: "52", label: "累计服务家庭数" },
  { key: "monthlyVisit", value: "18", label: "本月入户次数" },
  { key: "monthlyActivity", value: "6", label: "本月活动次数" },
  { key: "familyActive", value: "84%", label: "家庭活跃度" },
];

export const exportActionItems: ExportActionItem[] = [
  { key: "homeVisitRecord", title: "导出入户记录", desc: "按月份导出入户指导明细", icon: "download" },
  { key: "activityRecord", title: "导出活动记录", desc: "导出亲子活动执行反馈", icon: "paperplane" },
  { key: "familyReport", title: "导出家庭发展报告", desc: "生成家庭成长阶段汇总", icon: "bars" },
];

export const settingActionItems: SettingActionItem[] = [
  { key: "notice", title: "通知设置", desc: "管理推送提醒与消息偏好", icon: "notification" },
  { key: "security", title: "账号安全", desc: "修改密码与登录保护", icon: "locked" },
  { key: "feedback", title: "意见反馈", desc: "提交问题与改进建议", icon: "chatbubble" },
];
