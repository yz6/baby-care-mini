import type {
  ActivityPlanItem,
  ActivityFeedbackDetail,
  ActivityRecordItem,
  DevelopmentTagGroup,
  FamilyProfileDetail,
  FamilyProfileItem,
  GrowthRecordItem,
  HomeVisitRecordForm,
  HomeVisitAppointmentItem,
  ScaleTemplateItem,
  ServiceStatItem,
  ServiceTaskItem,
} from "../types/service-management";

export const serviceStats: ServiceStatItem[] = [
  { key: "pending", label: "待确认", value: "6" },
  { key: "confirmed", label: "已确认", value: "4" },
  { key: "done", label: "已完成", value: "13" },
];

export const serviceTasks: ServiceTaskItem[] = [
  {
    id: "service-1",
    name: "0-12月婴幼儿入户评估",
    type: "homeVisit",
    family: "李家",
    planTime: "今天 09:30",
    status: "pending",
  },
  {
    id: "service-2",
    name: "亲子语言发展小组活动",
    type: "activity",
    family: "村活动室",
    planTime: "今天 14:00",
    status: "confirmed",
  },
  {
    id: "service-3",
    name: "家庭喂养指导复盘",
    type: "homeVisit",
    family: "王家",
    planTime: "明天 10:00",
    status: "done",
  },
];

export const familyProfiles: FamilyProfileItem[] = [
  {
    id: "family-1",
    familyCode: "F-2026-001",
    parentName: "李女士",
    phone: "13800001234",
    address: "北山村3组18号",
    childName: "李果果",
    birthday: "2024-08-12",
    monthAge: 18,
    recentVisitDate: "2026-02-19",
    recentActivityDate: "2026-02-21",
  },
  {
    id: "family-2",
    familyCode: "F-2026-002",
    parentName: "王先生",
    phone: "13800004567",
    address: "东河村2组5号",
    childName: "王安安",
    birthday: "2023-11-03",
    monthAge: 27,
    recentVisitDate: "2026-02-15",
    recentActivityDate: "2026-02-20",
  },
];

export const familyProfileDetails: FamilyProfileDetail[] = [
  {
    ...familyProfiles[0],
    growthFeature: "身高体重增长平稳，手眼协调能力提升明显。",
    developmentFeature: "语言理解增强，能完成简单两步指令。",
    homeVisitHistory: [
      { id: "visit-history-1", date: "2026-02-19", summary: "完成月龄发展观察，家长配合良好。" },
      { id: "visit-history-2", date: "2026-01-20", summary: "喂养与睡眠节律指导复盘。" },
    ],
    activityHistory: [{ id: "activity-history-1", date: "2026-02-21", title: "亲子语言互动活动", result: "参与积极，家庭完成课后任务。" }],
  },
  {
    ...familyProfiles[1],
    growthFeature: "头围稳定，体重略偏低，已给出饮食优化建议。",
    developmentFeature: "动作探索活跃，情绪表达明显改善。",
    homeVisitHistory: [{ id: "visit-history-3", date: "2026-02-15", summary: "完成发展特点记录与家庭建议反馈。" }],
    activityHistory: [{ id: "activity-history-2", date: "2026-02-20", title: "感统探索活动", result: "完成全部环节，家长反馈体验良好。" }],
  },
];

export const homeVisitAppointments: HomeVisitAppointmentItem[] = [
  {
    id: "visit-1",
    familyCode: "F-2026-001",
    parentName: "李女士",
    childName: "李果果",
    birthday: "2024-08-12",
    phone: "13800001234",
    address: "北山村3组18号",
    appointmentDate: "2026-03-01",
    appointmentSlot: "09:00-10:00",
    status: "confirmed",
  },
  {
    id: "visit-2",
    familyCode: "F-2026-002",
    parentName: "王先生",
    childName: "王安安",
    birthday: "2023-11-03",
    phone: "13800004567",
    address: "东河村2组5号",
    appointmentDate: "2026-03-02",
    appointmentSlot: "14:00-15:00",
    status: "pending",
  },
];

export const growthRecords: GrowthRecordItem[] = [
  { id: "growth-1", recordDate: "2026-01-15", heightCm: 79, weightKg: 10.6, headCircumferenceCm: 47.2 },
  { id: "growth-2", recordDate: "2026-02-15", heightCm: 80.2, weightKg: 10.9, headCircumferenceCm: 47.5 },
];

