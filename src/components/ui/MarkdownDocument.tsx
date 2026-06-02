import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarkdownDocumentProps = {
  content: string;
  className?: string;
};

function isSafeHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("/");
}

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*|_[^_]+_)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${match.index}-${token}`;

    if (token.startsWith("**") || token.startsWith("__")) {
      parts.push(
        <strong key={key} className="font-black">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      parts.push(
        <code key={key} className="rounded-md bg-leaf-50 px-1.5 py-0.5 font-mono text-[0.78em] font-bold text-leaf-700">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const label = linkMatch?.[1] ?? token;
      const href = linkMatch?.[2] ?? "";

      parts.push(
        isSafeHref(href) ? (
          <a key={key} href={href} className="font-black text-leaf-700 underline decoration-leaf-500/35 underline-offset-2" target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
            {label}
          </a>
        ) : (
          label
        ),
      );
    } else {
      parts.push(
        <em key={key} className="font-semibold italic">
          {token.slice(1, -1)}
        </em>,
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}

function isBlockStart(line: string) {
  return /^(#{1,3})\s+/.test(line) || /^>\s?/.test(line) || /^\s*[-*]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line) || /^```/.test(line);
}

export function MarkdownDocument({ content, className }: MarkdownDocumentProps) {
  const lines = content.replace(/\r\n/g, "\n").trim().split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push(
        <pre key={blocks.length} className="overflow-x-auto rounded-lg bg-leaf-950 px-3 py-2 text-xs font-semibold leading-5 text-leaf-50">
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const Heading = headingMatch[1].length === 1 ? "h2" : "h3";
      blocks.push(
        <Heading key={blocks.length} className="font-heading text-[0.95rem] font-black leading-snug text-leaf-700">
          {renderInline(headingMatch[2])}
        </Heading>,
      );
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];

      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push(
        <blockquote key={blocks.length} className="border-l-4 border-leaf-500/40 pl-3 font-semibold text-mutedText">
          {renderInline(quoteLines.join(" "))}
        </blockquote>,
      );
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ""));
        index += 1;
      }

      blocks.push(
        <ul key={blocks.length} className="list-disc space-y-1 pl-5">
          {items.map((item, itemIndex) => (
            <li key={`${itemIndex}-${item}`}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];

      while (index < lines.length && /^\s*\d+[.)]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+[.)]\s+/, ""));
        index += 1;
      }

      blocks.push(
        <ol key={blocks.length} className="list-decimal space-y-1 pl-5">
          {items.map((item, itemIndex) => (
            <li key={`${itemIndex}-${item}`}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    const paragraphLines = [line.trim()];
    index += 1;

    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push(
      <p key={blocks.length}>
        {renderInline(paragraphLines.join(" "))}
      </p>,
    );
  }

  return <div className={cn("space-y-2 [&_li]:leading-6 [&_p]:leading-6", className)}>{blocks}</div>;
}
