/**
 * 经济系统
 * 管理金币、钻石、卡牌碎片的经济系统
 */

export class EconomySystem {
  // 金币
  private gold: number = 0;
  
  // 钻石
  private diamonds: number = 0;
  
  // 卡牌碎片
  private cardFragments: Record<string, number> = {};
  
  // 历史交易记录
  private transactionHistory: Transaction[] = [];
  
  constructor(initialGold: number = 100, initialDiamonds: number = 50) {
    this.gold = initialGold;
    this.diamonds = initialDiamonds;
    this.cardFragments = {};
    this.transactionHistory = [];
    
    console.log('经济系统初始化完成');
  }
  
  /**
   * 获取金币
   */
  getGold(): number {
    return this.gold;
  }
  
  /**
   * 获取钻石
   */
  getDiamonds(): number {
    return this.diamonds;
  }
  
  /**
   * 获取卡牌碎片数量
   * @param cardName 卡牌名称
   */
  getCardFragments(cardName: string): number {
    return this.cardFragments[cardName] || 0;
  }
  
  /**
   * 增加金币
   * @param amount 增加的金币数量
   * @param source 来源
   */
  addGold(amount: number, source: string): void {
    this.gold += amount;
    
    // 记录交易
    this.transactionHistory.push({
      type: 'gold_add',
      amount,
      source,
      timestamp: Date.now()
    });
    
    console.log(`增加 ${amount} 金币，来源：${source}`);
  }
  
  /**
   * 减少金币
   * @param amount 减少的金币数量
   * @param purpose 用途
   */
  subtractGold(amount: number, purpose: string): boolean {
    if (this.gold < amount) {
      console.log(`金币不足，需要 ${amount} 金币，当前 ${this.gold} 金币`);
      return false;
    }
    
    this.gold -= amount;
    
    // 记录交易
    this.transactionHistory.push({
      type: 'gold_subtract',
      amount,
      purpose,
      timestamp: Date.now()
    });
    
    console.log(`减少 ${amount} 金币，用途：${purpose}`);
    return true;
  }
  
  /**
   * 增加钻石
   * @param amount 增加的钻石数量
   * @param source 来源
   */
  addDiamonds(amount: number, source: string): void {
    this.diamonds += amount;
    
    // 记录交易
    this.transactionHistory.push({
      type: 'diamond_add',
      amount,
      source,
      timestamp: Date.now()
    });
    
    console.log(`增加 ${amount} 钻石，来源：${source}`);
  }
  
  /**
   * 减少钻石
   * @param amount 减少的钻石数量
   * @param purpose 用途
   */
  subtractDiamonds(amount: number, purpose: string): boolean {
    if (this.diamonds < amount) {
      console.log(`钻石不足，需要 ${amount} 钻石，当前 ${this.diamonds} 钻石`);
      return false;
    }
    
    this.diamonds -= amount;
    
    // 记录交易
    this.transactionHistory.push({
      type: 'diamond_subtract',
      amount,
      purpose,
      timestamp: Date.now()
    });
    
    console.log(`减少 ${amount} 钻石，用途：${purpose}`);
    return true;
  }
  
  /**
   * 增加卡牌碎片
   * @param cardName 卡牌名称
   * @param amount 增加的碎片数量
   * @param source 来源
   */
  addCardFragments(cardName: string, amount: number, source: string): void {
    if (!this.cardFragments[cardName]) {
      this.cardFragments[cardName] = 0;
    }
    
    this.cardFragments[cardName] += amount;
    
    // 记录交易
    this.transactionHistory.push({
      type: 'fragment_add',
      cardName,
      amount,
      source,
      timestamp: Date.now()
    });
    
    console.log(`增加 ${amount} ${cardName} 碎片，来源：${source}`);
  }
  
  /**
   * 减少卡牌碎片
   * @param cardName 卡牌名称
   * @param amount 减少的碎片数量
   * @param purpose 用途
   */
  subtractCardFragments(cardName: string, amount: number, purpose: string): boolean {
    if (!this.cardFragments[cardName] || this.cardFragments[cardName] < amount) {
      console.log(`${cardName} 碎片不足，需要 ${amount} 碎片，当前 ${this.cardFragments[cardName] || 0} 碎片`);
      return false;
    }
    
    this.cardFragments[cardName] -= amount;
    
    // 记录交易
    this.transactionHistory.push({
      type: 'fragment_subtract',
      cardName,
      amount,
      purpose,
      timestamp: Date.now()
    });
    
    console.log(`减少 ${amount} ${cardName} 碎片，用途：${purpose}`);
    return true;
  }
  
