/**
 * 字体系统
 * Cocos Creator字体系统
 */

export class FontSystem {
  // 游戏字体数据
  private gameFonts: GameFonts;
  
  // UI字体数据
  private uiFonts: UIFonts;
  
  constructor() {
    this.gameFonts = this.createGameFonts();
    this.uiFonts = this.createUIFonts();
    
    console.log('字体系统初始化完成');
  }
  
  /**
   * 创建游戏字体数据
   */
  private createGameFonts(): GameFonts {
    return {
      name: '游戏字体',
      fonts: [
        {
          name: 'titleFont',
          file: 'title.ttf',
          size: 48,
          style: 'bold',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 2
        },
        {
          name: 'subtitleFont',
          file: 'subtitle.ttf',
          size: 32,
          style: 'bold',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 1
        },
        {
          name: 'buttonFont',
          file: 'button.ttf',
          size: 24,
          style: 'normal',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 1
        },
        {
          name: 'normalFont',
          file: 'normal.ttf',
          size: 16,
          style: 'normal',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 0
        },
        {
          name: 'smallFont',
          file: 'small.ttf',
          size: 12,
          style: 'normal',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 0
        }
      ]
    };
  }
  
  /**
   * 创建UI字体数据
   */
  private createUIFonts(): UIFonts {
    return {
      name: 'UI字体',
      fonts: [
        {
          name: 'uiTitleFont',
          file: 'ui_title.ttf',
          size: 36,
          style: 'bold',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 2
        },
        {
          name: 'uiButtonFont',
          file: 'ui_button.ttf',
          size: 24,
          style: 'bold',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 1
        },
        {
          name: 'uiNormalFont',
          file: 'ui_normal.ttf',
          size: 18,
          style: 'normal',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 0
        },
        {
          name: 'uiSmallFont',
          file: 'ui_small.ttf',
          size: 14,
          style: 'normal',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 0
        },
        {
          name: 'uiTipFont',
          file: 'ui_tip.ttf',
         5 size: 10,
          style: 'normal',
          color: '#ffffff',
          outlineColor: '#000000',
          outlineWidth: 0
        }
      ]
    };
  }
  
  /**
   * 获取游戏字体
   * @param fontName 字体名称
   */
  getGameFont(fontName: string): FontData {
    const font = this.gameFonts.fonts.find(font => font.name === fontName);
    
    if (!font) {
      console.log(`游戏字体 ${fontName} 不存在`);
      return null;
    }
    
    console.log(`获取游戏字体 ${fontName}`);
    
    return font;
  }
  
  /**
   * 获取UI字体
   * @param fontName 字体名称
   */
  getUIFont(fontName: string): FontData {
    const font = this.uiFonts.fonts.find(font => font.name === fontName);
    
    if (!font) {
      console.log(`UI字体 ${fontName} 不存在`);
      return null;
    }
    
    console.log(`获取UI字体 ${fontName}`);
    
    return font;
  }
  
  /**
   * 获取所有游戏字体
   */
  getAllGameFonts(): GameFonts {
    return this.gameFonts;
  }
  
  /**
   * 获取所有UI字体
   */
  getAllUIFonts(): UIFonts {
    return this.uiFonts;
  }
  
  /**
   * 创建标题字体
   */
  createTitleFont(): FontData {
    return {
      name: 'titleFont',
      file: 'title.ttf',
      size: 48,
      style: 'bold',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 2
    };
  }
  
  /**
   * 创建副标题字体
   */
  createSubtitleFont(): FontData {
    return {
      name: 'subtitleFont',
      file: 'subtitle.ttf',
      size: 32,
      style: 'bold',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 1
    };
  }
  
  /**
   * 创建按钮字体
   */
  createButtonFont(): FontData {
    return {
      name: 'buttonFont',
      file: 'button.ttf',
      size: 24,
      style: 'normal',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 1
    };
  }
  
  /**
   * 创建普通字体
   */
  createNormalFont(): FontData {
    return {
      name: 'normalFont',
      file: 'normal.ttf',
      size: 16,
      style: 'normal',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 0
    };
  }
  
  /**
   * 创建小字体
   */
  createSmallFont(): FontData {
    return {
      name: 'smallFont',
      file: 'small.ttf',
      size: 12,
      style: 'normal',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 0
    };
  }
  
  /**
   * 创建UITitle字体
   */
  createUITitleFont(): FontData {
    return {
      name: 'uiTitleFont',
      file: 'ui_title.ttf',
      size: 36,
      style: 'bold',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 2
    };
  }
  
  /**
   * 创建UIButton字体
   */
  createUIButtonFont(): FontData {
    return {
      name: 'uiButtonFont',
      file: 'ui_button.ttf',
      size: 24,
      style: 'bold',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 1
    };
  }
  
  /**
   * 创建UINormal字体
   */
  createUINormalFont(): FontData {
    return {
      name: 'uiNormalFont',
      file: 'ui_normal.ttf',
      size: 18,
      style: 'normal',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 0
    };
  }
  
  /**
   * 创建UISmall字体
   */
  createUISmallFont(): FontData {
    return {
      name: 'uiSmallFont',
      file: 'ui_small.ttf',
      size: 14,
      style: 'normal',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 0
    };
  }
  
