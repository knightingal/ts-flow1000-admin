import { configureStore, createSlice, PayloadAction, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";

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
  albumConfigList: AlbumConfig[],
}

interface Flow1000ContentState {
  width: number,
  height: number,
}

const flow1000ContentSlise = createSlice({
  name: "flow1000Content",
  initialState: {
    width: 0, height: 0,
  },
  reducers: {
    setWindowSize: (state: Flow1000ContentState, action: PayloadAction<{height: number, width: number}>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    }
  }
});

const flow1000ConfigSlice = createSlice<
  ConfigState, SliceCaseReducers<ConfigState>, string, SliceSelectors<ConfigState>, string
>({
  name: "flow1000Config",
  initialState: {
    albumConfigList: []
  },
  reducers: {
    initConfig: (state: ConfigState, action: PayloadAction<AlbumConfig[]>) => {
      state.albumConfigList = action.payload
    }
  }
});

export const { initConfig, } = flow1000ConfigSlice.actions;
export const { setWindowSize, } = flow1000ContentSlise.actions;

const flow1000ConfigReducer = flow1000ConfigSlice.reducer;
const flow1000ContentReducer = flow1000ContentSlise.reducer;

export const store = configureStore({
  reducer: {
    flow1000Config: flow1000ConfigReducer,
    flow1000Content: flow1000ContentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>