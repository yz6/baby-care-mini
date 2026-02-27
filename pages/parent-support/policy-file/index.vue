<template>
  <PageContainer>
    <UniPageHead title="政策文件" :showBack="true" backFallbackUrl="/pages/parent-support/index" :compact="isPageHeadCompact" />

    <uni-card title="文件分类" :is-shadow="false">
      <view class="chip-row">
        <view class="chip-item" :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'">全部</view>
        <view class="chip-item" :class="{ active: activeCategory === '国家级政策' }" @click="activeCategory = '国家级政策'">国家级</view>
        <view class="chip-item" :class="{ active: activeCategory === '地方政策' }" @click="activeCategory = '地方政策'">地方</view>
        <view class="chip-item" :class="{ active: activeCategory === '行业规范文件' }" @click="activeCategory = '行业规范文件'">行业</view>
      </view>
    </uni-card>

    <uni-card title="政策文件列表" :is-shadow="false">
      <view class="policy-row" v-for="item in filteredPolicies" :key="item.id">
        <view class="policy-title">{{ item.title }}</view>
        <view class="policy-meta">{{ item.category }}</view>
        <view class="action-row">
          <text class="action-btn" @click="goToReader(item.id)">在线阅读</text>
          <text class="action-btn" @click="showMockTip('下载成功（mock）')">下载</text>
          <text class="action-btn" @click="handleCollectToggle(item.id)">{{ item.collect ? "已收藏" : "收藏" }}</text>
        </view>
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { policyFileItems, togglePolicyCollect } from "../../../mock/parent-support";
import type { PolicyFileItem } from "../../../types/parent-support";

const { isPageHeadCompact } = usePageHeadCompact();
const activeCategory = ref<"all" | PolicyFileItem["category"]>("all");

const filteredPolicies = computed(() => {
  if (activeCategory.value === "all") {
    return policyFileItems;
  }
  return policyFileItems.filter((item) => item.category === activeCategory.value);
});

const goToReader = (id: string) => {
  uni.navigateTo({ url: `/pages/parent-support/policy-file/reader?id=${id}` });
};

const showMockTip = (title: string) => {
  uni.showToast({ title, icon: "none" });
};

const handleCollectToggle = (id: string) => {
  const success = togglePolicyCollect(id);
  if (!success) {
    uni.showToast({ title: "收藏状态更新失败", icon: "none" });
    return;
  }
  uni.showToast({ title: "收藏状态已更新", icon: "none" });
};
</script>

<style scoped lang="scss">
.chip-row {
  display: flex;
  gap: 8rpx;
  flex-wrap: wrap;
}

.chip-item {
  min-height: 64rpx;
  line-height: 64rpx;
  padding: 0 14rpx;
  border-radius: 999rpx;
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.chip-item.active {
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
  color: var(--color-primary-dark);
}

.policy-row {
  padding: 14rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.policy-row:last-child {
  border-bottom: none;
}

.policy-title {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.policy-meta {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.action-row {
  margin-top: 10rpx;
  display: flex;
  gap: 8rpx;
}

.action-btn {
  font-size: var(--font-size-xs);
  padding: 6rpx 12rpx;
  border-radius: 999rpx;
  background: var(--color-primary-light);
  color: var(--color-primary-dark);
}

.placeholder-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
