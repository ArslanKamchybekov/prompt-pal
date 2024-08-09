import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Find & Share</h1>
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center text-3xl font-bold">Best Prompts for Generative AI</span>
        <p className="desc text-center">PromptPal is a platform for discovering and sharing the best prompts for generative AI.</p>

        <Feed />
    </section>
  )
}

export default Home