  /**
   * 卡牌升级消耗
   * @param cardName 卡牌名称
   * @param targetLevel 目标等级
   */
  calculateCardUpgradeCost(cardName: string, targetLevel: number): UpgradeCost {
    const baseGoldCost = {
      '普通': 100,
      '进阶': 200,
      '稀有': 300,
      '史诗': 400,
      '角色专属': 200
    };
    
    const cardRarity = this.getCardRarity(cardName);
    const goldCostPerLevel = baseGoldCost[cardRarity] || 100;
    
    // 计算金币消耗
    const totalGoldCost = goldCostPerLevel * (targetLevel - 1);
    
    // 计算碎片消耗（前9级每级2碎片，最后一级10碎片）
    let totalFragments = 0;
    if (targetLevel <= 10) {
      totalFragments = 2 * (targetLevel - 1);
    } else {
      totalFragments = 2 * 9 + 10 * (targetLevel - 10);
    }
    
    return {
      goldCost: totalGoldCost,
      fragments: totalFragments
    };
  }
  
  /**
   * 升级卡牌
   * @param cardName 卡牌名称
   * @param targetLevel 目标等级
   */
  upgradeCard(cardName: string, targetLevel: number): boolean {
    const cost = this.calculateCardUpgradeCost(cardName, targetLevel);
    
    // 检查金币
    if (!this.subtractGold(cost.goldCost, `升级卡牌 ${cardName}`)) {
      console.log(`金币不足，无法升级卡牌 ${cardName}`);
      return false;
    }
    
    // 检查碎片
    if (!this.subtractCardFragments(cardName, cost.fragments, `升级卡牌 ${cardName}`)) {
      console.log(`${cardName} 碎片不足，无法升级卡牌`);
      return false;
    }
    
    console.log(`升级卡牌 ${cardName} 到等级 ${targetLevel}，消耗 ${cost.goldCost} 金币，${cost.fragments} 碎片`);
    return true;
  }
  
  /**
   * 购买皮肤
   * @param skinName 皮肤名称
   * @param price 价格
   */
  buySkin(skinName: string, price: number): boolean {
    if (!this.subtractDiamonds(price, `购买皮肤 ${skinName}`)) {
      console.log(`钻石不足，无法购买皮肤 ${skinName}`);
      return false;
    }
    
    console.log(`购买皮肤 ${skinName}，消耗 ${price} 钻石`);
    return true;
  }
  
  /**
   * 购买礼包
   * @param packName 礼包名称
   * @param price 价格
   */
  buyPack(packName: string, price: number): boolean {
    if (!this.subtractGold(price, `购买礼包 ${packName}`)) {
      console.log(`金币不足，无法购买礼包 ${packName}`);
      return false;
    }
    
    console.log(`购买礼包 ${packName}，消耗 ${price} 金币`);
    return true;
  }
  
  /**
   * 完成任务奖励
   * @param taskName 任务名称
   * @param goldReward 金币奖励
   * @param diamondReward 钻石奖励
   * @param fragmentReward 碎片奖励
   */
  completeTask(taskName: string, goldReward: number, diamondReward: number, fragmentReward: Record<string, number>): void {
    this.addGold(goldReward, `完成任务 ${taskName}`);
    this.addDiamonds(diamondReward, `完成任务 ${taskName}`);
    
    Object.keys(fragmentReward).forEach(cardName => {
      this.addCardFragments(cardName, fragmentReward[cardName], `完成任务 ${taskName}`);
    });
    
    console.log(`完成任务 ${taskName}，获得 ${goldReward} 金币，${diamondReward} 钻石`);
  }
  
  /**
   * 击杀怪物奖励
   * @param monsterName 怪物名称
   * @param goldReward 金币奖励
   * @param fragmentReward 碎片奖励
   */
  killMonsterReward(monsterName: string, goldReward: number, fragmentReward: Record<string, number>): void {
    this.addGold(goldReward, `击杀怪物 ${monsterName}`);
    
    Object.keys(fragmentReward).forEach(cardName => {
      this.addCardFragments(cardName, fragmentReward[cardName], `击杀怪物 ${monsterName}`);
    });
    
    console.log(`击杀怪物 ${monsterName}，获得 ${goldReward} 金币`);
  }
  
