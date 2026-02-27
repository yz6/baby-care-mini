<template>
  <PageContainer>
    <UniPageHead title="导出中心" :showBack="true" backFallbackUrl="/pages/mine/index" :compact="isPageHeadCompact" />

    <uni-card title="创建导出任务" :is-shadow="false">
      <picker mode="selector" :range="exportTypeOptions" @change="handleTypeChange">
        <view class="picker-field">导出类型：{{ exportTypeOptions[typeIndex] }}</view>
      </picker>
      <input v-model="dateRange" class="field-input" placeholder="导出时间范围（示例：2026-02-01 至 2026-02-29）" />
      <button class="submit-btn" @click="createExportTask">生成导出文件</button>
    </uni-card>

    <uni-card title="导出历史" :is-shadow="false">
      <view class="history-row" v-for="item in exportHistoryItems" :key="item.id">
        <view class="history-title">{{ item.type }} ｜ {{ item.createdAt }}</view>
        <view class="history-text">范围：{{ item.range }}</view>
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { exportHistoryItems } from "../../../mock/mine";

const { isPageHeadCompact } = usePageHeadCompact();
const exportTypeOptions = ["入户记录", "活动记录", "家庭发展报告"];
const typeIndex = ref(0);
const dateRange = ref("");

const handleTypeChange = (event: { detail: { value: string } }) => {
  typeIndex.value = Number(event.detail.value);
};

const createExportTask = () => {
  if (!dateRange.value) {
    uni.showToast({ title: "请填写导出时间范围", icon: "none" });
    return;
  }
  uni.showToast({ title: "导出任务已创建（mock）", icon: "none" });
};
</script>

<style scoped lang="scss">
.picker-field,
.field-input {
  width: 100%;
  min-height: 88rpx;
  line-height: 88rpx;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  padding: 0 14rpx;
  margin-bottom: 12rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.submit-btn {
  min-height: 88rpx;
  line-height: 88rpx;
  color: #ffffff;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
}

.history-row {
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.history-row:last-child {
  border-bottom: none;
}

.history-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 600;
}

.history-text {
  margin-top: 8rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>
