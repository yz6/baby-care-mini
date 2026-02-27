<template>
  <PageContainer>
    <UniPageHead title="发布文章" :showBack="true" backFallbackUrl="/pages/parent-support/parenting-library/index" :compact="isPageHeadCompact" />

    <uni-card title="文章信息" :is-shadow="false">
      <view class="field-label biz-form-label">文章标题</view>
      <input v-model="form.title" class="field-input biz-form-input" placeholder="文章标题" />

      <view class="field-label biz-form-label">月龄段（单选）</view>
      <picker mode="selector" :range="monthRangeOptions" @change="handleMonthRangeChange">
        <view class="picker-field biz-form-picker">{{ form.monthRange || "请选择月龄段" }}</view>
      </picker>

      <view class="field-label biz-form-label">发展领域（单选）</view>
      <radio-group class="option-row biz-option-row" @change="handleDomainChange">
        <label class="option-item biz-option-item" v-for="item in domainOptions" :key="item">
          <radio :value="item" :checked="form.domain === item" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ item }}</text>
        </label>
      </radio-group>

      <view class="field-label biz-form-label">热点问题（多选）</view>
      <checkbox-group class="option-row biz-option-row" @change="handleHotTopicChange">
        <label class="option-item biz-option-item" v-for="item in hotTopicOptions" :key="item">
          <checkbox :value="item" :checked="selectedHotTopics.includes(item)" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ item }}</text>
        </label>
      </checkbox-group>

      <view class="field-label biz-form-label">计划发布日期</view>
      <picker mode="date" :value="publishDate" @change="handlePublishDateChange">
        <view class="picker-field biz-form-picker">{{ publishDate || "请选择发布日期" }}</view>
      </picker>

      <textarea v-model="form.content" class="field-area biz-form-area" placeholder="请输入文章正文" />
      <button class="submit-btn biz-submit-btn" @click="submitArticle">发布文章</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { addParentingLibraryItem, parentingArticleDefaultForm } from "../../../mock/parent-support";

const { isPageHeadCompact } = usePageHeadCompact();
const form = reactive({ ...parentingArticleDefaultForm });
const publishDate = ref("");
const monthRangeOptions = ["7-12月", "13-18月", "19-24月", "25-36月"];
const domainOptions = ["动作", "语言", "认知", "情绪"];
const hotTopicOptions = ["挑食", "分离焦虑", "睡眠不稳", "不爱说话"];
const selectedHotTopics = ref<string[]>(["不爱说话"]);

const handleMonthRangeChange = (event: { detail: { value: string } }) => {
  form.monthRange = monthRangeOptions[Number(event.detail.value)] || "";
};

const handleDomainChange = (event: { detail: { value: string } }) => {
  form.domain = event.detail.value;
};

const handleHotTopicChange = (event: { detail: { value: string[] } }) => {
  selectedHotTopics.value = event.detail.value;
  form.hotTopic = selectedHotTopics.value.join("、");
};

const handlePublishDateChange = (event: { detail: { value: string } }) => {
  publishDate.value = event.detail.value;
};

const submitArticle = () => {
  if (!form.title || !form.content) {
    uni.showToast({ title: "请填写标题和正文", icon: "none" });
    return;
  }
  if (!publishDate.value) {
    uni.showToast({ title: "请选择发布日期", icon: "none" });
    return;
  }
  addParentingLibraryItem({
    title: form.title,
    monthRange: form.monthRange,
    domain: form.domain,
    hotTopic: form.hotTopic,
  });
  uni.showToast({ title: "文章发布成功", icon: "none" });
  uni.navigateBack();
};
</script>

<style scoped lang="scss">
.field-label {
  margin: 8rpx 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.field-input {
  width: 100%;
  min-height: 88rpx;
  margin-bottom: 12rpx;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  padding: 0 14rpx;
  font-size: var(--font-size-sm);
}

.picker-field {
  width: 100%;
  min-height: 88rpx;
  line-height: 88rpx;
  margin-bottom: 12rpx;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  padding: 0 14rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.option-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx 12rpx;
  margin-bottom: 12rpx;
}

.option-item {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.field-area {
  width: 100%;
  min-height: 140rpx;
  margin-bottom: 12rpx;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  padding: 10rpx 14rpx;
  font-size: var(--font-size-sm);
}

.submit-btn {
  min-height: 88rpx;
  line-height: 88rpx;
  color: #ffffff;
  border-radius: var(--radius-md);
  background: var(--gradient-primary);
}
</style>
