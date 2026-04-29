/**
 * 卡牌系统
 * 管理卡牌的拾取、丢弃、升级和容量系统
 */

import { GameData } from './GameData';

export interface Card {
  name: string;
  rarity: string;
  color: string;
  baseValue: number;
  maxValue: number;
  baseCost: number;
  maxCost: number;
  description: string;
  level: number;
  value: number;
  cost: number;
}

export interface CardSlot {
  card: Card;
  equipped: boolean;
}

export class CardSystem {
  // 卡牌库
  private cardLibrary: Card[] = [];
  
  // 已拾取的卡牌
  private equippedCards: Card[] = [];
  
  // 当前容量
  private currentCapacity: number = 0;
  
  // 最大容量
  private maxCapacity: number = 30;
  
  constructor() {
    // 初始化卡牌库
    this.initCardLibrary();
  }
  
  /**
   * 初始化卡牌库
   */
  private initCardLibrary(): void {
    // 添加基础数值卡
    GameData.BASIC_CARDS.forEach(cardData => {
      this.cardLibrary.push({
        name: cardData.name,
        rarity: cardData.rarity,
        color: cardData.color,
        baseValue: cardData.baseValue,
        maxValue: cardData.maxValue,
        baseCost: cardData.baseCost,
        maxCost: cardData.maxCost,
        description: cardData.description,
        level: 1,
        value: cardData.baseValue,
        cost: cardData.baseCost
      });
    });
    
    // 添加角色专属卡
    GameData.CHARACTER_CARDS.forEach(cardData => {
      this.cardLibrary.push({
        name: cardData.name,
        rarity: cardData.rarity,
        color: cardData.color,
        baseValue: cardData.baseValue,
        maxValue: cardData.maxValue,
        baseCost: cardData.baseCost,
        maxCost: cardData.maxCost,
        description: cardData.description,
        level: 1,
        value: cardData.baseValue,
        cost: cardData.baseCost
      });
    });
    
    console.log(`卡牌库初始化完成，共有 ${this.cardLibrary.length} 张卡牌`);
  }
  
  /**
   * 拾取随机卡牌
   * @param rarity 稀有度（可选）
   */
  pickRandomCard(rarity?: string): Card | null {
    if (this.cardLibrary.length === 0) {
      console.log('卡牌库为空');
      return null;
    }
    
    // 根据稀有度筛选
    let availableCards = this.cardLibrary;
    if (rarity) {
      availableCards = this.cardLibrary.filter(card => card.rarity === rarity);
    }
    
    if (availableCards.length === 0) {
      console.log(`没有 ${rarity} 稀有度的卡牌`);
      return null;
    }
    
    // 随机选择一张卡牌
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const card = availableCards[randomIndex];
    
    console.log(`拾取卡牌：${card.name} (${card.rarity})，消耗 ${card.cost} 容量`);
    return card;
  }
  
  /**
   * 拾取指定卡牌
   * @param cardName 卡牌名称
   */
  pickCardByName(cardName: string): Card | null {
    const card = this.cardLibrary.find(card => card.name === cardName);
    
    if (!card) {
      console.log(`没有找到卡牌 ${cardName}`);
      return null;
    }
    
    console.log(`拾取卡牌：${card.name} (${card.rarity})，消耗 ${card.cost} 容量`);
    return card;
  }
  
  /**
   * 装备卡牌
   * @param card 卡牌
   */
  equipCard(card: Card): boolean {
    // 检查容量
    const totalCost = this.equippedCards.reduce((total, card) => total + card.cost, 0);
    
    if (totalCost + card.cost > this.maxCapacity) {
      console.log(`容量不足，无法装备卡牌 ${card.name} (当前容量：${totalCost}，最大容量：${this.maxCapacity})`);
      return false;
    }
    
    // 装备卡牌
    this.equippedCards.push(card);
    this.currentCapacity = totalCost + card.cost;
    
    console.log(`装备卡牌：${card.name}，当前容量：${this.currentCapacity}/${this.maxCapacity}`);
    return true;
  }
  
  /**
   * 丢弃卡牌
   * @param cardName 卡牌名称
   */
  discardCard(cardName: string): boolean {
    const cardIndex = this.equippedCards.findIndex(card => card.name === cardName);
    
    if (cardIndex === -1) {
      console.log(`没有装备卡牌 ${cardName}`);
      return false;
    }
    
    const card = this.equippedCards[cardIndex];
    this.equippedCards.splice(cardIndex, 1);
    
    // 更新容量
    this.currentCapacity = this.equippedCards.reduce((total, card) => total + card.cost, 0);
    
    console.log(`丢弃卡牌：${card.name}，当前容量：${this.currentCapacity}/${this.maxCapacity}`);
    return true;
  }
  
