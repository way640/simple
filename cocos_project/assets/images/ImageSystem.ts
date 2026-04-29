/**
 * 图片系统
 * Cocos Creator图片系统
 */

export class ImageSystem {
  // 角色图片数据
  private characterImages: CharacterImages;
  
  // 怪物图片数据
  private monsterImages: MonsterImages;
  
  // 卡牌图片数据
  private cardImages: CardImages;
  
  // Boss图片数据
  private bossImages: BossImages;
  
  // 特效图片数据
  private effectImages: EffectImages;
  
  // UI图片数据
  private uiImages: UIImageData;
  
  constructor() {
    this.characterImages = this.createCharacterImages();
    this.monsterImages = this.createMonsterImages();
    this.cardImages = this.createCardImages();
    this.bossImages = this.createBossImages();
    this.effectImages = this.createEffectImages();
    this.uiImages = this.createUIImageData();
    
    console.log('图片系统初始化完成');
  }
  
  /**
   * 创建角色图片数据
   */
  private createCharacterImages(): CharacterImages {
    return {
      name: '角色图片',
      images: [
        {
          name: '雷恩',
          file: '雷恩.png',
          width: 128,
          height: 128,
          format: 'png',
          size: 100 * 1024, // 100KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '艾莉亚',
          file: '艾莉亚.png',
          width: 128,
          height: 128,
          format: 'png',
          size: 100 * 1024, // 100KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '莉莉安',
          file: '莉莉安.png',
          width: 128,
          height: 128,
          format: 'png',
          size: 100 * 1024, // 100KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        }
      ]
    };
  }
  
  /**
   * 创建怪物图片数据
   */
  private createMonsterImages(): MonsterImages {
    return {
      name: '怪物图片',
      images: [
        {
          name: '普通怪物',
          file: '普通怪物.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 50 * 1024, // 50KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '进阶怪物',
          file: '进阶怪物.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 50 * 1024, // 50KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '稀有怪物',
          file: '稀有怪物.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 50 * 1024, // 50KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '史诗怪物',
          file: '史诗怪物.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 50 * 1024, // 50KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        }
      ]
    };
  }
  
  /**
   * 创建卡牌图片数据
   */
  private createCardImages(): CardImages {
    return {
      name: '卡牌图片',
      images: [
        {
          name: '普通攻击卡',
          file: '普通攻击卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '普通防御卡',
          file: '普通防御卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '普通生命卡',
          file: '普通生命卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '进阶攻击卡',
          file: '进阶攻击卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '进阶防御卡',
          file: '进阶防御卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '进阶生命卡',
          file: '进阶生命卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '稀有攻击卡',
          file: '稀有攻击卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '稀有防御卡',
          file: '稀有防御卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '稀有生命卡',
          file: '稀有生命卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '史诗攻击卡',
          file: '史诗攻击卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '史诗防御卡',
          file: '史诗防御卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '史诗生命卡',
          file: '史诗生命卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '角色专属攻击卡',
          file: '角色专属攻击卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '角色专属防御卡',
          file: '角色专属防御卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '角色专属生命卡',
          file: '角色专属生命卡.png',
          width: 128,
          height: 256,
          format: 'png',
          size: 80 * 1024, // 80KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        }
      ]
    };
  }
  
  /**
   * 创建Boss图片数据
   */
  private createBossImages(): BossImages {
    return {
      name: 'Boss图片',
      images: [
        {
          name: '第一章Boss',
          file: '第一章Boss.png',
          width: 256,
          height: 256,
          format: 'png',
          size: 150 * 1024, // 150KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '第二章Boss',
          file: '第二章Boss.png',
          width: 256,
          height: 256,
          format: 'png',
          size: 150 * 1024, // 150KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '第三章Boss',
          file: '第三章Boss.png',
          width: 256,
          height: 256,
          format: 'png',
          size: 150 * 1024, // 150KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '第四章Boss',
          file: '第四章Boss.png',
          width: 256,
          height: 256,
          format: 'png',
          size: 150 * 1024, // 150KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '第五章Boss',
          file: '第五章Boss.png',
          width: 256,
          height: 256,
          format: 'png',
          size: 150 * 1024, // 150KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        }
      ]
    };
  }
  
  /**
   * 创建特效图片数据
   */
  private createEffectImages(): EffectImages {
    return {
      name: '特效图片',
      images: [
        {
          name: '爆炸特效',
          file: '爆炸特效.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 40 * 1024, // 40KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '治疗特效',
          file: '治疗特效.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 40 * 1024, // 40KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '增益特效',
          file: '增益特效.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 40 * 1024, // 40KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '减益特效',
          file: '减益特效.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 40 * 1024, // 40KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '角色攻击特效',
          file: '角色攻击特效.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 40 * 1024, // 40KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '怪物攻击特效',
          file: '怪物攻击特效.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 40 * 1024, // 40KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'Boss攻击特效',
          file: 'Boss攻击特效.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 40 * 1024, // 40KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '卡牌特效',
          file: '卡牌特效.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 40 * 1024, // 40KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: '技能特效',
          file: '技能特效.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 40 * 1024, // 40KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        }
      ]
    };
  }
  
  /**
   * 创建UI图片数据
   */
  private createUIImageData(): UIImageData {
    return {
      name: 'UI图片',
      images: [
        {
          name: 'UI背景',
          file: 'UI背景.png',
          width: 1024,
          height: 768,
          format: 'png',
          size: 200 * 1024, // 200KB
          quality: 'high',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI按钮',
          file: 'UI按钮.png',
          width: 128,
          height: 64,
          format: 'png',
          size: 50 * 1024, // 50KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI图标',
          file: 'UI图标.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 30 * 1024, // 30KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI进度条',
          file: 'UI进度条.png',
          width: 512,
          height: 32,
          format: 'png',
          size: 100 * 1024, // 100KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI血条',
          file: 'UI血条.png',
          width: 256,
          height: 16,
          format: 'png',
          size: 50 * 1024, // 50KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI攻击条',
          file: 'UI攻击条.png',
          width: 256,
          height: 16,
          format: 'png',
          size: 50 * 1024, // 50KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI防御条',
          file: 'UI防御条.png',
          width: 256,
          height: 16,
          format: 'png',
          size: 50 * 1024, // 50KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI金币',
          file: 'UI金币.png',
          width: 32,
          height: 32,
          format: 'png',
          size: 20 * 1024, // 20KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI钻石',
          file: 'UI钻石.png',
          width: 32,
          height: 32,
          format: 'png',
          size: 20 * 1024, // 20KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI碎片',
          file: 'UI碎片.png',
          width: 32,
          height: 32,
          format: 'png',
          size: 20 * 1024, // 20KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI卡牌',
          file: 'UI卡牌.png',
          width: 64,
          height: 128,
          format: 'png',
          size: 50 * 1024, // 50KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI角色',
          file: 'UI角色.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 30 * 1024, // 30KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI怪物',
          file: 'UI怪物.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 30 * 1024, // 30KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UIBoss',
          file: 'UIBoss.png',
          width: 64,
          height: 64,
          format: 'png',
          size: 30 * 1024, // 30KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        },
        {
          name: 'UI特效',
          file: 'UI特效.png',
          width: 32,
          height: 32,
          format: 'png',
          size: 20 * 1024, // 20KB
          quality: 'medium',
          colorDepth: 24,
          transparency: true
        }
      ]
    };
  }
  
  /**
   * 获取角色图片
   * @param imageName 图片名称
   */
  getCharacterImage(imageName: string): ImageData {
    const image = this.characterImages.images.find(image => image.name === imageName);
    
    if (!image) {
      console.log(`角色图片 ${imageName} 不存在`);
      return null;
    }
    
    console.log(`获取角色图片 ${imageName}`);
    
    return image;
  }
  
  /**
   * 获取怪物图片
   * @param imageName 图片名称
   */
  getMonsterImage(imageName: string): ImageData {
    const image = this.monsterImages.images.find(image => image.name === imageName);
    
    if (!image) {
      console.log(`怪物图片 ${imageName} 不存在`);
      return null;
    }
    
    console.log(`获取怪物图片 ${imageName}`);
    
    return image;
  }
  
  /**
   * 获取卡牌图片
   * @param imageName 图片名称
   */
  getCardImage(imageName: string): ImageData {
    const image = this.cardImages.images.find(image => image.name === imageName);
    
    if (!image) {
      console.log(`卡牌图片 ${imageName} 不存在`);
      return null;
    }
    
    console.log(`获取卡牌图片 ${imageName}`);
    
    return image;
  }
  
  /**
   * 获取Boss图片
   * @param imageName 图片名称
   */
  getBossImage(imageName: string): ImageData {
    const image = this.bossImages.images.find(image => image.name === imageName);
    
    if (!image) {
      console.log(`Boss图片 ${imageName} 不存在`);
      return null;
    }
    
    console.log(`获取Boss图片 ${imageName}`);
    
    return image;
  }
  
  /**
   * 获取特效图片
   * @param imageName 图片名称
   */
  getEffectImage(imageName: string): ImageData {
    const image = this.effectImages.images.find(image => image.name === imageName);
    
    if (!image) {
      console.log(`特效图片 ${imageName} 不存在`);
      return null;
    }
    
    console.log(`获取特效图片 ${imageName}`);
    
    return image;
  }
  
  /**
   * 获取UI图片
   * @param imageName 图片名称
   */
  getUIImage(imageName: string): ImageData {
    const image = this.uiImages.images.find(image => image.name === imageName);
    
    if (!image) {
      console.log(`UI图片 ${imageName} 不存在`);
      return null;
    }
    
    console.log(`获取UI图片 ${imageName}`);
    
    return image;
  }
  
  /**
   * 获取所有角色图片
   */
  getAllCharacterImages(): CharacterImages {
    return this.characterImages;
  }
  
  /**
   * 获取所有怪物图片
   */
  getAllMonsterImages(): MonsterImages {
    return this.monsterImages;
  }
  
  /**
   * 获取所有卡牌图片
   */
  getAllCardImages(): CardImages {
    return this.cardImages;
  }
  
  /**
   * 获取所有Boss图片
   */
  getAllBossImages(): BossImages {
    return this.bossImages;
  }
  
  /**
   * 获取所有特效图片
   */
  getAllEffectImages(): EffectImages {
    return this.effectImages;
  }
  
  /**
   * 获取所有UI图片
   */
  getAllUIImageData(): UIImageData {
    return this.uiImages;
  }
  
  /**
   * 获取图片总量
   */
  getTotalImages(): number {
    const total = 
      this.characterImages.images.length +
      this.monsterImages.images.length +
      this.cardImages.images.length +
      this.bossImages.images.length +
      this.effectImages.images.length +
      this.uiImages.images.length;
    
    console.log(`图片总量: ${total}`);
    
    return total;
  }
  
  /**
   * 获取图片总大小
   */
  getTotalImageSize(): number {
    const totalSize = 
      this.characterImages.images.reduce((sum, image) => sum + image.size, 0) +
      this.monsterImages.images.reduce((sum, image) => sum + image.size, 0) +
      this.cardImages.images.reduce((sum, image) => sum + image.size, 0) +
      this.bossImages.images.reduce((sum, image) => sum + image.size, 0) +
      this.effectImages.images.reduce((sum, image) => sum + image.size, 0) +
      this.uiImages.images.reduce((sum, image) => sum + image.size, 0);
    
    console.log(`图片总大小: ${totalSize}KB`);
    
    return totalSize;
  }
  
  /**
   * 转换为JSON格式
   */
  toJSON(): string {
    return JSON.stringify({
      characterImages: this.characterImages,
      monsterImages: this.monsterImages,
      cardImages: this.cardImages,
      bossImages: this.bossImages,
      effectImages: this.effectImages,
      uiImages: this.uiImages
    }, null, 2);
  }
  
  /**
   * 转换为Cocos Creator图片文件格式
   */
  toImage(): string {
    const image = {
      _type: 'Image',
      data: {
        characterImages: this.characterImages,
        monsterImages: this.monsterImages,
        cardImages: this.cardImages,
        bossImages: this.bossImages,
        effectImages: this.effectImages,
        uiImages: this.uiImages
      }
    };
    
    return JSON.stringify(image, null, 2);
  }
}

/**
 * 角色图片数据
 */
export interface CharacterImages {
  name: string;
  images: ImageData[];
}

/**
 * 怪物图片数据
 */
export interface MonsterImages {
  name: string;
  images: ImageData[];
}

/**
 * 卡牌图片数据
 */
export interface CardImages {
  name: string;
  images: ImageData[];
}

/**
 * Boss图片数据
 */
export interface BossImages {
  name: string;
  images: ImageData[];
}

/**
 * 特效图片数据
 */
export interface EffectImages {
  name: string;
  images: ImageData[];
}

/**
 * UI图片数据
 */
export interface UIImageData {
  name: string;
  images: ImageData[];
}

/**
 * 图片数据
 */
export interface ImageData {
  name: string;
  file: string;
  width: number;
  height: number;
  format: string;
  size: number;
  quality: string;
  colorDepth: number;
  transparency: boolean;
}

/**
 * 图片系统测试
 */
export function testImageSystem() {
  const imageSystem = new ImageSystem();
  console.log('=== 图片系统测试 ===');
  
  // 测试获取角色图片
  const characterImage = imageSystem.getCharacterImage('雷恩');
  console.log(`角色图片名称: ${characterImage?.name}`);
  console.log(`角色图片文件: ${characterImage?.file}`);
  console.log(`角色图片宽度: ${characterImage?.width}`);
  console.log(`角色图片高度: ${characterImage?.height}`);
  console.log(`角色图片格式: ${characterImage?.format}`);
  console.log(`角色图片大小: ${characterImage?.size}`);
  console.log(`角色图片质量: ${characterImage?.quality}`);
  console.log(`角色图片颜色深度: ${characterImage?.colorDepth}`);
  console.log(`角色图片透明度: ${characterImage?.transparency}`);
  
  // 测试获取怪物图片
  const monsterImage = imageSystem.getMonsterImage('普通怪物');
  console.log(`怪物图片名称: ${monsterImage?.name}`);
  console.log(`怪物图片文件: ${monsterImage?.file}`);
  console.log(`怪物图片宽度: ${monsterImage?.width}`);
  console.log(`怪物图片高度: ${monsterImage?.height}`);
  console.log(`怪物图片格式: ${monsterImage?.format}`);
  console.log(`怪物图片大小: ${monsterImage?.size}`);
  console.log(`怪物图片质量: ${monsterImage?.quality}`);
  console.log(`怪物图片颜色深度: ${monsterImage?.colorDepth}`);
  console.log(`怪物图片透明度: ${monsterImage?.transparency}`);
  
  // 测试获取卡牌图片
  const cardImage = imageSystem.getCardImage('普通攻击卡');
  console.log(`卡牌图片名称: ${cardImage?.name}`);
  console.log(`卡牌图片文件: ${cardImage?.file}`);
  console.log(`卡牌图片宽度: ${cardImage?.width}`);
  console.log(`卡牌图片高度: ${cardImage?.height}`);
  console.log(`卡牌图片格式: ${cardImage?.format}`);
  console.log(`卡牌图片大小: ${cardImage?.size}`);
  console.log(`卡牌图片质量: ${cardImage?.quality}`);
  console.log(`卡牌图片颜色深度: ${cardImage?.colorDepth}`);
  console.log(`卡牌图片透明度: ${cardImage?.transparency}`);
  
  // 测试获取Boss图片
  const bossImage = imageSystem.getBossImage('第一章Boss');
  console.log(`Boss图片名称: ${bossImage?.name}`);
  console.log(`Boss图片文件: ${bossImage?.file}`);
  console.log(`Boss图片宽度: ${bossImage?.width}`);
  console.log(`Boss图片高度: ${bossImage?.height}`);
  console.log(`Boss图片格式: ${bossImage?.format}`);
  console.log(`Boss图片大小: ${bossImage?.size}`);
  console.log(`Boss图片质量: ${bossImage?.quality}`);
  console.log(`Boss图片颜色深度: ${bossImage?.colorDepth}`);
  console.log(`Boss图片透明度: ${bossImage?.transparency}`);
  
  // 测试获取特效图片
  const effectImage = imageSystem.getEffectImage('爆炸特效');
  console.log(`特效图片名称: ${effectImage?.name}`);
  console.log(`特效图片文件: ${effectImage?.file}`);
  console.log(`特效图片宽度: ${effectImage?.width}`);
  console.log(`特效图片高度: ${effectImage?.height}`);
  console.log(`特效图片格式: ${effectImage?.format}`);
  console.log(`特效图片大小: ${effectImage?.size}`);
  console.log(`特效图片质量: ${effectImage?.quality}`);
  console.log(`特效图片颜色深度: ${effectImage?.colorDepth}`);
  console.log(`特效图片透明度: ${effectImage?.transparency}`);
  
  // 测试获取UI图片
  const uiImage = imageSystem.getUIImage('UI背景');
  console.log(`UI图片名称: ${uiImage?.name}`);
  console.log(`UI图片文件: ${uiImage?.file}`);
  console.log(`UI图片宽度: ${uiImage?.width}`);
  console.log(`UI图片高度: ${uiImage?.height}`);
  console.log(`UI图片格式: ${uiImage?.format}`);
  console.log(`UI图片大小: ${uiImage?.size}`);
  console.log(`UI图片质量: ${uiImage?.quality}`);
  console.log(`UI图片颜色深度: ${uiImage?.colorDepth}`);
  console.log(`UI图片透明度: ${uiImage?.transparency}`);
  
  // 测试获取图片总量
  const totalImages = imageSystem.getTotalImages();
  console.log(`图片总量: ${totalImages}`);
  
  // 测试获取图片总大小
  const totalImageSize = imageSystem.getTotalImageSize();
  console.log(`图片总大小: ${totalImageSize}KB`);
  
  // 测试转换为JSON格式
  console.log(`图片系统JSON格式: ${imageSystem.toJSON()}`);
  
  // 测试转换为Cocos Creator图片文件格式
  console.log(`图片系统图片文件格式: ${imageSystem.toImage()}`);
  
  console.log('=== 图片系统测试完成 ===');
}