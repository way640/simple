/**
 * 怪物预制体
 * 怪物的Cocos Creator预制体文件
 */

export class MonsterPrefab {
  // 怪物预制体数据
  public monsterData: MonsterPrefabData;
  
  constructor(monsterName: string) {
    this.monsterData = this.createMonsterPrefabData(monsterName);
    
    console.log(`创建怪物预制体 ${monsterName}`);
  }
  
  /**
   * 创建怪物预制体数据
   * @param monsterName 怪物名称
   */
  private createMonsterPrefabData(monsterName: string): MonsterPrefabData {
    const monster = {
      name: monsterName,
      spriteName: `${monsterName.toLowerCase()}_sprite`,
      position: { x: 0, y: 0 },
      scale: { x: 1.0, y: 1.0 },
      rotation: 0,
      animationController: this.createAnimationController(),
      collider: this.createCollider(),
      healthBar: this.createHealthBar(),
      attackIndicator: this.createAttackIndicator(),
      movementController: this.createMovementController()
    };
    
    return monster;
  }
  
  /**
   * 创建动画控制器
   */
  private createAnimationController(): AnimationController {
    return {
      animations: [
        {
          name: 'idle',
          frames: [`${this.monsterData.name}_idle_1`, `${this.monsterData.name}_idle_2`],
          speed: 0.2
        },
        {
          name: 'move',
          frames: [`${this.monsterData.name}_move_1`, `${this.monsterData.name}_move_2`, `${this.monsterData.name}_move_3`],
          speed: 0.3
        },
        {
          name: 'attack',
          frames: [`${this.monsterData.name}_attack_1`, `${this.monsterData.name}_attack_2`, `${this.monsterData.name}_attack_3`],
          speed: 0.4
        },
        {
          name: 'death',
          frames: [`${this.monsterData.name}_death_1`, `${this.monsterData.name}_death_2`],
          speed: 0.1
        }
      ],
      currentAnimation: 'idle27',
      currentFrame: 0,
      loop: true
    };
  }
  
  /**
   * 创建碰撞器
   */
  private createCollider(): Collider {
    return {
      type: 'circle',
      radius: 0.5,
      enabled: true,
      collisionLayer: 'monster',
      collisionMask: ['character', 'card']
    };
  }
  
  /**
   * 创建血条
   */
  private createHealthBar(): HealthBar {
    return {
      position: { x: 0, y: 0.5 },
      width: 1.0,
      height: 0.1,
      color: '#ff0000',
      value: 100,
      maxValue: 100
    };
  }
  
  /**
   * 创建攻击指示器
   */
  private createAttackIndicator(): AttackIndicator {
    return {
      position: { x: 0.5, y: 0 },
      width: 0.1,
      height: 0.5,
      color: '#ffff00',
      visible: false
    };
  }
  
  /**
   * 创建移动控制器
   */
  private createMovementController(): MovementController {
    return {
      speed: 3.0,
      acceleration: 5.0,
      deceleration: 3.0,
      maxSpeed: 10.0,
      friction: 0.5
    };
  }
  
  /**
   * 转换为JSON格式
   */
  toJSON(): string {
    return JSON.stringify(this.monsterData, null, 2);
  }
  
  /**
   * 转换为Cocos Creator预制体文件格式
   */
  toPrefab(): string {
    const prefab = {
      _type: 'Prefab',
      data: {
        name: this.monsterData.name,
        sprite: this.monsterData.spriteName,
        position: this.monsterData.position,
        scale: this.monsterData.scale,
        rotation: this.monsterData.rotation,
        animations: this.monsterData.animationController.animations,
        collider: this.monsterData.collider,
        healthBar: this.monsterData.healthBar,
        attackIndicator: this.monsterData.attackIndicator,
        movementController: this.monsterData.movementController
      }
    };
    
    return JSON.stringify(prefab, null, 2);
  }
}

/**
 * 怪物预制体数据
 */
export interface MonsterPrefabData {
  name: string;
  spriteName: string;
  position: { x: number; y: number };
  scale: { x: number; y: number };
  rotation: number;
  animationController: AnimationController;
  collider: Collider;
  healthBar: HealthBar;
  attackIndicator: AttackIndicator;
  movementController: MovementController;
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
  radius: number;
  enabled: boolean;
  collisionLayer: string;
  collisionMask: string[];
}

/**
 * 血条
 */
export interface HealthBar {
  position: { x: number; y: number };
  width: number;
  height: number;
  color: string;
  value: number;
  maxValue: number;
}

/**
 * 攻击指示器
 */
export interface AttackIndicator {
  position: { x: number; y: number };
  width: number;
  height: number;
  color: string;
  visible: boolean;
}

/**
 * 移动控制器
 */
export interface MovementController {
  speed: number;
  acceleration: number;
  deceleration: number;
  maxSpeed: number;
  friction: number;
}

/**
 * 怪物预制体测试
 */
export function testMonsterPrefab() {
  const monsterPrefab = new MonsterPrefab('普通怪物');
  console.log('=== 怪物预制体测试 ===');
  console.log(`怪物预制体数据: ${monsterPrefab.toJSON()}`);
  console.log(`怪物预制体文件: ${monsterPrefab.toPrefab()}`);
  
  const animationController = monsterPrefab.monsterData.animationController;
  console.log(`动画数量: ${animationController.animations.length}`);
  console.log(`当前动画: ${animationController.currentAnimation}`);
  
  const collider = monsterPrefab.monsterData.collider;
  console.log(`碰撞器类型: ${collider.type}`);
  console.log(`碰撞器半径: ${collider.radius}`);
  
  const healthBar = monsterPrefab.monsterData.healthBar;
  console.log(`血条宽度: ${healthBar.width}`);
  console.log(`血条高度: ${healthBar.height}`);
  console.log(`血条颜色: ${healthBar.color}`);
  console.log(`血条值: ${healthBar.value}`);
  console.log(`血条最大值: ${healthBar.maxValue}`);
  
  const attackIndicator = monsterPrefab.monsterData.attackIndicator;
  console.log(`攻击指示器宽度: ${attackIndicator.width}`);
  console.log(`攻击指示器高度: ${attackIndicator.height}`);
  console.log(`攻击指示器颜色: ${attackIndicator.color}`);
  console.log(`攻击指示器可见性: ${attackIndicator.visible}`);
  
  const movementController = monsterPrefab.monsterData.movementController;
  console.log(`移动速度: ${movementController.speed}`);
  console.log(`加速度: ${movementController.acceleration}`);
  console.log(`减速度: ${movementController.deceleration}`);
  console.log(`最大速度: ${movementController.maxSpeed}`);
  console.log(`摩擦力: ${movementController.friction}`);
  
  console.log('=== 怪物预制体测试完成 ===');
}