  /**
   * Boss击杀奖励
   * @param bossName Boss名称
   * @param goldReward 金币奖励
   * @param diamondReward 钻石奖励
   * @param fragmentReward 碎片奖励
   */
  killBossReward(bossName: string, goldReward: number, diamondReward: number, fragmentReward: Record<string, number>): void {
    this.addGold(goldReward, `击杀Boss ${bossName}`);
    this.addDiamonds(diamondReward, `击杀Boss ${bossName}`);
    
    Object.keys(fragmentReward).forEach(cardName => {
      this.addCardFragrates(cardName, fragmentReward[cardName], `击杀Boss ${bossName}`);
    });
    
    console.log(`击杀Boss ${bossName}，获得 ${goldReward} 金币，${diamondReward} 钻石`);
  }
  
  /**
   * 签到奖励
   */
  dailySignInReward(): void {
    this.addGold(100, `签到奖励`);
    this.addDiamonds(10, `签到奖励`);
    
    // 随机碎片奖励
    const randomCard = getRandomCardName();
    this.addCardFragments(randomCard, 1, `签到奖励`);
    
    console.log(`签到奖励，获得 100 金币，10 钻石，1 ${randomCard} 碎片`);
  }
  
  /**
   * 成就奖励
   * @param achievementName 成就名称
   * @param goldReward 金币奖励
   * @param diamondReward 钻石奖励
   * @param fragmentReward 碎片奖励
   */
  achievementReward(achievementName: string, goldReward: number, diamondReward: number, fragmentReward: Record<string, number>): void {
    this.addGold(goldReward, `成就 ${achievementName}`);
    this.addDiamonds(diamondReward, `成就 ${achievementName}`);
    
    Object.keys(fragmentReward).forEach(cardName => {
      this.addCardFragments(cardName, fragmentReward[cardName], `成就 ${achievementName}`);
    });
    
    console.log(`完成成就 ${achievementName}，获得 ${goldReward} 金币，${diamondReward} 钻石`);
  }
  
  /**
   * 充值奖励
   * @param amount 充值金额
   */
  rechargeReward(amount: number): void {
    const diamondReward = amount * 10; // 1元 = 10钻石
    this.addDiamonds(diamondReward, `充值 ${amount} 元`);
    
    console.log(`充值 ${amount} 元，获得 ${diamondReward} 钻石`);
  }
  
  /**
   * 获取交易历史
   */
  getTransactionHistory(): Transaction[] {
    return this.transactionHistory;
  }
  
  /**
   * 获取经济统计数据
   */
  getEconomyStats(): EconomyStats {
    return {
      gold: this.gold,
      diamonds: this.diamonds,
      fragments: this.cardFragments,
      totalTransactions: this.transactionHistory.length,
      lastTransaction: this.transactionHistory[this.transactionHistory.length - 1]
    };
  }
  
  /**
   * 获取卡牌稀有度
   * @param cardName 卡牌名称
   */
  private getCardRarity(cardName: string): string {
    // 根据卡牌名称确定稀有度
    if (cardName.includes('普通')) return '普通';
    if (cardName.includes('进阶')) return '进阶';
    if (cardName.includes('稀有')) return '稀有';
    if (cardName.includes('史诗')) return '史诗';
    if (cardName.includes('角色专属')) return '角色专属';
    
    return '普通';
  }
  
  /**
   * 重置经济系统
   */
  reset(): void {
    this.gold = 100;
    this.diamonds = 50;
    this.cardFragments = {};
    this.transactionHistory = [];
    
    console.log('经济系统已重置');
  }
}

/**
 * 交易记录
 */
export interface Transaction {
  type: 'gold_add' | 'gold_subtract' | 'diamond_add' | 'diamond_subtract' | 'fragment_add' | 'fragment_subtract';
  amount: number;
  source?: string;
  purpose?: string;
  cardName?: string;
  timestamp: number;
}

/**
 * 升级消耗
 */
export interface UpgradeCost {
  goldCost: number;
  fragments: number;
}

/**
 * 经济统计数据
 */
export interface EconomyStats {
  gold: number;
  diamonds: number;
  fragments: Record<string, number>;
  totalTransactions: number;
  lastTransaction: Transaction;
}

/**
 * 获取随机卡牌名称
 */
function getRandomCardName(): string {
  const cards = [
    '普通攻击卡',
    '普通防御卡',
    '普通生命卡',
    '进阶攻击卡',
    '进阶防御卡',
    '稀有攻击卡',
    '稀有防御卡',
    '史诗攻击卡',
    '史诗防御卡'
  ];
  
  return cards[Math.floor(Math.random() * cards.length)];
}