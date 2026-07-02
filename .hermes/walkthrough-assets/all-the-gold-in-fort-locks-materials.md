# All the Gold in Fort Locks - 攻略素材汇总

> 数据抓取时间: 2026-07-02 16:00+ GMT+8
> 来源: itch.io 评论区、YouTube 通关视频、bontegames、Thinky Puzzle Game Jam 6

---

## 一、游戏基础信息

```yaml
游戏名: All the Gold in Fort Locks
开发者: Draknek & Friends
  - Alan Hazelden: concept + direction
  - Lucas Le Slo: puzzle design + sfx
  - Benjamin Davis: programming
  - Murray Somerwolff: art
来源: Thinky Puzzle Game Jam 6 (June 20-29, 2026)
  - Jam 主题: "locked room"
  - 81个参赛作品
引擎: Godot + PuzzleKit
灵感来源: World Weaver, Patrick's Parabox
标签: Puzzle, Locked Room, 浏览器
平台: 浏览器 (HTML5/WebGL)
itch.io: https://draknek.itch.io/all-the-gold-in-fort-locks
免费: 是
```

### YouTube 通关视频

| 项目 | 内容 |
|------|------|
| 标题 | [PuzzleGame] All the Gold in Fort Locks - Use Keys to Open Otherworld |
| 频道 | Mikan Hako |
| 时长 | 12分34秒 |
| 上传日 | 2026-07-02 |
| 观看数 | 35 (刚上传) |
| 链接 | https://www.youtube.com/watch?v=-BCO_WLSfCI |
| 嵌入 | `<iframe width="560" height="315" src="https://www.youtube.com/embed/-BCO_WLSfCI" frameborder="0" allowfullscreen></iframe>` |

### bontegames 转载

| 项目 | 内容 |
|------|------|
| 链接 | https://www.bontegames.com/2026/07/all-gold-in-fort-locks-browser.html |
| 发布时间 | July 1, 2026 |
| 评论数 | 0 (无攻略内容) |

---

## 二、操作说明

| 按键 | 功能 |
|------|------|
| 方向键/WASD | 移动角色 |
| Z | 撤销上一步 |
| R | 重置到最近存档点 |

**注意**: 有 checkpoint 自动存档，但不跨 session 保存（刷新页面=从头开始）

---

## 三、核心机制

本游戏的核心创意是 **"门 = 传送门"**：

1. **钥匙 + 门 = 新房间**: 每种颜色的钥匙可以打开对应颜色的门，门后通向一个新的房间
2. **房间叠放**: 多个房间可以在同一个屏幕上叠加/嵌套，打开门时其他房间出现在对应方向
3. **钥匙可以推**: 走到钥匙旁边可以推动它（推箱子）
4. **Checkpoint**: 获得新钥匙或到达特定位置时自动存档。按 R 重置到上一个存档点
5. **通关目标**: 收集所有金币（Gold），可能需要多把钥匙配合

### 钥匙颜色（从评论区确认，非推测顺序）

评论区明确提到的钥匙（非获得顺序）：

| 颜色 | 来源 | 备注 |
|------|------|------|
| 橙色 Orange | 玩家卡关高频点 | "can't find orange key" |
| 紫色 Purple | 开发者+玩家多次提及 | 有门有房间，关键解谜 |
| 红色 Red | 开发者+玩家多次提及 | 复杂走位，需紫色配合 |
| 绿色 Green | 玩家多次提及 | 有绿房间，需"困住"绿钥匙 |
| 黄色 Yellow | 开发者在提示中提及 | "yellow key in the red room" |
| 蓝色 Blue | Bug 报告提及1次 | 蓝钥匙被推出房间 |

> ⚠️ 以上只是确认存在的钥匙，**具体获取流程请对照 `frame-browser.html` 里的1080p高清帧 + 下方卡关热点**

---

## 四、评论区卡关热点（全部来自真实对话）

> 以下全部来自 itch.io 评论区，非构造

### 🔥 卡关1: 橙色钥匙回不来

**玩家卡关描述**: "I can't find a way to get the orange key back and got stuck here"

**解决方案**: 
- 拿到橙色钥匙后，**不需要把它带回去**
- 注意观察——附近没有橙色门
- 继续探索当前可到达的区域，目标是把钥匙带到正确位置
- **开发者提示**: "You're pretty close to the end here! You don't need to rescue the orange key."

### 🔥🔥 卡关2: 橙+绿钥匙拿到后不知道下一步

**玩家卡关描述**: 
> "Got this far and I'm stuck again. I could get the orange and green keys out but I couldn't figure out what to do next."

**解决方案 (来自开发者/社区)**:
> **HINT**: After you get the orange and green keys out, try and think about how to get the **yellow key in the red room**! Maybe with the help of one of the keys you just 'rescued'...

**玩家反馈**: "Thank you! This got me past it and I managed to find the way to the end. I have to say the yellow key was super interesting to figure out"

### 🔥🔥🔥 卡关3: 红/紫钥匙走位

