export interface ValidationResult {
  isValid: boolean;
  numbers: number[];
  error?: string;
}

export function validateCSV(content: string): ValidationResult {
  try {
    // Remove espaços em branco e quebras de linha extras
    const cleanContent = content.trim();
    
    if (!cleanContent) {
      return {
        isValid: false,
        numbers: [],
        error: 'Arquivo vazio. O arquivo deve conter números de 5 dígitos, um por linha.'
      };
    }

    // Divide o conteúdo em linhas
    const lines = cleanContent.split(/\r?\n/).filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
      return {
        isValid: false,
        numbers: [],
        error: 'Nenhum número encontrado no arquivo.'
      };
    }

    const numbers: number[] = [];
    const errors: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Verifica se a linha contém vírgulas (indicando múltiplas colunas)
      if (line.includes(',')) {
        errors.push(`Linha ${i + 1}: Arquivo não deve conter vírgulas ou múltiplas colunas. Encontrado: "${line}"`);
        continue;
      }

      // Verifica se a linha contém apenas dígitos
      if (!/^\d+$/.test(line)) {
        errors.push(`Linha ${i + 1}: Deve conter apenas números. Encontrado: "${line}"`);
        continue;
      }

      const number = parseInt(line, 10);

      // Verifica se o número tem exatamente 5 dígitos
      if (line.length !== 5) {
        errors.push(`Linha ${i + 1}: Número deve ter exatamente 5 dígitos. Encontrado: "${line}" (${line.length} dígitos)`);
        continue;
      }

      // Verifica se é um número válido entre 10000 e 99999
      if (number < 10000 || number > 99999) {
        errors.push(`Linha ${i + 1}: Número deve estar entre 10000 e 99999. Encontrado: ${number}`);
        continue;
      }

      numbers.push(number);
    }

    if (errors.length > 0) {
      return {
        isValid: false,
        numbers: [],
        error: `Arquivo inválido:\n${errors.slice(0, 5).join('\n')}${errors.length > 5 ? `\n... e mais ${errors.length - 5} erros` : ''}`
      };
    }

    if (numbers.length === 0) {
      return {
        isValid: false,
        numbers: [],
        error: 'Nenhum número válido encontrado no arquivo.'
      };
    }

    // Remove duplicatas
    const uniqueNumbers: number[] = [];
    const seen = new Set<number>();
    
    for (const num of numbers) {
      if (!seen.has(num)) {
        seen.add(num);
        uniqueNumbers.push(num);
      }
    }
    
    if (uniqueNumbers.length !== numbers.length) {
      return {
        isValid: false,
        numbers: [],
        error: `Encontrados ${numbers.length - uniqueNumbers.length} números duplicados. Todos os números devem ser únicos.`
      };
    }

    return {
      isValid: true,
      numbers: uniqueNumbers,
      error: undefined
    };

  } catch (error) {
    return {
      isValid: false,
      numbers: [],
      error: `Erro ao processar arquivo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
    };
  }
}

export function generateRandomIndex(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
} 