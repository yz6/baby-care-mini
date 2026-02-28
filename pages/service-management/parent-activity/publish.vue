<template>
  <PageContainer>
    <UniPageHead title="活动发布" :showBack="true" backFallbackUrl="/pages/service-management/parent-activity/index" :compact="isPageHeadCompact" />

    <uni-card title="发布表单" :is-shadow="false">
      <view class="form-label biz-form-label">活动标题</view>
      <input v-model="publishForm.title" class="form-input biz-form-input" placeholder="请输入活动标题" />

      <view class="form-label biz-form-label">活动方案库（必选）</view>
      <view class="plan-select-list">
        <view
          v-for="item in activityPlans"
          :key="item.id"
          class="plan-row"
          :class="{ selected: selectedPlanId === item.id }"
          @click="selectPlan(item.id)"
        >
          <view class="plan-row-top">
            <view class="plan-title">{{ item.title }}</view>
            <view v-if="selectedPlanId === item.id" class="check-icon">
              <uni-icons type="checkmarkempty" size="14" color="#ffffff" />
            </view>
          </view>
          <view class="plan-meta">{{ item.season }} ｜ {{ item.monthRange }}</view>
          <view class="plan-summary">{{ item.summary }}</view>
          <view class="plan-actions">
            <text class="selected-tip" :class="{ active: selectedPlanId === item.id }">
              {{ selectedPlanId === item.id ? "已选中" : "点击选中" }}
            </text>
            <text class="detail-link" @click.stop="goToPlanDetail(item.id)">查看详情</text>
          </view>
        </view>
      </view>

      <view class="form-label biz-form-label">活动日期</view>
      <picker mode="date" :value="publishForm.activityDate" @change="handleActivityDateChange">
        <view class="picker-field biz-form-picker">{{ publishForm.activityDate || "请选择活动日期" }}</view>
      </picker>

      <view class="form-label biz-form-label">活动时间</view>
      <picker mode="time" :value="publishForm.activityTime" @change="handleActivityTimeChange">
        <view class="picker-field biz-form-picker">{{ publishForm.activityTime || "请选择活动时间" }}</view>
      </picker>

      <view class="form-label biz-form-label">活动地点</view>
      <input v-model="publishForm.location" class="form-input biz-form-input" placeholder="请输入活动地点" />

      <button class="publish-btn biz-submit-btn" @click="submitPublish">一键发布</button>
    </uni-card>

    <uni-card title="照片共享（占位）" :is-shadow="false">
      <view class="photo-placeholder" @click="showMockTip('已上传照片（mock）')">点击上传活动照片</view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { activityPlans, addActivityRecord } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();
const publishForm = reactive({
  title: "",
  activityDate: "",
  activityTime: "",
  location: "",
});
const selectedPlanId = ref("");

const showMockTip = (title: string) => {
  uni.showToast({ title, icon: "none" });
};

const submitPublish = () => {
  if (!publishForm.title || !publishForm.activityDate || !publishForm.activityTime || !publishForm.location) {
    uni.showToast({ title: "请填写完整活动信息", icon: "none" });
    return;
  }
  if (!selectedPlanId.value) {
    uni.showToast({ title: "请选择活动方案", icon: "none" });
    return;
  }
  addActivityRecord({
    date: publishForm.activityDate,
    title: publishForm.title,
    observation: `活动时间 ${publishForm.activityTime}，地点 ${publishForm.location}。`,
    familySuggestion: "建议活动后 24 小时内完成一次家庭延伸练习并记录反馈。",
  });
  uni.showToast({ title: "活动发布成功", icon: "none" });
  uni.navigateBack();
};

const selectPlan = (planId: string) => {
  selectedPlanId.value = planId;
};

const handleActivityDateChange = (event: { detail: { value: string } }) => {
  publishForm.activityDate = event.detail.value;
};

const handleActivityTimeChange = (event: { detail: { value: string } }) => {
  publishForm.activityTime = event.detail.value;
};

const goToPlanDetail = (id: string) => {
  uni.navigateTo({ url: `/pages/service-management/parent-activity/plan-detail?id=${id}` });
};
</script>

<style scoped lang="scss">
.plan-row {
  padding: 16rpx;
  border: 2rpx solid #dfe3e8;
  border-radius: var(--radius-md);
  background: #ffffff;
  margin-bottom: 12rpx;
  transition: all 0.2s ease;
}

.plan-row:last-child {
  margin-bottom: 0;
}

.plan-select-list {
  margin-bottom: 12rpx;
  background: transparent;
}

.plan-row.selected {
  border-color: var(--color-primary);
  background: #ecf8f1;
  box-shadow: 0 8rpx 20rpx rgba(47, 138, 91, 0.12);
}

.plan-row-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8rpx;
}

.check-icon {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  background: var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.plan-title {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.plan-meta {
  margin-top: 8rpx;
  font-size: var(--font-size-xs);
  color: var(--color-primary-dark);
}

.plan-summary {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.plan-actions {
  margin-top: 8rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected-tip {
  font-size: var(--font-size-xs);
  color: #8a8f99;
}

.selected-tip.active {
  color: var(--color-primary-dark);
  font-weight: 600;
}

.detail-link {
  font-size: var(--font-size-xs);
  color: var(--color-primary);
}

.form-input {
  min-height: 88rpx;
  background: var(--color-bg-page);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0 18rpx;
  font-size: var(--font-size-sm);
  margin-bottom: 12rpx;
}

.picker-field {
  width: 100%;
  min-height: 88rpx;
  line-height: 88rpx;
  background: var(--color-bg-page);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0 18rpx;
  font-size: var(--font-size-sm);
  margin-bottom: 12rpx;
  color: var(--color-text-secondary);
}

.form-label {
  margin: 6rpx 0 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.publish-btn {
  margin-top: 8rpx;
  min-height: 88rpx;
  line-height: 88rpx;
  border-radius: var(--radius-md);
  color: #ffffff;
  background: var(--gradient-primary);
  font-size: var(--font-size-sm);
}

.photo-placeholder {
  min-height: 120rpx;
  border: 1rpx dashed var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
</style>
