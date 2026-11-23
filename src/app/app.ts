import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { ReaderHeader } from './components/reader-header/reader-header';
import { Sidebar } from './components/sidebar/sidebar';
import { QuestionNavigation } from './components/question-navigation/question-navigation';
import { QuestionDropdown } from './components/question-dropdown/question-dropdown';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReaderHeader, Footer, Sidebar, QuestionNavigation, QuestionDropdown],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('csharp-interview-reader');

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
