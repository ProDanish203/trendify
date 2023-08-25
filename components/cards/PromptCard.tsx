import { Separator } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props{
  prompt: string;
  tags: string,
  author: {
    username: string;
    image: string;
    _id: string;
    email: string;
  },
  _id: string;
  createdAt: string;
}

export const PromptCard = ({prompt, tags, author, _id, createdAt}: Props) => {
  return (
    <article className="p-4 relative shadow-md glassmorphism min-w-[350px] md:w-fit w-full">
    {/* Author section */} 
      <div className="flex gap-2 items-center mb-4">
        <div className="relative w-12 h-12 max-sm:w-10 max-sm:h-10 object-cover rounded-full">
          <Image src={author.image} fill alt={author.username} className="rounded-full object-cover"/>
        </div>
        <div>
          <p className="text-text font-medium text-lg -mb-1.5">{author.username}</p>
          <p className="text-gray-400">{author.email}</p>
        </div>
      </div>
      <Separator my="0" size="4" />
      {/* Post section */}
      <div className="mt-5 sm:px-2 text-gray-600">
        <p className="mb-4">{prompt}</p>
        <span className="text-primary text-sms">{tags}</span>
      </div>

    </article>
  )
}
