import { Routes, UrlMatchResult, UrlSegment } from '@angular/router';
import { InterviewReader } from './pages/interview-reader/interview-reader';

const paramNames = ['subject', 'topic', 'question'];

function readerMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length > paramNames.length) {
    return null;
  }
  const posParams: Record<string, UrlSegment> = {};
  segments.forEach((segment, i) => (posParams[paramNames[i]] = segment));
  return { consumed: segments, posParams };
}

export const routes: Routes = [{ matcher: readerMatcher, component: InterviewReader }];