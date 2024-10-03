export interface UploadFileState {
  uploadedFileNames: string[]; // 変更: 単一のファイル名から配列に
  extractedText: string;
  isLoading: boolean;
  error: string | null;
}