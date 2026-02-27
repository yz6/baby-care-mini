<template>
  <PageContainer>
    <UniPageHead
      title="亲子活动"
      :showBack="true"
      backFallbackUrl="/pages/service-management/index"
      :compact="isPageHeadCompact"
    />

    <view class="entry-grid">
      <view class="entry-card" @click="goToPlanLibrary">
        <view class="entry-title">活动方案库</view>
        <view class="entry-desc">按季节与月龄查看活动方案</view>
      </view>
      <view class="entry-card" @click="goToRecentActivity">
        <view class="entry-title">近期活动</view>
        <view class="entry-desc">查看活动记录与家庭建议</view>
      </view>
      <view class="entry-card" @click="goToPublishPage">
        <view class="entry-title">活动发布</view>
        <view class="entry-desc">选择方案并发布活动通知</view>
      </view>
    </view>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";

const { isPageHeadCompact } = usePageHeadCompact();

const goToPlanLibrary = () => {
  uni.navigateTo({ url: "/pages/service-management/parent-activity/plan-library" });
};

const goToRecentActivity = () => {
  uni.navigateTo({ url: "/pages/service-management/parent-activity/recent-activity" });
};

const goToPublishPage = () => {
  uni.navigateTo({ url: "/pages/service-management/parent-activity/publish" });
};
</script>

<style scoped lang="scss">
.entry-grid {
  margin-top: 12rpx;
  display: grid;
  gap: 12rpx;
}

.entry-title {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.entry-desc {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.entry-card {
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20rpx;
  min-height: 124rpx;
  box-shadow: var(--shadow-xs);
}
</style>
