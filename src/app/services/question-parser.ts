import { Difficulty, Question } from '../models/content.models';

const QUESTION_HEADING = /^##\s+(.+?)\s*$/;
const ID_SUFFIX = /\s*\{#([^}\s]+)\}\s*$/;
const INTERVIEW_HEADING = /^###\s+how to answer in an interview\s*$/i;
const DIFFICULTY_LINE = /^difficulty:\s*(beginner|intermediate|advanced)\s*$/i;
const FENCE = /^\s*(```|~~~)/;

interface Draft {
  id: string;
  title: string;
  difficulty?: Difficulty;
  explanation: string[];
  answer: string[];
  hasAnswerHeading: boolean;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/c#/g, 'csharp')
    .replace(/\.net/g, 'dotnet')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function startDraft(heading: string): Draft {
  const idMatch = ID_SUFFIX.exec(heading);
  const title = heading.replace(ID_SUFFIX, '').trim();
  return {
    id: idMatch ? idMatch[1] : slugify(title),
    title,
    explanation: [],
    answer: [],
    hasAnswerHeading: false,
  };
}

function toQuestion(draft: Draft): Question {
  if (!draft.hasAnswerHeading) {
    console.warn(`[content] "${draft.title}" has no "### How to Answer in an Interview" section.`);
  }
  return {
    id: draft.id,
    title: draft.title,
    difficulty: draft.difficulty,
    explanationMarkdown: draft.explanation.join('\n').trim(),
    interviewAnswerMarkdown: draft.answer.join('\n').trim(),
  };
}

export function parseQuestions(markdown: string): Question[] {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n'); // handles Windows line endings
  const drafts: Draft[] = [];
  let current: Draft | null = null;
  let inFence = false;
  let inAnswer = false;

  for (const line of lines) {
    if (FENCE.test(line)) {
      inFence = !inFence;
    }

    // Headings only count when we are NOT inside a code block
    if (!inFence) {
      const heading = QUESTION_HEADING.exec(line);
      if (heading) {
        current = startDraft(heading[1]);
        drafts.push(current);
        inAnswer = false;
        continue;
      }
      if (current && INTERVIEW_HEADING.test(line)) {
        current.hasAnswerHeading = true;
        inAnswer = true;
        continue;
      }
    }

    if (!current) {
      continue; // ignore anything before the first question
    }

    // Optional "difficulty:" line, only right after the title
    if (!inAnswer && !inFence && current.explanation.every((l) => l.trim() === '')) {
      const difficulty = DIFFICULTY_LINE.exec(line);
      if (difficulty) {
        current.difficulty = difficulty[1].toLowerCase() as Difficulty;
        continue;
      }
    }

    (inAnswer ? current.answer : current.explanation).push(line);
  }

  const questions = drafts.map(toQuestion);

  const seen = new Set<string>();
  for (const q of questions) {
    if (seen.has(q.id)) {
      console.warn(`[content] Duplicate question id "${q.id}". Add a unique {#id} to one of them.`);
    }
    seen.add(q.id);
  }

  return questions;
}