import type { HomeOverviewItem, HomeQuickAction, HomeTrendPoint } from "../types/home";

export const homeDateText = "2026年2月27日 星期五";

export const homeOverviewItems: HomeOverviewItem[] = [
  { key: "todayActivity", label: "今日活动", value: "3" },
  { key: "pendingRecord", label: "待填写记录", value: "5" },
  { key: "todayVisit", label: "今日入户", value: "4" },
];

export const homeQuickActions: HomeQuickAction[] = [
  { key: "publishNotice", name: "发布通知", desc: "面向家庭发布提醒", icon: "notification", route: "/pages/parent-support/index" },
  { key: "publishActivity", name: "发布活动", desc: "安排亲子活动计划", icon: "calendar", route: "/pages/service-management/parent-activity/index" },
  { key: "familyProfile", name: "查看家庭档案", desc: "检索家庭与婴幼儿档案", icon: "person", route: "/pages/service-management/family-profile/index" },
  { key: "activityPlan", name: "查看活动方案", desc: "浏览分龄活动方案库", icon: "list", route: "/pages/service-management/parent-activity/index" },
];

const formatDateMMDD = (date: Date) => {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${month}-${day}`;
};

const buildLast7DaysLabels = () => {
  const currentDate = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const tempDate = new Date(currentDate);
    tempDate.setDate(currentDate.getDate() - (6 - index));
    return formatDateMMDD(tempDate);
  });
};

const trendMockValues = [
  { familyCount: 8, visitCount: 5 },
  { familyCount: 10, visitCount: 6 },
  { familyCount: 11, visitCount: 7 },
  { familyCount: 9, visitCount: 6 },
  { familyCount: 12, visitCount: 8 },
  { familyCount: 13, visitCount: 8 },
  { familyCount: 14, visitCount: 9 },
];

export const homeTrendPoints: HomeTrendPoint[] = buildLast7DaysLabels().map((label, index) => ({
  week: label,
  familyCount: trendMockValues[index].familyCount,
  visitCount: trendMockValues[index].visitCount,
}));
