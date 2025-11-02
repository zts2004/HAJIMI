// 52行情话弹窗 PWA版本
// Copyright (c) CAFUC张天顺

// 52句精选情话
const quotes = [
    "你是我生命中最美好的意外",
    "想和你一起看日出日落，度过每一个平凡的日子",
    "你的笑容是我最大的动力",
    "我愿意用一生的时间，慢慢喜欢你",
    "你是我心中最亮的那颗星",
    "我想把所有温柔都给你",
    "和你在一起的每一天都是情人节",
    "你是我见过最美的风景",
    "想和你一起慢慢变老",
    "你的存在让我的世界变得完整",
    "我愿意为你做任何事情",
    "你是我最想拥抱的人",
    "想和你分享生活的每一刻",
    "你的温柔让我感到幸福",
    "你是我的阳光，照亮我的每一天",
    "想和你一起看遍世界美景",
    "你是我生命中最珍贵的礼物",
    "我想永远陪在你身边",
    "你的每一句话都让我心动",
    "你是我最想保护的人",
    "想和你一起走过春夏秋冬",
    "你的笑容是我最大的幸福",
    "你是我心中唯一的存在",
    "想和你一起做很多很多事",
    "你的温柔让我无法抗拒",
    "你是我生命中最重要的人",
    "想和你一起创造美好的回忆",
    "你的出现让我相信爱情",
    "你是我最想珍惜的人",
    "想和你一起慢慢变老",
    "你的每一个动作都让我心动",
    "你是我最想守护的人",
    "想和你一起分享生活的点滴",
    "你的存在让我感到完整",
    "你是我生命中最美好的邂逅",
    "想和你一起看遍人间烟火",
    "你的温柔让我沉醉",
    "你是我心中最特别的人",
    "想和你一起走过每一个春夏秋冬",
    "你的笑容是我最大的满足",
    "你是我生命中最珍贵的宝藏",
    "想和你一起慢慢变老",
    "你的每一句话都让我感动",
    "你是我最想陪伴的人",
    "想和你一起经历生活的酸甜苦辣",
    "你的温柔让我感到温暖",
    "你是我心中最美好的存在",
    "想和你一起创造属于我们的故事",
    "你的出现让我的生活变得有意义",
    "你是我最想守护一生的人",
    "想和你一起慢慢变老，直到永远",
    "你是我生命中最美好的奇迹"
];

// 多种背景色
const popupColors = [
    '#fff0f5', '#ffe4e1', '#ffeef7', '#fff8f8',
    '#ffeef6', '#fff0f8', '#ffeef0', '#fff5f5',
    '#ffc0cb', '#ffb6c1', '#ff69b4', '#ff1493',
    '#ff99cc', '#ff66cc', '#ff33cc', '#ff00cc',
    '#ffb3de', '#ffb6d9', '#f0a0a0', '#ffcccb',
    '#ffd6e8', '#ffcce5', '#ffb3ff', '#ff99ff',
    '#f0a0a0', '#ff91a4', '#ff77aa', '#ff6bb5',
    '#ff80b3', '#ff66b3', '#ff4da6', '#ff3399',
    '#e6b3ff', '#dda0dd', '#da70d6', '#dda0dd',
    '#e0b0ff', '#d8bfd8', '#dda0dd', '#da70d6',
    '#ff7f7f', '#ff6b6b', '#ff8c94', '#ff9faa',
    '#ffa8b0', '#ffb3ba', '#ffcccb', '#ffe4e1',
    '#f5e6ff', '#e6ccff', '#ddb3ff', '#cc99ff',
    '#e0b3ff', '#d699ff', '#cc80ff', '#b366ff',
    '#ffdab9', '#ffcc99', '#ffb3b3', '#ffcccc',
    '#ffd6cc', '#ffe0cc', '#ffe6cc', '#fff0e6',
    '#e6f3ff', '#ddeeff', '#ccddff', '#bbccff',
    '#e0e6ff', '#d6ddff', '#ccd4ff', '#c0c8ff',
    '#e6ffe6', '#ccffcc', '#d4ffd4', '#e0ffe0',
    '#f0fff0', '#f5fff5', '#fafffa', '#f8fff8',
    '#fffacd', '#fff8dc', '#fff8e7', '#fffae6',
    '#ffffe0', '#fffff0', '#fffef0', '#fffdf5'
];

