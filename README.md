# 乡小育（uni-app）工程骨架

## 已引入
- UI 框架：`@dcloudio/uni-ui`
- 状态管理：`pinia`
- 语言基线：`TypeScript`

## 当前目录分层
- `pages/`：页面入口（tab 主页面）
- `components/common/`：通用组件（`PageContainer`、`UniPageHead`）
- `api/modules/`：接口模块
- `services/`：领域服务层（编排接口与业务流程）
- `utils/`：工具层（含 `http` 封装）
- `store/modules/`：Pinia 模块
- `composables/`：可复用组合式逻辑
- `constants/`：常量定义
- `types/`：类型定义预留
- `static/`：静态资源（含 tabbar 图标预留）

## 约定
- 业务页面不直接调用 `uni.request`，统一走 `utils/http.ts` + `api/modules/*` + `services/*`
- 组件命名使用 `PascalCase`，页面目录使用 `kebab-case`
- 底部导航固定：`首页 / 服务管理 / 家长支持 / 我的`

## 下一步建议
1. 补充四域 API 接口与 Mock：入户指导、亲子活动、数据记录、教学支持
2. 将页面数据流改为 `services -> store -> page`
3. 对接真实环境 `BASE_URL` 和鉴权头处理

## 如何先看到页面
### 方式一（推荐）：HBuilderX
1. 用 HBuilderX 打开项目根目录
2. 菜单选择：运行 -> 运行到浏览器 -> 选择 Chrome（或 Safari）
3. 或选择：运行 -> 运行到小程序模拟器 -> 微信开发者工具

### 方式二：微信开发者工具（配合 HBuilderX 编译）
1. 在 HBuilderX 执行“运行到微信开发者工具”
2. 首次需在 HBuilderX 配置微信开发者工具路径
3. 编译产物会自动同步到微信开发者工具并可预览
