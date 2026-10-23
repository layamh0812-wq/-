# 🛡️ 网安学院 — 从 0 到精通

一个**纯前端静态**的网络安全 + Python 学习应用：图文课程、视频教程、本地实战靶场、测验闯关、进度追踪。零后端、零依赖，**可直接部署到 GitHub Pages**。

## ✨ 功能

| 模块 | 说明 |
|---|---|
| 🛡️ 网络安全课 | 6 章 20+ 节：认知与法律 → 信息收集 → Web 十大漏洞 → 密码学 → 应急响应 → CTF 入门 |
| 🐍 Python 课 | 6 章 20+ 节：零基础语法 → 数据结构 → 函数模块 → 面向对象 → 安全工具开发 → 实战项目 |
| 🎬 视频教程 | 应用内直接播放/检索 B 站精选课程，可在 `data.js` 中替换为任意视频 |
| 🧪 实战靶场 | 密码强度检测、CTF 编解码工具箱、SQL 注入模拟、XSS 沙箱、端口扫描模拟、CTF 三关挑战（全部本地模拟，无真实攻击） |
| 📝 测验中心 | 15 题题库、自动判分、历史成绩记录 |
| 🗺️ 学习路线 | 12 周从 0 到精通的编排计划 |
| 📔 我的笔记 | 本地笔记，自动保存 |
| ✅ 进度追踪 | 每节课可打卡，总进度实时显示，数据存在浏览器 localStorage |

## 🚀 部署到 GitHub Pages（3 步）

1. 在 GitHub 新建一个仓库（如 `cyber-academy`），把本目录所有文件上传：
   ```bash
   git init
   git add .
   git commit -m "init: 网安学院"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/cyber-academy.git
   git push -u origin main
   ```
2. 仓库页面 → **Settings → Pages** → Source 选择 `main` 分支 / `(root)` → Save。
3. 等 1~2 分钟，访问 `https://<你的用户名>.github.io/cyber-academy/` 即可。

> 手机上也可直接用浏览器打开，界面已做响应式适配。

## 🔧 自定义

- **加课程**：编辑 `data.js`，往 `COURSES` 里加 chapter/lesson（lesson.content 支持简单 HTML）。
- **换视频**：编辑 `data.js` 里的 `VIDEOS`，把搜索关键词换成你的课程名，或自行嵌入 bilibili/YouTube iframe。
- **加题目**：往 `QUIZZES` 数组里追加即可。
- **加靶场实验**：在 `labs.js` 中按现有模式扩展 `LAB_RENDER`。

## ⚖️ 免责声明

本应用所有攻防内容均为**本地模拟**，仅用于学习防御知识。对未授权系统实施测试属违法行为，请遵守《网络安全法》等法律法规，仅在授权与官方靶场环境中练习。

## 📁 目录结构

```
├── index.html   # 页面骨架
├── styles.css   # 深色主题样式
├── data.js      # 课程数据 / 视频数据 / 题库
├── labs.js      # 六大实战靶场实验
└── app.js       # 路由、进度、测验等应用逻辑
```
