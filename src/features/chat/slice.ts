import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message, Artifact } from './types';

const initialState: ChatState = {
  messages: [],
  artifacts: [],
  currentArtifactId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    removeMessagesByType: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(message => message.type !== action.payload);
    },
    addArtifact: (state, action: PayloadAction<Artifact>) => {
      state.artifacts.push(action.payload);
      state.currentArtifactId = action.payload.id;
    },
    setCurrentArtifact: (state, action: PayloadAction<number>) => {
      state.currentArtifactId = action.payload;
    },
    resetChat: (state) => {
      state.messages = [];
      state.artifacts = [];
      state.currentArtifactId = null;
    },
  },
});

export const { addMessage, removeMessagesByType, addArtifact, setCurrentArtifact, resetChat } = chatSlice.actions;

export default chatSlice.reducer;