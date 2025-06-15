# 🎲 Sistema de Sorteio Transparente

Um sistema de sorteio 100% transparente e auditável que permite o upload de arquivos CSV contendo números e realiza sorteios aleatórios com registro completo dos resultados.

## ✨ Características

- **100% Transparente**: Nenhuma informação pessoal é coletada
- **Auditável**: Todos os sorteios são registrados com timestamp
- **Seguro**: Validação rigorosa dos arquivos CSV
- **Justo**: Utiliza Math.random() para aleatoriedade
- **Responsivo**: Interface moderna e adaptável

## 🚀 Como Usar

### 1. Preparar o Arquivo CSV

Crie um arquivo `.csv` contendo apenas números de 5 dígitos, um por linha:

**✅ Formato Correto:**
```
12345
67890
54321
98765
```

**❌ Formato Incorreto:**
```
Nome,Numero
João,12345
Ana,67890
```

### 2. Fazer Upload

- Clique na área de upload ou arraste o arquivo
- O sistema validará automaticamente o formato
- Apenas arquivos com números de 5 dígitos serão aceitos

### 3. Realizar Sorteio

- Clique no botão "SORTEAR AGORA"
- O número será escolhido aleatoriamente
- O resultado será exibido e registrado no histórico

### 4. Novo Sorteio

- Após um sorteio, é necessário fazer upload de um novo arquivo
- Isso garante a integridade do processo

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn

### Passos

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo desenvolvimento:**
   ```bash
   npm start
   ```

3. **Acessar a aplicação:**
   ```
   http://localhost:3000
   ```

4. **Gerar build de produção:**
   ```bash
   npm run build
   ```

## 📋 Regras de Validação

### Arquivo CSV Válido
- ✅ Apenas uma coluna
- ✅ Números de exatamente 5 dígitos
- ✅ Um número por linha
- ✅ Sem cabeçalhos
- ✅ Sem duplicatas

### Arquivo CSV Inválido
- ❌ Múltiplas colunas
- ❌ Números com menos ou mais de 5 dígitos
- ❌ Texto ou caracteres especiais
- ❌ Linhas vazias
- ❌ Números duplicados

## 🔒 Garantias de Transparência

1. **Sem Dados Pessoais**: Apenas números são processados
2. **Aleatoriedade Justa**: Usa Math.random() nativo
3. **Registro Imutável**: Histórico com timestamp ISO 8601
4. **Um Sorteio por Upload**: Previne manipulação
5. **Validação Rigorosa**: Rejeita arquivos inválidos
6. **Código Aberto**: Todo o código é auditável

## 📊 Funcionalidades

### Upload de Arquivo
- Drag & drop ou clique para selecionar
- Validação em tempo real
- Mensagens de erro detalhadas
- Suporte apenas para .csv

### Sorteio
- Botão habilitado apenas com arquivo válido
- Geração de índice aleatório
- Registro com timestamp
- Exibição destacada do resultado

### Histórico
- Lista cronológica reversa
- Persistência local (localStorage)
- Estatísticas de sorteios
- Informações de cada sorteio

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── FileUpload.tsx   # Upload e validação
│   ├── DrawResult.tsx   # Exibição do resultado
│   ├── DrawHistory.tsx  # Histórico de sorteios
│   └── TransparencyInfo.tsx # Informações de transparência
├── utils/               # Utilitários
│   ├── csvValidator.ts  # Validação de CSV
│   └── storage.ts       # Persistência local
├── types.ts             # Definições TypeScript
├── App.tsx              # Componente principal
├── index.tsx            # Ponto de entrada
└── index.css            # Estilos globais
```

## 🧪 Exemplo de Teste

1. Crie um arquivo `numeros.csv`:
   ```
   12345
   67890
   54321
   98765
   11111
   ```

2. Faça upload do arquivo
3. Clique em "SORTEAR AGORA"
4. Veja o resultado e histórico

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

## 🔧 Tecnologias Utilizadas

- **React 18** - Interface de usuário
- **TypeScript** - Tipagem estática
- **CSS3** - Estilos modernos
- **localStorage** - Persistência local

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais.

---

**Desenvolvido para garantir transparência total em sorteios** 🎯 