import { combineReducers } from '@reduxjs/toolkit';
import slideEditorReducer from '@/features/slide-editor/slice';
import uploadFileReducer from '@/features/upload-file/slice';

const rootReducer = combineReducers({
  slideEditor: slideEditorReducer,
  uploadFile: uploadFileReducer,
});

export default rootReducer;