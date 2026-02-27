<template>
  <PageContainer>
    <UniPageHead title="育儿教程" :showBack="true" backFallbackUrl="/pages/parent-support/index" :compact="isPageHeadCompact" />

    <view class="tool-row">
      <picker mode="selector" :range="topicOptions" @change="handleTopicChange">
        <view class="picker-btn">主题：{{ topicOptions[topicIndex] }}</view>
      </picker>
      <button class="upload-btn" size="mini" @click="goToVideoEdit">上传视频</button>
    </view>

    <uni-card title="教程列表" :is-shadow="false">
      <view class="tutorial-row" v-for="item in filteredTutorials" :key="item.id">
        <view class="tutorial-title">{{ item.title }}</view>
        <view class="tutorial-meta">{{ item.monthRange }} ｜ {{ item.topic }} ｜ {{ item.activityType }}</view>
        <view class="tutorial-meta">关联家庭：{{ item.relatedFamily }} ｜ 播放次数：{{ item.playCount }}</view>
      </view>
    </uni-card>

    <uni-card title="播放统计" :is-shadow="false">
      <view class="stat-row">累计播放次数：{{ totalPlayCount }}</view>
      <view class="stat-row">当前关联家庭：{{ currentFamilyText }}</view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { parentingTutorialItems } from "../../../mock/parent-support";

const { isPageHeadCompact } = usePageHeadCompact();
const topicOptions = ["全部", "语言发展", "营养喂养"];
const topicIndex = ref(0);

const filteredTutorials = computed(() => {
  const topic = topicOptions[topicIndex.value];
  if (topic === "全部") {
    return parentingTutorialItems;
  }
  return parentingTutorialItems.filter((item) => item.topic === topic);
});

const totalPlayCount = computed(() => filteredTutorials.value.reduce((sum, item) => sum + item.playCount, 0));
const currentFamilyText = computed(() => filteredTutorials.value.map((item) => item.relatedFamily).join("、"));

const handleTopicChange = (event: { detail: { value: string } }) => {
  topicIndex.value = Number(event.detail.value);
};

const goToVideoEdit = () => {
  uni.navigateTo({ url: "/pages/parent-support/parenting-tutorial/video-edit" });
};
</script>

<style scoped lang="scss">
.tool-row {
  margin-top: 12rpx;
  display: flex;
  gap: 10rpx;
}

.picker-btn {
  min-height: 72rpx;
  line-height: 72rpx;
  padding: 0 16rpx;
  border-radius: 999rpx;
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.upload-btn {
  min-height: 72rpx;
  line-height: 72rpx;
  padding: 0 16rpx;
  border-radius: 999rpx;
  color: #ffffff;
  background: var(--gradient-primary);
}

.tutorial-row {
  padding: 14rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.tutorial-row:last-child {
  border-bottom: none;
}

.tutorial-title {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.tutorial-meta {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.stat-row {
  margin-top: 10rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
