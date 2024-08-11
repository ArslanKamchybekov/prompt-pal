import '@styles/globals.css'
import Provider from '@components/Provider'
import Nav from '@components/Nav'
import ChatButton from '@components/ChatButton'
import { Suspense } from 'react'

export const metadata = {
  title: 'GetPrompted',
  description: 'Discover and share best prompts for Generative AI!',
}

const RootLayout = ({children}) =>{
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            <br />
            <br />
            <br />
              <Suspense fallback={null}>
                {children}
              </Suspense>
            <ChatButton />
          </main>
        </Provider>
      </body>
    </html>
  )
}  

export default RootLayout
