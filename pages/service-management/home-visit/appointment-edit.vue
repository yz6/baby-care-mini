<template>
  <PageContainer>
    <UniPageHead title="修改预约" :showBack="true" backFallbackUrl="/pages/service-management/home-visit/index" :compact="isPageHeadCompact" />

    <uni-card title="预约信息编辑" :is-shadow="false">
      <view class="field-label">家庭编号</view>
      <view class="readonly-field">{{ appointment.familyCode }}</view>

      <view class="field-label">预约日期</view>
      <picker mode="date" :value="appointment.appointmentDate" @change="handleDateChange">
        <view class="picker-field">{{ appointment.appointmentDate || "请选择预约日期" }}</view>
      </picker>

      <view class="field-label">时间段</view>
      <picker mode="selector" :range="timeSlotOptions" @change="handleTimeSlotChange">
        <view class="picker-field">{{ appointment.appointmentSlot || "请选择时间段" }}</view>
      </picker>

      <view class="field-label">预约状态（单选）</view>
      <radio-group class="option-row" @change="handleStatusChange">
        <label class="option-item" v-for="item in statusOptions" :key="item.value">
          <radio :value="item.value" :checked="appointment.status === item.value" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ item.label }}</text>
        </label>
      </radio-group>

      <view class="btn-row">
        <button class="submit-btn" @click="saveAppointment">保存预约</button>
        <button class="cancel-btn" @click="markAsCancelled">标记取消</button>
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { homeVisitAppointments } from "../../../mock/service-management";
import type { ServiceStatus } from "../../../types/service-management";

declare const onLoad:
  | ((callback: (query: Record<string, string | undefined>) => void) => void)
  | undefined;

const { isPageHeadCompact } = usePageHeadCompact();
const appointmentId = ref("");

if (typeof onLoad === "function") {
  onLoad((query) => {
    appointmentId.value = query.id || "";
  });
}

const appointment = computed(() => homeVisitAppointments.find((item) => item.id === appointmentId.value) || homeVisitAppointments[0]);

const timeSlotOptions = ["09:00-10:00", "10:00-11:00", "14:00-15:00", "15:00-16:00"];
const statusOptions: { label: string; value: ServiceStatus }[] = [
  { label: "待确认", value: "pending" },
  { label: "已确认", value: "confirmed" },
  { label: "已完成", value: "done" },
  { label: "已取消", value: "cancelled" },
];

const handleDateChange = (event: { detail: { value: string } }) => {
  appointment.value.appointmentDate = event.detail.value;
};

const handleTimeSlotChange = (event: { detail: { value: string } }) => {
  appointment.value.appointmentSlot = timeSlotOptions[Number(event.detail.value)] || "";
};

const handleStatusChange = (event: { detail: { value: string } }) => {
  appointment.value.status = event.detail.value as ServiceStatus;
};

const saveAppointment = () => {
  if (!appointment.value.appointmentDate || !appointment.value.appointmentSlot) {
    uni.showToast({ title: "请补全预约日期与时间段", icon: "none" });
    return;
  }
  uni.showToast({ title: "预约已更新（mock）", icon: "none" });
  uni.navigateBack();
};

const markAsCancelled = () => {
  appointment.value.status = "cancelled";
  uni.showToast({ title: "预约已标记取消", icon: "none" });
};
</script>

<style scoped lang="scss">
.field-label {
  margin: 8rpx 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.readonly-field,
.picker-field {
  width: 100%;
  min-height: 88rpx;
  line-height: 88rpx;
  margin-bottom: 12rpx;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  padding: 0 14rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.option-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx 12rpx;
  margin-bottom: 12rpx;
}

.option-item {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.btn-row {
  display: flex;
  gap: 10rpx;
}

.submit-btn,
.cancel-btn {
  flex: 1;
  min-height: 88rpx;
  line-height: 88rpx;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.submit-btn {
  color: #ffffff;
  background: var(--gradient-primary);
}

.cancel-btn {
  color: #b26a00;
  border: 1rpx solid #ffe4b5;
  background: #fff8ed;
}
</style>
