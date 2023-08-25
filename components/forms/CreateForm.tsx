"use client"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "../shared"
import { createPrompt } from "@/lib/actions/Prompt.actions"
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export const CreateForm = () => {

  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const {data: session} = useSession();
  console.log(session)
  const path = usePathname();
  const {push} = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      if(!text) return toast.error("text is required");
      if(!tags) return toast.error("tags are required");
      if(!tags.includes("#")) return toast.error("Please add valid tags, starting with '#'");

      setLoading(true);
      const {success, message} = await createPrompt({
        //@ts-ignore
        authorId: session?.user?.id || '',
        prompt: text,
        tags,
        path
      })

      if(success){
        toast.success(message);
        push("/")
      }else{
        return toast.error(message);
      }
      setLoading(false);
    }catch(error){
      console.log(error);
      setLoading(false);
    }

  }

  return (
  <>
  <form
  onSubmit={handleSubmit}
  className="relative overflow-hidden md:max-w-[70vw] w-full flex flex-col gap-4 justify-center glassmorphism rounded-md md:p-8 p-4 ">

    <div className="relative w-full flex flex-col gap-1 justify-center">
      <label htmlFor="text" className="sm:text-lg">Prompt</label>
      <textarea 
      id="text" 
      placeholder="Enter prompt..."
      className="outline-none resize-none p-3 bg-gray-200 rounded-md w-full "
      rows={5}
      value={text}
      onChange={(e:any) => setText(e.target.value)}
      ></textarea>
    </div>

    <div className="relative w-full flex flex-col gap-1 justify-center">
      <label htmlFor="tags" className="sm:text-lg">Tags <span className="text-sm text-gray-400">(e.g: #programming, #tech)</span></label>
      <input 
      id="tags" 
      placeholder="#tag"
      className="outline-none p-2 bg-gray-200 rounded-md w-full "
      value={tags}
      onChange={(e:any) => setTags(e.target.value)}
      />
    </div>

    <button
    type="submit"
    className="md:py-3 py-2 md:text-lg my-2 bg-primary text-bg rounded-md"
    // @ts-ignore
    disabled={loading}
    >
      {loading ? <Loader dark={false}/>: "Create"}
    </button>
  </form>
  </>
  )
}
