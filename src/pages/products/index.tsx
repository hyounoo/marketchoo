import React from 'react'
import Layout, { siteTitle } from '../../components/layout'
import { GetStaticProps } from 'next'
import { getClient, usePreviewSubscription } from '../../lib/sanity'
import { useRouter } from 'next/router'
import Error from 'next/error'
import ProductPage from '../../components/ProductsPage'

const query = `//groq
  *[_type == "product" && defined(slug.current)]
`

export default function Products({ productsData, preview }: { productsData: any; preview: boolean }) {
  const router = useRouter()
  const { data: products } = usePreviewSubscription(query, {
    initialData: productsData,
    enabled: preview || router.query.preview !== null
  })

  if (!router.isFallback && !productsData) {
    return <Error statusCode={404} />
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <ProductPage products={products} />
        </main>
      </div>
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
