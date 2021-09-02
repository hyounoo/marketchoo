import Head from 'next/head'
import React from 'react'
import Layout from '../../components/layout'
import DisplayDate from '../../components/DisplayDate'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAppArticleSlugs, getArticleData } from '../../lib/articles'

export default function Article({
  articleData
}: {
  articleData: {
    slug: string
    title: string
    date: Date
    contentHtml: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{articleData.title}</title>
      </Head>
      <div className="container mx-auto">
        <article>
          <h1 className="">{articleData.title}</h1>
          <div className="">
            <DisplayDate dateString={articleData.date.toString()} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
        </article>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAppArticleSlugs()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleData = await getArticleData(params?.slug as string)
  return {
    props: {
      articleData
    }
  }
}
