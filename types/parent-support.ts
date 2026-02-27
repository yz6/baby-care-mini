export type ParentLibraryCategory = "月龄段" | "发展领域" | "热点问题";

export interface ParentingLibraryItem {
  id: string;
  title: string;
  monthRange: string;
  domain: string;
  hotTopic: string;
  readCount: number;
}

export interface ParentingTutorialItem {
  id: string;
  title: string;
  monthRange: string;
  topic: string;
  activityType: string;
  relatedFamily: string;
  playCount: number;
}

export interface PolicyFileItem {
  id: string;
  title: string;
  category: "国家级政策" | "地方政策" | "行业规范文件";
  collect: boolean;
}

export interface PushTargetItem {
  id: string;
  familyName: string;
}

export interface ParentingArticleForm {
  title: string;
  monthRange: string;
  domain: string;
  hotTopic: string;
  content: string;
}

export interface TutorialVideoForm {
  title: string;
  monthRange: string;
  topic: string;
  activityType: string;
  relatedFamily: string;
  videoUrl: string;
}

export interface PushRecordItem {
  id: string;
  mode: "定向推送" | "批量推送" | "定时推送";
  content: string;
  sendTime: string;
  targetFamilies: string[];
}
