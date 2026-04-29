/**
 * 测试脚本
 * 测试Cocos Creator游戏系统
 */

// 模拟测试环境
console.log('=== 《幸存者：卡牌进化》测试 ===');

// 测试伤害计算公式
import { DamageCalculator } from './assets/scripts/DamageCalculator';

console.log('=== 伤害计算公式测试 ===');
console.log('攻击力10，防御100，技能系数1.0 → 最终伤害: ' + DamageCalculator.calculateFinalDamage(10, 100, 1.0));
console.log('攻击力20，防御50，技能系数1.5 → 最终伤害: ' + DamageCalculator.calculateFinalDamage(20, 50, 1.5));
console.log('攻击力30，防御200，技能系数2.0 → 最终伤害: ' + DamageCalculator.calculateFinalDamage(30, 200, 2.0));

// 测试技能伤害计算
console.log('=== 技能伤害计算测试 ===');
console.log('雷恩旋风斩伤害: ' + DamageCalculator.calculateSkillDamage(60, 50, 'minor', 1));
console.log('薇拉多重射击伤害: ' + DamageCalculator.calculateSkillDamage(80, 30, 'minor', 1));
console.log('卡尔引力场伤害: ' + DamageCalculator.calculateSkillDamage(70, 20, 'minor', 1));

// 测试无尽模式难度计算
console.log('=== 无尽模式难度测试 ===');
console.log('波数1难度: ', DamageCalculator.calculateWaveDifficulty(1));
console.log('波数10难度: ', DamageCalculator.calculateWaveDifficulty(10));
console.log('波数20难度: ', DamageCalculator.calculateWaveDifficulty(20));
console.log('波数50难度: ', DamageCalculator.calculateWaveDifficulty(50));

// 测试角色控制器
import { CharacterController } from './assets/scripts/CharacterController';

console.log('=== 角色控制器测试 ===');
const rene = new CharacterController('雷恩', 1);
console.log('雷恩初始状态: ', rene.getStats());

// 测试角色移动
rene.move(10, 10);
console.log('雷恩移动后位置: ', rene.getPosition());

// 测试角色攻击
const target = {
  name: '怪物',
  defense: 20,
  takeDamage: (damage: number) => {
    console.log(`怪物受到 ${damage} 伤害`);
  }
};
rene.attack(target);

// 测试角色技能
rene.useSkill('旋风斩', target);

// 测试卡牌系统
import { CardSystem } from './assets/scripts/CardSystem';

console.log('=== 卡牌系统测试 ===');
const cardSystem = new CardSystem();

// 拾取卡牌
const card = cardSystem.pickRandomCard('普通');
if (card) {
  console.log('拾取的卡牌: ', card);
  
  // 装备卡牌
  const equipped = cardSystem.equipCard(card);
  console.log('装备卡牌结果: ', equipped);
}

// 查看卡牌统计
const cardStats = cardSystem.getCardStats();
console.log('卡牌统计: ', cardStats);

// 升级卡牌
cardSystem.upgradeCard('普通攻击卡');
console.log('升级后的卡牌统计: ', cardSystem.getCardStats());

// 测试怪物生成器
import { MonsterGenerator } from './assets/scripts/MonsterGenerator';

console.log('=== 怪物生成器测试 ===');
const monsterGenerator = new MonsterGenerator();

// 生成怪物
const monsters = monsterGenerator.generateMonsters(5);
console.log('生成的怪物: ', monsters);

// 生成Boss
const boss = monsterGenerator.generateBoss();
if (boss) {
  console.log('生成的Boss: ', boss);
}

// 怪物攻击测试
const monster = monsters[0];
const playerStats = rene.getStats();
const damage = monsterGenerator.monsterAttack(monster, playerStats);
console.log(`怪物 ${monster.name} 攻击玩家 ${playerStats.name}，造成 ${damage} 伤害`);

// 测试主场景
import { MainScene } from './assets/scenes/MainScene';

console.log('=== 主场景测试 ===');
const mainScene = new MainScene();

// 开始游戏
mainScene.startGame();

// 获取游戏信息摘要
const gameSummary = mainScene.getGameSummary();
console.log('游戏信息摘要: ', gameSummary);

// 战斗回合测试
mainScene.battleRound();

// 拾取卡牌测试
mainScene.pickupCard();

// 获取新的游戏信息摘要
const newGameSummary = mainScene.getGameSummary();
console.log('新的游戏信息摘要: ', newGameSummary);

// 测试下一波
mainScene.nextWave();
const waveInfo = mainScene.getWaveInfo();
console.log('波数信息: ', waveInfo);

console.log('=== 测试完成 ===');