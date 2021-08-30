import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/Date'
import { getSortedArticlesData } from '../lib/articles'
import { getClient, usePreviewSubscription } from '../lib/sanity'
import { useRouter } from 'next/router'
import Error from 'next/error'
import ProductPage from '../components/ProductsPage'

const query = `//groq
  *[_type == "product" && defined(slug.current)]
`

export default function Home({ productsData, preview }: { productsData: any; preview: boolean }) {
  const router = useRouter()
  const { data: products } = usePreviewSubscription(query, {
    initialData: productsData,
    enabled: preview || router.query.preview !== null
  })

  if (!router.isFallback && !productsData) {
    return <Error statusCode={404} />
  }

  return (
    <Layout home>
      {/* <CssBaseline /> */}
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-2xl lg:text-4xl font-bold">Welcome to {siteTitle}</h1>
      <section className="mt-6 mb-6">
        <ProductPage products={products} />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params = {}, preview = false }) => {
  const productsData = await getClient(preview).fetch(query)

  return {
    props: {
      preview,
      productsData
    }
  }
}

// export const getStaticProps: GetStaticProps = async () => {
//   const allArticlesData = getSortedArticlesData()
//   return {
//     props: {
//       allArticlesData
//     }
//   }
// }
