import Link from 'next/link'
import { urlFor } from '../lib/sanity'
import { IconButton, Icon, Button } from '@material-ui/core'

function ProductCard({
  _id,
  title,
  mainImage,
  slug,
  defaultProductVariant
}: {
  _id: string
  title: string
  mainImage: string
  slug: any
  defaultProductVariant: any
}) {
  return (
    <Link href={`/products/${slug.current}`}>
      <a className="w-full max-w-sm mx-auto rounded-md overflow-hidden shadow-md hover:shadow-sm transition-all duration-500">
        <div
          className="flex items-end justify-end h-56 w-full bg-cover"
          style={{
            backgroundImage: `url('${urlFor(mainImage).auto('format').fit('crop').width(750).quality(80)}`
          }}
        >
          <div className="flex justify-between -mb-3 px-4 w-full">
            <div className="left">
              <IconButton className="btn-cart z-10 p-2 min-w-0 rounded-lg text-white bg-blue-400 hover:bg-blue-500 transition-all">
                <Icon color="inherit" className="align-top">shopping_cart</Icon>
              </IconButton>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 pt-4">
          <h3 className="text-gray-700 uppercase">{title}</h3>
          <p className="text-gray-700 text-sm">상품설명 상품설명 상품설명</p>
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm">
              <span className="font-bold mr-1">{defaultProductVariant?.price}</span>
              <span className="text-xs italic">CHOO</span>
            </div>
            <div className="flex items-start">
              <IconButton className="btn-comment flex-1 p-2 rounded-lg text-xs align-top">
                <Icon fontSize="inherit" className="text-sm">comment</Icon>
                <span className="inline-block ml-1 text-sm leading-none align-middle">32</span>
              </IconButton>
              <IconButton className="btn-like flex-1 p-2 rounded-lg text-xs text-red-500 align-top">
                <Icon fontSize="inherit" className="text-sm">favorite</Icon>
                <span className="inline-block ml-1 text-sm leading-none align-middle">7</span>
              </IconButton>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
