# JON Estúdio — Portfólio Autoral & Estúdio Criativo

Site de portfólio autoral e estúdio criativo em **HTML5 semântico**, **CSS3 moderno** e **JavaScript puro** (vanilla, sem frameworks pesados).

---

## 🚀 Como Executar

Você pode visualizar o projeto diretamente abrindo o arquivo `portfolio/index.html` em seu navegador ou iniciando um servidor local:

### Opção 1: Via npm (Nativo com Node.js)
```bash
npm start
```
Acesse em: [http://localhost:5500](http://localhost:5500)

### Opção 2: Via Python
```bash
python -m http.server 5500 --directory portfolio
```

---

## 🎨 Principais Funcionalidades

1. **Header com Glassmorphism & Busca Global**: Atalho `⌘K` / `Ctrl+K` para busca instantânea de projetos, clientes e seções (estilo Mobbin).
2. **Sintetizador de Áudio via Web Audio API**: Efeitos sonoros sutis e sintetizados sem dependência de arquivos de áudio externos (estilo Huxley Saga).
3. **Cursor Magnético & Microinterações**: Ponto de mira com física fluida e tag "VER" ao passar sobre os cases.
4. **Galeria com Dupla Visualização**:
   - **Modo Grade**: Cartões visuais imersivos com tags e descrições.
   - **Modo Arquivo**: Tabela editorial minimalista com hover preview flutuante (estilo Alicia Dubuis).
5. **Bandeja de Curadoria ("Deck Autoral")**: Permite favoritar projetos clicando em `(+)` e injetá-los automaticamente na mensagem do formulário de proposta.
6. **Modal de Detalhes Avançado**: Navegação contínua entre projetos (Anterior/Próximo + teclas `←` e `→`) e botão de copiar link com Toast.
7. **Alternador de Tema**: Suporte fluido a **Modo Escuro (Padrão)** e **Modo Claro** com persistência em `localStorage`.
8. **Linha do Tempo Autoral / Trajetória**: Narrativa cinematográfica com os marcos e evolução do estúdio.
9. **Formulário de Contato Inteligente**: Validação de campos em tempo real e feedback visual por Toast.

---

## 📁 Estrutura de Arquivos

```text
portifolio/
├── package.json          # Configuração e script npm start
├── README.md             # Documentação do projeto
└── portfolio/
    ├── index.html        # Estrutura semântica e acessível
    ├── style.css         # Design system com variáveis CSS e responsividade
    ├── script.js         # Toda a lógica interativa em Vanilla JS
    ├── AGENTS.md         # Diretrizes e regras de desenvolvimento
    ├── funcionalidades.md# Especificação de requisitos e features
    ├── identidade.md     # Conceito visual, paleta de cores e tipografia
    └── referencias.md    # Análise das referências (Alicia Dubuis, Mobbin, Huxley Saga)
```