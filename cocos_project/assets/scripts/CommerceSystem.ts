/**
 * 商业化功能系统
 * 管理皮肤、礼包、商城系统
 */

import { EconomySystem } from './EconomySystem';

export interface Skin {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'diamond' | 'gold';
  rarity: string;
  statBonus: SkinStatBonus;
  effect: string;
}

export interface SkinStatBonus {
  goldBonus?: number;
  experienceBonus?: number;
  attackBonus?: number;
  defenseBonus?: number;
  hpBonus?: number;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'diamond' | 'gold';
  rarity: string;
  contents: PackContents;
  discount?: number;
}

export interface PackContents {
  gold: number;
  diamonds: number;
  fragments: Record<string, number>;
  skins: string[];
  cards: string[];
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'diamond' | 'gold';
  rarity: string;
  category: string;
  statBonus?: ShopItemStatBonus;
  effect?: string;
}

export interface ShopItemStatBonus {
  goldBonus?: number;
  experienceBonus?: number;
  attackBonus?: number;
  defenseBonus?: number;
  hpBonus?: number;
}

export interface PurchaseHistory {
  id: string;
  itemId: string;
  itemName: string;
  price: number;
  currency: 'diamond' | 'gold';
  purchaseDate: number;
}

export class CommerceSystem {
  // 经济系统
  private economySystem: EconomySystem;
  
  // 皮肤列表
  private skins: Skin[] = [];
  
  // 礼包列表
  private packs: Pack[] = [];
  
  // 商城物品列表
  private shopItems: ShopItem[] = [];
  
  // 购买历史
  private purchaseHistory: PurchaseHistory[] = [];
  
  constructor(economySystem: EconomySystem) {
    this.economySystem = economySystem;
    this.initSkins();
    this.initPacks();
    this.initShopItems();
    
    console.log('商业化功能系统初始化完成');
  }
  
  /**
   * 初始化皮肤列表
   */
  private initSkins(): void {
    this.skins = [
      {
        id: 'skin_classic',
        name: '经典皮肤',
        description: '基础皮肤',
        price: 0,
        currency: 'gold',
        rarity: '普通',
        statBonus: {},
        effect: '无'
      },
      {
        id: 'skin_advanced',
        name: '进阶皮肤',
        description: '进阶皮肤',
        price: 6,
        currency: 'diamond',
        rarity: '进阶',
        statBonus: {
          goldBonus: 5
        },
        effect: '+5% 金币获取'
      },
      {
        id: 'skin_season',
        name: '赛季皮肤',
        description: '赛季皮肤',
        price: 30,
        currency: 'diamond',
        rarity: '稀有',
        statBonus: {
          experienceBonus: 10
        },
        effect: '+10% 经验获取'
      },
      {
        id: 'skin_limited',
        name: '限定皮肤',
        description: '限定皮肤',
        price: 68,
        currency: 'diamond',
        rarity: '史诗',
        statBonus: {},
        effect: '专属特效'
      }
    ];
    
    console.log(`初始化 ${this.skins.length} 个皮肤`);
  }
  
  /**
   * 初始化礼包列表
   */
  private initPacks(): void {
    this.packs = [
      {
        id: 'pack_new_player',
        name: '新手助力包',
        description: '新手助力包',
        price: 6,
        currency: 'diamond',
        rarity: '普通',
        contents: {
          gold: 5000,
          diamonds: 0,
          fragments: {
            '普通攻击卡': 10,
            '普通防御卡': 10,
            '普通生命卡': 10
          },
          skins: ['skin_classic'],
          cards: []
        }
      },
      {
        id: 'pack_growth_fund',
        name: '成长基金',
        description: '成长基金',
        price: 30,
        currency: 'diamond',
        rarity: '稀有',
        contents: {
          gold: 30000,
          diamonds: 3000,
          fragments: {},
          skins: [],
          cards: []
        },
        discount: 20
      },
      {
        id: 'pack_premium_monthly',
        name: '至尊月卡',
        description: '至尊月卡',
        price: 30,
        currency: 'diamond',
        rarity: '稀有',
        contents: {
          gold: 0,
          diamonds: 3000,
          fragments: {},
          skins: [],
          cards: []
        }
      }
    ];
    
    console.log(`初始化 ${this.packs.length} 个礼包`);
  }
  
