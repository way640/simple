/**
 * 主场景
 * 游戏主场景控制器
 */

import { CharacterController, CharacterStats } from './scripts/CharacterController';
import { CardSystem } from './scripts/CardSystem';
import { MonsterGenerator } from './scripts/MonsterGenerator';
import { DamageCalculator } from './scripts/DamageCalculator';

export class MainScene {
  // 角色
  private player: CharacterController;
  
  // 卡牌系统
  private cardSystem: CardSystem;
  
  // 怪物生成器
  private monsterGenerator: MonsterGenerator;
  
  // 当前波数
  private wave: number;
  
  // 当前章节
  private chapter: number;
  
  // 游戏状态
  private gameState: 'playing' | 'pause' | 'gameover' = 'playing';
  
  constructor() {
    // 初始化角色（雷恩）
    this.player = new CharacterController('雷恩', 1);
    
    // 初始化卡牌系统
    this.cardSystem = new CardSystem();
    
    // 初始化怪物生成器
    this.monsterGenerator = new MonsterGenerator();
    
    // 初始化波数和章节
    this.wave = 1;
    this.chapter = 1;
    
    console.log('游戏初始化完成');
  }
  
  /**
   * 开始游戏
   */
  startGame(): void {
    console.log('开始游戏');
    
    // 生成第一波怪物
    const monsters = this.monsterGenerator.generateWaveMonsters();
    
    // 显示玩家状态
    const playerStats = this.player.getStats();
    console.log(`玩家状态：${playerStats.name}，HP：${playerStats.currentHp}/${playerStats.hp}`);
    
    // 显示怪物状态
    monsters.forEach(monster => {
      console.log(`怪物状态：${monster.name}，HP：${monster.currentHp}/${monster.hp}`);
    });
  }
  
  /**
   * 战斗回合
   */
  battleRound(): void {
    if (this.gameState !== 'playing') return;
    
    console.log(`第 ${this.wave} 波战斗开始`);
    
    // 获取怪物
    const monsters = this.monsterGenerator.getMonsters();
    
    // 玩家攻击怪物
    monsters.forEach(monster => {
      this.player.attack(monster);
      
      // 怪物反击
      const damage = this.monsterGenerator.monsterAttack(monster, this.player.getStats());
      this.player.takeDamage(damage);
      
      // 检查怪物是否死亡
      if (monster.currentHp <= 0) {
        const dropItems = this.monsterGenerator.monsterDeath(monster);
        
        // 掉落物品处理
        dropItems.forEach(item => {
          if (item === '金币') {
            console.log(`获得金币`);
          } else if (item === '卡牌') {
            const card = this.cardSystem.pickRandomCard();
            if (card && this.cardSystem.equipCard(card)) {
              console.log(`拾取卡牌：${card.name}`);
              this.player.pickupCard(card);
            }
          }
        });
      }
    });
    
    // 检查玩家是否死亡
    const playerStats = this.player.getStats();
    if (playerStats.currentHp <= 0) {
      console.log('玩家死亡，游戏结束');
      this.gameState = 'gameover';
      return;
    }
    
    // 检查是否还有怪物存活
    const aliveMonsters = monsters.filter(monster => monster.currentHp > 0);
    
    if (aliveMonsters.length === 0) {
      console.log(`第 ${this.wave} 波战斗结束`);
      
      // 下一波
      this.nextWave();
    }
  }
  
  /**
   * 下一波
   */
  nextWave(): void {
    this.wave += 1;
    this.monsterGenerator.setWave(this.wave);
    
    // 生成下一波怪物
    const monsters = this.monsterGenerator.generateWaveMonsters();
    
    console.log(`进入第 ${this.wave} 波`);
  }
  
  /**
   * 下一章节
   */
  nextChapter(): void {
    this.chapter += 1;
    this.wave = 1;
    
    this.monsterGenerator.setChapter(this.chapter);
    this.monsterGenerator.setWave(this.wave);
    
    // 生成章节怪物
    const monsters = this.monsterGenerator.generateWaveMonsters();
    
    console.log(`进入第 ${this.chapter} 章`);
  }
  
