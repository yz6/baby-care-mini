<template>
  <PageContainer>
    <!-- 统一页面头部 -->
    <UniPageHead 
      greeting="Hi，早上好！" 
      title="今天是个美好的一天 ✨"
    >
      <template #extra>
        <view class="status-badge">
          <text class="status-text">今日排班</text>
        </view>
      </template>
    </UniPageHead>

    <!-- 数据概览卡片 -->
    <view class="stats-section">
      <view class="stats-grid">
        <view class="stat-card" v-for="(item, index) in metrics" :key="item.key" :class="{ featured: index === 0 }">
          <view class="stat-content">
            <text class="stat-value">{{ item.value }}</text>
            <text class="stat-label">{{ item.label }}</text>
          </view>
          <view class="stat-decoration" />
        </view>
      </view>
    </view>

    <!-- 快捷操作 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">快捷操作</text>
        <text class="section-more">查看全部</text>
      </view>
      <view class="action-grid">
        <view class="action-item" v-for="item in tools" :key="item.key">
          <view class="action-icon">
            <uni-icons :type="item.icon" size="24" color="#00c896" />
          </view>
          <text class="action-title">{{ item.name }}</text>
          <text class="action-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <!-- 今日任务 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">今日任务</text>
        <view class="task-count">{{ todos.length }} 项</view>
      </view>
      <view class="task-list">
        <view class="task-item" v-for="todo in todos" :key="todo.id">
          <view class="task-status" />
          <text class="task-content">{{ todo.text }}</text>
          <text class="task-time">即将到期</text>
        </view>
      </view>
    </view>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageContainer from "../../components/common/PageContainer.vue";
import UniPageHead from "../../components/common/UniPageHead.vue";

interface MetricItem {
  key: string;
  label: string;
  value: string;
}

interface ToolItem {
  key: string;
  name: string;
  desc: string;
  icon: string;
}

interface TodoItem {
  id: string;
  text: string;
}

const metrics = ref<MetricItem[]>([
  { key: "todayVisits", label: "今日入户", value: "8" },
  { key: "weekActivities", label: "本周活动", value: "3" },
  { key: "monthFamilies", label: "本月家庭", value: "42" },
]);

const tools = ref<ToolItem[]>([
  { key: "newVisit", name: "新建入户", desc: "记录家庭走访", icon: "home" },
  { key: "schedule", name: "查看排班", desc: "今日工作安排", icon: "calendar" },
  { key: "families", name: "家庭档案", desc: "管理家庭信息", icon: "person" },
  { key: "activities", name: "活动组织", desc: "亲子活动安排", icon: "heart" },
  { key: "resources", name: "教学资源", desc: "课程与材料", icon: "book" },
  { key: "reports", name: "数据报表", desc: "工作统计分析", icon: "bar-chart" },
]);

const todos = ref<TodoItem[]>([
  { id: "1", text: "9:00 李家入户指导（婴幼儿发育评估）" },
  { id: "2", text: "14:00 亲子活动准备（感统训练）" },
  { id: "3", text: "18:00 完成今日家庭跟进记录" },
]);
</script>

<style scoped lang="scss">
// 状态徽章样式
.status-badge {
  background: var(--gradient-primary);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.status-text {
  color: white;
  font-size: var(--font-size-sm);
  font-weight: 500;
}

// 现代化数据卡片
.stats-section {
  margin-bottom: var(--spacing-xl);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.stat-card {
  position: relative;
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  border: none;
  overflow: hidden;
  transition: all 0.3s ease;

  &.featured {
    background: var(--gradient-primary);

    .stat-value,
    .stat-label {
      color: white;
    }
  }

  &:hover {
    transform: translateY(-2rpx);
    box-shadow: var(--shadow-md);
  }
}

.stat-content {
  position: relative;
  z-index: 2;
}

.stat-value {
  display: block;
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.stat-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
  font-weight: 500;
}

.stat-decoration {
  position: absolute;
  top: -20rpx;
  right: -20rpx;
  width: 80rpx;
  height: 80rpx;
  background: rgba(0, 200, 150, 0.1);
  border-radius: 50%;
  z-index: 1;
}

// 现代化区块样式
.section {
  margin-bottom: var(--spacing-xxl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
}

.section-more {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}

.task-count {
  background: var(--color-primary-light);
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  font-weight: 500;
}

// 现代化操作网格
.action-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.action-item {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-xs);
  border: none;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-sm);
    transform: translateY(-1rpx);
  }
}

.action-icon {
  width: 60rpx;
  height: 60rpx;
  background: var(--color-primary-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--spacing-sm);
}

.action-title {
  display: block;
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.action-desc {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  line-height: 1.4;
}

// 现代化任务列表
.task-list {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-sm);
  box-shadow: var(--shadow-xs);
}

.task-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-bg-hover);
  }

  &:not(:last-child) {
    margin-bottom: var(--spacing-xs);
  }
}

.task-status {
  width: 8rpx;
  height: 8rpx;
  background: var(--color-primary);
  border-radius: 50%;
  margin-right: var(--spacing-md);
  flex-shrink: 0;
}

.task-content {
  flex: 1;
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  line-height: 1.4;
}

.task-time {
  font-size: var(--font-size-xs);
  color: var(--color-warning);
  font-weight: 500;
}
</style>
