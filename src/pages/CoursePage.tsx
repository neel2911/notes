import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { MarkdownRenderer } from '@/components/markdown/MarkdownRenderer'
import { getCourseBySlug } from '@/data/courses'
import { NotFoundPage } from './NotFoundPage'

const markdownModules = import.meta.glob('/src/content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function CoursePage() {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const course = slug ? getCourseBySlug(slug) : undefined
  const content = course && slug ? markdownModules[`/src/content/${slug}.md`] : undefined

  useEffect(() => {
    if (!content || !location.hash) return
    const id = decodeURIComponent(location.hash.slice(1))
    const el = document.getElementById(id)
    el?.scrollIntoView()
  }, [content, location.hash])

  if (!course) return <NotFoundPage />

  if (!content) return <NotFoundPage />

  return (
    <article>
      <header className="mb-6 border-b border-border pb-4">
        <h1 className="text-2xl font-semibold">{course.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {course.platform} · {course.instructor}
        </p>
      </header>
      <MarkdownRenderer content={content} />
    </article>
  )
}
