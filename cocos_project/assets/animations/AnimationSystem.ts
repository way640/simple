/**
 * 动画系统
 * Cocos Creator动画系统
 */

export class AnimationSystem {
  // 角色动画数据
  private characterAnimations: CharacterAnimations;
  
  // 怪物动画数据
  private monsterAnimations: MonsterAnimations;
  
  // 卡牌动画数据
  private cardAnimations: CardAnimations;
  
  constructor() {
    this.characterAnimations = this.createCharacterAnimations();
    this.monsterAnimations = this.createMonsterAnimations();
    this.cardAnimations = this.createCardAnimations();
    
    console.log('动画系统初始化完成');
  }
  
  /**
   * 创建角色动画数据
   */
  private createCharacterAnimations(): CharacterAnimations {
    return {
      characterName: '雷恩',
      animations: [
        {
          name: 'idle',
          frames: ['character_idle_1', 'character_idle_2'],
          speed: 0.2,
          loop: true
        },
        {
          name: 'move',
          frames: ['character_move_1', 'character_move_2', 'character_move_3'],
          speed: 0.3,
          loop: true
        },
        {
          name: 'attack',
          frames: ['character_attack_1', 'character_attack_2', 'character_attack_3'],
          speed: 0.4,
          loop: false
        },
        {
          name: 'skill',
          frames: ['character_skill_1', 'character_skill_2', 'character_skill_3'],
          speed: 0.5,
          loop: false
        },
        {
          name: 'death',
          frames: ['character_death_1', 'character_death_2'],
          speed: 0.1,
          loop: false
        }
      ]
    };
  }
  
  /**
   * 创建怪物动画数据
   */
  private createMonsterAnimations(): MonsterAnimations {
    return {
      monsterName: '普通怪物',
      animations: [
        {
          name: 'idle',
          frames: ['monster_idle_1', 'monster_idle_2'],
          speed: 0.2,
          loop: true
        },
        {
          name: 'move',
          frames: ['monster_move_1', 'monster_move_2', 'monster_move_3'],
          speed: 0.3,
          loop: true
        },
        {
          name: 'attack',
          frames: ['monster_attack_1', 'monster_attack_2', 'monster_attack_3'],
          speed: 0.4,
          loop: false
        },
        {
          name: 'death',
          frames: ['monster_death_1', 'monster_death_2'],
          speed: 0.1,
          loop: false
        }
      ]
    };
  }
  
  /**
   * 创建卡牌动画数据
   */
  private createCardAnimations(): CardAnimations {
    return {
      cardName: '普通攻击卡',
      animations: [
        {
          name: 'idle',
          frames: ['card_idle_1', 'card_idle_2'],
          speed: 0.2,
          loop: true
        },
        {
          name: 'hover',
          frames: ['card_hover_1', 'card_hover_2', 'card_hover_3'],
          speed: 0.3,
          loop: true
        },
        {
          name: 'click',
          frames: ['card_click_1', 'card_click_2', 'card_click_3'],
          speed: 0.4,
          loop: false
        },
        {
          name: 'use',
          frames: ['card_use_1', 'card_use_2', 'card_use_3'],
          speed: 0.5,
          loop: false
        }
      ]
    };
  }
  
  /**
   * 播放角色动画
   * @param animationName 动画名称
   */
  playCharacterAnimation(animationName: string): AnimationData {
    const animation = this.characterAnimations.animations.find(anim => anim.name === animationName);
    
    if (!animation) {
      console.log(`角色动画 ${animationName} 不存在`);
      return null;
    }
    
    console.log(`播放角色动画 ${animationName}`);
    
    return animation;
  }
  
  /**
   * 播放怪物动画
   * @param animationName 动画名称
   */
  playMonsterAnimation(animationName: string): AnimationData {
    const animation = this.monsterAnimations.animations.find(anim => anim.name === animationName);
    
    if (!animation) {
      console.log(`怪物动画 ${animationName} 不存在`);
      return null;
    }
    
    console.log(`播放怪物动画 ${animationName}`);
    
    return animation;
  }
  
  /**
   * 播放卡牌动画
   * @param animationName 动画名称
   */
  playCardAnimation(animationName: string): AnimationData {
    const animation = this.cardAnimations.animations.find(anim => anim.name === animationName);
    
    if (!animation) {
      console.log(`卡牌动画 ${animationName} 不存在`);
      return null;
    }
    
    console.log(`播放卡牌动画 ${animationName}`);
    
    return animation;
  }
  
