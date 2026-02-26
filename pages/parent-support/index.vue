<template>
  <PageContainer>
    <UniPageHead title="家长支持" />

    <view class="segment-row">
      <view v-for="item in segmentTabs" :key="item.key" class="segment-item" :class="{ active: item.key === activeSegment }" @click="activeSegment = item.key">
        {{ item.label }}
      </view>
    </view>

    <uni-card title="推荐课程" :is-shadow="false">
      <view class="course-item" v-for="item in filteredCourses" :key="item.id">
        <view class="course-head">
          <view class="course-title">{{ item.title }}</view>
          <view class="level-tag">{{ item.level }}</view>
        </view>
        <view class="course-meta">{{ item.ageRange }} ｜ {{ item.duration }}</view>
        <view class="course-desc">{{ item.desc }}</view>
      </view>
    </uni-card>

    <uni-card title="资源工具包" :is-shadow="false">
      <view class="resource-grid">
        <view class="resource-item" v-for="item in resources" :key="item.key">
          <uni-icons :type="item.icon" size="20" color="#2F8A5B" />
          <view class="resource-name">{{ item.name }}</view>
          <view class="resource-tip">{{ item.tip }}</view>
        </view>
      </view>
    </uni-card>

    <uni-card title="家长跟进提醒" :is-shadow="false">
      <view class="follow-item" v-for="item in follows" :key="item.id">
        <view class="follow-dot" />
        <view class="follow-text">{{ item.text }}</view>
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../components/common/PageContainer.vue";
import UniPageHead from "../../components/common/UniPageHead.vue";

type SegmentKey = "all" | "language" | "nutrition" | "emotion";

interface CourseItem {
  id: string;
  title: string;
  category: Exclude<SegmentKey, "all">;
  ageRange: string;
  duration: string;
  level: string;
  desc: string;
}

interface ResourceItem {
  key: string;
  name: string;
  tip: string;
  icon: string;
}

interface FollowItem {
  id: string;
  text: string;
}

const activeSegment = ref<SegmentKey>("all");

const segmentTabs = [
  { key: "all", label: "全部" },
  { key: "language", label: "语言发展" },
  { key: "nutrition", label: "营养喂养" },
  { key: "emotion", label: "亲子情绪" },
] as const;

const courses = ref<CourseItem[]>([
  {
    id: "1",
    title: "0-12 月语言互动游戏",
    category: "language",
    ageRange: "0-12 月",
    duration: "15 分钟",
    level: "基础",
    desc: "指导家长通过日常对话与指令回应促进语言刺激。",
  },
  {
    id: "2",
    title: "幼儿分龄辅食搭配建议",
    category: "nutrition",
    ageRange: "6-24 月",
    duration: "20 分钟",
    level: "重点",
    desc: "基于月龄提供食材搭配与喂养节奏建议，降低家长焦虑。",
  },
  {
    id: "3",
    title: "亲子冲突情绪安抚方法",
    category: "emotion",
    ageRange: "12-36 月",
    duration: "18 分钟",
    level: "进阶",
    desc: "帮助家长识别幼儿情绪信号并采用积极回应策略。",
  },
]);

const resources = ref<ResourceItem[]>([
  { key: "plan", name: "指导话术卡", tip: "入户沟通模板", icon: "chatboxes" },
  { key: "sheet", name: "家庭观察表", tip: "成长记录要点", icon: "paperclip" },
  { key: "guide", name: "活动指引单", tip: "亲子活动流程", icon: "list" },
]);

const follows = ref<FollowItem[]>([
  { id: "1", text: "李家：今晚回访家长执行情况" },
  { id: "2", text: "王家：补发辅食搭配图文材料" },
  { id: "3", text: "陈家：周五安排亲子阅读指导" },
]);

const filteredCourses = computed(() => {
  if (activeSegment.value === "all") {
    return courses.value;
  }
  return courses.value.filter((item) => item.category === activeSegment.value);
});
</script>

<style scoped lang="scss">
.segment-row {
  margin-top: 18rpx;
  display: flex;
  gap: 12rpx;
  overflow-x: auto;
  white-space: nowrap;
}

.segment-item {
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  border: 1rpx solid var(--color-border);
  font-size: 24rpx;
  color: var(--color-text-secondary);
  background: var(--color-bg-card);
}

.segment-item.active {
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
  color: var(--color-primary);
}

.course-item {
  padding: 14rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.course-item:last-child {
  border-bottom: none;
}

.course-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.course-title {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--color-text-primary);
}

.level-tag {
  padding: 6rpx 12rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  color: var(--color-primary);
  background: var(--color-primary-light);
}

.course-meta {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--color-text-secondary);
}

.course-desc {
  margin-top: 8rpx;
  font-size: 26rpx;
  color: var(--color-text-primary);
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12rpx;
}

.resource-item {
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-soft);
  padding: 18rpx 14rpx;
}

.resource-name {
  margin-top: 8rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: var(--color-text-primary);
}

.resource-tip {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: var(--color-text-secondary);
}

.follow-item {
  display: flex;
  align-items: center;
  padding: 10rpx 0;
}

.follow-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: var(--color-primary);
  margin-right: 12rpx;
}

.follow-text {
  font-size: 27rpx;
  color: var(--color-text-primary);
}
</style>