// 应用状态
let currentIndex = 0;
let isPlaying = false;
let heartShapeActive = false;
let popups = [];
let bubbleHearts = [];
let autoPlayTimer = null;
let heartShapeTimer = null;

// DOM元素
const currentQuoteEl = document.getElementById('currentQuote');
const autoPlayBtn = document.getElementById('autoPlayBtn');
const heartShapeBtn = document.getElementById('heartShapeBtn');
const popupContainer = document.getElementById('popupContainer');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    currentQuoteEl.textContent = quotes[0];
    setupEventListeners();
    
    // 检查URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    if (action === 'autoplay') {
        setTimeout(() => toggleAutoPlay(), 500);
    } else if (action === 'heart') {
        setTimeout(() => showHeartShapePopups(), 500);
    }
});

// 设置事件监听
function setupEventListeners() {
    autoPlayBtn.addEventListener('click', toggleAutoPlay);
    heartShapeBtn.addEventListener('click', showHeartShapePopups);
    
    // 监听ESC键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });
    
    // 左划手势检测（移动端）
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (touchStartX === 0) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // 检测左划（从右向左滑动超过100px，且垂直移动小于50px）
        if (deltaX < -100 && deltaY < 50) {
            closeAllPopups();
        }
        
        touchStartX = 0;
        touchStartY = 0;
    });
    
    // 摇一摇检测
    let lastShakeTime = 0;
    let lastX = 0, lastY = 0, lastZ = 0;
    
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', (e) => {
            const acceleration = e.accelerationIncludingGravity;
            if (!acceleration) return;
            
            const currentTime = Date.now();
            const timeDifference = currentTime - lastShakeTime;
            
            if (timeDifference > 100) { // 防止频繁触发
                const deltaX = Math.abs(lastX - acceleration.x);
                const deltaY = Math.abs(lastY - acceleration.y);
                const deltaZ = Math.abs(lastZ - acceleration.z);
                
                const shake = deltaX + deltaY + deltaZ;
                
                if (shake > 30) { // 摇动阈值
                    closeAllPopups();
                    lastShakeTime = currentTime;
                }
                
                lastX = acceleration.x;
                lastY = acceleration.y;
                lastZ = acceleration.z;
            }
        });
    }
    
    // 请求设备运动权限（iOS 13+）
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        document.addEventListener('click', () => {
            DeviceMotionEvent.requestPermission().then(response => {
                if (response === 'granted') {
                    console.log('设备运动权限已授予');
                }
            });
        }, { once: true });
    }
}

// 更新显示的情话
function updateQuote() {
    currentQuoteEl.textContent = quotes[currentIndex];
}

// 自动播放切换
function toggleAutoPlay() {
    if (isPlaying) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
}

// 开始自动播放
function startAutoPlay() {
    isPlaying = true;
    autoPlayBtn.textContent = '⏸ 停止播放';
    autoPlayBtn.style.background = 'linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)';
    
    let index = 0;
    function showNext() {
        if (!isPlaying) return;
        
        // 一次显示2-3个弹窗
        const count = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < count && index < quotes.length; i++) {
            const quote = quotes[index];
            createPopup(quote);
            index++;
        }
        
        if (index < quotes.length) {
            autoPlayTimer = setTimeout(showNext, 800);
        } else {
            stopAutoPlay();
        }
    }
    
    showNext();
}

// 停止自动播放
function stopAutoPlay() {
    isPlaying = false;
    autoPlayBtn.textContent = '▶ 自动播放';
    autoPlayBtn.style.background = 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)';
    if (autoPlayTimer) {
        clearTimeout(autoPlayTimer);
        autoPlayTimer = null;
    }
}

