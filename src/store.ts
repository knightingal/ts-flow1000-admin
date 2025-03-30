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
  albumConfigs: AlbumConfig[]
}

const flow1000ConfigSlice = createSlice({
  name: "flow1000Config",
  initialState: {
    albumConfigs: Array<AlbumConfig>(),
  },
  reducers: {
    initConfig: (state: ConfigState, action: PayloadAction<ConfigState>) => {
      state.albumConfigs = action.payload.albumConfigs
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