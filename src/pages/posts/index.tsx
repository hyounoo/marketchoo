import React from 'react'
import Error from 'next/error'
import { indexQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import Head from 'next/head'
import MoreStories from '../../components/Posts/MoreStories'

export default function Index({ allPosts, preview }: { allPosts: any; preview: boolean }) {
  const router = useRouter()

  if (!router.isFallback && !allPosts) {
    return <Error statusCode={404} />
  }

  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>
      {allPosts.length > 0 && <MoreStories posts={allPosts} />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params = {}, preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))

  return {
    props: { allPosts, preview }
  }
}
