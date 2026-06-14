import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-pre:[--tw-prose-pre-code:var(--color-foreground)] prose-table:block prose-table:overflow-x-auto prose-table:whitespace-nowrap scroll-mt-20 [&_:target]:scroll-mt-20">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
