<template>
  <PageContainer>
    <UniPageHead
      title="政策文件"
      :showBack="true"
      backFallbackUrl="/pages/parent-support/index"
      :compact="isPageHeadCompact"
    />

    <uni-card title="页面预置完成" :is-shadow="false">
      <view class="placeholder-text">当前为二级页骨架，后续可在此扩展在线阅读、下载与收藏管理功能。</view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";

const { isPageHeadCompact } = usePageHeadCompact();
</script>

<style scoped lang="scss">
.placeholder-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
