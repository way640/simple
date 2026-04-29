/**
 * 游戏数据
 * 存储游戏的所有数值数据
 */

export interface CardData {
  name: string;
  rarity: string;
  color: string;
  baseValue: number;
  maxValue: number;
  baseCost: number;
  maxCost: number;
  description: string;
}

export interface CharacterData {
  name: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  attackRange: number;
  attackSpeed: number;
  skills: SkillData[];
}

export interface SkillData {
  name: string;
  description: string;
  baseCoefficient: number;
  maxCoefficient: number;
  cooldown: number;
  range?: number;
  specialEffect?: string;
}

export interface MonsterData {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  wave: number;
  chapter: number;
  dropItems: string[];
}

export interface BossData {
  name: string;
  hpMultiplier: number;
  attackMultiplier: number;
  defenseMultiplier: number;
  wave: number;
  chapter: number;
  specialSkill: string;
  dropCard: string;
}

// 数值数据管理器
export class GameData {
  // 基础数值卡（60张）
  static readonly BASIC_CARDS: CardData[] = [
    {
      name: '普通攻击卡',
      rarity: '普通',
      color: '⚪ 白',
      baseValue: 10,
      maxValue: 20,
      baseCost: 2,
      maxCost: 4,
      description: '+10 ATK/HP'
    },
    {
      name: '进阶攻击卡',
      rarity: '进阶',
      color: '🟢 绿',
      baseВаlue: 20,
      maxValue: 40,
      baseCost: 4,
      maxCost: 8,
      description: '+20 ATK/HP'
    },
    {
      name: '稀有攻击卡',
      rarity: '稀有',
      color: '🔵 蓝',
      baseВаlue: 30,
      maxValue: 60,
      baseCost: 6,
      maxCost: 12,
      description: '+30 ATK/HP'
    },
    {
      name: '史诗攻击卡',
      rarity: '史诗',
      color: '🟣 紫',
      baseВаlue: 40,
      maxValue: 80,
      baseCost: 8,
      maxCost: 16,
      description: '+40 ATK/HP'
    }
  ];
  
  // 角色专属卡（20张）- 示例
  static readonly CHARACTER_CARDS: CardData[] = [
    {
      name: '旋风斩范围',
      rarity: '角色专属',
      color: '🟢 绿',
      baseВаlue: 20,
      maxValue: 40,
      baseCost: 4,
      maxCost: 8,
      description: '+20% 范围'
    },
    {
      name: '箭矢穿透',
      rarity: '角色专属',
      color: '🟢 绿',
      baseВаlue: 1,
      maxValue: 2,
      baseCost: 4,
      maxCost: 8,
      description: '+1 穿透'
    },
    {
      name: '召唤物生命',
      rarity: '角色专属',
      color: '🔵 蓝',
      baseВаlue: 30,
      maxValue: 60,
      baseCost: 6,
      maxCost: 12,
      description: '+30% HP'
    }
  ];
  
  // 角色数据
  static readonly CHARACTERS: CharacterData[] = [
    {
      name: '雷恩',
      type: '近战坦克',
      hp: 1500,
      attack: 60,
      defense: 50,
      speed: 2.5,
      attackRange: 1.5,
      attackSpeed: 1.2,
      skills: [
        {
          name: '旋风斩',
          description: '旋转攻击周围的敌人',
          baseCoefficient: 2.0,
          maxCoefficient: 3.5,
          cooldown: 6,
          range: 3,
          specialEffect: '吸血效果：15%'
        }
      ]
    },
    {
      name: '薇拉',
      type: '远程射手',
      hp: 1000,
      attack: 80,
      defense: 30,
      speed: 3.5,
      attackRange: 10,
      attackSpeed: 0.8,
      skills: [
        {
          name: '多重射击',
          description: '发射多个箭矢',
          baseCoefficient: 2.0,
          maxCoefficient: 3.5,
          cooldown: 5,
          specialEffect: '子弹数：5'
        }
      ]
    },
    {
      name: '卡尔',
      type: '法师控场',
      hp: 800,
      attack: 70,
      defense: 20,
      speed: 3.0,
      attackRange: 8,
      attackSpeed: 1.0,
      skills: [
        {
          name: '引力场',
          description: '将敌人拉向中心',
          baseCoefficient: 2.0,
          maxCoefficient: 3.5,
          cooldown: 7,
          range: 5,
          specialEffect: '控场效果：将敌人拉向中心'
        }
      ]
    },
    {
      name: '艾莉',
      type: '召唤师',
      hp: 1200,
      attack: 50,
      defense: 40,
      speed: 2.8,
      attackRange: 3,
      attackSpeed: 1.5,
      skills: [
        {
          name: '召唤护卫',
          description: '召唤2个护卫',
          baseCoefficient: 1.0,
          maxCoefficient: 1.0,
          cooldown: 8,
          specialEffect: '召唤数量：2个，护卫血量：300，护卫攻击：40，护卫防御：20，持续时间：10秒'
        }
      ]
    }
  ];
  
