import { useState } from 'react'
import { urlFor, PortableText, getClient } from '../lib/sanity'
import { Box, Card, CardContent, Icon, Typography, TextareaAutosize } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share'
import { number } from 'yup'
import clsx from 'clsx'
import { InView } from 'react-intersection-observer'

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
  const ratingLabels: { [index: string]: string } = {
    0: 'face-00',
    0.5: 'face-01',
    1: 'face-02',
    1.5: 'face-03',
    2: 'face-04',
    2.5: 'face-05',
    3: 'face-06',
    3.5: 'face-07',
    4: 'face-08',
    4.5: 'face-09',
    5: 'face-10'
    // 0: 'bad',
    // 0.5: 'Useless',
    // 1: 'Useless+',
    // 1.5: 'Poor',
    // 2: 'Poor+',
    // 2.5: 'Ok',
    // 3: 'Ok+',
    // 3.5: 'Good',
    // 4: 'Good+',
    // 4.5: 'Excellent',
    // 5: 'Excellent+',
  }
  const [rateValue, setRateValue] = useState<number | null>(0)
  const [hover, setHover] = useState(-1)

  // for Review
  const [activeWriteReview, setActiveWriteReview] = useState(false)
  const handleWriteReview = (ev: any) => {
    setActiveWriteReview(true)
    setTimeout(() => {
      const textareaElem = document.querySelector('#textareaReview') as HTMLElement
      if (textareaElem) {
        textareaElem.focus()
      }
    }, 100)
  }

  // for Intersection Observer
  const [tabDetail, setTabDetail] = useState(false)
  const [tabReview, setTabReview] = useState(false)
  const [tabEtc, setTabEtc] = useState(false)
  const handleIntersectionTab = (inView: any, entry: any) => {
    const elem = entry.target
    const elemId = elem.getAttribute('id')
    // console.log('Inview:', inView);
    // console.log(elemId);

    if (inView) {
      if (elemId === 'productDetail') {
        setTabDetail(true)
        setTabReview(false)
        setTabEtc(false)
      } else if (elemId === 'productReview') {
        setTabDetail(false)
        setTabReview(true)
        setTabEtc(false)
      } else if (elemId === 'productEtc') {
        setTabDetail(false)
        setTabReview(false)
        setTabEtc(true)
      }
    }
  }

  const shareUrl = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : ''

  const writeOnlyNumber = (ev: any) => {
    // Remove invalid characters
    var sanitized = ev.currentTarget.value.replace(/[^-.0-9]/g, '')
    // Remove non-leading minus signs
    sanitized = sanitized.replace(/(.)-+/g, '$1')
    // Remove the first point if there is more than one
    sanitized = sanitized.replace(/\.(?=.*\.)/g, '')
    // Update value
    ev.currentTarget.value = sanitized
  }

  return (
    <div className="product">
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
                {/* 아래 Rating은 현재 상품의 별점으로 value에 적용한 4.5는 임시데이터입니다. */}
                <Rating name="read-only" precision={0.5} value={4.5} readOnly />
                <a href="#productReview" className="ml-1">
                  <strong className="mr-1">1,034</strong>리뷰
                </a>
              </div>
              {product && product.slug?.current && (
                <div className="flex">
                  <FacebookShareButton url={`${shareUrl}/products/${product.slug}`} quote={product?.title} className="">
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={`${shareUrl}/products/${product.slug}`} className="ml-2">
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
              )}
            </div>
          </div>

          <CardContent className="flex flex-col justify-between w-full px-0 py-0 md:pr-6 md:pb-10">
            <div aria-label="top">
              <Typography variant="h5" component="h3">
                {product?.title}
              </Typography>
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
                  <button
                    type="button"
                    disabled={count <= 1}
                    className="border-r p-2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleCount(-1)}
                  >
                    <Icon className="align-top">remove</Icon>
                  </button>

                  {/* 수량을 직접 입력할 수 있게 input을 썼는데 value에 count를 적용하면 수정이 불가하네요 ㅠㅠ */}
                  <input type="text" className="w-10 text-center" value={count} onChange={writeOnlyNumber} />

                  <button
                    type="button"
                    className="border-l p-2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleCount(1)}
                  >
                    <Icon className="align-top">add</Icon>
                  </button>
                </div>

                <div className="flex-1 flex justify-end items-center">
                  <Icon className="mr-1 text-blue-600">paid</Icon>
                  {/* <span>합계</span> */}
                  <span className="mr-1 text-2xl font-bold">
                    {count <= 1 ? product?.defaultProductVariant?.price : product?.defaultProductVariant?.price * count}
                  </span>
                  <span className="mt-1 text-gray-500 text-lg italic">CHOO</span>
                </div>
              </div>
              <div className="flex mt-4 h-12">
                <button type="button" className="mr-1 px-2" onClick={() => setSelectedLike(!selectedLike)}>
                  <Icon className={selectedLike ? 'text-red-600 transition-all' : 'transition-all'}>favorite</Icon>
                </button>
                <button type="button" className="flex-1 border border-blue-600 text-blue-600">
                  장바구니 담기
                </button>
                <button type="button" className="flex-1 bg-blue-600 text-white">
                  바로구매
                </button>
              </div>
            </div>
          </CardContent>
          <span className="overflow-hidden absolute w-0">{/* Do not remove this DOM */}</span>
        </div>
      </Card>

      <div className="h-20"></div>

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

      {/* 상품상세 */}
      <InView
        as="section"
        threshold={0.1}
        onChange={handleIntersectionTab}
        id="productDetail"
        className="section mt-20 lg:pt-12"
      >
        <div className="section__inner">
          <h3 className="title text-lg">상품상세</h3>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
          <div className="my-4">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세</div>
        </div>
      </InView>

      {/* 상품후기 */}
      <InView
        as="section"
        threshold={0.5}
        onChange={handleIntersectionTab}
        id="productReview"
        className="section mt-20 lg:pt-12"
      >
        <div className="section__inner">
          <h3 className="title text-lg flex justify-between items-center">
            <div>
              상품후기<span className="ml-1 text-xs font-light">(1,306건)</span>
            </div>

            {/* 아래 버튼은 로그인 사용자 또는 후기 작성권한이 있는 경우 노출 */}
            <div className={activeWriteReview ? 'hidden' : ''}>
              <button
                type="button"
                className="flex items-center border border-black p-1 hover:text-white hover:bg-black"
                onClick={handleWriteReview}
              >
                <Icon className="text-base">create</Icon>
                <span className="text-sm ml-1">후기 작성하기</span>
              </button>
            </div>
          </h3>
          <div className="wrap-rating flex flex-col justify-center items-center border-b border-black h-32">
            {/* 아래 Rating은 현재 상품의 별점으로 value에 적용한 4.5는 임시데이터입니다. */}
            <div>
              <Rating className="text-5xl" name="product-rate" size="large" precision={0.5} value={4.5} readOnly />
            </div>
            <div className="flex">
              <span className="mr-2 text-lg">상품 평점</span>
              <div>
                <strong className="text-lg">4.5</strong> / 5
              </div>
            </div>
          </div>

          <form className={clsx(!activeWriteReview && 'hidden', 'flex flex-wrap flex-col lg:flex-row lg:mt-4')}>
            <div className="flex-1">
              <TextareaAutosize
                id="textareaReview"
                className="flex-1 w-full border border-black border-t-0 lg:border-t rounded-none p-2 shadow-none outline-none appearance-none"
                maxRows={10}
                minRows={3}
                maxLength={300}
                aria-label="후기 작성 입력란"
                placeholder="상품 후기를 작성해주세요 :)"
              />
            </div>
            <div className="flex justify-center items-center px-4">
              <div className="flex flex-col justify-center items-center">
                <span>상품을 평가해주세요!</span>
                {/* 아래 Rating은 사용자가 지정할 수 있는 별점입니다. */}
                <Rating
                  name="product-rate"
                  size="large"
                  precision={0.5}
                  defaultValue={0}
                  onChange={(ev, newValue) => {
                    setRateValue(newValue)
                  }}
                  onChangeActive={(ev, newHover) => {
                    setHover(newHover)
                  }}
                />
              </div>
              {rateValue !== null && (
                <div className={clsx('ml-4 face', ratingLabels[hover !== -1 ? hover : rateValue])}></div>
              )}
            </div>
          </form>

          <div className="flex justify-center mt-4 h-12">
            <button type="button" className="flex-1 lg:flex-initial w-40 bg-blue-600 text-white">
              등록
            </button>
          </div>

          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
          <div className="my-4">남산위에 저소나무 철갑을 두른듯 바람서리 불변함은 우리 기상일세</div>
        </div>
      </InView>

      {/* 기타안내 */}
      <InView
        as="section"
        threshold={0.5}
        onChange={handleIntersectionTab}
        id="productEtc"
        className="section mt-20 lg:pt-12"
      >
        <div className="section__inner">
          <h3 className="title text-lg">기타안내</h3>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
          <div className="my-4">가을하늘 공활한데 높고 구름없이 밝은달은 우리가슴 일편 단심일세</div>
        </div>
      </InView>
    </div>
  )
}

export default ProductPage
