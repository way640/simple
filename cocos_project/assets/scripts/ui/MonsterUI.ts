/**
 * 怪物UI组件
 * 显示怪物的状态和信息
 */

import { _decorator, Component, Node, Label, Sprite } from 'cc';

@_decorator.ccclass('MonsterUI')
export class MonsterUI extends Component {
  @_decorator.property(Node)
  private monsterNode: Node = null;
  
  @_decorator.property(Label)
  private nameLabel: Label = null;
  
  @_decorator.property(Label)
  private hpLabel: Label = null;
  
  @_decorator.property(Label)
  private attackLabel: Label = null;
  
  @_decorator.property(Sprite)
  private monsterSprite: Sprite = null;
  
  @_decorator.property(Sprite)
  private hpBarSprite: Sprite = null;
  
  // 怪物状态
  private monster: any = null;
  
  start() {
    // 初始化怪物UI
    if (this.monster) {
      this.updateUI();
    }
  }
  
  /**
   * 设置怪物状态
   */
  setMonster(monster: any): void {
    this.monster = monster;
    this.updateUI();
  }
  
  /**
   * 更新UI
   */
  updateUI(): void {
    if (!this.monster) return;
    
    // 更新标签
    this.nameLabel.string = this.monster.name;
    this.hpLabel.string = `${this.monster.currentHp}/${this.monster.hp}`;
    this.attackLabel.string = `攻击 ${this.monster.attack}`;
    
    // 更新HP条
    const hpPercentage = this.monster.currentHp / this.monster.hp;
    this.hpBarSprite.width = Math.floor(100 * hpPercentage);
    
    // 根据怪物类型设置精灵
    setSpriteByMonsterType(this.monsterSprite, this.monster.name);
  }
  
  /**
   * 更新HP条
   */
  updateHPBar(): void {
    if (!this.monster) return;
    
    const hpPercentage = this.monster.currentHp / this.monster.hp;
    this.hpBarSprite.width = Math.floor(100 * hpPercentage);
    this.hpLabel.string = `${this.monster.currentHp}/${this.monster.hp}`;
  }
  
  /**
   * 显示伤害效果
   */
  showDamageEffect(damage: number): void {
    const damageNode = new Node();
    const damageLabel = new Label();
    damageLabel.string = `-${damage}`;
    damageLabel.color = '#FF0000';
    damageLabel.fontSize = 20;
    
    damageNode.addComponent(damageLabel);
    this.node.addChild(damageNode);
    
    // 动画效果
    damageNode.position = new Vec3(0, 50, 0);
    
    setTimeout(() => {
      damageNode.removeFromParent();
    }, 1000);
  }
  
  /**
   * 显示死亡效果
   */
  showDeathEffect(): void {
    const deathNode = new Node();
    const deathLabel = new Label();
    deathLabel.string = '死亡';
    deathLabel.color = '#FF0000';
    deathLabel.fontSize = 30;
    
    deathNode.addComponent(deathLabel);
    this.node.addChild(deathNode);
    
    // 动画效果
    deathNode.position = new Vec3(0, 50, 0);
    
    setTimeout(() => {
      deathNode.removeFromParent();
      this.node.removeFromParent();
    }, 1000);
  }
}

/**
 * 根据怪物类型设置精灵
 */
function setSpriteByMonsterType(sprite: Sprite, monsterName: string): void {
  if (monsterName.includes('石头人')) {
    sprite.color = '#888888'; // 灰色石头人
  } else if (monsterName.includes('飞行怪')) {
    sprite.color = '#FF8888'; // 红色飞行怪
  } else if (monsterName.includes('双子怪')) {
    sprite.color = '#88FF88'; // 绿色双子怪
  } else if (monsterName.includes('狂暴怪')) {
    sprite.color = '#FF88FF'; // 紫色狂暴怪
  } else if (monsterName.includes('终局Boss')) {
    sprite.color = '#8888FF'; // 蓝色终局Boss
  } else {
    sprite.color = '#FF0000'; // 红色普通怪物
  }
}