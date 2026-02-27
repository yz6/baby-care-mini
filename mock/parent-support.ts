import type {
  ParentingArticleForm,
  ParentingLibraryItem,
  ParentingTutorialItem,
  PolicyFileItem,
  PushRecordItem,
  PushTargetItem,
  TutorialVideoForm,
} from "../types/parent-support";
import { reactive } from "vue";
import { createLocalId, readStorage, writeStorage } from "../utils/storage";

const PARENT_SUPPORT_STORAGE_KEY = "xiangxiaoyu-parent-support-v1";

interface ParentSupportStorageData {
  parentingLibraryItems: ParentingLibraryItem[];
  parentingTutorialItems: ParentingTutorialItem[];
  policyFileItems: PolicyFileItem[];
  pushTargets: PushTargetItem[];
  parentingArticleDefaultForm: ParentingArticleForm;
  tutorialVideoDefaultForm: TutorialVideoForm;
  pushRecordItems: PushRecordItem[];
}

const buildDefaultParentSupportData = (): ParentSupportStorageData => ({
  parentingLibraryItems: [
    { id: "library-1", title: "7-12月动作发展家庭练习", monthRange: "7-12月", domain: "动作", hotTopic: "夜醒频繁", readCount: 168 },
    { id: "library-2", title: "13-18月语言表达引导", monthRange: "13-18月", domain: "语言", hotTopic: "不爱说话", readCount: 204 },
    { id: "library-3", title: "19-24月认知游戏清单", monthRange: "19-24月", domain: "认知", hotTopic: "专注力不足", readCount: 153 },
  ],
  parentingTutorialItems: [
    { id: "tutorial-1", title: "亲子共读示范课", monthRange: "13-24月", topic: "语言发展", activityType: "居家互动", relatedFamily: "李家", playCount: 89 },
    { id: "tutorial-2", title: "辅食节律管理", monthRange: "7-18月", topic: "营养喂养", activityType: "生活照护", relatedFamily: "王家", playCount: 102 },
  ],
  policyFileItems: [
    { id: "policy-1", title: "托育服务发展指导意见", category: "国家级政策", collect: true },
    { id: "policy-2", title: "县域婴幼儿家庭教育支持方案", category: "地方政策", collect: false },
    { id: "policy-3", title: "早期教育指导师服务规范", category: "行业规范文件", collect: false },
  ],
  pushTargets: [
    { id: "push-1", familyName: "李家" },
    { id: "push-2", familyName: "王家" },
    { id: "push-3", familyName: "陈家" },
  ],
  parentingArticleDefaultForm: {
    title: "",
    monthRange: "13-18月",
    domain: "语言",
    hotTopic: "不爱说话",
    content: "",
  },
  tutorialVideoDefaultForm: {
    title: "",
    monthRange: "13-24月",
    topic: "语言发展",
    activityType: "居家互动",
    relatedFamily: "李家",
    videoUrl: "",
  },
  pushRecordItems: [
    {
      id: "push-record-1",
      mode: "定向推送",
      content: "本周亲子活动提醒与家庭延伸练习",
      sendTime: "2026-03-01 20:00",
      targetFamilies: ["李家"],
    },
    {
      id: "push-record-2",
      mode: "批量推送",
      content: "春季育儿文库专题合集",
      sendTime: "2026-02-28 19:30",
      targetFamilies: ["李家", "王家", "陈家"],
    },
  ],
});

const parentSupportData = reactive(readStorage<ParentSupportStorageData>(PARENT_SUPPORT_STORAGE_KEY, buildDefaultParentSupportData));

export const saveParentSupportData = () => {
  writeStorage(PARENT_SUPPORT_STORAGE_KEY, JSON.parse(JSON.stringify(parentSupportData)));
};

export const parentingLibraryItems: ParentingLibraryItem[] = parentSupportData.parentingLibraryItems;
export const parentingTutorialItems: ParentingTutorialItem[] = parentSupportData.parentingTutorialItems;
export const policyFileItems: PolicyFileItem[] = parentSupportData.policyFileItems;
export const pushTargets: PushTargetItem[] = parentSupportData.pushTargets;
export const parentingArticleDefaultForm: ParentingArticleForm = parentSupportData.parentingArticleDefaultForm;
export const tutorialVideoDefaultForm: TutorialVideoForm = parentSupportData.tutorialVideoDefaultForm;
export const pushRecordItems: PushRecordItem[] = parentSupportData.pushRecordItems;

export const addParentingLibraryItem = (input: Omit<ParentingLibraryItem, "id" | "readCount">) => {
  parentingLibraryItems.unshift({
    id: createLocalId("library"),
    readCount: 0,
    ...input,
  });
  saveParentSupportData();
};

export const addParentingTutorialItem = (input: Omit<ParentingTutorialItem, "id" | "playCount">) => {
  parentingTutorialItems.unshift({
    id: createLocalId("tutorial"),
    playCount: 0,
    ...input,
  });
  saveParentSupportData();
};

export const addPushRecordItem = (input: Omit<PushRecordItem, "id">) => {
  pushRecordItems.unshift({
    id: createLocalId("push-record"),
    ...input,
  });
  saveParentSupportData();
};

export const togglePolicyCollect = (policyId: string) => {
  const target = policyFileItems.find((item) => item.id === policyId);
  if (!target) {
    return false;
  }
  target.collect = !target.collect;
  saveParentSupportData();
  return true;
};

export const resetParentSupportData = () => {
  const fresh = buildDefaultParentSupportData();
  Object.assign(parentSupportData, fresh);
  saveParentSupportData();
};
