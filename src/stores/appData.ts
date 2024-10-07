import { create, StoreApi } from 'zustand';
import {
  CollidableItem,
  InteractiveItem,
  Level,
  PlayerDirection,
  PlayerState,
} from '../types';
import { levels } from '@/lib/map';

//TODO
// import { persist } from 'zustand/middleware';

type AppDataStoreData = {
  interactiveItem?: InteractiveItem;
  activeObstacle?: CollidableItem;
  playerState: PlayerState;
  playerDirection: PlayerDirection;
  currentLevelIndex: number;
  currentLevel: Level;
  obstacles: CollidableItem[];
  interactiveItems: InteractiveItem[];
};

const defaultAppDataStore: AppDataStoreData = {
  playerState: 'idle',
  playerDirection: 'right',
  currentLevelIndex: 0,
  currentLevel: levels[0],
  obstacles: [],
  interactiveItems: [],
};

type AppDataStoreActions = {
  setInteractiveItem: (interactiveItem?: InteractiveItem) => void;
  setActiveObstacle: (activeObstacle?: CollidableItem) => void;
  setPlayerState: (playerState: PlayerState) => void;
  setPlayerDirection: (playerDirection: PlayerDirection) => void;
  setCurrentLevelIndex: (currentLevelIndex: number) => void;
  setObstacles: (obstacles: CollidableItem[]) => void;
  setInteractiveItems: (interactiveItems: InteractiveItem[]) => void;
};

type InteractiveActions = {
  SIGN: () => void;
  NEXT_LEVEL: () => void;
};

type AppDataStore = AppDataStoreData & AppDataStoreActions & InteractiveActions;

export type FullAppDataStoreState = AppDataStore;

const getInteractiveActions = (
  set: StoreApi<FullAppDataStoreState>['setState'],
  get: StoreApi<FullAppDataStoreState>['getState'],
  _store: StoreApi<FullAppDataStoreState>
) => ({
  SIGN: () => {
    const currentLevelIndex = get().currentLevelIndex;
    if (currentLevelIndex > 0) {
      set({ currentLevelIndex: currentLevelIndex - 1 });
    }
  },
  NEXT_LEVEL: () => {
    const currentLevelIndex = get().currentLevelIndex;
    if (currentLevelIndex < levels.length - 1) {
      get().setCurrentLevelIndex(currentLevelIndex + 1);
    }
  },
});

const getActions = (
  set: StoreApi<FullAppDataStoreState>['setState'],
  _get: StoreApi<FullAppDataStoreState>['getState'],
  _store: StoreApi<FullAppDataStoreState>
) => ({
  setInteractiveItem: (interactiveItem?: InteractiveItem) => {
    set({ interactiveItem });
  },
  setActiveObstacle: (activeObstacle?: CollidableItem) => {
    set({ activeObstacle });
  },
  setPlayerState: (playerState: PlayerState) => {
    set({ playerState });
  },
  setPlayerDirection: (playerDirection: PlayerDirection) => {
    set({ playerDirection });
  },
  setCurrentLevelIndex: (currentLevelIndex: number) => {
    set({ currentLevelIndex, currentLevel: levels[currentLevelIndex] });
  },
  setObstacles: (obstacles: CollidableItem[]) => {
    set({ obstacles });
  },
  setInteractiveItems: (interactiveItems: InteractiveItem[]) => {
    set({ interactiveItems });
  },
});

export const useAppDataStore = create<FullAppDataStoreState>()(
  (set, get, store) => ({
    ...defaultAppDataStore,
    ...getActions(set, get, store),
    ...getInteractiveActions(set, get, store),
  })
);
