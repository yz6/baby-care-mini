<template>
  <PageContainer>
    <UniPageHead title="入户记录编辑" :showBack="true" backFallbackUrl="/pages/service-management/home-visit/index" :compact="isPageHeadCompact" />

    <uni-card title="入户记录表单" :is-shadow="false">
      <view class="field-label biz-form-label">家庭编号</view>
      <picker mode="selector" :range="familyCodeOptions" @change="handleFamilyCodeChange">
        <view class="picker-field biz-form-picker">{{ form.familyCode || "请选择家庭编号" }}</view>
      </picker>

      <view class="field-label biz-form-label">入户日期</view>
      <picker mode="date" :value="form.visitDate" @change="handleVisitDateChange">
        <view class="picker-field biz-form-picker">{{ form.visitDate || "请选择入户日期" }}</view>
      </picker>

      <view class="field-label biz-form-label">时间段</view>
      <picker mode="selector" :range="visitTimeSlotOptions" @change="handleVisitTimeSlotChange">
        <view class="picker-field biz-form-picker">{{ form.visitTimeSlot || "请选择时间段" }}</view>
      </picker>

      <view class="field-label biz-form-label">入户类型（单选）</view>
      <radio-group class="option-row biz-option-row" @change="handleVisitTypeChange">
        <label class="option-item biz-option-item" v-for="item in visitTypeOptions" :key="item.value">
          <radio :value="item.value" :checked="visitType === item.value" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ item.label }}</text>
        </label>
      </radio-group>

      <view class="field-label biz-form-label">重点观察维度（多选）</view>
      <checkbox-group class="option-row biz-option-row" @change="handleFocusTagsChange">
        <label class="option-item biz-option-item" v-for="item in focusTagOptions" :key="item.value">
          <checkbox :value="item.value" :checked="focusTags.includes(item.value)" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ item.label }}</text>
        </label>
      </checkbox-group>

      <textarea v-model="form.actionDevelopment" class="field-area biz-form-area" placeholder="动作发展记录" />
      <textarea v-model="form.languageDevelopment" class="field-area biz-form-area" placeholder="语言发展记录" />
      <textarea v-model="form.cognitionDevelopment" class="field-area biz-form-area" placeholder="认知发展记录" />
      <textarea v-model="form.emotionalDevelopment" class="field-area biz-form-area" placeholder="情感与社会性记录" />
      <textarea v-model="form.teacherConclusion" class="field-area biz-form-area" placeholder="教师结论与建议" />
      <button class="submit-btn biz-submit-btn" @click="submitRecord">保存入户记录</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { homeVisitRecordDefaultForm } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();
const form = reactive({ ...homeVisitRecordDefaultForm });
const visitType = ref<"首次入户" | "复访入户">("首次入户");
const focusTags = ref<string[]>(["动作发展", "语言发展"]);

const familyCodeOptions = ["F-2026-001", "F-2026-002", "F-2026-003"];
const visitTimeSlotOptions = ["09:00-10:00", "10:00-11:00", "14:00-15:00", "15:00-16:00"];
const visitTypeOptions = [
  { label: "首次入户", value: "首次入户" },
  { label: "复访入户", value: "复访入户" },
] as const;
const focusTagOptions = [
  { label: "动作发展", value: "动作发展" },
  { label: "语言发展", value: "语言发展" },
  { label: "认知发展", value: "认知发展" },
  { label: "情感与社会性", value: "情感与社会性" },
];

const handleFamilyCodeChange = (event: { detail: { value: string } }) => {
  form.familyCode = familyCodeOptions[Number(event.detail.value)] || "";
};

const handleVisitDateChange = (event: { detail: { value: string } }) => {
  form.visitDate = event.detail.value;
};

const handleVisitTimeSlotChange = (event: { detail: { value: string } }) => {
  form.visitTimeSlot = visitTimeSlotOptions[Number(event.detail.value)] || "";
};

const handleVisitTypeChange = (event: { detail: { value: string } }) => {
  visitType.value = event.detail.value as "首次入户" | "复访入户";
};

const handleFocusTagsChange = (event: { detail: { value: string[] } }) => {
  focusTags.value = event.detail.value;
};

const submitRecord = () => {
  if (!form.familyCode || !form.visitDate || !form.teacherConclusion) {
    uni.showToast({ title: "请填写完整必填项", icon: "none" });
    return;
  }
  if (focusTags.value.length === 0) {
    uni.showToast({ title: "请至少选择一个观察维度", icon: "none" });
    return;
  }
  uni.showToast({ title: "入户记录已保存（mock）", icon: "none" });
};
</script>

<style scoped lang="scss">
.field-label {
  margin: 10rpx 0 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.picker-field {
  width: 100%;
  min-height: 88rpx;
  margin-bottom: 12rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-page);
  padding: 0 14rpx;
  font-size: var(--font-size-sm);
}

.option-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx 14rpx;
  margin-bottom: 12rpx;
}

.option-item {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.field-area {
  width: 100%;
  min-height: 120rpx;
  margin-bottom: 12rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-page);
  padding: 12rpx 14rpx;
  font-size: var(--font-size-sm);
}

.submit-btn {
  min-height: 88rpx;
  line-height: 88rpx;
  color: #ffffff;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}
</style>
