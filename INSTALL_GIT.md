# Git安装指南

## 快速安装Git

### 方法1：官网下载（推荐）

1. **访问Git官网**
   - 下载地址：https://git-scm.com/download/win
   - 会自动检测你的系统并下载对应版本

2. **安装步骤**
   - 双击下载的安装程序
   - 全部使用默认设置，一路点击"Next"
   - 安装完成后，重启命令行窗口

3. **验证安装**
   - 打开新的PowerShell或CMD
   - 输入命令：`git --version`
   - 如果显示版本号（如 `git version 2.xx.x`），说明安装成功

### 方法2：使用包管理器（如果已安装）

如果你已经安装了Chocolatey或Scoop：

**Chocolatey:**
```powershell
choco install git -y
```

**Scoop:**
```powershell
scoop install git
```

## 配置Git（首次使用）

安装完成后，需要配置用户名和邮箱：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

例如：
```bash
git config --global user.name "zts2004"
git config --global user.email "your-email@example.com"
```

## 安装完成后

运行以下命令验证：
```bash
git --version
git config --global --list
```

然后就可以使用git上传代码了！


