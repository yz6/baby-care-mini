import { ref } from "vue";

export function useLoading(initialValue = false) {
  const loading = ref<boolean>(initialValue);

  function setLoading(value: boolean) {
    loading.value = value;
  }

  return {
    loading,
    setLoading
  };
}
