export interface TabbarItem {
  pagePath: string;
  text: string;
  iconPath: string;
  selectedIconPath: string;
}

export const TABBAR_ITEMS: TabbarItem[] = [
  {
    pagePath: "pages/home/index",
    text: "首页",
    iconPath: "static/tabbar/home.png",
    selectedIconPath: "static/tabbar/home-active.png"
  },
  {
    pagePath: "pages/service-management/index",
    text: "服务",
    iconPath: "static/tabbar/service.png",
    selectedIconPath: "static/tabbar/service-active.png"
  },
  {
    pagePath: "pages/parent-support/index",
    text: "共育",
    iconPath: "static/tabbar/parent.png",
    selectedIconPath: "static/tabbar/parent-active.png"
  },
  {
    pagePath: "pages/mine/index",
    text: "我的",
    iconPath: "static/tabbar/mine.png",
    selectedIconPath: "static/tabbar/mine-active.png"
  }
];
