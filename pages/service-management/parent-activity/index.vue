<template>
  <PageContainer>
    <UniPageHead
      title="亲子活动"
      :showBack="true"
      backFallbackUrl="/pages/service-management/index"
      :compact="isPageHeadCompact"
    />

    <uni-card title="活动发布" :is-shadow="false">
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

      <view class="form-label biz-form-label">参与家庭（多选）</view>
      <checkbox-group class="option-row biz-option-row" @change="handleFamilySelectChange">
        <label class="option-item biz-option-item" v-for="item in familyOptions" :key="item">
          <checkbox :value="item" :checked="selectedFamilies.includes(item)" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ item }}</text>
        </label>
      </checkbox-group>
      <button class="publish-btn biz-submit-btn" @click="submitPublish">一键发布</button>
    </uni-card>

    <uni-card title="照片共享（占位）" :is-shadow="false">
      <view class="photo-placeholder" @click="showMockTip('已上传照片（mock）')">点击上传活动照片</view>
    </uni-card>

    <uni-card title="活动记录与家庭建议" :is-shadow="false">
      <view class="record-row" v-for="item in activityRecords" :key="item.id">
        <view class="record-title">{{ item.date }} · {{ item.title }}</view>
        <view class="record-content">教师观察：{{ item.observation }}</view>
        <view class="record-content">家庭建议：{{ item.familySuggestion }}</view>
      </view>
      <button class="publish-btn" @click="goToFeedbackDetail">生成活动反馈单</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { activityPlans, activityRecords } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();
const publishForm = reactive({
  title: "",
  activityDate: "",
  activityTime: "",
  location: "",
});
const selectedPlanId = ref("");
const familyOptions = ["李家", "王家", "陈家", "赵家"];
const selectedFamilies = ref<string[]>([]);

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
  if (selectedFamilies.value.length === 0) {
    uni.showToast({ title: "请至少选择一个参与家庭", icon: "none" });
    return;
  }
  showMockTip("活动发布成功（mock）");
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

const handleFamilySelectChange = (event: { detail: { value: string[] } }) => {
  selectedFamilies.value = event.detail.value;
};

const goToPlanDetail = (id: string) => {
  uni.navigateTo({ url: `/pages/service-management/parent-activity/plan-detail?id=${id}` });
};

const goToFeedbackDetail = () => {
  uni.navigateTo({ url: "/pages/service-management/parent-activity/feedback-detail?id=feedback-1" });
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

.record-row {
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.record-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.record-content {
  margin-top: 8rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>
