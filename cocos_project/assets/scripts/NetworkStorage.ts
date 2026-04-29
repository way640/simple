/**
 * 网络存储系统
 * 玩家进度保存和加载系统
 */

import { WeChatAdapter } from './WeChatAdapter';

export interface PlayerData {
  playerId: string;
  playerName: string;
  characterLevel: number;
  characterName: string;
  cardSystemData: CardSystemData;
  levelProgress: LevelProgress;
  economyData: EconomyData;
  gameHistory: GameHistory[];
  timestamp: number;
}

export interface CardSystemData {
  equippedCards: CardData[];
  currentCapacity: number;
  maxCapacity: number;
}

export interface CardData {
  name: string;
  rarity: string;
  color: string;
  baseValue: number;
  maxValue: number;
  baseCost: number;
  maxCost: number;
  description: string;
  level: number;
  value: number;
  cost: number;
}

export interface LevelProgress {
  currentChapter: number;
  currentWave: number;
  chapterHistory: ChapterHistory[];
  waveHistory: WaveHistory[];
}

export interface ChapterHistory {
  chapter: number;
  status: 'completed' | 'in_progress' | 'failed';
  completionDate: number;
  score: number;
}

export interface WaveHistory {
  wave: number;
  status: 'completed' | 'in_progress' | 'failed';
  completionDate: number;
  score: number;
}

export interface EconomyData {
  gold: number;
  diamonds: number;
  fragments: Record<string, number>;
  transactionHistory: Transaction[];
}

export interface Transaction {
  type: 'gold_add' | 'gold_subtract' | 'diamond_add' | 'diamond_subtract' | 'fragment_add' | 'fragment_subtract';
  amount: number;
  source?: string;
  purpose?: string;
  cardName?: string;
  timestamp: number;
}

export interface GameHistory {
  timestamp: number;
  chapter: number;
  wave: number;
  playerName: string;
  score: number;
  cards: CardData[];
  duration: number;
}

export class NetworkStorage {
  // 微信适配器
  private adapter: WeChatAdapter;
  
  // 存储键
  private storageKeys = {
    playerData: 'survivor_card_evolution_player_data',
    gameHistory: 'survivor_card_evolution_game_history',
    settings: 'survivor_card_evolution_settings',
    cache: 'survivor_card_evolution_cache'
  };
  
  constructor() {
    this.adapter = new WeChatAdapter();
  }
  
  /**
   * 保存玩家数据
   * @param playerData 玩家数据
   */
  savePlayerData(playerData: PlayerData): Promise<void> {
    return this.adapter.setStorage(this.storageKeys.playerData, playerData);
  }
  
  /**
   * 加载玩家数据
   */
  loadPlayerData(): Promise<PlayerData> {
    return this.adapter.getStorage(this.storageKeys.playerData).then(data => {
      // 如果没有数据，返回默认数据
      if (!data || Object.keys(data).length === 0) {
        return this.createDefaultPlayerData();
      }
      
      return data;
    }).catch(err => {
      console.log('加载玩家数据失败:', err);
      return this.createDefaultPlayerData();
    });
  }
  
  /**
   * 保存游戏历史
   * @param gameHistory 游戏历史
   */
  saveGameHistory(gameHistory: GameHistory): Promise<void> {
    // 先加载现有历史
    return this.adapter.getStorage(this.storageKeys.gameHistory).then(existingHistory => {
      const historyArray = existingHistory || [];
      
      // 添加新历史
      historyArray.push(gameHistory);
      
      // 保存历史
      return this.adapter.setStorage(this.storageKeys.gameHistory, historyArray);
    }).catch(err => {
      console.log('保存游戏历史失败:', err);
    });
  }
  
  /**
   * 加载游戏历史
   */
  loadGameHistory(): Promise<GameHistory[]> {
    return this.adapter.getStorage(this.storageKeys.gameHistory).then(data => {
      return data || [];
    }).catch(err => {
      console.log('加载游戏历史失败:', err);
      return [];
    });
  }
  
  /**
   * 保存设置
   * @param settings 设置
   */
  saveSettings(settings: any): Promise<void> {
    return this.adapter.setStorage(this.storageKeys.settings, settings);
  }
  
