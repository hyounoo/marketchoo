import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../src/components/layout'
import Date from '../src/components/Date'
import { getSortedArticlesData } from '../src/lib/articles'

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
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Head>
          <title>{siteTitle}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Welcome to {siteTitle}</h1>

          <section>
            <p>Current deployed stage is:</p>
            <p>{process.env.NEXT_PUBLIC_STAGE}</p>
          </section>

          <p className="mt-3 text-2xl">
            Get started by editing <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">pages/index.js</code>
          </p>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <Link href="/faqs">
              <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">FAQ sample page &rarr;</h3>
                <p className="mt-4 text-xl">Chek out a sample faqs with Tailwind css.</p>
              </a>
            </Link>

            <Link href="https://nextjs.org/docs">
              <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
                <p className="mt-4 text-xl">Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>

            <Link href="https://nextjs.org/learn">
              <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Learn &rarr;</h3>
                <p className="mt-4 text-xl">Learn about Next.js in an interactive course with quizzes!</p>
              </a>
            </Link>

            <Link href="https://github.com/vercel/next.js/tree/master/examples">
              <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Examples &rarr;</h3>
                <p className="mt-4 text-xl">Discover and deploy boilerplate example Next.js projects.</p>
              </a>
            </Link>

            <Link href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
              <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
                <p className="mt-4 text-xl">Instantly deploy your Next.js site to a public URL with Vercel.</p>
              </a>
            </Link>
          </div>
          <section>
            <h2>Blog</h2>
            <ul>
              {allArticlesData.map(({ slug, date, title }) => (
                <li key={slug}>
                  <Link href={`/articles/${slug}`}>
                    <a className="text-indigo-600">{title}</a>
                  </Link>
                  <br />
                  <small>
                    <Date dateString={date} />
                  </small>
                </li>
              ))}
            </ul>
          </section>
        </main>

        <footer className="flex items-center justify-center w-full h-24 border-t">
          <a
            className="flex items-center justify-center"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </a>
        </footer>
      </div>
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
