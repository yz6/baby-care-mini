import type { ExportActionItem, ExportHistoryItem, SettingActionItem, TeacherProfile, WorkStatItem } from "../types/mine";
import { reactive } from "vue";
import { createLocalId, readStorage, writeStorage } from "../utils/storage";

const MINE_STORAGE_KEY = "xiangxiaoyu-mine-v1";

export interface NoticeSetting {
  homeVisitNotice: boolean;
  activityNotice: boolean;
  parentSupportNotice: boolean;
}

export interface FeedbackRecord {
  id: string;
  type: string;
  priority: string;
  modules: string[];
  expectedReplyDate: string;
  content: string;
  contact: string;
  createdAt: string;
}

interface MineStorageData {
  teacherProfile: TeacherProfile;
  workStatItems: WorkStatItem[];
  exportActionItems: ExportActionItem[];
  settingActionItems: SettingActionItem[];
  exportHistoryItems: ExportHistoryItem[];
  noticeSetting: NoticeSetting;
  accountPassword: string;
  feedbackRecords: FeedbackRecord[];
}

const buildDefaultMineData = (): MineStorageData => ({
  teacherProfile: {
    name: "张老师",
    role: "乡村早期教育指导教师",
    organization: "青禾镇儿童发展指导站",
    serviceArea: "青禾镇北片区（6个自然村）",
  },
  workStatItems: [
    { key: "familyCount", value: "52", label: "累计服务家庭数" },
    { key: "monthlyVisit", value: "18", label: "本月入户次数" },
    { key: "monthlyActivity", value: "6", label: "本月活动次数" },
    { key: "familyActive", value: "84%", label: "家庭活跃度" },
  ],
  exportActionItems: [
    { key: "homeVisitRecord", title: "导出入户记录", desc: "按月份导出入户指导明细", icon: "download" },
    { key: "activityRecord", title: "导出活动记录", desc: "导出亲子活动执行反馈", icon: "paperplane" },
    { key: "familyReport", title: "导出家庭发展报告", desc: "生成家庭成长阶段汇总", icon: "bars" },
  ],
  settingActionItems: [
    { key: "notice", title: "通知设置", desc: "管理推送提醒与消息偏好", icon: "notification" },
    { key: "security", title: "账号安全", desc: "修改密码与登录保护", icon: "locked" },
    { key: "feedback", title: "意见反馈", desc: "提交问题与改进建议", icon: "chatbubble" },
  ],
  exportHistoryItems: [
    { id: "export-1", type: "入户记录", range: "2026-02-01 至 2026-02-29", createdAt: "2026-03-01 09:20" },
    { id: "export-2", type: "活动记录", range: "2026-02-01 至 2026-02-29", createdAt: "2026-03-01 09:35" },
  ],
  noticeSetting: {
    homeVisitNotice: true,
    activityNotice: true,
    parentSupportNotice: false,
  },
  accountPassword: "123456",
  feedbackRecords: [],
});

const mineData = reactive(readStorage<MineStorageData>(MINE_STORAGE_KEY, buildDefaultMineData));

export const saveMineData = () => {
  writeStorage(MINE_STORAGE_KEY, JSON.parse(JSON.stringify(mineData)));
};

export const teacherProfile: TeacherProfile = mineData.teacherProfile;
export const workStatItems: WorkStatItem[] = mineData.workStatItems;
export const exportActionItems: ExportActionItem[] = mineData.exportActionItems;
export const settingActionItems: SettingActionItem[] = mineData.settingActionItems;
export const exportHistoryItems: ExportHistoryItem[] = mineData.exportHistoryItems;
export const noticeSetting: NoticeSetting = mineData.noticeSetting;
export const feedbackRecords: FeedbackRecord[] = mineData.feedbackRecords;

export const addExportHistoryItem = (type: ExportHistoryItem["type"], range: string, createdAt: string) => {
  exportHistoryItems.unshift({
    id: createLocalId("export"),
    type,
    range,
    createdAt,
  });
  saveMineData();
};

export const saveNoticeSetting = (payload: NoticeSetting) => {
  Object.assign(noticeSetting, payload);
  saveMineData();
};

export const validateAccountPassword = (password: string) => mineData.accountPassword === password;

export const updateAccountPassword = (newPassword: string) => {
  mineData.accountPassword = newPassword;
  saveMineData();
};

export const addFeedbackRecord = (record: Omit<FeedbackRecord, "id" | "createdAt">, createdAt: string) => {
  feedbackRecords.unshift({
    id: createLocalId("feedback"),
    createdAt,
    ...record,
  });
  saveMineData();
};