export const homeVisitRecordDefaultForm: HomeVisitRecordForm = {
  familyCode: "F-2026-001",
  visitDate: "2026-03-01",
  visitTimeSlot: "09:00-10:00",
  actionDevelopment: "可独立站立并尝试短距离行走。",
  languageDevelopment: "能主动模仿常用词汇并回应呼唤。",
  cognitionDevelopment: "可完成简单配对任务并保持短时专注。",
  emotionalDevelopment: "与家长分离焦虑较上月降低。",
  teacherConclusion: "建议持续每日 15 分钟亲子互动，并每周一次户外感知活动。",
};

export const developmentTagGroups: DevelopmentTagGroup[] = [
  { key: "action", label: "动作发展", options: ["扶物行走", "独立站立", "双手协同"] },
  { key: "language", label: "语言发展", options: ["跟读词汇", "主动指物表达", "理解简单指令"] },
  { key: "cognition", label: "认知发展", options: ["图形配对", "物品分类", "因果探索"] },
  { key: "emotion", label: "情感与社会性", options: ["主动微笑互动", "分离焦虑减轻", "模仿同伴行为"] },
];

export const activityPlans: ActivityPlanItem[] = [
  { id: "plan-1", season: "春", monthRange: "13-18月", title: "13-18个月龄亲子研学活动方案《小脚踏春》", summary: "通过户外踏春观察与行走探索，促进大动作与环境感知。" },
  { id: "plan-2", season: "春", monthRange: "13-18月", title: "13-18个月龄亲子研学活动方案《追风的小鸭子》", summary: "借助追逐游戏与模仿互动，提升节奏感与亲子协同配合。" },
  { id: "plan-3", season: "春", monthRange: "13-18月", title: "13-18个月龄亲子研学活动方案《闻闻春天》", summary: "通过闻香辨物等感官活动，增强嗅觉经验与语言表达。" },
  { id: "plan-4", season: "春", monthRange: "13-18月", title: "13-18个月龄亲子研学活动方案《小篮子里的春天》", summary: "在采集和分类春季自然物中，发展精细动作与认知分类能力。" },
  { id: "plan-5", season: "夏", monthRange: "19-24月", title: "水与容器探索", summary: "训练精细动作与专注力。" },
  { id: "plan-6", season: "秋", monthRange: "25-36月", title: "落叶分类赛", summary: "促进认知分类与合作行为。" },
];

export const activityRecords: ActivityRecordItem[] = [
  {
    id: "record-1",
    date: "2026-02-21",
    title: "亲子语言互动活动",
    observation: "多数家庭能按步骤完成“轮流说词”游戏，幼儿回应积极。",
    familySuggestion: "建议家庭每日睡前进行 10 分钟图卡对话练习。",
  },
];

export const scaleTemplates: ScaleTemplateItem[] = [
  {
    range: "13-18月龄",
    title: "13-18月龄发展评价量表",
    questions: [
      { id: "scale-q1", question: "幼儿是否能在提醒下完成简单动作模仿？", scoreOptions: [0, 1, 2] },
      { id: "scale-q2", question: "幼儿是否能理解并执行两步指令？", scoreOptions: [0, 1, 2] },
      { id: "scale-q3", question: "幼儿是否有主动表达需求的行为？", scoreOptions: [0, 1, 2] },
    ],
  },
  {
    range: "19-24月龄",
    title: "19-24月龄发展评价量表",
    questions: [
      { id: "scale-q4", question: "幼儿能否进行简单分类活动？", scoreOptions: [0, 1, 2] },
      { id: "scale-q5", question: "幼儿能否与同伴产生简单合作互动？", scoreOptions: [0, 1, 2] },
    ],
  },
];

export const activityFeedbackDetails: ActivityFeedbackDetail[] = [
  {
    id: "feedback-1",
    title: "亲子语言互动活动反馈单",
    date: "2026-02-21",
    participantFamilies: ["李家", "王家", "陈家"],
    observation: "幼儿在轮流说词和指物表达环节参与度高，家长引导方式更规范。",
    familySuggestion: "建议家庭每天睡前进行图卡对话 10 分钟，每周复盘一次记录表。",
    summary: "整体达成活动目标，后续重点加强家庭连续性实践。",
  },
];
