import React from 'react'
import { InView } from 'react-intersection-observer'
import { PortableText } from '../../lib/sanity'

export default function ProductDetail({ content }: { content?: any }) {
  return (
    <InView
      as="section"
      threshold={0.1}
      // onChange={handleIntersectionTab}
      id="productDetail"
      className="section mt-20 lg:pt-12"
    >
      <div className="section__inner">
        <h3 className="title text-lg">상품상세</h3>
        {content && <PortableText blocks={content} />}
      </div>
    </InView>
  )
}
