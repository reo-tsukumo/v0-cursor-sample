import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadFileState } from './types';

const initialState: UploadFileState = {
  uploadedFileNames: [], // 変更: 初期値を空配列に
  extractedText: '',
  isLoading: false,
  error: null,
};

const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    setUploadedFileNames: (state, action: PayloadAction<string[]>) => { // 変更: 複数のファイル名を設定するアクションに
      state.uploadedFileNames = action.payload;
    },
    setExtractedText: (state, action: PayloadAction<string>) => {
      state.extractedText = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUploadedFileNames, setExtractedText, setLoading, setError } = uploadFileSlice.actions;
export default uploadFileSlice.reducer;