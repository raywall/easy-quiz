import { ItemView, WorkspaceLeaf } from 'obsidian';
import { Question } from './question';

export class QuizView extends ItemView {
    questions: Question[];
    answers: Map<number, number[]>;
    currentQuestion: number;

    constructor(leaf: WorkspaceLeaf, questions: Question[]) {
        super(leaf);
        this.questions = questions;
        this.answers = new Map();
        this.currentQuestion = 0;
    }

    getViewType(): string {
        return 'quiz-view';
    }

    getDisplayText(): string {
        return 'Quiz';
    }

    async onOpen(): Promise<void> {
        this.render();
    }

    render(): void {
        const container = this.containerEl.children[1] as HTMLElement;
        container.empty();

        if (this.currentQuestion < this.questions.length) {
            this.renderQuestion(container);
        } else {
            this.renderResults(container);
        }
    }

    private renderQuestion(container: HTMLElement): void {
        const question = this.questions[this.currentQuestion];

        // Cabeçalho da questão
        const header = container.createDiv('quiz-header');
        header.createEl('h2', {
            text: `Question ${this.currentQuestion + 1} de ${this.questions.length}`,
            cls: 'quiz-title'
        });

        // Corpo da questão
        const body = container.createDiv('quiz-body');
        body.createEl('p', {
            text: question.question,
            cls: 'quiz-question-text'
        });

        // Opções de resposta
        const optionsContainer = body.createDiv('quiz-options-container');
        question.options.forEach((option, index) => {
            const optionDiv = optionsContainer.createDiv('quiz-option');
            const input = optionDiv.createEl('input', {
                type: question.type === 'multiple' ? 'checkbox' : 'radio',
                attr: {
                    name: `question-${this.currentQuestion}`,
                    id: `option-${this.currentQuestion}-${index}`
                }
            });
            input.value = index.toString();

            const label = optionDiv.createEl('label', {
                text: option,
                attr: {
                    for: `option-${this.currentQuestion}-${index}`
                }
            });
        });

        // Botão de controle
        const controls = container.createDiv('quiz-controls');
        const buttonText = this.currentQuestion === this.questions.length - 1 ? 'Finish' : 'Next';
        const submitButton = controls.createEl('button', {
            text: buttonText,
            cls: 'quiz-button'
        });

        submitButton.onclick = () => {
            this.saveAnswers();
            this.currentQuestion++;
            this.render();
        };
    }

    private saveAnswers(): void {
        const inputs = Array.from(
            this.containerEl.querySelectorAll<HTMLInputElement>(
                `input[name="question-${this.currentQuestion}"]:checked`
            )
        );
        this.answers.set(this.currentQuestion, inputs.map(input => parseInt(input.value)));
    }

    private renderResults(container: HTMLElement): void {
        let correctCount = 0;
        const results = this.questions.map((question, index) => {
            const userAnswers = this.answers.get(index) || [];
            const isCorrect = this.validateAnswer(question, userAnswers);
            if (isCorrect) correctCount++;
            return { question, userAnswers, isCorrect };
        });

        // Cabeçalho dos resultados
        const header = container.createDiv('quiz-results-header');
        header.createEl('h2', {
            text: `Result: ${correctCount}/${this.questions.length}`,
            cls: 'quiz-results-title'
        });
        header.createEl('p', {
            text: `Performance: ${Math.round((correctCount / this.questions.length) * 100)}%`,
            cls: 'quiz-percentage'
        });

        // Detalhes das questões
        const resultsContainer = container.createDiv('quiz-results-container');
        results.forEach((result, index) => {
            const questionDiv = resultsContainer.createDiv('quiz-result');
            questionDiv.createEl('h3', {
                text: `Question ${index + 1}`,
                cls: 'quiz-result-title'
            });

            // Questão
            questionDiv.createEl('p', {
                text: result.question.question,
                cls: 'quiz-result-question'
            });

            // Respostas
            const answersDiv = questionDiv.createDiv('quiz-result-answers');
            answersDiv.createEl('p', {
                text: `Your Answer: ${this.formatAnswers(result.userAnswers, result.question.options)}`,
                cls: `quiz-user-answer ${result.isCorrect ? 'correct' : 'incorrect'}`
            });
            answersDiv.createEl('p', {
                text: `Correct Answer: ${this.formatAnswers(result.question.correct, result.question.options)}`,
                cls: 'quiz-correct-answer'
            });

            // Explanation
            if (result.question.explanation) {
                questionDiv.createEl('div', {
                    cls: 'quiz-explanation'
                }).createEl('p', {
                    text: `📚 Explanation: ${result.question.explanation}`
                });
            }
        });
    }

    private validateAnswer(question: Question, userAnswers: number[]): boolean {
        return userAnswers.length === question.correct.length &&
            userAnswers.every(answer => question.correct.includes(answer));
    }

    private formatAnswers(answers: number[], options: string[]): string {
        return answers
            .map(answer => options[answer])
            .join(', ') || 'No answer selected';
    }
}