  /**
   * 升级卡牌
   * @param cardName 卡牌名称
   */
  upgradeCard(cardName: string): boolean {
    const cardIndex = this.equippedCards.findIndex(card => card.name === cardName);
    
    if (cardIndex === -1) {
      console.log(`没有装备卡牌 ${cardName}`);
      return false;
    }
    
    const card = this.equippedCards[cardIndex];
    
    // 检查是否可以升级
    if (card.level >= 10) {
      console.log(`卡牌 ${card.name} 已达到最高等级 ${card.level}`);
      return false;
    }
    
    // 升级卡牌
    card.level += 1;
    
    // 计算升级后的数值
    const upgradeValue = (card.maxValue - card.baseValue) / 9; // 平均升级增加值
    card.value += upgradeValue;
    
    // 计算升级后的消耗
    const upgradeCost = (card.maxCost - card.baseCost) / 9; // 平均升级增加消耗
    card.cost += upgradeCost;
    
    // 更新容量
    this.currentCapacity = this.equippedCards.reduce((total, card) => total + card.cost, 0);
    
    console.log(`升级卡牌：${card.name} 到等级 ${card.level}，消耗 ${card.cost} 容量`);
    return true;
  }
  
  /**
   * 获取卡牌升级消耗
   * @param cardName 卡牌名称
   * @param targetLevel 目标等级
   */
  getUpgradeCost(cardName: string, targetLevel: number): { goldCost: number; fragments: number } {
    const card = this.cardLibrary.find(card => card.name === cardName);
    
    if (!card) {
      console.log(`没有找到卡牌 ${cardName}`);
      return { goldCost: 0, fragments: 0 };
    }
    
    // 根据稀有度确定金币消耗
    let goldCost = 0;
    switch (card.rarity) {
      case '普通':
        goldCost = GameData.CARD_UPGRADE_COST['Lv.1 → Lv.2'].goldCostWhite;
        break;
      case '史诗':
        goldCost = GameData.CARD_UPGRADE_COST['Lv.1 → Lv.2'].goldCostPurple;
        break;
      default:
        goldCost = GameData.CARD_UPGRADE_COST['Lv.1 → Lv.2'].goldCostWhite;
    }
    
    // 计算总金币消耗
    const totalGoldCost = goldCost * (targetLevel - 1);
    
    // 计算碎片消耗（前9级每级2碎片，最后一级10碎片）
    let totalFragments = 0;
    if (targetLevel <= 10) {
      totalFragments = 2 * (targetLevel - 1);
    } else {
      totalFragments = 2 * 9 + 10 * (targetLevel - 10);
    }
    
    return { goldCost: totalGoldCost, fragments: totalFragments };
  }
  
  /**
   * 增加容量
   * @param additionalCapacity 增加的容量
   */
  increaseCapacity(additionalCapacity: number): void {
    this.maxCapacity += additionalCapacity;
    console.log(`容量增加到 ${this.maxCapacity}`);
  }
  
  /**
   * 减少容量
   * @param reducedCapacity 减少的容量
   */
  decreaseCapacity(reducedCapacity: number): void {
    if (this.maxCapacity - reducedCapacity < 30) {
      console.log(`容量不能低于30`);
      return;
    }
    
    this.maxCapacity -= reducedCapacity;
    console.log(`容量减少到 ${this.maxCapacity}`);
  }
  
  /**
   * 获取装备的卡牌
   */
  getEquippedCards(): Card[] {
    return this.equippedCards;
  }
  
  /**
   * 获取当前容量
   */
  getCurrentCapacity(): number {
    return this.currentCapacity;
  }
  
  /**
   * 获取最大容量
   */
  getMaxCapacity(): number {
    return this.maxCapacity;
  }
  
  /**
   * 检查容量是否足够
   * @param cardCost 卡牌消耗
   */
  checkCapacity(cardCost: number): boolean {
    return this.currentCapacity + cardCost <= this.maxCapacity;
  }
  
  /**
   * 重置卡牌系统
   */
  reset(): void {
    this.equippedCards = [];
    this.currentCapacity = 0;
    this.maxCapacity = 30;
    
    console.log('卡牌系统已重置');
  }
  
  /**
   * 计算卡牌提供的总数值加成
   */
  calculateTotalCardBonus(): { attackBonus: number; hpBonus: number; otherBonus: number } {
    let attackBonus = 0;
    let hpBonus = 0;
    let otherBonus = 0;
    
    this.equippedCards.forEach(card => {
      if (card.description.includes('ATK')) {
        attackBonus += card.value;
      } else if (card.description.includes('HP')) {
        hpBonus += card.value;
      } else {
        otherBonus += card.value;
      }
    });
    
    return { attackBonus, hpBonus, otherBonus };
  }
  
  /**
   * 获取卡牌统计信息
   */
  getCardStats(): {
    totalCards: number;
    totalCost: number;
    rarityDistribution: Record<string, number>;
  } {
    const rarityDistribution: Record<string, number> = {};
    
    this.equippedCards.forEach(card => {
      rarityDistribution[card.rarity] = (rarityDistribution[card.rarity] || 0) + 1;
    });
    
    return {
      totalCards: this.equippedCards.length,
      totalCost: this.currentCapacity,
      rarityDistribution
    };
  }
}