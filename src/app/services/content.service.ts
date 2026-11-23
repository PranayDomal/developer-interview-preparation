import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { Question, Subject, Topic } from '../models/content.models';
import { parseQuestions } from './question-parser';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  private cache = new Map<string, Observable<unknown>>();

  getSubjects(): Observable<Subject[]> {
    return this.load<Subject[]>('/content/subjects.json', (text) => JSON.parse(text), []);
  }

  getTopics(subject: Subject): Observable<Topic[]> {
    return this.load<Topic[]>(
      `/content/${subject.folder}/topics.json`,
      (text) => JSON.parse(text),
      [],
    );
  }

  getQuestions(subject: Subject, topic: Topic): Observable<Question[]> {
    return this.load<Question[]>(
      `/content/${subject.folder}/${topic.file}`,
      (text) => parseQuestions(text),
      [],
    );
  }

  // Each file is downloaded once, then reused from the cache
  private load<T>(url: string, parse: (text: string) => T, fallback: T): Observable<T> {
    let request = this.cache.get(url) as Observable<T> | undefined;
    if (!request) {
      request = this.http.get(url, { responseType: 'text' }).pipe(
        map(parse),
        catchError((error) => {
          console.error(`[content] Could not load or read ${url}`, error);
          return of(fallback);
        }),
        shareReplay(1),
      );
      this.cache.set(url, request);
    }
    return request;
  }
}