import React from 'react'
import Error from 'next/error'
import Layout from '../../components/layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getClient, usePreviewSubscription } from '../../lib/sanity'
import { groq } from 'next-sanity'
import { useRouter } from 'next/router'
import ProductPage from '../../components/ProductPage'

const query = groq`*[_type == "product" && slug.current == $slug][0]`

type Product = {
  _id: any
  title: any
  defaultProductVariant: any
  mainImage: any
  blurb: any
  body: any
  tags: any
  vendor: any
  categories: any
  slug: any
}

export default function Product({ preview, productData }: { preview: boolean; productData: Product }) {
  const router = useRouter()
  const { data: product } = usePreviewSubscription(query, {
    params: { slug: productData?.slug?.current },
    initialData: productData,
    enabled: preview || router.query.preview !== null
  })

  if (!router.isFallback && !productData?.slug) {
    return <Error statusCode={404} />
  }

  return (
    <Layout>
      <ProductPage product={product} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getClient().fetch(`*[_type == "product" && defined(slug.current)][].slug.current`)

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params = {}, preview = false }) => {
  console.log('params.slug: ', params.slug)
  const productData = await getClient(preview).fetch(query, {
    slug: params.slug
  })

  return {
    props: { preview, productData }
  }
}
