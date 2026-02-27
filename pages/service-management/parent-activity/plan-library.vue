<template>
  <PageContainer>
    <UniPageHead title="活动方案库" :showBack="true" backFallbackUrl="/pages/service-management/parent-activity/index" :compact="isPageHeadCompact" />

    <uni-card title="活动方案（季节 + 月龄）" :is-shadow="false">
      <view class="plan-row" v-for="item in activityPlans" :key="item.id" @click="goToPlanDetail(item.id)">
        <view class="plan-title">{{ item.title }}</view>
        <view class="plan-meta">{{ item.season }} ｜ {{ item.monthRange }}</view>
        <view class="plan-summary">{{ item.summary }}</view>
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { activityPlans } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();

const goToPlanDetail = (id: string) => {
  uni.navigateTo({ url: `/pages/service-management/parent-activity/plan-detail?id=${id}` });
};
</script>

<style scoped lang="scss">
.plan-row {
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.plan-row:last-child {
  border-bottom: none;
}

.plan-title {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.plan-meta {
  margin-top: 8rpx;
  font-size: var(--font-size-xs);
  color: var(--color-primary-dark);
}

.plan-summary {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
