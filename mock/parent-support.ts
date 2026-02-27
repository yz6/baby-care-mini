import type { ParentingLibraryItem, ParentingTutorialItem, PolicyFileItem, PushTargetItem } from "../types/parent-support";

export const parentingLibraryItems: ParentingLibraryItem[] = [
  { id: "library-1", title: "7-12月动作发展家庭练习", monthRange: "7-12月", domain: "动作", hotTopic: "夜醒频繁", readCount: 168 },
  { id: "library-2", title: "13-18月语言表达引导", monthRange: "13-18月", domain: "语言", hotTopic: "不爱说话", readCount: 204 },
  { id: "library-3", title: "19-24月认知游戏清单", monthRange: "19-24月", domain: "认知", hotTopic: "专注力不足", readCount: 153 },
];

export const parentingTutorialItems: ParentingTutorialItem[] = [
  { id: "tutorial-1", title: "亲子共读示范课", monthRange: "13-24月", topic: "语言发展", activityType: "居家互动", relatedFamily: "李家", playCount: 89 },
  { id: "tutorial-2", title: "辅食节律管理", monthRange: "7-18月", topic: "营养喂养", activityType: "生活照护", relatedFamily: "王家", playCount: 102 },
];

export const policyFileItems: PolicyFileItem[] = [
  { id: "policy-1", title: "托育服务发展指导意见", category: "国家级政策", collect: true },
  { id: "policy-2", title: "县域婴幼儿家庭教育支持方案", category: "地方政策", collect: false },
  { id: "policy-3", title: "早期教育指导师服务规范", category: "行业规范文件", collect: false },
];

export const pushTargets: PushTargetItem[] = [
  { id: "push-1", familyName: "李家" },
  { id: "push-2", familyName: "王家" },
  { id: "push-3", familyName: "陈家" },
];
