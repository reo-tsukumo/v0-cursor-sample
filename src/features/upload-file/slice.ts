import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadFileState } from './types';

const initialState: UploadFileState = {
  uploadedFileNames: [],
  uploadedFileIds: [],
  extractedDocuments: '',
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
    setUploadedFileIds: (state, action: PayloadAction<string[]>) => {
      state.uploadedFileIds = action.payload;
    },
    setExtractedDocuments: (state, action: PayloadAction<string>) => {
      state.extractedDocuments = action.payload;
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
    resetExtractedDocuments: (state) => {
      state.extractedDocuments = '';
    },
    resetUploadFile: (state) => {
      state.uploadedFileNames = [];
      state.uploadedFileIds = [];
      state.extractedDocuments = '';
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUploadedFileNames, setUploadedFileIds, setExtractedDocuments, setLoading, setError, resetUploadFile, resetExtractedDocuments } = uploadFileSlice.actions;
export default uploadFileSlice.reducer;