  /**
   * 创建角色攻击动画
   */
  createCharacterAttackAnimation(): AnimationData {
    return {
      name: 'character_attack',
      frames: ['character_attack_1', 'character_attack_2', 'character_attack_3'],
      speed: 0.4,
      loop: false
    };
  }
  
  /**
   * 创建怪物死亡动画
   */
  createMonsterDeathAnimation(): AnimationData {
    return {
      name: 'monster_death',
      frames: ['monster_death_1', 'monster_death_2'],
      speed: 0.1,
      loop: false
    };
  }
  
  /**
   * 创建卡牌拾取动画
   */
  createCardPickupAnimation(): AnimationData {
    return {
      name: 'card_pickup',
      frames: ['card_pickup_1', 'card_pickup_2', 'card_pickup_3'],
      speed: 0.3,
      loop: false
    };
  }
  
  /**
   * 创建技能动画
   */
  createSkillAnimation(): AnimationData {
    return {
      name: 'skill',
      frames: ['skill_1', 'skill_2', 'skill_3'],
      speed: 0.5,
      loop: false
    };
  }
  
  /**
   * 创建Boss动画
   */
  createBossAnimation(): BossAnimationData {
    return {
      bossName: 'Boss',
      animations: [
        {
          name: 'boss_idle',
          frames: ['boss_idle_1', 'boss_idle_2'],
          speed: 0.2,
          loop: true
        },
        {
          name: 'boss_move',
          frames: ['boss_move_1', 'boss_move_2', 'boss_move_3'],
          speed: 0.3,
          loop: true
        },
        {
          name: 'boss_attack',
          frames: ['boss_attack_1', 'boss_attack_2', 'boss_attack_3'],
          speed: 0.4,
          loop: false
        },
        {
          name: 'boss_skill',
          frames: ['boss_skill_1', 'boss_skill_2', 'boss_skill_3'],
          speed: 0.5,
          loop: false
        },
        {
          name: 'boss_death',
          frames: ['boss_death_1', 'boss_death_2'],
          speed: 0.1,
          loop: false
        }
      ]
    };
  }
  
  /**
   * 创建特效动画
   */
  createEffectAnimation(): EffectAnimationData {
    return {
      effectName: '特效',
      animations: [
        {
          name: 'explosion',
          frames: ['explosion_1', 'explosion_2', 'explosion_3'],
          speed: 0.3,
          loop: false
        },
        {
          name: 'heal',
          frames: ['heal_1', 'heal_2', 'heal_3'],
          speed: 0.4,
          loop: false
        },
        {
          name: 'buff',
          frames: ['buff_1', 'buff_2', 'buff_3'],
          speed: 0.5,
          loop: false
        },
        {
          name: 'debuff',
          frames: ['debuff_1', 'debuff_2', 'debuff_3'],
          speed: 0.5,
          loop: false
        }
      ]
    };
  }
  
  /**
   * 获取角色动画列表
   */
  getCharacterAnimations(): CharacterAnimations {
    return this.characterAnimations;
  }
  
  /**
   * 获取怪物动画列表
   */
  getMonsterAnimations(): MonsterAnimations {
    return this.monsterAnimations;
  }
  
  /**
   * 获取卡牌动画列表
   */
  getCardAnimations(): CardAnimations {
    return this.cardAnimations;
  }
  
  /**
   * 转换为JSON格式
   */
  toJSON(): string {
    return JSON.stringify({
      characterAnimations: this.characterAnimations,
      monsterAnimations: this.monsterAnimations,
      cardAnimations: this.cardAnimations
    }, null, 2);
  }
  
  /**
   * 转换为Cocos Creator动画文件格式
   */
  toAnimation(): string {
    const animation = {
      _type: 'Animation',
      data: {
        characterAnimations: this.characterAnimations,
        monsterAnimations: this.monsterAnimations,
        cardAnimations: this.cardAnimations
      }
    };
    
    return JSON.stringify(animation, null, 2);
  }
}

/**
 * 角色动画数据
 */
export interface CharacterAnimations {
  characterName: string;
  animations: AnimationData[];
}

/**
 * 怪物动画数据
 */
export interface MonsterAnimations {
  monsterName: string;
  animations: AnimationData[];
}

/**
 * 卡牌动画数据
 */
export interface CardAnimations {
  cardName: string;
  animations: AnimationData[];
}

/**
 * Boss动画数据
 */