  /**
   * 初始化商城物品列表
   */
  private initShopItems(): void {
    this.shopItems = [
      {
        id: 'item_gold_pack_1',
        name: '金币礼包1',
        description: '金币礼包1',
        price: 10,
        currency: 'diamond',
        rarity: '普通',
        category: '金币',
        contents: {
          gold: 10000,
          diamonds: 0,
          fragments: {},
          skins: [],
          cards: []
        }
      },
      {
        id: 'item_gold_pack_2',
        name: '金币礼包2',
        description: '金币礼包2',
        price: 20,
        currency: 'diamond',
        rarity: '进阶',
        category: '金币',
        contents: {
          gold: 20000,
          diamonds: 0,
          fragments: {},
          skins: [],
          cards: []
        }
      },
      {
        id: 'item_diamond_pack_1',
        name: '钻石礼包1',
        description: '钻石礼包1',
        price: 6,
        currency: 'diamond',
        rarity: '普通',
        category: '钻石',
        contents: {
          gold: 0,
          diamonds: 60,
          fragments: {},
          skins: [],
          cards: []
        }
      },
      {
        id: 'item_diamond_pack_2',
        name: '钻石礼包2',
        description: '钻石礼包2',
        price: 30,
        currency: 'diamond',
        rarity: '进阶',
        category: '钻石',
        contents: {
          gold: 0,
          diamonds: 300,
          fragments: {},
          skins: [],
          cards: []
        }
      },
      {
        id: 'item_fragment_pack_1',
        name: '碎片礼包1',
        description: '碎片礼包1',
        price: 10,
        currency: 'diamond',
        rarity: '普通',
        category: '碎片',
        contents: {
          gold: 0,
          diamonds: 0,
          fragments: {
            '普通攻击卡': 20,
            '普通防御卡': 20,
            '普通生命卡': 20
          },
          skins: [],
          cards: []
        }
      },
      {
        id: 'item_card_pack_1',
        name: '卡牌礼包1',
        description: '卡牌礼包1',
        price: 20,
        currency: 'diamond',
        rarity: '稀有',
        category: '卡牌',
        contents: {
          gold: 0,
          diamonds: 0,
          fragments: {},
          skins: [],
          cards: [
            '进阶攻击卡',
            '进阶防御卡',
            '稀有攻击卡',
            '稀有防御卡'
          ]
        }
      }
    ];
    
    console.log(`初始化 ${this.shopItems.length} 个商城物品`);
  }
  
  /**
   * 购买皮肤
   * @param skinId 皮肤ID
   */
  buySkin(skinId: string): boolean {
    const skin = this.skins.find(s => s.id === skinId);
    
    if (!skin) {
      console.log(`皮肤 ${skinId} 不存在`);
      return false;
    }
    
    // 检查货币
    if (skin.currency === 'diamond') {
      if (!this.economySystem.subtractDiamonds(skin.price, `购买皮肤 ${skin.name}`)) {
        console.log(`钻石不足，无法购买皮肤 ${skin.name}`);
        return false;
      }
    } else if (skin.currency === 'gold') {
      if (!this.economySystem.subtractGold(skin.price, `购买皮肤 ${skin.name}`)) {
        console.log(`金币不足，无法购买皮肤 ${skin.name}`);
        return false;
      }
    }
    
    // 记录购买历史
    this.purchaseHistory.push({
      id: `${skin.id}_${Date.now()}`,
      itemId: skin.id,
      itemName: skin.name,
      price: skin.price,
      currency: skin.currency,
      purchaseDate: Date.now()
    });
    
    console.log(`购买皮肤 ${skin.name}，消耗 ${skin.price} ${skin.currency}`);
    return true;
  }
  
  /**
   * 购买礼包
   * @param packId 礼包ID
   */
  buyPack(packId: string): boolean {
    const pack = this.packs.find(p => p.id === packId);
    
    if (!pack) {
      console.log(`礼包 ${packId} 不存在`);
      return false;
    }
    
    // 检查货币
    if (pack.currency === 'diamond') {
      if (!this.economySystem.subtractDiamonds(pack.price, `购买礼包 ${pack.name}`)) {
        console.log(`钻石不足，无法购买礼包 ${pack.name}`);
        return false;
      }
    } else if (pack.currency === 'gold') {
      if (!this.economySystem.subtractGold(pack.price, `购买礼包 ${pack.name}`)) {
        console.log(`金币不足，无法购买礼包 ${pack.name}`);
        return false;
      }
    }
    
    // 应用折扣
    const finalPrice = pack.discount ? pack.price * (1 - pack.discount / 100) : pack.price;
    
    // 发放礼包内容
    this.deliverPackContents(pack);
    
    // 记录购买历史
    this.purchaseHistory.push({
      id: `${pack.id}_${Date.now()}`,
      itemId: pack.id,
      itemName: pack.name,
      price: finalPrice,
      currency: pack.currency,
      purchaseDate: Date.now()
    });
    
    console.log(`购买礼包 ${pack.name}，消耗 ${finalPrice} ${pack.currency}`);
    return true;
  }
  
