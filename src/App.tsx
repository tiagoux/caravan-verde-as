import React, { useState, useEffect } from 'react';
import { AppState, DrawResult } from './types';
import { generateRandomIndex } from './utils/csvValidator';
import { saveDrawHistory, loadDrawHistory } from './utils/storage';
import { FileUpload } from './components/FileUpload';
import { DrawResult as DrawResultComponent } from './components/DrawResult';
import { DrawHistory } from './components/DrawHistory';
import { TransparencyInfo } from './components/TransparencyInfo';

function App() {
  const [state, setState] = useState<AppState>({
    upload: {
      numbers: [],
      isValid: false,
      hasDrawn: false
    },
    drawHistory: []
  });

  // Carrega histórico do localStorage na inicialização
  useEffect(() => {
    const history = loadDrawHistory();
    setState(prev => ({
      ...prev,
      drawHistory: history
    }));
  }, []);

  // Salva histórico no localStorage sempre que ele muda
  useEffect(() => {
    if (state.drawHistory.length > 0) {
      saveDrawHistory(state.drawHistory);
    }
  }, [state.drawHistory]);

  const handleFileProcessed = (numbers: number[], fileName: string) => {
    setState(prev => ({
      ...prev,
      upload: {
        numbers,
        isValid: true,
        hasDrawn: false,
        fileName
      },
      currentResult: undefined,
      error: undefined,
      success: `Arquivo "${fileName}" carregado com sucesso! ${numbers.length} números válidos encontrados.`
    }));
  };

  const handleError = (error: string) => {
    setState(prev => ({
      ...prev,
      error,
      success: undefined
    }));
  };

  const handleDraw = () => {
    if (!state.upload.isValid || state.upload.numbers.length === 0) {
      handleError('Nenhum arquivo válido carregado.');
      return;
    }

    if (state.upload.hasDrawn) {
      handleError('Já foi realizado um sorteio com este arquivo. Faça upload de um novo arquivo.');
      return;
    }

    // Gera índice aleatório
    const randomIndex = generateRandomIndex(state.upload.numbers.length);
    const drawnNumber = state.upload.numbers[randomIndex];

    // Cria resultado do sorteio
    const result: DrawResult = {
      number: drawnNumber,
      timestamp: new Date().toISOString(),
      totalNumbers: state.upload.numbers.length
    };

    // Atualiza estado
    setState(prev => ({
      ...prev,
      upload: {
        ...prev.upload,
        hasDrawn: true
      },
      currentResult: result,
      drawHistory: [result, ...prev.drawHistory],
      error: undefined,
      success: undefined
    }));
  };

  const handleNewUpload = () => {
    setState(prev => ({
      ...prev,
      upload: {
        numbers: [],
        isValid: false,
        hasDrawn: false
      },
      currentResult: undefined,
      error: undefined,
      success: undefined
    }));
  };

  const canDraw = state.upload.isValid && !state.upload.hasDrawn;

  return (
    <div className="container">
      <header className="header">
        <h1>🎲 Sistema de Sorteio Transparente</h1>
        <p>100% auditável e sem dados pessoais</p>
      </header>

      <main>
        {/* Seção de Upload */}
        <div className="card">
          <h2>📤 Upload de Números</h2>
          <FileUpload
            onFileProcessed={handleFileProcessed}
            onError={handleError}
            disabled={state.upload.hasDrawn}
          />
          
          {state.upload.hasDrawn && (
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button 
                className="btn" 
                onClick={handleNewUpload}
              >
                📁 Carregar Novo Arquivo
              </button>
            </div>
          )}
        </div>

        {/* Mensagens de Erro e Sucesso */}
        {state.error && (
          <div className="error">
            <strong>❌ Erro:</strong>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>
              {state.error}
            </pre>
          </div>
        )}

        {state.success && (
          <div className="success">
            <strong>✅ Sucesso:</strong> {state.success}
          </div>
        )}

        {/* Informações de Transparência */}
        {state.upload.isValid && (
          <TransparencyInfo totalNumbers={state.upload.numbers.length} />
        )}

        {/* Botão de Sorteio */}
        {state.upload.isValid && (
          <div className="card" style={{ textAlign: 'center' }}>
            <h2>🎯 Realizar Sorteio</h2>
            <p style={{ marginBottom: '20px', color: '#262730' }}>
              {state.upload.hasDrawn 
                ? 'Sorteio já realizado com este arquivo'
                : `Pronto para sortear entre ${state.upload.numbers.length} números`
              }
            </p>
            <button
              className="btn btn-large"
              onClick={handleDraw}
              disabled={!canDraw}
            >
              {state.upload.hasDrawn ? '✅ Sorteio Realizado' : '🎲 SORTEAR AGORA'}
            </button>
          </div>
        )}

        {/* Resultado do Sorteio Atual */}
        {state.currentResult && (
          <DrawResultComponent result={state.currentResult} />
        )}

        {/* Histórico de Sorteios */}
        <DrawHistory history={state.drawHistory} />
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '20px', 
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.9rem'
      }}>
        Sistema desenvolvido para garantir transparência total nos sorteios
      </footer>
    </div>
  );
}

export default App; 