  // 角色成长曲线
  static readonly CHARACTER_GROWTH = {
    'Lv.1': { attack: 10, hp: 100, defense: 5 },
    'Lv.10': { attack: 15, hp: 150, defense: 8 },
    'Lv.20': { attack: 22, hp: 220, defense: 12 },
    'Lv.30': { attack: 32, hp: 320, defense: 18 },
    'Lv.40': { attack: 45, hp: 450, defense: 25 },
    'Lv.50': { attack: 60, hp: 600, defense: 35 }
  };
  
  // 容量系统
  static readonly CAPACITY_SYSTEM = {
    'Lv.1': 30,
    'Lv.10': 36,
    'Lv.20': 42,
    'Lv.30': 48,
    'Lv.40': 54,
    'Lv.50': 60
  };
  
  // 章节难度曲线
  static readonly CHAPTER_DIFFICULTY = [
    { chapter: 1, levelRange: '1-10', hpMultiplier: 1.0, attackMultiplier: 1.0, defenseMultiplier: 1.0 },
    { chapter: 2, levelRange: '11-20', hpMultiplier: 1.5, attackMultiplier: 1.4, defenseMultiplier: 1.3 },
    { chapter: 3, levelRange: '21-30', hpMultiplier: 2.2, attackMultiplier: 2.0, defenseMultiplier: 1.8 },
    { chapter: 4, levelRange: '31-40', hpMultiplier: 3.5, attackMultiplier: 3.0, defenseMultiplier: 2.5 },
    { chapter: 5, levelRange: '41-50', hpMultiplier: 5.0, attackMultiplier: 4.5, defenseMultiplier: 3.5 }
  ];
  
  // Boss数据
  static readonly BOSSES: BossData[] = [
    {
      name: '第一章·石头人',
      hpMultiplier: 50,
      attackMultiplier: 3,
      defenseMultiplier: 2,
      wave: 10,
      chapter: 1,
      specialSkill: '砸地眩晕',
      dropCard: '保证一张机制卡'
    },
    {
      name: '第二章·飞行怪',
      hpMultiplier: 80,
      attackMultiplier: 4,
      defenseMultiplier: 3,
      wave: 20,
      chapter: 2,
      specialSkill: '全屏弹幕',
      dropCard: '保证一张角色专属卡'
    },
    {
      name: '第三章·双子怪',
      hpMultiplier: 60,
      attackMultiplier: 3.5,
      defenseMultiplier: 2.5,
      wave: 30,
      chapter: 3,
      specialSkill: '互相召唤',
      dropCard: '保证一张终极金卡'
    },
    {
      name: '第四章·狂暴怪',
      hpMultiplier: 100,
      attackMultiplier: 6,
      defenseMultiplier: 4,
      wave: 40,
      chapter: 4,
      specialSkill: '狂暴状态，攻击力翻倍',
      dropCard: '随机高品质卡牌'
    },
    {
      name: '第五章·终局Boss',
      hpMultiplier: 120,
      attackMultiplier: 8,
      defenseMultiplier: 6,
      wave: 50,
      chapter: 5,
      specialSkill: '多重技能组合',
      dropCard: '随机高品质卡牌'
    }
  ];
  
  // 卡牌升级消耗
  static readonly CARD_UPGRADE_COST = {
    'Lv.1 → Lv.2': { goldCostWhite: 100, goldCostPurple: 300, fragments: 2 },
    'Lv.2 → Lv.3': { goldCostWhite: 200, goldCostPurple: 600, fragments: 2 },
    'Lv.3 → Lv.4': { goldCostWhite: 300, goldCostPurple: 900, fragments: 2 },
    'Lv.4 → Lv.5': { goldCostWhite: 400, goldCostPurple: 1200, fragments: 2 },
    'Lv.5 → Lv.桔': { goldCostWhite: 500, goldCostPurple: 1500, fragments: 2 },
    'Lv.6 → Lv.7': { goldCostWhite: 600, goldCostPurple: 1800, fragments: 2 },
    'Lv.7 → Lv.8': { goldCostWhite: 700, goldCostPurple: 2100, fragments: 2 },
    'Lv.8 → Lv.9': { goldCostWhite: 800, goldCostPurple: 2400, fragments: 2 },
    'Lv.9 → Lv.10': { goldCostWhite: 900, goldCostPurple: 2700, fragments: 2 },
    'Lv.10 → Lv.11': { goldCostWhite: 1000, goldCostPurple: 3000, fragments: 10 }
  };
  
  // 获取角色数据
  static getCharacter(name: string): CharacterData | null {
    return GameData.CHARACTERS.find(character => character.name === name) || null;
  }
  
  // 获取卡牌数据
  static getCard(name: string): CardData | null {
    const card = GameData.BASIC_CARDS.find(card => card.name === name);
    if (card) return card;
    
    return GameData.CHARACTER_CARDS.find(card => card.name === name) || null;
  }
  
  // 获取Boss数据
  static getBoss(chapter: number): BossData | null {
    return GameData.BOSSES.find(boss => boss.chapter === chapter) || null;
  }
  
  // 获取章节难度
  static getChapterDifficulty(chapter: number) {
    return GameData.CHAPTER_DIFFICULTY.find(diff => diff.chapter === chapter) || GameData.CHAPTER_DIFFICULTY[0];
  }
}