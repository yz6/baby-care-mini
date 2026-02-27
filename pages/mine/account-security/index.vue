<template>
  <PageContainer>
    <UniPageHead title="账号安全" :showBack="true" backFallbackUrl="/pages/mine/index" :compact="isPageHeadCompact" />

    <uni-card title="修改密码" :is-shadow="false">
      <input v-model="oldPassword" class="field-input" password placeholder="原密码" />
      <input v-model="newPassword" class="field-input" password placeholder="新密码（至少6位）" />
      <input v-model="confirmPassword" class="field-input" password placeholder="确认新密码" />
      <button class="submit-btn" @click="submitPassword">确认修改</button>
    </uni-card>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageContainer from "../../../components/common/PageContainer.vue";
import UniPageHead from "../../../components/common/UniPageHead.vue";
import { usePageHeadCompact } from "../../../composables/usePageHeadCompact";

const { isPageHeadCompact } = usePageHeadCompact();
const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

const submitPassword = () => {
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    uni.showToast({ title: "请填写完整密码信息", icon: "none" });
    return;
  }
  if (newPassword.value.length < 6) {
    uni.showToast({ title: "新密码至少6位", icon: "none" });
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    uni.showToast({ title: "两次输入的新密码不一致", icon: "none" });
    return;
  }
  uni.showToast({ title: "密码修改成功（mock）", icon: "none" });
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
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
}
</style>
