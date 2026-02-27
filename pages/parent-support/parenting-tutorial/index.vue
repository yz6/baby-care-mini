<template>
  <PageContainer>
    <UniPageHead
      title="育儿教程"
      subtitle="教程视频、家庭关联与播放统计"
      :showBack="true"
      backFallbackUrl="/pages/parent-support/index"
      :compact="isPageHeadCompact"
    />

    <uni-card title="页面预置完成" :is-shadow="false">
      <view class="placeholder-text">当前为二级页骨架，后续可在此扩展视频上传、播放统计与家庭关联配置。</view>
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