  /**
   * 创建UITip字体
   */
  createUITipFont(): FontData {
    return {
      name: 'uiTipFont',
      file: 'ui_tip.ttf',
      size: 10,
      style: 'normal',
      color: '#ffffff',
      outlineColor: '#000000',
      outlineWidth: 0
    };
  }
  
  /**
   * 转换为JSON格式
   */
  toJSON(): string {
    return JSON.stringify({
      gameFonts: this.gameFonts,
      uiFonts: this.uiFonts
    }, null, 2);
  }
  
  /**
   * 转换为Cocos Creator字体文件格式
   */
  toFont(): string {
    const font = {
      _type: 'Font',
      data: {
        gameFonts: this.gameFonts,
        uiFonts: this.uiFonts
      }
    };
    
    return JSON.stringify(font, null, 2);
  }
}

/**
 * 游戏字体数据
 */
export interface GameFonts {
  name: string;
  fonts: FontData[];
}

/**
 * UI字体数据
 */
export interface UIFonts {
  name: string;
  fonts: FontData[];
}

/**
 * 字体数据
 */
export interface FontData {
  name: string;
  file: string;
  size: number;
  style: string;
  color: string;
  outlineColor: string;
  outlineWidth: number;
}

/**
 * 字体系统测试
 */
export function testFontSystem() {
  const fontSystem = new FontSystem();
  console.log('=== 字体系统测试 ===');
  
  // 测试获取游戏字体
  const titleFont = fontSystem.getGameFont('titleFont');
  console.log(`游戏字体名称: ${titleFont?.name}`);
  console.log(`游戏字体文件: ${titleFont?.file}`);
  console.log(`游戏字体大小: ${titleFont?.size}`);
  console.log(`游戏字体样式: ${titleFont?.style}`);
  console.log(`游戏字体颜色: ${titleFont?.color}`);
  console.log(`游戏字体边框颜色: ${titleFont?.outlineColor}`);
  console.log(`游戏字体边框宽度: ${titleFont?.outlineWidth}`);
  
  // 测试获取UI字体
  const uiButtonFont = fontSystem.getUIFont('uiButtonFont');
  console.log(`UI字体名称: ${uiButtonFont?.name}`);
  console.log(`UI字体文件: ${uiButtonFont?.file}`);
  console.log(`UI字体大小: ${uiButtonFont?.size}`);
  console.log(`UI字体样式: ${uiButtonFont?.style}`);
  console.log(`UI字体颜色: ${uiButtonFont?.color}`);
  console.log(`UI字体边框颜色: ${uiButtonFont?.outlineColor}`);
  console.log(`UI字体边框宽度: ${uiButtonFont?.outlineWidth}`);
  
  // 测试创建标题字体
  const createdTitleFont = fontSystem.createTitleFont();
  console.log(`创建的标题字体名称: ${createdTitleFont.name}`);
  console.log(`创建的标题字体文件: ${createdTitleFont.file}`);
  console.log(`创建的标题字体大小: ${createdTitleFont.size}`);
  console.log(`创建的标题字体样式: ${createdTitleFont.style}`);
  console.log(`创建的标题字体颜色: ${createdTitleFont.color}`);
  console.log(`创建的标题字体边框颜色: ${createdTitleFont.outlineColor}`);
  console.log(`创建的标题字体边框宽度: ${createdTitleFont.outlineWidth}`);
  
  // 测试创建副标题字体
  const createdSubtitleFont = fontSystem.createSubtitleFont();
  console.log(`创建的副标题字体名称: ${createdSubtitleFont.name}`);
  console.log(`创建的副标题字体文件: ${createdSubtitleFont.file}`);
  console.log(`创建的副标题字体大小: ${createdSubtitleFont.size}`);
  console.log(`创建的副标题字体样式: ${createdSubtitleFont.style}`);
  console.log(`创建的副标题字体颜色: ${createdSubtitleFont.color}`);
  console.log(`创建的副标题字体边框颜色: ${createdSubtitleFont.outlineColor}`);
  console.log(`创建的副标题字体边框宽度: ${createdSubtitleFont.outlineWidth}`);
  
  // 测试创建按钮字体
  const createdButtonFont = fontSystem.createButtonFont();
  console.log(`创建的按钮字体名称: ${createdButtonFont.name}`);
  console.log(`创建的按钮字体文件: ${createdButtonFont.file}`);
  console.log(`创建的按钮字体大小: ${createdButtonFont.size}`);
  console.log(`创建的按钮字体样式: ${createdButtonFont.style}`);
  console.log(`创建的按钮字体颜色: ${createdButtonFont.color}`);
  console.log(`创建的按钮字体边框颜色: ${createdButtonFont.outlineColor}`);
  console.log(`创建的按钮字体边框宽度: ${createdButtonFont.outlineWidth}`);
  
  // 测试创建普通字体
  const createdNormalFont = fontSystem.createNormalFont();
  console.log(`创建的普通字体名称: ${createdNormalFont.name}`);
  console.log(`创建的普通字体文件: ${createdNormalFont.file}`);
  console.log(`创建的普通字体大小: ${createdNormalFont.size}`);
  console.log(`创建的普通字体样式: ${createdNormalFont.style}`);
  console.log(`创建的普通字体颜色: ${createdNormalFont.color}`);
  console.log(`创建的普通字体边框颜色: ${createdNormalFont.outlineColor}`);
  console.log(`创建的普通字体边框宽度: ${createdNormalFont.outlineWidth}`);
  
  // 测试创建小字体
  const createdSmallFont = fontSystem.createSmallFont();
  console.log(`创建的小字体名称: ${createdSmallFont.name}`);
  console.log(`创建的小字体文件: ${createdSmallFont.file}`);
  console.log(`创建的小字体大小: ${createdSmallFont.size}`);
  console.log(`创建的小字体样式: ${createdSmallFont.style}`);
  console.log(`创建的小字体颜色: ${createdSmallFont.color}`);
  console.log(`创建的小字体边框颜色: ${createdSmallFont.outlineColor}`);
  console.log(`创建的小字体边框宽度: ${createdSmallFont.outlineWidth}`);
  
  // 测试创建UITitle字体
  const createdUITitleFont = fontSystem.createUITitleFont();
  console.log(`创建的UITitle字体名称: ${createdUITitleFont.name}`);
  console.log(`创建的UITitle字体文件: ${createdUITitleFont.file}`);
  console.log(`创建的UITitle字体大小: ${createdUITitleFont.size}`);
  console.log(`创建的UITitle字体样式: ${createdUITitleFont.style}`);
  console.log(`创建的UITitle字体颜色: ${createdUITitleFont.color}`);
  console.log(`创建的UITitle字体边框颜色: ${createdUITitleFont.outlineColor}`);
  console.log(`创建的UITitle字体边框宽度: ${createdUITitleFont.outlineWidth}`);
  
  // 测试创建UIButton字体
  const createdUIButtonFont = fontSystem.createUIButtonFont();
 7 console.log(`创建的UIButton字体名称: ${createdUIButtonFont.name}`);
  console.log(`创建的UIButton字体文件: ${createdUIButtonFont.file}`);
  console.log(`创建的UIButton字体大小: ${createdUIButtonFont.size}`);
  console.log(`创建的UIButton字体样式: ${createdUIButtonFont.style}`);
  console.log(`创建的UIButton字体颜色: ${createdUIButtonFont.color}`);
  console.log(`创建的UIButton字体边框颜色: ${createdUIButtonFont.outlineColor}`);
  console.log(`创建的UIButton字体边框宽度: ${createdUIButtonFont.outlineWidth}`);
  
  // 测试创建UINormal字体
  const createdUINormalFont = fontSystem.createUINormalFont();
  console.log(`创建的UINormal字体名称: ${createdUINormalFont.name}`);
  console.log(`创建的UINormal字体文件: ${createdUINormalFont.file}`);
  console.log(`创建的UINormal字体大小: ${createdUINormalFont.size}`);
  console.log(`创建的UINormal字体样式: ${createdUINormalFont.style}`);
  console.log(`创建的UINormal字体颜色: ${createdUINormalFont.color}`);
  console.log(`创建的UINormal字体边框颜色: ${createdUINormalFont.outlineColor}`);
  console.log(`创建的UINormal字体边框宽度: ${createdUINormalFont.outlineWidth}`);
  
  // 测试创建UISmall字体
  const createdUISmallFont = fontSystem.createUISmallFont();
  console.log(`创建的UISmall字体名称: ${createdUISmallFont.name}`);
  console.log(`创建的UISmall字体文件: ${createdUISmallFont.file}`);
  console.log(`创建的UISmall字体大小: ${createdUIS5mallFont.size}`);
  console.log(`创建的UISmall字体样式: ${createdUISmallFont.style}`);
  console.log(`创建的UISmall字体颜色: ${createdUISmallFont.color}`);
  console.log(`创建的UISmall字体边框颜色: ${createdUISmallFont.outlineColor}`);
  console.log(`创建的UISmall字体边框宽度: ${createdUISmallFont.outlineWidth}`);
  
  // 测试创建UITip字体
  const createdUITipFont = fontSystem.createUITipFont();
  console.log(`创建的UITip字体名称: ${createdUITipFont.name}`);
  console.log(`创建的UITip字体文件: ${createdUITipFont.file}`);
  console.log(`创建的UITip字体大小: ${createdUITipFont.size}`);
  console.log(`创建的UITip字体样式: ${createdUITipFont.style}`);
  console.log(`创建的UITip字体颜色: ${createdUITipFont.color}`);
  console.log(`创建的UITip字体边框颜色: ${createdUITipFont.outlineColor}`);
  console.log(`创建的UITip字体边框宽度: ${createdUITipFont.outlineWidth}`);
  
  // 测试转换为JSON格式
  console.log(`字体系统JSON格式: ${fontSystem.toJSON()}`);
  
  // 测试转换为Cocos Creator字体文件格式
  console.log(`字体系统字体文件格式: ${fontSystem.toFont()}`);
  
  console.log('=== 字体系统测试完成 ===');
}