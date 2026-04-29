/**
 * 音频系统
 * Cocos Creator音频系统
 */

export class AudioSystem {
  // 背景音乐
  private backgroundMusic: BackgroundMusicData;
  
  // 音效
  private soundEffects: SoundEffectData[];
  
  // 语音
  private voice: VoiceData[];
  
  constructor() {
    this.backgroundMusic = this.createBackgroundMusic();
    this.soundEffects = this.createSoundEffects();
    this.voice = this.createVoice();
    
    console.log('音频系统初始化完成');
  }
  
  /**
   * 创建背景音乐数据
   */
  private createBackgroundMusic(): BackgroundMusicData {
    return {
      name: 'backgroundMusic',
      file: 'background_music.mp3',
      duration: 60,
      loop: true,
      volume: 0.5
    };
  }
  
  /**
   * 创建音效数据
   */
  private createSoundEffects(): SoundEffectData[] {
    return [
      {
        name: 'attackSound',
        file: 'attack_sound.mp3',
        duration: 1,
        loop: false,
        volume: 0.8
      },
      {
        name: 'skillSound',
        file: 'skill_sound.mp3',
        duration: 2,
        loop: false,
        volume: 0.9
      },
      {
        name: 'cardSound',
        file: 'card_sound.mp3',
        duration: 0.5,
        loop: false,
        volume: 0.6
      },
      {
        name: 'monsterSound',
        file: 'monster_sound.mp3',
        duration: 1,
        loop: false,
        volume: 0.7
      },
      {
        name: 'bossSound',
        file: 'boss_sound.mp3',
        duration: 2,
        loop: false,
        volume: 1.0
      },
      {
        name: 'victorySound',
        file: 'victory_sound.mp3',
        duration: 3,
        loop: false,
        volume: 1.0
      },
      {
        name: 'failSound',
        file: 'fail_sound.mp3',
        duration: 3,
        loop: false,
        volume: 1.0
      }
    ];
  }
  
  /**
   * 创建语音数据
   */
  private createVoice(): VoiceData[] {
    return [
      {
        name: 'characterVoice',
        file: 'character_voice.mp3',
        duration: 5,
        loop: false,
        volume: 1.0
      },
      {
        name: 'monsterVoice',
        file: 'monster_voice.mp3',
        duration: 5,
        loop: false,
        volume: 1.0
      },
      {
        name: 'bossVoice',
        file: 'boss_voice.mp3',
        duration: 5,
        loop: false,
        volume: 1.0
      }
    ];
  }
  
  /**
   * 播放背景音乐
   */
  playBackgroundMusic(): SoundResult {
    console.log('播放背景音乐');
    
    return {
      name: this.backgroundMusic.name,
      file: this.backgroundMusic.file,
      duration: this.backgroundMusic.duration,
      volume: this.backgroundMusic.volume
    };
  }
  
  /**
   * 播放音效
   * @param soundName 音效名称
   */
  playSoundEffect(soundName: string): SoundResult {
    const soundEffect = this.soundEffects.find(sound => sound.name === soundName);
    
    if (!soundEffect) {
      console.log(`音效 ${soundName} 不存在`);
      return null;
    }
    
    console.log(`播放音效 ${soundName}`);
    
    return {
      name: soundEffect.name,
      file: soundEffect.file,
      duration: soundEffect.duration,
      volume: soundEffect.volume
    };
  }
  
  /**
   * 播放语音
   * @param voiceName 语音名称
   */
  playVoice(voiceName: string): SoundResult {
    const voice = this.voice.find(v => v.name === voiceName);
    
    if (!voice) {
      console.log(`语音 ${voiceName} 不存在`);
      return null;
    }
    
    console.log(`播放语音 ${voiceName}`);
    
    return {
      name: voice.name,
      file: voice.file,
      duration: voice.duration,
      volume: voice.volume
    };
  }
  
  /**
   * 停止背景音乐
   */
  stopBackgroundMusic(): void {
    console.log('停止背景音乐');
  }
  
  /**
   * 停止音效
   * @param soundName 音效名称
   */
  stopSoundEffect(soundName: string): void {
    const soundEffect = this.soundEffects.find(sound => sound.name === soundName);
    
    if (!soundEffect) {
      console.log(`音效 ${soundName} 不存在`);
      return;
    }
    
    console.log(`停止音效 ${soundName}`);
  }
  
  /**
   * 停止语音
   * @param voiceName 语音名称
   */
  stopVoice(voiceName: string): void {
    const voice = this.voice.find(v => v.name === voiceName);
    
    if (!voice) {
      console.log(`语音 ${voiceName} 不存在`);
      return;
    }
    
    console.log(`停止语音 ${voiceName}`);
  }
  
  /**
   * 设置背景音乐音量
   * @param volume 音量
   */
  setBackgroundMusicVolume(volume: number): void {
    this.backgroundMusic.volume = volume;
    console.log(`设置背景音乐音量: ${volume}`);
  }
  
  /**
   * 设置音效音量
   * @param volume 音量
   */
  setSoundEffectVolume(volume: number): void {
    this.soundEffects.forEach(sound => {
      sound.volume = volume;
    });
    
    console.log(`设置音效音量: ${volume}`);
  }
  