export interface BossAnimationData {
  bossName: string;
  animations: AnimationData[];
}

/**
 * 特效动画数据
 */
export interface EffectAnimationData {
  effectName: string;
  animations: AnimationData[];
}

/**
 * 动画数据
 */
export interface AnimationData {
  name: string;
  frames: string[];
  speed: number;
  loop: boolean;
}

/**
 * 动画系统测试
 */
export function testAnimationSystem() {
  const animationSystem = new AnimationSystem();
  console.log('=== 动画系统测试 ===');
  
  // 测试角色动画
  const characterAnimation = animationSystem.playCharacterAnimation('idle');
  console.log(`角色动画: ${characterAnimation?.name}`);
  console.log(`角色动画帧数: ${characterAnimation?.frames.length}`);
  console.log(`角色动画速度: ${characterAnimation?.speed}`);
  console.log(`角色动画循环: ${characterAnimation?.loop}`);
  
  // 测试怪物动画
  const monsterAnimation = animationSystem.playMonsterAnimation('attack');
  console.log(`怪物动画: ${monsterAnimation?.name}`);
  console.log(`怪物动画帧数: ${monsterAnimation?.frames.length}`);
  console.log(`怪物动画速度: ${monsterAnimation?.speed}`);
  console.log(`怪物动画循环: ${monsterAnimation?.loop}`);
  
  // 测试卡牌动画
  const cardAnimation = animationSystem.playCardAnimation('hover');
  console.log(`卡牌动画: ${cardAnimation?.name}`);
  console.log(`卡牌动画帧数: ${cardAnimation?.frames.length}`);
  console.log(`卡牌动画速度: ${cardAnimation?.speed}`);
  console.log(`卡牌动画循环: ${cardAnimation?.loop}`);
  
  // 测试创建角色攻击动画
  const characterAttackAnimation = animationSystem.createCharacterAttackAnimation();
  console.log(`角色攻击动画: ${characterAttackAnimation.name}`);
  console.log(`角色攻击动画帧数: ${characterAttackAnimation.frames.length}`);
  console.log(`角色攻击动画速度: ${characterAttackAnimation.speed}`);
  console.log(`角色攻击动画循环: ${characterAttackAnimation.loop}`);
  
  // 测试创建怪物死亡动画
  const monsterDeathAnimation = animationSystem.createMonsterDeathAnimation();
  console.log(`怪物死亡动画: ${monsterDeathAnimation.name}`);
  console.log(`怪物死亡动画帧数: ${monsterDeathAnimation.frames.length}`);
  console.log(`怪物死亡动画速度: ${monsterDeathAnimation.speed}`);
  console.log(`怪物死亡动画循环: ${monsterDeathAnimation.loop}`);
  
  // 测试创建卡牌拾取动画
  const cardPickupAnimation = animationSystem.createCardPickupAnimation();
  console.log(`卡牌拾取动画: ${cardPickupAnimation.name}`);
  console.log(`卡牌拾取动画帧数: ${cardPickupAnimation.frames.length}`);
  console.log(`卡牌拾取动画速度: ${cardPickupAnimation.speed}`);
  console.log(`卡牌拾取动画循环: ${cardPickupAnimation.loop}`);
  
  // 测试创建技能动画
  const skillAnimation = animationSystem.createSkillAnimation();
  console.log(`技能动画: ${skillAnimation.name}`);
  console.log(`技能动画帧数: ${skillAnimation.frames.length}`);
  console.log(`技能动画速度: ${skillAnimation.speed}`);
  console.log(`技能动画循环: ${skillAnimation.loop}`);
  
  // 测试创建Boss动画
  const bossAnimation = animationSystem.createBossAnimation();
  console.log(`Boss动画名称: ${bossAnimation.bossName}`);
  console.log(`Boss动画数量: ${bossAnimation.animations.length}`);
  
  // 测试创建特效动画
  const effectAnimation = animationSystem.createEffectAnimation();
  console.log(`特效动画名称: ${effectAnimation.effectName}`);
  console.log(`特效动画数量: ${effectAnimation.animations.length}`);
  
  // 测试转换为JSON格式
  console.log(`动画系统JSON格式: ${animationSystem.toJSON()}`);
  
  // 测试转换为Cocos Creator动画文件格式
  console.log(`动画系统动画文件格式: ${animationSystem.toAnimation()}`);
  
  console.log('=== 动画系统测试完成 ===');
}