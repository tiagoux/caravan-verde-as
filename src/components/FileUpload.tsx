import React, { useRef, useState } from 'react';
import { validateCSV } from '../utils/csvValidator';

interface FileUploadProps {
  onFileProcessed: (numbers: number[], fileName: string) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileProcessed, 
  onError, 
  disabled = false 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      onError('Por favor, selecione um arquivo .csv');
      return;
    }

    setIsProcessing(true);

    try {
      const content = await file.text();
      const validation = validateCSV(content);

      if (validation.isValid) {
        onFileProcessed(validation.numbers, file.name);
      } else {
        onError(validation.error || 'Erro na validação do arquivo');
      }
    } catch (error) {
      onError(`Erro ao ler arquivo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="upload-section">
      <div
        className={`upload-area ${isDragOver ? 'dragover' : ''} ${disabled ? 'disabled' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        style={{ 
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="file-input"
          disabled={disabled}
        />
        
        <div className="upload-icon">
          {isProcessing ? '⏳' : '📄'}
        </div>
        
        <div className="upload-text">
          {isProcessing 
            ? 'Processando arquivo...' 
            : disabled 
              ? 'Upload desabilitado após sorteio'
              : 'Clique aqui ou arraste um arquivo .csv'
          }
        </div>
        
        <div className="upload-hint">
          {!disabled && 'Arquivo deve conter apenas números de 5 dígitos, um por linha'}
        </div>
      </div>
    </div>
  );
}; 