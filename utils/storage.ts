export const deepClone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export const readStorage = <T>(storageKey: string, fallbackFactory: () => T): T => {
  try {
    const cached = uni.getStorageSync(storageKey) as T | undefined;
    if (cached) {
      return cached;
    }
  } catch (error) {
    console.warn(`[storage] read failed: ${storageKey}`, error);
  }
  return fallbackFactory();
};

export const writeStorage = <T>(storageKey: string, value: T) => {
  try {
    uni.setStorageSync(storageKey, value);
  } catch (error) {
    console.warn(`[storage] write failed: ${storageKey}`, error);
  }
};

export const createLocalId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
