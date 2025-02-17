# Easy Quiz plugin for Obsidian 🚀

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/raywall/obsidian-easy-quiz-plugin/deploy.yml)
![License](https://img.shields.io/badge/license-MIT-blue)

Plugin for Creation of AWS Simulates within Obsidian, ideal for preparation for professional certifications of Amazon Web Services.

## ✨ Resources

- ✅ Automatic generation of simulations from questions in Markdown format
- 🔀 Support for multiple choice questions and multiple answers
- 📊 Detailed results with performance statistics
- 📖 Review mode with technical explanations
- 🎯 Compatible with AWS EXAMINATION CERTIFIED Solutions Architect and other certifications
- 🖥 Rendering in the sidebar or popup


## 📥 Installation

### Method 1: Via Obsidian
1. Access `settings` → `communityPlugins` → `browse`
2. Search for "Start Quiz"
3. Install and activate the plugin

### Manual method
1. Download the last release of [GitHub Releases](https://github.com/raywall/obsidian-easy-quiz-plugin/releases)
2. Extract zip at:
   ```bash
   # Linux/Mac
   ~/.obsidian/plugins/easy-quiz/

   # Windows
   %APPDATA%\obsidian\plugins\easy-quiz\
   ```
3. Recharge Obsidian (CTRL/CMD+R)

## 🚦 How to use

### 1. Create questions
```markdown
```quiz
   Which AWS service is ideal for relational databases?
   - [x] Amazon RDS
   - [ ] Amazon S3
   - [ ] Amazon EC2
   Explanation: RDS is the managed service for relational databases
   Type: single
\```
```

### 2. Start quiz
- **Command:** `Ctrl/Cmd+P` → "Start Quiz"
- **Button:** Icon in the sidebar (🔍)

## 🛠 Development

### Prerequisites
- Node.js 18+
- Obsidian Desktop

### Settings
```bash
git clone https://github.com/raywall/obsidian-easy-quiz-plugin.git
cd obsidian-easy-quiz-plugin
npm install
```

### Build and Test
```bash
# Continuous build
npm run build

# Copy for Obsidian (Mac/Linux)
./local-deploy.sh
```

## 🤝 Contribution
1. Take the project fork
2. Create a branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit your changes (`git commit -m 'Add nova funcionalidade'`)
4. Push the branch (`git push origin feature/nova-funcionalidade`)
5. Open a Pull Request

## 📄 License
MIT License - Check the file [LICENSE](LICENSE)

---

🔗 **Useful Links**:
- [Obsidian Documentation](https://help.obsidian.md)
- [AWS Certification Portal](https://aws.amazon.com/certification/)
- [Plugin Development Guide](https://docs.obsidian.md/Plugins)

> Note: This project is not affiliated with Amazon Web Services.AWS is a trademark of Amazon.com, Inc.