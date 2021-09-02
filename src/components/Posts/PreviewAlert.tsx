import Link from 'next/link'
import React from 'react'

export default function PreviewAlert() {
  return (
    <div className="border-b bg-accent-7 border-accent-7 text-white">
      <div className="py-2 text-center text-sm bg-red-400">
        <>
          This page is a preview.{' '}
          <Link href="/api/exit-preview">
            <a className="underline hover:text-cyan duration-200 transition-colors">Click here</a> to exit preview mode.
          </Link>
        </>
      </div>
    </div>
  )
}
