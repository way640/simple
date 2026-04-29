/**
 * 角色控制器
 * 控制角色的移动、攻击、技能等行为
 */

import { DamageCalculator } from './DamageCalculator';
import { GameData } from './GameData';

export interface CharacterStats {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  attackRange: number;
  attackSpeed: number;
  currentHp: number;
  level: number;
  skills: Skill[];
  cards: Card[];
  capacity: number;
}

export interface Skill {
  name: string;
  description: string;
  baseCoefficient: number;
  maxCoefficient: number;
  cooldown: number;
  currentCooldown: number;
  range?: number;
  specialEffect?: string;
}

export interface Card {
  name: string;
  rarity: string;
  color: string;
  value: number;
  cost: number;
  description: string;
  level: number;
}

export class CharacterController {
  // 角色状态
  private characterStats: CharacterStats;
  
  // 位置信息
  private position: { x: number; y: number };
  
  // 状态标志
  private isMoving: boolean = false;
  private isAttacking: boolean = false;
  private isUsingSkill: boolean = false;
  
  // 攻击目标
  private attackTarget: any = null;
  
  constructor(characterName: string, level: number = 1) {
    const characterData = GameData.getCharacter(characterName);
    if (!characterData) {
      throw new Error(`角色 ${characterName} 不存在`);
    }
    
    // 初始化角色状态
    this.characterStats = {
      name: characterData.name,
      hp: characterData.hp,
      attack: characterData.attack,
      defense: characterData.defense,
      speed: characterData.speed,
      attackRange: characterData.attackRange,
      attackSpeed: characterData.attackSpeed,
      currentHp: characterData.hp,
      level: level,
      skills: characterData.skills.map(skill => ({
        name: skill.name,
        description: skill.description,
        baseCoefficient: skill.baseCoefficient,
        maxCoefficient: skill.maxCoefficient,
        cooldown: skill.cooldown,
        currentCooldown: 0,
        range: skill.range,
        specialEffect: skill.specialEffect
      })),
      cards: [],
      capacity: GameData.CAPACITY_SYSTEM[`Lv.${level}`] || GameData.CAPACITY_SYSTEM['Lv.1']
    };
    
    // 初始化位置
    this.position = { x: 0, y: 0 };
  }
  
  /**
   * 移动角色
   * @param targetX 目标X坐标
   * @param targetY 目标Y坐标
   */
  move(targetX: number, targetY: number): void {
    this.isMoving = true;
    
    // 计算移动距离
    const distance = Math.sqrt(
      Math.pow(targetX - this.position.x, 2) + 
      Math.pow(targetY - this.position.y, 2)
    );
    
    // 计算移动时间（根据速度）
    const moveTime = distance / this.characterStats.speed;
    
    // 移动到目标位置
    this.position.x = targetX;
    this.position.y = targetY;
    
    this.isMoving = false;
    
    console.log(`${this.characterStats.name} 移动到 (${targetX}, ${targetY})，耗时 ${moveTime}s`);
  }
  
  /**
   * 攻击目标
   * @param target 攻击目标
   */
  attack(target: any): void {
    if (this.isAttacking) return;
    
    this.isAttacking = true;
    this.attackTarget = target;
    
    // 计算攻击伤害
    const damage = DamageCalculator.calculateFinalDamage(
      this.characterStats.attack,
      target.defense || 0,
      1.0 // 普通攻击系数
    );
    
    // 攻击目标
    target.takeDamage(damage);
    
    // 攻击完成后重置状态
    setTimeout(() => {
      this.isAttacking = false;
      this.attackTarget = null;
    }, this.characterStats.attackSpeed * 1000);
    
    console.log(`${this.characterStats.name} 攻击 ${target.name}，造成 ${damage} 伤害`);
  }
  
  /**
   * 使用技能
   * @param skillName 技能名称
   * @param target 技能目标
   */
  useSkill(skillName: string, target: any): void {
    if (this.isUsingSkill) return;
    
    const skill = this.characterStats.skills.find(s => s.name === skillName);
    if (!skill) {
      console.log(`${this.characterStats.name} 没有技能 ${skillName}`);
      return;
    }
    
    // 检查技能冷却
    if (skill.currentCooldown > 0) {
      console.log(`${skill.name} 还在冷却中，剩余时间 ${skill.currentCooldown}s`);
      return;
    }
    
    this.isUsingSkill = true;
    
    // 计算技能伤害
    const skillLevel = 1; // 默认技能等级
    const damage = DamageCalculator.calculateSkillDamage(
      this.characterStats.attack,
      target.defense || 0,
      'minor', // 小技能类型
      skillLevel
    );
    
    // 对目标造成伤害
    target.takeDamage(damage);
    
    // 启动技能冷却
    skill.currentCooldown = skill.cooldown;
    this.startSkillCooldown(skill);
    
    // 特殊效果处理
    if (skill.specialEffect) {
      this.handleSpecialEffect(skill.specialEffect, target);
    }
    
    this.isUsingSkill = false;
    
    console.log(`${this.characterStats.name} 使用技能 ${skill.name}，造成 ${damage} 伤害`);
  }
  
  /**
   * 启动技能冷却计时器
   * @param skill 技能
   */
  private startSkillCooldown(skill: Skill): void {
    const interval = 1000; // 每秒减少冷却时间
    
    const timer = setInterval(() => {
      skill.currentCooldown -= 1;
      
      if (skill.currentCooldown <= 0) {
        skill.currentCooldown = 0;
        clearInterval(timer);
        console.log(`${skill.name} 冷却完成`);
      }
    }, interval);
  }
  
