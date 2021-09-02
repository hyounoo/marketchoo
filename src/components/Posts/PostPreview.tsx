import Avatar from './Avatar'
import Date from '../DisplayDate'
import CoverImage from './CoverImage'
import Link from 'next/link'
import { Post } from '../../models/Post'
import { urlForImage } from '../../lib/sanity'

export default function PostPreview({ post }: { post: Post }) {
  const imageUrl = urlForImage(post.coverImage).height(265).width(530).quality(80).url()
  return (
    <div className="p-2">
      <div className="mb-5">
        <CoverImage slug={post.slug} title={post.title} imageUrl={imageUrl} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${post.slug}`}>
          <a className="hover:underline">{post.title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={post.date.toString()} />
      </div>
      <Avatar name={post.author.name} picture={post.author.picture} />
    </div>
  )
}
