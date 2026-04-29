/**
 * 关卡系统
 * 管理章节和波数的关卡系统
 */

import { GameData } from './GameData';
import { MonsterGenerator } from './MonsterGenerator';

export interface LevelData {
  chapter: number;
  wave: number;
  monsters: any[];
  boss: any | null;
  difficulty: Difficulty;
  rewards: Reward[];
}

export interface Difficulty {
  hpMultiplier: number;
  attackMultiplier: number;
  defenseMultiplier: number;
}

export interface Reward {
  gold: number;
  diamonds: number;
  fragments: Record<string, number>;
  cards: string[];
}

export class LevelSystem {
  // 当前章节
  private currentChapter: number = 1;
  
  // 当前波数
  private currentWave: number = 1;
  
  // 章节数据
  private chapters: Record<number, ChapterData> = {};
  
  // 波数数据
  private waves: Record<number, WaveData> = {};
  
  // 怪物生成器
  private monsterGenerator: MonsterGenerator;
  
  constructor() {
    this.monsterGenerator = new MonsterGenerator();
    this.initChapters();
    this.initWaves();
    
    console.log('关卡系统初始化完成');
  }
  
  /**
   * 初始化章节数据
   */
  private initChapters(): void {
    GameData.CHAPTER_DIFFICULTY.forEach(chapter => {
      this.chapters[chapter.chapter] = {
        chapter: chapter.chapter,
        levelRange: chapter.levelRange,
        hpMultiplier: chapter.hpMultiplier,
        attackMultiplier: chapter.attackMultiplier,
        defenseMultiplier: chapter.defenseMultiplier,
        designGoal: chapter.designGoal,
        bossWave: chapter.chapter * 10,
        bossName: GameData.BOSSES.find(boss => boss.chapter === chapter.chapter)?.name || '',
        rewards: {
          gold: chapter.chapter * 100,
          diamonds: chapter.chapter * 10,
          fragments: {},
          cards: []
        }
      };
    });
    
    console.log(`初始化 ${Object.keys(this.chapters).length} 个章节`);
  }
  
  /**
   * 初始化波数数据
   */
  private initWaves(): void {
    for (let wave = 1; wave <= 50; wave++) {
      const difficulty = {
        hpMultiplier: 1 + wave * 0.2,
        attackMultiplier: 1 + wave * 0.15,
        defenseMultiplier: 1 + wave * 0.1
      };
      
      const monsterCount = this.getMonsterCountByWave(wave);
      
      const rewards = {
        gold: wave * 5,
        diamonds: wave % 5 === 0 ? 1 : 0,
        fragments: {},
        cards: []
      };
      
      this.waves[wave] = {
        wave,
        difficulty,
        monsterCount,
        rewards,
        bossWave: wave % 10 === 0
      };
    }
    
    console.log(`初始化 ${Object.keys(this.waves).length} 个波数`);
  }
  
  /**
   * 根据波数获取怪物数量
   */
  private getMonsterCountByWave(wave: number): number {
    if (wave <= 5) {
      return 5 + wave; // 波数1-5：6-10个怪物
    } else if (wave <= 10) {
      return 10 + wave; // 波数6-10：11-20个怪物
    } else if (wave <= 15) {
      return 15 + wave; // 波数11-15：16-30个怪物
    } else if (wave <= 20) {
      return 20 + wave; // 波数16-20：21-40个怪物
    } else {
      return 25 + wave; // 波数21-50：26-75个怪物
    }
  }
  
  /**
   * 开始关卡
   * @param chapter 章节
   * @param wave 波数
   */
  startLevel(chapter: number, wave: number = 1): LevelData {
    this.currentChapter = chapter;
    this.currentWave = wave;
    
    // 设置怪物生成器
    this.monsterGenerator.setChapter(chapter);
    this.monsterGenerator.setWave(wave);
    
    // 生成怪物
    const monsters = this.monsterGenerator.generateWaveMonsters();
    
    // 生成Boss
    const boss = wave === this.chapters[chapter].bossWave ? this.monsterGenerator.generateBoss() : null;
    
    // 获取难度
    const difficulty = this.monsterGenerator.calculateWaveDifficulty();
    
    // 获取奖励
    const rewards = this.getWaveRewards(chapter, wave);
    
    const levelData: LevelData = {
      chapter,
      wave,
      monsters,
      boss,
      difficulty,
      rewards
    };
    
    console.log(`开始关卡：第 ${chapter} 章，第 ${wave} 波`);
    return levelData;
  }
  
  /**
   * 下一波
   */
  nextWave(): LevelData {
    this.currentWave += 1;
    
    // 检查是否进入下一章节
    if (this.currentWave > 10 && this.currentWave % 10 === 1) {
      this.currentChapter += 1;
    }
    
    // 生成下一波
    return this.startLevel(this.currentChapter, this.currentWave);
  }
  
  /**
   * 下一章节
   */
  nextChapter(): LevelData {
    this.currentChapter += 1;
    this.currentWave = 1;
    
    // 生成下一章节第一波
    return this.startLevel(this.currentChapter, this.currentWave);
  }
  
  /**
   * 重新开始关卡
   */
  restartLevel(): LevelData {
    this.currentWave = 1;
    return this.startLevel(this.currentChapter, this.currentWave);
  }
  
