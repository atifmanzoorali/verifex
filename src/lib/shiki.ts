import { createHighlighter } from 'shiki';

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter(): Promise<Awaited<ReturnType<typeof createHighlighter>>> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark'],
      langs: ['bash', 'json', 'typescript'],
    });
  }
  return highlighter;
}

export async function highlight(code: string, lang: 'bash' | 'json' | 'typescript'): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, { lang, theme: 'github-dark' });
}
