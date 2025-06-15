import React from 'react';

interface TransparencyInfoProps {
  totalNumbers?: number;
}

export const TransparencyInfo: React.FC<TransparencyInfoProps> = ({ totalNumbers }) => {
  return (
    <div className="transparency-info">
      <h3>🔒 Garantias de Transparência</h3>
      <ul>
        <li>✅ Apenas números de 5 dígitos são aceitos no arquivo</li>
        <li>✅ Nenhuma informação pessoal é coletada ou armazenada</li>
        <li>✅ O sorteio utiliza Math.random() para garantir aleatoriedade</li>
        <li>✅ Todos os resultados são registrados com timestamp imutável</li>
        <li>✅ Apenas 1 sorteio por upload é permitido</li>
        {totalNumbers && (
          <li>✅ Arquivo atual contém {totalNumbers} números únicos válidos</li>
        )}
      </ul>
      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>
          🔍 <strong>Quer auditar o código?</strong>
        </p>
        <a 
          href="https://github.com/seu-usuario/caravan-verde" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#4CAF50',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          📂 Ver código no GitHub
        </a>
      </div>
    </div>
  );
}; 