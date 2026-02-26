<template>
  <view class="page-head">
    <view class="head-content">
      <text class="head-greeting">{{ greeting || 'Hi，早上好！' }}</text>
      <text class="head-subtitle">{{ subtitle || (title + ' ✨') }}</text>
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

.head-subtitle {
  display: block;
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}
</style>