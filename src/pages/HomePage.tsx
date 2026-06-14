import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { courses } from '@/data/courses'

export function HomePage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A personal knowledge base of course notes. Pick a course below to start reading.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <Link key={course.slug} to={`/course/${course.slug}`}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>
                  {course.platform} · {course.instructor}
                </CardDescription>
                <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
