// 游戏状态
let gameState = {
    selectedItem: null, // 'luobo' 或 'zhijin'
    attempts: 0,
    maxAttempts: 0, // 最大尝试次数（1-3随机）
    isPlaying: false,
    stayTimeout: null // 停留超时定时器
};

// DOM 元素
const luoboBtn = document.getElementById('luoboBtn');
const zhijinBtn = document.getElementById('zhijinBtn');
const catImage = document.getElementById('catImage');
const items = document.querySelectorAll('.item');
const successMessage = document.getElementById('successMessage');
const luoboAudio = document.getElementById('luoboAudio');
const zhijinAudio = document.getElementById('zhijinAudio');
const successAudio = document.getElementById('successAudio');

// 初始化游戏
function initGame() {
    // 清除超时定时器
    if (gameState.stayTimeout) {
        clearTimeout(gameState.stayTimeout);
        gameState.stayTimeout = null;
    }
    
    // 重置所有状态
    gameState.selectedItem = null;
    gameState.attempts = 0;
    gameState.isPlaying = false;
    
    // 重置UI
    items.forEach(item => {
        item.classList.remove('selected', 'wrong', 'stay');
    });
    successMessage.classList.add('hidden');
    catImage.classList.remove('thinking', 'face-left', 'face-right');
    catImage.style.transform = '';
    
    // 启用按钮
    luoboBtn.disabled = false;
    zhijinBtn.disabled = false;
    
}

// 选择物品
function selectItem(itemType) {
    if (gameState.isPlaying) return;
    
    gameState.selectedItem = itemType;
    gameState.isPlaying = true;
    gameState.attempts = 0;
    // 随机生成1-3次尝试
    gameState.maxAttempts = Math.floor(Math.random() * 3) + 1;
    
    console.log(`选择了: ${itemType}, 最多尝试 ${gameState.maxAttempts} 次`);
    
    // 禁用按钮
    luoboBtn.disabled = true;
    zhijinBtn.disabled = true;
    
    // 播放对应音频
    if (itemType === 'luobo') {
        luoboAudio.play().catch(e => console.log('音频播放失败:', e));
    } else {
        zhijinAudio.play().catch(e => console.log('音频播放失败:', e));
    }
    
    // 延迟后开始选择（小猫会在选择时再朝向物品）
    setTimeout(() => {
        catSelectItem();
    }, 1000);
}

// 小猫选择物品
function catSelectItem() {
    gameState.attempts++;
    
    // 随机决定选对还是选错（但最后一次必须选对）
    const isLastAttempt = gameState.attempts === gameState.maxAttempts;
    const shouldSelectCorrect = isLastAttempt || Math.random() < 0.2; // 20%概率选对，最后一次必须选对
    
    let selectedItem;
    if (shouldSelectCorrect) {
        // 选对
        selectedItem = Array.from(items).find(item => 
            item.dataset.item === gameState.selectedItem
        );
    } else {
        // 选错
        const wrongItems = Array.from(items).filter(item => 
            item.dataset.item !== gameState.selectedItem
        );
        selectedItem = wrongItems[Math.floor(Math.random() * wrongItems.length)];
    }
    
    if (!selectedItem) return;
    
    // 小猫朝向选择的物品
    orientCatToItem(selectedItem.dataset.item);
    
    // 显示小猫用爪子点击的动画
    showPawAnimation(selectedItem);
    
    // 延迟后显示结果
    setTimeout(() => {
        if (shouldSelectCorrect) {
            // 选对了
            selectedItem.classList.add('selected');
            setTimeout(() => {
                showSuccess();
            }, 500);
        } else {
            // 选错了，显示错误并停留
            selectedItem.classList.add('wrong', 'stay');
            
            // 再次播放用户选择的物品音频
            if (gameState.selectedItem === 'luobo') {
                luoboAudio.play().catch(e => console.log('音频播放失败:', e));
            } else {
                zhijinAudio.play().catch(e => console.log('音频播放失败:', e));
            }
            
            // 如果2秒后自动继续选择
            if (gameState.stayTimeout) {
                clearTimeout(gameState.stayTimeout);
            }
            gameState.stayTimeout = setTimeout(() => {
                if (gameState.isPlaying) {
                    selectedItem.classList.remove('stay');
                    // 继续选择
                    setTimeout(() => {
                        catSelectItem();
                    }, 300);
                }
            }, 2000);
        }
    }, 300);
}

// 小猫朝向物品方向
function orientCatToItem(itemType) {
    // 移除之前的朝向
    catImage.classList.remove('face-left', 'face-right');
    
    // 根据物品位置决定朝向
    const item = Array.from(items).find(item => item.dataset.item === itemType);
    if (item) {
        const itemRect = item.getBoundingClientRect();
        const catRect = catImage.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const catCenterX = catRect.left + catRect.width / 2;
        
        if (itemCenterX < catCenterX) {
            // 物品在左边，小猫朝左
            catImage.classList.add('face-left');
        } else {
            // 物品在右边，小猫朝右
            catImage.classList.add('face-right');
        }
    }
}

// 显示爪子动画
function showPawAnimation(item) {
    const rect = item.getBoundingClientRect();
    const catRect = catImage.getBoundingClientRect();
    
    // 判断是左边还是右边的爪子
    const itemCenterX = rect.left + rect.width / 2;
    const catCenterX = catRect.left + catRect.width / 2;
    
    const pawLeft = document.querySelector('.paw-left');
    const pawRight = document.querySelector('.paw-right');
    
    // 重置位置
    pawLeft.style.opacity = '0';
    pawRight.style.opacity = '0';
    
    // 根据物品位置显示对应的爪子
    if (itemCenterX < catCenterX) {
        // 左边的物品，用左爪
        pawLeft.style.left = `${itemCenterX - catRect.left - 20}px`;
        pawLeft.style.top = `${rect.top - catRect.top + rect.height / 2}px`;
        pawLeft.classList.add('active');
        setTimeout(() => {
            pawLeft.classList.remove('active');
        }, 500);
    } else {
        // 右边的物品，用右爪
        pawRight.style.right = `${catRect.right - itemCenterX - 20}px`;
        pawRight.style.top = `${rect.top - catRect.top + rect.height / 2}px`;
        pawRight.classList.add('active');
        setTimeout(() => {
            pawRight.classList.remove('active');
        }, 500);
    }
}


// 显示成功消息
function showSuccess() {
    // 移除所有朝向类，恢复默认
    catImage.classList.remove('thinking', 'face-left', 'face-right');
    successMessage.classList.remove('hidden');
    
    // 播放成功音效
    successAudio.play().catch(e => console.log('成功音效播放失败:', e));
    
    // 1.5秒后重置游戏
    setTimeout(() => {
        initGame();
    }, 1000);
}

// 事件监听
luoboBtn.addEventListener('click', () => selectItem('luobo'));
zhijinBtn.addEventListener('click', () => selectItem('zhijin'));

// 初始化
initGame();

