import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../assets/sass/app.scss'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default App
