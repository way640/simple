/**
 * 角色UI组件
 * 显示角色的状态和信息
 */

import { _decorator, Component, Node, Label, Sprite } from 'cc';
import { CharacterStats } from '../CharacterController';

@_decorator.ccclass('CharacterUI')
export class CharacterUI extends Component {
  @_decorator.property(Node)
  private characterNode: Node = null;
  
  @_decorator.property(Label)
  private nameLabel: Label = null;
  
  @_decorator.property(Label)
  private hpLabel: Label = null;
  
  @_decorator.property(Label)
  private attackLabel: Label = null;
  
  @_decorator.property(Label)
  private defenseLabel: Label = null;
  
  @_decorator.property(Label)
  private levelLabel: Label = null;
  
  @_decorator.property(Sprite)
  private characterSprite: Sprite = null;
  
  @_decorator.property(Sprite)
  private hpBarSprite: Sprite = null;
  
  @_decorator.property(Node)
  private cardSlotContainer: Node = null;
  
  // 角色状态
  private characterStats: CharacterStats = null;
  
  start() {
    // 初始化角色UI
    if (this.characterStats) {
      this.updateUI();
    }
  }
  
  /**
   * 设置角色状态
   */
  setCharacterStats(stats: CharacterStats): void {
    this.characterStats = stats;
    this.updateUI();
  }
  
  /**
   * 更新UI
   */
  updateUI(): void {
    if (!this.characterStats) return;
    
    // 更新标签
    this.nameLabel.string = this.characterStats.name;
    this.hpLabel.string = `${this.characterStats.currentHp}/${this.characterStats.hp}`;
    this.attackLabel.string = `${this.characterStats.attack}`;
    this.defenseLabel.string = `${this.characterStats.defense}`;
    this.levelLabel.string = `等级 ${this.characterStats.level}`;
    
    // 更新HP条
    const hpPercentage = this.characterStats.currentHp / this.characterStats.hp;
    this.hpBarSprite.width = Math.floor(100 * hpPercentage);
  }
  
  /**
   * 更新HP条
   */
  updateHPBar(): void {
    if (!this.characterStats) return;
    
    const hpPercentage = this.characterStats.currentHp / this.characterStats.hp;
    this.hpBarSprite.width = Math.floor(100 * hpPercentage);
    this.hpLabel.string = `${this.characterStats.currentHp}/${this.characterStats.hp}`;
  }
  
  /**
   * 更新卡牌显示
   */
  updateCardDisplay(cards: any[]): void {
    // 清理旧的卡牌显示
    this.cardSlotContainer.children.forEach(child => {
      child.removeFromParent();
    });
    
    // 添加新的卡牌显示
    cards.forEach(card => {
      const cardNode = new Node();
      const cardLabel = new Label();
      cardLabel.string = card.name;
      cardLabel.color = getColorByRarity(card.rarity);
      
      cardNode.addComponent(cardLabel);
      this.cardSlotContainer.addChild(cardNode);
    });
  }
  
  /**
   * 显示伤害效果
   */
  showDamageEffect(damage: number): void {
    const damageNode = new Node();
    const damageLabel = new Label();
    damageLabel.string = `-${damage}`;
    damageLabel.color = '#FF0000';
    damageLabel.fontSize = 20;
    
    damageNode.addComponent(damageLabel);
    this.node.addChild(damageNode);
    
    // 动画效果
    damageNode.position = new Vec3(0, 50, 0);
    
    setTimeout(() => {
      damageNode.removeFromParent();
    }, 1000);
  }
  
  /**
   * 显示治疗效果
   */
  showHealEffect(heal: number): void {
    const healNode = new Node();
    const healLabel = new Label();
    healLabel.string = `+${heal}`;
    healLabel.color = '#00FF00';
    healLabel.fontSize = 20;
    
    healNode.addComponent(healLabel);
    this.node.addChild(healNode);
    
    // 动画效果
    healNode.position = new Vec3(0, 50, 0);
    
    setTimeout(() => {
      healNode.removeFromParent();
    }, 1000);
  }
}

/**
 * 根据卡牌稀有度获取颜色
 */
function getColorByRarity(rarity: string): string {
  switch (rarity) {
    case '普通':
      return '#FFFFFF';
    case '进阶':
      return '#00FF00';
    case '稀有':
      return '#0000FF';
    case '史诗':
      return '#FF00FF';
    case '角色专属':
      return '#FFFF00';
    default:
      return '#FFFFFF';
  }
}