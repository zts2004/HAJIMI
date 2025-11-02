# 上传到GitHub的步骤

## 方法1：使用Git命令行（推荐）

### 前提条件
1. 安装Git：https://git-scm.com/download/win
2. 配置Git（首次使用）：
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 上传步骤

1. **打开命令提示符（CMD）或PowerShell**
   在项目文件夹中按 `Shift + 右键` → 选择"在此处打开PowerShell窗口"

2. **初始化Git仓库**
```bash
git init
```

3. **添加所有文件**
```bash
git add .
```

4. **提交文件**
```bash
git commit -m "Initial commit: 52行情话弹窗PWA版本"
```

5. **添加远程仓库**
```bash
git remote add origin https://github.com/zts2004/HAJIMI.git
```

6. **上传到GitHub**
```bash
git branch -M main
git push -u origin main
```

如果提示输入用户名和密码，请使用GitHub的Personal Access Token（不是GitHub密码）。

---

## 方法2：使用GitHub Desktop（最简单）

### 步骤：

1. **下载GitHub Desktop**
   - 访问：https://desktop.github.com/
   - 下载并安装

2. **登录GitHub账号**

3. **添加仓库**
   - File → Add Local Repository
   - 选择项目文件夹（C:\Users\ztsyy\Desktop\52hang）
   - 如果提示不是Git仓库，选择"create a repository"

4. **提交并上传**
   - 在左侧勾选所有文件
   - 填写提交信息："Initial commit: 52行情话弹窗PWA版本"
   - 点击"Commit to main"
   - 点击"Publish repository"（如果是第一次）
   - 或点击"Push origin"（如果已经发布过）

---

## 方法3：直接通过GitHub网页上传（无需Git）

### 步骤：

1. **访问仓库**
   - 打开：https://github.com/zts2004/HAJIMI
   - 如果仓库是空的，会看到上传文件的提示

2. **上传文件**
   - 点击"uploading an existing file"
   - 拖拽或选择以下文件：
     - index.html
     - app.js
     - styles.css
     - manifest.json
     - sw.js
     - README.md
   - 填写提交信息："Initial commit"
   - 点击"Commit changes"

3. **启用GitHub Pages**
   - 进入仓库 Settings
   - 找到 Pages 选项
   - Source 选择 "main" 分支
   - Save 后获得链接：`https://zts2004.github.io/HAJIMI/`

---

## 启用GitHub Pages后

1. **访问链接**：`https://zts2004.github.io/HAJIMI/`

2. **生成短链接**
   - 使用短链接服务（如dwz.cn）将长链接缩短
   - 就可以在微信中分享了！

---

## 注意事项

- 如果仓库是私有的，需要设置为Public才能使用GitHub Pages
- 上传后等待几分钟，GitHub Pages才会生效
- 确保所有文件都在根目录


