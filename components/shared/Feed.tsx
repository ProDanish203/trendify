import { getFeed } from "@/lib/actions/Prompt.actions";
import { PromptCard } from "../cards";

export const Feed = async () => {

  const {posts, isNext} = await getFeed({pageNo: 1, limit: 30});

  return (
    <section className="px-2 max-sm:px-4 my-20">
      <div className="flex mt-5 flex-wrap gap-4 max-sm:flex-col max-sm:gap-5 items-center md:justify-start justify-center">
      
      {posts?.map((post:any) => (
        <PromptCard key={post._id} _id={post._id} author={post.author} createdAt={post.createdAt} prompt={post.prompt} tags={post.tags}/>
        ))}
      </div>
    </section>
  )
}
