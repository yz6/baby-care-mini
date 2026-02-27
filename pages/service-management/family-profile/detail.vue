<template>
  <PageContainer>
    <UniPageHead title="家庭档案详情" :showBack="true" backFallbackUrl="/pages/service-management/family-profile/index" :compact="isPageHeadCompact" />

    <uni-card title="家庭与婴幼儿基础信息" :is-shadow="false">
      <view class="row-text">家庭编号：{{ detail.familyCode }}</view>
      <view class="row-text">家长姓名：{{ detail.parentName }} ｜ 联系方式：{{ detail.phone }}</view>
      <view class="row-text">地址：{{ detail.address }}</view>
      <view class="row-text">婴幼儿：{{ detail.childName }} ｜ 出生日期：{{ detail.birthday }} ｜ 月龄：{{ detail.monthAge }}</view>
    </uni-card>

    <uni-card title="生长发育与发展特点" :is-shadow="false">
      <view class="row-text">生长发育：{{ detail.growthFeature }}</view>
      <view class="row-text">发展特点：{{ detail.developmentFeature }}</view>
    </uni-card>

    <uni-card title="历史入户记录" :is-shadow="false">
      <view class="history-row" v-for="item in detail.homeVisitHistory" :key="item.id">
        <view class="history-date">{{ item.date }}</view>
        <view class="history-text">{{ item.summary }}</view>
      </view>
    </uni-card>

    <uni-card title="历史活动参与记录" :is-shadow="false">
      <view class="history-row" v-for="item in detail.activityHistory" :key="item.id">
        <view class="history-date">{{ item.date }} · {{ item.title }}</view>
        <view class="history-text">{{ item.result }}</view>
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { familyProfileDetails } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();
const routeFamilyId = ref("");
const pageOptions = (getCurrentPages().slice(-1)[0] as { options?: Record<string, string> } | undefined)?.options || {};
routeFamilyId.value = pageOptions.id || "";

const detail = computed(() => familyProfileDetails.find((item) => item.id === routeFamilyId.value) || familyProfileDetails[0]);
</script>

<style scoped lang="scss">
.row-text {
  margin-top: 10rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.history-row {
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.history-row:last-child {
  border-bottom: none;
}

.history-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 600;
}

.history-text {
  margin-top: 8rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
</style>
