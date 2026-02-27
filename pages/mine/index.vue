<template>
  <PageContainer>
    <UniPageHead title="我的" subtitle="教师信息、工作数据与系统设置" :compact="isPageHeadCompact" />

    <view class="profile-card">
      <view class="avatar-section">
        <view class="avatar">
          <uni-icons type="person-filled" size="32" color="#00c896" />
        </view>
        <view class="profile-info">
          <view class="profile-name">{{ teacherProfile.name }}</view>
          <view class="profile-role">{{ teacherProfile.role }}</view>
          <view class="profile-location">{{ teacherProfile.organization }}</view>
          <view class="profile-location">{{ teacherProfile.serviceArea }}</view>
        </view>
      </view>
    </view>

    <view class="stats-overview">
      <view class="stats-item" v-for="item in workStatItems" :key="item.key">
        <view class="stats-number">{{ item.value }}</view>
        <view class="stats-label">{{ item.label }}</view>
      </view>
    </view>

    <uni-card title="数据导出" :is-shadow="false">
      <view class="menu-item" v-for="item in exportActionItems" :key="item.key" @click="showMockTip(`${item.title}（mock）`)">
        <view class="menu-left">
          <uni-icons :type="item.icon" size="22" color="#00c896" />
          <view class="menu-text">
            <view class="menu-title">{{ item.title }}</view>
            <view class="menu-desc">{{ item.desc }}</view>
          </view>
        </view>
        <uni-icons type="right" size="16" color="#98A2B3" />
      </view>
    </uni-card>

    <uni-card title="系统设置" :is-shadow="false">
      <view class="menu-item" v-for="item in settingActionItems" :key="item.key" @click="showMockTip(`${item.title}（mock）`)">
        <view class="menu-left">
          <uni-icons :type="item.icon" size="22" color="#646A73" />
          <view class="menu-text">
            <view class="menu-title">{{ item.title }}</view>
            <view class="menu-desc">{{ item.desc }}</view>
          </view>
        </view>
        <uni-icons type="right" size="16" color="#98A2B3" />
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from "../../components/common/PageContainer.vue";
import UniPageHead from "../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../composables/usePageHeadCompact";
import { exportActionItems, settingActionItems, teacherProfile, workStatItems } from "../../mock/mine";

const { isPageHeadCompact } = usePageHeadCompact();

const showMockTip = (title: string) => {
  uni.showToast({ title, icon: "none" });
};
</script>

<style scoped lang="scss">
.profile-card {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-soft));
  border-radius: var(--radius-lg);
  padding: 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12rpx;
}

.avatar-section {
  display: flex;
  align-items: center;
}

.avatar {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  background: var(--color-bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 36rpx;
  font-weight: 600;
  color: var(--color-text-primary);
}

.profile-role {
  margin-top: 6rpx;
  font-size: 24rpx;
  color: var(--color-text-secondary);
}

.profile-location {
  margin-top: 4rpx;
  font-size: 22rpx;
  color: var(--color-text-placeholder);
}

.cert-badge {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: var(--color-primary);
  color: var(--color-bg-card);
  font-size: 22rpx;
}

.stats-overview {
  margin-top: 20rpx;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12rpx;
}

.stats-item {
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20rpx 16rpx;
  text-align: center;
}

.stats-number {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--color-primary);
}

.stats-label {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: var(--color-text-secondary);
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.menu-text {
  margin-left: 16rpx;
  flex: 1;
}

.menu-title {
  font-size: 30rpx;
  color: var(--color-text-primary);
  font-weight: 500;
}

.menu-desc {
  margin-top: 4rpx;
  font-size: 24rpx;
  color: var(--color-text-secondary);
}
</style>
