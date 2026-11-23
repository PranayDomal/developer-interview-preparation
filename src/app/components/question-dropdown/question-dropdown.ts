import { Component, input, output } from '@angular/core';

export interface QuestionOption {
  id: string;
  title: string;
}

@Component({
  selector: 'app-question-dropdown',
  imports: [],
  templateUrl: './question-dropdown.html',
  styleUrl: './question-dropdown.css',
})
export class QuestionDropdown {
  questions = input.required<QuestionOption[]>();
  selectedId = input<string | null>(null);

  questionSelected = output<string>();

  onChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.questionSelected.emit(select.value);
  }
}