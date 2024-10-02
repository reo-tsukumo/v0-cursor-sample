import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message, Artifact } from './types';

// チャットの初期状態
const initialState: ChatState = {
  messages: [],
  artifacts: [],
  currentArtifactId: null,
};

// チャット機能のRedux Sliceを定義
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // 新しいメッセージを追加するアクション
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    // 新しいアーティファクトを追加するアクション
    addArtifact: (state, action: PayloadAction<Artifact>) => {
      state.artifacts.push(action.payload);
      state.currentArtifactId = action.payload.id;  // 新しいアーティファクトを現在の表示対象に設定
    },
    // 現在表示中のアーティファクトを変更するアクション
    setCurrentArtifact: (state, action: PayloadAction<number>) => {
      state.currentArtifactId = action.payload;
    },
  },
});

// アクションクリエーターをエクスポート
export const { addMessage, addArtifact, setCurrentArtifact } = chatSlice.actions;

// Reducerをエクスポート
export default chatSlice.reducer;