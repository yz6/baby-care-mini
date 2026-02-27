<template>
  <PageContainer>
    <UniPageHead
      title="入户指导"
      :showBack="true"
      backFallbackUrl="/pages/service-management/index"
      :compact="isPageHeadCompact"
    />

    <uni-card title="家庭信息展示栏" :is-shadow="false">
      <picker mode="selector" :range="familyOptions" @change="handleFamilyChange">
        <view class="selector-btn">当前家庭：{{ selectedFamilyLabel }}</view>
      </picker>
      <view class="detail-row">家庭编号：{{ selectedAppointment.familyCode }}</view>
      <view class="detail-row">家长姓名：{{ selectedAppointment.parentName }} ｜ 联系方式：{{ selectedAppointment.phone }}</view>
      <view class="detail-row">地址：{{ selectedAppointment.address }}</view>
      <view class="detail-row">婴幼儿：{{ selectedAppointment.childName }} ｜ 出生日期：{{ selectedAppointment.birthday }}</view>
      <view class="detail-row">当前月龄：{{ currentMonthAge }} 月 ｜ 适配量表：{{ matchedScaleRange }}</view>
    </uni-card>

    <uni-card title="入户预约管理" :is-shadow="false">
      <view class="detail-row">预约日期：{{ selectedAppointment.appointmentDate }}</view>
      <view class="detail-row">时间段：{{ selectedAppointment.appointmentSlot }}</view>
      <view class="detail-row">预约状态：{{ statusTextMap[selectedAppointment.status] }}</view>
      <view class="btn-row">
        <button class="action-btn" size="mini" @click="showMockTip('已更新预约状态（mock）')">修改预约</button>
        <button class="action-btn" size="mini" @click="showMockTip('已取消预约（mock）')">取消预约</button>
      </view>
    </uni-card>

    <uni-card title="生长发育数据记录" :is-shadow="false">
      <view class="growth-row" v-for="item in growthRecords" :key="item.id">
        <text>{{ item.recordDate }}</text>
        <text>身高 {{ item.heightCm }}cm</text>
        <text>体重 {{ item.weightKg }}kg</text>
        <text>头围 {{ item.headCircumferenceCm }}cm</text>
      </view>
    </uni-card>

    <uni-card title="发展特点记录" :is-shadow="false">
      <view class="tag-group" v-for="group in developmentTagGroups" :key="group.key">
        <view class="tag-title">{{ group.label }}</view>
        <view class="tag-list">
          <view class="tag-item" v-for="option in group.options" :key="option">{{ option }}</view>
        </view>
      </view>
      <textarea class="remark-input" placeholder="补充记录：勾选维度外的观察内容（mock）" />
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { developmentTagGroups, growthRecords, homeVisitAppointments } from "../../../mock/service-management";
import type { HomeVisitAppointmentItem, ServiceStatus } from "../../../types/service-management";

const selectedIndex = ref(0);
const { isPageHeadCompact } = usePageHeadCompact();
const familyOptions = homeVisitAppointments.map((item) => `${item.parentName}-${item.childName}`);

const selectedAppointment = computed<HomeVisitAppointmentItem>(() => homeVisitAppointments[selectedIndex.value]);
const selectedFamilyLabel = computed(() => familyOptions[selectedIndex.value] || "-");

const statusTextMap: Record<ServiceStatus, string> = {
  pending: "待确认",
  confirmed: "已确认",
  done: "已完成",
};

const calculateMonthAge = (birthday: string) => {
  const currentDate = new Date();
  const birthdayDate = new Date(birthday);
  const yearDiff = currentDate.getFullYear() - birthdayDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthdayDate.getMonth();
  return yearDiff * 12 + monthDiff;
};

const currentMonthAge = computed(() => calculateMonthAge(selectedAppointment.value.birthday));

const matchedScaleRange = computed(() => {
  const age = currentMonthAge.value;
  if (age <= 6) {
    return "0-6月龄评价量表";
  }
  if (age <= 12) {
    return "7-12月龄评价量表";
  }
  if (age <= 18) {
    return "13-18月龄评价量表";
  }
  if (age <= 24) {
    return "19-24月龄评价量表";
  }
  return "25-36月龄评价量表";
});

const handleFamilyChange = (event: { detail: { value: string } }) => {
  selectedIndex.value = Number(event.detail.value);
};

const showMockTip = (title: string) => {
  uni.showToast({ title, icon: "none" });
};
</script>

<style scoped lang="scss">
.selector-btn {
  min-height: 84rpx;
  line-height: 84rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-card);
  padding: 0 18rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.detail-row {
  margin-top: 10rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.btn-row {
  margin-top: 14rpx;
  display: flex;
  gap: 10rpx;
}

.action-btn {
  min-height: 72rpx;
  line-height: 72rpx;
  padding: 0 16rpx;
  color: var(--color-primary);
  border: 1rpx solid var(--color-primary-light);
  background: var(--color-primary-light);
}

.growth-row {
  display: flex;
  justify-content: space-between;
  gap: 8rpx;
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.growth-row:last-child {
  border-bottom: none;
}

.tag-group {
  margin-bottom: 12rpx;
}

.tag-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 600;
}

.tag-list {
  margin-top: 10rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.tag-item {
  font-size: var(--font-size-xs);
  color: var(--color-primary-dark);
  background: var(--color-primary-light);
  border-radius: 999rpx;
  padding: 8rpx 14rpx;
}

.remark-input {
  margin-top: 8rpx;
  width: 100%;
  min-height: 120rpx;
  background: var(--color-bg-page);
  border-radius: var(--radius-md);
  padding: 12rpx;
  font-size: var(--font-size-sm);
}
</style>
