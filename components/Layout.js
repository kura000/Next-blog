import Head from 'next/head'
import Link from 'next/link'


const Layout = (props) => {
  const { title, description, children } = props
  const siteTitle = "my memos"

  return (
    <div className="page">
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;700&display=swap" rel="stylesheet" />

        <meta property="og:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
        <meta property="og:type" content="TOPページはwebsite、子ページはarticle" />
        <meta property="og:url" content="このページのURL" />
        <meta property="og:image" content="1200×630以上推奨、絶対パスで指定" />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:description" content={description} />

        <meta name="format-detection" content="telephone=no" />
        <link rel="shortcut icon" sizes="16x16" href="" />
        <link rel="apple-touch-icon" sizes="192x192" href="" />
        <link rel="shortcut icon" sizes="192x192" href="" />
        <meta name="last-modified" content="Sun, 29 Dec 2019 20:30:30 GMT" />
      </Head>

      <header
        className="w-full px-8 py-4 fixed top-0 left-0 z-50 backdrop-filter backdrop-blur-sm"
      >
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="site-title">
            <Link href="/">
              <a className="inline-block">{siteTitle}</a>
            </Link>
          </h1>
          <nav className="hidden md:block">
            <ul className="flex items-center justify-between">
              <li className="mr-12">
                <Link href="/about">
                  <a className="hover:text-yellow-600 duration-300">about</a>
                </Link>
              </li>
              <li className="mr-12">
                <Link href="/about">
                  <a className="hover:text-yellow-600 duration-300">contact</a>
                </Link>
              </li>
              <li>
                <Link href="/privacypolicy/">
                  <a className="hover:text-yellow-600 duration-300">privacypolicy</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="min-h-screen md:pt-16">
        <div className="wrapper">
          <div className="py-20 lg:py-24">
            {children}
          </div>
        </div>
      </main>

      <footer className="w-full block px-6 md:px-8 pt-8 md:pt-4 pb-4 bg-white">
          <nav className="block md:hidden w-full">
            <ul className="flex items-center justify-between text-sm">
              <li className="">
                <Link href="/about">
                  <a className="hover:text-yellow-600 duration-300">about</a>
                </Link>
              </li>
              <li className="">
                <Link href="/about">
                  <a className="hover:text-yellow-600 duration-300">contact</a>
                </Link>
              </li>
              <li>
                <Link href="/privacypolicy/">
                  <a className="hover:text-yellow-600 duration-300">policy</a>
                </Link>
              </li>
            </ul>
          </nav>
        <small className="block text-center mt-8 md:mt-0">&copy;{siteTitle}</small>
      </footer>

      <nav className="hidden md:hidden fixed bottom-0 left-0 z-50 bg-white px-6 py-6 w-full rounded-t-3xl shadow-lg">
        <ul className="flex items-center justify-between text-sm">
          <li className="">
            <Link href="/about">
              <a className="hover:text-yellow-600 duration-300">about</a>
            </Link>
          </li>
          <li className="">
            <Link href="/about">
              <a className="hover:text-yellow-600 duration-300">contact</a>
            </Link>
          </li>
          <li>
            <Link href="/privacypolicy/">
              <a className="hover:text-yellow-600 duration-300">policy</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Layout