  /**
   * 加载设置
   */
  loadSettings(): Promise<any> {
    return this.adapter.getStorage(this.storageKeys.settings).then(data => {
      return data || {};
    }).catch(err => {
      console.log('加载设置失败:', err);
      return {};
    });
  }
  
  /**
   * 保存缓存
   * @param cache 缓存
   */
  saveCache(cache: any): Promise<void> {
    return this.adapter.setStorage(this.storageKeys.cache, cache);
  }
  
  /**
   * 加载缓存
   */
  loadCache(): Promise<any> {
    return this.adapter.getStorage(this.storageKeys.cache).then(data => {
      return data || {};
    }).catch(err => {
      console.log('加载缓存失败:', err);
      return {};
    });
  }
  
  /**
   * 同步到云端
   */
  syncToCloud(): Promise<void> {
    // 先加载本地数据
    return this.loadPlayerData().then(playerData => {
      // 检查网络连接
      return this.adapter.getNetworkType().then(networkType => {
        if (networkType.networkType === 'wifi' || networkType.networkType === '4g') {
          // 同步到云端
          console.log('同步到云端');
          
          // 这里可以实现云端存储
          // 暂时使用模拟实现
          return Promise.resolve();
        } else {
          console.log('网络连接不佳，延迟同步');
          return Promise.resolve();
        }
      });
    }).catch(err => {
      console.log('同步到云端失败:', err);
      return Promise.resolve();
    });
  }
  
  /**
   * 从云端加载
   */
  loadFromCloud(): Promise<PlayerData> {
    // 检查网络连接
    return this.adapter.getNetworkType().then(networkType => {
      if (networkType.networkType === 'wifi' || networkType.networkType === '4g') {
        // 从云端加载
        console.log('从云端加载');
        
        // 这里可以实现云端加载
        // 暂时使用模拟实现
        return Promise.resolve(this.createDefaultPlayerData());
      } else {
        console.log('网络连接不佳，使用本地数据');
        return this.loadPlayerData();
      }
    }).catch(err => {
      console.log('从云端加载失败:', err);
      return this.loadPlayerData();
    });
  }
  
  /**
   * 备份数据
   */
  backupData(): Promise<void> {
    // 加载所有数据
    return this.loadPlayerData().then(playerData => {
      return this.loadGameHistory().then(gameHistory => {
        return this.loadSettings().then(settings => {
          // 备份数据
          const backupData = {
            playerData,
            gameHistory,
            settings,
            timestamp: Date.now()
          };
          
          // 保存备份
          return this.adapter.setStorage(`${this.storageKeys.playerData}_backup`, backupData);
        });
      });
    }).catch(err => {
      console.log('备份数据失败:', err);
    });
  }
  
  /**
   * 恢复数据
   */
  restoreData(): Promise<void> {
    // 加载备份数据
    return this.adapter.getStorage(`${this.storageKeys.playerData}_backup`).then(backupData => {
      if (backupData) {
        // 恢复数据
        return this.adapter.setStorage(this.storageKeys.playerData, backupData.playerData).then(() => {
          return this.adapter.setStorage(this.storageKeys.gameHistory, backupData.gameHistory).then(() => {
            return this.adapter.setStorage(this.storageKeys.settings, backupData.settings);
          });
        });
      } else {
        console.log('没有备份数据');
        return Promise.resolve();
      }
    }).catch(err => {
      console.log('恢复数据失败:', err);
    });
  }
  
  /**
   * 清除数据
   */
  clearData(): Promise<void> {
    // 清除所有数据
    return this.adapter.setStorage(this.storageKeys.playerData, {}).then(() => {
      return this.adapter.setStorage(this.storageKeys.gameHistory, []).then(() => {
        return this.adapter.setStorage(this.storageKeys.settings, {}).then(() => {
          return this.adapter.setStorage(this.storageKeys.cache, {});
        });
      });
    }).catch(err => {
      console.log('清除数据失败:', err);
    });
  }
  
