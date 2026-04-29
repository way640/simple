/**
 * 战斗场景UI组件
 * 显示战斗场景的所有UI元素
 */

import { _decorator, Component, Node, Label, Sprite, Button } from 'cc';
import { CharacterUI } from './CharacterUI';
import { MonsterUI } from './MonsterUI';
import { CardUI } from './CardUI';

@_decorator.ccclass('BattleSceneUI')
export class BattleSceneUI extends Component {
  @_decorator.property(Node)
  private playerNode: Node = null;
  
  @_decorator.property(Node)
  private monsterNodes: Node[] = [];
  
  @_decorator.property(Node)
  private cardNodes: Node[] = [];
  
  @_decorator.property(Label)
  private waveLabel: Label = null;
  
  @_decorator.property(Label)
  private chapterLabel: Label = null;
  
  @_decorator.property(Label)
  private scoreLabel: Label = null;
  
  @_decorator.property(Label)
  private goldLabel: Label = null;
  
  @_decorator.property(Label)
  private capacityLabel: Label = null;
  
  @_decorator.property(Button)
  private attackButton: Button = null;
  
  @_decorator.property(Button)
  private skillButton: Button = null;
  
  @_decorator.property(Button)
  private pickupButton: Button = null;
  
  @_decorator.property(Button)
  private discardButton: Button = null;
  
  // 战斗控制器
  private battleController: any = null;
  
  start() {
    // 初始化按钮事件
    this.attackButton.onClick(() => this.onAttack());
    this.skillButton.onClick(() => this.onSkill());
    this.pickupButton.onClick(() => this.onPickup());
    this.discardButton.onClick(() => this.onDiscard());
  }
  
  /**
   * 设置战斗控制器
   */
  setBattleController(controller: any): void {
    this.battleController = controller;
    this.updateUI();
  }
  
  /**
   * 更新UI
   */
  updateUI(): void {
    if (!this.battleController) return;
    
    // 更新波数和章节
    const waveInfo = this.battleController.getWaveInfo();
    this.waveLabel.string = `波数 ${waveInfo.wave}`;
    this.chapterLabel.string = `章节 ${waveInfo.chapter}`;
    
    // 更新容量
    const cardStats = this.battleController.getCardStats();
    this.capacityLabel.string = `容量 ${cardStats.totalCost}/${cardStats.maxCapacity}`;
    
    // 更新角色UI
    const characterUI = this.playerNode.getComponent(CharacterUI);
    const playerStats = this.battleController.getPlayerStats();
    characterUI.setCharacterStats(playerStats);
    
    // 更新怪物UI
    const monsters = this.battleController.getMonsters();
    this.monsterNodes.forEach((node, index) => {
      if (index < monsters.length) {
        const monsterUI = node.getComponent(MonsterUI);
        monsterUI.setMonster(monsters[index]);
      }
    });
    
    // 更新卡牌UI
    const cards = this.battleController.getCards();
    this.cardNodes.forEach((node, index) => {
      if (index < cards.length) {
        const cardUI = node.getComponent(CardUI);
        cardUI.setCard(cards[index]);
      }
    });
  }
  
  /**
   * 攻击按钮点击事件
   */
  onAttack(): void {
    if (this.battleController) {
      this.battleController.battleRound();
      this.updateUI();
    }
  }
  
  /**
   * 技能按钮点击事件
   */
  onSkill(): void {
    if (this.battleController) {
      this.battleController.useSkill('旋风斩');
      this.updateUI();
    }
  }
  
  /**
   * 拾取按钮点击事件
   */
  onPickup(): void {
    if (this.battleController) {
      this.battleController.pickupCard();
      this.updateUI();
    }
  }
  
  /**
   * 丢弃按钮点击事件
   */
  onDiscard(): void {
    if (this.battleController) {
      // 提示选择要丢弃的卡牌
      this.showDiscardSelection();
    }
  }
  
  /**
   * 显示丢弃选择
   */
  showDiscardSelection(): void {
    // 创建丢弃选择UI
    const discardNode = new Node();
    const discardLabel = new Label();
    discardLabel.string = '请选择要丢弃的卡牌';
    discardLabel.fontSize = 20;
    
    discardNode.addComponent(discardLabel);
    this.node.addChild(discardNode);
    
    // 添加卡牌选项
    const cards = this.battleController.getCards();
    cards.forEach(card => {
      const cardButton = new Button();
      cardButton.label = card.name;
      
      cardButton.onClick(() => {
        this.battleController.discardCard(card.name);
        this.updateUI();
        discardNode.removeFromParent();
      });
      
      discardNode.addChild(cardButton);
    });
    
    // 位置设置
    discardNode.position = new Vec3(0, 100, 0);
  }
  
  /**
   * 显示伤害效果
   */
  showDamageEffect(characterName: string, damage: number): void {
    const damageNode = new Node();
    const damageLabel = new Label();
    damageLabel.string = `${characterName} 受到 ${damage} 伤害`;
    damageLabel.color = '#FF0000';
    damageLabel.fontSize = 20;
    
    damageNode.addComponent(damageLabel);
    this.node.addChild(damageNode);
    
    // 动画效果
    damageNode.position = new Vec3(0, 200, 0);
    
    setTimeout(() => {
      damageNode.removeFromParent();
    }, 1500);
  }
  
  /**
   * 显示治疗效果
   */
  showHealEffect(characterName: string, heal: number): void {
    const healNode = new Node();
    const healLabel = new Label();
    healLabel.string = `${characterName} 恢复 ${heal} 生命值`;
    healLabel.color = '#00FF00';
    healLabel.fontSize = 20;
    
    healNode.addComponent(healLabel);
    this.node.addChild(healNode);
    
    // 动画效果
    healNode.position = new Vec3(0, 200, 0);
    
    setTimeout(() => {
      healNode.removeFromParent();
    }, 1500);
  }
  
  /**
   * 显示卡牌拾取效果
   */
  showCardPickupEffect(cardName: string): void {
    const pickupNode = new Node();
    const pickupLabel = new Label();
    pickupLabel.string = `拾取卡牌 ${cardName}`;
    pickupLabel.color = '#FFFF00';
    pickupLabel.fontSize = 20;
    
    pickupNode.addComponent(pickupLabel);
    this.node.addChild(pickupNode);
    
    // 动画效果
    pickupNode.position = new Vec3(0, 150, 0);
    
    setTimeout(() => {
      pickupNode.removeFromParent();
    }, 1500);
  }
  
  /**
   * 显示Boss出现效果
   */
  showBossAppearEffect(bossName: string): void {
    const bossNode = new Node();
    const bossLabel = new Label();
    bossLabel.string = `${bossName} 出现`;
    bossLabel.color = '#FF00FF';
    bossLabel.fontSize = 30;
    
    bossNode.addComponent(bossLabel);
    this.node.addChild(bossNode);
    
    // 动画效果
    bossNode.position = new Vec3(0, 250, 0);
    
    setTimeout(() => {
      bossNode.removeFromParent();
    }, 2000);
  }
}