import { Component, signal, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { ReaderHeader } from './components/reader-header/reader-header';
import { Sidebar } from './components/sidebar/sidebar';
import { QuestionNavigation } from './components/question-navigation/question-navigation';
import { QuestionDropdown } from './components/question-dropdown/question-dropdown';
import { switchMap } from 'rxjs';
import { ContentService } from './services/content.service';
import { QuestionContent } from './components/question-content/question-content';
import { Question } from './models/content.models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReaderHeader, Footer, Sidebar, QuestionNavigation, QuestionDropdown, QuestionContent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('csharp-interview-reader');


  // TEMPORARY: proves the loading and parsing works
private content = inject(ContentService);

constructor() {
  this.content
    .getSubjects()
    .pipe(
      switchMap((subjects) =>
        this.content.getTopics(subjects[0]).pipe(
          switchMap((topics) => this.content.getQuestions(subjects[0], topics[0])),
        ),
      ),
    )
    .subscribe((questions) => {
  console.log('Parsed questions:', questions);
  this.parsed.set(questions);
});
}

parsed = signal<Question[]>([]);
currentParsed = computed(() => {
  const list = this.parsed();
  return list.length ? list[this.testIndex() % list.length] : null;
});

  // TEMPORARY: for testing only
testQuestions = [
  { id: 'what-is-csharp', title: 'What is C#?' },
  { id: 'what-is-dotnet', title: 'What is .NET?' },
  { id: 'csharp-vs-dotnet', title: 'What is the difference between C# and .NET?' },
  { id: 'what-is-clr', title: 'What is CLR?' },
  { id: 'what-is-cts', title: 'What is CTS?' },
  { id: 'what-is-cls', title: 'What is CLS?' },
  { id: 'what-is-jit', title: 'What is JIT Compiler?' },
  { id: 'what-is-il', title: 'What is IL Code?' },
  { id: 'managed-code', title: 'What is Managed Code?' },
  { id: 'unmanaged-code', title: 'What is Unmanaged Code?' },
  { id: 'framework-vs-modern', title: 'What is the difference between .NET Framework and modern .NET?' },
  { id: 'csharp-features', title: 'What are the main features of C#?' },
];

selectQuestion(id: string) {
  const index = this.testQuestions.findIndex((q) => q.id === id);
  if (index >= 0) {
    this.testIndex.set(index);
  }
}

  // TEMPORARY: for testing only, will move to the interview-reader page
  testIndex = signal(0);
  testTotal = 12;

  goPrevious() {
    this.testIndex.update((i) => i - 1);
  }

  goNext() {
    this.testIndex.update((i) => i + 1);
  }
}
