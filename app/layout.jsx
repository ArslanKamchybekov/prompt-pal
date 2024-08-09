import '@styles/globals.css'
import Provider from '@components/Provider'
import Nav from '@components/Nav'

export const metadata = {
  title: 'PromptPal',
  description: 'Discover and share best prompts for Generative AI!',
}

const RootLayout = ({children}) =>{
  return (
    <html lang='en'>
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}  

export default RootLayout
