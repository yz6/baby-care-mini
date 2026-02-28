<template>
  <PageContainer>
    <UniPageHead title="文档查看" :showBack="true" backFallbackUrl="/pages/parent-support/parenting-library/index" :compact="isPageHeadCompact" />

    <uni-card title="文档信息" :is-shadow="false">
      <view class="doc-title">{{ currentDocument.title }}</view>
      <view class="doc-meta">文件格式：{{ currentDocument.fileType.toUpperCase() }}</view>
      <view class="doc-tip">如遇链接过期，请刷新文档链接后重试。</view>
      <button class="open-btn" @click="handleOpenDocument">打开文档</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { parentingLibraryDocuments } from "../../../mock/parent-support";
import type { ParentingLibraryDocumentItem } from "../../../types/parent-support";

declare const onLoad: ((callback: (query: Record<string, string | undefined>) => void) => void) | undefined;

const { isPageHeadCompact } = usePageHeadCompact();
const documentId = ref("");

if (typeof onLoad === "function") {
  onLoad((query) => {
    documentId.value = query.id || "";
  });
}

const currentDocument = computed<ParentingLibraryDocumentItem>(() => parentingLibraryDocuments.find((item) => item.id === documentId.value) || parentingLibraryDocuments[0]);

const handleOpenDocument = async () => {
  try {
    uni.showLoading({ title: "文档加载中..." });
    const downloadedFilePath = await new Promise<string>((resolve, reject) => {
      uni.downloadFile({
        url: currentDocument.value.fileUrl,
        success: (downloadResult) => {
          if (downloadResult.statusCode === 200) {
            resolve(downloadResult.tempFilePath);
            return;
          }
          reject(new Error(`download status ${downloadResult.statusCode}`));
        },
        fail: reject,
      });
    });

    await new Promise<void>((resolve, reject) => {
      uni.openDocument({
        filePath: downloadedFilePath,
        fileType: currentDocument.value.fileType,
        showMenu: true,
        success: () => resolve(),
        fail: reject,
      });
    });
  } catch (error) {
    console.error("open library document failed", error);
    uni.showToast({ title: "打开失败，请稍后重试", icon: "none" });
  } finally {
    uni.hideLoading();
  }
};
</script>

<style scoped lang="scss">
.doc-title {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.doc-meta {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.doc-tip {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.open-btn {
  margin-top: 12rpx;
  min-height: 72rpx;
  line-height: 72rpx;
  border-radius: 999rpx;
  font-size: var(--font-size-sm);
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
  border: 1rpx solid var(--color-primary-light);
}
</style>