**玩家卡关描述**:
> "Very fun game! I have been stuck here at this checkpoint for over a day though. I've put the purple, orange, and red keys into every single door they can reach and nothing new has opened up."

**开发者给出的详细步骤**:
1. **插入紫色钥匙从下方** → 推动红色钥匙前进
2. **绕到另一边** → 把红色钥匙推回来
3. 此时应该形成：紫色钥匙 + 红色钥匙在特定位置
4. **先拔出紫色钥匙**，然后拔出红色钥匙

**开发者原话**:
> "You need to insert the purple key from below, push the red one forward, then, when possible, go around it and push it back. After that, first pull out the purple key, and then the red one."

### 卡关4: 绿色房间 + 绿钥匙

**玩家卡关描述**:
> "I'm unsure whether what I did with the green room was what I was supposed to be doing, trapping the green key inside the green room's east chamber."

**开发者确认**: "You did indeed have to put the green key there earlier."

### 通关

- 有玩家反馈："Finished! ... it all started to click after unlocking the purple door."
- 通关后按 R 会回到通关画面（不是 bug，故意设计）
- 一般通关时间约 1 小时

---

## 五、常见卡关错误

### 1. Bad Checkpoint —— 需要重开
**现象**: 存档在不佳位置，走不出来
**解决方案**: 按 R 重置，如果不行就刷新页面从头开始
**开发者确认**: "Ah yeah, this looks like a bad checkpoint. Sorry!"

### 2. 通关后按R
**现象**: "After finishing the game, pressing R gets you here"
**原因**: 不是 bug，通关后R键导向通关画面

### 3. 忘记有 Undo
**提示**: Z 键可以撤销，不要忘了用！

---

## 六、已知 Bug

### Bug 1: 钥匙穿透门
**报告者**: MikanHako
**描述**: 如果钥匙放在锁住的门上，可以把钥匙推过门，玩家和钥匙都能穿过锁住的门
**影响**: 可能破坏解谜逻辑

### Bug 2: 蓝钥匙脱出
**报告者**: 社区玩家
**描述**: 可以把蓝色钥匙推出它的房间，导致游戏轻微卡顿
**开发者回应**: "That doesn't look intended! If you can provide a screenshot or video of how you did it that'd be appreciated."

---

## 七、玩家口碑摘录

> "Puzzle design... Lucas, you are absolutely evil, and I mean that in the best possible way. This game is hurting my head, and I love it."

> "I don't think I've ever been this intensely invested in a game before. This was an amazing experience (with lots of frustration involved too hahaha) and it was so satisfying to finish!"

> "This is such a cool game! I'm already imagining some cursed mechanics..."

> "Crazy fun idea, lags badly for me tho (still playable but it sometimes double inputs)"

> "I cannot tell if this is borked or not. This game is a brain destroyer"

> "great game so far. I'm loving the mechanics and the animations/SFX"

---

## 八、SEO 关键词池

### 主词
- All the Gold in Fort Locks walkthrough
- All the Gold in Fort Locks puzzle solutions
- All the Gold in Fort Locks guide
- how to beat All the Gold in Fort Locks

### 长尾词（从评论中提取的真实搜索意图）
- All the Gold in Fort Locks orange key stuck
- All the Gold in Fort Locks red key puzzle
- All the Gold in Fort Locks yellow key solution
- All the Gold in Fort Locks purple door walkthrough
- All the Gold in Fort Locks bad checkpoint fix
- All the Gold in Fort Locks controls
- All the Gold in Fort Locks bug
- All the Gold in Fort Locks key through door
- All the Gold in Fort Locks how many levels
- All the Gold in Fort Locks Draknek

### 竞品词（bontegames 已经覆盖但无攻略）
- All the Gold in Fort Locks browser game
- All the Gold in Fort Locks free puzzle game
- all the gold in fort locks bontegames

---

## 九、zowgame 页面结构建议

```
URL: /games/all-the-gold-in-fort-locks/

H1: All the Gold in Fort Locks – Full Walkthrough & Puzzle Guide

> 游戏嵌入 iframe: https://itch.io/embed/4721907
> YouTube 通关视频嵌入

H2: How to Play
- 核心机制图解说明（用文字描述 + 可配 itch.io 截图）
- Controls 表格
- 存档说明

H2: Walkthrough – Step by Step
- Stage 1-7 分步骤

H2: Stuck? Common Solutions
- 5个卡关热点

H2: Tips & Tricks
- 善用Z撤销
- 没事推推看
- 门=传送门的思维方式

H2: Known Bugs
- 2个已知Bug

H2: About the Game
- 开发者信息
- Thinky Puzzle Game Jam 6 背景
- 相关游戏推荐（World Weaver, Patrick's Parabox）
```

---

## 十、图片素材来源

建议截图方式：
1. 打开 https://draknek.itch.io/all-the-gold-in-fort-locks → 点 "Run heist"
2. 或直接看 YouTube 视频 https://www.youtube.com/watch?v=-BCO_WLSfCI 截图
3. itch.io 页面本身有游戏截图（在 "More information" 区域）
