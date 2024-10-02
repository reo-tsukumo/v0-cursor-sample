import { combineReducers } from '@reduxjs/toolkit';
import slideEditorReducer from '@/features/slide-editor/slice';
import uploadFileReducer from '@/features/upload-file/slice';
import chatReducer from '@/features/chat/slice';

const rootReducer = combineReducers({
  slideEditor: slideEditorReducer,
  uploadFile: uploadFileReducer,
  chat: chatReducer,
});

export default rootReducer;