// 创建弹窗
function createPopup(quote, x = null, y = null, bgColor = null) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    // 随机颜色
    if (!bgColor) {
        bgColor = popupColors[Math.floor(Math.random() * popupColors.length)];
    }
    
    // 设置背景色CSS变量
    popup.style.setProperty('--popup-bg', bgColor);
    popup.style.setProperty('--popup-bg-light', lightenColor(bgColor, 0.1));
    popup.style.backgroundColor = bgColor;
    
    // 设置位置
    if (x !== null && y !== null) {
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
    } else {
        // 随机位置
        const maxX = window.innerWidth - 400;
        const maxY = window.innerHeight - 150;
        popup.style.left = `${Math.random() * Math.max(100, maxX)}px`;
        popup.style.top = `${Math.random() * Math.max(100, maxY)}px`;
    }
    
    // 关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => {
        closePopup(popup);
    });
    
    // 内容
    const content = document.createElement('div');
    content.className = 'popup-content';
    content.textContent = quote;
    
    // 爱心装饰
    const heart = document.createElement('div');
    heart.className = 'popup-heart';
    heart.textContent = '💕';
    
    popup.appendChild(closeBtn);
    popup.appendChild(content);
    popup.appendChild(heart);
    
    popupContainer.appendChild(popup);
    popups.push(popup);
    
    return popup;
}

// 关闭单个弹窗
function closePopup(popup) {
    popup.style.animation = 'fadeInScale 0.3s ease-out reverse';
    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
        const index = popups.indexOf(popup);
        if (index > -1) {
            popups.splice(index, 1);
        }
    }, 300);
}


// 计算爱心形状坐标点（竖屏优化版本 - 旋转90度让爱心竖起来）
function getHeartShapePoints(centerX, centerY, size = 400, numPoints = 52) {
    const points = [];
    const isMobile = window.innerWidth < 768;
    
    // 竖屏爱心：旋转90度（顺时针或逆时针）
    const baseScale = size / 16; // 基础缩放因子
    const scaleX = baseScale * 1.0; // 旋转后的X方向（原Y方向，缩放）
    const scaleY = baseScale * 0.65; // 旋转后的Y方向（原X方向，缩小）
    
    for (let i = 0; i < numPoints; i++) {
        const t = (2 * Math.PI * i) / numPoints;
        
        // 爱心参数方程
        const heartX = 16 * Math.pow(Math.sin(t), 3);
        const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        // 旋转-90度（顺时针）：(x,y) -> (y, -x)
        // 这样可以让爱心从横向变为竖向
        const rotatedX = heartY;   // 原Y变为新X
        const rotatedY = -heartX;  // 原X变为新Y（取负号）
        
        // 计算实际坐标（相对于中心点）
        const px = centerX + rotatedX * scaleX;
        const py = centerY + rotatedY * scaleY;
        
        points.push({ x: px, y: py });
    }
    
    return points;
}

// 创建冒泡爱心
function createBubbleHeart(x, y) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble-heart';
    bubble.textContent = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '💞'][Math.floor(Math.random() * 8)];
    
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    
    document.body.appendChild(bubble);
    bubbleHearts.push(bubble);
    
    // 动画结束后移除
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
        const index = bubbleHearts.indexOf(bubble);
        if (index > -1) {
            bubbleHearts.splice(index, 1);
        }
    }, 3000);
}

