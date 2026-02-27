<template>
  <view class="page-head-anchor">
    <view class="page-head-fixed" :class="{ compact }">
      <view v-if="showBack" class="back-btn" @click="handleBack">
        <uni-icons type="left" size="20" color="#1a1a1a" />
      </view>
      <view class="head-content">
        <!-- 有问候语时显示首页模式（仅主标题） -->
        <template v-if="greeting">
          <text class="head-greeting">{{ greeting }}</text>
        </template>
        <!-- 无问候语时仅显示标题 -->
        <template v-else>
          <text class="head-title">{{ title }}</text>
        </template>
      </view>
      <slot name="extra" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title: string;
  greeting?: string;
  showBack?: boolean;
  backFallbackUrl?: string;
  compact?: boolean;
}

const props = defineProps<Props>();

const compact = computed(() => Boolean(props.compact));

const handleBack = () => {
  const pageStack = getCurrentPages();
  if (pageStack.length > 1) {
    uni.navigateBack();
    return;
  }
  if (props.backFallbackUrl) {
    uni.switchTab({ url: props.backFallbackUrl });
  }
};
</script>

<style scoped lang="scss">
.page-head-anchor {
  height: calc(var(--status-bar-height, 44rpx) + 150rpx);
  margin-bottom: var(--spacing-md);
}

.page-head-fixed {
  position: fixed;
  top: 0;
  left: var(--page-horizontal-padding, 44rpx);
  right: var(--page-horizontal-padding, 44rpx);
  z-index: 50;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-top: calc(var(--status-bar-height, 44rpx) + 88rpx);
  background: var(--color-bg-page);
}

.page-head-fixed.compact {
  left: 0;
  right: 0;
  padding: calc(var(--status-bar-height, 44rpx) + 8rpx) var(--page-horizontal-padding, 44rpx) 10rpx;
  border-bottom: 1rpx solid var(--color-border);
}

.page-head-fixed.compact .head-greeting,
.page-head-fixed.compact .head-title {
  font-size: var(--font-size-lg);
}

.back-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  margin-right: 16rpx;
  flex-shrink: 0;
}

.head-content {
  flex: 1;
}

.page-head-fixed.compact .head-content {
  padding: 8rpx 14rpx;
}

.head-greeting {
  display: block;
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.head-title {
  display: block;
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}
</style>
