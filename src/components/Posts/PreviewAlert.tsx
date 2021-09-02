import Link from 'next/link'
import React from 'react'

export default function PreviewAlert() {
  async function exitPreviewMode() {
    const res = await fetch('/api/exit-preview').catch((err) => console.error(err))

    if (res) {
      window.close()
    }
  }

  return (
    <div className="border-b bg-accent-7 border-accent-7 text-white">
      <div className="py-2 text-center text-sm bg-red-400">
        <>
          This page is a preview.{' '}
          <button onClick={() => exitPreviewMode()}>
            {' '}
            <p className="underline hover:text-cyan duration-200 transition-colors">Click here</p>
          </button>
          to exit preview mode.
        </>
      </div>
    </div>
  )
}
