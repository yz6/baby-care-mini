<template>
  <PageContainer>
    <UniPageHead title="意见反馈" :showBack="true" backFallbackUrl="/pages/mine/index" :compact="isPageHeadCompact" />

    <uni-card title="反馈表单" :is-shadow="false">
      <picker mode="selector" :range="feedbackTypeOptions" @change="handleTypeChange">
        <view class="picker-field biz-form-picker">反馈类型：{{ feedbackTypeOptions[typeIndex] }}</view>
      </picker>
      <view class="field-label biz-form-label">问题优先级（单选）</view>
      <radio-group class="option-row biz-option-row" @change="handlePriorityChange">
        <label class="option-item biz-option-item" v-for="item in priorityOptions" :key="item">
          <radio :value="item" :checked="priority === item" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ item }}</text>
        </label>
      </radio-group>

      <view class="field-label biz-form-label">涉及模块（多选）</view>
      <checkbox-group class="option-row biz-option-row" @change="handleModuleChange">
        <label class="option-item biz-option-item" v-for="item in moduleOptions" :key="item">
          <checkbox :value="item" :checked="selectedModules.includes(item)" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ item }}</text>
        </label>
      </checkbox-group>

      <picker mode="date" :value="expectedReplyDate" @change="handleExpectedDateChange">
        <view class="picker-field biz-form-picker">期望反馈日期：{{ expectedReplyDate || "请选择日期" }}</view>
      </picker>
      <textarea v-model="feedbackContent" class="field-area biz-form-area" placeholder="请填写你的问题描述或建议" />
      <input v-model="contactInfo" class="field-input biz-form-input" placeholder="联系方式（选填）" />
      <button class="submit-btn biz-submit-btn" @click="submitFeedback">提交反馈</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { addFeedbackRecord } from "../../../mock/mine";

const { isPageHeadCompact } = usePageHeadCompact();
const feedbackTypeOptions = ["功能建议", "问题反馈", "体验评价"];
const typeIndex = ref(0);
const priorityOptions = ["高", "中", "低"];
const priority = ref("中");
const moduleOptions = ["首页", "服务", "共育", "我的"];
const selectedModules = ref<string[]>(["服务"]);
const expectedReplyDate = ref("");
const feedbackContent = ref("");
const contactInfo = ref("");

const handleTypeChange = (event: { detail: { value: string } }) => {
  typeIndex.value = Number(event.detail.value);
};

const handlePriorityChange = (event: { detail: { value: string } }) => {
  priority.value = event.detail.value;
};

const handleModuleChange = (event: { detail: { value: string[] } }) => {
  selectedModules.value = event.detail.value;
};

const handleExpectedDateChange = (event: { detail: { value: string } }) => {
  expectedReplyDate.value = event.detail.value;
};

const submitFeedback = () => {
  if (!feedbackContent.value) {
    uni.showToast({ title: "请填写反馈内容", icon: "none" });
    return;
  }
  if (selectedModules.value.length === 0) {
    uni.showToast({ title: "请至少选择一个涉及模块", icon: "none" });
    return;
  }
  const now = new Date();
  const createdAt = `${now.getFullYear()}-${`${now.getMonth() + 1}`.padStart(2, "0")}-${`${now.getDate()}`.padStart(2, "0")} ${`${now.getHours()}`.padStart(2, "0")}:${`${now.getMinutes()}`.padStart(2, "0")}`;
  addFeedbackRecord(
    {
      type: feedbackTypeOptions[typeIndex.value],
      priority: priority.value,
      modules: selectedModules.value,
      expectedReplyDate: expectedReplyDate.value,
      content: feedbackContent.value,
      contact: contactInfo.value,
    },
    createdAt
  );
  uni.showToast({ title: "反馈提交成功", icon: "none" });
};
</script>

<style scoped lang="scss">
.field-label {
  margin: 8rpx 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.picker-field,
.field-input {
  width: 100%;
  min-height: 88rpx;
  line-height: 88rpx;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  padding: 0 14rpx;
  margin-bottom: 12rpx;
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
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  padding: 10rpx 14rpx;
  margin-bottom: 12rpx;
  font-size: var(--font-size-sm);
}

.submit-btn {
  min-height: 88rpx;
  line-height: 88rpx;
  color: #ffffff;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
}
</style>
