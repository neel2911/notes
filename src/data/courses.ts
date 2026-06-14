export interface Course {
  slug: string
  title: string
  platform: string
  instructor: string
  description: string
}

export const courses: Course[] = [
  {
    slug: 'full-stack-fundamentals',
    title: 'Full Stack Fundamentals, v3',
    platform: 'Frontend Masters',
    instructor: 'Jem Young (Netflix)',
    description:
      'Modern computing layers, the terminal & VIM, networking (TCP/IP, DNS), Linux servers & Nginx, security, CI/CD, databases, containers, and load balancing.',
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}
