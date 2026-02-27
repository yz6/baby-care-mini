<template>
  <PageContainer>
    <UniPageHead title="评价量表填写" :showBack="true" backFallbackUrl="/pages/service-management/home-visit/index" :compact="isPageHeadCompact" />

    <uni-card :title="currentTemplate.title" :is-shadow="false">
      <view class="question-row" v-for="question in currentTemplate.questions" :key="question.id">
        <view class="question-title">{{ question.question }}</view>
        <view class="score-row">
          <view
            class="score-item"
            v-for="score in question.scoreOptions"
            :key="score"
            :class="{ active: formScoreMap[question.id] === score }"
            @click="formScoreMap[question.id] = score"
          >
            {{ score }}
          </view>
        </view>
      </view>
      <button class="submit-btn" @click="submitScale">提交量表结果</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";
import { scaleTemplates } from "../../../mock/service-management";

const { isPageHeadCompact } = usePageHeadCompact();
const routeRange = ref("");
const pageOptions = (getCurrentPages().slice(-1)[0] as { options?: Record<string, string> } | undefined)?.options || {};
routeRange.value = decodeURIComponent(pageOptions.range || "");
const currentTemplate = computed(() => scaleTemplates.find((item) => item.range === routeRange.value) || scaleTemplates[0]);

const formScoreMap = reactive<Record<string, number>>(
  Object.fromEntries(currentTemplate.value.questions.map((item) => [item.id, item.scoreOptions[0]]))
);

const submitScale = () => {
  uni.showToast({ title: "量表评分已提交（mock）", icon: "none" });
};
</script>

<style scoped lang="scss">
.question-row {
  padding: 14rpx 0;
  border-bottom: 1rpx solid var(--color-border);
}

.question-row:last-child {
  border-bottom: none;
}

.question-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 600;
}

.score-row {
  margin-top: 10rpx;
  display: flex;
  gap: 10rpx;
}

.score-item {
  min-width: 56rpx;
  min-height: 56rpx;
  line-height: 56rpx;
  text-align: center;
  border-radius: 999rpx;
  border: 1rpx solid var(--color-border);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.score-item.active {
  color: var(--color-primary-dark);
  border-color: var(--color-primary-light);
  background: var(--color-primary-light);
}

.submit-btn {
  margin-top: 16rpx;
  min-height: 88rpx;
  line-height: 88rpx;
  color: #ffffff;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
}
</style>
