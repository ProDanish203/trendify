import { Footer, Header, Provider } from '@/components/shared'
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trendify | AI Companion',
  description: 'AI based application where users can talk about the latest trend on various topics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className='bg-bg'>
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
          <Provider>

          <div className='main'>
            <div className='gradient'/>
          </div>
          
          <main className='max-w-6xl z-10 mx-auto w-full'>
            <Header/>
              {children}
            {/* <Footer/> */}
          </main>

          </Provider>
        </Theme>
      </body>
    </html>
  )
}
