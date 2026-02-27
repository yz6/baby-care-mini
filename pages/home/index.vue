<template>
  <PageContainer>
    <UniPageHead greeting="Hi，早上好！" title="今日工作概况" :compact="isPageHeadCompact" />

    <view class="section">
      <view class="section-header">
        <text class="section-title">今日概况</text>
        <view class="date-chip">{{ homeDateText }}</view>
      </view>
      <view class="stats-grid">
        <view class="stat-card" v-for="(item, index) in homeOverviewItems" :key="item.key" :class="{ featured: index === 0 }">
          <text class="stat-value">{{ item.value }}</text>
          <text class="stat-label">{{ item.label }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="section-title">快速操作</text>
      </view>
      <view class="action-grid">
        <view class="action-item" v-for="item in homeQuickActions" :key="item.key" @click="goByAction(item.route)">
          <view class="action-icon">
            <uni-icons :type="item.icon" size="22" color="#00c896" />
          </view>
          <text class="action-title">{{ item.name }}</text>
          <text class="action-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-header">
        <text class="section-title">数据趋势简报</text>
      </view>
      <view class="trend-card">
        <view class="trend-summary">
          <view class="trend-item">
            <text class="trend-label">本周服务家庭数</text>
            <text class="trend-value">{{ weekFamilyTotal }}</text>
          </view>
          <view class="trend-item">
            <text class="trend-label">本月入户次数</text>
            <text class="trend-value">{{ monthVisitTotal }}</text>
          </view>
        </view>
        <view class="bar-list">
          <view class="bar-item" v-for="point in homeTrendPoints" :key="point.week">
            <view class="bar-wrap">
              <view class="bar-column" :style="{ height: `${point.familyCount * 7}rpx` }" />
              <view class="bar-line-dot" :style="{ bottom: `${point.visitCount * 7}rpx` }" />
            </view>
            <text class="bar-label">{{ point.week }}</text>
          </view>
        </view>
      </view>
    </view>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PageContainer from "../../components/common/PageContainer.vue";
import UniPageHead from "../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../composables/usePageHeadCompact";
import { homeDateText, homeOverviewItems, homeQuickActions, homeTrendPoints } from "../../mock/home";

const weekFamilyTotal = computed(() => homeTrendPoints.reduce((sum, item) => sum + item.familyCount, 0));
const monthVisitTotal = computed(() => homeTrendPoints.reduce((sum, item) => sum + item.visitCount, 0) * 2);
const { isPageHeadCompact } = usePageHeadCompact();

const tabRoutes = new Set(["/pages/home/index", "/pages/service-management/index", "/pages/parent-support/index", "/pages/mine/index"]);

const goByAction = (route?: string) => {
  if (!route) {
    uni.showToast({ title: "功能建设中", icon: "none" });
    return;
  }
  if (tabRoutes.has(route)) {
    uni.switchTab({ url: route });
    return;
  }
  uni.navigateTo({ url: route });
};
</script>

<style scoped lang="scss">
.date-chip {
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  background: var(--color-primary-light);
  padding: 8rpx 14rpx;
  border-radius: 999rpx;
}

.section {
  margin-bottom: var(--spacing-xl);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-md);
}

.stat-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg) var(--spacing-md);
  box-shadow: var(--shadow-xs);
  min-height: 132rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-card.featured {
  background: var(--gradient-primary);
}

.stat-card.featured .stat-value,
.stat-card.featured .stat-label {
  color: #ffffff;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.stat-label {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-md);
}

.action-item {
  min-height: 180rpx;
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.action-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: var(--radius-md);
  background: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-title {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.action-desc {
  margin-top: 6rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.trend-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-xs);
}

.trend-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.trend-item {
  background: var(--color-primary-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.trend-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.trend-value {
  display: block;
  margin-top: 6rpx;
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-primary);
}

.bar-list {
  height: 200rpx;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 6rpx;
  align-items: end;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bar-wrap {
  position: relative;
  width: 30rpx;
  height: 150rpx;
  display: flex;
  align-items: end;
}

.bar-column {
  width: 30rpx;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  background: var(--color-primary-light);
  border: 1rpx solid var(--color-primary);
}

.bar-line-dot {
  position: absolute;
  left: 50%;
  width: 14rpx;
  height: 14rpx;
  margin-left: -7rpx;
  border-radius: 50%;
  background: var(--color-primary);
}

.bar-label {
  margin-top: 8rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>
