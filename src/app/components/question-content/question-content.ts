import { Component, ViewEncapsulation, computed, input, linkedSignal } from '@angular/core';
import { Question } from '../../models/content.models';
import { renderMarkdown } from '../../services/markdown';

@Component({
  selector: 'app-question-content',
  imports: [],
  templateUrl: './question-content.html',
  styleUrl: './question-content.css',
  // The Markdown HTML is injected at runtime, so the styles must apply to it too
  encapsulation: ViewEncapsulation.None,
})
export class QuestionContent {
  question = input<Question | null>(null);

  // Resets to closed every time a different question is shown
  showExplanation = linkedSignal<Question | null, boolean>({
    source: this.question,
    computation: () => false,
  });

  explanationHtml = computed(() => renderMarkdown(this.question()?.explanationMarkdown ?? ''));
  answerHtml = computed(() => renderMarkdown(this.question()?.interviewAnswerMarkdown ?? ''));

  toggle() {
    this.showExplanation.update((open) => !open);
  }
}