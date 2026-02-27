<template>
  <PageContainer>
    <UniPageHead title="近期活动" :showBack="true" backFallbackUrl="/pages/service-management/parent-activity/index" :compact="isPageHeadCompact" />

    <uni-card title="活动记录与家庭建议" :is-shadow="false">
      <view class="record-row" v-for="item in activityRecords" :key="item.id">
        <view class="record-title">{{ item.date }} · {{ item.title }}</view>
        <view class="record-content">教师观察：{{ item.observation }}</view>
        <view class="record-content">家庭建议：{{ item.familySuggestion }}</view>
      </view>
      <button class="feedback-btn" @click="goToFeedbackDetail">生成活动反馈单</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { activityRecords } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();

const goToFeedbackDetail = () => {
  uni.navigateTo({ url: "/pages/service-management/parent-activity/feedback-detail?id=feedback-1" });
};
</script>

<style scoped lang="scss">
.record-row {
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.record-row:last-child {
  border-bottom: none;
}

.record-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.record-content {
  margin-top: 8rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.feedback-btn {
  margin-top: 8rpx;
  min-height: 88rpx;
  line-height: 88rpx;
  border-radius: var(--radius-md);
  color: #ffffff;
  background: var(--gradient-primary);
  font-size: var(--font-size-sm);
}
</style>
