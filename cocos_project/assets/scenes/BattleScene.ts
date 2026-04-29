/**
 * 战斗场景
 * Cocos Creator的战斗场景
 */

import { _decorator, Component, Node } from 'cc';
import { CharacterController } from '../scripts/CharacterController';
import { CardSystem } from '../scripts/CardSystem';
import { MonsterGenerator } from '../scripts/MonsterGenerator';
import { BattleSceneUI } from '../scripts/ui/BattleSceneUI';

@_decorator.ccclass('BattleScene')
export class BattleScene extends Component {
  // 角色控制器
  private characterController: CharacterController;
  
  // 卡牌系统
  private cardSystem: CardSystem;
  
  // 怪物生成器
  private monsterGenerator: MonsterGenerator;
  
  // 战斗UI
  private battleSceneUI: BattleSceneUI;
  
  // 游戏状态
  private gameState: 'playing' | 'pause' | 'gameover' = 'playing';
  
  // 当前波数
  private wave: number;
  
  // 当前章节
  private chapter: number;
  
  start() {
    // 初始化组件
    this.initComponents();
    
    // 初始化游戏
    this.initGame();
  }
  
  /**
   * 初始化组件
   */
  initComponents(): void {
    // 获取战斗UI组件
    this.battleSceneUI = this.node.getComponent(BattleSceneUI);
  }
  
  /**
   * 初始化游戏
   */
  initGame(): void {
    // 初始化角色控制器
    this.characterController = new CharacterController('雷恩', 1);
    
    // 初始化卡牌系统
    this.cardSystem = new CardSystem();
    
    // 初始化怪物生成器
    this.monsterGenerator = new MonsterGenerator();
    
    // 初始化波数和章节
    this.wave = 1;
    this.chapter = 1;
    
    // 设置战斗控制器
    this.battleSceneUI.setBattleController(this);
    
    // 更新UI
    this.updateUI();
    
    console.log('战斗场景初始化完成');
  }
  
  /**
   * 开始游戏
   */
  startGame(): void {
    this.gameState = 'playing';
    
    // 生成第一波怪物
    this.generateWaveMonsters();
    
    console.log('游戏开始');
  }
  
  /**
   * 生成波数怪物
   */
  generateWaveMonsters(): void {
    const monsters = this.monsterGenerator.generateWaveMonsters();
    
    // 显示怪物
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
      this.characterController.attack(monster);
      
      // 怪物反击
      const damage = this.monsterGenerator.monsterAttack(monster, this.characterController.getStats());
      this.characterController.takeDamage(damage);
      
      // 显示伤害效果
      this.battleSceneUI.showDamageEffect(this.characterController.getStats().name, damage);
      
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
              this.characterController.pickupCard(card);
              this.battleSceneUI.showCardPickupEffect(card.name);
            }
          }
        });
      }
    });
    
    // 检查玩家是否死亡
    const playerStats = this.characterController.getStats();
    if (playerStats.currentHp <= 0) {
      console.log('玩家死亡，游戏结束');
      this.gameState = 'gameover';
      this.updateUI();
      return;
    }
    
    // 检查是否还有怪物存活
    const aliveMonsters = monsters.filter(monster => monster.currentHp > 0);
    
    if (aliveMonsters.length === 0) {
      console.log(`第 ${this.wave} 波战斗结束`);
      
      // 下一波
      this.nextWave();
    }
    
    this.updateUI();
  }
  
  /**
   * 使用技能
   * @param skillName 技能名称
   */
  useSkill(skillName: string): void {
    const monsters = this.monsterGenerator.getMonsters();
    
    if (monsters.length > 0) {
      const monster = monsters[0]; // 攻击第一个怪物
      this.characterController.useSkill(skillName, monster);
      this.updateUI();
    }
  }
  
  /**
   * 拾取卡牌
   */
  pickupCard(): void {
    const card = this.cardSystem.pickRandomCard();
    
    if (card) {
      const equipped = this.cardSystem.equipCard(card);
      
      if (equipped) {
        this.characterController.pickupCard(card);
        console.log(`拾取并装备卡牌：${card.name}`);
        this.battleSceneUI.showCardPickupEffect(card.name);
      } else {
        console.log(`容量不足，无法装备卡牌：${card.name}`);
      }
    }
    
    this.updateUI();
  }
  
  /**
   * 丢弃卡牌
   * @param cardName 卡牌名称
   */
  discardCard(cardName: string): void {
    const discarded = this.cardSystem.discardCard(cardName);
    
    if (discarded) {
      this.characterController.discardCard(cardName);
      console.log(`丢弃卡牌：${cardName}`);
    }
    
    this.updateUI();
  }
  
  /**
   * 下一波
   */
  nextWave(): void {
    this.wave += 1;
    this.monsterGenerator.setWave(this.wave);
    
    // 生成下一波怪物
    this.generateWaveMonsters();
    
    console.log(`进入第 ${this.wave} 波`);
    
    // 检查是否有Boss出现
    if (this.wave % 10 === 0) {
      const boss = this.monsterGenerator.generateBoss();
      if (boss) {
        this.battleSceneUI.showBossAppearEffect(boss.name);
      }
    }
    
    this.updateUI();
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
    this.generateWaveMonsters();
    
    console.log(`进入第 ${this.chapter} 章`);
    this.updateUI();
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
    // 重置角色控制器
    this.characterController = new CharacterController('雷恩', 1);
    
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
    this.updateUI();
  }
  
  /**
   * 更新UI
   */
  updateUI(): void {
    this.battleSceneUI.updateUI();
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
  getPlayerStats(): any {
    return this.characterController.getStats();
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
   * 获取怪物列表
   */
  getMonsters(): any[] {
    return this.monsterGenerator.getMonsters();
  }
  
  /**
   * 获取卡牌列表
   */
  getCards(): any[] {
    return this.cardSystem.getEquippedCards();
  }
}