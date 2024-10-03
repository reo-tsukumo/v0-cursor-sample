import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadFileState } from './types';

const initialState: UploadFileState = {
  uploadedFileNames: [],
  extractedText: '',
  isLoading: false,
  error: null,
};

const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    setUploadedFileNames: (state, action: PayloadAction<string[]>) => {
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
    resetExtractedText: (state) => {
      state.extractedText = '';
    },
    resetUploadFile: (state) => {
      state.uploadedFileNames = [];
      state.extractedText = '';
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUploadedFileNames, setExtractedText, setLoading, setError, resetUploadFile, resetExtractedText } = uploadFileSlice.actions;
export default uploadFileSlice.reducer;