import React from 'react';
import { DrawResult as DrawResultType } from '../types';
import { formatTimestamp } from '../utils/storage';

interface DrawResultProps {
  result: DrawResultType;
}

export const DrawResult: React.FC<DrawResultProps> = ({ result }) => {
  return (
    <div className="result-section">
      <h2>🎉 Número Sorteado!</h2>
      <div className="result-number">{result.number}</div>
      <div className="result-info">
        Sorteado em {formatTimestamp(result.timestamp)}
        <br />
        Entre {result.totalNumbers} números participantes
      </div>
    </div>
  );
}; 