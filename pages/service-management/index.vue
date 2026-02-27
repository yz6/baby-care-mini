<template>
  <PageContainer>
    <UniPageHead title="服务管理" :compact="isPageHeadCompact" />

    <view class="entry-grid">
      <view class="entry-card" v-for="item in serviceEntries" :key="item.key" @click="goToPage(item.route)">
        <view class="entry-title">{{ item.title }}</view>
        <view class="entry-desc">{{ item.desc }}</view>
      </view>
    </view>

    <view class="filter-row">
      <view v-for="item in filterTabs" :key="item.key" class="filter-chip" :class="{ active: item.key === activeTab }" @click="activeTab = item.key">
        {{ item.label }}
      </view>
    </view>

    <view class="stats-grid">
      <view class="stats-card" v-for="item in stats" :key="item.key">
        <view class="stats-label">{{ item.label }}</view>
        <view class="stats-value">{{ item.value }}</view>
      </view>
    </view>

    <uni-card title="服务任务清单" :is-shadow="false">
      <view v-for="item in filteredServices" :key="item.id" class="service-item">
        <view class="service-head">
          <view class="service-name">{{ item.name }}</view>
          <view class="status-tag" :class="item.status">{{ statusTextMap[item.status] }}</view>
        </view>
        <view class="service-meta">{{ item.family }} ｜ {{ item.planTime }}</view>
        <view class="service-actions">
          <view class="action-btn">
            <uni-icons type="compose" size="16" color="#2F8A5B" />
            <text>记录</text>
          </view>
          <view class="action-btn">
            <uni-icons type="phone" size="16" color="#2F8A5B" />
            <text>联系</text>
          </view>
          <view class="action-btn">
            <uni-icons type="location" size="16" color="#2F8A5B" />
            <text>导航</text>
          </view>
        </view>
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../components/common/PageContainer.vue";
import UniPageHead from "../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../composables/usePageHeadCompact";
import { serviceStats, serviceTasks } from "../../mock/service-management";
import type { ServiceStatus, ServiceTaskItem } from "../../types/service-management";

type FilterTab = "all" | "homeVisit" | "activity";

const activeTab = ref<FilterTab>("all");
const { isPageHeadCompact } = usePageHeadCompact();

const serviceEntries = [
  { key: "familyProfile", title: "家庭档案", desc: "查看家庭与婴幼儿基础信息", route: "/pages/service-management/family-profile/index" },
  { key: "homeVisit", title: "入户指导", desc: "预约管理、发育记录与量表匹配", route: "/pages/service-management/home-visit/index" },
  { key: "parentActivity", title: "亲子活动", desc: "活动方案、发布与活动反馈", route: "/pages/service-management/parent-activity/index" },
] as const;

const filterTabs = [
  { key: "all", label: "全部" },
  { key: "homeVisit", label: "入户指导" },
  { key: "activity", label: "亲子活动" },
] as const;

const stats = serviceStats;

const statusTextMap: Record<ServiceStatus, string> = {
  pending: "待确认",
  confirmed: "已确认",
  done: "已完成",
};

const filteredServices = computed(() => {
  if (activeTab.value === "all") {
    return serviceTasks;
  }
  return serviceTasks.filter((item: ServiceTaskItem) => item.type === activeTab.value);
});

const goToPage = (route: string) => {
  uni.navigateTo({ url: route });
};
</script>

<style scoped lang="scss">
.entry-grid {
  margin-top: 12rpx;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12rpx;
}

.entry-card {
  min-height: 96rpx;
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  padding: 18rpx;
}

.entry-title {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--color-text-primary);
}

.entry-desc {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--color-text-secondary);
}

.filter-row {
  margin-top: 18rpx;
  display: flex;
  gap: 12rpx;
}

.filter-chip {
  padding: 10rpx 20rpx;
  font-size: 24rpx;
  border-radius: 999rpx;
  border: 1rpx solid var(--color-border);
  color: var(--color-text-secondary);
  background: var(--color-bg-card);
}

.filter-chip.active {
  color: var(--color-primary);
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
}

.stats-grid {
  margin-top: 16rpx;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12rpx;
}

.stats-card {
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 18rpx;
}

.stats-label {
  font-size: 24rpx;
  color: var(--color-text-secondary);
}

.stats-value {
  margin-top: 8rpx;
  font-size: 34rpx;
  font-weight: 600;
  color: var(--color-primary);
}

.service-item {
  padding: 16rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.service-item:last-child {
  border-bottom: none;
}

.service-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.service-name {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--color-text-primary);
}

.service-meta {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--color-text-secondary);
}

.status-tag {
  padding: 6rpx 14rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
}

.status-tag.pending {
  color: #b26a00;
  background: #fff5e8;
}

.status-tag.confirmed {
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
}

.status-tag.done {
  color: #2a7f56;
  background: #e8f7ef;
}

.service-actions {
  margin-top: 12rpx;
  display: flex;
  gap: 12rpx;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6rpx;
  padding: 8rpx 14rpx;
  border-radius: 999rpx;
  border: 1rpx solid var(--color-border);
  color: var(--color-primary);
  font-size: 24rpx;
}
</style>
