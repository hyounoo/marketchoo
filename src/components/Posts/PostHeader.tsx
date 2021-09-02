import React from 'react'
import { Author } from '../../models/Author'
import { log } from '../../utils/log'
import DisplayDate from '../DisplayDate'
import Avatar from './Avatar'
import PostTitle from './PostTitle'

export default function PostHeader({ title, author, date }: { title: string; author: Author; date: Date }) {
  log('author: ', author)
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-6 md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
        <DisplayDate dateString={date.toString()} />
      </div>
    </>
  )
}
