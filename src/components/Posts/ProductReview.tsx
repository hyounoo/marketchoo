import React, { useState } from 'react'
import firebase from 'firebase'
import clsx from 'clsx'
import { Icon, TextareaAutosize } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { InView } from 'react-intersection-observer'

export default function ProductReview() {
  const router = useRouter()
  const [user, loading, error] = useAuthState(firebase.auth())

  const [rateValue, setRateValue] = useState<number>(0)
  const [rateHover, setRateHover] = useState(-1)

  const redirectToSignIn = () => {
    alert('SignIn required!')
    // TODO: redirect back after the signIn
    router.push('/auth/signIn')
  }

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

  return (
    <InView
      as="section"
      threshold={0.5}
      // onChange={handleIntersectionTab}
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
              onClick={() => (user ? handleWriteReview : redirectToSignIn())}
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
                onChange={(ev, newValue: any) => {
                  setRateValue(newValue)
                }}
                onChangeActive={(ev, newHover) => {
                  setRateHover(newHover)
                }}
              />
            </div>
            <div
              className={clsx('ml-4 face', rateHover !== -1 ? ratingLabels[rateHover] : ratingLabels[rateValue])}
            ></div>
          </div>
        </form>

        <div className="flex justify-center mt-4 h-12">
          {/* 버튼 비활성화 - disabled 어트리뷰트 추가 */}
          {/* <button disabled type="button" className="flex-1 lg:flex-initial w-40 bg-blue-600 text-white">등록</button> */}
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
  )
}
