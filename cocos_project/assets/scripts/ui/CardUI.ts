/**
 * 卡牌UI组件
 * 显示卡牌的信息和状态
 */

import { _decorator, Component, Node, Label, Sprite } from 'cc';

@_decorator.ccclass('CardUI')
export class CardUI extends Component {
  @_decorator.property(Node)
  private cardNode: Node = null;
  
  @_decorator.property(Label)
  private nameLabel: Label = null;
  
  @_decorator.property(Label)
  private rarityLabel: Label = null;
  
  @_decorator.property(Label)
  private valueLabel: Label = null;
  
  @_decorator.property(Label)
  private costLabel: Label = null;
  
  @_decorator.property(Label)
  private descriptionLabel: Label = null;
  
  @_decorator.property(Label)
  private levelLabel: Label = null;
  
  @_decorator.property(Sprite)
  private cardSprite: Sprite = null;
  
  // 卡牌信息
  private card: any = null;
  
  start() {
    // 初始化卡牌UI
    if (this.card) {
      this.updateUI();
    }
  }
  
  /**
   * 设置卡牌信息
   */
  setCard(card: any): void {
    this.card = card;
    this.updateUI();
  }
  
  /**
   * 更新UI
   */
  updateUI(): void {
    if (!this.card) return;
    
    // 更新标签
    this.nameLabel.string = this.card.name;
    this.rarityLabel.string = this.card.rarity;
    this.valueLabel.string = `${this.card.value}`;
    this.costLabel.string = `消耗 ${this.card.cost}`;
    this.descriptionLabel.string = this.card.description;
    this.levelLabel.string = `等级 ${this.card.level}`;
    
    // 更新卡牌颜色
    setSpriteByCardColor(this.cardSprite, this.card.color);
  }
  
  /**
   * 显示拾取效果
   */
  showPickupEffect(): void {
    const pickupNode = new Node();
    const pickupLabel = new Label();
    pickupLabel.string = '拾取';
    pickupLabel.color = '#FFFFFF';
    pickupLabel.fontSize = 20;
    
    pickupNode.addComponent(pickupLabel);
    this.node.addChild(pickupNode);
    
    // 动画效果
    pickupNode.position = new Vec3(0, 50, 0);
    
    setTimeout(() => {
      pickupNode.removeFromParent();
    }, 1000);
  }
  
  /**
   * 显示升级效果
   */
  showUpgradeEffect(): void {
    const upgradeNode = new Node();
    const upgradeLabel = new Label();
    upgradeLabel.string = '升级';
    upgradeLabel.color = '#FFFF00';
    upgradeLabel.fontSize = 20;
    
    upgradeNode.addComponent(upgradeLabel);
    this.node.addChild(upgradeNode);
    
    // 动画效果
    upgradeNode.position = new Vec3(0, 50, 0);
    
    setTimeout(() => {
      upgradeNode.removeFromParent();
    }, 1000);
  }
  
  /**
   * 显示丢弃效果
   */
  showDiscardEffect(): void {
    const discardNode = new Node();
    const discardLabel = new Label();
    discardLabel.string = '丢弃';
    discardLabel.color = '#FF0000';
    discardLabel.fontSize = 20;
    
    discardNode.addComponent(discardLabel);
    this.node.addChild(discardNode);
    
    // 动画效果
    discardNode.position = new Vec3(0, 50, 0);
    
    setTimeout(() => {
      discardNode.removeFromParent();
    }, 1000);
  }
}

/**
 * 根据卡牌颜色设置精灵
 */
function setSpriteByCardColor(sprite: Sprite, color: string): void {
  switch (color) {
    case '⚪ 白':
      sprite.color = '#FFFFFF'; // 白色
      break;
    case '🟢 绿':
      sprite.color = '#00FF00'; // 绿色
      break;
    case '🔵 蓝':
      sprite.color = '#0000FF'; // 蓝色
      break;
    case '🟣 紫':
      sprite.color = '#FF00FF'; // 紫色
      break;
    case '🟡 黄':
      sprite.color = '#FFFF00'; // 黄色
      break;
    default:
      sprite.color = '#FFFFFF'; // 默认白色
  }
}