import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MainLayout from '../components/layouts/MainLayout'
import Providers from '../contexts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Providers>
  )
}

export default MyApp
