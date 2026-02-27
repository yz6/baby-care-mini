<template>
  <PageContainer>
    <UniPageHead title="活动反馈单" :showBack="true" backFallbackUrl="/pages/service-management/parent-activity/index" :compact="isPageHeadCompact" />

    <uni-card title="反馈概览" :is-shadow="false">
      <view class="row-title">{{ detail.title }}</view>
      <view class="row-text">活动日期：{{ detail.date }}</view>
      <view class="row-text">参与家庭：{{ detail.participantFamilies.join("、") }}</view>
    </uni-card>

    <uni-card title="教师观察与建议" :is-shadow="false">
      <view class="row-text">教师观察：{{ detail.observation }}</view>
      <view class="row-text">家庭建议：{{ detail.familySuggestion }}</view>
      <view class="row-text">总结：{{ detail.summary }}</view>
    </uni-card>

    <button class="submit-btn" @click="exportSheet">导出反馈单（mock）</button>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { activityFeedbackDetails } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();
const routeFeedbackId = ref("");
const pageOptions = (getCurrentPages().slice(-1)[0] as { options?: Record<string, string> } | undefined)?.options || {};
routeFeedbackId.value = pageOptions.id || "";
const detail = computed(() => activityFeedbackDetails.find((item) => item.id === routeFeedbackId.value) || activityFeedbackDetails[0]);

const exportSheet = () => {
  uni.showToast({ title: "反馈单导出成功（mock）", icon: "none" });
};
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

.submit-btn {
  margin-top: 12rpx;
  min-height: 88rpx;
  line-height: 88rpx;
  color: #ffffff;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
}
</style>
