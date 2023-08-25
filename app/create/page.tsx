"use client"
import { CreateForm } from "@/components/forms";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {

    const {data: session} = useSession();
    if(!session?.user) redirect("/");

  return (
    <section className="my-10 px-2">
    <ToastContainer/>
        <h1 className="text-6xl mb-3 max-md:text-5xl font-bold head-text">Create Post</h1>
        <p className="text-gray-600 md:text-lg md:max-w-[800px] mb-10">
        Unlock the potential of AI-driven creativity! Create And Share unique narratives, brainstorm groundbreaking ideas, or explore new horizons by creating and sharing an AI-powered prompt. Let your imagination take flight with just a few clicks, and watch as the machine brings your ideas to life. Start now and witness the future of inspiration at your fingertips.
        </p>
    <div className="px-2">
        <CreateForm/>
    </div>

    </section>
  )
}

export default Create;