import { ref } from "vue";

declare const onPageScroll: ((callback: (event: { scrollTop: number }) => void) => void) | undefined;

export const usePageHeadCompact = (threshold = 40) => {
  const isPageHeadCompact = ref(false);

  if (typeof onPageScroll === "function") {
    onPageScroll(({ scrollTop }: { scrollTop: number }) => {
      isPageHeadCompact.value = scrollTop > threshold;
    });
  }

  return { isPageHeadCompact };
};
