"""
52行情话弹窗程序
Copyright (c) CAFUC张天顺
All rights reserved.

本程序版权归CAFUC张天顺所有，未经授权禁止修改和分发。
"""

import tkinter as tk
from tkinter import ttk
import random
import time
import threading
import math

# 版权信息（嵌入到代码中，防止被修改）
_COPYRIGHT = "CAFUC张天顺"
_COPYRIGHT_OWNER = "张天顺"
_COPYRIGHT_ORG = "CAFUC"

class LoveQuotesPopup:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title(f"💕 52行情话 💕 - © {_COPYRIGHT}")
        self.root.geometry("500x400")
        self.root.configure(bg='#ffeef7')
        
        # 52句精选情话
        self.quotes = [
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
        ]
        
        self.current_index = 0
        self.is_playing = False
        self.popup_windows = []
        self.bubble_hearts = []  # 存储冒泡爱心
        self.heart_shape_active = False  # 标志：是否正在显示爱心形状
        
        # 版权信息（CAFUC张天顺）
        self.copyright_info = _COPYRIGHT
        self.copyright_owner = _COPYRIGHT_OWNER
        self.copyright_org = _COPYRIGHT_ORG
        
        # 多种背景色选择（更多颜色）
        self.popup_colors = [
            # 淡粉色系
            '#fff0f5', '#ffe4e1', '#ffeef7', '#fff8f8',
            '#ffeef6', '#fff0f8', '#ffeef0', '#fff5f5',
            # 粉色系
            '#ffc0cb', '#ffb6c1', '#ff69b4', '#ff1493',
            '#ff99cc', '#ff66cc', '#ff33cc', '#ff00cc',
            # 淡紫粉色系
            '#ffb3de', '#ffb6d9', '#f0a0a0', '#ffcccb',
            '#ffd6e8', '#ffcce5', '#ffb3ff', '#ff99ff',
            # 玫瑰色系
            '#f0a0a0', '#ff91a4', '#ff77aa', '#ff6bb5',
            '#ff80b3', '#ff66b3', '#ff4da6', '#ff3399',
            # 紫色系
            '#e6b3ff', '#dda0dd', '#da70d6', '#dda0dd',
            '#e0b0ff', '#d8bfd8', '#dda0dd', '#da70d6',
            # 珊瑚色系
            '#ff7f7f', '#ff6b6b', '#ff8c94', '#ff9faa',
            '#ffa8b0', '#ffb3ba', '#ffcccb', '#ffe4e1',
            # 淡紫色系
            '#f5e6ff', '#e6ccff', '#ddb3ff', '#cc99ff',
            '#e0b3ff', '#d699ff', '#cc80ff', '#b366ff',
            # 桃色系
            '#ffdab9', '#ffcc99', '#ffb3b3', '#ffcccc',
            '#ffd6cc', '#ffe0cc', '#ffe6cc', '#fff0e6',
            # 淡蓝色系（柔和的）
            '#e6f3ff', '#ddeeff', '#ccddff', '#bbccff',
            '#e0e6ff', '#d6ddff', '#ccd4ff', '#c0c8ff',
            # 淡绿色系（柔和的）
            '#e6ffe6', '#ccffcc', '#d4ffd4', '#e0ffe0',
            '#f0fff0', '#f5fff5', '#fafffa', '#f8fff8',
            # 黄色系（柔和的）
            '#fffacd', '#fff8dc', '#fff8e7', '#fffae6',
            '#ffffe0', '#fffff0', '#fffef0', '#fffdf5'
        ]
        
        self.setup_ui()
        
    def setup_ui(self):
        # 标题
        title_label = tk.Label(
            self.root,
            text="💕 52行情话 💕",
            font=("微软雅黑", 24, "bold"),
            bg='#ffeef7',
            fg='#ff69b4'
        )
        title_label.pack(pady=20)
        
        # 显示当前情话的标签
        self.quote_label = tk.Label(
            self.root,
            text=self.quotes[0],
            font=("微软雅黑", 14),
            bg='#ffeef7',
            fg='#333333',
            wraplength=450,
            justify='center',
            pady=20
        )
        self.quote_label.pack(pady=30)
        
        # 控制按钮框架
        button_frame = tk.Frame(self.root, bg='#ffeef7')
        button_frame.pack(pady=20)
        
        # 上一句按钮
        prev_btn = tk.Button(
            button_frame,
            text="⬅ 上一句",
            command=self.prev_quote,
            font=("微软雅黑", 12),
            bg='#ffb6c1',
            fg='white',
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        prev_btn.pack(side=tk.LEFT, padx=10)
        
        # 下一句按钮
        next_btn = tk.Button(
            button_frame,
            text="下一句 ➡",
            command=self.next_quote,
            font=("微软雅黑", 12),
            bg='#ff69b4',
            fg='white',
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        next_btn.pack(side=tk.LEFT, padx=10)
        
        # 弹窗按钮框架
        popup_frame = tk.Frame(self.root, bg='#ffeef7')
        popup_frame.pack(pady=20)
        
        # 单次弹窗按钮
        single_popup_btn = tk.Button(
            popup_frame,
            text="💌 弹窗一句",
            command=self.show_single_popup,
            font=("微软雅黑", 12),
            bg='#ff1493',
            fg='white',
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        single_popup_btn.pack(side=tk.LEFT, padx=10)
        
        # 自动播放按钮
        self.auto_btn = tk.Button(
            popup_frame,
            text="▶ 自动播放",
            command=self.toggle_auto_play,
            font=("微软雅黑", 12),
            bg='#ff69b4',
            fg='white',
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        self.auto_btn.pack(side=tk.LEFT, padx=10)
        
        # 随机弹窗按钮
        random_popup_btn = tk.Button(
            popup_frame,
            text="🎲 随机弹窗",
            command=self.show_random_popup,
            font=("微软雅黑", 12),
            bg='#ff69b4',
            fg='white',
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        random_popup_btn.pack(side=tk.LEFT, padx=10)
        
        # 爱心形状弹窗按钮
        heart_shape_btn = tk.Button(
            popup_frame,
            text="💖 爱心形状",
            command=self.show_heart_shape_popups,
            font=("微软雅黑", 12),
            bg='#ff1493',
            fg='white',
            padx=20,
            pady=10,
            relief='flat',
            cursor='hand2'
        )
        heart_shape_btn.pack(side=tk.LEFT, padx=10)
        
        # 进度显示
        self.progress_label = tk.Label(
            self.root,
            text=f"{self.current_index + 1} / {len(self.quotes)}",
            font=("微软雅黑", 12),
            bg='#ffeef7',
            fg='#666666'
        )
        self.progress_label.pack(pady=10)
        
        # 版权信息标签
        copyright_label = tk.Label(
            self.root,
            text=f"© {self.copyright_info} | 版权所有",
            font=("微软雅黑", 9),
            bg='#ffeef7',
            fg='#999999'
        )
        copyright_label.pack(pady=5)
        
        # 绑定键盘事件
        self.root.bind('<Left>', lambda e: self.prev_quote())
        self.root.bind('<Right>', lambda e: self.next_quote())
        self.root.bind('<Return>', lambda e: self.show_single_popup())
        self.root.bind('<space>', lambda e: self.toggle_auto_play())
        # 使用bind_all确保所有窗口都能响应ESC键
        self.root.bind_all('<Escape>', self.handle_escape)
        self.root.focus_set()  # 确保窗口可以接收键盘事件
        
    def handle_escape(self, event):
        """处理ESC键"""
        # 总是关闭所有弹窗并停止动画
        self.close_all_popups()
    
    def update_quote(self):
        """更新显示的情话"""
        self.quote_label.config(text=self.quotes[self.current_index])
        self.progress_label.config(text=f"{self.current_index + 1} / {len(self.quotes)}")
        
    def prev_quote(self):
        """上一句"""
        self.current_index = (self.current_index - 1) % len(self.quotes)
        self.update_quote()
        
    def next_quote(self):
        """下一句"""
        self.current_index = (self.current_index + 1) % len(self.quotes)
        self.update_quote()
        
    def show_single_popup(self):
        """显示单次弹窗"""
        self.create_popup(self.quotes[self.current_index])
        
    def show_random_popup(self):
        """显示随机弹窗（一次显示多个）"""
        # 一次显示3-5个随机弹窗
        for _ in range(random.randint(3, 5)):
            random_quote = random.choice(self.quotes)
            self.create_popup(random_quote)
        
    def create_popup(self, quote, x=None, y=None, bg_color=None, auto_close=True):
        """创建弹窗"""
        popup = tk.Toplevel(self.root)
        popup.title("💕")
        popup.geometry("400x100")
        
        # 确保颜色值有效
        try:
            if bg_color and isinstance(bg_color, str) and bg_color.strip():
                final_bg_color = bg_color.strip()
                # 验证颜色是否在有效列表中
                if final_bg_color not in self.popup_colors:
                    final_bg_color = random.choice(self.popup_colors)
            else:
                final_bg_color = random.choice(self.popup_colors)
        except:
            final_bg_color = random.choice(self.popup_colors)
        
        try:
            popup.configure(bg=final_bg_color)
        except tk.TclError:
            # 如果颜色仍然无效，使用默认颜色
            final_bg_color = '#fff0f5'
            popup.configure(bg=final_bg_color)
        
        # 设置弹窗位置
        if x is not None and y is not None:
            popup.geometry(f"400x100+{int(x)}+{int(y)}")
        else:
            # 随机位置
            x = random.randint(100, 1200)
            y = random.randint(100, 700)
            popup.geometry(f"400x100+{x}+{y}")
        
        # 关闭按钮
        close_btn = tk.Button(
            popup,
            text="❌",
            command=popup.destroy,
            font=("微软雅黑", 8),
            bg='#ff69b4',
            fg='white',
            relief='flat',
            width=2,
            height=1
        )
        close_btn.place(x=370, y=5)
        
        # 情话标签
        quote_label = tk.Label(
            popup,
            text=quote,
            font=("微软雅黑", 12),
            bg=final_bg_color,
            fg='#ff1493',
            wraplength=370,
            justify='center',
            pady=10
        )
        quote_label.pack(expand=True)
        
        # 爱心装饰
        heart_label = tk.Label(
            popup,
            text="💕",
            font=("微软雅黑", 16),
            bg=final_bg_color,
            fg='#ff69b4'
        )
        heart_label.pack()
        
        # 添加动画效果（快速淡入）
        popup.attributes('-alpha', 0.0)
        popup.update()
        
        def fade_in():
            for i in range(15):
                # 检查窗口是否仍然存在
                try:
                    if not popup.winfo_exists():
                        break
                    alpha = i / 15.0
                    popup.attributes('-alpha', alpha)
                    popup.update()
                    time.sleep(0.01)  # 更快的速度
                except tk.TclError:
                    # 窗口已被销毁，停止动画
                    break
        
        threading.Thread(target=fade_in, daemon=True).start()
        
        popup.focus_set()  # 让弹窗可以接收键盘事件
        
        # 根据参数决定是否自动关闭
        if auto_close:
            popup.after(5000, lambda: self.fade_out_popup(popup))
        
        self.popup_windows.append(popup)
        return popup
        
    def fade_out_popup(self, popup):
        """淡出弹窗"""
        if popup.winfo_exists():
            def fade_out():
                for i in range(15, 0, -1):
                    # 检查窗口是否仍然存在
                    try:
                        if not popup.winfo_exists():
                            break
                        alpha = i / 15.0
                        popup.attributes('-alpha', alpha)
                        popup.update()
                        time.sleep(0.01)  # 更快的速度
                    except tk.TclError:
                        # 窗口已被销毁，停止动画
                        break
                # 安全地销毁窗口
                try:
                    if popup.winfo_exists():
                        popup.destroy()
                except tk.TclError:
                    pass
            
            threading.Thread(target=fade_out, daemon=True).start()
    
    def get_heart_shape_points(self, center_x, center_y, size=600, num_points=52):
        """计算爱心形状的坐标点"""
        points = []
        for i in range(num_points):
            # 使用参数t从0到2π
            t = 2 * math.pi * i / num_points
            # 爱心参数方程 (经典心形曲线)
            # x = 16sin³(t)
            # y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
            x = 16 * (math.sin(t) ** 3)
            y = -(13 * math.cos(t) - 5 * math.cos(2*t) - 2 * math.cos(3*t) - math.cos(4*t))
            
            # 缩放因子：爱心参数方程中，x的范围大约是-16到16，y的范围大约是-18到18
            # 我们将size作为爱心的宽度（x方向）
            scale_x = size / 32  # 32是x方向的总范围
            scale_y = size / 28  # 减小分母使爱心更高（原来是36，现在改为28）
            
            # 计算实际屏幕坐标
            # 弹窗尺寸是400x100，所以坐标应该是弹窗左上角的位置
            px = center_x + x * scale_x - 200  # 减去弹窗宽度的一半，使弹窗中心对齐爱心点
            py = center_y + y * scale_y - 50   # 减去弹窗高度的一半
            
            points.append((px, py))
        return points
    
    def create_bubble_heart(self, x, y):
        """创建动态冒泡爱心"""
        bubble = tk.Toplevel(self.root)
        bubble.overrideredirect(True)  # 无边框
        bubble.attributes('-topmost', True)
        bubble.geometry("30x30")
        bubble.configure(bg='')
        
        heart_label = tk.Label(
            bubble,
            text=random.choice(["💕", "💖", "💗", "💓", "💝", "💘", "❤️", "💞"]),
            font=("微软雅黑", 16),
            bg='',
            fg='#ff69b4'
        )
        heart_label.pack()
        
        bubble.geometry(f"+{int(x)}+{int(y)}")
        bubble.attributes('-alpha', 0.8)
        
        self.bubble_hearts.append({
            'window': bubble,
            'x': x,
            'y': y,
            'speed': random.uniform(0.5, 1.5),
            'vx': random.uniform(-0.5, 0.5),
            'vy': -random.uniform(1, 2),
            'alpha': 0.8
        })
        
        return bubble
    
    def animate_bubble_hearts(self):
        """动画冒泡爱心"""
        to_remove = []
        for i, bubble in enumerate(self.bubble_hearts):
            if not bubble['window'].winfo_exists():
                to_remove.append(i)
                continue
            
            bubble['y'] += bubble['vy']
            bubble['x'] += bubble['vx']
            bubble['alpha'] -= 0.01
            
            if bubble['alpha'] <= 0 or bubble['y'] < -50:
                bubble['window'].destroy()
                to_remove.append(i)
                continue
            
            bubble['window'].geometry(f"+{int(bubble['x'])}+{int(bubble['y'])}")
            bubble['window'].attributes('-alpha', bubble['alpha'])
        
        # 移除已销毁的爱心
        for i in reversed(to_remove):
            self.bubble_hearts.pop(i)
        
        if self.bubble_hearts:
            self.root.after(30, self.animate_bubble_hearts)
    
    def close_all_popups(self):
        """关闭所有弹窗和冒泡爱心"""
        # 停止爱心形状显示
        self.heart_shape_active = False
        
        # 关闭所有弹窗
        for popup in self.popup_windows[:]:
            try:
                popup.destroy()
            except:
                pass
        self.popup_windows.clear()
        
        # 关闭所有冒泡爱心
        for bubble in self.bubble_hearts[:]:
            try:
                bubble['window'].destroy()
            except:
                pass
        self.bubble_hearts.clear()
        
        # 停止自动播放
        if self.is_playing:
            self.is_playing = False
            self.auto_btn.config(text="▶ 自动播放")
    
    def show_heart_shape_popups(self):
        """显示爱心形状的弹窗"""
        # 先设置标志为活跃（在清除之前，避免被清除函数重置）
        self.heart_shape_active = True
        
        # 清除之前的弹窗和冒泡爱心（但不重置 heart_shape_active）
        # 先保存标志
        was_active = self.heart_shape_active
        
        # 手动清除弹窗和冒泡爱心，不调用 close_all_popups（因为它会重置标志）
        for popup in self.popup_windows[:]:
            try:
                popup.destroy()
            except:
                pass
        self.popup_windows.clear()
        
        for bubble in self.bubble_hearts[:]:
            try:
                bubble['window'].destroy()
            except:
                pass
        self.bubble_hearts.clear()
        
        # 恢复标志
        self.heart_shape_active = was_active
        
        # 获取屏幕尺寸和中心
        screen_width = self.root.winfo_screenwidth()
        screen_height = self.root.winfo_screenheight()
        center_x = screen_width // 2
        center_y = screen_height // 2 - 50  # 稍微上移，让爱心居中显示
        
        # 根据屏幕尺寸调整爱心大小（更大，但确保所有弹窗都能显示）
        # 考虑到弹窗宽度400，我们需要确保爱心宽度不超过屏幕
        max_width = screen_width - 400
        max_height = screen_height - 100
        heart_size = min(max_width * 0.7, max_height * 0.7, 700)
        
        # 获取爱心形状的坐标点
        heart_points = self.get_heart_shape_points(center_x, center_y, size=heart_size, num_points=len(self.quotes))
        
        # 开始冒泡爱心动画
        self.animate_bubble_hearts()
        
        # 依次显示弹窗形成爱心
        def show_next_popup(index):
            # 检查是否应该停止
            if not self.heart_shape_active:
                return
            
            if index >= len(self.quotes):
                self.heart_shape_active = False
                return
            
            try:
                # 显示弹窗
                x, y = heart_points[index]
                # 确保坐标在屏幕范围内
                x = max(0, min(x, screen_width - 400))
                y = max(0, min(y, screen_height - 100))
                
                # 获取颜色，确保有效
                try:
                    color_index = index % len(self.popup_colors)
                    bg_color = self.popup_colors[color_index]
                    # 确保颜色值有效
                    if not bg_color or not isinstance(bg_color, str) or not bg_color.strip():
                        bg_color = random.choice(self.popup_colors)
                except:
                    bg_color = random.choice(self.popup_colors)
                
                popup = self.create_popup(self.quotes[index], x, y, bg_color, auto_close=False)
                
                # 在弹窗周围创建冒泡爱心
                if self.heart_shape_active:  # 再次检查
                    for _ in range(3):
                        offset_x = random.randint(-50, 50)
                        offset_y = random.randint(-50, 50)
                        bubble_x = x + 200 + offset_x  # 弹窗中心位置
                        bubble_y = y + 50 + offset_y
                        self.create_bubble_heart(bubble_x, bubble_y)
                
                # 继续下一个弹窗（每150毫秒显示一个，形成连贯的爱心）
                if self.heart_shape_active and index < len(self.quotes) - 1:
                    # 使用一个包装函数来确保参数正确传递
                    next_index = index + 1
                    def schedule_next():
                        try:
                            if self.heart_shape_active:
                                show_next_popup(next_index)
                        except Exception as e:
                            print(f"Error in schedule_next: {e}")
                            self.heart_shape_active = False
                    self.root.after(300, schedule_next)  # 减慢速度：从150ms改为300ms
            except Exception as e:
                print(f"Error in show_next_popup (index {index}): {e}")
                import traceback
                traceback.print_exc()
                # 即使出错也继续下一个（除非是致命错误）
                if self.heart_shape_active and index < len(self.quotes) - 1:
                    next_index = index + 1
                    def schedule_next():
                        if self.heart_shape_active:
                            try:
                                show_next_popup(next_index)
                            except:
                                pass
                    self.root.after(300, schedule_next)  # 减慢速度：从150ms改为300ms
        
        # 开始显示
        show_next_popup(0)
    
    def toggle_auto_play(self):
        """切换自动播放"""
        if not self.is_playing:
            self.is_playing = True
            self.auto_btn.config(text="⏸ 停止播放")
            self.auto_play()
        else:
            self.is_playing = False
            self.auto_btn.config(text="▶ 自动播放")
    
    def auto_play(self):
        """自动播放（一次显示多个）"""
        if not self.is_playing:
            return
            
        # 一次显示2-3个弹窗
        for _ in range(random.randint(2, 3)):
            self.create_popup(self.quotes[self.current_index])
            self.next_quote()
        
        # 0.8秒后播放下一批
        self.root.after(800, self.auto_play)
    
    def run(self):
        """运行程序"""
        self.root.mainloop()

if __name__ == "__main__":
    # 版权信息：CAFUC张天顺
    # Copyright (c) CAFUC张天顺
    # 版权所有，未经授权禁止修改和分发
    
    # 验证版权信息完整性
    if _COPYRIGHT != "CAFUC张天顺" or _COPYRIGHT_OWNER != "张天顺" or _COPYRIGHT_ORG != "CAFUC":
        print("警告：版权信息已被修改！")
    
    app = LoveQuotesPopup()
    app.run()