  /**
   * 处理特殊效果
   * @param specialEffect 特殊效果描述
   * @param target 目标
   */
  private handleSpecialEffect(specialEffect: string, target: any): void {
    // 解析特殊效果
    if (specialEffect.includes('吸血效果')) {
      // 吸血效果
      const percentage = parseInt(specialEffect.match(/\d+%/)[0]) || 0;
      const healAmount = Math.floor(target.currentDamage * percentage / 100);
      this.heal(healAmount);
      
      console.log(`${this.characterStats.name} 吸血 ${healAmount} 生命值`);
    } else if (specialEffect.includes('召唤数量')) {
      // 召唤效果
      const count = parseInt(specialEffect.match(/\d+/)[0]) || 0;
      console.log(`${this.characterStats.name} 召唤 ${count} 个护卫`);
    } else if (specialEffect.includes('控场效果')) {
      // 控场效果
      console.log(`${this.characterStats.name} 施展控场效果`);
    }
  }
  
  /**
   * 拾取卡牌
   * @param card 卡牌
   */
  pickupCard(card: Card): boolean {
    // 检查容量
    const currentCapacity = this.characterStats.cards.reduce(
      (total, card) => total + card.cost, 0
    );
    
    if (currentCapacity + card.cost > this.characterStats.capacity) {
      console.log(`${this.characterStats.name} 容量不足，无法拾取卡牌 ${card.name}`);
      return false;
    }
    
    // 拾取卡牌
    this.characterStats.cards.push(card);
    
    // 更新角色数值
    if (card.description.includes('ATK')) {
      this.characterStats.attack += card.value;
    } else if (card.description.includes('HP')) {
      this.characterStats.hp += card.value;
      this.characterStats.currentHp += card.value;
    }
    
    console.log(`${this.characterStats.name} 拾取卡牌 ${card.name}，消耗容量 ${card.cost}`);
    return true;
  }
  
  /**
   * 丢弃卡牌
   * @param cardName 卡牌名称
   */
  discardCard(cardName: string): boolean {
    const cardIndex = this.characterStats.cards.findIndex(card => card.name === cardName);
    
    if (cardIndex === -1) {
      console.log(`${this.characterStats.name} 没有卡牌 ${cardName}`);
      return false;
    }
    
    const card = this.characterStats.cards[cardIndex];
    
    // 移除卡牌效果
    if (card.description.includes('ATK')) {
      this.characterStats.attack -= card.value;
    } else if (card.description.includes('HP')) {
      this.characterStats.hp -= card.value;
      this.characterStats.currentHp -= card.value;
    }
    
    // 移除卡牌
    this.characterStats.cards.splice(cardIndex, 1);
    
    console.log(`${this.characterStats.name} 丢弃卡牌 ${card.name}，恢复容量 ${card.cost}`);
    return true;
  }
  
  /**
   * 升级卡牌
   * @param cardName 卡牌名称
   */
  upgradeCard(cardName: string): boolean {
    const cardIndex = this.characterStats.cards.findIndex(card => card.name === cardName);
    
    if (cardIndex === -1) {
      console.log(`${this.characterStats.name} 没有卡牌 ${cardName}`);
      return false;
    }
    
    const card = this.characterStats.cards[cardIndex];
    
    // 检查是否可以升级
    if (card.level >= 10) {
      console.log(`${card.name} 已达到最高等级`);
      return false;
    }
    
    // 升级卡牌
    card.level += 1;
    
    // 更新卡牌数值（满级数值为初始2倍）
    const upgradeValue = (card.value * 2 - card.value) / 9; // 平均升级增加值
    card.value += upgradeValue;
    
    // 更新消耗（满级消耗为初始2倍）
    const upgradeCost = (card.cost * 2 - card.cost) / 9; // 平均升级增加消耗
    card.cost += upgradeCost;
    
    // 更新角色数值
    if (card.description.includes('ATK')) {
      this.characterStats.attack += upgradeValue;
    } else if (card.description.includes('HP')) {
      this.characterStats.hp += upgradeValue;
      this.characterStats.currentHp += upgradeValue;
    }
    
    console.log(`${this.characterStats.name} 升级卡牌 ${card.name} 到等级 ${card.level}`);
    return true;
  }
  
  /**
   * 治疗角色
   * @param amount 治疗量
   */
  heal(amount: number): void {
    this.characterStats.currentHp += amount;
    
    if (this.characterStats.currentHp > this.characterStats.hp) {
      this.characterStats.currentHp = this.characterStats.hp;
    }
    
    console.log(`${this.characterStats.name} 恢复 ${amount} 生命值`);
  }
  
  /**
   * 受到伤害
   * @param damage 伤害值
   */
  takeDamage(damage: number): void {
    this.characterStats.currentHp -= damage;
    
    if (this.characterStats.currentHp <= 0) {
      this.characterStats.currentHp = 0;
      console.log(`${this.characterStats.name} 死亡`);
    } else {
      console.log(`${this.characterStats.name} 受到 ${damage} 伤害，剩余生命值 ${this.characterStats.currentHp}`);
    }
  }
  
  /**
   * 获取角色状态
   */
  getStats(): CharacterStats {
    return this.characterStats;
  }
  
  /**
   * 获取位置
   */
  getPosition(): { x: number; y: number } {
    return this.position;
  }
  
  /**
   * 是否正在移动
   */
  isMoving(): boolean {
    return this.isMoving;
  }
  
  /**
   * 是否正在攻击
   */
  isAttacking(): boolean {
    return this.isAttacking;
  }
  
  /**
   * 是否正在使用技能
   */
  isUsingSkill(): boolean {
    return this.isUsingSkill;
  }
}