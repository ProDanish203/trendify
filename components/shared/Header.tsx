"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { motion } from "framer-motion";
import { Separator } from "@radix-ui/themes";


export const Header = () => {

  const {data: session} = useSession();
  const [providers, setProviders] = useState(null)
  const [toggleDd, setToggleDd] = useState(false);
  console.log(session)
  useEffect(() => {
    const configureProviders = async () => {
      const res = await getProviders();
      // @ts-ignore
      setProviders(res);
    }

    configureProviders();
  }, [])

  return (
    <header className='flex items-center justify-between max-md:px-3 px-2 py-4 mb-4'>
      <Link href="/" className="flex items-center gap-2">
        <div className="relative w-12 h-12">
          <Image src="/logo.svg" fill className="object-cover" alt="Trendify Logo"/>
        </div>
        <h2 className="text-2xl font-bold max-md:hidden head-text">Trendify</h2>
      </Link>


      <nav className="max-md:hidden flex items-center gap-2">
      {session?.user ? (
      <>
      <Link href="/create">
        <button className='text-bg bg-primary px-3 py-2 rounded-full'>Create Post</button>
      </Link>
      <button className='hover:text-bg hover:bg-primary border border-primary px-3 py-2 rounded-full' onClick={() => signOut()}>Sign Out</button>
      <Link href="/profile" className="relative w-12 h-12 max-md:w-10 max-md:h-10 object-cover rounded-full">
        <Image src={session?.user?.image} fill alt="Profile" className="rounded-full obect-cover"/>
      </Link>
      </>
      ) : (
      <>
      {providers && 
      Object.values(providers).map((provider:any) => (
        <button 
        type="button"
        key={provider.name} 
        className='text-bg bg-primary px-4 py-2 rounded-full'
        onClick={() => signIn(provider.id)}
        >Sign In</button>
      ))
      }
      </>
      )}
      </nav>

      {/* Mobile Nav */}
      <nav className="relative md:hidden">
      {session?.user ? (
        <>
        <div className="relative w-12 cursor-pointer h-12 max-md:w-10 max-md:h-10 object-cover rounded-full"
        onClick={() => setToggleDd(prev => !prev)}
        >
          <Image src={session?.user?.image} fill alt="Profile" className="rounded-full obect-cover"/> 
        </div>

        {toggleDd && (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
            duration: 0.2
        }}  
        className="absolute right-0 top-full mt-3 p-5 rounded-lg flex flex-col gap-5 bg-bgDark1 z-30 min-w-[200px] shadow-md">
          <Link href="/profile"
          className="text-text text-sm flex items-center gap-2 hover:text-text-gray-500"
          onClick={() => setToggleDd(false)}
          >
            <i className="fas fa-user text-lg text-primary"></i>
            My Profile
          </Link>

          <Link href="/create"
          className="text-text text-sm flex items-center gap-2 hover:text-text-gray-500"
          onClick={() => setToggleDd(false)}
          >
            <i className="fas fa-plus text-lg text-primary"></i>
            Create
          </Link>

          <Separator my="0" size="4" />

          <button 
          onClick={() => {
            setToggleDd(false)
            signOut();
          }}
          className="text-left text-sm flex items-center gap-2"
          >
            <i className="fa fa-sign-out text-lg text-primary"></i>
            Sign Out
          </button>

        </motion.div>
      )}
        </>
      ) : (
      <>
        {providers && 
      Object.values(providers).map((provider:any) => (
        <button 
        type="button"
        key={provider.name} 
        className='text-bg bg-primary px-4 py-2 rounded-full'
        onClick={() => signIn(provider.id)}
        >Sign In</button>
      ))
      }
      </>
      )}
        

      


      </nav>
    </header>
  )
}
