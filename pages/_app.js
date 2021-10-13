import '../styles/globals.scss'

import usePageView from '../hooks/usePageView'
import GoogleAnalytics from '../components/GoogleAnalytics'

function MyApp({ Component, pageProps }) {
  usePageView()
    return (
      <>
        <GoogleAnalytics />
        <Component {...pageProps} />
      </>
    )
}

export default MyApp
