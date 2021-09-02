import React, { useEffect, useState } from 'react'
import Error from 'next/error'
import Layout from '../../components/layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import { postQuery, postSlugsQuery } from '../../lib/queries'
import { urlForImage, usePreviewSubscription } from '../../lib/sanity'
import { sanityClient, getClient } from '../../lib/sanity.server'
import { useRouter } from 'next/router'
import { Post } from '../../models/Post'
import { log } from '../../utils/log'
import Head from 'next/head'
import PostHeader from '../../components/Posts/PostHeader'
import PostBody from '../../components/Posts/PostBody'

export default function PostDetail({ preview, postData }: { preview: boolean; postData: Post }) {
  const router = useRouter()

  // if preview is enabled, call api to patch preview data
  // otherwise set initialData with prop(porp will be null in preview mode).
  const slug = postData?.slug
  const { data: post } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: postData,
    enabled: preview && slug
  })

  const [ogImage, setOgImage] = useState<string | null>()

  useEffect(() => {
    if (post) {
      const coverImage = urlForImage(post.coverImage).width(1200).height(627).fit('crop').url()
      setOgImage(coverImage)
    }
  }, [post])

  if (!router.isFallback && !postData?.slug) {
    return <Error statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        post && (
          <>
            <Head>
              <title>{post.title} | Market Choo</title>
              {ogImage && <meta key="ogImage" property="og:image" content={ogImage} />}
            </Head>
            <PostHeader title={post.title} author={post.author} date={post.date} />
            <PostBody post={post} />
          </>
        )
      )}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(postSlugsQuery)
  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params = {}, preview = false }) => {
  console.log('params.slug: ', params.slug)
  const postData = await getClient(preview).fetch(postQuery, {
    slug: params.slug
  })

  log('postData: ', postData)
  return {
    props: {
      preview,
      postData
    }
  }
}
