# Cobb / Fort Locks / Defenders official-source audit

检查日：2026-11-01。核查结果与原始发布时间分开记录；没有把本次读取时间当成游戏更新日期。英文站内文案已同步，未新增路由或改动设计体系。

## Cobb Can Move

- 实读 [官方 itch.io 游戏页](https://abho.itch.io/cobb-can-move)、[开发日志目录](https://abho.itch.io/cobb-can-move/devlog)及 [v1.7 公告](https://abho.itch.io/cobb-can-move/devlog/1527864/v17)。公开目录最新仍是 **2026-05-19 的 v1.7**；现有补丁记录保留原版本和日期，没有编造 11 月补丁。
- 官方仍列 HTML5、Windows、键盘及手柄。Windows 文件为 `COBB CAN MOVE v1.7 webview2.zip`（15 MB），name-your-own-price。官网会话长度仅列为 `A few minutes`，不支持站内原有的精确 18 分钟均值。
- 当前官方平台评分读数为 **4.7/5、853 个评分**。站内改为带检查日的快照；移除没有原始出处的 Player One 等五星引语。没有把评分写入 AggregateRating。
- Steam FAQ 改为只说明已确认的 itch.io 分发渠道；没有把“本站未确认 Steam 版本”写成“确定不存在 Steam 版本”。

## All The Gold In Fort Locks

- 实读 [作者官方游戏页](https://draknek.itch.io/all-the-gold-in-fort-locks)。HTML5、WASD/方向键、Z 撤回、R 回检查点、跨会话不存进度仍有官方依据。
- `/devlog` 本次返回 itch.io 的 `We couldn't find your page` 内容。主页没有可确认的新编号版本；这不证明上传文件或关卡从未静默变化。
- 官方当前评分读数为 **4.5/5、46 个评分**，已替换旧快照；未经原始评分支持的评论卡已撤下。会话长度用 `Varies`，不再保留未经支持的一小时均值。
- [官方 jam 页面](https://itch.io/jam/thinky-puzzle-game-jam-6)列活动期为 2026-06-19 至 2026-06-28、81 个作品、Locked Room 主题；这是活动日期，不能当成精确的游戏发布日期。
- 作者评论可支持特定橙钥匙提示及坏检查点的存在，不能把整套视频/截图解法统称为开发者认证。数据中的笼统认证和 `time: now` 已清理；共享 walkthrough 路由由主代理同步处理。

## Defenders of Hogwarts

- [MinaLima 当前游戏页](https://minalima.com/defenders-of-hogwarts/)明确列出 House of MinaLima 线上及门店零售；[官方商品页](https://minalima.com/product/board-game-defenders-of-hogwarts)本次显示 **£75** 和加入购物车入口。没有下单或验证任一国家的最终配送、税费或库存承诺。
- 商品页仍列 2–5 人、13+、约 90 分钟。当前零售可用性不能推导既有 Kickstarter 订单已发货。
- [官方 rules 资源页](https://www.minalima.com/defenders-of-hogwarts/rules)显示翻译 `coming soon`，未给日期；[出版方玩法 FAQ](https://minalima.com/defenders-of-hogwarts/faqs/)已实读并加入来源列表，页面没有可核实的发布日期，不能称为“11 月新规则”。
- [原 English rulebook PDF](https://media.minalima.com/2026/06/Defenders_of_Hogwarts_-_A_board_game_by_MinaLima_-_Rulebook.pdf)仍可读取。本次是资源可用性和重点核对，不是逐条重审全部攻略，也没有建立新的规则书版号。
- 历史 [Kickstarter FAQ](https://www.kickstarter.com/projects/minalima/defenders-of-hogwarts/faqs)仍列旧发货估计。站内详细规则和众筹政策快照的 review date 保留 **2026-10-12**；零售及规则资源读取单列 **2026-11-01**。
- [KS 更新索引](https://www.kickstarter.com/projects/minalima/defenders-of-hogwarts/posts)本次列 24 条更新，项目最近更新时间指向 **2026-10-29 / post 4843850**。但该帖经 web 读取失败，Firecrawl 仅返回页面壳；[post 4839191](https://www.kickstarter.com/projects/minalima/defenders-of-hogwarts/posts/4839191)的正文也未取得。**没有据此发布标题、履约进度或规则变动摘要**。

## 同步范围与边界

- `src/app/data/defenders-of-hogwarts.ts`：零售入口、价格读数、购买/发货/语言 FAQ、来源和分开的 review/observation 日期。
- `src/app/components/tabletop-game-page.tsx`：购买区、支持分流、来源及日期展示；保留所有既有规则章节和锚点。
- `src/app/data/games.ts`：仅 Cobb 的来源复核说明、下载/Steam FAQ、评分快照、定性会话长度、旧补丁 source URL；其他游戏注册不变。
- `src/app/data/all-the-gold-in-fort-locks.ts`：来源快照、评分、定性会话长度、去除统一开发者认证及未验证的本地/官方构建相同保证。
- atlas、中央 TD、更新目录及共享展示/路由由主代理统一协调。本子任务未构建、未请求本地 3000、未提交或推送。

原始 Firecrawl 缓存在已忽略的 `.firecrawl/` 中。成功读取包括 Cobb 官方页、KS post 的页面壳和 Fort devlog 的不存在页面；后两者不是公告正文获取成功。
