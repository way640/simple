/**
 * 怪物生成器
 * 生成怪物和Boss
 */

import { DamageCalculator } from './DamageCalculator';
import { GameData } from './GameData';

export interface Monster {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  currentHp: number;
  wave: number;
  chapter: number;
  dropItems: string[];
  specialSkill?: string;
}

export interface Boss extends Monster {
  hpMultiplier: number;
  attackMultiplier: number;
  defenseMultiplier: number;
  dropCard: string;
}

export class MonsterGenerator {
  // 怪物列表
  private monsters: Monster[] = [];
  
  // Boss列表
  private bosses: Boss[] = [];
  
  // 当前章节
  private currentChapter: number = 1;
  
  // 当前波数
  private currentWave: number = 1;
  
  constructor(chapter: number = 1, wave: number = 1) {
    this.currentChapter = chapter;
    this.currentWave = wave;
  }
  
  /**
   * 生成怪物
   * @param count 怪物数量
   */
  generateMonsters(count: number): Monster[] {
    const chapterDifficulty = GameData.getChapterDifficulty(this.currentChapter);
    const waveDifficulty = DamageCalculator.calculateWaveDifficulty(this.currentWave);
    
    // 生成怪物
    const monsters: Monster[] = [];
    
    for (let i = 0; i < count; i++) {
      const monsterName = `怪物 ${i + 1}`;
      
      // 基础数值
      const baseHP = 100;
      const baseAttack = 20;
      const baseDefense = 15;
      const baseSpeed = 1.0;
      
      // 应用章节和波数倍率
      const hp = Math.floor(baseHP * chapterDifficulty.hpMultiplier * waveDifficulty.hpMultiplier);
      const attack = Math.floor(baseAttack * chapterDifficulty.attackMultiplier * waveDifficulty.attackMultiplier);
      const defense = Math.floor(baseDefense * chapterDifficulty.defenseMultiplier * waveDifficulty.defenseMultiplier);
      
      monsters.push({
        name: monsterName,
        hp,
        attack,
        defense,
        speed: baseSpeed,
        currentHp: hp,
        wave: this.currentWave,
        chapter: this.currentChapter,
        dropItems: ['金币']
      });
    }
    
    this.monsters = monsters;
    console.log(`生成 ${count} 个怪物`);
    
    return monsters;
  }
  
  /**
   * 生成Boss
   */
  generateBoss(): Boss {
    const bossData = GameData.getBoss(this.currentChapter);
    
    if (!bossData) {
      console.log(`章节 ${this.currentChapter} 没有Boss数据`);
      return null;
    }
    
    // 获取玩家基础数值（假设为雷恩）
    const playerHP = 1500;
    const playerAttack = 60;
    const playerDefense = 50;
    
    // 计算Boss数值
    const hp = Math.floor(playerHP * bossData.hpMultiplier);
    const attack = Math.floor(playerAttack * bossData.attackMultiplier);
    const defense = Math.floor(playerDefense * bossData.defenseMultiplier);
    
    const boss: Boss = {
      name: bossData.name,
      hp,
      attack,
      defense,
      speed: 0.5,
      currentHp: hp,
      wave: bossData.wave,
      chapter: bossData.chapter,
      dropItems: ['金币', bossData.dropCard],
      specialSkill: bossData.specialSkill,
      hpMultiplier: bossData.hpMultiplier,
      attackMultiplier: bossData.attackMultiplier,
      defenseMultiplier: bossData.defenseMultiplier,
      dropCard: bossData.dropCard
    };
    
    this.bosses = [boss];
    console.log(`生成 Boss：${boss.name}`);
    
    return boss;
  }
  
  /**
   * 生成波数怪物
   */
  generateWaveMonsters(): Monster[] {
    // 根据波数确定怪物数量
    const monsterCount = this.getMonsterCountByWave(this.currentWave);
    
    // 生成普通怪物
    const monsters = this.generateMonsters(monsterCount);
    
    // 如果波数包含Boss，生成Boss
    if (this.currentWave % 10 === 0) {
      const boss = this.generateBoss();
      if (boss) {
        monsters.push(boss);
      }
    }
    
    console.log(`波数 ${this.currentWave} 生成 ${monsters.length} 个怪物`);
    return monsters;
  }
  
