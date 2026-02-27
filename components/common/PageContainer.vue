<template>
  <view class="page-container">
    <slot />
  </view>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100vh;
  padding: 0 var(--page-horizontal-padding, 44rpx);
  background: var(--color-bg-page);
}
</style>
