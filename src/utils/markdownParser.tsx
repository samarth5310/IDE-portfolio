import React from 'react';

/**
 * Parses inline markdown tokens:
 * - **bold text**
 * - *italic text*
 * - `code snippet`
 * - [Link text](url)
 */
export function renderInlineMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  // Tokenize the string by matching markdown tokens
  // Matches: [link](url) | **bold** | *italic* | `code`
  const tokenRegex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Link: [Text](url)
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const [, linkText, url] = match;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ide-accent font-semibold hover:underline inline-flex items-center space-x-0.5"
          >
            <span>{renderInlineMarkdown(linkText)}</span>
            <span className="text-[10px] ml-0.5">↗</span>
          </a>
        );
      }
    }

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-white">
          {renderInlineMarkdown(inner)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-neutral-300">
          {renderInlineMarkdown(inner)}
        </em>
      );
    }

    // Code: `text`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-ide-panel border border-ide-border text-amber-300 font-mono text-[11px] font-medium"
        >
          {inner}
        </code>
      );
    }

    // Regular text
    return <span key={index}>{part}</span>;
  });
}
