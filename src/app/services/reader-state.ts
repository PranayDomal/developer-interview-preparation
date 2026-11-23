import { Injectable, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { ContentService } from './content.service';

@Injectable({ providedIn: 'root' })
export class ReaderState {
  private content = inject(ContentService);

  // Set by the reader page from the URL
  readonly subjectId = signal<string | null>(null);
  readonly topicId = signal<string | null>(null);
  readonly questionId = signal<string | null>(null);

  // ---- Subjects ----
  private subjectsRaw = toSignal(this.content.getSubjects());
  readonly subjectsLoaded = computed(() => this.subjectsRaw() !== undefined);
  readonly subjects = computed(() => this.subjectsRaw() ?? []);
  readonly subject = computed(
    () => this.subjects().find((s) => s.id === this.subjectId()) ?? null,
  );

  // ---- Topics of the current subject ----
  // Results are tagged with a key so a stale list from the previous subject is never used
  private topicsResult = toSignal(
    toObservable(this.subject).pipe(
      switchMap((s) =>
        s ? this.content.getTopics(s).pipe(map((items) => ({ key: s.id, items }))) : of(null),
      ),
    ),
    { initialValue: null },
  );
  private topicsFresh = computed(() => {
    const s = this.subject();
    const r = this.topicsResult();
    return s && r && r.key === s.id ? r.items : null;
  });
  readonly topicsLoaded = computed(() => this.topicsFresh() !== null);
  readonly topics = computed(() => this.topicsFresh() ?? []);
  readonly topic = computed(() => this.topics().find((t) => t.id === this.topicId()) ?? null);

  // ---- Questions of the current topic ----
  private questionsResult = toSignal(
    toObservable(computed(() => ({ s: this.subject(), t: this.topic() }))).pipe(
      switchMap(({ s, t }) =>
        s && t
          ? this.content
              .getQuestions(s, t)
              .pipe(map((items) => ({ key: `${s.id}/${t.id}`, items })))
          : of(null),
      ),
    ),
    { initialValue: null },
  );
  private questionsFresh = computed(() => {
    const s = this.subject();
    const t = this.topic();
    const r = this.questionsResult();
    return s && t && r && r.key === `${s.id}/${t.id}` ? r.items : null;
  });
  readonly questionsLoaded = computed(() => this.questionsFresh() !== null);
  readonly questions = computed(() => this.questionsFresh() ?? []);
  readonly questionIndex = computed(() =>
    this.questions().findIndex((q) => q.id === this.questionId()),
  );
  readonly question = computed(() => this.questions()[this.questionIndex()] ?? null);
  readonly questionOptions = computed(() =>
    this.questions().map((q) => ({ id: q.id, title: q.title })),
  );

  // ---- Question counts for every topic in the sidebar (computed, not stored) ----
  private countsResult = toSignal(
    toObservable(computed(() => ({ s: this.subject(), topics: this.topics() }))).pipe(
      switchMap(({ s, topics }) => {
        if (!s || topics.length === 0) {
          return of(null);
        }
        return forkJoin(
          topics.map((t) =>
            this.content.getQuestions(s, t).pipe(map((q) => [t.id, q.length] as const)),
          ),
        ).pipe(
          map((entries) => ({
            key: s.id,
            counts: Object.fromEntries(entries) as Record<string, number>,
          })),
        );
      }),
    ),
    { initialValue: null },
  );
  readonly topicCounts = computed(() => {
    const s = this.subject();
    const r = this.countsResult();
    return s && r && r.key === s.id ? r.counts : ({} as Record<string, number>);
  });
}