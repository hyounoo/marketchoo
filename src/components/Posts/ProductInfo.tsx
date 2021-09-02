import React from 'react'
import { InView } from 'react-intersection-observer'
import { PortableText } from '../../lib/sanity'

export default function ProductInfo({ content }: { content?: any }) {
  return (
    <InView
      as="section"
      threshold={0.5}
      // onChange={handleIntersectionTab}
      id="productEtc"
      className="section mt-20 lg:pt-12"
    >
      <div className="section__inner">
        <h3 className="title text-lg">기타안내</h3>
        {content && <PortableText blocks={content} />}
      </div>
    </InView>
  )
}
