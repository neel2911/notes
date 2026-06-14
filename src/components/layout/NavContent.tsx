import { NavLink } from 'react-router-dom'
import { Home, Search, Notebook } from 'lucide-react'
import { cn } from '@/lib/utils'
import { courses } from '@/data/courses'

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex min-h-11 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-accent text-accent-foreground'
      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
  )

export function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1" onClick={onNavigate}>
      <NavLink to="/" end className={linkClasses}>
        <Home className="size-4" />
        Home
      </NavLink>
      <NavLink to="/search" className={linkClasses}>
        <Search className="size-4" />
        Search
      </NavLink>

      <p className="mt-4 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Courses
      </p>
      {courses.map((course) => (
        <NavLink key={course.slug} to={`/course/${course.slug}`} className={linkClasses}>
          <Notebook className="size-4 shrink-0" />
          <span className="truncate">{course.title}</span>
        </NavLink>
      ))}
    </nav>
  )
}
