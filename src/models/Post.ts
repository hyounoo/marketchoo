import { Author } from './Author'

export interface Post {
  _id: string
  title: string
  subTitle: string
  content: any
  productDetail: any
  productInfo: any
  coverImage: any
  date: Date
  author: Author
  slug: any
}
