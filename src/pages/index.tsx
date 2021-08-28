import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/Date'
import { getSortedArticlesData } from '../lib/articles'
// import CssBaseline from '@material-ui/core/CssBaseline'

export default function Home({
  allArticlesData
}: {
  allArticlesData: {
    slug: string
    title: string
    date: string
    contentHtml: string
  }[]
}) {
  return (
    <Layout home>
      {/* <CssBaseline /> */}
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-6xl font-bold">Welcome to {siteTitle}</h1>

      <section>
        <p>Current deployed stage is:</p>
        <p>{process.env.NEXT_PUBLIC_STAGE}</p>
      </section>

      <p className="mt-3 text-2xl">
        Get started by editing <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">pages/index.js</code>
      </p>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allArticlesData = getSortedArticlesData()
  return {
    props: {
      allArticlesData
    }
  }
}
