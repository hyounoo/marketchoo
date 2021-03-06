import Head from 'next/head'
import Header from './header-markup'
import Footer from './footer-markup'
import { StylesProvider } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import React from 'react'
import PreviewAlert from './Posts/PreviewAlert'

export const siteTitle = 'Market Choo'

export default function Layout({ children, preview }: { children: React.ReactNode; preview?: boolean }) {
  return (
    <StylesProvider injectFirst>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          // content="/images/800_4200.jpg"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <Header></Header>
      {preview && <PreviewAlert />}
      <Container id="container" className="container">
        <main id="contents" className="min-h-screen contents py-4">
          {children}
        </main>
      </Container>
      <Footer />
    </StylesProvider>
  )
}