  /**
   * 拾取卡牌
   */
  pickupCard(): void {
    const card = this.cardSystem.pickRandomCard();
    
    if (card) {
      const equipped = this.cardSystem.equipCard(card);
      
      if (equipped) {
        this.player.pickupCard(card);
        console.log(`拾取并装备卡牌：${card.name}`);
      } else {
        console.log(`容量不足，无法装备卡牌：${card.name}`);
      }
    }
  }
  
  /**
   * 丢弃卡牌
   * @param cardName 卡牌名称
   */
  discardCard(cardName: string): void {
    const discarded = this.cardSystem.discardCard(cardName);
    
    if (discarded) {
      this.player.discardCard(cardName);
      console.log(`丢弃卡牌：${cardName}`);
    }
  }
  
  /**
   * 升级卡牌
   * @param cardName 卡牌名称
   */
  upgradeCard(cardName: string): void {
    const upgraded = this.cardSystem.upgradeCard(cardName);
    
    if (upgraded) {
      console.log(`升级卡牌：${cardName}`);
    }
  }
  
  /**
   * 使用技能
   * @param skillName 技能名称
   */
  useSkill(skillName: string): void {
    const monsters = this.monsterGenerator.getMonsters();
    
    if (monsters.length > 0) {
      const monster = monsters[0]; // 攻击第一个怪物
      this.player.useSkill(skillName, monster);
    }
  }
  
  /**
   * 暂停游戏
   */
  pauseGame(): void {
    this.gameState = 'pause';
    console.log('游戏暂停');
  }
  
  /**
   * 恢复游戏
   */
  resumeGame(): void {
    this.gameState = 'playing';
    console.log('游戏恢复');
  }
  
  /**
   * 重新开始游戏
   */
  restartGame(): void {
    // 重置玩家
    this.player = new CharacterController('雷恩', 1);
    
    // 重置卡牌系统
    this.cardSystem.reset();
    
    // 重置怪物生成器
    this.monsterGenerator.reset();
    
    // 重置波数和章节
    this.wave = 1;
    this.chapter = 1;
    
    // 重置游戏状态
    this.gameState = 'playing';
    
    console.log('游戏重新开始');
  }
  
  /**
   * 获取游戏状态
   */
  getGameState(): string {
    return this.gameState;
  }
  
  /**
   * 获取玩家状态
   */
  getPlayerStats(): CharacterStats {
    return this.player.getStats();
  }
  
  /**
   * 获取卡牌统计信息
   */
  getCardStats(): any {
    return this.cardSystem.getCardStats();
  }
  
  /**
   * 获取波数信息
   */
  getWaveInfo(): { wave: number; chapter: number } {
    return { wave: this.wave, chapter: this.chapter };
  }
  
  /**
   * 获取章节难度信息
   */
  getChapterDifficulty(): any {
    return this.monsterGenerator.calculateChapterDifficulty();
  }
  
  /**
   * 获取波数难度信息
   */
  getWaveDifficulty(): any {
    return this.monsterGenerator.calculateWaveDifficulty();
  }
  
  /**
   * 获取游戏信息摘要
   */
  getGameSummary(): any {
    const playerStats = this.player.getStats();
    const cardStats = this.cardSystem.getCardStats();
    const waveInfo = this.getWaveInfo();
    const chapterDifficulty = this.getChapterDifficulty();
    const waveDifficulty = this.getWaveDifficulty();
    
    return {
      gameState: this.gameState,
      player: {
        name: playerStats.name,
        hp: playerStats.currentHp,
        attack: playerStats.attack,
        defense: playerStats.defense,
        level: playerStats.level,
        capacity: playerStats.capacity
      },
      cards: {
        totalCards: cardStats.totalCards,
        totalCost: cardStats.totalCost,
        rarityDistribution: cardStats.rarityDistribution
      },
      wave: waveInfo.wave,
      chapter: waveInfo.chapter,
      difficulty: {
        chapterMultiplier: chapterDifficulty,
        waveMultiplier: waveDifficulty
      }
    };
  }
}