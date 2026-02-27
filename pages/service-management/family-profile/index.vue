<template>
  <PageContainer>
    <UniPageHead
      title="家庭档案"
      :showBack="true"
      backFallbackUrl="/pages/service-management/index"
      :compact="isPageHeadCompact"
    />

    <view class="tool-row">
      <input v-model="searchKeyword" class="search-input" placeholder="搜索家庭编号/家长/婴幼儿姓名" />
      <picker mode="selector" :range="sortOptions" @change="handleSortChange">
        <view class="picker-btn">{{ sortOptions[sortIndex] }}</view>
      </picker>
    </view>

    <view class="filter-row">
      <view class="filter-chip" :class="{ active: selectedFilter === 'all' }" @click="selectedFilter = 'all'">全部</view>
      <view class="filter-chip" :class="{ active: selectedFilter === '0-18' }" @click="selectedFilter = '0-18'">0-18月</view>
      <view class="filter-chip" :class="{ active: selectedFilter === '19-36' }" @click="selectedFilter = '19-36'">19-36月</view>
    </view>

    <uni-card v-for="item in viewFamilyProfiles" :key="item.id" :is-shadow="false">
      <view class="card-title">{{ item.familyCode }} · {{ item.parentName }}</view>
      <view class="card-row">{{ item.phone }} ｜ {{ item.address }}</view>
      <view class="card-row">婴幼儿：{{ item.childName }} ｜ 出生日期：{{ item.birthday }} ｜ 月龄：{{ item.monthAge }}</view>
      <view class="card-row">最近入户：{{ item.recentVisitDate }} ｜ 最近活动：{{ item.recentActivityDate }}</view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { familyProfiles } from "../../../mock/service-management";
import type { FamilyProfileItem } from "../../../types/service-management";

type AgeFilter = "all" | "0-18" | "19-36";

const searchKeyword = ref("");
const { isPageHeadCompact } = usePageHeadCompact();
const selectedFilter = ref<AgeFilter>("all");
const sortOptions = ["按月龄升序", "按月龄降序"];
const sortIndex = ref(0);

const viewFamilyProfiles = computed(() => {
  let data = familyProfiles.filter((item) => {
    if (!searchKeyword.value) {
      return true;
    }
    return [item.familyCode, item.parentName, item.childName].some((field) => field.includes(searchKeyword.value));
  });

  if (selectedFilter.value === "0-18") {
    data = data.filter((item) => item.monthAge <= 18);
  }
  if (selectedFilter.value === "19-36") {
    data = data.filter((item) => item.monthAge >= 19);
  }

  return [...data].sort((a: FamilyProfileItem, b: FamilyProfileItem) => {
    if (sortIndex.value === 0) {
      return a.monthAge - b.monthAge;
    }
    return b.monthAge - a.monthAge;
  });
});

const handleSortChange = (event: { detail: { value: string } }) => {
  sortIndex.value = Number(event.detail.value);
};
</script>

<style scoped lang="scss">
.tool-row {
  display: flex;
  gap: 12rpx;
  margin-top: 12rpx;
}

.search-input {
  flex: 1;
  min-height: 88rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-card);
  padding: 0 20rpx;
  font-size: var(--font-size-sm);
}

.picker-btn {
  min-height: 88rpx;
  line-height: 88rpx;
  padding: 0 18rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-card);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.filter-row {
  margin-top: 14rpx;
  display: flex;
  gap: 10rpx;
}

.filter-chip {
  min-height: 64rpx;
  line-height: 64rpx;
  padding: 0 18rpx;
  border-radius: 999rpx;
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.filter-chip.active {
  color: var(--color-primary);
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
}

.card-title {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.card-row {
  margin-top: 10rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