// 检查点是否在爱心内部（竖屏优化版本）
function isPointInHeart(x, y, centerX, centerY, size) {
    // 将屏幕坐标转换为爱心参数坐标（竖屏方向，需要旋转回来判断）
    const baseScale = size / 16;
    const scaleX = baseScale * 1.0; // 旋转后的X方向
    const scaleY = baseScale * 0.65; // 旋转后的Y方向
    
    const relX = (x - centerX) / scaleX;
    const relY = (y - centerY) / scaleY;
    
    // 旋转回原来的坐标系（逆旋转-90度：(y,-x) -> (x,y)）
    // 逆旋转：(rotatedX, rotatedY) -> (rotatedY, -rotatedX)
    const originalX = -relY;  // 逆旋转：新Y取负号变为原X
    const originalY = relX;   // 逆旋转：新X变为原Y
    
    // 使用参数方程判断
    const radius = Math.sqrt(originalX * originalX + originalY * originalY);
    
    // 如果距离中心太远，肯定不在爱心内
    if (radius > 25) return false;
    
    // 计算该点的角度（在原坐标系中）
    const angle = Math.atan2(originalY, originalX);
    const t = angle < 0 ? angle + 2 * Math.PI : angle;
    
    // 计算爱心在该角度下的理论半径
    const heartX = 16 * Math.pow(Math.sin(t), 3);
    const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    const heartRadius = Math.sqrt(heartX * heartX + heartY * heartY);
    
    // 计算实际半径
    const actualRadius = Math.sqrt(originalX * originalX + originalY * originalY);
    
    // 如果实际半径小于等于理论半径，则在爱心内部或边界上
    return actualRadius <= heartRadius * 0.85;
}

// 显示爱心形状文字（填充式）
function showHeartShapePopups() {
    closeAllPopups();
    heartShapeActive = true;
    
    // 隐藏所有界面元素，只显示纯色背景和爱心
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quoteDisplay) {
        quoteDisplay.style.display = 'none';
    }
    
    // 隐藏功能按钮
    const controls = document.querySelector('.controls');
    if (controls) {
        controls.style.display = 'none';
    }
    
    // 隐藏标题
    const header = document.querySelector('header');
    if (header) {
        header.style.display = 'none';
    }
    
    // 隐藏版权信息
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        copyright.style.display = 'none';
    }
    
    // 隐藏整个容器背景（如果有）
    const container = document.querySelector('.container');
    if (container) {
        container.style.background = 'transparent';
    }
    
    // 创建全屏背景遮罩（纯色背景）
    const backgroundMask = document.createElement('div');
    backgroundMask.id = 'heartBackgroundMask';
    backgroundMask.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #ffeef7 0%, #fff0f5 100%);
        z-index: 998;
        pointer-events: none;
    `;
    document.body.appendChild(backgroundMask);
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const isMobile = window.innerWidth < 768;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // 计算适合屏幕的爱心大小（竖屏方向，高度优先）
    // 竖屏爱心：高度更大，宽度较小
    const heartSize = Math.min(screenWidth * 0.65, screenHeight * 0.75, 400);
    
    // 创建爱心文字容器
    const heartContainer = document.createElement('div');
    heartContainer.id = 'heartTextContainer';
    heartContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        pointer-events: none;
        overflow: visible;
    `;
    document.body.appendChild(heartContainer);
    
    // 生成填充爱心的网格点（更密集）
    const gridSize = isMobile ? 18 : 22; // 更密集的网格
    const fontSize = isMobile ? 
        Math.max(9, Math.min(12, screenWidth / 28)) : 
        Math.max(11, Math.min(15, screenWidth / 25));
    
    const heartPoints = [];
    const padding = 10;
    
    // 在爱心区域内生成密集的点（网格扫描）
    for (let y = padding; y < screenHeight - padding; y += gridSize) {
        for (let x = padding; x < screenWidth - padding; x += gridSize) {
            if (isPointInHeart(x, y, centerX, centerY, heartSize)) {
                heartPoints.push({ x, y });
            }
        }
    }
    
    // 补充随机点，确保爱心填充饱满（至少100个点）
    const minPoints = isMobile ? 100 : 120;
    let attempts = 0;
    while (heartPoints.length < minPoints && attempts < 500) {
        attempts++;
        // 在爱心可能出现的区域随机生成点
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * (heartSize / 2.5);
        const x = centerX + Math.cos(angle) * radius * 0.75;
        const y = centerY + Math.sin(angle) * radius * 0.85;
        if (isPointInHeart(x, y, centerX, centerY, heartSize)) {
            // 检查是否与现有点太近
            const tooClose = heartPoints.some(p => 
                Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2)) < gridSize * 0.8
            );
            if (!tooClose) {
                heartPoints.push({ x, y });
            }
        }
    }
    
    // 打乱顺序，让文字随机出现
    heartPoints.sort(() => Math.random() - 0.5);
    
    let index = 0;
    const batchSize = isMobile ? 5 : 8; // 每次显示更多文字
    const delay = isMobile ? 80 : 60; // 更快的显示速度
    
    // 准备文字数组（循环使用52句情话）
    const textArray = [];
    while (textArray.length < heartPoints.length) {
        textArray.push(...quotes);
    }
    
    function showNextBatch() {
        if (!heartShapeActive || index >= heartPoints.length) {
            heartShapeActive = false;
            return;
        }
        
        const endIndex = Math.min(index + batchSize, heartPoints.length);
        
        for (let i = index; i < endIndex; i++) {
            const point = heartPoints[i];
            const textIndex = i % textArray.length;
            const text = textArray[textIndex];
            
            // 显示完整的句子
            const displayText = text;
            
            const textElement = document.createElement('div');
            textElement.className = 'heart-text-item';
            textElement.textContent = displayText;
            
            const colorIndex = textIndex % popupColors.length;
            const textColor = popupColors[colorIndex];
            
            textElement.style.cssText = `
                position: absolute;
                left: ${point.x}px;
                top: ${point.y}px;
                color: ${textColor};
                font-size: ${fontSize}px;
                font-weight: bold;
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                white-space: normal;
                max-width: ${isMobile ? '100px' : '120px'};
                line-height: 1.3;
                pointer-events: none;
                animation: textFadeIn 0.3s ease-out;
                z-index: 1000;
                text-align: center;
            `;
            
            heartContainer.appendChild(textElement);
            
            // 偶尔创建冒泡爱心
            if (Math.random() > 0.9) {
                createBubbleHeart(point.x, point.y);
            }
        }
        
        index = endIndex;
        
        if (heartShapeActive && index < heartPoints.length) {
            heartShapeTimer = setTimeout(showNextBatch, delay);
        }
    }
    
    showNextBatch();
}

