import Link from "next/link"

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left"> <span className="blue_gradient">{type} Post </span> </h1>
      <p className="desc text-left max-w-md font-semibold"> {type} prompts to generate AI content. </p>
      <form className="mt-4 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}> 
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            className="form_textarea"
            placeholder="Write your prompt here..."
            required
          /> 
        </label>
        <label> 
          <span className="font-satoshi font-semibold text-base text-gray-700">Tag {` `} <span className="font-normal">(#marketing #development #business)</span></span>
          <input
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
            className="form_input"
            placeholder="#tag"
            required
          /> 
        </label>
        <div className="flex-end mx-3 mb-3 gap-4">
          <Link href="/" className="text-gray-700">
            Cancel
          </Link>
          <button
            type="submit"
            className="black_btn"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
