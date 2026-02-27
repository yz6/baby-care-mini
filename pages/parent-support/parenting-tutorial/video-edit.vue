<template>
  <PageContainer>
    <UniPageHead title="上传教程视频" :showBack="true" backFallbackUrl="/pages/parent-support/parenting-tutorial/index" :compact="isPageHeadCompact" />

    <uni-card title="视频信息" :is-shadow="false">
      <input v-model="form.title" class="field-input" placeholder="视频标题" />
      <input v-model="form.monthRange" class="field-input" placeholder="月龄段" />
      <input v-model="form.topic" class="field-input" placeholder="主题" />
      <input v-model="form.activityType" class="field-input" placeholder="活动类型" />
      <input v-model="form.relatedFamily" class="field-input" placeholder="关联家庭" />
      <input v-model="form.videoUrl" class="field-input" placeholder="视频地址（mock）" />
      <button class="submit-btn" @click="submitVideo">提交视频</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { addParentingTutorialItem, tutorialVideoDefaultForm } from "../../../mock/parent-support";

const { isPageHeadCompact } = usePageHeadCompact();
const form = reactive({ ...tutorialVideoDefaultForm });

const submitVideo = () => {
  if (!form.title || !form.videoUrl) {
    uni.showToast({ title: "请填写标题与视频地址", icon: "none" });
    return;
  }
  addParentingTutorialItem({
    title: form.title,
    monthRange: form.monthRange,
    topic: form.topic,
    activityType: form.activityType,
    relatedFamily: form.relatedFamily,
  });
  uni.showToast({ title: "视频上传成功", icon: "none" });
  uni.navigateBack();
};
</script>

<style scoped lang="scss">
.field-input {
  width: 100%;
  min-height: 88rpx;
  margin-bottom: 12rpx;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  padding: 0 14rpx;
  font-size: var(--font-size-sm);
}

.submit-btn {
  min-height: 88rpx;
  line-height: 88rpx;
  color: #ffffff;
  border-radius: var(--radius-md);
  background: var(--gradient-primary);
}
</style>
