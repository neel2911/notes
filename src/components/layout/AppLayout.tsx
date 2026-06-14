import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Menu, NotebookText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { NavContent } from './NavContent'

export function AppLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen md:flex">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background px-4 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <SheetContent side="left" className="w-3/4 max-w-xs">
            <SheetHeader>
              <SheetTitle>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-base font-semibold"
                  onClick={() => setOpen(false)}
                >
                  <NotebookText className="size-5" />
                  Notes
                </Link>
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-5rem)] px-2">
              <NavContent onNavigate={() => setOpen(false)} />
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Link to="/" className="flex items-center gap-2 text-base font-semibold">
          <NotebookText className="size-5" />
          Notes
        </Link>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border md:flex md:flex-col">
        <div className="flex h-16 items-center gap-2 px-4">
          <Link to="/" className="flex items-center gap-2 text-base font-semibold">
            <NotebookText className="size-5" />
            Notes
          </Link>
        </div>
        <ScrollArea className="flex-1 px-2 pb-4">
          <NavContent />
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-4 py-4 md:px-12 md:py-8">
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
