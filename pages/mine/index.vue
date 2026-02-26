<template>
  <PageContainer>
    <view class="profile-card">
      <view class="avatar-section">
        <view class="avatar">
          <uni-icons type="person-filled" size="32" color="#2F8A5B" />
        </view>
        <view class="profile-info">
          <view class="profile-name">{{ userInfo.name }}</view>
          <view class="profile-role">{{ userInfo.role }}</view>
          <view class="profile-location">{{ userInfo.location }}</view>
        </view>
      </view>
      <!-- <view class="cert-badge">持证上岗</view> -->
    </view>

    <view class="stats-overview">
      <view class="stats-item" v-for="item in workStats" :key="item.key">
        <view class="stats-number">{{ item.value }}</view>
        <view class="stats-label">{{ item.label }}</view>
      </view>
    </view>

    <uni-card title="工作工具" :is-shadow="false">
      <view class="menu-item" v-for="item in workTools" :key="item.key">
        <view class="menu-left">
          <uni-icons :type="item.icon" size="22" color="#2F8A5B" />
          <view class="menu-text">
            <view class="menu-title">{{ item.title }}</view>
            <view class="menu-desc">{{ item.desc }}</view>
          </view>
        </view>
        <uni-icons type="right" size="16" color="#98A2B3" />
      </view>
    </uni-card>

    <uni-card title="系统设置" :is-shadow="false">
      <view class="menu-item" v-for="item in systemMenus" :key="item.key">
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
import { ref } from "vue";
import PageContainer from "../../components/common/PageContainer.vue";

interface UserInfo {
  name: string;
  role: string;
  location: string;
}

interface StatItem {
  key: string;
  value: string;
  label: string;
}

interface MenuItem {
  key: string;
  title: string;
  desc: string;
  icon: string;
}

const userInfo = ref<UserInfo>({
  name: "张老师",
  role: "乡村早期教育指导教师",
  location: "XX县XX镇工作站",
});

const workStats = ref<StatItem[]>([
  { key: "families", value: "32", label: "服务家庭" },
  { key: "visits", value: "128", label: "入户次数" },
  { key: "activities", value: "24", label: "组织活动" },
  { key: "records", value: "156", label: "成长记录" },
]);

const workTools = ref<MenuItem[]>([
  { key: "data", title: "我的数据报表", desc: "查看工作统计与绩效", icon: "bars" },
  { key: "schedule", title: "工作日程安排", desc: "管理入户和活动时间", icon: "calendar" },
  { key: "materials", title: "教学资料库", desc: "课件模板与指导资源", icon: "folder" },
]);

const systemMenus = ref<MenuItem[]>([
  { key: "settings", title: "账号设置", desc: "修改密码与个人信息", icon: "gear" },
  { key: "help", title: "使用帮助", desc: "功能介绍与操作指南", icon: "help" },
  { key: "feedback", title: "意见反馈", desc: "问题反馈与功能建议", icon: "chatbubble" },
  { key: "about", title: "关于乡小育", desc: "版本信息与服务协议", icon: "info" },
]);
</script>

<style scoped lang="scss">
.profile-card {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-soft));
  border-radius: var(--radius-lg);
  padding: 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: calc(var(--status-bar-height, 44rpx) + 54rpx);
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
