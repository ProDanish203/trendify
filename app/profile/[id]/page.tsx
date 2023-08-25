import { PromptCard } from '@/components/cards';
import { getUsersPosts } from '@/lib/actions/Prompt.actions'

const Profile = async ({params}:any) => {

    const posts = await getUsersPosts(params.id);

  return (
    <section className='px-4 my-20'>
        <h2 className='head-text sm:text-6xl text-4xl font-bold'>My Profile</h2>
        {
            posts.length > 0 ? (
            <>
            <p >Browse throw all your created posts</p>
            <div className="flex mt-5 flex-wrap gap-4 max-sm:flex-col max-sm:gap-5 items-center md:justify-start justify-center">

            {posts.map((post) => (
            <PromptCard key={post._id} _id={post._id} author={post.author} createdAt={post.createdAt} prompt={post.prompt} tags={post.tags}/>
            ))}
            </div>
            </>
            ) : (
                <p>No posts to show</p>
            )
        }


    </section>
  )
}

export default Profile