  /**
   * 购买商城物品
   * @param itemId 物品ID
   */
  buyShopItem(itemId: string): boolean {
    const item = this.shopItems.find(i => i.id === itemId);
    
    if (!item) {
      console.log(`商城物品 ${itemId} 不存在`);
      return false;
    }
    
    // 检查货币
    if (item.currency === 'diamond') {
      if (!this.economySystem.subtractDiamonds(item.price, `购买商城物品 ${item.name}`)) {
        console.log(`钻石不足，无法购买商城物品 ${item.name}`);
        return false;
      }
    } else if (item.currency === 'gold') {
      if (!this.economySystem.subtractGold(item.price, `购买商城物品 ${item.name}`)) {
        console.log(`金币不足，无法购买商城物品 ${item.name}`);
        return false;
      }
    }
    
    // 发放物品内容
    this.deliverShopItemContents(item);
    
    // 记录购买历史
    this.purchaseHistory.push({
      id: `${item.id}_${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      currency: item.currency,
      purchaseDate: Date.now()
    });
    
    console.log(`购买商城物品 ${item.name}，消耗 ${item.price} ${item.currency}`);
    return true;
  }
  
  /**
   * 发放礼包内容
   * @param pack 礼包
   */
  private deliverPackContents(pack: Pack): void {
    // 发放金币
    if (pack.contents.gold > 0) {
      this.economySystem.addGold(pack.contents.gold, `礼包 ${pack.name}`);
    }
    
    // 发放钻石
    if (pack.contents.diamonds > 0) {
      this.economySystem.addDiamonds(pack.contents.diamonds, `礼包 ${pack.name}`);
    }
    
    // 发放碎片
    Object.keys(pack.contents.fragments).forEach(cardName => {
      this.economySystem.addCardFragments(cardName, pack.contents.fragments[cardName], `礼包 ${pack.name}`);
    });
    
    // 发放皮肤
    pack.contents.skins.forEach(skinId => {
      console.log(`礼包 ${pack.name} 发放皮肤 ${skinId}`);
    });
    
    // 发放卡牌
    pack.contents.cards.forEach(cardName => {
      console.log(`礼包 ${pack.name} 发放卡牌 ${cardName}`);
    });
    
    console.log(`礼包 ${pack.name} 发放完成`);
  }
  
  /**
   * 发放商城物品内容
   * @param item 商城物品
   */
  private deliverShopItemContents(item: ShopItem): void {
    // 发放金币
    if (item.contents.gold > 0) {
      this.economySystem.addGold(item.contents.gold, `商城物品 ${item.name}`);
    }
    
    // 发放钻石
    if (item.contents.diamonds > 0) {
      this.economySystem.addDiamonds(item.contents.diamonds, `商城物品 ${item.name}`);
    }
    
    // 发放碎片
    Object.keys(item.contents.fragments).forEach(cardName => {
      this.economySystem.addCardFragments(cardName, item.contents.fragments[cardName], `商城物品 ${item.name}`);
    });
    
    // 发放卡牌
    item.contents.cards.forEach(cardName => {
      console.log(`商城物品 ${item.name} 发放卡牌 ${cardName}`);
    });
    
    console.log(`商城物品 ${item.name} 发放完成`);
  }
  
  /**
   * 获取皮肤列表
   */
  getSkins(): Skin[] {
    return this.skins;
  }
  
  /**
   * 获取礼包列表
   */
  getPacks(): Pack[] {
    return this.packs;
  }
  
  /**
   * 获取商城物品列表
   */
  getShopItems(): ShopItem[] {
    return this.shopItems;
  }
  
  /**
   * 获取购买历史
   */
  getPurchaseHistory(): PurchaseHistory[] {
    return this.purchaseHistory;
  }
  
  /**
   * 获取皮肤信息
   * @param skinId 皮肤ID
   */
  getSkin(skinId: string): Skin | null {
    return this.skins.find(s => s.id === skinId) || null;
  }
  
  /**
   * 获取礼包信息
   * @param packId 礼包ID
   */
  getPack(packId: string): Pack | null {
    return this.packs.find(p => p.id === packId) || null;
  }
  
  /**
   * 获取商城物品信息
   * @param itemId 物品ID
   */
  getShopItem(itemId: string): ShopItem | null {
    return this.shopItems.find(i => i.id === itemId) || null;
  }
  
  /**
   * 获取商城物品分类
   * @param category 分类
   */
  getShopItemsByCategory(category: string): ShopItem[] {
    return this.shopItems.filter(item => item.category === category);
  }
  
  /**
   * 获取皮肤属性加成
   * @param skinId 皮肤ID
   */
  getSkinStatBonus(skinId: string): SkinStatBonus {
    const skin = this.getSkin(skinId);
    return skin?.statBonus || {};
  }
  
  /**
   * 获取礼包折扣价格
   * @param packId 礼包ID
   */
  getPackDiscountPrice(packId: string): number {
    const pack = this.getPack(packId);
    
    if (!pack) return 0;
    
    if (pack.discount) {
      return pack.price * (1 - pack.discount / 100);
    }
    
    return pack.price;
  }
  
  /**
   * 获取商城物品价格
   * @param itemId 物品ID
   */
  getShopItemPrice(itemId: string): number {
    const item = this.getShopItem(itemId);
    return item?.price || 0;
  }
  
  /**
   * 获取购买历史统计
   */
  getPurchaseStatistics(): PurchaseStatistics {
    const totalGoldSpent = this.purchaseHistory.filter(p => p.currency === 'gold').reduce((total, p) => total + p.price, 0);
    const totalDiamondsSpent = this.purchaseHistory.filter(p => p.currency === 'diamond').reduce((total, p) => total + p.price, 0);
    
    const totalPurchases = this.purchaseHistory.length;
    const averagePurchasePrice = totalPurchases > 0 ? (totalGoldSpent + totalDiamondsSpent) / totalPurchases : 0;
    
    return {
      totalPurchases,
      totalGoldSpent,
      totalDiamondsSpent,
      averagePurchasePrice
    };
  }
  
  /**
   * 重置商业化系统
   */
  reset(): void {
    this.purchaseHistory = [];
    console.log('商业化系统已重置');
  }
}

/**
 * 购买统计
 */
export interface PurchaseStatistics {
  totalPurchases: number;
  totalGoldSpent: number;
  totalDiamondsSpent: number;
  averagePurchasePrice: number;
}

/**
 * 商业化系统测试
 */
export function testCommerceSystem() {
  const economySystem = new EconomySystem();
  const commerceSystem = new CommerceSystem(economySystem);
  
  console.log('=== 商业化系统测试 ===');
  
  // 测试获取皮肤列表
  const skins = commerceSystem.getSkins();
  console.log(`皮肤列表：${skins.length} 个`);
  
  // 测试获取礼包列表
  const packs = commerceSystem.getPacks();
  console.log(`礼包列表：${packs.length} 个`);
  
  // 测试获取商城物品列表
  const shopItems = commerceSystem.getShopItems();
  console.log(`商城物品列表：${shopItems.length} 个`);
  
  // 测试购买皮肤
  console.log('购买进阶皮肤：');
  const skinResult = commerceSystem.buySkin('skin_advanced');
  console.log(`购买结果：${skinResult}`);
  
  // 测试购买礼包
  console.log('购买新手助力包：');
  const packResult = commerceSystem.buyPack('pack_new_player');
  console.log(`购买结果：${packResult}`);
  
  // 测试购买商城物品
  console.log('购买金币礼包1：');
  const itemResult = commerceSystem.buyShopItem('item_gold_pack_1');
  console.log(`购买结果：${itemResult}`);
  
  // 测试获取购买历史
  const purchaseHistory = commerceSystem.getPurchaseHistory();
  console.log(`购买历史：${purchaseHistory.length} 条`);
  
  // 测试获取购买统计
  const purchaseStatistics = commerceSystem.getPurchaseStatistics();
  console.log(`购买统计：${purchaseStatistics.totalPurchases} 条`);
  
  console.log('=== 商业化系统测试完成 ===');
}