import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadFileState } from './types';

const initialState: UploadFileState = {
  uploadedFileName: null,
  extractedText: '',
  isLoading: false,
  error: null,
};

const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    setUploadedFileName: (state, action: PayloadAction<string>) => {
      state.uploadedFileName = action.payload;
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

export const { setUploadedFileName, setExtractedText, setLoading, setError } = uploadFileSlice.actions;
export default uploadFileSlice.reducer;