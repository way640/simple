/**
 * 角色预制体
 * 角色的Cocos Creator预制体文件
 */

export class CharacterPrefab {
  // 角色预制体数据
  public characterData: CharacterPrefabData;
  
  constructor(characterName: string) {
    this.characterData = this.createCharacterPrefabData(characterName);
    
    console.log(`创建角色预制体 ${characterName}`);
  }
  
  /**
   * 创建角色预制体数据
   * @param characterName 角色名称
   */
  private createCharacterPrefabData(characterName: string): CharacterPrefabData {
    const character = {
      name: characterName,
      spriteName: `${characterName.toLowerCase()}_sprite`,
      position: { x: 0, y: 0 },
      scale: { x: 1.0, y: 1.0 },
      rotation: 0,
      animationController: this.createAnimationController(),
      collider: this.createCollider(),
      healthBar: this.createHealthBar(),
      attackIndicator: this.createAttackIndicator(),
      movementController: this.createMovementController()
    };
    
    return character;
  }
  
  /**
   * 创建动画控制器
   */
  private createAnimationController(): AnimationController {
    return {
      animations: [
        {
          name: 'idle',
          frames: [`${this.characterData.name}_idle_1`, `${this.characterData.name}_idle_2`],
          speed: 0.2
        },
        {
          name: 'move',
          frames: [`${this.characterData.name}_move_1`, `${this.characterData.name}_move_2`, `${this.characterData.name}_move_3`],
          speed: 0.3
        },
        {
          name: 'attack',
          frames: [`${this.characterData.name}_attack_1`, `${this.characterData.name}_attack_2`, `${this.characterData.name}_attack_3`],
          speed: 0.4
        },
        {
          name: 'skill',
          frames: [`${this.characterData.name}_skill_1`, `${this.characterData.name}_skill_2`, `${this.characterData.name}_skill_3`],
          speed: 0.5
        },
        {
          name: 'death',
          frames: [`${this.characterData.name}_death_1`, `${this.characterData.name}_death_2`],
          speed: 0.1
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
      type: 'circle',
      radius: 0.5,
      enabled: true,
      collisionLayer: 'character',
      collisionMask: ['monster', 'card']
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
      speed: 5.0,
      acceleration: 10.0,
      deceleration: 5.0,
      maxSpeed: 15.0,
      friction: 0.5
    };
  }
  
  /**
   * 转换为JSON格式
   */
  toJSON(): string {
    return JSON.stringify(this.characterData, null, 2);
  }
  
  /**
   * 转换为Cocos Creator预制体文件格式
   */
  toPrefab(): string {
    const prefab = {
      _type: 'Prefab',
      data: {
        name: this.characterData.name,
        sprite: this.characterData.spriteName,
        position: this.characterData.position,
        scale: this.characterData.scale,
        rotation: this.characterData.rotation,
        animations: this.characterData.animationController.animations,
        collider: this.characterData.collider,
        healthBar: this.characterData.healthBar,
        attackIndicator: this.characterData.attackIndicator,
        movementController: this.characterData.movementController
      }
    };
    
    return JSON.stringify(prefab, null, 2);
  }
}

/**
 * 角色预制体数据
 */
export interface CharacterPrefabData {
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
 80 color: string;
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
 * 角色预制体测试
 */
export function testCharacterPrefab() {
  const characterPrefab = new CharacterPrefab('雷恩');
  console.log('=== 角色预制体测试 ===');
  console.log(`角色预制体数据: ${characterPrefab.toJSON()}`);
  console.log(`角色预制体文件: ${characterPrefab.toPrefab()}`);
  
  const animationController = characterPrefab.characterData.animationController;
  console.log(`动画数量: ${animationController.animations.length}`);
  console.log(`当前动画: ${animationController.currentAnimation}`);
  
  const collider = characterPrefab.characterData.collider;
  console.log(`碰撞器类型: ${collider.type}`);
  console.log(`碰撞器半径: ${collider.radius}`);
  
  const healthBar = characterPrefab.characterData.healthBar;
  console.log(`血条宽度: ${healthBar.width}`);
  console.log(`血条高度: ${healthBar.height}`);
  console.log(`血条颜色: ${healthBar.color}`);
  console.log(`血条值: ${healthBar.value}`);
  console.log(`血条最大值: ${healthBar.maxValue}`);
  
  const attackIndicator = characterPrefab.characterData.attackIndicator;
  console.log(`攻击指示器宽度: ${attackIndicator.width}`);
  console.log(`攻击指示器高度: ${attackIndicator.height}`);
  console.log(`攻击指示器颜色: ${attackIndicator.color}`);
  console.log(`攻击指示器可见性: ${attackIndicator.visible}`);
  
  const movementController = characterPrefab.characterData.movementController;
  console.log(`移动速度: ${movementController.speed}`);
  console.log(`加速度: ${movementController.acceleration}`);
  console.log(`减速度: ${movementController.deceleration}`);
  console.log(`最大速度: ${movementController.maxSpeed}`);
  console.log(`摩擦力: ${movementController.friction}`);
  
  console.log('=== 角色预制体测试完成 ===');
}