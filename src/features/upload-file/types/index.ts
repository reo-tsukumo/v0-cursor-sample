export interface UploadFileState {
  uploadedFileNames: string[];
  uploadedFileIds: string[];
  extractedDocuments: string;
  isLoading: boolean;
  error: string | null;
}