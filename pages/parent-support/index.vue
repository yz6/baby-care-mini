<template>
  <PageContainer>
    <UniPageHead title="共育支持" :compact="isPageHeadCompact" />

    <view class="entry-grid">
      <view class="entry-card" v-for="entry in parentSupportEntries" :key="entry.key" @click="goToPage(entry.route)">
        <view class="entry-title">{{ entry.title }}</view>
        <view class="entry-desc">{{ entry.desc }}</view>
      </view>
    </view>

    <uni-card title="育儿文库" :is-shadow="false">
      <view class="library-doc-section">
        <view class="library-doc-section-title">文档查看</view>
        <view class="library-doc-item" v-for="item in parentingLibraryDocuments" :key="item.id">
          <view class="library-doc-main">
            <view class="library-doc-title">{{ item.title }}</view>
            <view class="library-meta">格式：{{ item.fileType.toUpperCase() }}</view>
          </view>
          <button class="library-doc-btn" size="mini" @click="handleOpenLibraryDocument(item)">查看</button>
        </view>
      </view>
      <view class="segment-row">
        <view v-for="item in libraryTabs" :key="item.key" class="segment-item" :class="{ active: item.key === activeLibraryTab }" @click="activeLibraryTab = item.key">
          {{ item.label }}
        </view>
      </view>
      <view class="library-item" v-for="item in filteredLibraryItems" :key="item.id">
        <view class="library-title">{{ item.title }}</view>
        <view class="library-meta">{{ item.monthRange }} ｜ {{ item.domain }} ｜ 热点：{{ item.hotTopic }}</view>
        <view class="library-meta">阅读量：{{ item.readCount }}</view>
      </view>
    </uni-card>

    <uni-card title="育儿教程" :is-shadow="false">
      <view class="tutorial-item" v-for="item in parentingTutorialItems" :key="item.id">
        <view class="tutorial-title">{{ item.title }}</view>
        <view class="tutorial-meta">{{ item.monthRange }} ｜ {{ item.topic }} ｜ {{ item.activityType }}</view>
        <view class="tutorial-meta">关联家庭：{{ item.relatedFamily }} ｜ 播放次数：{{ item.playCount }}</view>
      </view>
    </uni-card>

    <uni-card title="政策文件" :is-shadow="false">
      <view class="policy-item" v-for="item in policyFileItems" :key="item.id">
        <view class="policy-main">
          <view class="policy-title">{{ item.title }}</view>
          <view class="policy-meta">{{ item.category }}</view>
        </view>
        <view class="policy-actions">
          <text class="policy-btn" @click="showMockTip('查看（mock）')">查看</text>
          <text class="policy-btn" @click="showMockTip('开始下载（mock）')">下载</text>
          <text class="policy-btn" @click="handlePolicyCollect(item.id)">{{ item.collect ? "已收藏" : "收藏" }}</text>
        </view>
      </view>
    </uni-card>

    <uni-card title="推送管理" :is-shadow="false">
      <view class="push-title">推送对象</view>
      <view class="push-targets">
        <view class="target-chip" v-for="item in pushTargets" :key="item.id">{{ item.familyName }}</view>
      </view>
      <input v-model="pushForm.content" class="form-input" placeholder="推送内容（示例：本周亲子活动通知）" />
      <input v-model="pushForm.time" class="form-input" placeholder="定时推送时间（示例：2026-03-01 20:00）" />
      <view class="push-actions">
        <button class="push-btn" size="mini" @click="handleQuickPush('定向推送')">定向推送</button>
        <button class="push-btn" size="mini" @click="handleQuickPush('批量推送')">批量推送</button>
        <button class="push-btn" size="mini" @click="handleQuickPush('定时推送')">定时推送</button>
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import PageContainer from "../../components/common/PageContainer.vue";
import UniPageHead from "../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../composables/usePageHeadCompact";
import { addPushRecordItem, parentingLibraryDocuments, parentingLibraryItems, parentingTutorialItems, policyFileItems, pushTargets, togglePolicyCollect } from "../../mock/parent-support";
import type { ParentingLibraryDocumentItem, ParentingLibraryItem } from "../../types/parent-support";

type LibraryTabKey = "all" | "monthRange" | "domain" | "hotTopic";

const { isPageHeadCompact } = usePageHeadCompact();
const activeLibraryTab = ref<LibraryTabKey>("all");

const libraryTabs = [
  { key: "all", label: "全部" },
  { key: "monthRange", label: "按月龄段" },
  { key: "domain", label: "按发展领域" },
  { key: "hotTopic", label: "按热点问题" },
] as const;

const filteredLibraryItems = computed(() => {
  if (activeLibraryTab.value === "all") {
    return parentingLibraryItems;
  }
  return parentingLibraryItems.filter((item: ParentingLibraryItem) => {
    if (activeLibraryTab.value === "monthRange") {
      return item.monthRange.includes("月");
    }
    if (activeLibraryTab.value === "domain") {
      return Boolean(item.domain);
    }
    return Boolean(item.hotTopic);
  });
});

const pushForm = reactive({
  content: "",
  time: "",
});

const showMockTip = (title: string) => {
  uni.showToast({ title, icon: "none" });
};

