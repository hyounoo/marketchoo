import { useState } from 'react'
import { urlFor, PortableText, getClient } from '../lib/sanity'
import { Card, CardContent, Typography, Icon } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share"
import { number } from 'yup'

type Product = {
  _id: any
  title: any
  defaultProductVariant: any
  mainImage: any
  blurb: any
  body: any
  tags: any
  vendor: any
  categories: any
  slug: any
}

function ProductPage({ product }: { product: Product }) {
  const [count, setCount] = useState(1)
  const handleCount = (value: number) => (!(count === 0 && value === -1) ? setCount(count + value) : count)
  // const { title, defaultProductVariant, mainImage, body } = product

  // for btn-like
  const [selectedLike, setSelectedLike] = useState(false)

  // for Rating
  const [rateValue, setRateValue] = useState<number | null>(3.5);

  // const shareUrl = path까지는 알아봤는데 HOST를 가져오는 방법을 모르겠어요 ㅠㅠ;

  const writeOnlyNumber = (ev: any) => {
    // Remove invalid characters
    var sanitized = ev.currentTarget.value.replace(/[^-.0-9]/g, '');
    // Remove non-leading minus signs
    sanitized = sanitized.replace(/(.)-+/g, '$1');
    // Remove the first point if there is more than one
    sanitized = sanitized.replace(/\.(?=.*\.)/g, '');
    // Update value
    ev.currentTarget.value = sanitized;
  }

  return (
    <>
      <Card className="product-card mb-6 -mt-6 lg:mt-0 shadow-none lg:shadow-md">
        <div className="grid gap-4 grid-cols-1 lg:gap-6 lg:grid-cols-3">
          <div className="w-full lg:col-span-2">
            {product?.mainImage && (
              <div className="product-card__thumbs h-64 xl:h-128">
                <img
                  className="h-full w-full rounded-md object-cover"
                  src={urlFor(product?.mainImage).auto('format').width(1051).fit('crop').quality(80).toString()!}
                  alt={product?.mainImage?.alt || `Photo of ${product?.title}`}
                />
              </div>
            )}
            <div className="flex justify-between pt-2 px-0 md:p-2">
              <div className="flex">
                <Rating name="read-only" precision={0.5} value={rateValue} readOnly />
                <a href="#review" className="ml-1"><strong className="mr-1">1,034</strong>리뷰</a>
              </div>
              <div className="flex">
                <FacebookShareButton
                  // url={shareUrl}
                  url="https://google.com"
                  quote={product?.title}
                  className="">
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
                <TwitterShareButton
                  // url={shareUrl}
                  url="https://google.com"
                  className="ml-2">
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
                {/* <button type="button" className="btn-kakaotalk">
                  <svg className="w-10 h-10" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="m235.178 216.211a10.855 10.855 0 0 0 -20.323 0l-20.925 55.989a6.971 6.971 0 0 0 13.059 4.88l3.341-10.085h28.046a6.464 6.464 0 0 0 1.284-.129l3.384 10.214a6.97 6.97 0 1 0 13.056-4.88zm-18.678 38.214 9.921-29.945 9.921 29.945z"/>
                    <path d="m202.965 216.239a6.971 6.971 0 0 0 -6.97-6.971h-42.572a6.971 6.971 0 0 0 0 13.942h14.315v51.427a6.97 6.97 0 1 0 13.94 0v-51.427h14.322a6.971 6.971 0 0 0 6.965-6.971z"/>
                    <path d="m297.1 267.065h-19.8v-50.826a6.97 6.97 0 1 0 -13.94 0v56.37a8.406 8.406 0 0 0 8.4 8.4h25.34a6.97 6.97 0 1 0 0-13.94z"/>
                    <path d="m338.962 241.494 20.638-19.946a6.873 6.873 0 0 0 -9.554-9.882l-25.735 26.764v-22.191a7.363 7.363 0 1 0 -14.726 0v58.4a7.363 7.363 0 1 0 14.726 0v-18.983l4.723-4.566 20.433 27.487a7.265 7.265 0 0 0 11.456-8.938z"/>
                    <path d="m256 0c-141.385 0-256 114.615-256 256s114.615 256 256 256 256-114.615 256-256-114.615-256-256-256zm0 358.935a185.433 185.433 0 0 1 -28.708-2.225l-57.987 40.667a3.674 3.674 0 0 1 -5.663-3.941l13.779-52.516c-40.928-20.55-68.088-56.675-68.088-97.814 0-63.971 65.667-115.829 146.667-115.829s146.667 51.858 146.667 115.829-65.667 115.829-146.667 115.829z"/>
                  </svg>
                </button> */}
              </div>
            </div>
          </div>

          <CardContent className="flex flex-col justify-between w-full px-0 py-0 md:pr-6 md:pb-10">
            <div aria-label="top">
              <Typography variant="h5" component="h3">{product?.title}</Typography>
              <div className="flex items-center">
                <Icon className="mr-1">paid</Icon>
                <span className="mr-1 text-2xl font-bold">
                  {count <= 1 ? product?.defaultProductVariant?.price : product?.defaultProductVariant?.price}
                </span>
                <span className="mt-1 text-gray-500 text-lg italic">CHOO</span>
              </div>
              <Typography className="mt-2 mb-6 text-gray-600" variant="body2" color="textSecondary" component="p">
                {product?.body && <PortableText blocks={product?.body?.en} />}
              </Typography>
            </div>

            <div aria-label="bottom">
              <div className="mt-2 flex justify-between">
                <div className="flex align-top items-center border border-gray-200">
                  <button type="button" disabled={count <= 1} className="border-r p-2 text-gray-400 hover:text-gray-600" onClick={() => handleCount(-1)}>
                    <Icon className="align-top">remove</Icon>
                  </button>

                  {/* 수량을 직접 입력할 수 있게 input을 썼는데 value에 count를 적용하면 수정이 불가하네요 ㅠㅠ */}
                  <input type="text" className="w-10 text-center" value={count} onChange={writeOnlyNumber} />

                  <button type="button" className="border-l p-2 text-gray-400 hover:text-gray-600" onClick={() => handleCount(1)}>
                    <Icon className="align-top">add</Icon>
                  </button>
                </div>

                <div className="flex-1 flex justify-end items-center">
                  <Icon className="mr-1 text-blue-600">paid</Icon>
                  {/* <span>합계</span> */}
                  <span className="mr-1 text-2xl font-bold">{count <= 1 ? product?.defaultProductVariant?.price : product?.defaultProductVariant?.price * count}</span>
                  <span className="mt-1 text-gray-500 text-lg italic">CHOO</span>
                </div>
              </div>
              <div className="flex mt-4 h-12">
                <button type="button" className="mr-1 px-2" onClick={() => setSelectedLike(!selectedLike)}>
                  <Icon className={selectedLike ? 'text-red-600 transition-all' : 'transition-all'}>favorite</Icon>
                </button>
                <button type="button" className="flex-1 border border-blue-600 text-blue-600">장바구니 담기</button>
                <button type="button" className="flex-1 bg-blue-600 text-white">바로구매</button>
              </div>
            </div>
          </CardContent>
          <span className="overflow-hidden absolute w-0">{/* Do not remove this DOM */}</span>
        </div>

        
      </Card>

      <div>
        에디터에서 작성한 HTML코드 컨텐츠
      </div>
    </>
  )
}

export default ProductPage
