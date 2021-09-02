import React from 'react'

export default function PostTitle({ children }: { children: React.ReactChild }) {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-6 text-center md:text-left">
      {children}
    </h1>
  )
}
