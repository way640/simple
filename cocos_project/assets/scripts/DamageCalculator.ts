/**
 * 伤害计算器
 * 实现《幸存者：卡牌进化》的伤害计算公式
 */

export class DamageCalculator {
  // 防御因子常量
  private static DEF_FACTOR = 100;
  
  /**
   * 计算最终伤害
   * @param attack 攻击力
   * @param defense 防御力
   * @param skillCoefficient 技能系数
   * @returns 最终伤害
   */
  public static calculateFinalDamage(
    attack: number,
    defense: number,
    skillCoefficient: number = 1
  ): number {
    // 计算防御减免
    const damageReduction = defense / (defense + DamageCalculator.DEF_FACTOR);
    
    // 计算最终伤害
    const finalDamage = (attack * skillCoefficient) * (1 - damageReduction);
    
    return Math.floor(finalDamage);
  }
  
  /**
   * 计算有效生命值
   * @param hp 生命值
   * @param defense 防御力
   * @returns 有效生命值
   */
  public static calculateEffectiveHP(hp: number, defense: number): number {
    const damageReduction = defense / (defense + DamageCalculator.DEF_FACTOR);
    const effectiveHP = hp / (1 - damageReduction);
    
    return Math.floor(effectiveHP);
  }
  
  /**
   * 计算暴击伤害
   * @param damage 基础伤害
   * @param critRate 暴击率
   * @param critDamage 暴击伤害倍率
   * @returns 可能的伤害（考虑暴击）
   */
  public static calculateCriticalDamage(
    damage: number,
    critRate: number = 0,
    critDamage: number = 1.5
  ): { damage: number, isCrit: boolean } {
    const isCrit = Math.random() < critRate;
    
    if (isCrit) {
      return {
        damage: Math.floor(damage * critDamage),
        isCrit: true
      };
    }
    
    return {
      damage: Math.floor(damage),
      isCrit: false
    };
  }
  
  /**
   * 计算怪物闪避
   * @param evasionRate 闪避率
   * @returns 是否闪避
   */
  public static calculateEvasion(evasionRate: number = 0): boolean {
    return Math.random() < evasionRate;
  }
  
  /**
   * 计算怪物章节难度倍率
   * @param chapter 章节（1-5）
   * @returns 难度倍率
   */
  public static calculateDifficultyMultiplier(chapter: number): { hpMultiplier: number, attackMultiplier: number, defenseMultiplier: number } {
    const multipliers = {
      1: { hpMultiplier: 1.0, attackMultiplier: 1.0, defenseMultiplier: 1.0 },
      2: { hpMultiplier: 1.5, attackMultiplier: 1.4, defenseMultiplier: 1.3 },
      3: { hpMultiplier: 2.2, attackMultiplier: 2.0, defenseMultiplier: 1.8 },
      4: { hpMultiplier: 3.5, attackMultiplier: 3.0, defenseMultiplier: 2.5 },
      5: { hpMultiplier: 5.0, attackMultiplier: 4.5, defenseMultiplier: 3.5 }
    };
    
    return multipliers[chapter] || multipliers[1];
  }
  
  /**
   * 计算无尽模式难度
   * @param wave 波数（1-50）
   * @returns 难度倍率
   */
  public static calculateWaveDifficulty(wave: number): { hpMultiplier: number, attackMultiplier: number, defenseMultiplier: number } {
    // 基础数值
    const baseHP = 100;
    const baseAttack = 20;
    const baseDefense = 15;
    
    // 计算公式
    const hpMultiplier = baseHP * (1 + wave * 0.2);
    const attackMultiplier = baseAttack * (1 + wave * 0.15);
    const defenseMultiplier = baseDefense * (1 + wave * 0.1);
    
    return {
      hpMultiplier: Math.floor(hpMultiplier),
      attackMultiplier: Math.floor(attackMultiplier),
      defenseMultiplier: Math.floor(defenseMultiplier)
    };
  }
  
  /**
   * 计算技能伤害
   * @param attack 攻击力
   * @param defense 防御力
   * @param skillType 技能类型（normal, minor, major）
   * @param skillLevel 技能等级（1-10）
   * @returns 技能伤害
   */
  public static calculateSkillDamage(
    attack: number,
    defense: number,
    skillType: 'normal' | 'minor' | 'major',
    skillLevel: number = 1
  ): number {
    // 技能系数
    const skillCoefficients = {
      normal: { level1: 1.0, level10: 1.3 },
      minor: { level1: 2.0, level10: 3.5 },
      major: { level1: 5.0, level10: 8.0 }
    };
    
    // 计算技能系数
    const coefficients = skillCoefficients[skillType];
    const levelFactor = (skillLevel - 1) / 9; // 1-10级之间的线性比例
    const skillCoefficient = coefficients.level1 + (coefficients.level10 - coefficients.level1) * levelFactor;
    
    // 计算最终伤害
    return DamageCalculator.calculateFinalDamage(attack, defense, skillCoefficient);
  }
}