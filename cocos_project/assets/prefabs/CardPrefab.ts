/**
 * 卡牌预制体
 * 卡牌的Cocos Creator预制体文件
 */

export class CardPrefab {
  // 卡牌预制体数据
  public cardData: CardPrefabData;
  
  constructor(cardName: string) {
    this.cardData = this.createCardPrefabData(cardName);
    
    console.log(`创建卡牌预制体 ${cardName}`);
  }
  
  /**
   * 创建卡牌预制体数据
   * @param cardName 卡牌名称
   */
  private createCardPrefabData(cardName: string): CardPrefabData {
    const card = {
      name: cardName,
      spriteName: `${cardName.toLowerCase()}_sprite`,
      position: { x: 0, y: 0 },
      scale: { x: 1.0, y: 1.0 },
      rotation: 0,
      animationController: this.createAnimationController(),
      collider: this.createCollider(),
      cardInfo: this.createCardInfo(),
      effect: this.createEffect(),
      glow: this.createGlow()
    };
    
    return card;
  }
  
  /**
   * 创建动画控制器
   */
  private createAnimationController(): AnimationController {
    return {
      animations: [
        {
          name: 'idle',
          frames: [`${this.cardData.name}_idle_1`, `${this.cardData.name}_idle_2`],
          speed: 0.2
        },
        {
          name: 'hover',
          frames: [`${this.cardData.name}_hover_1`, `${this.cardData.name}_hover_2`, `${this.cardData.name}_hover_3`],
          speed: 0.3
        },
        {
          name: 'click',
          frames: [`${this.cardData.name}_click_1`, `${this.cardData.name}_click_2`, `${this.cardData.name}_click_3`],
          speed: 0.4
        },
        {
          name: 'use',
          frames: [`${this.cardData.name}_use_1`, `${this.cardData.name}_use_2`, `${this.cardData.name}_use_3`],
          speed: 0.5
        }
      ],
      currentAnimation: 'idle',
      currentFrame: 0,
      loop: true
    };
  }
  
  /**
   * 创建碰撞器
   */
  private createCollider(): Collider {
    return {
      type: 'box',
      width: 0.8,
      height: 1.0,
      enabled: true,
      collisionLayer: 'card',
      collisionMask: ['character']
    };
  }
  
  /**
   * 创建卡牌信息
   */
  private createCardInfo(): CardInfo {
    return {
      position: { x: 0, y: 0 },
      width: 0.8,
      height: 1.0,
      color: '#ffffff',
      value: 0,
      cost: 0,
      level: 1,
      rarity: '普通'
    };
  }
  
  /**
   * 创建效果
   */
  private createEffect(): Effect {
    return {
      type: 'none',
      position: { x: 0, y: 0 },
      width: 0.8,
      height: 1.0,
      color: '#ffffff',
      visible: false
    };
  }
  
  /**
   * 创建发光效果
   */
  private createGlow(): Glow {
    return {
      position: { x: 0, y: 0 },
      width: 0.8,
      height: 1.0,
      color: '#ffffff',
      intensity: 0.0,
      visible: false
    };
  }
  
  /**
   * 转换为JSON格式
   */
  toJSON(): string {
    return JSON.stringify(this.cardData, null, 2);
  }
  
  /**
   * 转换为Cocos Creator预制体文件格式
   */
  toPrefab(): string {
    const prefab = {
      _type: 'Prefab',
      data: {
        name: this.cardData.name,
        sprite: this.cardData.spriteName,
        position: this.cardData.position,
        scale: this.cardData.scale,
        rotation: this.cardData.rotation,
        animations: this.cardData.animationController.animations,
        collider: this.cardData.collider,
        cardInfo: this.cardData.cardInfo,
        effect: this.cardData.effect,
        glow: this.cardData.glow
      }
    };
    
    return JSON.stringify(prefab, null, 2);
  }
}

/**
 * 卡牌预制体数据
 */
export interface CardPrefabData {
  name: string;
  spriteName: string;
  position: { x: number; y: number };
  scale: { x: number; y: number };
  rotation: number;
  animationController: AnimationController;
  collider: Collider;
  cardInfo: CardInfo;
  effect: Effect;
  glow: Glow;
}

/**
 * 动画控制器
 */
export interface AnimationController {
  animations: Animation[];
  currentAnimation: string;
  currentFrame: number;
  loop: boolean;
}

/**
 * 动画
 */
export interface Animation {
  name: string;
  frames: string[];
  speed: number;
}

/**
 * 碰撞器
 */
export interface Collider {
  type: string;
  width: number;
  height: number;
  enabled: boolean;
  collisionLayer: string;
  collisionMask: string[];
}

/**
 * 卡牌信息
 */
export interface CardInfo {
  position: { x: number; y: number };
  width: number;
  height: number;
  color: string;
  value: number;
  cost: number;
  level: number;
  rarity: string;
}

/**
 * 效果
 */
export interface Effect {
  type: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  color: string;
  visible: boolean;
}

/**
 * 发光效果
 */
export interface Glow {
  position: { x: number; y: number };
  width: number;
  height: number;
  color: string;
  intensity: number;
  visible: boolean;
}

/**
 * 卡牌预制体测试
 */
export function testCardPrefab() {
  const cardPrefab = new CardPrefab('普通攻击卡');
  console.log('=== 卡牌预制体测试 ===');
  console.log(`卡牌预制体数据: ${cardPrefab.toJSON()}`);
  console.log(`卡牌预制体文件: ${cardPrefab.toPrefab()}`);
  
  const animationController = cardPrefab.cardData.animationController;
  console.log(`动画数量: ${animationController.animations.length}`);
  console.log(`当前动画: ${animationController.currentAnimation}`);
  
  const collider = cardPrefab.cardData.collider;
  console.log(`碰撞器类型: ${collider.type}`);
  console.log(`碰撞器宽度: ${collider.width}`);
  console.log(`碰撞器高度: ${collider.height}`);
  
  const cardInfo = cardPrefab.cardData.cardInfo;
  console.log(`卡牌信息宽度: ${cardInfo.width}`);
  console.log(`卡牌信息高度: ${cardInfo.height}`);
  console.log(`卡牌信息颜色: ${cardInfo.color}`);
  console.log(`卡牌信息值: ${cardInfo.value}`);
  console.log(`卡牌信息消耗: ${cardInfo.cost}`);
  console.log(`卡牌信息等级: ${cardInfo.level}`);
  console.log(`卡牌信息稀有度: ${cardInfo.rarity}`);
  
  const effect = cardPrefab.cardData.effect;
  console.log(`效果类型: ${effect.type}`);
  console.log(`效果宽度: ${effect.width}`);
  console.log(`效果高度: ${effect.height}`);
  console.log(`效果颜色: ${effect.color}`);
  console.log(`效果可见性: ${effect.visible}`);
  
  const glow = cardPrefab.cardData.glow;
  console.log(`发光效果宽度: ${glow.width}`);
  console.log(`发光效果高度: ${glow.height}`);
  console.log(`发光效果颜色: ${glow.color}`);
  console.log(`发光效果强度: ${glow.intensity}`);
  console.log(`发光效果可见性: ${glow.visible}`);
  
  console.log('=== 卡牌预制体测试完成 ===');
}