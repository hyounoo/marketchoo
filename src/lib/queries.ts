const postsFields = `
  _id,
  name,
  title,
  subTitle,
  content,  
  date,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

const postFields = `
  _id,
  name,
  title,
  subTitle,
  content,
  productDetail,
  productInfo,
  date,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const indexQuery = `
*[_type == "post"] | order(date desc) {
  ${postsFields}
}`

// export const postQuery = `
// {
//   "post": *[_type == "post" && slug.current == $slug][0] {
//     content,
//     ${postFields}
//   },
//   "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc) | [0...2] {
//     content,
//     ${postFields}
//   }
// }`

export const postQuery = `
*[_type == "post" && slug.current == $slug][0] {
  content,
  ${postFields}
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`
