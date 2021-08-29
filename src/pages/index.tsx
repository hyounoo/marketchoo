import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/Date'
import { getSortedArticlesData } from '../lib/articles'
import { getClient, usePreviewSubscription } from '../lib/sanity'
import { useRouter } from 'next/router'
import Error from 'next/error'
import ProductCard from '../components/ProductCard'

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

      <h1 className="text-6xl font-bold">Welcome to {siteTitle}</h1>

      <section>
        <p>Current deployed stage is:</p>
        <p>{process.env.NEXT_PUBLIC_STAGE}</p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {productsData.map((product: any) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>

      <p className="mt-3 text-2xl">
        Get started by editing <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">pages/index.js</code>
      </p>
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
