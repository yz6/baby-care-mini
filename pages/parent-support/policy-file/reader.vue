<template>
  <PageContainer>
    <UniPageHead title="政策在线阅读" :showBack="true" backFallbackUrl="/pages/parent-support/policy-file/index" :compact="isPageHeadCompact" />

    <uni-card title="政策内容" :is-shadow="false">
      <view class="title-text">{{ currentPolicy.title }}</view>
      <view class="meta-text">分类：{{ currentPolicy.category }}</view>
      <view class="content-text">
        本文档为示例阅读内容（mock），用于演示政策文件在线阅读流程。后续接入真实文档服务后，将在此展示完整政策正文与附件预览能力。
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { policyFileItems } from "../../../mock/parent-support";

const { isPageHeadCompact } = usePageHeadCompact();
const routePolicyId = ref("");
const pageOptions = (getCurrentPages().slice(-1)[0] as { options?: Record<string, string> } | undefined)?.options || {};
routePolicyId.value = pageOptions.id || "";
const currentPolicy = computed(() => policyFileItems.find((item) => item.id === routePolicyId.value) || policyFileItems[0]);
</script>

<style scoped lang="scss">
.title-text {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.meta-text {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.content-text {
  margin-top: 12rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.7;
}
</style>
