import { GetStaticProps } from 'next'
import { indexQuery } from '../lib/queries'
import { getClient, overlayDrafts } from '../lib/sanity.server'
import { useRouter } from 'next/router'
import Error from 'next/error'
import { log } from '../utils/log'
import Layout, { siteTitle } from '../components/layout'
import React from 'react'
import Head from 'next/head'
import TopPost from '../components/Posts/TopPost'
import MoreStories from '../components/Posts/MoreStories'

export default function Home({ allPosts, preview }: { allPosts: any; preview: boolean }) {
  const router = useRouter()
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  if (!router.isFallback && !allPosts) {
    return <Error statusCode={404} />
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {heroPost && <TopPost post={heroPost} />}
      {morePosts.length > 0 && <MoreStories posts={allPosts} />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params = {}, preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  log('allPosts: ', allPosts)

  return {
    props: { allPosts, preview }
  }
}
