import React from 'react';
import { DrawResult } from '../types';
import { formatTimestamp } from '../utils/storage';

interface DrawHistoryProps {
  history: DrawResult[];
}

export const DrawHistory: React.FC<DrawHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="card">
        <div className="log-section">
          <h2>📋 Histórico de Sorteios</h2>
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            Nenhum sorteio realizado ainda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="log-section">
        <h2>📋 Histórico de Sorteios</h2>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-value">{history.length}</div>
            <div className="stat-label">Total de Sorteios</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {history.reduce((sum, draw) => sum + draw.totalNumbers, 0)}
            </div>
            <div className="stat-label">Números Processados</div>
          </div>
        </div>
        
        <ul className="log-list">
          {history.map((draw, index) => (
            <li key={`${draw.timestamp}-${index}`} className="log-item">
              <div>
                <div className="log-number">{draw.number}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                  {draw.totalNumbers} números participantes
                </div>
              </div>
              <div className="log-timestamp">
                {formatTimestamp(draw.timestamp)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 