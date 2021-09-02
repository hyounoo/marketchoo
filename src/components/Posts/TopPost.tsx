import Link from 'next/link'
import React from 'react'
import { urlForImage } from '../../lib/sanity'
import { Post } from '../../models/Post'
import DisplayDate from '../DisplayDate'
import Avatar from './Avatar'
import CoverImage from './CoverImage'

export default function TopPost({ post }: { post: Post }) {
  const imageUrl = urlForImage(post.coverImage).height(1000).width(2000).url()
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage slug={post.slug} title={post.title} imageUrl={imageUrl} />
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${post.slug}`}>
              <a className="hover:underline">{post.title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DisplayDate dateString={post.date.toString()} />
          </div>
        </div>
        <div>
          <Avatar name={post.author.name} picture={post.author.picture} />
        </div>
      </div>
    </section>
  )
}
