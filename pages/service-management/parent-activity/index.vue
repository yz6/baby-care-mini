<template>
  <PageContainer>
    <UniPageHead
      title="亲子活动"
      subtitle="活动方案库、活动发布与活动记录"
      :showBack="true"
      backFallbackUrl="/pages/service-management/index"
      :compact="isPageHeadCompact"
    />

    <uni-card title="活动方案库（季节 + 月龄）" :is-shadow="false">
      <view class="plan-row" v-for="item in activityPlans" :key="item.id">
        <view class="plan-title">{{ item.title }}</view>
        <view class="plan-meta">{{ item.season }} ｜ {{ item.monthRange }}</view>
        <view class="plan-summary">{{ item.summary }}</view>
      </view>
    </uni-card>

    <uni-card title="活动发布" :is-shadow="false">
      <input v-model="publishForm.title" class="form-input" placeholder="活动标题（示例：春日触感篮）" />
      <input v-model="publishForm.dateTime" class="form-input" placeholder="时间地点（示例：3月3日 14:00 村活动室）" />
      <input v-model="publishForm.familyNames" class="form-input" placeholder="参与家庭（示例：李家、王家）" />
      <button class="publish-btn" @click="submitPublish">一键发布</button>
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
      <button class="publish-btn" @click="showMockTip('已生成活动反馈单（mock）')">生成活动反馈单</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { activityPlans, activityRecords } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();
const publishForm = reactive({
  title: "",
  dateTime: "",
  familyNames: "",
});

const showMockTip = (title: string) => {
  uni.showToast({ title, icon: "none" });
};

const submitPublish = () => {
  if (!publishForm.title || !publishForm.dateTime || !publishForm.familyNames) {
    uni.showToast({ title: "请填写完整活动信息", icon: "none" });
    return;
  }
  showMockTip("活动发布成功（mock）");
};
</script>

<style scoped lang="scss">
.plan-row {
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.plan-row:last-child {
  border-bottom: none;
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

.form-input {
  width: 100%;
  min-height: 88rpx;
  background: var(--color-bg-page);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0 18rpx;
  font-size: var(--font-size-sm);
  margin-bottom: 12rpx;
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
