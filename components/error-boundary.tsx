"use client"

import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
}

// ── Crash safety net ────────────────────────────────────────────────────────
// Without this, an uncaught error anywhere in the tree (most commonly caused
// by Chrome/Google Translate rewriting the DOM with <font> wrapper nodes,
// which then conflicts with React's next reconciliation and throws
// "Failed to execute 'removeChild' on 'Node'") unmounts the ENTIRE app.
// Next.js then renders nothing, so all the user sees is the raw <body>
// background — which reads as a permanently frozen black screen, exactly
// what showed up in the screen recordings.
//
// This boundary catches that crash and shows a small recoverable fallback
// instead of a blank/frozen page.
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown, info: unknown) {
    // Keep a trace in the console for debugging without breaking the UI.
    console.error("Caught render error:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-4 bg-background px-6 text-center">
          <p className="text-lg font-semibold text-foreground">
            Something went wrong loading this page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Reload
          </button>
        </div>
      )
    }

    return this.props.children
  }
}