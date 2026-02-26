<template>
  <PageContainer>
    <UniPageHead title="服务管理" subtitle="入户指导 + 活动组织 + 数据记录" />

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

type ServiceStatus = "pending" | "doing" | "done";
type FilterTab = "all" | "homeVisit" | "activity";

interface ServiceItem {
  id: string;
  name: string;
  type: "homeVisit" | "activity";
  family: string;
  planTime: string;
  status: ServiceStatus;
}

const activeTab = ref<FilterTab>("all");

const filterTabs = [
  { key: "all", label: "全部" },
  { key: "homeVisit", label: "入户指导" },
  { key: "activity", label: "亲子活动" },
] as const;

const stats = ref([
  { key: "pending", label: "待执行", value: "5" },
  { key: "doing", label: "进行中", value: "2" },
  { key: "done", label: "已完成", value: "8" },
]);

const services = ref<ServiceItem[]>([
  {
    id: "1",
    name: "0-12月婴幼儿入户评估",
    type: "homeVisit",
    family: "李家",
    planTime: "今天 09:30",
    status: "pending",
  },
  {
    id: "2",
    name: "亲子语言发展小组活动",
    type: "activity",
    family: "村活动室",
    planTime: "今天 14:00",
    status: "doing",
  },
  {
    id: "3",
    name: "家庭喂养指导复盘",
    type: "homeVisit",
    family: "王家",
    planTime: "明天 10:00",
    status: "done",
  },
]);

const statusTextMap: Record<ServiceStatus, string> = {
  pending: "待执行",
  doing: "进行中",
  done: "已完成",
};

const filteredServices = computed(() => {
  if (activeTab.value === "all") {
    return services.value;
  }
  return services.value.filter((item) => item.type === activeTab.value);
});
</script>

<style scoped lang="scss">
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

.status-tag.doing {
  color: var(--color-primary);
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
