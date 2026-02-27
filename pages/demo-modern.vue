<template>
  <PageContainer>
    <!-- 现代化头部 -->
    <view class="modern-header">
      <view class="greeting-section">
        <text class="greeting-text">Hi，早上好！</text>
        <text class="greeting-subtitle">今天是个美好的一天 ✨</text>
      </view>
      <!-- <view class="status-pill">
        <text class="status-text">今日排班</text>
      </view> -->
    </view>

    <!-- 数据卡片组 -->
    <view class="cards-section">
      <view class="card-item featured">
        <text class="card-number">8</text>
        <text class="card-label">今日入户</text>
      </view>
      <view class="card-item">
        <text class="card-number">3</text>
        <text class="card-label">本周活动</text>
      </view>
      <view class="card-item">
        <text class="card-number">42</text>
        <text class="card-label">本月家庭</text>
      </view>
    </view>

    <!-- 快捷操作 -->
    <view class="action-section">
      <view class="section-title-bar">
        <text class="section-title">快捷操作</text>
        <text class="section-link">查看全部</text>
      </view>
      <view class="action-cards">
        <view class="action-card" v-for="item in actions" :key="item.id">
          <view class="action-icon">📱</view>
          <text class="action-name">{{ item.name }}</text>
          <text class="action-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageContainer from "../components/common/PageContainer.vue";

const actions = ref([
  { id: 1, name: "新建入户", desc: "记录家庭走访" },
  { id: 2, name: "查看排班", desc: "今日工作安排" },
  { id: 3, name: "家庭档案", desc: "管理家庭信息" },
  { id: 4, name: "活动组织", desc: "亲子活动安排" },
  { id: 5, name: "教学资源", desc: "课程与材料" },
  { id: 6, name: "数据报表", desc: "工作统计分析" },
]);
</script>

<style scoped lang="scss">
.modern-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32rpx;
}

.greeting-section {
  flex: 1;
}

.greeting-text {
  display: block;
  font-size: 42rpx;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.2;
}

.greeting-subtitle {
  display: block;
  font-size: 28rpx;
  color: #666666;
  margin-top: 8rpx;
}

.status-pill {
  background: linear-gradient(135deg, #00c896 0%, #00b085 100%);
  padding: 12rpx 24rpx;
  border-radius: 32rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.06);
}

.status-text {
  color: white;
  font-size: 24rpx;
  font-weight: 500;
}

.cards-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
  margin-bottom: 48rpx;
}

.card-item {
  background: white;
  border-radius: 24rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.06);
  text-align: center;
  transition: all 0.3s ease;
  
  &.featured {
    background: linear-gradient(135deg, #00c896 0%, #00b085 100%);
    
    .card-number, .card-label {
      color: white;
    }
  }
  
  &:hover {
    transform: translateY(-2rpx);
    box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.08);
  }
}

.card-number {
  display: block;
  font-size: 36rpx;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
}

.card-label {
  display: block;
  font-size: 20rpx;
  color: #999999;
  margin-top: 8rpx;
  font-weight: 500;
}

.action-section {
  margin-bottom: 48rpx;
}

.section-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1a1a1a;
}

.section-link {
  font-size: 24rpx;
  color: #00c896;
  font-weight: 500;
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.action-card {
  background: white;
  border-radius: 24rpx;
  padding: 24rpx;
  box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.06);
    transform: translateY(-1rpx);
  }
}

.action-icon {
  width: 60rpx;
  height: 60rpx;
  background: #e6faf6;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12rpx;
  font-size: 24rpx;
}

.action-name {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8rpx;
}

.action-desc {
  display: block;
  font-size: 20rpx;
  color: #999999;
  line-height: 1.4;
}
</style>