import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Skeleton } from '@/components/ui/skeleton'
import { searchCourses } from '@/lib/search'
import type { Course } from '@/data/courses'

type Status = 'loading' | 'error' | 'done'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Course[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    searchCourses(query)
      .then((courses) => {
        if (cancelled) return
        setResults(courses)
        setStatus('done')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [query])

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Search</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find a course by title, platform, or instructor.
        </p>
      </header>

      <Command shouldFilter={false} className="rounded-lg border border-border">
        <CommandInput
          placeholder="Search notes..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {status === 'loading' && (
            <div className="space-y-2 p-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 text-sm text-destructive">
              Something went wrong while searching. Please try again.
            </div>
          )}

          {status === 'done' && results.length === 0 && (
            <CommandEmpty>No courses found for "{query}".</CommandEmpty>
          )}

          {status === 'done' && results.length > 0 && (
            <CommandGroup heading="Courses">
              {results.map((course) => (
                <CommandItem
                  key={course.slug}
                  value={course.slug}
                  onSelect={() => navigate(`/course/${course.slug}`)}
                  className="min-h-11 flex-col items-start gap-0.5"
                >
                  <span className="font-medium">{course.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {course.platform} · {course.instructor}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  )
}
