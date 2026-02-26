<template>
  <view class="page-container">
    <slot />
  </view>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100vh;
  padding: 24rpx;
  padding-top: calc(var(--status-bar-height, 44rpx) + 24rpx);
  background: var(--color-bg-page);
}
</style>
