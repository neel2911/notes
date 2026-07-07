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
  {
    slug: 'complete-intro-linux-cli',
    title: 'Complete Intro to Linux and the Command-Line',
    platform: 'Frontend Masters',
    instructor: 'Brian Holt',
    description:
      'Unix history & philosophy, Linux distros, Bash CLI, file system navigation, streams & pipes, users & permissions, shell scripting, SSH, package management, and cron.',
  },
  {
    slug: 'complete-intro-containers',
    title: 'Complete Intro to Containers, V2',
    platform: 'Frontend Masters (master.dev)',
    instructor: 'Brian Holt',
    description:
      'Linux container primitives (chroot, namespaces, cgroups), Docker CLI & Dockerfiles, multistage builds, distroless images, bind mounts, volumes, dev containers, Docker Compose, and Kubernetes fundamentals.',
  },
]

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}
