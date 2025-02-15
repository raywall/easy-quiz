```markdown
# AWS Quiz Generator for Obsidian 🚀

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/raywall/obsidian-smart-quiz/deploy.yml)
![License](https://img.shields.io/badge/license-MIT-blue)

Plugin para criação de simulados AWS dentro do Obsidian, ideal para preparação para certificações profissionais da Amazon Web Services.

## ✨ Recursos

- ✅ Geração automática de simulados a partir de questões no formato Markdown
- 🔀 Suporte para questões de múltipla escolha e múltiplas respostas
- 📊 Resultados detalhados com estatísticas de desempenho
- 📖 Modo de revisão com explicações técnicas
- 🎯 Compatível com exame AWS Certified Solutions Architect e outras certificações
- 🖥 Renderização na barra lateral ou popup

## 📥 Instalação

### Método 1: Via Obsidian
1. Acesse `Settings` → `Community plugins` → `Browse`
2. Pesquise por "Obsidian Smart Quiz"
3. Instale e ative o plugin

### Método Manual
1. Baixe a última release do [GitHub Releases](https://github.com/seuuser/obsidian-smart-quiz/releases)
2. Extraia o ZIP em:
   ```bash
   # Linux/Mac
   ~/.obsidian/plugins/obsidian-smart-quiz/

   # Windows
   %APPDATA%\obsidian\plugins\obsidian-smart-quiz\
   ```
3. Recarregue o Obsidian (Ctrl/Cmd+R)

## 🚦 Como Usar

### 1. Criar Questões
```markdown
```quiz
Qual serviço AWS é ideal para bancos de dados relacionais?
- [x] Amazon RDS
- [ ] Amazon S3
- [ ] Amazon EC2
Explicação: RDS é o serviço gerenciado para bancos de dados relacionais
Tipo: single
\```
```

### 2. Iniciar Simulado
- **Comando:** `Ctrl/Cmd+P` → "Start AWS Quiz"
- **Botão:** Ícone na barra lateral (🔍)

## 🛠 Desenvolvimento

### Pré-requisitos
- Node.js 18+
- Obsidian Desktop

### Configuração
```bash
git clone https://github.com/raywall/obsidian-smart-quiz.git
cd obsidian-aws-quiz
npm install
```

### Build e Teste
```bash
# Build contínuo
npm run dev

# Copiar para Obsidian (Mac/Linux)
./build-and-copy.sh
```

## 🤝 Contribuição
1. Faça fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença
MIT License - Consulte o arquivo [LICENSE](LICENSE) para detalhes.

---

🔗 **Links Úteis**:
- [Obsidian Documentation](https://help.obsidian.md)
- [AWS Certification Portal](https://aws.amazon.com/certification/)
- [Plugin Development Guide](https://docs.obsidian.md/Plugins)

> Nota: Este projeto não é afiliado à Amazon Web Services. AWS é uma marca registrada da Amazon.com, Inc.
# obsidian-smart-quiz