  /**
   * 获取波数奖励
   */
  private getWaveRewards(chapter: number, wave: number): Reward {
    const waveRewards = this.waves[wave].rewards;
    const chapterRewards = this.chapters[chapter].rewards;
    
    // 基础奖励
    const rewards: Reward = {
      gold: waveRewards.gold + chapterRewards.gold,
      diamonds: waveRewards.diamonds + chapterRewards.diamonds,
      fragments: {},
      cards: []
    };
    
    // 碎片奖励（随机）
    const randomCard = getRandomCardName();
    rewards.fragments[randomCard] = 1;
    
    // Boss掉落奖励
    if (wave === this.chapters[chapter].bossWave) {
      const bossData = GameData.getBoss(chapter);
      if (bossData) {
        rewards.cards.push(bossData.dropCard);
      }
    }
    
    return rewards;
  }
  
  /**
   * 完成关卡奖励
   */
  completeLevelRewards(): Reward {
    const waveRewards = this.waves[this.currentWave].rewards;
    const chapterRewards = this.chapters[this.currentChapter].rewards;
    
    // 关卡完成奖励
    const rewards: Reward = {
      gold: waveRewards.gold + chapterRewards.gold * 2,
      diamonds: waveRewards.diamonds + chapterRewards.diamonds * 2,
      fragments: {},
      cards: []
    };
    
    // 完成章节奖励
    if (this.currentWave === 10) {
      rewards.gold += 500; // 章节完成额外奖励
      rewards.diamonds += 50; // 章节完成额外奖励
      
      // Boss掉落奖励
      const bossData = GameData.getBoss(this.currentChapter);
      if (bossData) {
        rewards.cards.push(bossData.dropCard);
      }
    }
    
    return rewards;
  }
  
  /**
   * 获取关卡难度
   */
  getLevelDifficulty(): Difficulty {
    return {
      hpMultiplier: this.waves[this.currentWave].difficulty.hpMultiplier * this.chapters[this.currentChapter].hpMultiplier,
      attackMultiplier: this.waves[this.currentWave].difficulty.attackMultiplier * this.chapters[this.currentChapter].attackMultiplier,
      defenseMultiplier: this.waves[this.currentWave].difficulty.defenseMultiplier * this.chapters[this.currentChapter].defenseMultiplier
    };
  }
  
  /**
   * 获取怪物生成策略
   */
  getMonsterGenerationStrategy(): MonsterGenerationStrategy {
    const chapterData = this.chapters[this.currentChapter];
    const waveData = this.waves[this.currentWave];
    
    return {
      monsterCount: waveData.monsterCount,
      bossWave: waveData.bossWave,
      bossName: chapterData.bossName,
      rewards: waveData.rewards
    };
  }
  
  /**
   * 获取关卡进度
   */
  getLevelProgress(): LevelProgress {
    const chapterData = this.chapters[this.currentChapter];
    const waveData = this.waves[this.currentWave];
    
    return {
      chapter: this.currentChapter,
      wave: this.currentWave,
      chapterProgress: `${chapterData.levelRange}`,
      waveProgress: `${waveData.monsterCount} 怪物`,
      difficultyProgress: `${this.getLevelDifficulty().hpMultiplier}x 难度`
    };
  }
  
  /**
   * 获取关卡历史
   */
  getLevelHistory(): LevelHistory[] {
    const history: LevelHistory[] = [];
    
    // 添加当前章节历史
    history.push({
      chapter: this.currentChapter,
      wave: this.currentWave,
      status: '进行中',
      completionDate: Date.now(),
      rewards: this.waves[this.currentWave].rewards
    });
    
    // 添加已完成章节历史
    for (let chapter = 1; chapter < this.currentChapter; chapter++) {
      const chapterData = this.chapters[chapter];
      history.push({
        chapter,
        wave: chapterData.bossWave,
        status: '已完成',
        completionDate: Date.now(),
        rewards: chapterData.rewards
      });
    }
    
    return history;
  }
  
  /**
   * 获取章节信息
   * @param chapter 章节
   */
  getChapterInfo(chapter: number): ChapterData {
    return this.chapters[chapter];
  }
  
  /**
   * 获取波数信息
   * @param wave 波数
   */
  getWaveInfo(wave: number): WaveData {
    return this.waves[wave];
  }
  
  /**
   * 获取当前章节
   */
  getCurrentChapter(): number {
    return this.currentChapter;
  }
  
  /**
   * 获取当前波数
   */
  getCurrentWave(): number {
    return this.currentWave;
  }
  
  /**
   * 获取怪物生成器
   */
  getMonsterGenerator(): MonsterGenerator {
    return this.monsterGenerator;
  }
}

/**
 * 章节数据
 */
export interface ChapterData {
  chapter: number;
  levelRange: string;
  hpMultiplier: number;
  attackMultiplier: number;
  defenseMultiplier: number;
  designGoal: string;
  bossWave: number;
  bossName: string;
  rewards: Reward;
}

/**
 * 波数数据
 */
export interface WaveData {
  wave: number;
  difficulty: Difficulty;
  monsterCount: number;
  rewards: Reward;
  bossWave: boolean;
}

/**
 * 怪物生成策略
 */
export interface MonsterGenerationStrategy {
  monsterCount: number;
  bossWave: boolean;
  bossName: string;
  rewards: Reward;
}

/**
 * 关卡进度
 */
export interface LevelProgress {
  chapter: number;
  wave: number;
  chapterProgress: string;
  waveProgress: string;
  difficultyProgress: string;
}

/**
 * 关卡历史
 */
export interface LevelHistory {
  chapter: number;
  wave: number;
  status: '已完成' | '进行中' | '失败';
  completionDate: number;
  rewards: Reward;
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