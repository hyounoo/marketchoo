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
      <a className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
        <div
          className="flex items-end justify-end h-56 w-full bg-cover"
          style={{
            backgroundImage: `url('${urlFor(mainImage).auto('format').fit('crop').width(750).quality(80)}`
          }}
        >
          <button className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-3">
          <h3 className="text-gray-700 uppercase text-left">{title}</h3>
          <p className="text-gray-700 text-sm text-left">상품설명...</p>
          <div className="flex justify-between items-left">
            <div className="text-gray-500 text-sm">
              <span className="font-bold mr-1">{defaultProductVariant?.price}</span>
              <span className="text-xs italic">CHOO</span>
            </div>
            <div className="flex items-start">
              <button className="btn-comment flex-1 rounded-lg text-xs align-top">comments 32</button>
              <button className="btn-comment flex-1 rounded-lg text-xs align-top">favorites 7</button>
              {/* <IconButton className="btn-comment flex-1 p-2 rounded-lg text-xs align-top">
                <Icon fontSize="inherit" className="text-sm">
                  comment
                </Icon>
                <span className="inline-block ml-1 text-sm leading-none align-middle">32</span>
              </IconButton> */}
              {/* <IconButton className="btn-like flex-1 p-2 rounded-lg text-xs text-red-500 align-top">
                <Icon fontSize="inherit" className="text-sm">
                  favorite
                </Icon>
                <span className="inline-block ml-1 text-sm leading-none align-middle">7</span>
              </IconButton> */}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
