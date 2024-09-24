import { combineReducers } from '@reduxjs/toolkit';
import slideEditorReducer from '@/features/slide-editor/slice';

const rootReducer = combineReducers({
  slideEditor: slideEditorReducer,
});

export default rootReducer;