  /**
   * 根据波数获取怪物数量
   * @param wave 波数
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
   * 怪物攻击
   * @param monster 怪物
   * @param player 玩家
   */
  monsterAttack(monster: Monster, player: any): number {
    // 计算怪物攻击伤害
    const damage = DamageCalculator.calculateFinalDamage(
      monster.attack,
      player.defense,
      1.0 // 怪物攻击系数
    );
    
    console.log(`${monster.name} 攻击玩家，造成 ${damage} 伤害`);
    return damage;
  }
  
  /**
   * Boss使用特殊技能
   * @param boss Boss
   * @param player 玩家
   */
  bossUseSpecialSkill(boss: Boss, player: any): number {
    // Boss特殊技能伤害（通常比普通攻击更高）
    const skillCoefficient = 2.0; // Boss技能系数
    
    const damage = DamageCalculator.calculateFinalDamage(
      boss.attack,
      player.defense,
      skillCoefficient
    );
    
    console.log(`${boss.name} 使用特殊技能 ${boss.specialSkill}，造成 ${damage} 伤害`);
    return damage;
  }
  
  /**
   * 怪物死亡
   * @param monster 怪物
   */
  monsterDeath(monster: Monster): string[] {
    console.log(`${monster.name} 死亡`);
    
    // 掉落物品
    const dropItems = [...monster.dropItems];
    
    // Boss额外掉落卡牌
    if (monster.dropItems.includes('金币') && monster.dropItems.includes('卡牌')) {
      console.log(`Boss死亡，掉落 ${monster.dropItems}`);
    }
    
    return dropItems;
  }
  
  /**
   * 设置章节
   * @param chapter 章节
   */
  setChapter(chapter: number): void {
    this.currentChapter = chapter;
    console.log(`设置章节为 ${chapter}`);
  }
  
  /**
   * 设置波数
   * @param wave 波数
   */
  setWave(wave: number): void {
    this.currentWave = wave;
    console.log(`设置波数为 ${wave}`);
  }
  
  /**
   * 增加波数
   */
  increaseWave(): void {
    this.currentWave += 1;
    console.log(`波数增加到 ${this.currentWave}`);
  }
  
  /**
   * 获取当前波数
   */
  getCurrentWave(): number {
    return this.currentWave;
  }
  
  /**
   * 获取当前章节
   */
  getCurrentChapter(): number {
    return this.currentChapter;
  }
  
  /**
   * 获取怪物列表
   */
  getMonsters(): Monster[] {
    return this.monsters;
  }
  
  /**
   * 获取Boss列表
   */
  getBosses(): Boss[] {
    return this.bosses;
  }
  
  /**
   * 重置怪物生成器
   */
  reset(): void {
    this.monsters = [];
    this.bosses = [];
    this.currentChapter = 1;
    this.currentWave = 1;
    
    console.log('怪物生成器已重置');
  }
  
  /**
   * 计算章节难度
   */
  calculateChapterDifficulty(): { hpMultiplier: number; attackMultiplier: number; defenseMultiplier: number } {
    const chapterDifficulty = GameData.getChapterDifficulty(this.currentChapter);
    
    return {
      hpMultiplier: chapterDifficulty.hpMultiplier,
      attackMultiplier: chapterDifficulty.attackMultiplier,
      defenseMultiplier: chapterDifficulty.defenseMultiplier
    };
  }
  
  /**
   * 计算波数难度
   */
  calculateWaveDifficulty(): { hpMultiplier: number; attackMultiplier: number; defenseMultiplier: number } {
    const waveDifficulty = DamageCalculator.calculateWaveDifficulty(this.currentWave);
    
    return {
      hpMultiplier: waveDifficulty.hpMultiplier,
      attackMultiplier: waveDifficulty.attackMultiplier,
      defenseMultiplier: waveDifficulty.defenseMultiplier
    };
  }
}