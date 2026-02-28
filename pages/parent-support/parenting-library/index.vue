<template>
  <PageContainer>
    <UniPageHead title="育儿文库" :showBack="true" backFallbackUrl="/pages/parent-support/index" :compact="isPageHeadCompact" />

    <view class="tool-row">
      <input v-model="searchKeyword" class="search-input" placeholder="搜索文库标题/热点问题" />
      <button class="publish-btn" size="mini" @click="goToArticleEdit">发布文章</button>
    </view>

    <uni-card title="文档阅读" :is-shadow="false">
      <view class="doc-row" v-for="item in parentingLibraryDocuments" :key="item.id">
        <view class="doc-main">
          <view class="library-title">{{ item.title }}</view>
          <view class="library-meta">格式：{{ item.fileType.toUpperCase() }}</view>
        </view>
        <button class="doc-open-btn" size="mini" @click="goToDocumentReader(item.id)">阅读</button>
      </view>
    </uni-card>

    <uni-card title="筛选条件" :is-shadow="false">
      <view class="chip-row">
        <view class="chip-item" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">全部</view>
        <view class="chip-item" :class="{ active: activeFilter === 'month' }" @click="activeFilter = 'month'">按月龄段</view>
        <view class="chip-item" :class="{ active: activeFilter === 'domain' }" @click="activeFilter = 'domain'">按发展领域</view>
      </view>
    </uni-card>

    <uni-card title="文库列表" :is-shadow="false">
      <view class="library-row" v-for="item in filteredItems" :key="item.id">
        <view class="library-title">{{ item.title }}</view>
        <view class="library-meta">{{ item.monthRange }} ｜ {{ item.domain }} ｜ 热点：{{ item.hotTopic }}</view>
        <view class="library-meta">阅读量：{{ item.readCount }}</view>
      </view>
    </uni-card>

    <uni-card title="阅读数据统计" :is-shadow="false">
      <view class="stat-row">本周阅读量：{{ weekReadTotal }}</view>
      <view class="stat-row">热门主题：{{ hotTopicText }}</view>
      <button class="secondary-btn" size="mini" @click="mockPushArticle">定期推送本周热门</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { parentingLibraryDocuments, parentingLibraryItems } from "../../../mock/parent-support";

const { isPageHeadCompact } = usePageHeadCompact();
const searchKeyword = ref("");
const activeFilter = ref<"all" | "month" | "domain">("all");

const filteredItems = computed(() => {
  let data = parentingLibraryItems.filter((item) => {
    if (!searchKeyword.value) {
      return true;
    }
    return item.title.includes(searchKeyword.value) || item.hotTopic.includes(searchKeyword.value);
  });
  if (activeFilter.value === "month") {
    data = data.filter((item) => item.monthRange.includes("月"));
  }
  if (activeFilter.value === "domain") {
    data = data.filter((item) => Boolean(item.domain));
  }
  return data;
});

const weekReadTotal = computed(() => filteredItems.value.reduce((sum, item) => sum + item.readCount, 0));
const hotTopicText = computed(() => filteredItems.value[0]?.hotTopic || "暂无");

const goToArticleEdit = () => {
  uni.navigateTo({ url: "/pages/parent-support/parenting-library/article-edit" });
};

const goToDocumentReader = (id: string) => {
  uni.navigateTo({ url: `/pages/parent-support/parenting-library/document-reader?id=${id}` });
};

const mockPushArticle = () => {
  uni.showToast({ title: "已加入定期推送（mock）", icon: "none" });
};
</script>

<style scoped lang="scss">
.tool-row {
  margin-top: 12rpx;
  display: flex;
  gap: 12rpx;
  align-items: center;
}

.search-input {
  flex: 1;
  min-height: 88rpx;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-card);
  padding: 0 14rpx;
  font-size: var(--font-size-sm);
}

.publish-btn {
  height: 64rpx;
  min-height: 64rpx;
  line-height: 64rpx;
  padding: 0 20rpx;
  margin: 0;
  flex-shrink: 0;
  font-size: var(--font-size-sm);
  color: #ffffff;
  background: var(--gradient-primary);
  border-radius: 999rpx;
}

.chip-row {
  display: flex;
  gap: 8rpx;
}

.doc-row {
  min-height: 88rpx;
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10rpx;
}

.doc-row:last-child {
  border-bottom: none;
}

.doc-main {
  flex: 1;
  min-width: 0;
}

.doc-open-btn {
  min-height: 64rpx;
  line-height: 64rpx;
  border-radius: 999rpx;
  padding: 0 16rpx;
  font-size: var(--font-size-xs);
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
  border: 1rpx solid var(--color-primary-light);
}

.chip-item {
  min-height: 64rpx;
  line-height: 64rpx;
  padding: 0 16rpx;
  border-radius: 999rpx;
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.chip-item.active {
  color: var(--color-primary-dark);
  border-color: var(--color-primary-light);
  background: var(--color-primary-light);
}

.library-row {
  padding: 14rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.library-row:last-child {
  border-bottom: none;
}

.library-title {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.library-meta {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.stat-row {
  margin-top: 10rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.secondary-btn {
  margin-top: 12rpx;
  min-height: 72rpx;
  line-height: 72rpx;
  border-radius: 999rpx;
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
}
</style>
