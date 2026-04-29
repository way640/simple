/**
 * 所有系统综合测试
 * 测试预制体、动画、音频、字体系统
 */

console.log('=== 《幸存者：卡牌进化》所有系统综合测试 ===');

// 预制体测试
console.log('=== 预制体测试 ===');

const characterPrefabData = {
  name: '雷恩',
  spriteName: '雷恩_sprite',
  position: { x: 0, y: 0 },
  scale: { x: 1.0, y: 1.0 },
  rotation: 0,
  animationController: {
    animations: [
      { name: 'idle', frames: ['雷恩_idle_1', '雷恩_idle_2'], speed: 0.2, loop: true },
      { name: 'move', frames: ['雷恩_move_1', '雷恩_move_2', '雷恩_move_3'], speed: 0.3, loop: true },
      { name: 'attack', frames: ['雷恩_attack_1', '雷恩_attack_2', '雷恩_attack_3'], speed: 0.4, loop: false }
    ],
    currentAnimation: 'idle',
    currentFrame: 0,
    loop: true
  },
  collider: {
    type: 'circle',
    radius: 0.5,
    enabled: true,
    collisionLayer: 'character',
    collisionMask: ['monster', 'card']
  },
  healthBar: {
    position: { x: 0, y: 0.5 },
    width: 1.0,
    height: 0.1,
    color: '#ff0000',
    value: 100,
    maxValue: 100
  },
  attackIndicator: {
    position: { x: 0.5, y: 0 },
    width: 0.1,
    height: 0.5,
    color: '#ffff00',
    visible: false
  },
  movementController: {
    speed: 5.0,
    acceleration: 10.0,
    deceleration: 5.0,
    maxSpeed: 15.0,
    friction: 0.5
  }
};

console.log('角色预制体数据测试');
console.log(`角色名称: ${characterPrefabData.name}`);
console.log(`角色精灵名称: ${characterPrefabData.spriteName}`);
console.log(`角色动画数量: ${characterPrefabData.animationController.animations.length}`);
console.log(`角色碰撞器半径: ${characterPrefabData.collider.radius}`);
console.log(`角色血条宽度: ${characterPrefabData.healthBar.width}`);
console.log(`角色血条高度: ${characterPrefabData.healthBar.height}`);
console.log(`角色攻击指示器宽度: ${characterPrefabData.attackIndicator.width}`);
console.log(`角色攻击指示器高度: ${characterPrefabData.attackIndicator.height}`);
console.log(`角色移动速度: ${characterPrefabData.movementController.speed}`);
console.log(`角色加速度: ${characterPrefabData.movementController.acceleration}`);
console.log(`角色减速度: ${characterPrefabData.movementController.deceleration}`);
console.log(`角色最大速度: ${characterPrefabData.movementController.maxSpeed}`);
console.log(`角色摩擦力: ${characterPrefabData.movementController.friction}`);

const monsterPrefabData = {
  name: '普通怪物',
  spriteName: '普通怪物_sprite',
  position: { x: 0, y: 0 },
  scale: { x: 1.0, y: 1.0 },
  rotation: 0,
  animationController: {
    animations: [
      { name: 'idle', frames: ['普通怪物_idle_1', '普通怪物_idle_2'], speed: 0.2, loop: true },
      { name: 'move', frames: ['普通怪物_move_1', '普通怪物_move_2', '普通怪物_move_3'], speed: 0.3, loop: true },
      { name: 'attack', frames: ['普通怪物_attack_1', '普通怪物_attack_2', '普通怪物_attack_3'], speed: 0.4, loop: false }
    ],
    currentAnimation: 'idle',
    currentFrame: 0,
    loop: true
  },
  collider: {
    type: 'circle',
    radius: 0.5,
    enabled: true,
    collisionLayer: 'monster',
    collisionMask: ['character', 'card']
  },
  healthBar: {
    position: { x: 0, y: 0.5 },
    width: 1.0,
    height: 0.1,
    color: '#ff0000',
    value: 100,
    maxValue: 100
  },
  attackIndicator: {
    position: { x: 0.5, y: 0 },
    width: 0.1,
    height: 0.5,
    color: '#ffff00',
    visible: false
  },
  movementController: {
    speed: 3.0,
    acceleration: 5.0,
    deceleration: 3.0,
    maxSpeed: 10.0,
    friction: 0.5
  }
};

