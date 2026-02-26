import { defineStore } from "pinia";

interface AppState {
  productName: string;
  currentRoleName: string;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => ({
    productName: "乡小育",
    currentRoleName: "乡村早期教育指导教师"
  }),
  actions: {
    updateRoleName(roleName: string) {
      this.currentRoleName = roleName;
    }
  }
});
