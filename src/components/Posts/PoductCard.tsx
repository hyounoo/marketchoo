import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, Icon, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import { PortableText } from '../../lib/sanity'
import CoverImage from './CoverImage'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import { useRouter } from 'next/router'

export default function PoductCard({
  id,
  slug,
  title,
  subTitle,
  content,
  imageUrl
}: {
  id: string
  slug: string
  title: string
  subTitle: string
  content: any
  imageUrl: any
}) {
  const router = useRouter()
  const [user, loading, error] = useAuthState(firebase.auth())

  const redirectToSignIn = () => {
    alert('SignIn required!')
    // TODO: redirect back after the signIn
    router.push('/auth/signIn')
  }

  const shareUrl = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : ''

  const [count, setCount] = useState<number>(1)

  const handleCount = (value: number) => (!(count === 0 && value === -1) ? setCount(count + value) : count)

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

  // for btn-like
  const [selectedLike, setSelectedLike] = useState<boolean>(false)

  // for 바로구매
  const [openBuyNow, setOpenBuyNow] = useState(false)
  const [isCopiedUrl, setIsCopiedCode] = useState(false)
  const purchase = async (_id: any) => {
    // open dialog
    setOpenBuyNow(true)

    // TODO: add product id to fireStore
    // throw new Error('Function not implemented.')
  }

  const addTocart = async (_id: any) => {
    // TODO: add product id to fireStore
    throw new Error('Function not implemented.')
  }

  return (
    <div className="mb-8 md:mb-16 sm:mx-0">
      <Card className="product-card mb-6 -mt-6 lg:mt-0 shadow-none lg:shadow-md">
        <div className="grid gap-4 grid-cols-1 lg:gap-6 lg:grid-cols-3">
          <div className="w-full lg:col-span-2">
            {imageUrl && <CoverImage slug={slug} title={title} imageUrl={imageUrl} />}
            <div className="flex justify-between pt-2 px-0 md:p-2">
              <div className="flex">
                {/* 아래 Rating은 현재 상품의 별점으로 value에 적용한 4.5는 임시데이터입니다. */}
                <Rating name="read-only" precision={0.5} value={4.5} readOnly />
                <a href="#productReview" className="ml-1">
                  <strong className="mr-1">1,034</strong>리뷰
                </a>
              </div>
              <div className="flex">
                <FacebookShareButton url={`${shareUrl}/products/${slug}`} quote={title} className="">
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
                <TwitterShareButton url={`${shareUrl}/products/${slug}`} className="ml-2">
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
              </div>
            </div>
          </div>

          <CardContent className="flex flex-col justify-between w-full px-0 py-0 md:pr-6 md:pb-10">
            <div aria-label="top">
              <Typography variant="h5" component="h3">
                {subTitle}
              </Typography>
              <div className="flex items-center">
                <Icon className="mr-1">paid</Icon>
                {/* <span className="mr-1 text-2xl font-bold">
                    {count <= 1 ? product?.defaultProductVariant?.price : product?.defaultProductVariant?.price}
                  </span> */}
                <span className="mt-1 text-gray-500 text-lg italic">CHOO</span>
              </div>
              <Typography className="mt-2 mb-6 text-gray-600" variant="body2" color="textSecondary" component="p">
                {content && <PortableText blocks={content} />}
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
                  {/* <span className="mr-1 text-2xl font-bold">
                      {count <= 1
                        ? product?.defaultProductVariant?.price
                        : product?.defaultProductVariant?.price * count}
                    </span> */}
                  <span className="mt-1 text-gray-500 text-lg italic">CHOO</span>
                </div>
              </div>
              <div className="flex mt-4 h-12">
                <button
                  type="button"
                  className="mr-1 px-2"
                  onClick={() => (user ? setSelectedLike(!selectedLike) : redirectToSignIn())}
                >
                  <Icon className={selectedLike ? 'text-red-600 transition-all' : 'transition-all'}>favorite</Icon>
                </button>
                <button
                  type="button"
                  className="flex-1 border border-blue-600 text-blue-600"
                  onClick={() => (user ? addTocart(id) : redirectToSignIn())}
                >
                  장바구니 담기
                </button>
                <button
                  type="button"
                  className="flex-1 bg-blue-600 text-white"
                  onClick={() => (user ? purchase(id) : redirectToSignIn())}
                >
                  바로구매
                </button>
              </div>
            </div>
          </CardContent>
          <span className="overflow-hidden absolute w-0">{/* Do not remove this DOM */}</span>
        </div>
      </Card>
    </div>
  )
}
