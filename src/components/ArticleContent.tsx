import Markdown from "react-markdown";

/**
 * Detects if a string is HTML (has tags) or markdown (has ## headers, **bold**, etc.)
 */
function isHtml(content: string): boolean {
  // If content contains HTML tags like <h2>, <p>, <strong>, <div>, etc.
  return /<[a-z][\s\S]*?>/i.test(content);
}

interface ArticleContentProps {
  content: string;
  className?: string;
}

/**
 * Renders article content as HTML or Markdown depending on format.
 * French content from the TipTap editor is HTML, while other languages
 * may be stored as markdown.
 */
export default function ArticleContent({ content, className = "" }: ArticleContentProps) {
  if (!content) return null;

  if (isHtml(content)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return (
    <div className={className}>
      <Markdown>{content}</Markdown>
    </div>
  );
}
