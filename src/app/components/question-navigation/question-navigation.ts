import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-question-navigation',
  imports: [],
  templateUrl: './question-navigation.html',
  styleUrl: './question-navigation.css',
})
export class QuestionNavigation {
  currentIndex = input.required<number>(); // 0-based index
  total = input.required<number>();

  previous = output<void>();
  next = output<void>();

  questionLabel = computed(() =>
    this.total() === 0 ? '--' : String(this.currentIndex() + 1).padStart(2, '0')
  );
  isFirst = computed(() => this.currentIndex() <= 0);
  isLast = computed(() => this.currentIndex() >= this.total() - 1);
}