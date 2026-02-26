<template>
  <view class="page-container">
    <slot />
  </view>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100vh;
  padding: 0 24rpx;
  background: var(--color-bg-page);
}
</style>