// 修改关闭所有弹窗函数，也清除爱心文字
function closeAllPopups() {
    stopAutoPlay();
    heartShapeActive = false;
    
    if (heartShapeTimer) {
        clearTimeout(heartShapeTimer);
        heartShapeTimer = null;
    }
    
    // 关闭所有弹窗
    popups.forEach(popup => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    });
    popups = [];
    
    // 清除爱心文字容器
    const heartContainer = document.getElementById('heartTextContainer');
    if (heartContainer) {
        heartContainer.remove();
    }
    
    // 清除背景遮罩
    const backgroundMask = document.getElementById('heartBackgroundMask');
    if (backgroundMask) {
        backgroundMask.remove();
    }
    
    // 恢复所有界面元素显示
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quoteDisplay) {
        quoteDisplay.style.display = 'flex';
    }
    
    // 恢复功能按钮显示
    const controls = document.querySelector('.controls');
    if (controls) {
        controls.style.display = 'flex';
    }
    
    // 恢复标题显示
    const header = document.querySelector('header');
    if (header) {
        header.style.display = 'block';
    }
    
    // 恢复版权信息显示
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        copyright.style.display = 'block';
    }
    
    // 恢复容器背景
    const container = document.querySelector('.container');
    if (container) {
        container.style.background = '';
    }
    
    // 清除冒泡爱心
    bubbleHearts.forEach(bubble => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
    });
    bubbleHearts = [];
}

// 工具函数：颜色变亮
function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent * 100);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}


