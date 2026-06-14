import { courses, type Course } from '@/data/courses'

const SIMULATED_LATENCY_MS = 300

/**
 * Searches the local course list. Wrapped in a promise with artificial
 * latency so the UI can demonstrate real loading/error states even
 * though the data is static.
 */
export async function searchCourses(query: string): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  const normalized = query.trim().toLowerCase()

  if (normalized === 'error') {
    throw new Error('Search service unavailable')
  }

  if (!normalized) return courses

  return courses.filter((course) =>
    [course.title, course.platform, course.instructor, course.description]
      .join(' ')
      .toLowerCase()
      .includes(normalized),
  )
}
