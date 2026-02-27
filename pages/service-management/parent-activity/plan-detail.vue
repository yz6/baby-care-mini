<template>
  <PageContainer>
    <UniPageHead title="活动方案详情" :showBack="true" backFallbackUrl="/pages/service-management/parent-activity/index" :compact="isPageHeadCompact" />

    <uni-card title="方案信息" :is-shadow="false">
      <view class="row-title">{{ currentPlan.title }}</view>
      <view class="row-text">季节：{{ currentPlan.season }} ｜ 月龄：{{ currentPlan.monthRange }}</view>
      <view class="row-text">方案简介：{{ currentPlan.summary }}</view>
    </uni-card>

    <uni-card title="活动步骤建议" :is-shadow="false">
      <view class="step-row">1. 破冰引导：亲子共读活动目标与规则。</view>
      <view class="step-row">2. 核心活动：按方案执行互动探索环节。</view>
      <view class="step-row">3. 家庭延伸：布置家庭练习与观察记录。</view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { activityPlans } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();
const routePlanId = ref("");
const pageOptions = (getCurrentPages().slice(-1)[0] as { options?: Record<string, string> } | undefined)?.options || {};
routePlanId.value = pageOptions.id || "";
const currentPlan = computed(() => activityPlans.find((item) => item.id === routePlanId.value) || activityPlans[0]);
</script>

<style scoped lang="scss">
.row-title {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.row-text {
  margin-top: 10rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.step-row {
  margin-top: 10rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
