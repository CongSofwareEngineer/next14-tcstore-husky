import { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import AntdProvider from '@/components/AntdProvider'
import ReduxProvider from '@/components/ReduxProvider'
import MyModalProvider from '@/components/MyModal'
import '@/styles/globals.scss'
import '@/styles/override.scss'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import StyledComponentsRegistry from '@/components/RegistryApp'
import ClientRender from '@/components/ClientRender'
import type { Viewport } from 'next'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import DrawerProvider from '@/components/DrawerProvider'
const inter = Inter({ subsets: ['latin'] })
import { SpeedInsights } from '@vercel/speed-insights/next'
import ClientApi from '@/services/clientApi'

const BaseMeta = {
  title: process.env.NEXT_PUBLIC_TITLE,
  description: process.env.NEXT_PUBLIC_TITLE_DES,
  images: process.env.NEXT_PUBLIC_IMAGE,
}
export const metadata: Metadata = {
  metadataBase: new URL('https://tcstore.vercel.app/'),
  title: BaseMeta.title,
  description: BaseMeta.description,
  keywords: [
    'Coffee Tây Nguyên',
    'Cà Phê Tây Nguyên',
    'TC Store',
    'TC Shop',
    'Cà phê Gia Lai',
  ],
  openGraph: {
    title: BaseMeta.title,
    description: BaseMeta.description,
    images: BaseMeta.images,
    siteName: BaseMeta.title,
    url: 'https://tcstore.vercel.app',
  },
  bookmarks: 'https://tcstore.vercel.app',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: { url: '/favicon.ico' },
    shortcut: { url: '/favicon.ico' },
    apple: { url: '/favicon.ico' },
  },
  manifest: '/manifest.json',
  twitter: {
    title: BaseMeta.title,
    description: BaseMeta.description,
    card: 'summary_large_image',
    images: BaseMeta.images,
  },
  appleWebApp: {
    title: BaseMeta.title,
  },
  verification: {
    // google: '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk',
    google: 'Sr2q2elTmvBwx7P3aM-ZiaH-3yjcxuGHrMI9H9iCewI',
  },
  appLinks: {
    web: {
      url: 'https://tcstore.vercel.app',
      should_fallback: true,
    },
  },
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const LayoutMain = async ({ children }: { children: React.ReactNode }) => {
  const menuCategory = await ClientApi.fetchData({
    url: 'category/all',
    isAthu: false,
  })

  return (
    <html lang="en">
      <head>
        {/* Google / Search Engine Tags  */}
        <meta itemProp="name" content={process.env.NEXT_PUBLIC_TITLE} />
        <meta
          itemProp="description"
          content={process.env.NEXT_PUBLIC_TITLE_DES}
        />
        <meta itemProp="image" content={'/favicon.ico'} />

        {process.env.NEXT_PUBLIC_MODE_PRODUCTION && (
          <>
            <meta
              name="google-site-verification"
              content="Sr2q2elTmvBwx7P3aM-ZiaH-3yjcxuGHrMI9H9iCewI"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-T7S7DKJ4')`,
              }}
            />
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-QH99F8WFPW"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: ` 
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-QH99F8WFPW');`,
              }}
            />
          </>
        )}
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_MODE_PRODUCTION && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T7S7DKJ4"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}

        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <AntdRegistry>
              <AntdProvider>
                <ReduxProvider>
                  <MyModalProvider>
                    <DrawerProvider>
                      <ClientRender menuCategory={menuCategory?.data || []}>
                        {children}
                      </ClientRender>
                    </DrawerProvider>
                  </MyModalProvider>
                </ReduxProvider>
              </AntdProvider>
            </AntdRegistry>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}

export default LayoutMain
