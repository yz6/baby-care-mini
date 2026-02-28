import type {
  ParentingArticleForm,
  ParentingLibraryDocumentItem,
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
    { id: "tutorial-1", title: "亲子共读示范课", monthRange: "13-24月", topic: "语言发展", activityType: "居家互动", relatedFamily: "家庭001", playCount: 89 },
    { id: "tutorial-2", title: "辅食节律管理", monthRange: "7-18月", topic: "营养喂养", activityType: "生活照护", relatedFamily: "家庭002", playCount: 102 },
  ],
  policyFileItems: [
    { id: "policy-1", title: "托育服务发展指导意见", category: "国家级政策", collect: true },
    { id: "policy-2", title: "县域婴幼儿家庭教育支持方案", category: "地方政策", collect: false },
    { id: "policy-3", title: "早期教育指导师服务规范", category: "行业规范文件", collect: false },
  ],
  pushTargets: [
    { id: "push-1", familyName: "家庭001" },
    { id: "push-2", familyName: "家庭002" },
    { id: "push-3", familyName: "家庭003" },
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
    relatedFamily: "家庭001",
    videoUrl: "", 
  },
  pushRecordItems: [
    {
      id: "push-record-1",
      mode: "定向推送",
      content: "本周亲子活动提醒与家庭延伸练习",
      sendTime: "2026-03-01 20:00",
      targetFamilies: ["家庭001"],
    },
    {
      id: "push-record-2",
      mode: "批量推送",
      content: "春季育儿文库专题合集",
      sendTime: "2026-02-28 19:30",
      targetFamilies: ["家庭001", "家庭002", "家庭003"],
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
export const parentingLibraryDocuments: ParentingLibraryDocumentItem[] = [
  {
    id: "library-document-1",
    title: "0-3岁婴幼儿语言发展指导手册",
    fileType: "pdf",
    fileUrl: "https://baby-care-mini.oss-cn-hangzhou.aliyuncs.com/files/0-3%E5%B2%81%E5%A9%B4%E5%B9%BC%E5%84%BF%E8%AF%AD%E8%A8%80%E5%8F%91%E5%B1%95%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C.pdf",
  },
  {
    id: "library-document-2",
    title: "13月龄婴幼儿生长发育评估与营养指导手册",
    fileType: "pdf",
    fileUrl:
      "https://baby-care-mini.oss-cn-hangzhou.aliyuncs.com/files/13%E6%9C%88%E9%BE%84%E5%A9%B4%E5%B9%BC%E5%84%BF%E7%94%9F%E9%95%BF%E5%8F%91%E8%82%B2%E8%AF%84%E4%BC%B0%E4%B8%8E%E8%90%A5%E5%85%BB%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C.pdf",
  },
  {
    id: "library-document-3",
    title: "7~18月龄婴幼儿科学养育家长指南",
    fileType: "pdf",
    fileUrl:
      "https://baby-care-mini.oss-cn-hangzhou.aliyuncs.com/files/7%7E18%E6%9C%88%E9%BE%84%E5%A9%B4%E5%B9%BC%E5%84%BF%E7%A7%91%E5%AD%A6%E5%85%BB%E8%82%B2%E5%AE%B6%E9%95%BF%E6%8C%87%E5%8D%97%281%29.pdf",
  },
  {
    id: "library-document-4",
    title: "家长指导手册（入户）",
    fileType: "docx",
    fileUrl: "https://baby-care-mini.oss-cn-hangzhou.aliyuncs.com/files/%E5%AE%B6%E9%95%BF%E6%8C%87%E5%AF%BC%E6%89%8B%E5%86%8C%EF%BC%88%E5%85%A5%E6%88%B7%EF%BC%89.docx",
  },
];

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
