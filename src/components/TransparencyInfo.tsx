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
    </div>
  );
}; 