  /**
   * 设置语音音量
   * @param volume 音量
   */
  setVoiceVolume(volume: number): void {
    this.voice.forEach(v => {
      v.volume = volume;
    });
    
    console.log(`设置语音音量: ${volume}`);
  }
  
  /**
   * 创建攻击音效
   */
  createAttackSoundEffect(): SoundEffectData {
    return {
      name: 'attackSound',
      file: 'attack_sound.mp3',
      duration: 1,
      loop: false,
      volume: 0.8
    };
  }
  
  /**
   * 创建技能音效
   */
  createSkillSoundEffect(): SoundEffectData {
    return {
      name: 'skillSound',
      file: 'skill_sound.mp3',
      duration: 2,
      loop: false,
      volume: 0.9
    };
  }
  
  /**
   * 创建卡牌音效
   */
  createCardSoundEffect(): SoundEffectData {
    return {
      name: 'cardSound',
      file: 'card_sound.mp3',
      duration: 0.5,
      loop: false,
      volume: 0.6
    };
  }
  
  /**
   * 创建怪物音效
   */
  createMonsterSoundEffect(): SoundEffectData {
    return {
      name: 'monsterSound',
      file: 'monster_sound.mp3',
      duration: 1,
      loop: false,
      volume: 0.7
    };
  }
  
  /**
   * 创建Boss音效
   */
  createBossSoundEffect(): SoundEffectData {
    return {
      name: 'bossSound',
      file: 'boss_sound.mp3',
      duration: 2,
      loop: false,
      volume: 1.0
    };
  }
  
  /**
   * 创建胜利音效
   */
  createVictorySoundEffect(): SoundEffectData {
    return {
      name: 'victorySound',
      file: 'victory_sound.mp3',
      duration: 3,
      loop: false,
      volume: 1.0
    };
  }
  
  /**
   * 创建失败音效
   */
  createFailSoundEffect(): SoundEffectData {
    return {
      name: 'failSound',
      file: 'fail_sound.mp3',
      duration: 3,
      loop: false,
      volume: 1.0
    };
  }
  
  /**
   * 创建角色语音
   */
  createCharacterVoice(): VoiceData {
    return {
      name: 'characterVoice',
      file: 'character_voice.mp3',
      duration: 5,
      loop: false,
      volume: 1.0
    };
  }
  
  /**
   * 创建怪物语音
   */
  createMonsterVoice(): VoiceData {
    return {
      name: 'monsterVoice',
      file: 'monster_voice.mp3',
      duration: 5,
      loop: false,
      volume: 1.0
    };
  }
  
  /**
   * 创建Boss语音
   */
  createBossVoice(): VoiceData {
    return {
      name: 'bossVoice',
      file: 'boss_voice.mp3',
      duration: 5,
      loop: false,
      volume: 1.0
    };
  }
  
  /**
   * 获取背景音乐
   */
  getBackgroundMusic(): BackgroundMusicData {
    return this.backgroundMusic;
  }
  
  /**
   * 获取音效列表
   */
  getSoundEffects(): SoundEffectData[] {
    return this.soundEffects;
  }
  
  /**
   * 获取语音列表
   */
  getVoice(): VoiceData[] {
    return this.voice;
  }
  
  /**
   * 转换为JSON格式
   */
  toJSON(): string {
    return JSON.stringify({
      backgroundMusic: this.backgroundMusic,
      soundEffects: this.soundEffects,
      voice: this.voice
    }, null, 2);
  }
  
  /**
   * 转换为Cocos Creator音频文件格式
   */
  toAudio(): string {
    const audio = {
      _type: 'Audio',
      data: {
        backgroundMusic: this.backgroundMusic,
        soundEffects: this.soundEffects,
        voice: this.voice
      }
    };
    
    return JSON.stringify(audio, null, 2);
  }
}

/**
 * 背景音乐数据
 */
export interface BackgroundMusicData {
  name: string;
  file: string;
  duration: number;
  loop: boolean;
  volume: number;
}

/**
 * 音效数据
 */
export interface SoundEffectData {
  name: string;
  file: string;
  duration: number;
  loop: boolean;
  volume: number;
}

/**
 * 语音数据
 */
export interface VoiceData {
  name: string;
  file: string;
  duration: number;
  loop: boolean;
  volume: number;
}

/**
 * 声音结果
 */
export interface SoundResult {
  name: string;
  file: string;
  duration: number;
  volume: number;
}

/**
 * 音频系统测试
 */
