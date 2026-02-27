<template>
  <PageContainer>
    <UniPageHead title="生长曲线对比" :showBack="true" backFallbackUrl="/pages/service-management/home-visit/index" :compact="isPageHeadCompact" />

    <uni-card title="历史生长数据" :is-shadow="false">
      <view class="curve-row" v-for="item in growthRecords" :key="item.id">
        <text>{{ item.recordDate }}</text>
        <text>身高 {{ item.heightCm }}cm</text>
        <text>体重 {{ item.weightKg }}kg</text>
        <text>头围 {{ item.headCircumferenceCm }}cm</text>
      </view>
    </uni-card>

    <uni-card title="历史对比结论" :is-shadow="false">
      <view class="conclusion-text">近两次记录显示身高、体重均稳步增长，头围变化在正常范围内，建议继续保持当前喂养与运动节律。</view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { growthRecords } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();
</script>

<style scoped lang="scss">
.curve-row {
  display: flex;
  justify-content: space-between;
  gap: 8rpx;
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.curve-row:last-child {
  border-bottom: none;
}

.conclusion-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
