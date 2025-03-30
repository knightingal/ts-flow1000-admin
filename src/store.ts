import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PicDetail {
  sectionIndex: number;
  name: string;
  cover: string;
  index: number;
  coverWidth: number;
  coverHeight: number;
  expanded: boolean;
  album: string;
  clientStatus: string;
}

export interface AlbumConfig {
  name: string,
  encrypted: boolean,
  baseUrl: string,
  sourcePath: string,
}

interface ConfigState {
  albumConfigMap: Map<string, AlbumConfig> 
}

const flow1000ConfigSlice = createSlice({
  name: "flow1000Config",
  initialState: {
    albumConfigMap: new Map<string, AlbumConfig>(),
  },
  reducers: {
    initConfig: (state: ConfigState, action: PayloadAction<AlbumConfig[]>) => {
      state.albumConfigMap = new Map(action.payload.map(config => [config.name, config]));
    }
  }
})

export const { initConfig, } = flow1000ConfigSlice.actions;

const flow1000ConfigReducer = flow1000ConfigSlice.reducer;

export const store = configureStore({
  reducer: {
    flow1000Config: flow1000ConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>