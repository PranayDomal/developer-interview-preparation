import { Marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import csharp from 'highlight.js/lib/languages/csharp';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';

// Only the languages we need, which keeps the app small
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerAliases(['cshtml', 'razor'], { languageName: 'xml' });

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const marked = new Marked({
  gfm: true,
  renderer: {
    // Code blocks: syntax highlighting
    code({ text, lang }) {
      const language = (lang ?? '').trim().split(/\s+/)[0].toLowerCase();
      const body =
        language && hljs.getLanguage(language)
          ? hljs.highlight(text, { language, ignoreIllegals: true }).value
          : escapeHtml(text);
      return `<pre class="code-block"><code class="hljs">${body}</code></pre>`;
    },

    // > [!NOTE] and > [!WARNING] become highlighted boxes
    blockquote({ tokens }) {
      const inner = this.parser.parse(tokens);
      const match = /^\s*<p>\s*\[!(NOTE|WARNING)\]\s*(?:<br\s*\/?>)?\s*/i.exec(inner);
      if (!match) {
        return `<blockquote>${inner}</blockquote>`;
      }
      const kind = match[1].toLowerCase();
      const label = kind === 'note' ? 'Note' : 'Warning';
      const body = inner.replace(match[0], '<p>');
      return `<div class="callout callout-${kind}"><strong class="callout-title">${label}</strong>${body}</div>`;
    },
  },
});

export function renderMarkdown(markdown: string): string {
  if (!markdown.trim()) {
    return '';
  }
  const html = marked.parse(markdown, { async: false }) as string;
  // Wrap tables so wide ones scroll inside their box on phones
  return html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
}