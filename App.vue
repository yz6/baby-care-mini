<script>
export default {
  onLaunch() {
    console.log('App Launch');
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  }
};
</script>

<style lang="scss">
@import "./uni.scss";

page {
  background: $color-bg-page;
  color: $color-text-primary;
  font-size: 28rpx;
}
</style>
