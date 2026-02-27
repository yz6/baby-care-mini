<template>
  <PageContainer>
    <UniPageHead title="通知设置" :showBack="true" backFallbackUrl="/pages/mine/index" :compact="isPageHeadCompact" />

    <uni-card title="消息提醒偏好" :is-shadow="false">
      <view class="switch-row">
        <text>入户提醒</text>
        <switch :checked="homeVisitNotice" @change="(e) => (homeVisitNotice = e.detail.value)" color="#00c896" />
      </view>
      <view class="switch-row">
        <text>活动提醒</text>
        <switch :checked="activityNotice" @change="(e) => (activityNotice = e.detail.value)" color="#00c896" />
      </view>
      <view class="switch-row">
        <text>共育内容推送提醒</text>
        <switch :checked="parentSupportNotice" @change="(e) => (parentSupportNotice = e.detail.value)" color="#00c896" />
      </view>
      <button class="submit-btn" @click="saveSettings">保存设置</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";

const { isPageHeadCompact } = usePageHeadCompact();
const homeVisitNotice = ref(true);
const activityNotice = ref(true);
const parentSupportNotice = ref(false);

const saveSettings = () => {
  uni.showToast({ title: "通知设置已保存（mock）", icon: "none" });
};
</script>

<style scoped lang="scss">
.switch-row {
  padding: 14rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.switch-row:last-of-type {
  border-bottom: none;
}

.submit-btn {
  margin-top: 14rpx;
  min-height: 88rpx;
  line-height: 88rpx;
  color: #ffffff;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
}
</style>
