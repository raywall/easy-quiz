import { Plugin, MarkdownView, WorkspaceLeaf } from 'obsidian';
import { QuizView } from './view';
import { Question } from './question';

export default class QuizPlugin extends Plugin {
    async onload() {
        this.registerMarkdownCodeBlockProcessor('quiz', (source, el) => {
            const container = el.createEl('div', { cls: 'quiz-container' });
            
            // Código fonte (visível apenas na edição)
            const sourceCode = container.createEl('pre', { cls: 'quiz-source' });
            sourceCode.createEl('code', { 
                cls: 'language-quiz',
                text: source 
            });

            // Preview formatado (visível fora da edição)
            const preview = container.createEl('div', { cls: 'quiz-preview' });
            const questions = this.parseQuizContent(source);
            
            questions.forEach(question => {
                this.renderQuestionPreview(preview, question);
            });
        });

        this.addCommand({
            id: 'start-quiz',
            name: 'Start Quiz',
            callback: () => this.startQuiz()
        });
    }

    private renderQuestionPreview(container: HTMLElement, question: Question) {
        const questionEl = container.createEl('div', { cls: 'quiz-question' });
        questionEl.createEl('div', { 
            text: question.question,
            cls: 'quiz-question-text'
        });

        const optionsEl = questionEl.createEl('div', { cls: 'quiz-options' });
        question.options.forEach((option, index) => {
            const optionEl = optionsEl.createEl('div', { cls: 'quiz-option' });
            optionEl.createEl('input', {
                type: question.type === 'multiple' ? 'checkbox' : 'radio',
                attr: {
                    disabled: 'disabled',
                    name: `preview-${question.question.slice(0,10)}`
                }
            });
            optionEl.createEl('span', { 
                text: option,
                cls: 'quiz-option-text'
            });
        });
    }

    private parseQuizContent(source: string): Question[] {
        return source.split('\n##\n').map(q => {
            const lines = q.trim().split('\n');
            const question: Question = {
                question: '',
                options: [],
                correct: [],
                explanation: '',
                type: 'single'
            };

            lines.forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('- [x]')) {
                    question.options.push(trimmedLine.replace('- [x]', '').trim());
                    question.correct.push(question.options.length - 1);
                } else if (trimmedLine.startsWith('- []')) {
                    question.options.push(trimmedLine.replace('- []', '').trim());
                } else if (trimmedLine.startsWith('Type:')) {
                    question.type = trimmedLine.replace('Type:', '').trim() as 'single' | 'multiple';
                } else if (trimmedLine.startsWith('Explanation:')) {
                    question.explanation = trimmedLine.replace('Explanation:', '').trim();
                } else if (trimmedLine.length > 0 && !trimmedLine.startsWith('```')) {
                    question.question = trimmedLine;
                }
            });

            return question;
        });
    }

    private async startQuiz() {
        const questions = await this.parseQuestions();
        const leaf = this.app.workspace.getRightLeaf(false);
        
        if (!leaf) {
            console.error('It was not possible to find a sheet to display the simulated');
            return;
        }

        await leaf.setViewState({ type: 'quiz-view' });
        const view = leaf.view as QuizView;
        view.questions = questions;
        view.currentQuestion = 0;
        view.answers = new Map();
        view.render();
    }

    private async parseQuestions(): Promise<Question[]> {
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!activeView || !activeView.file) return [];

        const content = await this.app.vault.read(activeView.file);
        const quizBlocks = content.match(/```quiz[\s\S]*?```/g) || [];
        
        return quizBlocks.flatMap(block => {
            const content = block
                .replace(/```quiz/g, '')
                .replace(/```/g, '')
                .trim();

            return this.parseQuizContent(content);
        });
    }
}