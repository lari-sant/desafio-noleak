# Heatmap Generator

Este projeto cria uma interface web que recebe dados de entrada em JSON e gera dinamicamente um mapa de calor sobre uma imagem.

## Estrutura do Projeto

heatmap-generator/
├── backend/
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
└── README.md


## Como Rodar

### Backend

1. Navegue até o diretório `backend`.
2. Instale as dependências:

```bash
npm install

O servidor estará rodando em http://localhost:3000

Uso
Insira o JSON de entrada, o objeto de relevância e a URL da imagem nos campos apropriados.
Clique em "Generate Heatmap".
O mapa de calor será gerado e sobreposto à imagem.
Clique em "Download Heatmap" para baixar a imagem com o mapa de calor.

Dependências
Backend
Express
Body-parser
Cors
Frontend
heatmap.js
html2canvas
