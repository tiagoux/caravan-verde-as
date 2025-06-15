export interface DrawResult {
  number: number;
  timestamp: string;
  totalNumbers: number;
}

export interface UploadState {
  numbers: number[];
  isValid: boolean;
  hasDrawn: boolean;
  fileName?: string;
}

export interface AppState {
  upload: UploadState;
  drawHistory: DrawResult[];
  currentResult?: DrawResult;
  error?: string;
  success?: string;
} 