const handleOpenLibraryDocument = async (item: ParentingLibraryDocumentItem) => {
  try {
    uni.showLoading({ title: "文档加载中..." });
    const downloadedFilePath = await new Promise<string>((resolve, reject) => {
      uni.downloadFile({
        url: item.fileUrl,
        success: (downloadResult) => {
          if (downloadResult.statusCode === 200) {
            resolve(downloadResult.tempFilePath);
            return;
          }
          reject(new Error(`download status ${downloadResult.statusCode}`));
        },
        fail: reject,
      });
    });

    await new Promise<void>((resolve, reject) => {
      uni.openDocument({
        filePath: downloadedFilePath,
        fileType: item.fileType,
        showMenu: true,
        success: () => resolve(),
        fail: reject,
      });
    });
  } catch (error) {
    console.error("open library document failed", error);
    uni.showToast({ title: "打开失败，请稍后重试", icon: "none" });
  } finally {
    uni.hideLoading();
  }
};

const handlePolicyCollect = (policyId: string) => {
  const success = togglePolicyCollect(policyId);
  uni.showToast({ title: success ? "收藏状态已更新" : "更新失败", icon: "none" });
};

const handleQuickPush = (mode: "定向推送" | "批量推送" | "定时推送") => {
  if (!pushForm.content || !pushForm.time) {
    uni.showToast({ title: "请先填写推送内容和时间", icon: "none" });
    return;
  }
  addPushRecordItem({
    mode,
    content: pushForm.content,
    sendTime: pushForm.time,
    targetFamilies: pushTargets.map((item) => item.familyName),
  });
  uni.showToast({ title: `${mode}已创建`, icon: "none" });
};

const parentSupportEntries = [
  { key: "parentingLibrary", title: "育儿文库", desc: "进入文库管理页", route: "/pages/parent-support/parenting-library/index" },
  { key: "parentingTutorial", title: "育儿教程", desc: "进入教程管理页", route: "/pages/parent-support/parenting-tutorial/index" },
  { key: "policyFile", title: "政策文件", desc: "进入政策文件页", route: "/pages/parent-support/policy-file/index" },
  { key: "pushManagement", title: "推送管理", desc: "进入推送配置页", route: "/pages/parent-support/push-management/index" },
] as const;

const goToPage = (route: string) => {
  uni.navigateTo({ url: route });
};
</script>

<style scoped lang="scss">
.entry-grid {
  margin-top: 12rpx;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12rpx;
}

.entry-card {
  min-height: 140rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-card);
  padding: 16rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.entry-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
}

.entry-desc {
  margin-top: 8rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.segment-row {
  margin-top: 10rpx;
  display: flex;
  gap: 12rpx;
  overflow-x: auto;
  white-space: nowrap;
}

.segment-item {
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  border: 1rpx solid var(--color-border);
  font-size: 24rpx;
  color: var(--color-text-secondary);
  background: var(--color-bg-card);
}

.segment-item.active {
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
  color: var(--color-primary);
}

.library-item {
  padding: 14rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.library-item:last-child {
  border-bottom: none;
}

.library-doc-section {
  margin-top: 14rpx;
  padding-top: 14rpx;
  border-top: 1rpx solid var(--color-border);
}

.library-doc-section-title {
  font-size: 26rpx;
  color: var(--color-text-secondary);
}

.library-doc-item {
  margin-top: 12rpx;
  min-height: 88rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-page);
  padding: 12rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12rpx;
}

.library-doc-main {
  flex: 1;
  min-width: 0;
}

.library-doc-title {
  font-size: 28rpx;
  color: var(--color-text-primary);
  font-weight: 600;
}

.library-doc-btn {
  min-height: 72rpx;
  line-height: 72rpx;
  border-radius: 999rpx;
  padding: 0 18rpx;
  font-size: var(--font-size-xs);
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
  border: 1rpx solid var(--color-primary-light);
}

.library-title {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--color-text-primary);
}

.library-meta {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--color-text-secondary);
}

.tutorial-item {
  padding: 14rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.tutorial-item:last-child {
  border-bottom: none;
}

.tutorial-title {
  font-size: 30rpx;
  font-weight: 600;
  color: var(--color-text-primary);
}

.tutorial-meta {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--color-text-secondary);
}

.policy-item {
  padding: 14rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.policy-item:last-child {
  border-bottom: none;
}

.policy-main {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.policy-title {
  font-size: 28rpx;
  color: var(--color-text-primary);
  font-weight: 600;
}

.policy-meta {
  font-size: 24rpx;
  color: var(--color-text-secondary);
}

.policy-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 10rpx;
}

.policy-btn {
  font-size: 22rpx;
  padding: 6rpx 14rpx;
  border-radius: 999rpx;
  background: var(--color-primary-light);
  color: var(--color-primary-dark);
}

.push-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.push-targets {
  margin-top: 8rpx;
  display: flex;
  gap: 8rpx;
  flex-wrap: wrap;
}

.target-chip {
  font-size: var(--font-size-xs);
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
  border-radius: 999rpx;
  padding: 8rpx 14rpx;
}

.form-input {
  margin-top: 12rpx;
  min-height: 88rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-page);
  font-size: var(--font-size-sm);
  padding: 0 16rpx;
}

.push-actions {
  margin-top: 12rpx;
  display: flex;
  gap: 10rpx;
}

.push-btn {
  min-height: 72rpx;
  line-height: 72rpx;
  border-radius: 999rpx;
  padding: 0 16rpx;
  font-size: var(--font-size-xs);
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
  border: 1rpx solid var(--color-primary-light);
}
</style>
