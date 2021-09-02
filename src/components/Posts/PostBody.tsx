import React, { useEffect, useState } from 'react'
import { urlForImage } from '../../lib/sanity'
import clsx from 'clsx'
import ProductDetail from './ProductDetail'
import ProductInfo from './ProductInfo'
import ProductReview from './ProductReview'
import PoductCard from './PoductCard'
import { Post } from '../../models/Post'

export default function PostBody({ post }: { post: Post }) {
  const [imageUrl, setImageUrl] = useState<string | null>()

  const [tabDetail, setTabDetail] = useState(false)
  const [tabReview, setTabReview] = useState(false)
  const [tabEtc, setTabEtc] = useState(false)

  useEffect(() => {
    if (post) {
      const imageUrl = urlForImage(post.coverImage).height(1000).width(2000).quality(80).url()
      setImageUrl(imageUrl)
    }
  }, [post])

  return (
    <div>
      <PoductCard
        id={post._id}
        slug={post.slug}
        title={post.title}
        subTitle={post.subTitle}
        content={post.content}
        imageUrl={imageUrl}
      />

      <ul id="tabProduct" className="tab-product lg:sticky flex border border-blue-600 h-12 text-blue-600 bg-white">
        <li className={clsx(tabDetail && 'active', 'flex-1 flex justify-center items-center border-r border-blue-600')}>
          <a href="#productDetail" className="flex justify-center items-center w-full h-full">
            상품상세
          </a>
        </li>
        <li className={clsx(tabReview && 'active', 'flex-1 flex justify-center items-center border-r border-blue-600')}>
          <a href="#productReview" className="flex justify-center items-center w-full h-full">
            상품후기
          </a>
        </li>
        <li className={clsx(tabEtc && 'active', 'flex-1 flex justify-center items-center border-blue-600')}>
          <a href="#productEtc" className="flex justify-center items-center w-full h-full">
            기타안내
          </a>
        </li>
      </ul>

      <div className="h-20"></div>

      <ProductDetail content={post.productDetail} />
      <ProductReview />
      <ProductInfo content={post.productInfo} />
    </div>
  )
}