  /**
   * 创建默认玩家数据
   */
  private createDefaultPlayerData(): PlayerData {
    return {
      playerId: 'default_player',
      playerName: '新玩家',
      characterLevel: 1,
      characterName: '雷恩',
      cardSystemData: {
        equippedCards: [],
        currentCapacity: 0,
        maxCapacity: 30
      },
      levelProgress: {
        currentChapter: 1,
        currentWave: 1,
        chapterHistory: [],
        waveHistory: []
      },
      economyData: {
        gold: 100,
        diamonds: 50,
        fragments: {},
        transactionHistory: []
      },
      gameHistory: [],
      timestamp: Date.now()
    };
  }
  
  /**
   * 更新玩家数据
   */
  updatePlayerData(playerData: PlayerData): Promise<void> {
    // 更新玩家数据
    return this.savePlayerData(playerData);
  }
  
  /**
   * 更新游戏历史
   */
  updateGameHistory(gameHistory: GameHistory): Promise<void> {
    // 更新游戏历史
    return this.saveGameHistory(gameHistory);
  }
  
  /**
   * 更新经济数据
   */
  updateEconomyData(economyData: EconomyData): Promise<void> {
    // 加载玩家数据
    return this.loadPlayerData().then(playerData => {
      playerData.economyData = economyData;
      playerData.timestamp = Date.now();
      
      // 保存更新后的玩家数据
      return this.savePlayerData(playerData);
    }).catch(err => {
      console.log('更新经济数据失败:', err);
    });
  }
  
  /**
   * 更新关卡进度
   */
  updateLevelProgress(levelProgress: LevelProgress): Promise<void> {
    // 加载玩家数据
    return this.loadPlayerData().then(playerData => {
      playerData.levelProgress = levelProgress;
      playerData.timestamp = Date.now();
      
      // 保存更新后的玩家数据
      return this.savePlayerData(playerData);
    }).catch(err => {
      console.log('更新关卡进度失败:', err);
    });
  }
  
  /**
   * 更新卡牌系统数据
   */
  updateCardSystemData(cardSystemData: CardSystemData): Promise<void> {
    // 加载玩家数据
    return this.loadPlayerData().then(playerData => {
      playerData.cardSystemData = cardSystemData;
      playerData.timestamp = Date.now();
      
      // 保存更新后的玩家数据
      return this.savePlayerData(playerData);
    }).catch(err => {
      console.log('更新卡牌系统数据失败:', err);
    });
  }
}

/**
 * 网络存储系统测试
 */
export function testNetworkStorage() {
  const storage = new NetworkStorage();
  
  console.log('=== 网络存储系统测试 ===');
  
  // 测试保存玩家数据
  const playerData = storage.createDefaultPlayerData();
  storage.savePlayerData(playerData).then(() => {
    console.log('保存玩家数据成功');
  }).catch(err => {
    console.log('保存玩家数据失败:', err);
  });
  
  // 测试加载玩家数据
  storage.loadPlayerData().then(data => {
    console.log('加载玩家数据成功:', data);
  }).catch(err => {
    console.log('加载玩家数据失败:', err);
  });
  
  // 测试保存游戏历史
  const gameHistory: GameHistory = {
    timestamp: Date.now(),
    chapter: 1,
    wave: 1,
    playerName: '测试玩家',
    score: 100,
    cards: [],
    duration: 60
  };
  
  storage.saveGameHistory(gameHistory).then(() => {
    console.log('保存游戏历史成功');
  }).catch(err => {
    console.log('保存游戏历史失败:', err);
  });
  
  // 测试加载游戏历史
  storage.loadGameHistory().then(data => {
    console.log('加载游戏历史成功:', data);
  }).catch(err => {
    console.log('加载游戏历史失败:', err);
  });
  
  // 测试同步到云端
  storage.syncToCloud().then(() => {
    console.log('同步到云端成功');
  }).catch(err => {
    console.log('同步到云端失败:', err);
  });
  
  // 测试从云端加载
  storage.loadFromCloud().then(data => {
    console.log('从云端加载成功:', data);
  }).catch(err => {
    console('从云端加载失败:', err);
  });
  
  // 测试备份数据
  storage.backupData().then(() => {
    console.log('备份数据成功');
  }).catch(err => {
    console.log('备份数据失败:', err);
  });
  
  // 测试恢复数据
  storage.restoreData().then(() => {
    console.log('恢复数据成功');
  }).catch(err => {
    console.log('恢复数据失败:', err);
  });
  
  console.log('=== 网络存储系统测试完成 ===');
}