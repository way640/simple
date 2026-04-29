/**
 * 预制体测试
 * 测试角色预制体、怪物预制体、卡牌预制体
 */

console.log('=== 《幸存者：卡牌进化》预制体测试 ===');

// 角色预制体测试
console.log('=== 角色预制体测试 ===');
class CharacterPrefab {
  constructor(characterName) {
    this.characterData = {
      name: characterName,
      spriteName: `${characterName.toLowerCase()}_sprite`,
      position: { x: 0, y: 0 },
      scale: { x: 1.0, y: 1.0 },
      rotation: 0,
      animationController: {
        animations: [
          {
            name: 'idle',
            frames: [`${characterName}_idle_1`, `${characterName}_idle_2`],
            speed: 0.2
          },
          {
            name: 'move',
            frames: [`${characterName}_move_1`, `${characterName}_move_2`, `${characterName}_move_3`],
            speed: 0.3
          },
          {
            name: 'attack',
            frames: [`${characterName}_attack_1`, `${characterName}_attack_2`, `${characterName}_attack_3`],
            speed: 0.4
          }
        ],
        currentAnimation: 'idle',
        currentFrame: 0,
        loop: true
      },
      collider: {
        type: 'circle',
        radius: 0.5,
        enabled: true,
        collisionLayer: 'character',
        collisionMask: ['monster', 'card']
      },
      healthBar: {
        position: { x: 0, y: 0.5 },
        width: 1.0,
        height: 0.1,
        color: '#ff0000',
        value: 100,
        maxValue: 100
      },
      attackIndicator: {
        position: { x: 0.5, y: 0 },
        width: 0.1,
        height: 0.5,
        color: '#ffff00',
        visible: false
      },
      movementController: {
        speed: 5.0,
        acceleration: 10.0,
        deceleration: 5.0,
        maxSpeed: 15.0,
        friction: 0.5
      }
    };
    
    console.log(`创建角色预制体 ${characterName}`);
  }
  
  toJSON() {
    return JSON.stringify(this.characterData, null, 2);
  }
  
  toPrefab() {
    return JSON.stringify({ _type: 'Prefab', data: this.characterData }, null, 2);
  }
}

const characterPrefab = new CharacterPrefab('雷恩');
console.log(`角色预制体数据: ${characterPrefab.toJSON()}`);
console.log(`角色预制体文件: ${characterPrefab.toPrefab()}`);

// 怪物预制体测试
console.log('=== 怪物预制体测试 ===');
class MonsterPrefab {
  constructor(monsterName) {
    this.monsterData = {
      name: monsterName,
      spriteName: `${monsterName.toLowerCase()}_sprite`,
      position: { x: 0, y: 0 },
      scale: { x: 1.0, y: 1.0 },
      rotation: 0,
      animationController: {
        animations: [
          {
            name: 'idle',
            frames: [`${monsterName}_id1e_1`, `${monsterName}_idle_2`],
            speed: 0.2
          },
          {
            name: 'move',
            frames: [`${monsterName}_move_1`, `${monsterName}_move_2`, `${monsterName}_move_3`],
            speed: 0.3
          },
          {
            name: 'attack',
            frames: [`${monsterName}_attack_1`, `${monsterName}_attack_2`, `${monsterName}_attack_3`],
            speed: 0.4
          }
        ],
        currentAnimation: 'idle',
        currentFrame: 0,
        loop: true
      },
      collider: {
        type: 'circle',
        radius: 0.5,
        enabled: true,
        collisionLayer: 'monster',
        collisionMask: ['character', 'card']
      },
      healthBar: {
        position: { x: 0, y: 0.5 },
        width: 1.0,
        height: 0.1,
        color: '#ff0000',
        value: 100,
        maxValue: 100
      },
      attackIndicator: {
        position: { x: 0.5, y: 0 },
        width: 0.1,
        height: 0.5,
        color: '#ffff00',
        visible: false
      },
      movementController: {
        speed: 3.0,
        acceleration: 5.0,
        deceleration: 3.0,
        maxSpeed: 10.0,
        friction: 0.5
      }
    };
    
    console.log(`创建怪物预制体 ${monsterName}`);
  }
  
  toJSON() {
    return JSON.stringify(this.monsterData, null, 2);
  }
  
  toPrefab() {
    return JSON.stringify({ _type: 'Prefab', data: this.monsterData }, null, 2);
  }
}

const monsterPrefab = new MonsterPrefab('普通怪物');
console.log(`怪物预制体数据: ${monsterPrefab.toJSON()}`);
console.log(`怪物预制体文件: ${monsterPrefab.toPrefab()}`);

// 卡牌预制体测试
console.log('=== 卡牌预制体测试 ===');
class CardPrefab {
  constructor(cardName) {
    this.cardData = {
      name: cardName,
      spriteName: `${cardName.toLowerCase()}_sprite`,
      position: { x: 0, y: 0 },
      scale: { x: 1.0, y: 1.0 },
      rotation: 0,
      animationController: {
        animations: [
          {
            name: 'idle',
            frames: [`${cardName}_idle_1`, `${cardName}_idle_2`],
            speed: 0.2
          },
          {
            name: 'hover',
            frames: [`${cardName}_hover_1`, `${cardName}_hover_2`, `${cardName}_hover_3`],
            speed: 0.3
          },
          {
            name: 'click',
            frames: [`${cardName}_click_1`, `${cardName}_click_2`, `${cardName}_click_3`],
            speed: 0.4
          }
        ],
        currentAnimation: 'idle',
        currentFrame: 0,
        loop: true
      },
      collider: {
        type: 'box',
        width: 0.8,
        height: 1.0,
        enabled: true,
        collisionLayer: 'card',
        collisionMask: ['character']
      },
      cardInfo: {
        position: { x: 0, y: 0 },
        width: 0.8,
        height: 1.0,
        color: '#ffffff',
        value: 0,
        cost: 0,
        level: 1,
        rarity: '普通'
      },
      effect: {
        type: 'none',
        position: { x: 0, y: 0 },
        width: 0.8,
        height: 1.0,
        color: '#ffffff',
        visible: false
      },
      glow: {
        position: { x: 0, y: 0 },
        width: 0.8,
        height: 1.0,
        color: '#ffffff',
        intensity: 0.0,
        visible: false
      }
    };
    
    console.log(`创建卡牌预制体 ${cardName}`);
  }
  
  toJSON() {
    return JSON.stringify(this.cardData, null, 2);
  }
  
  toPrefab() {
    return JSON.stringify({ _type: 'Prefab', data: this.cardData }, null, 2);
  }
}

const cardPrefab = new CardPrefab('普通攻击卡');
console.log(`卡牌预制体数据: ${cardPrefab.toJSON()}`);
console.log(`卡牌预制体文件: ${cardPrefab.toPrefab()}`);

console.log('=== 预制体测试完成 ===');