console.log('怪物预制体数据测试');
console.log(`怪物名称: ${monsterPrefabData.name}`);
console.log(`怪物精灵名称: ${monsterPrefabData.spriteName}`);
console.log(`怪物动画数量: ${monsterPrefabData.animationController.animations.length}`);
console.log(`怪物碰撞器半径: ${monsterPrefabData.collider.radius}`);
console.log(`怪物血条宽度: ${monsterPrefabData.healthBar.width}`);
console.log(`怪物血条高度: ${monsterPrefabData.healthBar.height}`);
console.log(`怪物攻击指示器宽度: ${monsterPrefabData.attackIndicator.width}`);
console.log(`怪物攻击指示器高度: ${monsterPrefabData.attackIndicator.height}`);
console.log(`怪物移动速度: ${monsterPrefabData.movementController.speed}`);
console.log(`怪物加速度: ${monsterPrefabData.movementController.acceleration}`);
console.log(`怪物减速度: ${monsterPrefabData.movementController.deceleration}`);
console.log(`怪物最大速度: ${monsterPrefabData.movementController.maxSpeed}`);
console.log(`怪物摩擦力: ${monsterPrefabData.movementController.friction}`);

const cardPrefabData = {
  name: '普通攻击卡',
  spriteName: '普通攻击卡_sprite',
  position: { x: 0, y: 0 },
  scale: { x: 1.0, y: 1.0 },
  rotation: 0,
  animationController: {
    animations: [
      { name: 'idle', frames: ['普通攻击卡_idle_1', '普通攻击卡_idle_2'], speed: 0.2, loop: true },
      { name: 'hover', frames: ['普通攻击卡_hover_1', '普通攻击卡_hover_2', '普通攻击卡_hover_3'], speed: 0.3, loop: true },
      { name: 'click', frames: ['普通攻击卡_click_1', '普通攻击卡_click_2', '普通攻击卡_click_3'], speed: 0.4, loop: false }
    ],
    currentAnimation: 'id1le',
    currentFrame: 0,
    loop: true
  },
  collider: {
    type: 'box',
    width: 0.8,
    height: 1.0,
    enabled: true,
    collisionLayer: 'card',
    collisionMask: ['character']
  },
  cardInfo: {
    position: { x: 0, y: 0 },
    width: 0.8,
    height: 1.0,
    color: '#ffffff',
    value: 0,
    cost: 0,
    level: 1,
    rarity: '普通'
  },
  effect: {
    type: 'none',
    position: { x: 0, y: 0 },
    width: 0.8,
    height: 1.0,
    color: '#ffffff',
    visible: false
  },
  glow: {
    position: { x: 0, y: 0 },
    width: 0.8,
    height: 1.0,
    color: '#ffffff',
    intensity: 0.0,
    visible: false
  }
};

console.log('卡牌预制体数据测试');
console.log(`卡牌名称: ${cardPrefabData.name}`);
console.log(`卡牌精灵名称: ${cardPrefabData.spriteName}`);
console.log(`卡牌动画数量: ${cardPrefabData.animationController.animations.length}`);
console.log(`卡牌碰撞器宽度: ${cardPrefabData.collider.width}`);
console.log(`卡牌碰撞器高度: ${cardPrefabData.collider.height}`);
console.log(`卡牌信息宽度: ${cardPrefabData.cardInfo.width}`);
console.log(`卡牌信息高度: ${cardPrefabData.cardInfo.height}`);
console.log(`卡牌信息颜色: ${cardPrefabData.cardInfo.color}`);
console.log(`卡牌信息值: ${cardPrefabData.cardInfo.value}`);
console.log(`卡牌信息消耗: ${cardPrefabData.cardInfo.cost}`);
console.log(`卡牌信息等级: ${cardPrefabData.cardInfo.level}`);
console.log(`卡牌信息稀有度: ${cardPrefabData.cardInfo.rarity}`);
console.log(`卡牌效果类型: ${cardPrefabData.effect.type}`);
console.log(`卡牌效果宽度: ${cardPrefabData.effect.width}`);
console.log(`卡牌效果高度: ${cardPrefabData.effect.height}`);
console.log(`卡牌效果颜色: ${cardPrefabData.effect.color}`);
console.log(`卡牌效果可见性: ${cardPrefabData.effect.visible}`);
console.log(`卡牌发光宽度: ${cardPrefabData.glow.width}`);
console.log(`卡牌发光高度: ${cardPrefabData.glow.height}`);
console.log(`卡牌发光颜色: ${cardPrefabData.glow.color}`);
console.log(`卡牌发光强度: ${cardPrefabData.glow.intensity}`);
console.log(`卡牌发光可见性: ${cardPrefabData.glow.visible}`);