export function testAudioSystem() {
  const audioSystem = new AudioSystem();
  console.log('=== 音频系统测试 ===');
  
  // 测试背景音乐
  const backgroundMusic = audioSystem.playBackgroundMusic();
  console.log(`背景音乐名称: ${backgroundMusic.name}`);
  console.log(`背景音乐文件: ${backgroundMusic.file}`);
  console.log(`背景音乐时长: ${backgroundMusic.duration}`);
  console.log(`背景音乐音量: ${backgroundMusic.volume}`);
  
  // 测试音效
  const attackSound = audioSystem.playSoundEffect('attackSound');
  console.log(`攻击音效名称: ${attackSound?.name}`);
  console.log(`攻击音效文件: ${attackSound?.file}`);
  console.log(`攻击音效时长: ${attackSound?.duration}`);
  console.log(`攻击音效音量: ${attackSound?.volume}`);
  
  // 测试语音
  const characterVoice = audioSystem.playVoice('characterVoice');
  console.log(`角色语音名称: ${characterVoice?.name}`);
  console.log(`角色语音文件: ${characterVoice?.file}`);
  console.log(`角色语音时长: ${characterVoice?.duration}`);
  console.log(`角色语音音量: ${characterVoice?.volume}`);
  
  // 测试创建攻击音效
  const attackSoundEffect = audioSystem.createAttackSoundEffect();
  console.log(`攻击音效: ${attackSoundEffect.name}`);
  console.log(`攻击音效文件: ${attackSoundEffect.file}`);
  console.log(`攻击音效时长: ${attackSoundEffect.duration}`);
  console.log(`攻击音效音量: ${attackSoundEffect.volume}`);
  
  // 测试创建技能音效
  const skillSoundEffect = audioSystem.createSkillSoundEffect();
  console.log(`技能音效: ${skillSoundEffect.name}`);
  console.log(`技能音效文件: ${skillSoundEffect.file}`);
  console.log(`技能音效时长: ${skillSoundEffect.duration}`);
  console.log(`技能音效音量: ${skillSoundEffect.volume}`);
  
  // 测试创建卡牌音效
  const cardSoundEffect = audioSystem.createCardSoundEffect();
  console.log(`卡牌音效: ${cardSoundEffect.name}`);
  console.log(`卡牌音效文件: ${cardSoundEffect.file}`);
  console.log(`卡牌音效时长: ${cardSoundEffect.duration}`);
  console.log(`卡牌音效音量: ${cardSoundEffect.volume}`);
  
  // 测试创建怪物音效
  const monsterSoundEffect = audioSystem.createMonsterSoundEffect();
  console.log(`怪物音效: ${monsterSoundEffect.name}`);
  console.log(`怪物音效文件: ${monsterSoundEffect.file}`);
  console.log(`怪物音效时长: ${monsterSoundEffect.duration}`);
  console.log(`怪物音效音量: ${monsterSoundEffect.volume}`);
  
  // 测试创建Boss音效
  const bossSoundEffect = audioSystem.createBossSoundEffect();
  console.log(`Boss音效: ${bossSoundEffect.name}`);
  console.log(`Boss音效文件: ${bossSoundEffect.file}`);
  console.log(`Boss音效时长: ${bossSoundEffect.duration}`);
  console.log(`Boss音效音量: ${bossSoundEffect.volume}`);
  
  // 测试创建胜利音效
  const victorySoundEffect = audioSystem.createVictorySoundEffect();
  console.log(`胜利音效: ${victorySoundEffect.name}`);
  console.log(`胜利音效文件: ${victorySoundEffect.file}`);
  console.log(`胜利音效时长: ${victorySoundEffect.duration}`);
  console.log(`胜利音效音量: ${victorySoundEffect.volume}`);
  
  // 测试创建失败音效
  const failSoundEffect = audioSystem.createFailSoundEffect();
  console.log(`失败音效: ${failSoundEffect.name}`);
  console.log(`失败音效文件: ${failSoundEffect.file}`);
  console.log(`失败音效时长: ${failSoundEffect.duration}`);
  console.log(`失败音效音量: ${failSoundEffect.volume}`);
  
  // 测试创建角色语音
  const characterVoiceData = audioSystem.createCharacterVoice();
  console.log(`角色语音: ${characterVoiceData.name}`);
  console.log(`角色语音文件: ${characterVoiceData.file}`);
  console.log(`角色语音时长: ${characterVoiceData.duration}`);
  console.log(`角色语音音量: ${characterVoiceData.volume}`);
  
  // 测试创建怪物语音
  const monsterVoiceData = audioSystem.createMonsterVoice();
  console.log(`怪物语音: ${monsterVoiceData.name}`);
  console.log(`怪物语音文件: ${monsterVoiceData.file}`);
  console.log(`怪物语音时长: ${monsterVoiceData.duration}`);
  console.log(`怪物语音音量: ${monsterVoiceData.volume}`);
  
  // 测试创建Boss语音
  const bossVoiceData = audioSystem.createBossVoice();
  console.log(`Boss语音: ${bossVoiceData.name}`);
  console.log(`Boss语音文件: ${bossVoiceData.file}`);
  console.log(`Boss语音时长: ${bossVoiceData.duration}`);
  console.log(`Boss语音音量: ${bossVoiceData.volume}`);
  
  // 测试转换为JSON格式
  console.log(`音频系统JSON格式: ${audioSystem.toJSON()}`);
  
  // 测试转换为Cocos Creator音频文件格式
  console.log(`音频系统音频文件格式: ${audioSystem.toAudio()}`);
  
  console.log('=== 音频系统测试完成 ===');
}