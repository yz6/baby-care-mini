<template>
  <view class="trend-chart-wrap">
    <canvas v-if="hasData && !chartErrorMessage" class="trend-canvas" canvas-id="homeTrendCanvas" id="homeTrendCanvas" />
    <view v-else-if="!hasData" class="chart-empty">暂无趋势数据</view>
    <view v-else class="chart-empty">{{ chartErrorMessage }}</view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from "vue";
import UCharts from "@qiun/ucharts";
import type { HomeTrendPoint } from "../../types/home";

interface Props {
  points: HomeTrendPoint[];
}

const props = defineProps<Props>();
const vmProxy = getCurrentInstance()?.proxy as unknown;
const chartErrorMessage = ref("");
const hasData = computed(() => props.points.length > 0);

const chartWidth = computed(() => {
  const windowWidth = uni.getSystemInfoSync().windowWidth;
  return windowWidth - uni.upx2px(88) - uni.upx2px(32);
});
const chartHeight = uni.upx2px(320);

const drawChart = () => {
  if (!hasData.value) {
    return;
  }
  const context = uni.createCanvasContext("homeTrendCanvas", vmProxy as any);
  const categories = props.points.map((item) => item.week);
  const maxDataValue = Math.max(
    ...props.points.map((item) => item.familyCount),
    ...props.points.map((item) => item.visitCount),
    1
  );
  const yAxisSplitNumber = 6;
  const yAxisMax = Math.ceil(maxDataValue / yAxisSplitNumber) * yAxisSplitNumber;
  const series = [
    {
      name: "服务家庭数",
      type: "column",
      color: "#8FD3BF",
      data: props.points.map((item) => item.familyCount),
    },
    {
      name: "入户次数",
      type: "line",
      color: "#00C896",
      data: props.points.map((item) => item.visitCount),
    },
  ];

  // uCharts 在小程序端需要 $this 才能正确找到 canvas 节点。
  try {
    chartErrorMessage.value = "";
    new (UCharts as any)({
      context,
      $this: vmProxy,
      canvasId: "homeTrendCanvas",
      type: "mix",
      categories,
      series,
      width: chartWidth.value,
      height: chartHeight,
      background: "#FFFFFF",
      pixelRatio: 1,
      animation: true,
      legend: {
        show: true,
        position: "bottom",
        float: "center",
      },
      xAxis: {
        disableGrid: true,
        fontColor: "#646A73",
      },
      yAxis: {
        min: 0,
        max: yAxisMax,
        splitNumber: yAxisSplitNumber,
        tofix: 0,
        formatter: (val: number) => `${Math.round(val)}`,
        gridType: "dash",
        dashLength: 2,
        fontColor: "#646A73",
        data: [
          {
            min: 0,
            max: yAxisMax,
            tofix: 0,
            formatter: (val: number) => `${Math.round(val)}`,
          },
        ],
      },
      extra: {
        mix: {
          column: {
            width: 18,
            seriesGap: 2,
            categoryGap: 2,
          },
          line: {
            type: "curve",
            width: 2,
          },
          area: {
            opacity: 0,
          },
        },
      },
    });
  } catch (error) {
    console.error("HomeTrendChart draw failed:", error);
    chartErrorMessage.value = "图表加载失败，请稍后重试";
  }
};

onMounted(async () => {
  await nextTick();
  drawChart();
});

watch(
  () => props.points,
  async () => {
    await nextTick();
    drawChart();
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.trend-chart-wrap {
  margin-top: var(--spacing-sm);
}

.trend-canvas {
  width: 100%;
  height: 320rpx;
}

.chart-empty {
  height: 320rpx;
  border-radius: var(--radius-md);
  background: var(--color-bg-page);
  border: 1rpx dashed var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
</style>
