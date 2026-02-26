<template>
  <view class="page-head">
    <view class="head-content">
      <!-- 有问候语时显示问候语+副标题的首页模式 -->
      <template v-if="greeting">
        <text class="head-greeting">{{ greeting }}</text>
        <text class="head-subtitle">{{ subtitle || title }}</text>
      </template>
      <!-- 无问候语时显示标题+副标题的普通页面模式 -->
      <template v-else>
        <text class="head-title">{{ title }}</text>
        <text v-if="subtitle" class="head-subtitle">{{ subtitle }}</text>
      </template>
    </view>
    <slot name="extra" />
  </view>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  greeting?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0;
  margin-bottom: var(--spacing-xl);
  background: transparent;
  padding-top: calc(var(--status-bar-height, 44rpx) + 54rpx);
}

.head-content {
  flex: 1;
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

.head-subtitle {
  display: block;
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}
</style>