// 动画系统测试
console.log('=== 动画系统测试 ===');

const animationData = {
  animations: [
    { name: 'idle', frames: ['character_idle_1', 'character_idle_2'], speed: 0.2, loop: true },
    { name: 'move', frames: ['character_move_1', 'character_move_2', 'character_move_3'], speed: 0.3, loop: true },
    { name: 'attack', frames: ['character_attack_1', 'character_attack_2', 'character_attack_3'], speed: 0.4, loop: false }
  ],
  currentAnimation: 'idle',
  currentFrame: 0,
  loop: true
};

console.log('动画数据测试');
console.log(`动画数量: ${animationData.animations.length}`);
console.log(`当前动画: ${animationData.currentAnimation}`);
console.log(`当前帧: ${animationData.currentFrame}`);
console.log(`循环: ${animationData.loop}`);

for (const animation of animationData.animations) {
  console.log(`动画名称: ${animation.name}`);
  console.log(`动画帧数: ${animation.frames.length}`);
  console.log(`动画速度: ${animation.speed}`);
  console.log(`动画循环: ${animation.loop}`);
}

// 音频系统测试
console.log('=== 音频系统测试 ===');

const backgroundMusicData = {
  name: 'backgroundMusic',
  file: 'background_music.mp3',
  duration: 60,
  loop: true,
  volume: 0.5
};

console.log('背景音乐数据测试');
console.log(`背景音乐名称: ${backgroundMusicData.name}`);
console.log(`背景音乐文件: ${backgroundMusicData.file}`);
console.log(`背景音乐时长: ${backgroundMusicData.duration}`);
console.log(`背景音乐循环: ${backgroundMusicData.loop}`);
console.log(`背景音乐音量: ${backgroundMusicData.volume}`);

const soundEffectData = {
  name: 'attackSound',
  file: 'attack_sound.mp3',
  duration: 1,
  loop: false,
  volume: 0.8
};

console.log('音效数据测试');
console.log(`音效名称: ${soundEffectData.name}`);
console.log(`音效文件: ${soundEffectData.file}`);
console.log(`音效时长: ${soundEffectData.duration}`);
console.log(`音效循环: ${soundEffectData.loop}`);
console.log(`音效音量: ${soundEffectData.volume}`);

const voiceData = {
  name: 'characterVoice',
  file: 'character_voice.mp3',
  duration: 5,
  loop: false,
  volume: 1.0
};

console.log('语音数据测试');
console.log(`语音名称: ${voiceData.name}`);
console.log(`语音文件: ${voiceData.file}`);
console.log(`语音时长: ${voiceData.duration}`);
console.log(`语音循环: ${voiceData.loop}`);
console.log(`语音音量: ${voiceData.volume}`);

// 字体系统测试
console.log('=== 字体系统测试 ===');

const fontData = {
  name: 'titleFont',
  file: 'title.ttf',
  size: 48,
  style: 'bold',
  color: '#ffffff',
  outlineColor: '#000000',
  outlineWidth: 2
};

console.log('字体数据测试');
console.log(`字体名称: ${fontData.name}`);
console.log(`字体文件: ${fontData.file}`);
console.log(`字体大小: ${fontData.size}`);
console.log(`字体样式: ${fontData.style}`);
console.log(`字体颜色: ${fontData.color}`);
console.log(`字体边框颜色: ${fontData.outlineColor}`);
console.log(`字体边框宽度: ${fontData.outlineWidth}`);

console.log('=== 所有系统测试完成 ===');