import { Component, computed, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from '../../models/content.models';
import { QuestionContent } from '../../components/question-content/question-content';
import { QuestionDropdown } from '../../components/question-dropdown/question-dropdown';
import { QuestionNavigation } from '../../components/question-navigation/question-navigation';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ReaderState } from '../../services/reader-state';

@Component({
  selector: 'app-interview-reader',
  imports: [Sidebar, QuestionNavigation, QuestionDropdown, QuestionContent],
  templateUrl: './interview-reader.html',
  styleUrl: './interview-reader.css',
})
export class InterviewReader {
  protected state = inject(ReaderState);
  private router = inject(Router);

  // These three come from the URL: /:subject/:topic/:question
  subject = input<string>();
  topic = input<string>();
  question = input<string>();

  protected message = computed(() => {
    const s = this.state;
    if (s.question()) return null;
    if (!s.subjectsLoaded()) return 'Loading…';
    if (s.subjectId() && !s.subject()) return 'This subject does not exist.';
    if (!s.subject() || !s.topicsLoaded()) return 'Loading…';
    if (s.topicId() && !s.topic()) return 'This topic does not exist.';
    if (!s.topic() || !s.questionsLoaded()) return 'Loading…';
    if (s.questions().length === 0) return 'No questions have been added to this topic yet.';
    if (s.questionId() && !s.question()) return 'This question does not exist.';
    return 'Loading…';
  });

  constructor() {
    // URL -> state
    effect(() => {
      this.state.subjectId.set(this.subject() ?? null);
      this.state.topicId.set(this.topic() ?? null);
      this.state.questionId.set(this.question() ?? null);
    });

    // Incomplete URLs fill themselves in: / -> /csharp -> /csharp/fundamentals -> first question
    effect(() => {
      const s = this.state;
      const subject = s.subject();
      const topic = s.topic();

      if (!this.subject()) {
        const first = s.subjects()[0];
        if (first) this.go([first.id], true);
        return;
      }
      if (!subject) return;

      if (!this.topic()) {
        const first = s.topics()[0];
        if (first) this.go([subject.id, first.id], true);
        return;
      }
      if (!topic) return;

      if (!this.question()) {
        const first = s.questions()[0];
        if (first) this.go([subject.id, topic.id, first.id], true);
      }
    });
  }

  protected onTopic(topic: Topic) {
    const subject = this.state.subject();
    if (subject) this.go([subject.id, topic.id]);
  }

  protected goPrevious() {
    this.goToIndex(this.state.questionIndex() - 1);
  }

  protected goNext() {
    this.goToIndex(this.state.questionIndex() + 1);
  }

  protected selectQuestion(id: string) {
    const subject = this.state.subject();
    const topic = this.state.topic();
    if (subject && topic) this.go([subject.id, topic.id, id]);
  }

  private goToIndex(index: number) {
    const target = this.state.questions()[index];
    if (target) this.selectQuestion(target.id);
  }

  private go(segments: string[], replace = false) {
    this.router.navigate(['/', ...segments], { replaceUrl: replace });
  }
}