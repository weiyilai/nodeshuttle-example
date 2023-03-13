import {useRouter} from 'next/router'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {accountStore} from '../zustandStore'

type record = {
  id: number,
  message: string,
  owner: string
}

type props = {
  children: React.ReactNode
}

export default function AuthedLayout({children}: props) {

  let router = useRouter()

  const name = accountStore((state) => state.name);

  const handleLogout = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    let url = `//${window.location.host}/api/auth/logout`

    const res = await fetch(url);

    if (res.ok) {
      router.push("/");
    }

  }


  return (
  <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-stone-300 flex flex-col items-center pb-20 min-h-screen">
        <nav className="h-10 w-full flex flex-row justify-between items-center px-5">
          <Link href="/dashboard">Zest.</Link>
          
          <div className="flex flex-row justify-end gap-4">
            <span> Welcome, {name}!</span>
<button onClick={(e) => handleLogout(e)}>Log Out</button>
      </div>
              </nav>

        <nav className="h-10 pl-5  w-full flex flex-row justify-start gap-10 items-center px-5 border-b border-black/10">
          <div className="text-stone-400">Notes</div>
          <Link href="/dashboard/create" className="hover:text-stone-400 transition-all">Create Note</Link>
        </nav>

    {children}
    </main>
  </>
)
}