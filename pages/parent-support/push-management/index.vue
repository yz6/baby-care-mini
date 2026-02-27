<template>
  <PageContainer>
    <UniPageHead title="推送管理" :showBack="true" backFallbackUrl="/pages/parent-support/index" :compact="isPageHeadCompact" />

    <uni-card title="推送配置" :is-shadow="false">
      <view class="label-text biz-form-label">目标家庭</view>
      <checkbox-group class="target-row biz-option-row" @change="handleTargetChange">
        <label class="target-chip biz-option-item" v-for="target in pushTargets" :key="target.id">
          <checkbox :value="target.familyName" :checked="selectedTargets.includes(target.familyName)" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ target.familyName }}</text>
        </label>
      </checkbox-group>

      <view class="label-text biz-form-label">推送方式（单选）</view>
      <radio-group class="target-row biz-option-row" @change="handleModeChange">
        <label class="target-chip biz-option-item" v-for="mode in pushModeOptions" :key="mode">
          <radio :value="mode" :checked="selectedMode === mode" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ mode }}</text>
        </label>
      </radio-group>

      <view class="label-text biz-form-label">推送渠道（多选）</view>
      <checkbox-group class="target-row biz-option-row" @change="handleChannelChange">
        <label class="target-chip biz-option-item" v-for="channel in channelOptions" :key="channel">
          <checkbox :value="channel" :checked="selectedChannels.includes(channel)" color="#00c896" style="transform:scale(0.8)" />
          <text>{{ channel }}</text>
        </label>
      </checkbox-group>

      <textarea v-model="content" class="field-area biz-form-area" placeholder="请输入推送内容" />
      <view class="datetime-row">
        <picker mode="date" :value="sendDate" @change="handleSendDateChange">
          <view class="field-input biz-form-picker">{{ sendDate || "推送日期" }}</view>
        </picker>
        <picker mode="time" :value="sendClock" @change="handleSendClockChange">
          <view class="field-input biz-form-picker">{{ sendClock || "推送时间" }}</view>
        </picker>
      </view>
      <button class="primary-btn biz-submit-btn" @click="submitPush">提交推送任务</button>
    </uni-card>

    <uni-card title="推送记录" :is-shadow="false">
      <view class="record-row" v-for="item in pushRecordItems" :key="item.id">
        <view class="record-title">{{ item.mode }} ｜ {{ item.sendTime }}</view>
        <view class="record-text">{{ item.content }}</view>
        <view class="record-text">目标：{{ item.targetFamilies.join("、") }}</view>
      </view>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { pushRecordItems, pushTargets } from "../../../mock/parent-support";
import type { PushRecordItem } from "../../../types/parent-support";

const { isPageHeadCompact } = usePageHeadCompact();
const content = ref("");
const sendDate = ref("");
const sendClock = ref("");
const pushModeOptions: PushRecordItem["mode"][] = ["定向推送", "批量推送", "定时推送"];
const selectedMode = ref<PushRecordItem["mode"]>("定向推送");
const selectedTargets = ref<string[]>(["李家"]);
const channelOptions = ["App消息", "短信", "公众号"];
const selectedChannels = ref<string[]>(["App消息"]);

const handleTargetChange = (event: { detail: { value: string[] } }) => {
  selectedTargets.value = event.detail.value;
};

const handleModeChange = (event: { detail: { value: string } }) => {
  selectedMode.value = event.detail.value as PushRecordItem["mode"];
};

const handleChannelChange = (event: { detail: { value: string[] } }) => {
  selectedChannels.value = event.detail.value;
};

const handleSendDateChange = (event: { detail: { value: string } }) => {
  sendDate.value = event.detail.value;
};

const handleSendClockChange = (event: { detail: { value: string } }) => {
  sendClock.value = event.detail.value;
};

const submitPush = () => {
  if (!content.value || !sendDate.value || !sendClock.value) {
    uni.showToast({ title: "请填写推送内容和时间", icon: "none" });
    return;
  }
  if (selectedTargets.value.length === 0) {
    uni.showToast({ title: "请至少选择一个目标家庭", icon: "none" });
    return;
  }
  if (selectedChannels.value.length === 0) {
    uni.showToast({ title: "请至少选择一个推送渠道", icon: "none" });
    return;
  }
  uni.showToast({ title: `${selectedMode.value}已创建（mock）`, icon: "none" });
};
</script>

<style scoped lang="scss">
.label-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.target-row {
  margin-top: 10rpx;
  display: flex;
  gap: 8rpx;
  flex-wrap: wrap;
}

.target-chip {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: 999rpx;
  padding: 6rpx 12rpx;
}

.field-area {
  margin-top: 12rpx;
  width: 100%;
  min-height: 120rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-page);
  padding: 10rpx 14rpx;
  font-size: var(--font-size-sm);
}

.field-input {
  width: 100%;
  min-height: 88rpx;
  line-height: 88rpx;
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  background: var(--color-bg-page);
  padding: 0 14rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.datetime-row {
  margin-top: 12rpx;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10rpx;
}

.primary-btn {
  margin-top: 12rpx;
  min-height: 88rpx;
  line-height: 88rpx;
  border-radius: var(--radius-md);
  color: #ffffff;
  background: var(--gradient-primary);
}

.record-row {
  padding: 12rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.record-row:last-child {
  border-bottom: none;
}

.record-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 600;
}

.record-text {
  margin-top: 8rpx;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
