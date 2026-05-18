import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/layout/Header";
import { useSidebarToggle } from "@/hooks/useSidebarToggle";

/**
 * Layout
 *
 * Two-column flex row (sidebar + main):
 *  - xl+ (> 1280px): sidebar always visible, no overlay
 *  - ≤ xl:          sidebar is a position:fixed overlay, translateX(-100%) when
 *                   closed, translateX(0) when open. A semi-transparent backdrop
 *                   covers #main and closes the sidebar on click.
 *
 * Resize debounce: adds `is-resizing` to <body> during window resize (100ms)
 * so globals.css can disable all transitions, preventing layout glitches during
 * orientation changes.
 */
export function Layout() {
  const { isOpen, toggle, close } = useSidebarToggle();
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Resize transition lock
  useEffect(() => {
    const handleResize = (): void => {
      document.body.classList.add("is-resizing");
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        document.body.classList.remove("is-resizing");
      }, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      document.body.classList.remove("is-resizing");
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-(--color-bg)">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      {/*
        Desktop (xl+): always visible, normal document flow (relative positioning).
        Mobile (< xl): position:fixed overlay, slides in/out via translateX.
        The SidebarToggle button is rendered *inside* the Sidebar div (as an
        absolute child) so it slides with the sidebar during the transition.
      */}
      <div
        id="sidebar"
        className={[
          // Base — desktop: normal flow, shrink-0 so it never compresses
          "shrink-0",
          "w-(--sidebar-width)",
          "bg-(--color-bg-alt)",
          "border-r border-(--color-border)",
          // Mobile overlay behaviour
          "xl:relative xl:translate-x-0",
          "fixed top-0 left-0 h-full z-50",
          "transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0",
        ].join(" ")}
        aria-label="Sidebar"
      >
        <Sidebar isOpen={isOpen} toggle={toggle} close={close} />
      </div>

      {/* ── Mobile overlay backdrop ──────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 xl:hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}

      {/* ── Main content area ────────────────────────────────────────────── */}
      <div
        id="main"
        className={[
          "flex flex-col flex-1 min-w-0",
          "bg-(--color-bg)",
          // On xl+ the sidebar takes its natural width so main shrinks to fit.
          // On mobile the sidebar is out of flow (fixed), main is full-width.
        ].join(" ")}
      >
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
